import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_VERIDIAN || "";

function r(): Redis {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

async function pingDiscord(data: Record<string, unknown>) {
  if (!DISCORD_WEBHOOK) return;
  const symptoms = (data.topSymptoms as string[]).join(", ") || "none selected";
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "Blood Test Questionnaire Submitted",
        color: 0xc8a84b,
        fields: [
          { name: "Email", value: String(data.email), inline: true },
          { name: "Panel", value: String(data.tier), inline: true },
          { name: "Age / Sex", value: `${data.age || "?"}  ${data.sex || "?"}`, inline: true },
          { name: "Top symptoms", value: symptoms },
          { name: "Prompted by", value: String(data.promptedBy || "not specified"), inline: true },
          { name: "Previous results", value: String(data.previousResults || "not specified"), inline: true },
          { name: "Goal", value: String(data.primaryGoal || "not specified") },
        ],
        timestamp: new Date().toISOString(),
      }],
    }),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, tier, age, sex, menstrualStatus, topSymptoms, medications, promptedBy, previousResults, primaryGoal } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }

    const key = `veridian:questionnaire:${email.toLowerCase().trim()}`;
    const payload = {
      email: email.toLowerCase().trim(),
      tier: tier || "unknown",
      age: age || "",
      sex: sex || "",
      menstrualStatus: menstrualStatus || "",
      topSymptoms: Array.isArray(topSymptoms) ? topSymptoms : [],
      medications: medications || "",
      promptedBy: promptedBy || "",
      previousResults: previousResults || "",
      primaryGoal: primaryGoal || "",
      submittedAt: new Date().toISOString(),
    };

    await r().set(key, JSON.stringify(payload), { ex: 60 * 60 * 24 * 180 }); // 180-day TTL

    pingDiscord(payload).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("questionnaire route error", e);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
