import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { sendIntakeInvite } from "@/lib/intakeSequence";

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const email: string = (body.email || "").trim();
  const firstName: string = (body.firstName || "").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid patient email is required." }, { status: 400 });
  }

  try {
    await sendIntakeInvite(email, firstName);
  } catch (err) {
    console.error("[admin/intake-invite]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send intake invite." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Intake invite sent to ${email}. Reminders scheduled for +2 and +5 days, and will cancel automatically if the form is submitted.`,
  });
}
