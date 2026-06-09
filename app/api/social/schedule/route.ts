import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { queuePost } from "@/lib/socialQueue";

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { platform, linkedinContent, xContent, scheduledAt } = body;

  if (!platform || !scheduledAt) return NextResponse.json({ error: "platform and scheduledAt required" }, { status: 400 });
  if ((platform === "linkedin" || platform === "both") && !linkedinContent?.trim())
    return NextResponse.json({ error: "LinkedIn content required" }, { status: 400 });
  if ((platform === "twitter" || platform === "both") && !xContent?.trim())
    return NextResponse.json({ error: "X content required" }, { status: 400 });
  if (xContent && xContent.trim().length > 280)
    return NextResponse.json({ error: "X post exceeds 280 characters" }, { status: 400 });

  const post = await queuePost({ platform, linkedinContent: linkedinContent || "", xContent: xContent || "", scheduledAt });
  return NextResponse.json({ post });
}
