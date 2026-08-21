import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { getValidLinkedInToken } from "@/lib/socialPost";

/**
 * Delete a published LinkedIn post.
 *
 * LinkedIn's API cannot edit the text of a published ugcPost, so correcting a
 * post that carries an inaccurate clinical claim means deleting and reposting.
 * Admin-guarded exactly like /api/social/post-with-image.
 *
 * POST { "postId": "urn:li:share:1234567890" }
 */
export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await request.json().catch(() => ({ postId: null }));

  if (typeof postId !== "string" || !postId.startsWith("urn:li:")) {
    return NextResponse.json(
      { error: "postId must be a LinkedIn URN, e.g. urn:li:share:123" },
      { status: 400 }
    );
  }

  const creds = await getValidLinkedInToken();
  if (!creds) {
    return NextResponse.json({ error: "LinkedIn not connected" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.linkedin.com/v2/ugcPosts/${encodeURIComponent(postId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  );

  // LinkedIn answers 204 on success and 404 when the post is already gone.
  if (!res.ok && res.status !== 404) {
    return NextResponse.json(
      { error: `LinkedIn delete failed: ${res.status} ${await res.text()}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, postId, alreadyGone: res.status === 404 });
}
