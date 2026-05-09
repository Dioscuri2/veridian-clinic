import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "";
const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_VERIDIAN || "";

// ── GET — Meta webhook verification handshake ────────────────────────────────
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

// ── POST — incoming WhatsApp messages ────────────────────────────────────────
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
    const from = msg.from as string;           // sender phone number
    const msgId = msg.id as string;
    const type = msg.type as string;           // text | image | audio | etc.
    const text = msg.text?.body as string | undefined;
    const contact = value?.contacts?.[0];
    const senderName = contact?.profile?.name ?? from;
    const timestamp = new Date(Number(msg.timestamp) * 1000).toISOString();

    // 1. Auto-reply: send acknowledgement so the patient knows we received it
    if (WA_TOKEN && (type === "text" || type === "image" || type === "audio")) {
      await sendWhatsAppReply(from, msgId,
        "Thank you for messaging Veridian Clinic. We've received your message and will respond within a few hours during clinic hours (Mon–Fri, 9am–6pm). If this is a medical emergency, please call 999."
      );
    }

    // 2. Alert via Discord
    if (DISCORD_WEBHOOK) {
      await notifyDiscord({ from, senderName, type, text, timestamp, msgId });
    }

    // 3. Log to console so Benji / server logs capture it
    console.log(JSON.stringify({
      event: "whatsapp_message",
      from,
      senderName,
      type,
      text: text?.slice(0, 200),
      timestamp,
      msgId,
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
  const payload = {
    content: `📱 **WhatsApp message — Veridian Clinic**\n**From:** ${senderName} (+${from})\n**Type:** ${type}\n**Time:** ${timestamp}${preview}\n\nReply via Meta Business Suite or WhatsApp Manager.`,
  };
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
}
