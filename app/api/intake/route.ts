import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_VERIDIAN || "";

interface IntakeFields {
  name: string;
  email: string;
  dob: string;
  medications: string;
  conditions: string;
  symptoms: string;
  recentTests: string;
  smoking: string;
  notes: string;
  recordingUrl: string;
}

function buildEmailHtml(f: IntakeFields): string {
  const rows: [string, string][] = [
    ["Name", f.name],
    ["Email", f.email],
    ["Date of birth", f.dob],
    ["Current medications", f.medications || "None stated"],
    ["Medical conditions / diagnoses", f.conditions || "None stated"],
    ["Symptoms / reason for booking", f.symptoms],
    ["Recent NHS blood tests (12 mo)", f.recentTests],
    ["Smoking status", f.smoking],
    ["Additional notes for Dr Tosin", f.notes || "None"],
    ["Voice/video recording link", f.recordingUrl || "Not provided"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="font-size:.8rem;font-weight:700;color:#5a534a;padding:10px 12px 10px 0;vertical-align:top;width:200px;border-bottom:1px solid rgba(0,0,0,.06);">${label}</td><td style="font-size:.88rem;color:#2c2a26;padding:10px 0;vertical-align:top;border-bottom:1px solid rgba(0,0,0,.06);white-space:pre-wrap;">${value}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
  <tr><td align="center">
    <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#fff;border:1px solid rgba(0,0,0,.08);">
      <tr><td style="background:#2c2a26;padding:20px 32px;">
        <p style="margin:0;font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#c8a84b;">NEW CLINICAL INTAKE</p>
        <p style="margin:4px 0 0;font-size:1.1rem;font-weight:600;color:#f6f1e8;">Patient: ${f.name}</p>
      </td></tr>
      <tr><td style="padding:32px;">
        <table width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
        <p style="margin:24px 0 0;font-size:.74rem;color:#8a8278;">Submitted via veridianclinic.com/intake &middot; ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/London" })}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

async function sendEmail(f: IntakeFields) {
  if (!BREVO_API_KEY) return;
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "Veridian Intake", email: "support@veridianclinic.com" },
      to: [{ email: "support@veridianclinic.com", name: "Dr Tosin Taiwo" }],
      subject: `Clinical intake: ${f.name}`,
      htmlContent: buildEmailHtml(f),
      tags: ["clinical-intake"],
    }),
  });
}

async function pingDiscord(f: IntakeFields) {
  if (!DISCORD_WEBHOOK) return;
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "New clinical intake",
          color: 0xc8a84b,
          fields: [
            { name: "Patient", value: f.name, inline: true },
            { name: "Email", value: f.email, inline: true },
            { name: "DOB", value: f.dob, inline: true },
            { name: "Reason for booking", value: f.symptoms.slice(0, 1000) },
          ],
          footer: { text: "Review at https://veridianclinic.com/admin" },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, dob, medications, conditions, symptoms, recentTests, smoking, notes, recordingUrl, turnstileToken } = body;

    if (!name?.trim() || !email?.trim() || !symptoms?.trim()) {
      return NextResponse.json({ error: "Name, email and reason for booking are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email as string).trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const turnstileOk = await verifyTurnstileToken(turnstileToken || "", ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
    }

    const fields: IntakeFields = {
      name: (name as string).trim(),
      email: (email as string).trim().toLowerCase(),
      dob: ((dob as string) || "Not provided").trim(),
      medications: ((medications as string) || "").trim(),
      conditions: ((conditions as string) || "").trim(),
      symptoms: (symptoms as string).trim(),
      recentTests: ((recentTests as string) || "Not stated").trim(),
      smoking: ((smoking as string) || "Not stated").trim(),
      notes: ((notes as string) || "").trim(),
      recordingUrl: ((recordingUrl as string) || "").trim(),
    };

    await Promise.all([sendEmail(fields), pingDiscord(fields)]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to submit. Please try again." }, { status: 500 });
  }
}
