import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = (process.env.WHATSAPP_VERIFY_TOKEN || "").trim();
// Stripped, not just trimmed: a newline pasted into the middle of a Railway
// value makes Headers.append throw "invalid header value", which killed this
// entire handler and silently lost the patient's message.
const WA_TOKEN = (process.env.WHATSAPP_ACCESS_TOKEN || "").replace(/\s/g, "");
const DISCORD_WEBHOOK = (process.env.DISCORD_WEBHOOK_VERIDIAN || "").replace(/^"|"$/g, "").trim();
const GIST_ID = (process.env.GITHUB_GIST_WA_ID || "").replace(/^"|"$/g, "").trim();
const GH_TOKEN = (process.env.GITHUB_TOKEN || "").replace(/^"|"$/g, "").trim();

// ── GET, Meta webhook verification handshake ────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ── POST, incoming WhatsApp messages ────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const entry = (body as any)?.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;
  const messages: any[] = value?.messages ?? [];

  if (!messages.length) {
    return NextResponse.json({ status: "no_messages" });
  }

  for (const msg of messages) {
    const from = msg.from as string;
    const msgId = msg.id as string;
    const type = msg.type as string;
    const text = msg.text?.body as string | undefined;
    const contact = value?.contacts?.[0];
    const senderName = contact?.profile?.name ?? from;
    const timestamp = new Date(Number(msg.timestamp) * 1000).toISOString();

    // Order matters. Store and alert first, acknowledge second: a patient's
    // message must survive even if every outbound call fails. Each step is
    // isolated so one failure cannot swallow the message, which is exactly
    // what happened while the access token held a newline.

    // 1. Persist to GitHub Gist for the admin inbox
    if (GIST_ID && GH_TOKEN) {
      try {
        await appendToGist({ id: msgId, from, name: senderName, type, text, timestamp });
      } catch (err) {
        console.error("whatsapp: gist write failed", err);
      }
    }

    // 2. Discord alert
    if (DISCORD_WEBHOOK) {
      try {
        await notifyDiscord({ from, senderName, type, text, timestamp, msgId });
      } catch (err) {
        console.error("whatsapp: discord alert failed", err);
      }
    }

    // 3. Auto-reply acknowledgement
    if (WA_TOKEN && (type === "text" || type === "image" || type === "audio")) {
      try {
        await sendWhatsAppReply(from, msgId,
          "Thanks for messaging Veridian Clinic. Dr Taiwo will reply personally, usually within a few hours. Appointments run Monday, Wednesday and Friday, 10:00 to 14:00 and 19:00 to 21:00, and evening slots are available. If this is a medical emergency please call 999, or 111 if you are unsure and it is not an emergency."
        );
      } catch (err) {
        console.error("whatsapp: auto-reply failed", err);
      }
    }

    console.log(JSON.stringify({
      event: "whatsapp_message",
      from, senderName, type, text: text?.slice(0, 200), timestamp, msgId,
    }));
  }

  return NextResponse.json({ status: "ok" });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function sendWhatsAppReply(to: string, replyToId: string, bodyText: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!phoneNumberId || !WA_TOKEN) return;

  await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      context: { message_id: replyToId },
      type: "text",
      text: { body: bodyText },
    }),
  }).catch(() => null);
}

async function notifyDiscord({ from, senderName, type, text, timestamp }: {
  from: string; senderName: string; type: string; text?: string; timestamp: string; msgId: string;
}) {
  const preview = text ? `\n> "${text.slice(0, 200)}"` : "";
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `📱 **WhatsApp message, Veridian Clinic**\n**From:** ${senderName} (+${from})\n**Type:** ${type}\n**Time:** ${timestamp}${preview}\n\nReply via Meta Business Suite or the admin inbox at veridianclinic.com/admin`,
    }),
  }).catch(() => null);
}

async function appendToGist(msg: {
  id: string; from: string; name: string; type: string; text?: string; timestamp: string;
}) {
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { Authorization: `token ${GH_TOKEN}`, "User-Agent": "veridian-clinic" },
    });
    if (!res.ok) return;
    const data = await res.json();
    const raw = data?.files?.["wa_messages.json"]?.content || '{"messages":[]}';
    const parsed = JSON.parse(raw);
    const messages: any[] = parsed.messages || [];
    messages.push({ ...msg, replied: false });
    // Keep last 500 messages
    const trimmed = messages.slice(-500);
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "veridian-clinic",
      },
      body: JSON.stringify({
        files: { "wa_messages.json": { content: JSON.stringify({ messages: trimmed }, null, 2) } },
      }),
    });
  } catch { /* non-fatal, messages still logged and alerted */ }
}
