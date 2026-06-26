import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "veridianclinic", ts: new Date().toISOString() },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
