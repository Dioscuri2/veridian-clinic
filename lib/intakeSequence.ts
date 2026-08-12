/**
 * Pre-consultation intake invite + reminder sequence.
 *
 * Sends the intake link immediately, then schedules two reminders via Brevo
 * scheduledAt (no cron needed, same pattern as quizEmailSequence).
 *
 * Reminders are grouped under a batchId derived deterministically from the
 * patient's email, so when the intake form is submitted we can recompute the
 * same batchId and cancel the outstanding reminders without storing anything.
 * This matters because Railway's filesystem is ephemeral.
 */
import { createHash } from "node:crypto";

const BREVO_BASE = "https://api.brevo.com/v3";
const FROM = { name: "Dr Tosin Taiwo | Veridian Clinic", email: "support@veridianclinic.com" };
const INTAKE_URL = "https://veridianclinic.com/intake";

/** Deterministic UUID-shaped batch id from the patient email. */
export function batchIdFor(email: string): string {
  const h = createHash("sha256").update(`intake:${email.trim().toLowerCase()}`).digest("hex");
  // Format as a v4-shaped UUID so Brevo accepts it.
  return [
    h.slice(0, 8),
    h.slice(8, 12),
    "4" + h.slice(13, 16),
    ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16) + h.slice(17, 20),
    h.slice(20, 32),
  ].join("-");
}

const shell = (heading: string, body: string) => `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2c2a26;background:#f6f1e8;">
  <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#c8a84b;margin:0 0 18px;font-weight:700;">Veridian Clinic</p>
  <h1 style="font-size:22px;font-weight:500;line-height:1.3;margin:0 0 20px;color:#2c2a26;">${heading}</h1>
  ${body}
  <div style="text-align:center;margin:30px 0;">
    <a href="${INTAKE_URL}" style="display:inline-block;background:#2c2a26;color:#f6f1e8;padding:15px 34px;text-decoration:none;font-size:14px;letter-spacing:.04em;">Complete my intake form</a>
  </div>
  <p style="font-size:12px;color:#8a8278;line-height:1.8;margin:24px 0 0;border-top:1px solid rgba(0,0,0,.08);padding-top:16px;">
    If the button does not work, paste this into your browser:<br><span style="color:#5a534a;">${INTAKE_URL}</span><br><br>
    Your information is encrypted, stored on UK/EU servers, and visible only to your treating clinician. You can request deletion at any time.
  </p>
</div>`;

const p = (t: string) => `<p style="font-size:15px;line-height:1.85;color:#5a534a;margin:0 0 16px;">${t}</p>`;

function buildInvite(firstName: string) {
  const name = firstName ? `${firstName}, thank` : "Thank";
  return {
    subject: "Before your appointment: your clinical intake form",
    html: shell(
      "One thing to do before we meet",
      p(`${name} you for booking with Veridian Clinic.`) +
        p("So that your consultation is spent on clinical insight rather than background admin, please complete your intake form beforehand. It covers your medical history, current medications, symptoms, and what you are hoping to get from the appointment.") +
        p("It takes about ten minutes.") +
        p("<strong>Prefer to talk instead of type?</strong> There is an option on the form to record a short video or voice note instead and paste the link. Please still type your medications and diagnosed conditions, as those need to be exact in your clinical record.")
    ),
  };
}

function buildReminder1(firstName: string) {
  return {
    subject: "Reminder: your intake form is not completed yet",
    html: shell(
      "Your intake form is still outstanding",
      p(`${firstName ? firstName + ", a" : "A"} quick reminder that your clinical intake form has not been completed yet.`) +
        p("Dr Tosin reviews every intake before your appointment. Completing it in advance means your consultation starts with the history already understood, rather than spending the first half of it gathering background.") +
        p("If you would rather record a short voice or video note than write it out, that option is on the form.")
    ),
  };
}

function buildReminder2(firstName: string) {
  return {
    subject: "Your appointment is approaching, intake form still needed",
    html: shell(
      "Last reminder about your intake form",
      p(`${firstName ? firstName + ", your" : "Your"} intake form is still outstanding and your appointment is approaching.`) +
        p("Without it, part of your consultation time has to be spent collecting information that could have been gathered beforehand. It takes about ten minutes, or a few minutes if you record a voice note instead.") +
        p("If something is stopping you completing it, reply to this email and we will help.")
    ),
  };
}

async function send(
  apiKey: string,
  to: { email: string; name: string },
  subject: string,
  html: string,
  opts: { scheduledAt?: string; batchId?: string } = {}
): Promise<void> {
  const payload: Record<string, unknown> = {
    to: [to],
    sender: FROM,
    subject,
    htmlContent: html,
    tags: ["intake-sequence"],
  };
  if (opts.scheduledAt) payload.scheduledAt = opts.scheduledAt;
  if (opts.batchId) payload.batchId = opts.batchId;

  const res = await fetch(`${BREVO_BASE}/smtp/email`, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[intakeSequence] Brevo send failed (${res.status}):`, detail);
    // Must throw, not just log. Otherwise a rejected send still reports
    // "invite sent" in the admin panel and the patient is never chased.
    throw new Error(`Brevo rejected the send (${res.status}): ${detail.slice(0, 200)}`);
  }
}

const daysFromNow = (d: number) => new Date(Date.now() + d * 86_400_000).toISOString();

// Brevo refuses any scheduledAt more than 3 days out ("You are not allowed to
// schedule a transactional mail for more than 3 days"), so the reminders sit at
// +1 and +3 rather than the +2 and +5 originally intended.
export const REMINDER_1_DAYS = 1;
export const REMINDER_2_DAYS = 3;

/**
 * Send the intake invite now and schedule reminders at +1 and +3 days.
 * Throws on missing config so the admin UI can report it, unlike the
 * fire-and-forget nurture sequences.
 */
export async function sendIntakeInvite(email: string, firstName: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY || "";
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");

  const to = { email, name: firstName || email };
  const batchId = batchIdFor(email);

  await send(apiKey, to, buildInvite(firstName).subject, buildInvite(firstName).html);

  // Invite is already out at this point, so say so if only the reminders fail.
  try {
    await Promise.all([
      send(apiKey, to, buildReminder1(firstName).subject, buildReminder1(firstName).html, {
        scheduledAt: daysFromNow(REMINDER_1_DAYS),
        batchId,
      }),
      send(apiKey, to, buildReminder2(firstName).subject, buildReminder2(firstName).html, {
        scheduledAt: daysFromNow(REMINDER_2_DAYS),
        batchId,
      }),
    ]);
  } catch (err) {
    throw new Error(
      `Invite was sent, but scheduling the reminders failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * Cancel any outstanding scheduled reminders for this email.
 * Called when the intake form is submitted. Safe to call when nothing is
 * scheduled, Brevo simply returns 404 which we ignore.
 */
export async function cancelIntakeReminders(email: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY || "";
  if (!apiKey || !email) return;
  try {
    const res = await fetch(`${BREVO_BASE}/smtp/email/batch/${batchIdFor(email)}`, {
      method: "DELETE",
      headers: { "api-key": apiKey, accept: "application/json" },
    });
    if (!res.ok && res.status !== 404) {
      console.error(`[intakeSequence] cancel failed (${res.status})`);
    }
  } catch (err) {
    console.error("[intakeSequence] cancel error:", err);
  }
}
