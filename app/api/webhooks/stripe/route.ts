import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendGuideEmail } from "@/lib/guideEmail";
import { sendDiscoveryIntakeEmail } from "@/lib/discoveryEmail";
import { sendBloodTestConfirmation } from "@/lib/bloodTestEmail";

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_VERIDIAN || "";

async function pingDiscord(message: string) {
  if (!DISCORD_WEBHOOK) return;
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  }).catch(() => {});
}

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
      const amountGBP = session.amount_total ? `£${(session.amount_total / 100).toFixed(2)}` : "";
      if (email) {
        await sendDiscoveryIntakeEmail({ email, name });
      }
      await pingDiscord(
        `📞 **Discovery call PAID — Veridian Clinic**\n` +
        `**Amount:** ${amountGBP}\n` +
        `**Patient:** ${name || "—"}\n` +
        `**Email:** ${email || "—"}\n` +
        `\nIntake email sent to patient. Schedule call in ThanksDoc.`
      );
    }

    if (tier && BLOOD_TEST_TIERS.has(tier) && session.payment_status === "paid") {
      const email = session.customer_details?.email || session.customer_email || "";
      const name = session.customer_details?.name || session.metadata?.name || "";
      const amountGBP = session.amount_total ? `£${(session.amount_total / 100).toFixed(2)}` : "";
      if (email) {
        await sendBloodTestConfirmation({ email, name, tier, stripeSessionId: session.id });
      }
      await pingDiscord(
        `💳 **Blood test PAID — Veridian Clinic**\n` +
        `**Panel:** ${tier}\n` +
        `**Amount:** ${amountGBP}\n` +
        `**Patient:** ${name || "—"}\n` +
        `**Email:** ${email || "—"}\n` +
        `**Stripe session:** ${session.id}\n` +
        `\n⚠️ Action: contact patient within 24h to arrange collection. Randox order details in notification email.`
      );
    }

    if ((tier === "wl-consultation" || tier === "wl-consultation-quiz") && session.payment_status === "paid") {
      const email = session.customer_details?.email || session.customer_email || "";
      const name = session.customer_details?.name || session.metadata?.name || "";
      const amountGBP = session.amount_total ? `£${(session.amount_total / 100).toFixed(2)}` : "";
      const rateLabel = tier === "wl-consultation-quiz" ? "quiz rate" : "standard rate";
      if (email) {
        await sendDiscoveryIntakeEmail({ email, name });
      }
      await pingDiscord(
        `💉 **Weight Loss Consultation PAID — Veridian Clinic**\n` +
        `**Rate:** ${rateLabel}\n` +
        `**Amount:** ${amountGBP}\n` +
        `**Patient:** ${name || "—"}\n` +
        `**Email:** ${email || "—"}\n` +
        `\nAction: contact patient to schedule 50-min virtual consultation. Intake email sent.`
      );
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
