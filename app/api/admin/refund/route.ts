import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import Stripe from "stripe";

const REFUND_REASONS = new Set(["duplicate", "fraudulent", "requested_by_customer"]);

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const sessionId: string = (body.sessionId || "").trim();
  const rawReason: string = (body.reason || "requested_by_customer").trim();
  const reason = REFUND_REASONS.has(rawReason)
    ? (rawReason as "duplicate" | "fraudulent" | "requested_by_customer")
    : "requested_by_customer";

  if (!sessionId) {
    return NextResponse.json({ error: "Stripe session ID is required." }, { status: 400 });
  }

  const stripe = new Stripe(stripeKey, { httpClient: Stripe.createFetchHttpClient() });

  const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);
  if (!session || !session.payment_intent) {
    return NextResponse.json({ error: "Session not found or payment intent missing." }, { status: 404 });
  }

  const refund = await stripe.refunds.create({
    payment_intent: session.payment_intent as string,
    reason,
  });

  return NextResponse.json({
    ok: true,
    refundId: refund.id,
    status: refund.status,
    amountPence: refund.amount,
    currency: refund.currency,
  });
}
