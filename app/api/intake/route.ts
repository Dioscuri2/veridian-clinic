import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { cancelIntakeReminders } from "@/lib/intakeSequence";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { saveIntake } from "@/lib/intakeStore";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
// Some env values are stored with literal quotes around them, which makes
// fetch() throw "Failed to parse URL". Strip them rather than trusting config.
const DISCORD_WEBHOOK = (process.env.DISCORD_WEBHOOK_VERIDIAN || "").trim().replace(/^["']|["']$/g, "");
const INTAKES_ADMIN_URL = "https://veridianclinic.com/admin/intakes";

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

// FALLBACK ONLY. The record store is the system of record; this full-content
// email is sent only when the store is down, so the patient's history still
// reaches the clinician. It throws on every failure, including a missing key,
// because at that point nothing else is holding the submission.
async function sendEmail(f: IntakeFields) {
  if (!BREVO_API_KEY) throw new Error("Brevo is not configured, so the email fallback cannot run");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    signal: AbortSignal.timeout(15000),
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
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo rejected the intake email (${res.status}): ${detail.slice(0, 200)}`);
  }
}

// Sent once the record is saved. DELIBERATELY CONTENT FREE: no name, no
// answers. The clinical detail lives in the record store, not in a mailbox.
// Best effort, because the intake is already safe by the time this runs.
async function sendSavedNotice() {
  if (!BREVO_API_KEY) return;
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Veridian Intake", email: "support@veridianclinic.com" },
        to: [{ email: "support@veridianclinic.com", name: "Dr Tosin Taiwo" }],
        subject: "New clinical intake saved",
        textContent: `A patient has submitted a clinical intake and it has been saved.\n\nRead or download it: ${INTAKES_ADMIN_URL}\n\nThis message carries no patient details on purpose.`,
        tags: ["clinical-intake-notice"],
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[api/intake] saved-notice email rejected (${res.status}), intake is saved regardless: ${detail.slice(0, 200)}`);
    }
  } catch (err) {
    console.error("[api/intake] saved-notice email failed, intake is saved regardless:", err);
  }
}

type AlertKind = "saved" | "emailFallback" | "failed";

const ALERTS: Record<AlertKind, { title: string; description: string; color: number }> = {
  saved: {
    title: "New clinical intake saved",
    description: `A patient intake has been saved. Read or download it at ${INTAKES_ADMIN_URL}. No patient data is sent to Discord.`,
    color: 0xc8a84b,
  },
  emailFallback: {
    title: "Clinical intake delivered by email (record store failed)",
    description:
      "A patient intake could not be confirmed as saved in the record store, so it was emailed to support@veridianclinic.com instead. It may be missing from the admin list. Check the server logs. No patient data is sent to Discord.",
    color: 0xd98a00,
  },
  failed: {
    title: "A clinical intake FAILED to submit",
    description:
      "A patient completed the intake form but it could not be saved or emailed. They were told to try again. Nothing was stored. Check the server logs. No patient data is sent to Discord.",
    color: 0x7a1616,
  },
};

// Best effort only. A staff alert must never be able to fail a patient's
// submission, which is exactly what a malformed webhook URL did.
async function pingDiscord(kind: AlertKind) {
  if (!DISCORD_WEBHOOK) return;
  try {
    await postDiscord(kind);
  } catch (err) {
    console.error("[api/intake] Discord alert failed (submission unaffected):", err);
  }
}

// DELIBERATELY CONTENT FREE. Discord is a US third party and this is
// special-category health data, which /intake promises stays with the treating
// clinician. The alert says only what happened. Never add patient
// name, email, DOB or symptoms back into this payload.
async function postDiscord(kind: AlertKind) {
  const { title, description, color } = ALERTS[kind];
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    signal: AbortSignal.timeout(8000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{ title, description, color, timestamp: new Date().toISOString() }],
    }),
  });
}

export async function POST(request: NextRequest) {
  // True once a real patient submission has passed validation and the bot
  // check. Only then is a failure worth a staff alert.
  let accepted = false;
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
    accepted = true;

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

    // SAVE FIRST. Alerts go out only after the record is confirmed stored, so
    // an alert can never again announce an intake that nobody can read.
    const text = buildScribeBlock(fields);
    let reference = "";
    try {
      const saved = await saveIntake({ name: fields.name, email: fields.email, text });
      reference = saved.id;
    } catch (storeErr) {
      console.error("[api/intake] record store failed, falling back to email:", storeErr);
      await sendEmail(fields); // throws if this fails too, and the patient is told to retry
    }

    if (reference) {
      await Promise.all([sendSavedNotice(), pingDiscord("saved")]);
    } else {
      await pingDiscord("emailFallback");
    }

    // Form is in, so stop chasing them.
    await cancelIntakeReminders(fields.email);

    // The patient gets their own copy back on screen, to read and download.
    return NextResponse.json({ ok: true, reference, record: text });
  } catch (err) {
    // Was a bare catch, which is how a hard failure here stayed invisible.
    console.error("[api/intake] submit failed:", err);
    if (accepted) await pingDiscord("failed");
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
