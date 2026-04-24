import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { readFileSync } from "node:fs";
import path from "node:path";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return new NextResponse("Missing session_id", { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return new NextResponse("Payment verification unavailable", { status: 500 });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return new NextResponse("Payment not completed", { status: 403 });
    }

    // Verify this was a guide purchase
    const tier = session.metadata?.tier;
    if (tier && tier !== "guide") {
      return new NextResponse("Invalid access", { status: 403 });
    }
  } catch {
    return new NextResponse("Unable to verify payment", { status: 403 });
  }

  try {
    const pdfPath = path.join(process.cwd(), "private", "guides", "metabolic-reset-guide.pdf");
    const pdfBuffer = readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Veridian-Metabolic-Reset-Guide.pdf"',
        "Content-Length": String(pdfBuffer.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Guide file not found", { status: 500 });
  }
}
