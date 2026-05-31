const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE = "https://api.brevo.com/v3";

interface PanelInfo {
  name: string;
  price: string;
  markerSummary: string[];
  fastingRequired: boolean;
  randoxCode: string;
  randoxNotes: string;
}

const PANELS: Record<string, PanelInfo> = {
  "womens-hormones": {
    name: "Is It My Hormones? — Women's Hormone & Perimenopause Panel",
    price: "£325",
    markerSummary: [
      "Full female hormones: Oestradiol, FSH, LH, Progesterone, Prolactin, SHBG, Testosterone",
      "Thyroid: TSH, FT3, FT4, TPO antibodies",
      "Cortisol, Lipoprotein(a), Fasting Insulin, HbA1c, Vitamin D",
    ],
    fastingRequired: true,
    randoxCode: "HSC7F + RP7 + Lp(a) + Fasting Insulin + Vit D",
    randoxNotes: "Use HSC7F as base panel. Include TPO antibodies as add-on.",
  },
  "mens-testosterone": {
    name: "Running on Empty — Men's Testosterone & Hormone Panel",
    price: "£325",
    markerSummary: [
      "Total + Free Testosterone, SHBG, LH, FSH, Prolactin, DHEA-S",
      "Cortisol, Lipoprotein(a), Fasting Insulin, HbA1c",
      "Full Blood Count, hs-CRP",
    ],
    fastingRequired: true,
    randoxCode: "HSC7M + RP7 + Free Testosterone + Lp(a) + Fasting Insulin",
    randoxNotes: "Free T calculated from Total T + SHBG. Include DHEA-S + Cortisol.",
  },
  "cardiovascular-risk": {
    name: "What Your Cholesterol Test Missed — Cardiovascular Risk Panel",
    price: "£349",
    markerSummary: [
      "ApoB, Lipoprotein(a), Small Dense LDL, full lipid profile",
      "Homocysteine, hs-CRP, ApoA-I",
      "Fasting Insulin, HbA1c",
    ],
    fastingRequired: true,
    randoxCode: "RP10 + Lp(a) + ApoB + Homocysteine + hsCRP + Small Dense LDL + Fasting Insulin",
    randoxNotes: "RP10 as base. Cardiovascular add-ons listed separately. Include HbA1c.",
  },
  "fatigue-energy": {
    name: "Tired of Being Told You're Fine — Fatigue & Energy Deep Screen",
    price: "£249",
    markerSummary: [
      "Full Blood Count, Thyroid: TSH, FT3, FT4, TPO antibodies",
      "Ferritin, full Iron Studies, Vitamin B12, Folate, Vitamin D",
      "Fasting Insulin, Uric Acid, hs-CRP, Kidney function",
    ],
    fastingRequired: true,
    randoxCode: "HSC10 + Fasting Insulin + Uric Acid + Vit D",
    randoxNotes: "HSC10 base includes FBC, thyroid (FT3/FT4/TSH/TPO), iron, B12, folate, CRP, kidney.",
  },
  "metabolic-weight": {
    name: "Why Won't The Weight Budge? — Metabolic Weight Resistance Panel",
    price: "£199",
    markerSummary: [
      "Fasting Insulin, HbA1c, HOMA-IR (insulin resistance index)",
      "Uric Acid, Lipoprotein(a), Leptin, Adiponectin",
      "TSH, Liver markers (ALT, AST), Fasting Lipid Profile",
    ],
    fastingRequired: true,
    randoxCode: "RP3 + RP4 + Fasting Insulin + Uric Acid + Lp(a)",
    randoxNotes: "Two Randox panels combined. Include Leptin + Adiponectin as add-ons.",
  },
  "optimiser-baseline": {
    name: "The Optimiser's Baseline — Performance & Safety Panel",
    price: "£395",
    markerSummary: [
      "IGF-1, Fasting Insulin, HbA1c, Cortisol (AM)",
      "Total + Free Testosterone, SHBG, LH, FSH, DHEA-S",
      "Full Blood Count, Liver & Kidney function, Lp(a), Full Lipid Profile, hs-CRP",
    ],
    fastingRequired: true,
    randoxCode: "HSC8M or HSC8F + IGF-1 + Fasting Insulin + Cortisol (AM) + Testosterone",
    randoxNotes: "HSC8M for male, HSC8F for female. Add Lp(a) + full lipids if not in base panel.",
  },
  "metabolic-screen": {
    name: "Veridian Energy Screen",
    price: "£195",
    markerSummary: [
      "Full Blood Count, Thyroid (TSH, FT3, FT4, TPO antibodies)",
      "Fasting Insulin, C-Peptide, HbA1c, Fasting Glucose",
      "Iron Status, Ferritin, Vitamin B12, Folate, Vitamin D, hs-CRP, Kidney function",
    ],
    fastingRequired: true,
    randoxCode: "HSC7 (Energy Screen)",
    randoxNotes: "Standard Veridian Energy Screen — single panel code.",
  },
};

function buildPatientEmail(firstName: string, panel: PanelInfo): string {
  const markerRows = panel.markerSummary
    .map(m => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,.06);font-size:.86rem;color:#5a534a;line-height:1.6;">
          <span style="color:#c8a84b;margin-right:8px;">✓</span>${m}
        </td>
      </tr>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(0,0,0,.08);">

        <!-- Header -->
        <tr><td style="background:#2c2a26;padding:24px 36px;">
          <p style="margin:0;font-family:Georgia,serif;font-size:1.1rem;font-weight:700;letter-spacing:.18em;color:#f6f1e8;text-transform:uppercase;">VERIDIAN</p>
          <p style="margin:4px 0 0;font-size:.65rem;font-weight:700;letter-spacing:.28em;color:#c8a84b;text-transform:uppercase;">Clinic</p>
        </td></tr>
        <tr><td style="height:3px;background:#c8a84b;"></td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 36px;">
          <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Blood test confirmed</p>
          <h1 style="margin:0 0 20px;font-size:1.8rem;font-weight:500;color:#2c2a26;line-height:1.25;">
            Your test is booked, ${firstName}.
          </h1>
          <p style="margin:0 0 24px;font-size:.95rem;color:#5a534a;line-height:1.9;">
            Payment received for <strong style="color:#2c2a26;">${panel.name}</strong>.
            Dr Tosin will be in touch within 24 hours to arrange your sample collection.
          </p>

          <!-- What's being tested -->
          <p style="margin:0 0 12px;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">What's being tested</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
            ${markerRows}
          </table>

          <!-- Collection options -->
          <table cellpadding="0" cellspacing="0" width="100%" style="background:#f6f1e8;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 14px;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">Your collection options</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:.86rem;color:#5a534a;line-height:1.6;">
                    <strong style="color:#2c2a26;">📦 Home collection kit</strong><br>
                    We post a fingerprick collection kit to your door. Take your sample at your convenience and return it by pre-paid post.
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:.86rem;color:#5a534a;line-height:1.6;">
                    <strong style="color:#2c2a26;">📍 Walk-in near you</strong><br>
                    Book a venous draw at a collection centre near you — including Holland &amp; Barrett and Superdrug locations nationwide.
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:.86rem;color:#5a534a;line-height:1.6;">
                    <strong style="color:#2c2a26;">🩺 Nurse home visit</strong><br>
                    A trained phlebotomist visits your home for a venous draw. Ideal if you prefer not to travel.
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font-size:.78rem;color:#8a8278;line-height:1.6;">
                Dr Tosin will confirm your preferred collection method and send full instructions within 24 hours.
              </p>
            </td></tr>
          </table>

          ${panel.fastingRequired ? `
          <!-- Fasting instructions -->
          <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
            <tr><td style="padding:16px 20px;border-left:3px solid #c8a84b;background:#fffbf2;">
              <p style="margin:0 0 6px;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a5500;">Preparation — fasting required</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.75;">
                This panel includes fasting markers (insulin and glucose). Please fast for <strong>8–10 hours</strong> before your sample is taken — water is fine. No alcohol for 24 hours before. Take any regular medications as normal unless advised otherwise.
              </p>
            </td></tr>
          </table>
          ` : ""}

          <!-- What happens next -->
          <table cellpadding="0" cellspacing="0" width="100%" style="background:#2c2a26;margin-bottom:28px;">
            <tr><td style="padding:22px 24px;">
              <p style="margin:0 0 14px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c8a84b;">What happens next</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${[
                  ["Within 24 hours", "Dr Tosin will email you to confirm your collection method and send your kit or booking details."],
                  ["Sample collection", "Take your sample using your chosen method. Return or drop off as instructed."],
                  ["Lab processing", "Your sample is processed by our nationally accredited UK pathology laboratory. Results typically available within 48–72 hours of receipt."],
                  ["Your GP report", "Dr Tosin prepares a written clinical interpretation of every marker — not just reference ranges — and sends it directly to you with a personalised next-step recommendation."],
                ].map(([step, detail]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(246,241,232,.08);vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c8a84b;">${step}</p>
                    <p style="margin:0;font-size:.84rem;color:rgba(246,241,232,.75);line-height:1.75;">${detail}</p>
                  </td>
                </tr>`).join("")}
              </table>
            </td></tr>
          </table>

          <p style="margin:0 0 6px;font-size:.86rem;color:#5a534a;line-height:1.75;">
            Questions in the meantime? Reply to this email directly — it goes straight to the Veridian clinical inbox.
          </p>
          <p style="margin:0;font-size:.86rem;color:#5a534a;">
            Or email: <a href="mailto:support@veridianclinic.com" style="color:#2c2a26;font-weight:600;">support@veridianclinic.com</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(0,0,0,.07);">
          <p style="margin:0;font-size:.72rem;color:#aaa49c;line-height:1.7;">
            Veridian Clinic · Olympus Premium Health Ltd<br>
            82A James Carter Road, Mildenhall, Suffolk IP28 7DE<br>
            Registered clinical activities via <a href="https://thanksdoc.co.uk" style="color:#aaa49c;">ThanksDoc</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildDrTosinNotification(patientName: string, patientEmail: string, panel: PanelInfo, stripeSessionId: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;padding:32px;">
      <h2 style="color:#2c2a26;font-size:20px;margin-bottom:8px;">Blood Test — Paid Order</h2>
      <p style="margin:0 0 24px;font-size:13px;color:#8a8278;">Stripe payment confirmed. Randox order details below.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;width:140px;"><strong>Panel</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#2c2a26;font-size:14px;">${panel.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;"><strong>Price</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#2c2a26;font-size:14px;">${panel.price}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;"><strong>Patient</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#2c2a26;font-size:14px;">${patientName || "—"}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#5a534a;font-size:14px;"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${patientEmail}" style="color:#c8a84b;">${patientEmail}</a></td></tr>
        <tr><td style="padding:10px 0;color:#5a534a;font-size:13px;"><strong>Session ID</strong></td><td style="padding:10px 0;color:#8a8278;font-size:12px;font-family:monospace;">${stripeSessionId}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px 20px;background:#2c2a26;border-left:3px solid #c8a84b;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c8a84b;">Randox Order</p>
        <p style="margin:0 0 6px;font-size:14px;color:#f6f1e8;font-weight:600;">${panel.randoxCode}</p>
        <p style="margin:0;font-size:12px;color:#8a8278;line-height:1.6;">${panel.randoxNotes}</p>
      </div>
      <div style="margin-top:12px;padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;">
        <p style="margin:0;font-size:13px;color:#5a534a;line-height:1.7;">
          <strong>Action needed:</strong> contact ${patientName || "the patient"} at <a href="mailto:${patientEmail}" style="color:#c8a84b;">${patientEmail}</a> within 24 hours to confirm their preferred collection method (home kit / walk-in / nurse visit) and place the Randox order.
        </p>
      </div>
    </div>
  `;
}

export async function sendBloodTestConfirmation(params: {
  email: string;
  name: string;
  tier: string;
  stripeSessionId?: string;
}): Promise<boolean> {
  const { email, name, tier, stripeSessionId = "" } = params;
  if (!BREVO_API_KEY || !email) return false;

  const panel = PANELS[tier];
  if (!panel) return false;

  const firstName = name?.split(" ")[0] || "there";

  try {
    // Patient confirmation email
    const patientResp = await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: { "accept": "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: "Dr Tosin Taiwo | Veridian Clinic", email: "support@veridianclinic.com" },
        to: [{ email, name }],
        replyTo: { email: "support@veridianclinic.com", name: "Veridian Clinic" },
        subject: `Your blood test is confirmed — ${panel.name}`,
        htmlContent: buildPatientEmail(firstName, panel),
        tags: ["blood-test-confirmation"],
      }),
    });

    // Dr Tosin notification
    await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: { "accept": "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: "Veridian Bookings", email: "support@veridianclinic.com" },
        to: [{ email: "support@veridianclinic.com", name: "Dr Tosin Taiwo" }],
        replyTo: { email, name },
        subject: `New paid blood test — ${panel.name} · ${panel.price}`,
        htmlContent: buildDrTosinNotification(name, email, panel, stripeSessionId),
        tags: ["blood-test-order"],
      }),
    }).catch(() => {});

    return patientResp.ok;
  } catch {
    return false;
  }
}
