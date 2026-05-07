import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

const HMAC_MESSAGE = "veridian-admin-v1";

export function computeAdminToken(password: string): string {
  return createHmac("sha256", password).update(HMAC_MESSAGE).digest("hex");
}

export function verifyAdminRequest(request: NextRequest): boolean {
  const cookie = request.cookies.get("__va")?.value;
  const password = process.env.ADMIN_PASSWORD || "";
  if (!cookie || !password) return false;
  const expected = computeAdminToken(password);
  if (cookie.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(cookie), Buffer.from(expected));
}
