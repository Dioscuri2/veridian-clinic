import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { AVA_SYSTEM_PROMPT } from "@/lib/ava-knowledge";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: AVA_SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
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
