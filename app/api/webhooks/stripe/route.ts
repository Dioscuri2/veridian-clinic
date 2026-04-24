import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendGuideEmail } from "@/lib/guideEmail";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // Allow unsigned events in development/if secret not yet configured
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.metadata?.tier === "guide" && session.payment_status === "paid") {
      const email = session.customer_details?.email || session.customer_email || "";
      const name = session.customer_details?.name || "";
      const sessionId = session.id;

      if (email && sessionId) {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.SITE_URL ||
          process.env.VERCEL_PROJECT_PRODUCTION_URL ||
          "https://veridianclinic.com";
        const downloadUrl = `${siteUrl}/api/guide-download?session_id=${sessionId}`;
        await sendGuideEmail({ email, name, downloadUrl });
      }
    }
  }

  return NextResponse.json({ received: true });
}
