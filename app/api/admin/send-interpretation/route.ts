import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE = "https://api.brevo.com/v3";

function buildInterpretationEmail(patientName: string, panelName: string, reportHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1e8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(0,0,0,.08);">

        <tr><td style="background:#2c2a26;padding:24px 36px;">
          <p style="margin:0;font-family:Georgia,serif;font-size:1.1rem;font-weight:700;letter-spacing:.18em;color:#f6f1e8;text-transform:uppercase;">VERIDIAN</p>
          <p style="margin:4px 0 0;font-size:.65rem;font-weight:700;letter-spacing:.28em;color:#c8a84b;text-transform:uppercase;">Clinic</p>
        </td></tr>
        <tr><td style="height:3px;background:#c8a84b;"></td></tr>

        <tr><td style="padding:40px 36px;">
          <p style="margin:0 0 8px;font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#c8a84b;">Your blood test results</p>
          <h1 style="margin:0 0 6px;font-size:1.7rem;font-weight:500;color:#2c2a26;line-height:1.25;">
            ${panelName}
          </h1>
          <p style="margin:0 0 28px;font-size:.88rem;color:#8a8278;">Dr Oluwatosin Taiwo, Veridian Clinic</p>

          <div style="border-top:1px solid rgba(0,0,0,.08);padding-top:24px;font-size:.93rem;color:#5a534a;line-height:1.9;">
            ${reportHtml}
          </div>

          <div style="margin-top:32px;padding:20px 24px;background:#f6f1e8;border-left:3px solid #c8a84b;">
            <p style="margin:0 0 10px;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8a5500;">Want to go through this together?</p>
            <p style="margin:0 0 14px;font-size:.86rem;color:#5a534a;line-height:1.75;">
              Book a 30-minute results consultation with Dr Tosin to go through your results live and agree a clear next-step plan.
            </p>
            <p style="margin:0 0 14px;font-size:.86rem;color:#5a534a;">
              <strong style="color:#2c2a26;">Blood test patient rate: £149</strong> <span style="color:#8a8278;">(standard £195)</span>
            </p>
            <a href="https://veridianclinic.com/book?tier=discovery" style="display:inline-block;background:#2c2a26;color:#f6f1e8;padding:11px 24px;text-decoration:none;font-size:.88rem;font-weight:600;letter-spacing:.04em;">
              Book results consultation £149
            </a>
          </div>

          <p style="margin:28px 0 6px;font-size:.86rem;color:#5a534a;line-height:1.75;">
            Questions about your results? Reply to this email. It goes directly to Dr Tosin's clinical inbox.
          </p>
          <p style="margin:0;font-size:.86rem;color:#5a534a;">
            Email: <a href="mailto:support@veridianclinic.com" style="color:#2c2a26;font-weight:600;">support@veridianclinic.com</a>
          </p>
        </td></tr>

        <tr><td style="padding:20px 36px;border-top:1px solid rgba(0,0,0,.07);">
          <p style="margin:0;font-size:.72rem;color:#aaa49c;line-height:1.7;">
            Veridian Clinic · Olympus Premium Health Ltd<br>
            82A James Carter Road, Mildenhall, Suffolk IP28 7DE<br>
            This report is for the named recipient only. It does not replace NHS care. If you have urgent clinical concerns, contact NHS 111 or your GP.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  if (!BREVO_API_KEY) {
    return NextResponse.json({ error: "BREVO_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { patientEmail, patientName, panelName, reportText } = await req.json();

    if (!patientEmail || !reportText) {
      return NextResponse.json({ error: "patientEmail and reportText are required" }, { status: 400 });
    }

    const reportHtml = reportText
      .split("\n\n")
      .map((para: string) => {
        if (para.startsWith("- ") || para.startsWith("* ")) {
          const items = para.split("\n").filter((l: string) => l.trim());
          return `<ul style="padding-left:20px;margin:0 0 16px;">${items.map((li: string) => `<li style="margin-bottom:6px;">${li.replace(/^[-*]\s+/, "")}</li>`).join("")}</ul>`;
        }
        if (para.startsWith("##")) {
          return `<h3 style="font-size:1.05rem;font-weight:600;color:#2c2a26;margin:24px 0 8px;">${para.replace(/^#+\s*/, "")}</h3>`;
        }
        return `<p style="margin:0 0 16px;">${para}</p>`;
      })
      .join("");

    const resp = await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: { "accept": "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: "Dr Tosin Taiwo | Veridian Clinic", email: "support@veridianclinic.com" },
        to: [{ email: patientEmail, name: patientName || patientEmail }],
        replyTo: { email: "support@veridianclinic.com", name: "Veridian Clinic" },
        subject: `Your blood test results: ${panelName || "Veridian Clinic"}`,
        htmlContent: buildInterpretationEmail(patientName || "there", panelName || "Blood Test Results", reportHtml),
        tags: ["blood-test-results"],
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: `Brevo error: ${err}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send-interpretation error", e);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
