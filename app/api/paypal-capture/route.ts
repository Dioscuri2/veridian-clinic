import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

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
    const { orderId } = await req.json() as { orderId?: string };
    if (!orderId) return NextResponse.json({ error: "No order ID provided." }, { status: 400 });

    const accessToken = await getAccessToken();
    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    });
    const data = await captureRes.json() as { status?: string; id?: string };

    if (data.status !== "COMPLETED") {
      throw new Error(`PayPal capture returned status: ${data.status ?? "unknown"}`);
    }

    return NextResponse.json({ ok: true, orderId: data.id ?? orderId });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Payment capture failed." },
      { status: 500 }
    );
  }
}
