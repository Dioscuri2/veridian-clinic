import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE = "https://api.brevo.com/v3";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_VERIDIAN || "";

async function pingDiscord(message: string) {
  if (!DISCORD_WEBHOOK) return;
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  }).catch(() => {});
}

const RANDOX_CODES: Record<string, { code: string; notes: string }> = {
  "womens-hormones":    { code: "HSC7F + RP7 + Lp(a) + Fasting Insulin + Vit D", notes: "Use HSC7F as base panel; add-ons ordered separately. Include TPO antibodies." },
  "mens-testosterone":  { code: "HSC7M + RP7 + Free Testosterone + Lp(a) + Fasting Insulin", notes: "Free T calculated from Total T + SHBG. Include DHEA-S + Cortisol." },
  "cardiovascular-risk":{ code: "RP10 + Lp(a) + ApoB + Homocysteine + hsCRP + Small Dense LDL + Fasting Insulin", notes: "RP10 as base; cardiovascular add-ons listed. Include HbA1c." },
  "fatigue-energy":     { code: "HSC10 + Fasting Insulin + Uric Acid + Vit D", notes: "HSC10 base includes FBC, thyroid (FT3/FT4/TSH/TPO), iron, B12, folate, CRP, kidney." },
  "metabolic-weight":   { code: "RP3 + RP4 + Fasting Insulin + Uric Acid + Lp(a)", notes: "Two Randox panels combined. Include Leptin + Adiponectin as add-ons." },
  "optimiser-baseline": { code: "HSC8M or HSC8F + IGF-1 + Fasting Insulin + Cortisol (AM) + Testosterone", notes: "HSC8M for male patients, HSC8F for female. Add Lp(a) + full lipids if not in base." },
  "metabolic-screen":   { code: "HSC7 (Energy Screen)", notes: "Standard Veridian Energy Screen — single panel code." },
  baseline:             { code: "Veridian Baseline — custom metabolic panel", notes: "Full ThanksDoc clinical programme. Also includes 14-day Lingo CGM — order separately." },
  "longevity-panel":    { code: "Longevity Panel — 150+ markers", notes: "Full ThanksDoc clinical programme. Confirm panel code with Randox account manager." },
  programme:            { code: "12-Week Reset — includes Baseline + CGM ×2", notes: "ThanksDoc programme. Two CGM cycles required — order second at Week 6 review." },
  discovery:            { code: "No Randox order — GP consultation only", notes: "Schedule in ThanksDoc calendar. No phlebotomy required." },
  "discovery-quiz":     { code: "No Randox order — GP consultation only", notes: "Schedule in ThanksDoc calendar. Quiz-rate pricing confirmed." },
};

const TIER_LABELS: Record<string, string> = {
  discovery: "GP Discovery Call (£195)",
  "discovery-quiz": "GP Discovery Call — guide rate (£97)",
  "metabolic-screen": "Energy Screen (£195)",
  baseline: "Veridian Baseline (£595)",
  "longevity-panel": "Longevity Panel (£795)",
  programme: "12-Week Metabolic Reset (£1,895)",
  "womens-hormones": "Is It My Hormones? — Women's Panel (£325)",
  "mens-testosterone": "Running on Empty — Men's Panel (£325)",
  "cardiovascular-risk": "What Your Cholesterol Test Missed (£349)",
  "fatigue-energy": "Tired of Being Told You're Fine (£249)",
  "metabolic-weight": "Why Won't The Weight Budge? (£199)",
  "optimiser-baseline": "The Optimiser's Baseline (£395)",
};

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const phone = (body.phone || "").trim();
  const tier = (body.tier || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }

  const tierLabel = TIER_LABELS[tier] || tier || "Unknown";

  // 1. Save lead to Brevo contacts
  if (BREVO_API_KEY) {
    await fetch(`${BREVO_BASE}/contacts`, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: name.split(" ")[0],
          LASTNAME: name.split(" ").slice(1).join(" "),
          SMS: phone,
          SOURCE: "book-enquiry",
          TIER: tier,
        },
      }),
    }).catch(() => {});

    // 2. Send notification email to Dr Tosin
    await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Veridian Clinic Bookings", email: "hello@veridianclinic.com" },
        to: [{ email: "hello@veridianclinic.com", name: "Dr Tosin Taiwo" }],
        subject: `New booking enquiry — ${tierLabel}`,
        htmlContent: (() => {
          const randox = RANDOX_CODES[tier] || null;
          return `
          <div style="font-family:Arial,sans-serif;max-width:600px;padding:32px;">
            <h2 style="color:#2c2a26;font-size:20px;margin-bottom:24px;">New Booking Enquiry</h2>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;width:140px;"><strong>Product</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#2c2a26;font-size:14px;">${tierLabel}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;"><strong>Name</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#2c2a26;font-size:14px;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${email}" style="color:#c8a84b;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;"><strong>Phone</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#2c2a26;font-size:14px;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding:10px 0;color:#5a534a;font-size:14px;vertical-align:top;"><strong>Message</strong></td><td style="padding:10px 0;color:#2c2a26;font-size:14px;line-height:1.7;">${message || "—"}</td></tr>
            </table>
            ${randox ? `
            <div style="margin-top:24px;padding:16px 20px;background:#2c2a26;border-left:3px solid #c8a84b;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c8a84b;">Randox Order Reference</p>
              <p style="margin:0 0 6px;font-size:14px;color:#f6f1e8;font-weight:600;">${randox.code}</p>
              <p style="margin:0;font-size:12px;color:#8a8278;line-height:1.6;">${randox.notes}</p>
            </div>` : ""}
            <div style="margin-top:16px;padding:16px 20px;background:#f6f1e8;border-left:3px solid #c8a84b;">
              <p style="margin:0;font-size:13px;color:#5a534a;">Reply directly to this email to contact the patient, or <a href="mailto:${email}" style="color:#c8a84b;">click here</a> to open a reply.</p>
            </div>
          </div>
        `})(),
        replyTo: { email, name },
      }),
    }).catch(() => {});

    // 3. Confirmation email to patient
    await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Dr Tosin Taiwo | Veridian Clinic", email: "hello@veridianclinic.com" },
        to: [{ email, name }],
        subject: "We've received your enquiry — Veridian Clinic",
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:600px;background:#ffffff;">
            <div style="background:#2c2a26;padding:28px 40px;text-align:center;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:4px;color:#c8a84b;text-transform:uppercase;">VERIDIAN CLINIC</p>
            </div>
            <div style="height:2px;background:#c8a84b;"></div>
            <div style="padding:40px 40px 32px;background:#ffffff;">
              <p style="font-size:15px;color:#5a534a;line-height:1.9;margin-bottom:16px;">Thank you, ${name.split(" ")[0]}.</p>
              <p style="font-size:15px;color:#5a534a;line-height:1.9;margin-bottom:16px;">We've received your enquiry for <strong style="color:#2c2a26;">${tierLabel}</strong>.</p>
              <p style="font-size:15px;color:#5a534a;line-height:1.9;margin-bottom:24px;">Dr Tosin will be in touch within 24 hours — usually sooner — to confirm your appointment details.</p>
              <p style="font-size:15px;color:#5a534a;line-height:1.9;">In the meantime, if you have any questions, reply to this email directly.</p>
            </div>
            <div style="padding:20px 40px;background:#f6f1e8;border-top:1px solid rgba(0,0,0,.07);text-align:center;">
              <p style="margin:0;font-size:11px;color:#8a8278;">Veridian Clinic · Olympus Premium Health Ltd · 82A James Carter Road, Mildenhall, Suffolk IP28 7DE</p>
            </div>
          </div>
        `,
      }),
    }).catch(() => {});
  }

  // Discord ping
  await pingDiscord(
    `📋 **New booking enquiry — Veridian Clinic**\n` +
    `**Product:** ${tierLabel}\n` +
    `**Name:** ${name}\n` +
    `**Email:** ${email}\n` +
    `**Phone:** ${phone || "—"}\n` +
    (message ? `**Message:** ${message.slice(0, 200)}\n` : "") +
    `\nReply at hello@veridianclinic.com`
  );

  return NextResponse.json({ ok: true });
}
