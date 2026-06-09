import { NextRequest, NextResponse } from "next/server";
import { computeAdminToken } from "@/lib/adminAuth";
import { saveLinkedInTokens } from "@/lib/socialPost";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const adminToken = computeAdminToken(process.env.ADMIN_PASSWORD || "");
  if (!state || state !== adminToken) {
    return NextResponse.redirect(new URL("/admin?tab=social&error=csrf", request.url));
  }
  if (error || !code) {
    return NextResponse.redirect(new URL(`/admin?tab=social&error=${error || "no_code"}`, request.url));
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID!;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/linkedin/callback`;

  // Exchange code for tokens
  const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error("LinkedIn token exchange failed:", err);
    return NextResponse.redirect(new URL("/admin?tab=social&error=token_exchange", request.url));
  }

  const tokenData = await tokenRes.json();

  // Get person URN and name via userinfo (OpenID Connect)
  const userRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(new URL("/admin?tab=social&error=userinfo", request.url));
  }

  const userInfo = await userRes.json();
  // sub is the LinkedIn member ID; URN format is urn:li:person:{id}
  const personUrn = `urn:li:person:${userInfo.sub}`;

  await saveLinkedInTokens({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_at: Date.now() + (tokenData.expires_in || 5183944) * 1000,
    person_urn: personUrn,
    name: userInfo.name || userInfo.given_name || "Dr Tosin",
  });

  return NextResponse.redirect(new URL("/admin?tab=social&connected=linkedin", request.url));
}
