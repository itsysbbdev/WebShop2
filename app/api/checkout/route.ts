import { attachCheckoutSessionToOrder, createPendingOrder } from "@/lib/repositories/orders";
import { getAllProducts } from "@/lib/repositories/products";
import { getStoreSettings } from "@/lib/repositories/settings";
import { getStripeClient } from "@/lib/stripe";
import { absoluteUrl, toStripeAmount } from "@/lib/utils";
import { checkoutPayloadSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = checkoutPayloadSchema.parse(await request.json());

    const [products, settings] = await Promise.all([getAllProducts(), getStoreSettings()]);

    const validatedItems = payload.items.map((item) => {
      const product = products.find((entry) => entry.id === item.productId || entry.slug === item.slug);
      const variant = product?.variants.find((entry) => entry.id === item.variantId);

      if (!product || !variant || !variant.isActive) {
        throw new Error(`Invalid cart item: ${item.productName}`);
      }

      if (item.quantity > variant.stockQuantity) {
        throw new Error(`Insufficient stock for ${product.name} (${variant.name}).`);
      }

      return {
        product,
        variant,
        quantity: item.quantity
      };
    });

    const subtotal = validatedItems.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
    const taxTotal = subtotal * (settings.taxRate / 100);
    const shippingTotal = 0;
    const grandTotal = subtotal + taxTotal + shippingTotal;

    const order = await createPendingOrder({
      email: payload.email,
      currency: settings.currency,
      subtotal,
      taxTotal,
      shippingTotal,
      grandTotal,
      items: validatedItems.map((item) => ({
        productId: item.product.id,
        variantId: item.variant.id,
        slug: item.product.slug,
        productName: item.product.name,
        variantName: item.variant.name,
        imageUrl: item.variant.imageUrl ?? item.product.featuredImageUrl ?? null,
        sku: item.variant.sku,
        currency: settings.currency,
        unitPrice: item.variant.price,
        quantity: item.quantity,
        maxQuantity: item.variant.stockQuantity,
        selections: item.variant.selections
      }))
    });

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: payload.email,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      success_url: absoluteUrl(`/checkout/success?order=${order.orderNumber}&session_id={CHECKOUT_SESSION_ID}`),
      cancel_url: absoluteUrl("/checkout/cancel"),
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber
      },
      line_items: validatedItems.map((item) =>
        item.variant.stripePriceId
          ? {
              price: item.variant.stripePriceId,
              quantity: item.quantity
            }
          : {
              quantity: item.quantity,
              price_data: {
                currency: settings.currency.toLowerCase(),
                unit_amount: toStripeAmount(item.variant.price, settings.currency),
                product_data: {
                  name: item.product.name,
                  description: item.variant.name,
                  metadata: {
                    productId: item.product.id,
                    variantId: item.variant.id,
                    sku: item.variant.sku
                  }
                }
              }
            }
      )
    });

    if (session.id) {
      await attachCheckoutSessionToOrder(order.id, session.id);
    }

    return Response.json({
      url: session.url,
      orderId: order.id,
      orderNumber: order.orderNumber
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to start checkout."
      },
      { status: 400 }
    );
  }
}
