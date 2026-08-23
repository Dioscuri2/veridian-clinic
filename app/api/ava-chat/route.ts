import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { AVA_SYSTEM_PROMPT } from "@/lib/ava-knowledge";

const MAX_HISTORY = 10;

type HistoryEntry = { role: "user" | "assistant"; content: string };

function normaliseHistory(raw: unknown): HistoryEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-MAX_HISTORY)
    .filter(
      (e) =>
        e &&
        typeof e === "object" &&
        (e.role === "user" || e.role === "assistant") &&
        typeof e.content === "string" &&
        e.content.trim()
    )
    .map((e) => ({ role: e.role, content: e.content.trim() }));
}

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message =
    body && typeof (body as Record<string, unknown>).message === "string"
      ? ((body as Record<string, unknown>).message as string).trim()
      : "";

  if (!message) {
    return NextResponse.json(
      { error: "message must be a non-empty string" },
      { status: 400 }
    );
  }

  if (message.length > 600) {
    return NextResponse.json(
      { error: "Message too long. Please keep your question under 600 characters." },
      { status: 400 }
    );
  }

  const history = normaliseHistory(
    (body as Record<string, unknown>).history
  );

  try {
    const completion = await groq.chat.completions.create({
      // llama-3.3-70b-versatile was decommissioned by Groq and every request
      // 404d, so Ava answered "busy right now" to every visitor. gpt-oss-120b
      // spends tokens on a separate reasoning field, so max_tokens has to cover
      // both that and the visible reply.
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: AVA_SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: 800,
      temperature: 0.5,
    });

    // The model keeps emitting typographic dashes and non-breaking hyphens
    // however firmly the prompt forbids them, and they are stripped site-wide.
    // Normalise deterministically rather than relying on instruction-following.
    const sanitise = (t: string) =>
      t
        .replace(/[\u2014\u2013\u2012\u2015]/g, ", ")
        .replace(/[\u2010\u2011\u2212]/g, "-")
        .replace(/\u00a0/g, " ")
        .replace(/ {2,}/g, " ")
        .replace(/ ,/g, ",")
        .replace(/,\s*,/g, ",");

    const reply = sanitise(
      completion.choices[0]?.message?.content?.trim() ?? ""
    ).trim();
    if (!reply) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error("Ava chat error:", err);
    return NextResponse.json(
      { error: "Ava is busy right now. Please try again in a moment." },
      { status: 503 }
    );
  }
}
