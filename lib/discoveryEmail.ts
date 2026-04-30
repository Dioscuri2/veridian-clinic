const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE_URL = "https://api.brevo.com/v3";

interface DiscoveryEmailParams {
  email: string;
  name: string;
}

export async function sendDiscoveryIntakeEmail({ email, name }: DiscoveryEmailParams): Promise<boolean> {
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
          <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Booking confirmed</p>
          <h1 style="margin:0 0 20px;font-size:1.9rem;font-weight:500;color:#2c2a26;line-height:1.2;">
            Your discovery call is booked, ${firstName}.
          </h1>
          <p style="margin:0 0 20px;font-size:.95rem;color:#5a534a;line-height:1.9;">
            Dr Taiwo will be in touch shortly to confirm your appointment time. To make the most of your 30 minutes, please reply to this email with brief answers to the questions below — it helps Dr Taiwo prepare and means the call can go straight into what matters for you.
          </p>

          <!-- Divider -->
          <div style="height:2px;background:#c8a84b;margin:0 0 28px;"></div>

          <p style="margin:0 0 16px;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2c2a26;">Pre-consultation questions</p>
          <p style="margin:0 0 20px;font-size:.85rem;color:#5a534a;line-height:1.7;">
            <em>Reply to this email with your answers. A few sentences per question is enough.</em>
          </p>

          <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;margin-bottom:10px;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">1. Main reason for booking</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">What is the primary reason you booked this call? (e.g. fatigue, weight that won't shift, cardiovascular concern, general metabolic health review, other)</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">2. Current symptoms</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">What symptoms are you currently experiencing, and roughly how long have they been present?</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">3. Medications &amp; supplements</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">Are you currently taking any prescribed medications or regular supplements? (name and dose if you know them)</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">4. Medical history</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">Any diagnosed conditions we should be aware of? (e.g. thyroid, diabetes, PCOS, cardiovascular, autoimmune, or anything else)</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">5. Energy &amp; sleep</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">How are your energy levels and sleep quality on a typical day? Any crashes, 3am wake-ups, or difficulty getting going in the morning?</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">6. Diet &amp; exercise</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">Brief description of your current diet and weekly exercise routine. (No need for detail — just a general picture.)</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">7. What you want from this call</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">What would a successful outcome from this 30-minute call look like for you?</p>
            </td></tr>
            <tr><td style="padding:6px 0;"></td></tr>

            <tr><td style="padding:14px 18px;background:#f6f1e8;border-left:3px solid #c8a84b;display:block;">
              <p style="margin:0 0 4px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2c2a26;">8. Anything else</p>
              <p style="margin:0;font-size:.86rem;color:#5a534a;line-height:1.7;">Anything else you'd like Dr Taiwo to know before the call?</p>
            </td></tr>

          </table>

          <!-- What happens next -->
          <table cellpadding="0" cellspacing="0" width="100%" style="background:#2c2a26;margin-bottom:28px;">
            <tr><td style="padding:22px 24px;">
              <p style="margin:0 0 10px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c8a84b;">What happens next</p>
              <ul style="margin:0;padding-left:18px;font-size:.86rem;color:rgba(246,241,232,.8);line-height:2.1;">
                <li>Reply to this email with your answers at your convenience</li>
                <li>Dr Taiwo reviews your responses before the call</li>
                <li>You'll receive a calendar invite confirming your appointment time</li>
                <li>Within 24 hours after the call: written summary + pathway recommendation</li>
              </ul>
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
        replyTo: { email: "hello@veridianclinic.com", name: "Dr Taiwo — Veridian Clinic" },
        subject: "Your discovery call is confirmed — please reply with your intake answers",
        htmlContent: html,
        tags: ["discovery-intake"],
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}
