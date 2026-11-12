import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { intakeFilename, intakeMarkdown, listIntakes, saveIntake } from "@/lib/intakeStore";

export const dynamic = "force-dynamic";

// Every saved intake, newest first, each with its ready-made .md file. Read by
// /admin/intakes and by the Mac mini sync script (veridian-ops/intake_sync.py).
export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { intakes, unreadable } = await listIntakes();
    return NextResponse.json(
      {
        ok: true,
        unreadable,
        intakes: intakes.map((i) => ({
          ...i,
          filename: intakeFilename(i),
          markdown: intakeMarkdown(i),
        })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[admin/intakes] list failed:", err);
    return NextResponse.json(
      { error: `Could not load intakes. ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 },
    );
  }
}

// Files answers the patient sent outside the form (WhatsApp message or a
// voice-note transcript) into the same encrypted record, marked as such.
export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim().slice(0, 120);
    const text = String(body?.text || "").trim().slice(0, 20000);
    if (!name || !text) {
      return NextResponse.json({ error: "A patient name and their answers are both needed." }, { status: 400 });
    }
    const saved = await saveIntake({
      name,
      email: "",
      text,
      source: "WhatsApp answers, added by the clinic",
    });
    return NextResponse.json(
      { ok: true, intake: { ...saved, filename: intakeFilename(saved), markdown: intakeMarkdown(saved) } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[admin/intakes] add failed:", err);
    return NextResponse.json(
      { error: `Could not save the intake. ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 },
    );
  }
}
