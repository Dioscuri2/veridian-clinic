import crypto from "crypto";
import { Redis } from "@upstash/redis";
import { updatePost, SocialPost } from "./socialQueue";

const LI_KEY = "veridian:social:linkedin";

export interface LinkedInTokens {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
  person_urn: string;
  name?: string;
}

function r(): Redis {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// ── LinkedIn token storage ────────────────────────────────────────────────────

export async function getLinkedInTokens(): Promise<LinkedInTokens | null> {
  const raw = await r().get(LI_KEY);
  if (!raw) return null;
  return (typeof raw === "string" ? JSON.parse(raw) : raw) as LinkedInTokens;
}

export async function saveLinkedInTokens(tokens: LinkedInTokens): Promise<void> {
  await r().set(LI_KEY, JSON.stringify(tokens));
}

// ── LinkedIn posting ──────────────────────────────────────────────────────────

export async function getValidLinkedInToken(): Promise<{ token: string; personUrn: string } | null> {
  let tokens = await getLinkedInTokens();
  if (!tokens) return null;

  if (tokens.expires_at - Date.now() < 300_000 && tokens.refresh_token) {
    const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: tokens.refresh_token,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      tokens = {
        ...tokens,
        access_token: data.access_token,
        refresh_token: data.refresh_token || tokens.refresh_token,
        expires_at: Date.now() + data.expires_in * 1000,
      };
      await saveLinkedInTokens(tokens);
    }
  }

  if (tokens.expires_at < Date.now()) return null;
  return { token: tokens.access_token, personUrn: tokens.person_urn };
}

export async function postToLinkedIn(content: string): Promise<{ ok: boolean; postId?: string; error?: string }> {
  const creds = await getValidLinkedInToken();
  if (!creds) return { ok: false, error: "LinkedIn not connected or token expired" };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: creds.personUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: content },
          shareMediaCategory: "NONE",
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });

  if (!res.ok) return { ok: false, error: await res.text() };
  return { ok: true, postId: res.headers.get("x-restli-id") || undefined };
}

// ── X / Twitter posting ───────────────────────────────────────────────────────

function xOAuthHeader(method: string, url: string): string {
  const ck = process.env.TWITTER_CONSUMER_KEY!;
  const cs = process.env.TWITTER_CONSUMER_SECRET!;
  const at = process.env.TWITTER_ACCESS_TOKEN!;
  const as = process.env.TWITTER_ACCESS_SECRET!;

  const nonce = crypto.randomBytes(16).toString("hex");
  const ts = Math.floor(Date.now() / 1000).toString();

  const params: Record<string, string> = {
    oauth_consumer_key: ck,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: ts,
    oauth_token: at,
    oauth_version: "1.0",
  };

  const sorted = Object.keys(params)
    .sort()
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const base = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sorted)}`;
  const sigKey = `${encodeURIComponent(cs)}&${encodeURIComponent(as)}`;
  const sig = crypto.createHmac("sha1", sigKey).update(base).digest("base64");

  const headerParams = { ...params, oauth_signature: sig };
  return "OAuth " + Object.entries(headerParams)
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(", ");
}

export async function postToTwitter(content: string): Promise<{ ok: boolean; tweetId?: string; error?: string }> {
  if (!process.env.TWITTER_CONSUMER_KEY) return { ok: false, error: "X/Twitter not connected" };

  const url = "https://api.twitter.com/2/tweets";
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: xOAuthHeader("POST", url), "Content-Type": "application/json" },
    body: JSON.stringify({ text: content }),
  });

  if (!res.ok) return { ok: false, error: await res.text() };
  const data = await res.json();
  return { ok: true, tweetId: data.data?.id };
}

// ── Publish a queued post ─────────────────────────────────────────────────────

export async function publishPost(post: SocialPost): Promise<{ ok: boolean; errors: string[] }> {
  const errors: string[] = [];

  if (post.platform === "linkedin" || post.platform === "both") {
    const r = await postToLinkedIn(post.linkedinContent);
    if (!r.ok) errors.push(`LinkedIn: ${r.error}`);
  }
  if (post.platform === "twitter" || post.platform === "both") {
    const r = await postToTwitter(post.xContent);
    if (!r.ok) errors.push(`X: ${r.error}`);
  }

  if (errors.length > 0) {
    await updatePost(post.id, { status: "failed", errorMsg: errors.join(" | ") });
  } else {
    await updatePost(post.id, { status: "posted", postedAt: Date.now() });
  }

  return { ok: errors.length === 0, errors };
}
