import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const SITE_URL = "https://veridian-clinic.vercel.app";
const PAYMENT_DESCRIPTOR = "Olympus Premium Health";

const tierAliasMap: Record<string, string> = {
  advanced: "programme",
};

const tierCatalog: Record<
  string,
  { name: string; amount: number; description: string }
> = {
  baseline: {
    name: "Veridian Baseline",
    amount: 59500,
    description:
      "A longevity-focused baseline metabolic audit designed to reveal the most actionable drivers of decline before they become disease.",
  },
  programme: {
    name: "12-Week Metabolic Reset",
    amount: 189500,
    description:
      "A 12-week reset with structured implementation, accountability, and clinical oversight via trusted medical partners where indicated.",
  },
};

type CheckoutPayload = {
  tier?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function resolveTier(rawTier?: string) {
  const normalized = `${rawTier || ""}`.trim().toLowerCase();
  return tierAliasMap[normalized] || normalized;
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const payload = (await request.json()) as CheckoutPayload;
    const tier = resolveTier(payload.tier);
    const product = tierCatalog[tier];

    if (!product) {
      return NextResponse.json(
        { error: "Please select a valid paid assessment tier." },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      payment_method_types: ["card", "klarna", "customer_balance"],
      payment_method_options: {
        customer_balance: {
          funding_type: "bank_transfer",
          bank_transfer: {
            type: "gb_bank_transfer",
          },
        },
      },
      customer_creation: "always",
      customer_email: payload.email?.trim() || undefined,
      phone_number_collection: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: product.name,
              description: `${product.description} Payments may appear as ${PAYMENT_DESCRIPTOR} on bank statements.`,
            },
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier,
        tier_name: product.name,
        name: payload.name?.trim() || "",
        email: payload.email?.trim() || "",
        phone: payload.phone?.trim() || "",
        notes: payload.notes?.trim() || "",
        payment_descriptor: PAYMENT_DESCRIPTOR,
      },
      payment_intent_data: {
        description: `Veridian Clinic ${product.name} payment. Payments may appear as ${PAYMENT_DESCRIPTOR} on bank statements.`,
      },
      success_url: `${baseUrl}/book/thank-you?tier=${encodeURIComponent(
        tier
      )}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book?tier=${encodeURIComponent(tier)}&cancelled=1`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to create checkout session." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}
