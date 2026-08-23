/**
 * Email sequence for metabolic quiz leads (both quiz-gate and scorecard paths).
 * 5 emails scheduled via Brevo's scheduledAt, no dashboard automation required.
 *
 * Sequence:
 *   Email 1, immediate  (scorecard + free guide link + band CTA)
 *   Email 2, Day 2      (curiosity: 3 tests your GP never ordered)
 *   Email 3, Day 4      (cardiovascular urgency: what cholesterol misses)
 *   Email 4, Day 7      (which blood test suits your quiz result)
 *   Email 5, Day 12     (FOMO close: quiz rate expiry)
 */

const BREVO_BASE = "https://api.brevo.com/v3";
const FROM = { name: "Dr Tosin Taiwo | Veridian Clinic", email: "support@veridianclinic.com" };
const SITE = "https://veridianclinic.com";

// ─── HTML helpers ─────────────────────────────────────────────────────────────

function wrap(preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Veridian Clinic</title>
<style>
  @media screen and (max-width:600px){
    .ew{padding:0 !important}
    .eb{padding:32px 24px !important}
    .ef{padding:20px 24px !important}
    .btn-full{display:block !important;text-align:center !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#ede8df;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;color:#ede8df;">${preheader}&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;</div>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ede8df;">
<tr><td align="center" style="padding:32px 16px;" class="ew">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
    <tr><td bgcolor="#2c2a26" style="padding:28px 48px;text-align:center;">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:4px;color:#c8a84b;text-transform:uppercase;">VERIDIAN CLINIC</p>
      <p style="margin:7px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:rgba(246,241,232,.4);letter-spacing:2px;text-transform:uppercase;">Metabolic &amp; Longevity Medicine</p>
    </td></tr>
    <tr><td bgcolor="#c8a84b" style="height:2px;line-height:2px;font-size:2px;">&nbsp;</td></tr>
    <tr><td bgcolor="#ffffff" style="padding:44px 48px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2c2a26;line-height:1.9;" class="eb">
      ${body}
    </td></tr>
    <tr><td bgcolor="#f6f1e8" style="padding:24px 48px;border-top:1px solid rgba(0,0,0,.07);" class="ef">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8278;line-height:1.9;text-align:center;">
        Dr Tosin Taiwo &nbsp;·&nbsp; Veridian Clinic &nbsp;·&nbsp; Olympus Premium Health Ltd<br>
        82A James Carter Road, Mildenhall, Suffolk IP28 7DE<br>
        <a href="{{unsubscribe}}" style="color:#8a8278;text-decoration:underline;">Unsubscribe</a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="${SITE}/privacy" style="color:#8a8278;text-decoration:underline;">Privacy Policy</a>
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function btn(label: string, url: string, bg = "#2c2a26", fg = "#f6f1e8"): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;">
    <tr><td bgcolor="${bg}" style="border-radius:2px;">
      <a href="${url}" class="btn-full" style="display:inline-block;padding:15px 36px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${fg};text-decoration:none;letter-spacing:.5px;">${label}</a>
    </td></tr>
  </table>`;
}

function rule(): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
    <tr><td bgcolor="#c8a84b" style="height:1px;line-height:1px;font-size:1px;">&nbsp;</td></tr>
  </table>`;
}

function h2(text: string): string {
  return `<p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:normal;color:#2c2a26;line-height:1.35;">${text}</p>`;
}

function lbl(text: string): string {
  return `<p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;color:#c8a84b;text-transform:uppercase;">${text}</p>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#5a534a;line-height:1.9;">${text}</p>`;
}

function callout(headline: string, body: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px;border-left:3px solid #c8a84b;">
    <tr><td style="padding:14px 20px;background:#f6f1e8;">
      <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#c8a84b;text-transform:uppercase;">${headline}</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a534a;line-height:1.85;">${body}</p>
    </td></tr>
  </table>`;
}

// ─── Email 1, Immediate: scorecard + free guide ──────────────────────────────

const BAND_LABELS: Record<string, string> = {
  strong: "On Track",
  drifting: "Needs Attention",
  "high-risk": "High Priority",
};

const BAND_COLORS: Record<string, string> = {
  strong: "#145226",
  drifting: "#8a5500",
  "high-risk": "#7a1616",
};

function buildEmail1(firstName: string, mAge: number, band: string, delta: number): { subject: string; html: string } {
  const name = firstName || "there";
  const bandLabel = BAND_LABELS[band] || "Needs Attention";
  const bandColor = BAND_COLORS[band] || "#8a5500";
  const deltaText =
    delta > 0
      ? `Your metabolism is running approximately <strong>${delta} year${delta === 1 ? "" : "s"} ahead</strong> of your chronological age.`
      : delta < 0
        ? `Your metabolism is tracking <strong>${Math.abs(delta)} year${Math.abs(delta) === 1 ? "" : "s"} behind</strong> your chronological age, a positive sign.`
        : "Your metabolic age closely matches your chronological age.";
  const ctaUrl =
    band === "strong"
      ? `${SITE}/assessments`
      : band === "high-risk"
        ? `${SITE}/book?tier=discovery-quiz`
        : `${SITE}/metabolic-reset-guide`;
  const ctaText =
    band === "strong"
      ? "See Your Recommended Blood Panels →"
      : band === "high-risk"
        ? "Book Your GP Discovery Core (£97 Quiz Rate) →"
        : "Get Your Free Metabolic Reset Guide →";

  const subject = `Your metabolic age is ${mAge}${firstName ? ", " + firstName : ""}, here's what that means`;

  const body = `
    ${lbl("Your Metabolic Scorecard")}
    ${h2(`Hi ${name}. Your estimated metabolic age is ${mAge}.`)}
    ${rule()}
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background:#f6f1e8;border-left:4px solid ${bandColor};">
      <tr><td style="padding:18px 22px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:${bandColor};text-transform:uppercase;">Result Band</p>
        <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:18px;color:${bandColor};font-weight:600;">${bandLabel}</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a534a;line-height:1.8;">${deltaText}</p>
      </td></tr>
    </table>
    ${p("Your quiz result reflects lifestyle signals, how your daily habits are affecting your metabolic clock. It's a meaningful starting point. But the full picture comes from blood.")}
    ${p("Most people in your band have one or more markers that would change the clinical picture significantly, fasting insulin, ApoB, Lp(a), all of which are absent from a standard NHS blood check.")}
    ${p("<strong style=\"color:#2c2a26;\">Your free Metabolic Reset Guide</strong> covers the practical framework for addressing the factors that your quiz flagged. It includes the 21-day roadmap I use with patients, meal structure, fasting strategy, and movement tiers.")}
    ${btn("Download Your Free Metabolic Reset Guide →", `${SITE}/metabolic-reset-guide`)}
    ${rule()}
    ${p("Over the next fortnight I'll share the specific clinical markers that most GPs don't routinely check, and what they'd tell you about your metabolic health that your quiz cannot.")}
    ${p("<strong>Dr Tosin Taiwo</strong><br><span style=\"font-size:13px;color:#8a8278;\">MBBS · MRCGP · MRCS<br>Founder, Veridian Clinic</span>")}
    ${rule()}
    ${callout("Ready for the next step?", `${ctaText.replace("→", "").trim()}, <a href="${ctaUrl}" style="color:#c8a84b;font-weight:600;">click here</a>.`)}
  `;

  return { subject, html: wrap(`Metabolic age: ${mAge} · ${bandLabel} · Your free guide is inside`, body) };
}

// ─── Email 2, Day 2: 3 tests your GP hasn't ordered ─────────────────────────

function buildEmail2(firstName: string): { subject: string; html: string } {
  const name = firstName || "there";
  const subject = "3 blood tests your GP probably hasn't ordered (that could explain everything)";
  const body = `
    ${lbl("Clinical education")}
    ${h2("The tests your NHS health check quietly skips.")}
    ${rule()}
    ${p(`${name !== "there" ? name + ", there" : "There"}'s a version of metabolic health that standard care misses entirely, not through negligence, but through design.`)}
    ${p("The NHS health check was built for population screening, not individual optimisation. It catches the obvious. But there are three markers that consistently tell me far more about where someone's metabolic health is actually heading, and none of them appear on a standard blood form.")}
    ${callout("Fasting Insulin", "Fasting insulin is the earliest detectable signal of insulin resistance, often rising <em>years before</em> blood sugar becomes abnormal. Optimal is 2–6 μIU/mL. Most labs flag nothing until you hit 25. By the time HbA1c rises, insulin resistance has typically been present for a decade.<br><br>If you're experiencing weight gain despite no dietary change, energy crashes after meals, or persistent fatigue, fasting insulin is almost always the first place I look.")}
    ${callout("ApoB (Apolipoprotein B)", "Standard cholesterol measures LDL, a calculation that misses particle count entirely. ApoB counts the actual number of atherogenic particles in circulation. Two people with identical LDL can have wildly different ApoB, and wildly different cardiovascular risk.<br><br>I've seen patients with 'normal' LDL whose ApoB places them in the top quartile of cardiovascular risk. The NHS health check would have told them they were fine.")}
    ${callout("Lipoprotein(a), Lp(a)", "Lp(a) is a modified LDL particle that is more inflammatory, stickier, and harder to clear. It independently increases the risk of heart attack and stroke, regardless of your standard cholesterol.<br><br>Critical point: Lp(a) is largely genetic. No amount of diet or exercise will meaningfully lower it. If it's elevated, you need to know, because it changes every other risk management decision you make. And it's rarely checked unless you specifically request it.")}
    ${rule()}
    ${p("These three markers, alongside the standard lipid panel, full blood count, thyroid, and kidney function, are what I include in the Veridian cardiovascular screening.")}
    ${p("Tomorrow I want to walk you through what the cardiovascular risk picture actually looks like, and why I consider this the most important panel for anyone whose quiz result flagged metabolic drift.")}
    ${p("<strong>Dr Tosin</strong>")}
  `;
  return { subject, html: wrap("Fasting insulin. ApoB. Lp(a). The three markers that change the clinical picture.", body) };
}

// ─── Email 3, Day 4: Cardiovascular risk urgency ─────────────────────────────

function buildEmail3(firstName: string, band: string): { subject: string; html: string } {
  const name = firstName || "there";
  const isHighRisk = band === "high-risk";
  const subject = isHighRisk
    ? "Your quiz result flagged something your GP might not have checked yet"
    : "Your cholesterol result may be missing the most dangerous number";

  const body = `
    ${lbl("Why this matters")}
    ${h2(isHighRisk
      ? "When multiple metabolic signals appear together, the cardiovascular picture shifts significantly."
      : "Standard cholesterol checks miss approximately 30% of elevated cardiovascular risk.")}
    ${rule()}
    ${p(`${name !== "there" ? name + ", I" : "I"} want to share something I see regularly in clinic.`)}
    ${p("A patient comes in. Standard bloods look fine. Cholesterol normal, blood pressure acceptable, weight borderline. Everything within range. Then we run a more complete panel.")}
    ${p("Fasting insulin: 18 μIU/mL. ApoB: 105 mg/dL. Lp(a): 92 nmol/L.")}
    ${p("That's a patient who would have been told they were fine, while their actual cardiovascular trajectory was pointing somewhere entirely different.")}
    ${p("This isn't unusual. It's the norm. Standard screening is designed to catch advanced disease. It's not designed to catch the 8–12 years of silent drift that precede it.")}
    ${callout("What the cardiovascular risk panel adds", "The Veridian Cardiovascular Risk Panel includes: ApoB, Lp(a), small dense LDL, homocysteine, hs-CRP, full lipid profile, ApoA-I, fasting insulin, and HbA1c.<br><br>Every result comes with a GP-authored written interpretation, not just numbers, but a clear clinical narrative explaining what your specific values mean for you personally, and what to do about them.")}
    ${p("The panel is <strong style=\"color:#2c2a26;\">£349</strong>. Collection at a Randox clinic near you, or by home kit. Results within 3–5 working days. GP-reviewed written report included.")}
    ${btn("Book Cardiovascular Risk Panel, £349 →", `${SITE}/blood-tests/cardiovascular-risk`, "#2c2a26", "#f6f1e8")}
    ${p(`<em style="font-size:13px;color:#8a8278;">Or if you'd prefer to start with a 30-minute clinical conversation first: <a href="${SITE}/book?tier=discovery-quiz" style="color:#c8a84b;">Discovery Core £97 →</a></em>`)}
    ${rule()}
    ${p("<strong>Dr Tosin</strong>")}
  `;
  return { subject, html: wrap("What a complete cardiovascular panel reveals that standard bloods miss.", body) };
}

// ─── Email 4, Day 7: Which blood test suits your result ─────────────────────

function buildEmail4(firstName: string, band: string): { subject: string; html: string } {
  const name = firstName || "there";
  const subject = "Which test is right for your quiz result? A quick guide.";

  const recommendedPanel =
    band === "strong"
      ? { name: "Optimiser's Baseline", price: "£549", path: "/blood-tests/optimiser-baseline", reason: "Your quiz result suggests strong metabolic function. The Optimiser's Baseline gives you a performance baseline, IGF-1, morning cortisol, testosterone, ApoB, fasting insulin, so you know exactly what to maintain and where marginal gains are available. A GP-led 30-minute consultation to go through the results is included." }
      : band === "high-risk"
        ? { name: "Metabolic Baseline", price: "£595", path: "/assessments", reason: "With multiple metabolic signals flagged, the full Baseline gives the most complete picture, 9-marker advanced panel including ApoB, Lp(a), fasting insulin, HbA1c, liver, kidney, and inflammation, plus GP consultation to walk through your results and build a clinical plan." }
        : { name: "Metabolic Weight Resistance Panel", price: "£199", path: "/blood-tests/metabolic-weight", reason: "For 'drifting' results, the Metabolic Weight Panel targets the most common hidden drivers: fasting insulin, HOMA-IR, leptin, adiponectin, Lp(a), and thyroid. It's the panel that explains why weight isn't shifting despite genuine effort." };

  const body = `
    ${lbl("Based on your quiz result")}
    ${h2(`${name !== "there" ? name + ", here" : "Here"}'s which blood panel fits your metabolic picture.`)}
    ${rule()}
    ${p("The right panel isn't the most comprehensive one. It's the one that answers the specific question your quiz result raised.")}
    ${callout(`Recommended for your result: ${recommendedPanel.name}`, `${recommendedPanel.reason}<br><br><strong style="color:#2c2a26;">${recommendedPanel.price}</strong> · GP-reviewed written report included.`)}
    ${btn(`Book ${recommendedPanel.name}, ${recommendedPanel.price} →`, `${SITE}${recommendedPanel.path}`, "#2c2a26", "#f6f1e8")}
    ${rule()}
    <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;color:#2c2a26;text-transform:uppercase;">Other panels worth considering:</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;border-top:1px solid rgba(0,0,0,.07);">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05);font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c2a26;font-weight:600;">Cardiovascular Risk Panel</td>
        <td style="padding:12px 0 12px 12px;border-bottom:1px solid rgba(0,0,0,.05);font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a534a;">ApoB, Lp(a), homocysteine, hs-CRP</td>
        <td style="padding:12px 0 12px 12px;border-bottom:1px solid rgba(0,0,0,.05);font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#c8a84b;font-weight:700;white-space:nowrap;"><a href="${SITE}/blood-tests/cardiovascular-risk" style="color:#c8a84b;text-decoration:none;">£349 →</a></td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05);font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c2a26;font-weight:600;">Energy &amp; Fatigue Panel</td>
        <td style="padding:12px 0 12px 12px;border-bottom:1px solid rgba(0,0,0,.05);font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a534a;">Thyroid, ferritin, B12, fasting insulin</td>
        <td style="padding:12px 0 12px 12px;border-bottom:1px solid rgba(0,0,0,.05);font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#c8a84b;font-weight:700;white-space:nowrap;"><a href="${SITE}/blood-tests/fatigue-energy" style="color:#c8a84b;text-decoration:none;">£249 →</a></td>
      </tr>
      <tr>
        <td style="padding:12px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c2a26;font-weight:600;">Metabolic Baseline</td>
        <td style="padding:12px 0 12px 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a534a;">Full metabolic panel + 2 GP consultations</td>
        <td style="padding:12px 0 12px 12px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#c8a84b;font-weight:700;white-space:nowrap;"><a href="${SITE}/assessments" style="color:#c8a84b;text-decoration:none;">£595 →</a></td>
      </tr>
    </table>
    ${p("Not sure which one is right? Discovery Core is the quickest way to get clarity, 30 minutes with me to review your quiz result and map the right next step.")}
    ${btn("Book Discovery Core, £97 Quiz Rate →", `${SITE}/book?tier=discovery-quiz`, "#c8a84b", "#2c2a26")}
    ${rule()}
    ${p("<strong>Dr Tosin</strong>")}
  `;
  return { subject, html: wrap("Which panel fits your quiz result? A quick guide to the right starting point.", body) };
}

// ─── Email 5, Day 12: FOMO close ─────────────────────────────────────────────

function buildEmail5(firstName: string, band: string): { subject: string; html: string } {
  const name = firstName || "there";
  const subject = "Your quiz result is still waiting for lab confirmation";
  const isHighRisk = band === "high-risk";

  const body = `
    ${lbl("A note from Dr Tosin")}
    ${h2("Your metabolic quiz gave us a picture. Blood confirms it.")}
    ${rule()}
    ${p(`${name !== "there" ? name + ", I" : "I"} want to be direct with you.`)}
    ${p("In the 12 days since you took the quiz, I've had this email sitting in my drafts, because I wasn't sure how to say this without sounding like a sales pitch. But I think it's worth saying plainly.")}
    ${p(`${isHighRisk
      ? "Your quiz result flagged multiple concurrent drivers of metabolic stress. That's not a diagnosis, but it is a signal worth taking seriously. The lifestyle patterns that produce that result are exactly the ones that show up in blood as elevated fasting insulin, high ApoB, and rising inflammatory markers, years before symptoms become obvious."
      : "Your quiz result suggests your metabolism has started to drift. Not dramatically, but the gap between metabolic age and chronological age tends to widen, not narrow, without deliberate intervention. The biological signals behind that drift are measurable. And knowing them changes what you do about it."
    }`)}
    ${p("I see people in clinic regularly who felt broadly fine, then discovered their Lp(a) was significantly elevated, or their fasting insulin had been quietly climbing for years. The difference between those who caught it and those who didn't wasn't luck. It was the decision to look.")}
    ${p("The quiz rate for a 30-minute Discovery Core consultation is <strong style=\"color:#2c2a26;\">£97</strong>, a £30 saving on the standard £127 rate. That rate was unlocked when you completed the quiz.")}
    ${btn("Claim Your £97 Discovery Core →", `${SITE}/book?tier=discovery-quiz`, "#2c2a26", "#f6f1e8")}
    ${callout("Or go straight to blood", `If you'd rather start with the test than the conversation: the <a href="${SITE}/blood-tests/cardiovascular-risk" style="color:#c8a84b;">Cardiovascular Risk Panel (£349)</a> or the <a href="${SITE}/blood-tests/metabolic-weight" style="color:#c8a84b;">Metabolic Weight Panel (£199)</a> are both available directly, results with GP-reviewed interpretation, no referral needed.`)}
    ${rule()}
    ${p("Either way, I'm glad you took the quiz. The awareness itself is worth something. Whatever you decide to do next.")}
    ${p("<strong>Dr Tosin Taiwo</strong><br><span style=\"font-size:13px;color:#8a8278;\">MBBS · MRCGP · MRCS<br>Founder, Veridian Clinic</span>")}
    ${rule()}
    ${p(`<em style="font-size:12px;color:#8a8278;">Questions? Reply to this email directly, I read every message. Or reach us at <a href="mailto:support@veridianclinic.com" style="color:#8a8278;">support@veridianclinic.com</a>.</em>`)}
  `;
  return { subject, html: wrap("Your quiz result gave us a picture. Blood confirms it. Here's what to do next.", body) };
}

// ─── Brevo send helper ────────────────────────────────────────────────────────

async function sendEmail(
  apiKey: string,
  to: { email: string; name: string },
  subject: string,
  html: string,
  scheduledAt?: string
): Promise<void> {
  const payload: Record<string, unknown> = {
    to: [to],
    sender: FROM,
    subject,
    htmlContent: html,
    tags: ["quiz-nurture"],
  };
  if (scheduledAt) payload.scheduledAt = scheduledAt;
  const res = await fetch(`${BREVO_BASE}/smtp/email`, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error(`[quizEmailSequence] Brevo send failed (${res.status}):`, err);
  }
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Schedule the full 5-email quiz nurture sequence via Brevo scheduledAt.
 * Fire-and-forget, errors are logged, never thrown.
 */
export async function scheduleQuizSequence(
  email: string,
  firstName: string,
  mAge: number,
  band: string,
  delta: number
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY || "";
  if (!apiKey) return;

  const to = { email, name: firstName || email };
  const emails = [
    { ...buildEmail1(firstName, mAge, band, delta), delay: undefined },
    { ...buildEmail2(firstName), delay: 2 },
    { ...buildEmail3(firstName, band), delay: 4 },
    { ...buildEmail4(firstName, band), delay: 7 },
    { ...buildEmail5(firstName, band), delay: 12 },
  ];

  await Promise.all(
    emails.map((e) =>
      sendEmail(apiKey, to, e.subject, e.html, e.delay !== undefined ? daysFromNow(e.delay) : undefined)
    )
  );
}
