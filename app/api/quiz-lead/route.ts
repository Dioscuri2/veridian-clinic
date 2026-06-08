import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE_URL = "https://api.brevo.com/v3";
const LIST_NAME = process.env.BREVO_NEWSLETTER_LIST_NAME || "Veridian Leads";

const BAND_LABELS: Record<string, string> = {
  strong: "On Track",
  drifting: "Needs Attention",
  "high-risk": "High Priority",
};

async function fetchBrevo(pathname: string, init: RequestInit = {}) {
  return fetch(`${BREVO_BASE_URL}${pathname}`, {
    ...init,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": BREVO_API_KEY,
      ...(init.headers || {}),
    },
  });
}

async function ensureBrevoList(listName: string): Promise<number | null> {
  if (!BREVO_API_KEY) return null;
  const res = await fetchBrevo("/contacts/lists?limit=100&offset=0");
  if (!res.ok) return null;
  const data = await res.json();
  const existing = Array.isArray(data?.lists)
    ? data.lists.find((l: { id: number; name: string }) => l.name === listName)
    : null;
  if (existing?.id) return existing.id;
  const create = await fetchBrevo("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({ name: listName, folderId: 1 }),
  });
  if (!create.ok) return null;
  const created = await create.json();
  return created?.id ?? null;
}

type FactorScores = { fw: number; fe: number; fs: number; fst: number; fa: number; fd: number; fg: number };

const FACTOR_NAMES: [keyof FactorScores, string][] = [
  ["fw",  "Waist-to-height ratio"],
  ["fs",  "Sleep quality"],
  ["fst", "Stress load"],
  ["fd",  "Diet quality"],
  ["fe",  "Energy levels"],
  ["fa",  "Movement / activity"],
  ["fg",  "Gut health"],
];

function scorecardColor(score: number): string {
  if (score <= 0) return "#145226";
  if (score <= 3) return "#8a5500";
  return "#7a1616";
}

function scorecardLabel(score: number): string {
  if (score <= 0) return "Protective";
  if (score <= 3) return "Moderate";
  return "High Impact";
}

function buildScorecardRows(scores: FactorScores): string {
  const maxScore = 10;
  return FACTOR_NAMES.map(([key, label]) => {
    const raw = scores[key] ?? 0;
    const score = Number(raw);
    const color = scorecardColor(score);
    const lbl = scorecardLabel(score);
    const barWidth = Math.max(4, Math.min(100, Math.abs(score) / maxScore * 100));
    const scoreText = score > 0 ? `+${score} yrs` : score < 0 ? `${score} yrs` : "0 yrs";
    return `<tr>
      <td style="font-size:.8rem;color:#5a534a;padding:7px 0;width:160px;vertical-align:middle;">${label}</td>
      <td style="padding:7px 10px;vertical-align:middle;">
        <div style="background:#ede8df;height:7px;width:120px;border-radius:2px;overflow:hidden;">
          <div style="background:${color};height:7px;width:${barWidth}%;border-radius:2px;"></div>
        </div>
      </td>
      <td style="font-size:.74rem;font-weight:700;color:${color};white-space:nowrap;vertical-align:middle;padding-left:4px;">${scoreText} · ${lbl}</td>
    </tr>`;
  }).join("");
}

function buildEmail1(firstName: string, mAge: number, band: string, delta: number, scores: FactorScores): string {
  const greeting = firstName || "there";
  const tone = BAND_LABELS[band] || "Needs Attention";
  const deltaText =
    delta > 0
      ? `${delta} years ahead of your calendar age`
      : delta < 0
        ? `${Math.abs(delta)} years behind your calendar age, a positive sign of metabolic resilience`
        : "closely aligned with your calendar age";
  const ctaHref =
    band === "strong"
      ? "https://veridianclinic.com/assessments#metabolic-panel"
      : band === "high-risk"
        ? "https://veridianclinic.com/book?tier=discovery"
        : "https://veridianclinic.com/metabolic-reset-guide";
  const ctaText =
    band === "strong"
      ? "Check Your Metabolic Markers →"
      : band === "high-risk"
        ? "Book My Discovery Call →"
        : "Get the Metabolic Reset Guide →";

  const bandBg = band === "strong" ? "rgba(20,82,38,.08)" : band === "high-risk" ? "rgba(122,22,22,.08)" : "rgba(138,85,0,.08)";
  const bandColor = band === "strong" ? "#145226" : band === "high-risk" ? "#7a1616" : "#8a5500";

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(0,0,0,.08);">
      <tr><td style="background:#2c2a26;padding:24px 36px;">
        <p style="margin:0;font-family:Georgia,serif;font-size:1.1rem;font-weight:700;letter-spacing:.18em;color:#f6f1e8;text-transform:uppercase;">VERIDIAN</p>
        <p style="margin:4px 0 0;font-size:.65rem;font-weight:700;letter-spacing:.28em;color:#c8a84b;text-transform:uppercase;">Clinic</p>
      </td></tr>
      <tr><td style="padding:40px 36px 28px;">
        <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Your Metabolic Scorecard</p>
        <h1 style="margin:0 0 20px;font-size:1.9rem;font-weight:500;color:#2c2a26;line-height:1.2;">Hi ${greeting}, your metabolic age is <strong style="color:${bandColor};">${mAge}</strong>.</h1>
        <p style="margin:0 0 16px;font-size:.95rem;color:#5a534a;line-height:1.9;">Your metabolism is running ${deltaText}. Your result band is <strong style="color:${bandColor};">${tone}</strong>.</p>

        <!-- Band badge -->
        <div style="display:inline-block;padding:7px 16px;background:${bandBg};color:${bandColor};font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:28px;">${tone}</div>

        <!-- Scorecard -->
        <p style="margin:0 0 12px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">Seven-factor breakdown</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-top:1px solid rgba(0,0,0,.07);padding-top:8px;">
          <tr><td colspan="3" style="padding-bottom:4px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${buildScorecardRows(scores)}
            </table>
          </td></tr>
        </table>
        <p style="margin:0 0 8px;font-size:.76rem;color:#8a8278;line-height:1.6;border-top:1px solid rgba(0,0,0,.07);padding-top:14px;">Scores reflect estimated years of metabolic drift attributable to each factor. Negative values indicate a protective effect. This is not a clinical diagnosis.</p>

        <!-- Primary CTA -->
        <table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:#2c2a26;padding:0;">
          <a href="${ctaHref}" style="display:block;padding:15px 36px;font-size:.9rem;font-weight:600;letter-spacing:.04em;color:#f6f1e8;text-decoration:none;">${ctaText}</a>
        </td></tr></table>

        <!-- VERIDIAN50 upsell -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;border:1.5px solid #c8a84b;margin-bottom:24px;">
          <tr><td style="padding:18px 20px;">
            <p style="margin:0 0 6px;font-size:.64rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Quiz-taker offer</p>
            <p style="margin:0 0 10px;font-size:.9rem;color:#2c2a26;font-weight:500;line-height:1.4;">Book a GP Discovery Call at half price.</p>
            <p style="margin:0 0 12px;font-size:.84rem;color:#5a534a;line-height:1.8;">Use code <strong style="color:#2c2a26;letter-spacing:.06em;">VERIDIAN50</strong> at checkout to reduce the price from £195 to <strong>£97</strong>.</p>
            <a href="https://veridianclinic.com/book?tier=discovery" style="font-size:.84rem;font-weight:600;color:#2c2a26;text-decoration:underline;">Book now and enter VERIDIAN50 at checkout →</a>
          </td></tr>
        </table>

        <p style="margin:0;font-size:.8rem;color:#8a8278;line-height:1.7;">Questions? Reply to this email or contact <a href="mailto:support@veridianclinic.com" style="color:#2c2a26;">support@veridianclinic.com</a></p>
      </td></tr>
      <tr><td style="padding:20px 36px;border-top:1px solid rgba(0,0,0,.07);">
        <p style="margin:0;font-size:.72rem;color:#aaa49c;line-height:1.7;">Veridian Clinic · A trading name of Olympus Premium Health Ltd<br>82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE<br>Registered clinical activities via <a href="https://thanksdoc.co.uk" style="color:#aaa49c;">ThanksDoc</a><br><br>You received this because you completed the metabolic age quiz at veridianclinic.com.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function buildEmail2(firstName: string): string {
  const greeting = firstName || "there";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(0,0,0,.08);">
      <tr><td style="background:#2c2a26;padding:24px 36px;">
        <p style="margin:0;font-family:Georgia,serif;font-size:1.1rem;font-weight:700;letter-spacing:.18em;color:#f6f1e8;text-transform:uppercase;">VERIDIAN</p>
        <p style="margin:4px 0 0;font-size:.65rem;font-weight:700;letter-spacing:.28em;color:#c8a84b;text-transform:uppercase;">Clinic</p>
      </td></tr>
      <tr><td style="padding:40px 36px;">
        <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">The clinical context</p>
        <h1 style="margin:0 0 20px;font-size:1.9rem;font-weight:500;color:#2c2a26;line-height:1.2;">Hi ${greeting}, the biomarker most GPs never check.</h1>
        <p style="margin:0 0 16px;font-size:.95rem;color:#5a534a;line-height:1.9;">Fasting insulin is the most sensitive early marker of metabolic dysfunction, and it's absent from standard NHS bloods. By the time HbA1c rises, insulin resistance has often been present for a decade.</p>
        <p style="margin:0 0 16px;font-size:.95rem;color:#5a534a;line-height:1.9;">This matters because your metabolic age quiz captures lifestyle signals. The lab fills in the gaps, confirming or adjusting the picture before dysfunction becomes established disease.</p>
        <table cellpadding="0" cellspacing="0" width="100%" style="background:#f6f1e8;border-left:3px solid #c8a84b;margin-bottom:28px;">
          <tr><td style="padding:20px 22px;">
            <p style="margin:0 0 8px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">From the clinical library</p>
            <p style="margin:0 0 14px;font-size:.88rem;color:#5a534a;line-height:1.85;">Dr Taiwo has written a clinical primer on why fasting insulin is the metabolic test that changes everything, including how to interpret your result and what optimal actually looks like.</p>
            <a href="https://veridianclinic.com/blog/fast-insulin" style="font-size:.85rem;font-weight:600;color:#2c2a26;text-decoration:underline;">Read: The Case for Fasting Insulin →</a>
          </td></tr>
        </table>
        <p style="margin:0 0 16px;font-size:.95rem;color:#5a534a;line-height:1.9;">ApoB and lipoprotein(a) follow the same pattern, clinically significant, rarely measured in primary care, and each capable of tripling cardiovascular risk in people who appear metabolically normal by standard measures.</p>
        <a href="https://veridianclinic.com/blood-tests/apob-test-uk" style="font-size:.85rem;font-weight:600;color:#2c2a26;text-decoration:underline;">Read: Why ApoB Matters More Than LDL →</a>
        <br><br>
        <p style="margin:0;font-size:.8rem;color:#8a8278;line-height:1.7;">Questions? Reply to this email or contact <a href="mailto:support@veridianclinic.com" style="color:#2c2a26;">support@veridianclinic.com</a></p>
      </td></tr>
      <tr><td style="padding:20px 36px;border-top:1px solid rgba(0,0,0,.07);">
        <p style="margin:0;font-size:.72rem;color:#aaa49c;line-height:1.7;">Veridian Clinic · A trading name of Olympus Premium Health Ltd<br>82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE<br>Registered clinical activities via <a href="https://thanksdoc.co.uk" style="color:#aaa49c;">ThanksDoc</a><br><br>You received this because you completed the metabolic age quiz at veridianclinic.com.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function buildEmail3(firstName: string, band: string): string {
  const greeting = firstName || "there";
  const isHighRisk = band === "high-risk";
  const ctaHref = isHighRisk
    ? "https://veridianclinic.com/book?tier=discovery"
    : "https://veridianclinic.com/book?tier=metabolic-screen";
  const ctaText = isHighRisk
    ? "Book My Discovery Call, £97 →"
    : "Book My Metabolic Screen, £195 →";
  const body = isHighRisk
    ? "Your quiz result flagged multiple concurrent drivers of metabolic stress. The next step isn't a supplement, it's a direct clinical conversation. Dr Taiwo will review your specific pattern, identify your highest-priority levers, and map a structured pathway forward."
    : "A Metabolic Screen is the natural next step: fasting insulin, ApoB, hsCRP, HbA1c, vitamin D, and thyroid function, the markers that your lifestyle quiz can't capture, reviewed by Dr Taiwo in a focused 20-minute consultation.";

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(0,0,0,.08);">
      <tr><td style="background:#2c2a26;padding:24px 36px;">
        <p style="margin:0;font-family:Georgia,serif;font-size:1.1rem;font-weight:700;letter-spacing:.18em;color:#f6f1e8;text-transform:uppercase;">VERIDIAN</p>
        <p style="margin:4px 0 0;font-size:.65rem;font-weight:700;letter-spacing:.28em;color:#c8a84b;text-transform:uppercase;">Clinic</p>
      </td></tr>
      <tr><td style="padding:40px 36px;">
        <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Your next clinical step</p>
        <h1 style="margin:0 0 20px;font-size:1.9rem;font-weight:500;color:#2c2a26;line-height:1.2;">Hi ${greeting}, here's where to go next.</h1>
        <p style="margin:0 0 16px;font-size:.95rem;color:#5a534a;line-height:1.9;">${body}</p>
        <p style="margin:0 0 28px;font-size:.95rem;color:#5a534a;line-height:1.9;">This is a GP-led private service, not a supplement programme or a generic health app. Everything is built around your actual clinical picture, not a population average.</p>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr><td style="background:#2c2a26;padding:0;">
          <a href="${ctaHref}" style="display:block;padding:15px 36px;font-size:.9rem;font-weight:600;letter-spacing:.04em;color:#f6f1e8;text-decoration:none;">${ctaText}</a>
        </td></tr></table>
        <p style="margin:0;font-size:.8rem;color:#8a8278;line-height:1.7;">Questions? Reply to this email or contact <a href="mailto:support@veridianclinic.com" style="color:#2c2a26;">support@veridianclinic.com</a></p>
      </td></tr>
      <tr><td style="padding:20px 36px;border-top:1px solid rgba(0,0,0,.07);">
        <p style="margin:0;font-size:.72rem;color:#aaa49c;line-height:1.7;">Veridian Clinic · A trading name of Olympus Premium Health Ltd<br>82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE<br>Registered clinical activities via <a href="https://thanksdoc.co.uk" style="color:#aaa49c;">ThanksDoc</a><br><br>You received this because you completed the metabolic age quiz at veridianclinic.com.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

async function sendBrevoEmail(to: string, name: string, subject: string, html: string, scheduledAt?: string) {
  if (!BREVO_API_KEY) return;
  const body: Record<string, unknown> = {
    sender: { name: "Dr Tosin Taiwo, Veridian Clinic", email: "support@veridianclinic.com" },
    to: [{ email: to, name: name || to }],
    subject,
    htmlContent: html,
    tags: ["quiz-nurture"],
  };
  if (scheduledAt) body.scheduledAt = scheduledAt;
  await fetch(`${BREVO_BASE_URL}/smtp/email`, {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
    body: JSON.stringify(body),
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const email = (payload.email || "").trim().toLowerCase();
    const firstName = (payload.firstName || "").trim();
    const mAge = Number(payload.mAge || 0);
    const band = (payload.band || "drifting") as string;
    const delta = Number(payload.delta || 0);
    const scores: FactorScores = {
      fw: Number(payload.fw ?? 0),
      fe: Number(payload.fe ?? 0),
      fs: Number(payload.fs ?? 0),
      fst: Number(payload.fst ?? 0),
      fa: Number(payload.fa ?? 0),
      fd: Number(payload.fd ?? 0),
      fg: Number(payload.fg ?? 0),
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const turnstileOk = await verifyTurnstileToken(payload.turnstileToken || "", ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
    }

    const listId = await ensureBrevoList(LIST_NAME);
    if (listId) {
      await fetchBrevo("/contacts", {
        method: "POST",
        body: JSON.stringify({
          email,
          listIds: [listId],
          updateEnabled: true,
          attributes: {
            FIRSTNAME: firstName,
            SOURCE: "quiz-result-gate",
            LIST: "newsletter",
            METABOLICAGE: mAge || "",
            RESULTBAND: band,
            QUIZSCORE: delta || "",
          },
        }),
      });
    }

    const displayName = firstName || email;
    const now = new Date();
    const day2 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const day5 = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();

    await Promise.all([
      sendBrevoEmail(email, displayName, "Your Metabolic Scorecard, Veridian Clinic", buildEmail1(firstName, mAge, band, delta, scores)),
      sendBrevoEmail(email, displayName, "The biomarker most GPs never check, Veridian Clinic", buildEmail2(firstName), day2),
      sendBrevoEmail(email, displayName, "Your next step, Veridian Clinic", buildEmail3(firstName, band), day5),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to process." },
      { status: 500 },
    );
  }
}
