import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";

// DELIBERATELY NOT GROQ_API_KEY. That key serves Ava, the public website
// chatbot, on a free Groq tier whose quota is shared across the account.
// Transcribing a few voice notes through it could rate limit a patient-facing
// chatbot to save a clinician a manual step, which is the wrong trade. This
// tool stays dark unless it is given its own key.
const TRANSCRIBE_KEY = process.env.TRANSCRIBE_GROQ_API_KEY || "";

// Groq's audio endpoint caps uploads. WhatsApp voice notes are opus and tiny
// (a 10 minute note is well under 2 MB), so this ceiling is generous.
const MAX_BYTES = 24 * 1024 * 1024;

// whisper-large-v3 rather than the turbo variant: this is clinical history,
// often accented, and accuracy matters more than the second or two saved.
const MODEL = "whisper-large-v3";

/**
 * Wraps a verbatim transcript in the same shape as the intake notification
 * email, so there is one format to paste into the scribe whichever route the
 * patient took.
 *
 * The transcript is NOT summarised, restructured or paraphrased by a model.
 * This is a clinical record: putting an LLM between the patient's words and
 * the note would introduce invented detail that reads exactly like fact.
 * Heidi does the structuring downstream, from the patient's actual words.
 */
function buildContextBlock(transcript: string, label: string): string {
  return [
    "PRE-CONSULTATION CONTEXT (from voice note)",
    label ? `Source file: ${label}` : "",
    `Transcribed: ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/London" })}`,
    `Transcription: Groq ${MODEL}, verbatim, not edited or summarised`,
    "",
    "PATIENT'S SPOKEN ACCOUNT (verbatim)",
    transcript.trim() || "[no speech detected]",
    "",
    "STILL TO CONFIRM IN CONSULTATION",
    "- Allergies and the reaction",
    "- Current medication and doses",
    "- Pregnancy or breastfeeding, if applicable",
    "- NHS GP practice, and consent to share a summary",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!TRANSCRIBE_KEY) {
    return NextResponse.json(
      {
        error:
          "Transcription is not configured. Send the voice note straight into Heidi, or into Cue, which needs no key. To enable this page instead, set TRANSCRIBE_GROQ_API_KEY on Railway. Do not reuse GROQ_API_KEY: that one serves Ava on the public site.",
      },
      { status: 503 },
    );
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
  } catch {
    return NextResponse.json({ error: "Could not read the upload." }, { status: 400 });
  }

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "Attach an audio file." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 24 MB.` },
      { status: 400 },
    );
  }

  const upstream = new FormData();
  upstream.set("file", file, file.name || "voice-note");
  upstream.set("model", MODEL);
  upstream.set("response_format", "json");
  upstream.set("temperature", "0");
  // Pin the language. Auto-detect occasionally flips on short or noisy audio
  // and returns a translation rather than a transcript.
  upstream.set("language", "en");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${TRANSCRIBE_KEY}` },
      body: upstream,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[admin/transcribe] Groq rejected the audio:", res.status, detail.slice(0, 300));
      return NextResponse.json(
        { error: `Transcription failed (${res.status}). ${detail.slice(0, 200)}` },
        { status: 502 },
      );
    }

    const data = (await res.json()) as { text?: string };
    const transcript = (data.text || "").trim();

    return NextResponse.json({
      ok: true,
      transcript,
      contextBlock: buildContextBlock(transcript, file.name || ""),
      model: MODEL,
      bytes: file.size,
    });
  } catch (err) {
    console.error("[admin/transcribe] failed:", err);
    return NextResponse.json({ error: "Transcription failed. Please try again." }, { status: 500 });
  }
}
