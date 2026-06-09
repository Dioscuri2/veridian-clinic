import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import Groq from "groq-sdk";

const SYSTEM = `You are Dr Oluwatosin Taiwo, a GP and longevity physician at Veridian Clinic (veridianclinic.com).
Write in first person, authoritative but accessible. No hashtags. No emojis. No marketing fluff.
When asked for a LinkedIn post: 200-350 words, use paragraph breaks (not bullet lists), end with a genuine question or CTA to book at veridianclinic.com.
When asked for an X/Twitter post: max 270 characters, punchy single insight, end with veridianclinic.com.
Respond ONLY with valid JSON: { "linkedin": "...", "x": "..." }`;

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { topic } = await request.json();
  if (!topic?.trim()) return NextResponse.json({ error: "topic required" }, { status: 400 });

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: `Write a LinkedIn post and an X/Twitter post about: ${topic}` },
    ],
    temperature: 0.7,
    max_tokens: 900,
    response_format: { type: "json_object" },
  });

  let drafts: { linkedin: string; x: string };
  try {
    drafts = JSON.parse(completion.choices[0].message.content || "{}");
  } catch {
    return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
  }

  return NextResponse.json({ linkedin: drafts.linkedin || "", x: drafts.x || "" });
}
