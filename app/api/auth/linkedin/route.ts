import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, computeAdminToken } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "LINKEDIN_CLIENT_ID not set on Railway" }, { status: 500 });
  }

  const state = computeAdminToken(process.env.ADMIN_PASSWORD || "");
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/linkedin/callback`;
  const scopes = "openid profile w_member_social offline_access";

  const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scopes);
  url.searchParams.set("state", state);

  return NextResponse.redirect(url.toString());
}
