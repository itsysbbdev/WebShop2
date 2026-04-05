import { randomUUID } from "node:crypto";

import { hasSupabaseAdminConfig, hasSupabaseConfig } from "@/lib/env";
import { mockOrders } from "@/lib/data/mock-store";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CartItem, Order } from "@/types/domain";

function mapOrder(row: any): Order {
  return {
    id: row.id,
    orderNumber: String(row.order_number ?? row.id),
    email: row.email,
    status: row.status,
    currency: row.currency,
    subtotal: Number(row.subtotal ?? 0),
    taxTotal: Number(row.tax_total ?? 0),
    shippingTotal: Number(row.shipping_total ?? 0),
    grandTotal: Number(row.grand_total ?? 0),
    createdAt: row.created_at,
    paidAt: row.paid_at ?? null,
    items: (row.order_items ?? []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      variantId: item.variant_id ?? null,
      productName: item.product_name,
      variantName: item.variant_name ?? null,
      quantity: Number(item.quantity ?? 0),
      unitPrice: Number(item.unit_price ?? 0),
      lineTotal: Number(item.line_total ?? 0)
    }))
  };
}

export async function listOrders() {
  if (!hasSupabaseConfig()) {
    return mockOrders;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        product_id,
        variant_id,
        product_name,
        variant_name,
        quantity,
        unit_price,
        line_total
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapOrder);
}

export async function createPendingOrder(input: {
  email: string;
  currency: string;
  subtotal: number;
  taxTotal: number;
  shippingTotal: number;
  grandTotal: number;
  items: CartItem[];
}) {
  if (!hasSupabaseAdminConfig()) {
    return {
      id: randomUUID(),
      orderNumber: String(Date.now()),
      persisted: false
    };
  }

  const supabase = createSupabaseAdminClient();
  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      email: input.email,
      status: "pending_payment",
      currency: input.currency,
      subtotal: input.subtotal,
      tax_total: input.taxTotal,
      shipping_total: input.shippingTotal,
      grand_total: input.grandTotal
    })
    .select("id, order_number")
    .single();

  if (orderError || !orderRow) {
    throw orderError ?? new Error("Unable to create order.");
  }

  const lineItems = input.items.map((item) => ({
    order_id: orderRow.id,
    product_id: item.productId,
    variant_id: item.variantId,
    product_name: item.productName,
    variant_name: item.variantName,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    line_total: item.unitPrice * item.quantity,
    snapshot: {
      sku: item.sku,
      selections: item.selections
    }
  }));

  const { error: itemError } = await supabase.from("order_items").insert(lineItems);

  if (itemError) {
    throw itemError;
  }

  return {
    id: orderRow.id,
    orderNumber: String(orderRow.order_number),
    persisted: true
  };
}

export async function attachCheckoutSessionToOrder(orderId: string, checkoutSessionId: string) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({
      stripe_checkout_session_id: checkoutSessionId
    })
    .eq("id", orderId);

  if (error) {
    throw error;
  }
}

export async function markOrderPaidByCheckoutSession(checkoutSessionId: string, paymentIntentId?: string | null) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      stripe_payment_intent_id: paymentIntentId ?? null,
      paid_at: new Date().toISOString()
    })
    .eq("stripe_checkout_session_id", checkoutSessionId);

  if (error) {
    throw error;
  }
}
