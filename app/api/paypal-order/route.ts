import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://veridianclinic.com";

const CATALOG: Record<string, { name: string; amount: string }> = {
  "womens-hormones":    { name: "Is It My Hormones?, Women's Hormone Panel", amount: "325.00" },
  "mens-testosterone":  { name: "Running on Empty, Men's Hormone Panel", amount: "325.00" },
  "cardiovascular-risk":{ name: "What Your Cholesterol Test Missed, Cardiovascular Panel", amount: "349.00" },
  "fatigue-energy":     { name: "Tired of Being Told You're Fine, Fatigue & Energy Panel", amount: "249.00" },
  "metabolic-weight":   { name: "Why Won't The Weight Budge?, Metabolic Panel", amount: "199.00" },
  "optimiser-baseline": { name: "The Optimiser's Baseline, Performance Panel", amount: "395.00" },
  "metabolic-screen":   { name: "Veridian Energy Screen", amount: "195.00" },
  baseline:             { name: "Veridian Baseline", amount: "595.00" },
  "longevity-panel":    { name: "Veridian Longevity Panel", amount: "795.00" },
  discovery:            { name: "GP Discovery Call", amount: "195.00" },
  "discovery-quiz":     { name: "GP Discovery Call, Quiz Rate", amount: "97.00" },
  programme:            { name: "12-Week Metabolic Reset", amount: "1895.00" },
};

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("PayPal is not configured.");
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json() as { access_token?: string };
  if (!data.access_token) throw new Error("PayPal authentication failed.");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { tier, name, email } = await req.json() as { tier?: string; name?: string; email?: string };
    const product = CATALOG[tier || ""];
    if (!product) return NextResponse.json({ error: "Invalid tier." }, { status: 400 });

    const accessToken = await getAccessToken();

    type PayerName = { given_name: string; surname?: string };
    const payerName: PayerName | undefined = name
      ? { given_name: name.split(" ")[0], surname: name.split(" ").slice(1).join(" ") || undefined }
      : undefined;

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: "GBP", value: product.amount },
          description: product.name,
          custom_id: tier,
          soft_descriptor: "VeridianClinic",
        }],
        payer: email ? { email_address: email, name: payerName } : undefined,
        application_context: {
          brand_name: "Veridian Clinic",
          locale: "en-GB",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
          return_url: `${SITE_URL}/book/paypal-return?tier=${encodeURIComponent(tier || "")}`,
          cancel_url: `${SITE_URL}/book?tier=${encodeURIComponent(tier || "")}&cancelled=1`,
        },
      }),
    });

    const order = await orderRes.json() as { links?: Array<{ rel: string; href: string }> };
    const approvalUrl = order.links?.find(l => l.rel === "approve")?.href;
    if (!approvalUrl) throw new Error("PayPal order creation failed, no approval URL returned.");

    return NextResponse.json({ url: approvalUrl });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PayPal is currently unavailable." },
      { status: 500 }
    );
  }
}
