import { NextRequest, NextResponse } from "next/server";
import { computeAdminToken } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminPassword || !password || password !== adminPassword) {
    await new Promise((r) => setTimeout(r, 800)); // Slow brute-force
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = computeAdminToken(adminPassword);
  const response = NextResponse.json({ ok: true });

  response.cookies.set("__va", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
