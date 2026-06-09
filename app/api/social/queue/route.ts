import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { listPosts } from "@/lib/socialQueue";
import { getLinkedInTokens } from "@/lib/socialPost";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [posts, liTokens] = await Promise.all([
    listPosts().catch(() => []),
    getLinkedInTokens().catch(() => null),
  ]);

  const linkedin = liTokens
    ? { connected: liTokens.expires_at > Date.now(), name: liTokens.name }
    : { connected: false };

  const twitter = { connected: !!process.env.TWITTER_CONSUMER_KEY };

  return NextResponse.json({ posts, linkedin, twitter });
}
