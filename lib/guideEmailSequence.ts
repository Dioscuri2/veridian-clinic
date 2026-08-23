/**
 * Email sequences for guide lead capture.
 * Called from /api/guide-lead and /api/peri-guide-lead.
 * All four emails are scheduled via Brevo's scheduledAt parameter, no dashboard automation needed.
 *
 * Sequence timing:
 *   Email 1, immediate   (guide delivery)
 *   Email 2, Day 2       (education: metabolic age or perimenopause + metabolism)
 *   Email 3, Day 4       (the 3 markers: Lp(a), fasting insulin, uric acid)
 *   Email 4, Day 7       (discovery call CTA)
 */

const BREVO_BASE = "https://api.brevo.com/v3";
const FROM = { name: "Dr Tosin Taiwo | Veridian Clinic", email: "support@veridianclinic.com" };
const SITE = "https://veridianclinic.com";

// ─── HTML shell ────────────────────────────────────────────────────────────────

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
    .btn{display:block !important;text-align:center !important}
    .hide-mobile{display:none !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#ede8df;-webkit-font-smoothing:antialiased;">
<!-- preheader -->
<div style="display:none;max-height:0;overflow:hidden;color:#ede8df;">${preheader}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</div>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ede8df;">
<tr><td align="center" style="padding:32px 16px;" class="ew">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

    <!-- HEADER -->
    <tr><td bgcolor="#2c2a26" style="padding:28px 48px;text-align:center;border-radius:2px 2px 0 0;">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:4px;color:#c8a84b;text-transform:uppercase;">VERIDIAN CLINIC</p>
      <p style="margin:7px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:rgba(246,241,232,.4);letter-spacing:2px;text-transform:uppercase;">Metabolic &amp; Longevity Medicine</p>
    </td></tr>

    <!-- GOLD RULE -->
    <tr><td bgcolor="#c8a84b" style="height:2px;line-height:2px;font-size:2px;">&nbsp;</td></tr>

    <!-- BODY -->
    <tr><td bgcolor="#ffffff" style="padding:44px 48px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2c2a26;line-height:1.9;" class="eb">
      ${body}
    </td></tr>

    <!-- FOOTER -->
    <tr><td bgcolor="#f6f1e8" style="padding:24px 48px;border-top:1px solid rgba(0,0,0,.07);" class="ef">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8278;line-height:1.9;text-align:center;">
        Dr Tosin Taiwo &nbsp;·&nbsp; Veridian Clinic &nbsp;·&nbsp; Olympus Premium Health Ltd<br>
        82A James Carter Road, Mildenhall, Suffolk IP28 7DE<br style="mso-line-height-rule:exactly;">
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

function btn(label: string, url: string, colour = "#c8a84b", textColour = "#2c2a26"): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;">
    <tr><td bgcolor="${colour}" style="border-radius:2px;">
      <a href="${url}" class="btn" style="display:inline-block;padding:15px 36px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${textColour};text-decoration:none;letter-spacing:.5px;">${label}</a>
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

function p(text: string, style = ""): string {
  return `<p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#5a534a;line-height:1.9;${style}">${text}</p>`;
}

function marker(label: string, content: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px;border-left:3px solid #c8a84b;">
    <tr><td style="padding:14px 20px;background:#f6f1e8;">
      <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;color:#c8a84b;text-transform:uppercase;">${label}</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a534a;line-height:1.85;">${content}</p>
    </td></tr>
  </table>`;
}

// ─── Email 1M, Metabolic guide delivery (immediate) ──────────────────────────

function metabolicEmail1(name: string): { subject: string; html: string } {
  const subject = `Your Metabolic Reset Guide is here${name ? ", " + name : ""}`;
  const body = `
    ${lbl("Your download is ready")}
    ${h2("The Metabolic Reset Guide")}
    ${rule()}
    ${p(`Most people who download this guide have already noticed something has shifted, energy that isn't what it used to be, weight that feels harder to manage despite nothing changing, sleep that doesn't quite restore the way it once did.`)}
    ${p(`You're not imagining it. And it's not simply "getting older". There are specific, measurable biological processes driving this, and most of them have names, markers, and clear pathways to address.`)}
    ${p(`The guide walks you through the framework I use in clinic every day.`)}
    ${btn("Download Your Free Guide →", `${SITE}/metabolic-reset-guide/thank-you`)}
    ${p(`<em style="color:#8a8278;font-size:13px;">GP-authored · 21-day reset plan · Instant PDF download</em>`)}
    ${rule()}
    ${p(`Over the next week, I'll share some of the clinical thinking behind what the guide covers, including the specific blood markers that most standard health checks quietly miss.`)}
    ${p(`Speak soon,`)}
    ${p(`<strong>Dr Tosin Taiwo</strong><br><span style="font-size:13px;color:#8a8278;">MBBS · MRCGP · MRCS<br>Founder, Veridian Clinic</span>`)}
  `;
  return { subject, html: wrap("Download your guide + a note from Dr Tosin before you start.", body) };
}

// ─── Email 2M, Metabolic age education (Day 2) ────────────────────────────────

function metabolicEmail2(name: string): { subject: string; html: string } {
  const subject = "The gap between your real age and your metabolic age";
  const body = `
    ${lbl("From Dr Tosin's desk")}
    ${h2("One number tells you how old you are. The other tells you how well you're ageing.")}
    ${rule()}
    ${p(`${name ? name + ", I" : "I"} want to tell you something I observe in clinic regularly.`)}
    ${p(`I see patients in their early 40s whose biology is running 8 to 12 years ahead of schedule. Not because of anything dramatic. Not because they've been reckless or unhealthy. But because of a slow, quiet accumulation of signals that were never picked up, and therefore never addressed.`)}
    ${p(`And I see patients in their late 50s whose metabolic markers look like someone a decade younger. Not because of luck. Because something in their biology, lifestyle, or clinical care caught the drift early.`)}
    ${p(`The gap between chronological age and metabolic age isn't fixed. But it widens faster than most people expect, particularly through the 40s, and it tends to widen silently.`)}
    ${p(`<strong style="color:#2c2a26;">What actually drives metabolic age drift:</strong>`)}
    ${p(`Fasting insulin creeping upward, years before blood sugar becomes abnormal. Inflammatory markers rising quietly. Sleep architecture changing in ways that impair cellular repair. Visceral fat accumulating even in people at a healthy weight. Hormonal shifts, in both men and women, that cascade into energy regulation, fat storage, and cardiovascular risk.`)}
    ${p(`None of these show up in a standard NHS health check. Most people have no idea their metabolic age is diverging until the gap becomes large enough to notice as symptoms.`)}
    ${p(`The guide covers the practical framework. Tomorrow I want to share the specific markers, the ones I consider essential for anyone serious about understanding what their body is actually doing.`)}
    ${p(`Until then,`)}
    ${p(`<strong>Dr Tosin</strong>`)}
    ${rule()}
    ${p(`<em style="font-size:13px;color:#8a8278;">P.S. If you haven't taken the metabolic quiz yet, it gives you an indicative picture of where you are right now. The actual numbers come from blood, but the quiz is a useful first step. <a href="${SITE}/metabolic-quiz" style="color:#c8a84b;">Take it here →</a></em>`)}
  `;
  return { subject, html: wrap("One number tells you how old you are. The other tells you how well you're ageing.", body) };
}

// ─── Email 1P, Perimenopause guide delivery (immediate) ──────────────────────

function periEmail1(name: string): { subject: string; html: string } {
  const subject = `Your Perimenopause Reset Guide is ready${name ? ", " + name : ""}`;
  const body = `
    ${lbl("Your download is ready")}
    ${h2("The Perimenopause Reset Guide")}
    ${rule()}
    ${p(`Perimenopause is one of the most significant but least discussed metabolic events in a woman's life. The hormone changes that begin in the mid-to-late 30s and continue through the 40s and beyond don't just affect your cycle, they change how your body handles energy, fat, sleep, and cardiovascular risk.`)}
    ${p(`Most women are told this is normal. It is. But "normal" doesn't mean inevitable, unmanageable, or untreatable. There's a great deal that clinical work, the right tests, the right interventions, can actually do.`)}
    ${p(`The guide gives you the framework. I'd encourage you to read the chapters on metabolic drift and sleep in particular, they're often the missing piece.`)}
    ${btn("Download Your Free Guide →", `${SITE}/perimenopause-guide/thank-you`)}
    ${p(`<em style="color:#8a8278;font-size:13px;">GP-authored · Doctor-led protocols · Instant PDF download</em>`)}
    ${rule()}
    ${p(`Over the next few days, I'll share the clinical thinking behind the guide, including the specific blood markers that give a much fuller picture than a standard NHS check.`)}
    ${p(`Speak soon,`)}
    ${p(`<strong>Dr Tosin Taiwo</strong><br><span style="font-size:13px;color:#8a8278;">MBBS · MRCGP · MRCS<br>Founder, Veridian Clinic</span>`)}
  `;
  return { subject, html: wrap("Download your guide + a note from Dr Tosin on what it covers.", body) };
}

// ─── Email 2P, Perimenopause + metabolism (Day 2) ────────────────────────────

function periEmail2(name: string): { subject: string; html: string } {
  const subject = "Why perimenopause changes your metabolic picture";
  const body = `
    ${lbl("From Dr Tosin's desk")}
    ${h2("The hormone shift doesn't just affect your cycle. It changes your metabolism.")}
    ${rule()}
    ${p(`${name ? name + ", one" : "One"} of the most common things I hear in clinic from women in perimenopause is some version of: <em>"I haven't changed anything, but everything has changed."</em>`)}
    ${p(`Weight is harder to manage. Energy dips in ways that don't respond to sleep or rest the way they used to. Brain fog appears. Mood shifts for no clear reason. Sleep is lighter, less restorative.`)}
    ${p(`These aren't character flaws or signs of decline. They're measurable biological events, and understanding them changes how you approach them.`)}
    ${p(`<strong style="color:#2c2a26;">Here's what's actually happening:</strong>`)}
    ${p(`Oestrogen plays a significant role in regulating insulin sensitivity. As oestrogen levels fluctuate and decline through perimenopause, cells become less responsive to insulin, meaning your body needs to produce more to do the same job. This often drives weight gain, particularly around the abdomen, even in women who eat well and exercise.`)}
    ${p(`Sleep architecture changes, less deep sleep, more disrupted nights, impair cellular repair, cortisol regulation, and the hormonal signals that control appetite and fat storage.`)}
    ${p(`Cardiovascular risk, which was largely modulated by oestrogen, begins to rise. The lipid profile shifts. Inflammation markers that were previously quiet can increase.`)}
    ${p(`None of this is visible from the outside, and most of it isn't measured in a routine check. But it's all testable. And when you know your specific picture, you can do something targeted about it.`)}
    ${p(`Tomorrow I'll share the three blood markers I consider essential for women in perimenopause, markers that rarely appear on a standard NHS blood form.`)}
    ${p(`Until then,`)}
    ${p(`<strong>Dr Tosin</strong>`)}
  `;
  return { subject, html: wrap("The hormone shift doesn't just affect your cycle, it changes your metabolism.", body) };
}

// ─── Email 3, The markers (Day 4, shared both sequences) ─────────────────────

function markersEmail(name: string, guide: "metabolic" | "peri"): { subject: string; html: string } {
  const subject = guide === "peri"
    ? "The 3 blood markers I check in every perimenopausal patient"
    : "Most GPs check cholesterol. Here's what they're missing.";

  const intro = guide === "peri"
    ? `${name ? name + ", beyond" : "Beyond"} FSH and oestradiol, which most GPs focus on, there are three metabolic markers that give a far clearer picture of what's happening in a perimenopausal body. They rarely appear on a standard NHS blood form. Most women have never had them checked.`
    : `${name ? name + ", a" : "A"} standard NHS cholesterol check measures four things: total cholesterol, LDL, HDL, triglycerides. It's a starting point. But for anyone serious about understanding their cardiovascular and metabolic health, there are three markers that matter just as much, and almost never get tested.`;

  const body = `
    ${lbl("Clinical education")}
    ${h2(guide === "peri"
      ? "Three markers. One complete metabolic picture."
      : "Three markers your standard blood form doesn't include.")}
    ${rule()}
    ${p(intro)}
    ${marker("Lipoprotein(a), Lp(a)", `Lp(a) is a particle of LDL cholesterol with an extra protein attached that makes it significantly more damaging to artery walls. High levels independently increase the risk of heart attack and stroke, regardless of what your standard LDL shows.<br><br>The critical point: Lp(a) is largely genetic. Diet and exercise have almost no effect on it. If your Lp(a) is elevated, you need to know, because it changes how aggressively you should manage every other risk factor. Yet it's absent from the standard NHS cholesterol panel.${guide === "peri" ? " And oestrogen's natural suppressive effect on Lp(a) means levels can rise as oestrogen declines." : ""}`)}
    ${marker("Fasting Insulin", `Fasting insulin is measured after an overnight fast and shows how much insulin your body is producing at rest. It's the earliest signal of insulin resistance, often rising years, sometimes decades, before blood glucose becomes abnormal.<br><br>By the time a fasting glucose or HbA1c is flagged, insulin resistance has typically been present for a long time. But fasting insulin catches the drift early, when the picture is still very much reversible. Optimal is 2–6 μIU/mL. Many labs consider anything under 25 "normal", which is a range I find clinically too broad to be useful.${guide === "peri" ? " In perimenopause, insulin sensitivity often declines, making this test particularly relevant." : ""}`)}
    ${marker("Uric Acid", `Uric acid is best known as the marker for gout. But elevated uric acid is also strongly associated with metabolic syndrome, hypertension, fatty liver disease, and insulin resistance, often preceding these conditions by years.<br><br>The mechanism matters: high uric acid impairs the production of nitric oxide in blood vessels, which affects vasodilation and blood pressure regulation. It's a metabolic canary, frequently elevated quietly in people who look otherwise healthy, and it's rarely measured unless someone has gout symptoms.${guide === "peri" ? " Blood pressure shifts in perimenopause make this particularly worth knowing." : ""}`)}
    ${rule()}
    ${p(`These three markers, together with the standard panel, are what our <strong>Metabolic Blood Panel</strong> includes. Each result comes with GP clinical interpretation: not just "normal" or "abnormal", but what your specific numbers actually mean for you.`)}
    ${btn("See the Metabolic Blood Panel →", `${SITE}/assessments`, "#2c2a26", "#f6f1e8")}
    ${p(`<em style="font-size:13px;color:#8a8278;">Or reply to this email if you have questions, I read every reply.</em>`)}
    ${p(`<strong>Dr Tosin</strong>`)}
  `;

  return { subject, html: wrap("Three markers that don't appear on a standard NHS blood form, and why they should.", body) };
}

// ─── Email 4, Discovery call CTA (Day 7, both sequences) ─────────────────────

function discoveryCallEmail(name: string, guide: "metabolic" | "peri"): { subject: string; html: string } {
  const subject = "30 minutes. Your actual numbers. A clear plan.";

  const angle = guide === "peri"
    ? "understanding what's driving your symptoms right now, and what a targeted clinical approach could do for you specifically"
    : "understanding what's actually happening in your biology, and what a structured plan to address it would look like for you specifically";

  const body = `
    ${lbl("Your next step")}
    ${h2("What a 30-minute Discovery Core consultation with Dr Tosin actually looks like.")}
    ${rule()}
    ${p(`${name ? name + ", I" : "I"} want to be straightforward with you about what this call is, and what it isn't.`)}
    ${p(`It's not a sales pitch. It's a clinical conversation.`)}
    ${p(`In 30 minutes, we cover your current symptoms, your relevant history, your goals, and what you've already tried. I give you a clear view of what I'd want to investigate, what the likely drivers are, and what a sensible clinical plan looks like for you.`)}
    ${p(`You leave with clarity, on what's worth testing, what's worth addressing first, and why. Whether or not you decide to work with me further, the call itself is useful.`)}
    ${p(`The call costs <strong style="color:#2c2a26;">£127</strong>.`)}
    ${btn("Book Your Discovery Core, £127 →", `${SITE}/book?tier=discovery`)}
    ${rule()}
    ${p(`If you're not ready for a call yet, the Metabolic Blood Panel is also available directly. It's the practical starting point for ${angle}.`)}
    ${p(`<a href="${SITE}/assessments" style="color:#c8a84b;font-weight:600;">Explore the blood panel options →</a>`)}
    ${p(`Either way, I'm glad you downloaded the guide. The information in it is genuinely useful, whatever you decide to do next.`)}
    ${p(`<strong>Dr Tosin Taiwo</strong><br><span style="font-size:13px;color:#8a8278;">MBBS · MRCGP · MRCS</span>`)}
    ${rule()}
    ${p(`<em style="font-size:12px;color:#8a8278;">Questions before booking? Reply to this email directly, I read every message.</em>`)}
  `;

  return { subject, html: wrap("A clinical conversation, not a sales pitch. Here's what a 30-minute call covers.", body) };
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
  };
  if (scheduledAt) payload.scheduledAt = scheduledAt;

  const res = await fetch(`${BREVO_BASE}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error(`[guideEmailSequence] Brevo send failed (${res.status}):`, err);
  }
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Schedule the full 4-email sequence for a guide lead.
 * Fire-and-forget, errors are logged but not thrown.
 */
export async function scheduleGuideSequence(
  email: string,
  firstName: string,
  guide: "metabolic" | "peri"
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY || "";
  if (!apiKey) return;

  const name = firstName || "";
  const to = { email, name: name || email };

  const emails =
    guide === "metabolic"
      ? [
          metabolicEmail1(name),
          metabolicEmail2(name),
          markersEmail(name, "metabolic"),
          discoveryCallEmail(name, "metabolic"),
        ]
      : [
          periEmail1(name),
          periEmail2(name),
          markersEmail(name, "peri"),
          discoveryCallEmail(name, "peri"),
        ];

  // Email 1: immediate (no scheduledAt), emails 2-4: scheduled
  const delays = [undefined, 2, 4, 7];

  await Promise.all(
    emails.map((e, i) =>
      sendEmail(apiKey, to, e.subject, e.html, delays[i] !== undefined ? daysFromNow(delays[i]!) : undefined)
    )
  );
}
