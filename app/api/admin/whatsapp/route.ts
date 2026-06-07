import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";

const GIST_ID = process.env.GITHUB_GIST_WA_ID || "";
const GH_TOKEN = process.env.GITHUB_TOKEN || "";
const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "";
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "";

async function readGist(): Promise<any[]> {
  if (!GIST_ID || !GH_TOKEN) return [];
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { Authorization: `token ${GH_TOKEN}`, "User-Agent": "veridian-clinic" },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  const content = data?.files?.["wa_messages.json"]?.content;
  if (!content) return [];
  try { return JSON.parse(content).messages || []; } catch { return []; }
}

async function writeGist(messages: any[]) {
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "veridian-clinic",
    },
    body: JSON.stringify({
      files: { "wa_messages.json": { content: JSON.stringify({ messages }, null, 2) } },
    }),
  });
}

// GET, list messages newest first
export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const messages = await readGist();
  return NextResponse.json({ messages: [...messages].reverse() });
}

// POST, send reply + optionally mark message replied
export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { to, text, replyToMsgId, markId } = await req.json();
  if (!to || !text) return NextResponse.json({ error: "Missing to/text" }, { status: 400 });

  const waBody: any = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  };
  if (replyToMsgId) waBody.context = { message_id: replyToMsgId };

  const waRes = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(waBody),
  });

  if (!waRes.ok) {
    const err = await waRes.json().catch(() => ({}));
    return NextResponse.json({ error: "WA send failed", detail: err }, { status: 502 });
  }

  if (markId) {
    const messages = await readGist();
    const idx = messages.findIndex((m: any) => m.id === markId);
    if (idx >= 0) {
      messages[idx].replied = true;
      messages[idx].repliedAt = new Date().toISOString();
      await writeGist(messages);
    }
  }

  return NextResponse.json({ status: "sent" });
}
