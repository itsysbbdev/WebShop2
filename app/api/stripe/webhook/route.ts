import Stripe from "stripe";

import { getStripeWebhookSecret } from "@/lib/env";
import { markOrderPaidByCheckoutSession } from "@/lib/repositories/orders";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  try {
    const body = await request.text();
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(body, signature, getStripeWebhookSecret());

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null;

      await markOrderPaidByCheckoutSession(session.id, paymentIntentId);
    }

    return Response.json({ received: true });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Invalid webhook signature."
      },
      { status: 400 }
    );
  }
}
