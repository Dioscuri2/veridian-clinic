const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE_URL = "https://api.brevo.com/v3";

interface GuideEmailParams {
  email: string;
  name: string;
  downloadUrl: string;
}

export async function sendGuideEmail({ email, name, downloadUrl }: GuideEmailParams): Promise<boolean> {
  if (!BREVO_API_KEY || !email) return false;

  const firstName = name?.split(" ")[0] || "there";

  const html = `
<!DOCTYPE html>
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

        <!-- Body -->
        <tr><td style="padding:40px 36px;">
          <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Your purchase is confirmed</p>
          <h1 style="margin:0 0 20px;font-size:1.9rem;font-weight:500;color:#2c2a26;line-height:1.2;">
            Your Metabolic Reset Guide is ready, ${firstName}.
          </h1>
          <p style="margin:0 0 16px;font-size:.95rem;color:#5a534a;line-height:1.9;">
            Thank you for your purchase. Your copy of <em>Why Your Weight Isn't Shifting — A Doctor's 21-Day Metabolic Reset Guide</em> is ready to download.
          </p>
          <p style="margin:0 0 28px;font-size:.95rem;color:#5a534a;line-height:1.9;">
            Click the button below to download your PDF. Keep this email — the link works anytime.
          </p>

          <!-- Download button -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:#2c2a26;padding:0;">
              <a href="${downloadUrl}" style="display:block;padding:15px 36px;font-size:.9rem;font-weight:600;letter-spacing:.04em;color:#f6f1e8;text-decoration:none;">
                Download Your Guide (PDF) ↓
              </a>
            </td></tr>
          </table>

          <!-- What's inside reminder -->
          <p style="margin:0 0 12px;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">What's inside your guide</p>
          <ul style="margin:0 0 28px;padding-left:18px;font-size:.88rem;color:#5a534a;line-height:2;">
            <li>The PERC Framework — 4 pillars for structured metabolic change</li>
            <li>21-Day Roadmap — day-by-day action plan across 3 phases</li>
            <li>7-Day Meal Plan with protein-first plate template</li>
            <li>Fasting Cheat Sheet — beginner and advanced tracks</li>
            <li>Movement Ladder — 3 tiers matched to your starting point</li>
            <li>21-Day Habit Tracker + Busy Day Emergency Plan</li>
            <li>Rapid Reset Protocol for recovering from a slip in 24–48 hours</li>
          </ul>

          <!-- Discovery call nudge -->
          <table cellpadding="0" cellspacing="0" width="100%" style="background:#f6f1e8;border-left:3px solid #c8a84b;margin-bottom:28px;">
            <tr><td style="padding:20px 22px;">
              <p style="margin:0 0 8px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">Ready for the clinical layer?</p>
              <p style="margin:0 0 14px;font-size:.88rem;color:#5a534a;line-height:1.85;">
                The guide gives you the framework. The Discovery Call is where Dr Taiwo reviews your specific picture — your symptoms, history, and numbers — and identifies your most important clinical levers. It's free and takes 20 minutes.
              </p>
              <a href="https://veridianclinic.com/book?tier=discovery" style="font-size:.85rem;font-weight:600;color:#2c2a26;text-decoration:underline;">
                Book My Free Discovery Call →
              </a>
            </td></tr>
          </table>

          <p style="margin:0;font-size:.8rem;color:#8a8278;line-height:1.7;">
            Questions? Reply to this email or contact us at
            <a href="mailto:hello@veridianclinic.com" style="color:#2c2a26;">hello@veridianclinic.com</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(0,0,0,.07);">
          <p style="margin:0;font-size:.72rem;color:#aaa49c;line-height:1.7;">
            Veridian Clinic · A trading name of Olympus Premium Health Ltd<br>
            82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE<br>
            CQC regulated services provided by <a href="https://thanksdoc.co.uk" style="color:#2c2a26;">Thanksdoc</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  try {
    const resp = await fetch(`${BREVO_BASE_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Veridian Clinic", email: "hello@veridianclinic.com" },
        to: [{ email, name }],
        subject: "Your Metabolic Reset Guide — Download Inside",
        htmlContent: html,
        tags: ["guide-purchase"],
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}
