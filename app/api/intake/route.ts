import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { cancelIntakeReminders } from "@/lib/intakeSequence";
import { verifyAdminRequest } from "@/lib/adminAuth";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
// Some env values are stored with literal quotes around them, which makes
// fetch() throw "Failed to parse URL". Strip them rather than trusting config.
const DISCORD_WEBHOOK = (process.env.DISCORD_WEBHOOK_VERIDIAN || "").trim().replace(/^["']|["']$/g, "");

interface IntakeFields {
  name: string;
  email: string;
  phone: string;
  dob: string;
  sexAtBirth: string;
  address: string;
  medications: string;
  allergies: string;
  conditions: string;
  symptoms: string;
  pregnancy: string;
  recentTests: string;
  smoking: string;
  alcohol: string;
  gpPractice: string;
  gpConsent: string;
  notes: string;
  recordingUrl: string;
}

// Patient free text is injected into an HTML email. Without escaping, a stray
// "<" silently swallows the rest of a field and real markup would be rendered.
function esc(v: string): string {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ageFromDob(dob: string): string {
  const d = new Date(dob);
  if (isNaN(d.getTime())) return "";
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
  if (a < 0 || a > 130) return "";
  return String(a);
}

function orNone(v: string, fallback = "Not stated"): string {
  return v && v.trim() ? v.trim() : fallback;
}

// Plain text, deliberately unstyled, so it can be copied straight into the
// scribe (Heidi) as pre-consultation context without carrying HTML across.
function buildScribeBlock(f: IntakeFields): string {
  const age = ageFromDob(f.dob);
  const lines = [
    "PRE-CONSULTATION CONTEXT",
    `Name: ${f.name}`,
    `DOB: ${orNone(f.dob, "not given")}${age ? `  (age ${age})` : ""}`,
    `Sex at birth: ${orNone(f.sexAtBirth)}`,
    `Contact: ${f.phone || "no phone given"} / ${f.email}`,
    `Address: ${orNone(f.address, "not given")}`,
    "",
    "PRESENTING CONCERN",
    orNone(f.symptoms, "not given"),
    "",
    "PAST MEDICAL HISTORY",
    orNone(f.conditions, "none stated"),
    "",
    "CURRENT MEDICATION",
    orNone(f.medications, "none stated"),
    "",
    "ALLERGIES",
    orNone(f.allergies, "NOT ANSWERED - ask before prescribing"),
    "",
    "PREGNANCY / BREASTFEEDING",
    orNone(f.pregnancy),
    "",
    "SOCIAL",
    `Smoking: ${orNone(f.smoking)}`,
    `Alcohol: ${orNone(f.alcohol)}`,
    "",
    "RECENT BLOODS (last 12 months)",
    orNone(f.recentTests),
    "",
    "NHS GP",
    `${orNone(f.gpPractice, "not given")}`,
    `Consent to share consultation summary with NHS GP: ${orNone(f.gpConsent, "not answered")}`,
    "",
    "PATIENT'S OWN ADDITIONAL NOTES",
    orNone(f.notes, "none"),
  ];
  if (f.recordingUrl) {
    lines.push("", "VOICE/VIDEO RECORDING", f.recordingUrl);
  }
  return lines.join("\n");
}

function buildEmailHtml(f: IntakeFields): string {
  const age = ageFromDob(f.dob);
  const rows: [string, string][] = [
    ["Name", f.name],
    ["Date of birth", `${orNone(f.dob, "Not provided")}${age ? `  (age ${age})` : ""}`],
    ["Sex at birth", orNone(f.sexAtBirth)],
    ["Phone", orNone(f.phone, "Not provided")],
    ["Email", f.email],
    ["Address", orNone(f.address, "Not provided")],
    ["Symptoms / reason for booking", f.symptoms],
    ["Medical conditions / diagnoses", orNone(f.conditions, "None stated")],
    ["Current medications", orNone(f.medications, "None stated")],
    ["Allergies", orNone(f.allergies, "NOT ANSWERED")],
    ["Pregnancy / breastfeeding", orNone(f.pregnancy)],
    ["Recent NHS blood tests (12 mo)", orNone(f.recentTests)],
    ["Smoking status", orNone(f.smoking)],
    ["Alcohol", orNone(f.alcohol)],
    ["NHS GP practice", orNone(f.gpPractice, "Not provided")],
    ["Consent to share summary with GP", orNone(f.gpConsent, "Not answered")],
    ["Additional notes for Dr Tosin", orNone(f.notes, "None")],
    ["Voice/video recording link", orNone(f.recordingUrl, "Not provided")],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="font-size:.8rem;font-weight:700;color:#5a534a;padding:10px 12px 10px 0;vertical-align:top;width:200px;border-bottom:1px solid rgba(0,0,0,.06);">${esc(label)}</td><td style="font-size:.88rem;color:#2c2a26;padding:10px 0;vertical-align:top;border-bottom:1px solid rgba(0,0,0,.06);white-space:pre-wrap;">${esc(value)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
  <tr><td align="center">
    <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#fff;border:1px solid rgba(0,0,0,.08);">
      <tr><td style="background:#2c2a26;padding:20px 32px;">
        <p style="margin:0;font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#c8a84b;">NEW CLINICAL INTAKE</p>
        <p style="margin:4px 0 0;font-size:1.1rem;font-weight:600;color:#f6f1e8;">Patient: ${esc(f.name)}</p>
      </td></tr>
      <tr><td style="padding:32px;">
        <table width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
        <p style="margin:24px 0 0;font-size:.74rem;color:#8a8278;">Submitted via veridianclinic.com/intake &middot; ${new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/London" })}</p>
      </td></tr>
      <tr><td style="padding:0 32px 32px;">
        <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#c8a84b;">Copy the block below into Heidi</p>
        <p style="margin:0 0 12px;font-size:.78rem;color:#8a8278;line-height:1.6;">Plain text, no formatting. Select it all and paste it into the scribe as context before the consultation starts.</p>
        <pre style="margin:0;padding:18px;background:#f6f1e8;border:1px solid rgba(0,0,0,.1);font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.76rem;line-height:1.65;color:#2c2a26;white-space:pre-wrap;word-break:break-word;">${esc(buildScribeBlock(f))}</pre>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

async function sendEmail(f: IntakeFields) {
  if (!BREVO_API_KEY) return;
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
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
      textContent: buildScribeBlock(f),
      tags: ["clinical-intake"],
    }),
  });
  // This email IS the delivery mechanism for the patient's intake. If it fails
  // we must tell them to try again, not silently drop their medical history.
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo rejected the intake email (${res.status}): ${detail.slice(0, 200)}`);
  }
}

// Best effort only. A staff alert must never be able to fail a patient's
// submission, which is exactly what a malformed webhook URL did.
async function pingDiscord() {
  if (!DISCORD_WEBHOOK) return;
  try {
    await postDiscord();
  } catch (err) {
    console.error("[api/intake] Discord alert failed (submission unaffected):", err);
  }
}

// DELIBERATELY CONTENT FREE. Discord is a US third party and this is
// special-category health data, which /intake promises stays with the treating
// clinician. The alert says only that something arrived. Never add patient
// name, email, DOB or symptoms back into this payload.
async function postDiscord() {
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "New clinical intake received",
          description:
            "A patient intake has been submitted. The details are in the email to support@veridianclinic.com. No patient data is sent to Discord.",
          color: 0xc8a84b,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, email, phone, dob, sexAtBirth, address,
      medications, allergies, conditions, symptoms, pregnancy,
      recentTests, smoking, alcohol, gpPractice, gpConsent,
      notes, recordingUrl, turnstileToken,
    } = body;

    if (!name?.trim() || !email?.trim() || !symptoms?.trim()) {
      return NextResponse.json({ error: "Name, email and reason for booking are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email as string).trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    // Prescribing safely needs an explicit allergy answer. "None known" counts;
    // silence does not, so this is required rather than optional.
    if (!allergies?.trim()) {
      return NextResponse.json({ error: "Please answer the allergies question. Write 'None known' if you have none." }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ error: "A contact phone number is required so Dr Taiwo can reach you." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const turnstileOk = await verifyTurnstileToken(turnstileToken || "", ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
    }

    const t = (v: unknown) => ((v as string) || "").trim();
    const fields: IntakeFields = {
      name: t(name),
      email: t(email).toLowerCase(),
      phone: t(phone),
      dob: t(dob),
      sexAtBirth: t(sexAtBirth),
      address: t(address),
      medications: t(medications),
      allergies: t(allergies),
      conditions: t(conditions),
      symptoms: t(symptoms),
      pregnancy: t(pregnancy),
      recentTests: t(recentTests),
      smoking: t(smoking),
      alcohol: t(alcohol),
      gpPractice: t(gpPractice),
      gpConsent: t(gpConsent),
      notes: t(notes),
      recordingUrl: t(recordingUrl),
    };

    await Promise.all([sendEmail(fields), pingDiscord()]);

    // Form is in, so stop chasing them.
    await cancelIntakeReminders(fields.email);

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Was a bare catch, which is how a hard failure here stayed invisible.
    console.error("[api/intake] submit failed:", err);
    // Patients only ever see the generic line. The cause is appended for an
    // authenticated admin so this never has to be debugged blind again.
    const detail = verifyAdminRequest(request)
      ? ` [${err instanceof Error ? `${err.name}: ${err.message}` : String(err)}]`
      : "";
    return NextResponse.json(
      { error: `Unable to submit. Please try again.${detail}` },
      { status: 500 }
    );
  }
}
