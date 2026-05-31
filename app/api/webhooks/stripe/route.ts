import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendGuideEmail } from "@/lib/guideEmail";
import { sendDiscoveryIntakeEmail } from "@/lib/discoveryEmail";
import { sendBloodTestConfirmation } from "@/lib/bloodTestEmail";

const BLOOD_TEST_TIERS = new Set([
  "metabolic-screen", "womens-hormones", "mens-testosterone",
  "cardiovascular-risk", "fatigue-energy", "metabolic-weight", "optimiser-baseline",
]);

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const tier = session.metadata?.tier;

    if ((tier === "discovery" || tier === "discovery-quiz") && session.payment_status === "paid") {
      const email = session.customer_details?.email || session.customer_email || "";
      const name = session.customer_details?.name || session.metadata?.name || "";
      if (email) {
        await sendDiscoveryIntakeEmail({ email, name });
      }
    }

    if (tier && BLOOD_TEST_TIERS.has(tier) && session.payment_status === "paid") {
      const email = session.customer_details?.email || session.customer_email || "";
      const name = session.customer_details?.name || session.metadata?.name || "";
      if (email) {
        await sendBloodTestConfirmation({ email, name, tier, stripeSessionId: session.id });
      }
    }

    if (tier === "guide" && session.payment_status === "paid") {
      const email = session.customer_details?.email || session.customer_email || "";
      const name = session.customer_details?.name || "";
      const sessionId = session.id;
      const alreadySent = session.metadata?.guide_email_sent_at;

      if (!alreadySent && email && sessionId) {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.SITE_URL ||
          process.env.VERCEL_PROJECT_PRODUCTION_URL ||
          "https://veridianclinic.com";
        const downloadUrl = `${siteUrl}/api/guide-download?session_id=${sessionId}`;
        const sent = await sendGuideEmail({ email, name, downloadUrl });
        if (sent) {
          await stripe.checkout.sessions.update(sessionId, {
            metadata: {
              ...session.metadata,
              guide_email_sent_at: new Date().toISOString(),
            },
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
