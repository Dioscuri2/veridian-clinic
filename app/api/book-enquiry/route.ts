import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";

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
  "womens-hormones":    { code: "HSC7F_RP7 + LPA + INS", notes: "Trade £161.40 (HSC7F_RP7 £100.50 + Lp(a) £28.10 + Insulin £32.80). Do NOT add Vitamin D (25OH_VITD) — HSC7F_RP7 already contains it. HSC7F_RP7 gives total Testosterone, SHBG and FAI; free testosterone is CALCULATED from total T and SHBG, not assayed. No cortisol in this order." },
  "mens-testosterone":  { code: "HSC7M_RP7 + LPA + INS + DHEAS + CORTISOL", notes: "Trade £209.80 (HSC7M_RP7 £100.50 + Lp(a) £28.10 + Insulin £32.80 + DHEA-S £16.00 + Cortisol £32.40). Do NOT add Free Testosterone (FREE_TEST) — HSC7M_RP7 contains total Testosterone, SHBG and FAI, so free T is CALCULATED (wastes £30.30). HSC7M_RP7 has no DHEA-S and no cortisol, so both are ordered separately. CORTISOL is a SINGLE MORNING SERUM sample — collect before 10am; it is not a cortisol awakening response or a diurnal profile." },
  "cardiovascular-risk":{ code: "RP10 + HOMO + hsCRP + INS + HBA1_NEW", notes: "Trade £145.40 (RP10 £37.60 + Homocysteine £40.50 + hs-CRP £14.00 + Insulin £32.80 + HbA1c £20.50). Do NOT add Lp(a), ApoB or Small Dense LDL — RP10 already contains all three (wastes £74.10). RP10 carries standard CRP only, so hsCRP stays. RP10 has no HbA1c, so HBA1_NEW is ordered separately — it must stay on the order for the HbA1c claim to hold." },
  "fatigue-energy":     { code: "HSC10 + Uric Acid", notes: "HSC10 already includes insulin, vitamin D, FBC, full thyroid (TSH/FT3/FT4 with TPO and TGA antibodies), ferritin/iron/TIBC/transferrin saturation, B12, folate, HbA1c, glucose, C-peptide, CRP, magnesium, calcium, phosphate, albumin, ALP and kidney function including cystatin C and eGFR. Do NOT order Insulin (INS) or Vitamin D (25OH_VITD) on top — that wastes £59.60. Trade total £94.90." },
  "metabolic-weight":   { code: "RP3 + RP4 + URIC_ACID", notes: "Trade £72.90 (RP3 £46.00 + RP4 £18.20 + Uric Acid £8.70). Do NOT add Insulin (INS) or Lp(a) (LPA) — RP3 already contains both, plus Adiponectin, C-peptide, ApoB/ApoA-I/ApoE, sdLDL, CRP, glucose and HbA1c (wastes £60.90). HOMA-IR is calculated from RP3 insulin and glucose. No ALT/AST in this order. Leptin and Resistin are NOT offered by Randox in any form." },
  "optimiser-baseline": { code: "HSC8M or HSC8F + HSC12 + IGF1", notes: "Trade £289.20 (HSC8 £106.30 + HSC12 £134.00 + IGF-1 £48.90). Verified no waste — both base panels are needed: HSC8 uniquely adds Adiponectin, Insulin, C-peptide, Cystatin C, ApoE, Lp(a), sdLDL and thyroid antibodies; HSC12 uniquely adds Cortisol, DHEA-S, Testosterone, SHBG, FAI, CK/CK-MB, myoglobin and Total Antioxidant Status. ApoB is in both. IGF-1 is in neither. No FSH in this order. Leptin and Resistin are NOT offered by Randox." },
  "metabolic-screen":   { code: "HSC7 (Energy Screen)", notes: "Standard Veridian Energy Screen, single panel code." },
  baseline:             { code: "Metabolic Baseline, custom metabolic panel", notes: "Full ThanksDoc clinical programme. Also includes 14-day Lingo CGM, order separately." },
  "longevity-panel":    { code: "Longevity Panel, 150+ markers", notes: "Full ThanksDoc clinical programme. Confirm panel code with Randox account manager." },
  programme:            { code: "12-Week Reset, includes Baseline + CGM ×2", notes: "ThanksDoc programme. Two CGM cycles required, order second at Week 6 review." },
  discovery:            { code: "No Randox order, GP consultation only", notes: "Schedule in ThanksDoc calendar. No phlebotomy required." },
  "discovery-quiz":     { code: "No Randox order, GP consultation only", notes: "Schedule in ThanksDoc calendar. Quiz-rate pricing confirmed." },
};

const TIER_LABELS: Record<string, string> = {
  discovery: "Discovery Core (£97)",
  "discovery-quiz": "Discovery Core, guide rate (£77)",
  "metabolic-screen": "Energy Screen (£195)",
  baseline: "Metabolic Baseline (£595)",
  "longevity-panel": "Longevity Panel (£795)",
  programme: "12-Week Metabolic Reset (£1,895)",
  "womens-hormones": "Is It My Hormones?, Women's Panel (£375)",
  "mens-testosterone": "Running on Empty, Men's Panel (£325)",
  "cardiovascular-risk": "What Your Cholesterol Test Missed (£349)",
  "fatigue-energy": "Tired of Being Told You're Fine (£249)",
  "metabolic-weight": "Why Won't The Weight Budge? (£199)",
  "optimiser-baseline": "The Optimiser's Baseline (£549)",
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
  const turnstileToken = (body.turnstileToken || "").trim();

  // Honeypot check
  if (body._hp && String(body._hp).trim().length > 0) {
    return NextResponse.json({ ok: true }); // silent drop
  }

  // Turnstile verification (only enforced if key is set)
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const turnstileOk = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
  }

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
        sender: { name: "Veridian Clinic Bookings", email: "support@veridianclinic.com" },
        to: [{ email: "support@veridianclinic.com", name: "Dr Tosin Taiwo" }],
        subject: `New booking enquiry, ${tierLabel}`,
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
              <tr><td style="padding:10px 0;color:#5a534a;font-size:14px;vertical-align:top;"><strong>Message</strong></td><td style="padding:10px 0;color:#2c2a26;font-size:14px;line-height:1.7;">${message || "-"}</td></tr>
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
        sender: { name: "Dr Tosin Taiwo | Veridian Clinic", email: "support@veridianclinic.com" },
        to: [{ email, name }],
        subject: "We've received your enquiry, Veridian Clinic",
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:600px;background:#ffffff;">
            <div style="background:#2c2a26;padding:28px 40px;text-align:center;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:4px;color:#c8a84b;text-transform:uppercase;">VERIDIAN CLINIC</p>
            </div>
            <div style="height:2px;background:#c8a84b;"></div>
            <div style="padding:40px 40px 32px;background:#ffffff;">
              <p style="font-size:15px;color:#5a534a;line-height:1.9;margin-bottom:16px;">Thank you, ${name.split(" ")[0]}.</p>
              <p style="font-size:15px;color:#5a534a;line-height:1.9;margin-bottom:16px;">We've received your enquiry for <strong style="color:#2c2a26;">${tierLabel}</strong>.</p>
              <p style="font-size:15px;color:#5a534a;line-height:1.9;margin-bottom:24px;">Dr Tosin will be in touch within 24 hours, usually sooner, to confirm your appointment details.</p>
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
    `📋 **New booking enquiry, Veridian Clinic**\n` +
    `**Product:** ${tierLabel}\n` +
    `**Name:** ${name}\n` +
    `**Email:** ${email}\n` +
    `**Phone:** ${phone || "-"}\n` +
    (message ? `**Message:** ${message.slice(0, 200)}\n` : "") +
    `\nReply at support@veridianclinic.com`
  );

  return NextResponse.json({ ok: true });
}
