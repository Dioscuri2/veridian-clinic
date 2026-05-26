import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { verifyTurnstileToken } from "@/lib/turnstile";

const SITE_URL = "https://veridianclinic.com";
const PAYMENT_DESCRIPTOR = "Olympus Premium Health";

const tierAliasMap: Record<string, string> = {
  advanced: "programme",
};

const tierCatalog: Record<
  string,
  { name: string; amount: number; description: string; successPath?: string; cancelPath?: string }
> = {
  guide: {
    name: "Why Your Weight Isn't Shifting — Doctor's 21-Day Metabolic Reset Guide",
    amount: 999,
    description:
      "A GP-authored practical guide covering the PERC framework, 21-day roadmap, meal plans, fasting strategies, and movement tiers for metabolic reset.",
    successPath: "/metabolic-reset-guide/thank-you",
    cancelPath: "/metabolic-reset-guide",
  },
"perimenopause-panel": {
    name: "Veridian Women's Advanced Health Panel",
    amount: 29500,
    description:
      "150+ marker comprehensive panel (Advanced GP3 Female + DHEA-S + Free Testosterone). Hormones: Oestradiol, Progesterone, FSH, LH, Testosterone (Total & Free), DHEA-S, Prolactin, SHBG. Thyroid: TSH, fT3, fT4, Anti-TG, Anti-TPO. Metabolic: Glucose, HbA1c, Insulin, C-Peptide, Leptin, Adiponectin, Resistin. Cardiovascular: Full lipid panel + Apolipoproteins + Lipoprotein(a) + Cardiovascular Risk Score. Blood: Full Blood Count. Nutrition: Vitamin D, B12, Folate, Iron status, Ferritin, Total Antioxidant Status. Organ health: Liver, Kidney (inc. Cystatin C), Pancreatic. Bone: Calcium, PTH, Vitamin D. Inflammation: hsCRP, Complement C3/C4, Immunoglobulins. Digestive: H. Pylori, Anti-TTG. Tumour marker: CA-125. Allergy: IgE. GP-reviewed digital report included. Clinic blood draw: £30 payable at Randox clinic.",
    successPath: "/book/thank-you",
    cancelPath: "/perimenopause-guide",
  },
  discovery: {
    name: "GP-Led Discovery Call",
    amount: 19500,
    description:
      "A 30-minute GP-led review of your metabolic result, key risk factors, and a personalised clinical pathway recommendation.",
    successPath: "/book/thank-you",
  },
  "discovery-quiz": {
    name: "GP-Led Discovery Call — Quiz Rate",
    amount: 9700,
    description:
      "A 30-minute GP-led review of your metabolic quiz result and a personalised pathway recommendation. Quiz taker rate: £97 (normally £195).",
    successPath: "/book/thank-you",
  },
  "metabolic-screen": {
    name: "Veridian Energy Screen — Fatigue & Thyroid Audit",
    amount: 19500,
    description:
      "Targeted blood panel: FBC, Thyroid (TSH/FT3/FT4/antibodies), Fasting Insulin, C-Peptide, HbA1c, Iron Status, B12, Folate, Vitamin D, hsCRP, Kidney. Includes GP-reviewed digital report.",
    successPath: "/book/thank-you",
  },
  "longevity-panel": {
    name: "Veridian Longevity Panel — Biological Age Audit",
    amount: 79500,
    description:
      "150+ markers including full hormonal health, Omega-3 index, gut markers, pancreatic health, and comprehensive cardiovascular risk. Includes 45-min GP consultation and written report.",
    successPath: "/book/thank-you",
  },
  baseline: {
    name: "Veridian Baseline",
    amount: 59500,
    description:
      "Two GP consultations (initial clinical session + blood results review), advanced metabolic blood panel (HbA1c, fasting insulin, ApoB, Lp(a), liver, kidney, inflammation and more), 14-day Lingo CGM glucose monitor, and personalised written clinical action plan.",
    successPath: "/book/thank-you",
  },
  "baseline-same-day": {
    name: "Veridian Baseline — Same-Day Rate",
    amount: 50575,
    description:
      "Same-day booking rate (15% discount). Two GP consultations (initial clinical session + blood results review), advanced metabolic blood panel (HbA1c, fasting insulin, ApoB, Lp(a), liver, kidney, inflammation and more), 14-day Lingo CGM glucose monitor, and personalised written clinical action plan.",
    successPath: "/book/thank-you",
    cancelPath: "/assessments",
  },
  "longevity-same-day": {
    name: "Veridian Longevity Panel — Same-Day Rate",
    amount: 55650,
    description:
      "Same-day booking rate (30% discount). 150+ marker longevity panel including two GP consultations, full hormonal profile, Omega-3 index, gut markers, pancreatic health, and comprehensive cardiovascular risk. Comprehensive longevity report with biological age assessment.",
    successPath: "/book/thank-you",
    cancelPath: "/assessments",
  },
  "programme-same-day": {
    name: "12-Week Metabolic Reset — Same-Day Rate",
    amount: 132650,
    description:
      "Same-day booking rate (30% discount). 12-week structured reset including everything in the Veridian Baseline, second CGM cycle, fortnightly coaching, clinical review via partner providers where indicated, and personalised nutrition, movement and recovery protocol.",
    successPath: "/book/thank-you",
    cancelPath: "/assessments",
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
  turnstileToken?: string;
};

function resolveTier(rawTier?: string) {
  const normalized = `${rawTier || ""}`.trim().toLowerCase();
  return tierAliasMap[normalized] || normalized;
}

export async function POST(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }
    const stripe = new Stripe(stripeKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const payload = (await request.json()) as CheckoutPayload;

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const turnstileOk = await verifyTurnstileToken(payload.turnstileToken || "", clientIp);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
    }

    const tier = resolveTier(payload.tier);
    const product = tierCatalog[tier];

    if (tier === "discovery-quiz") {
      const cookieHeader = request.headers.get("cookie") || "";
      const hasGate = cookieHeader.split(";").some((c) => c.trim() === "quiz_gate=1");
      if (!hasGate) {
        return NextResponse.json(
          { error: "This rate requires completing the free metabolic quiz first." },
          { status: 403 }
        );
      }
    }

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
      allow_promotion_codes: true,
      payment_method_types: ["card"],
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
      success_url: `${baseUrl}${product.successPath ?? "/book/thank-you"}?tier=${encodeURIComponent(
        tier
      )}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${product.cancelPath ?? "/book"}?tier=${encodeURIComponent(tier)}&cancelled=1`,
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
