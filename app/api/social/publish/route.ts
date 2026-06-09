import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { listPosts, getDuePosts } from "@/lib/socialQueue";
import { publishPost } from "@/lib/socialPost";

export async function POST(request: NextRequest) {
  // Allow admin or cron (cron passes Authorization: Bearer {CRON_SECRET})
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const isCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const isAdmin = verifyAdminRequest(request);
  if (!isAdmin && !isCron) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { id } = body as { id?: string };

  if (id) {
    const posts = await listPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    const result = await publishPost(post);
    return NextResponse.json(result);
  }

  // Publish all due posts
  const due = await getDuePosts();
  const results = await Promise.all(due.map(p => publishPost(p)));
  return NextResponse.json({ published: results.length, results });
}
