import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { intakeFilename, intakeMarkdown, listIntakes } from "@/lib/intakeStore";

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
