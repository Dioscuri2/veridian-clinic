import { NextRequest, NextResponse } from "next/server";

const BREVO_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE = "https://api.brevo.com/v3";
const LIST_ID = 21; // Veridian Leads

// Template IDs set as Railway env vars after Brevo template creation
const TEMPLATE_IDS: Record<number, number | undefined> = {
  2: process.env.BREVO_NURTURE_2_ID ? parseInt(process.env.BREVO_NURTURE_2_ID) : undefined,
  4: process.env.BREVO_NURTURE_3_ID ? parseInt(process.env.BREVO_NURTURE_3_ID) : undefined,
  6: process.env.BREVO_NURTURE_4_ID ? parseInt(process.env.BREVO_NURTURE_4_ID) : undefined,
  8: process.env.BREVO_NURTURE_5_ID ? parseInt(process.env.BREVO_NURTURE_5_ID) : undefined,
};

function brevoHeaders() {
  return { "api-key": BREVO_KEY, "content-type": "application/json", accept: "application/json" };
}

function daysSince(dateStr: string): number {
  if (!dateStr) return -1;
  const joined = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24));
}

async function getContactsFromList(listId: number) {
  const res = await fetch(`${BREVO_BASE}/contacts/lists/${listId}/contacts?limit=500&offset=0`, {
    headers: brevoHeaders(),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.contacts || [];
}

async function getContactAttributes(email: string) {
  const res = await fetch(`${BREVO_BASE}/contacts/${encodeURIComponent(email)}`, {
    headers: brevoHeaders(),
  });
  if (!res.ok) return null;
  return res.json();
}

async function sendTemplate(email: string, firstName: string, templateId: number, params: Record<string, unknown>) {
  const res = await fetch(`${BREVO_BASE}/smtp/email`, {
    method: "POST",
    headers: brevoHeaders(),
    body: JSON.stringify({
      to: [{ email }],
      templateId,
      params: { FIRSTNAME: firstName || "there", ...params },
    }),
  });
  return res.ok;
}

// GET is called by Railway cron daily at 8am UTC
// Protected by CRON_SECRET env var
export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret") || request.nextUrl.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!BREVO_KEY) {
    return NextResponse.json({ error: "BREVO_API_KEY not configured" }, { status: 500 });
  }

  const contacts = await getContactsFromList(LIST_ID);
  const results: { email: string; day: number; sent: boolean; templateId?: number }[] = [];

  for (const contact of contacts) {
    const details = await getContactAttributes(contact.email);
    if (!details) continue;

    const attrs = details.attributes || {};
    const joinDate: string = attrs.JOINDATE || "";
    const firstName: string = attrs.FIRSTNAME || "";
    const metabolicAge: string = String(attrs.METABOLICAGE || "");
    const resultBand: string = attrs.RESULTBAND || "";

    const days = daysSince(joinDate);
    const templateId = TEMPLATE_IDS[days];

    if (!templateId) continue;

    const sent = await sendTemplate(contact.email, firstName, templateId, {
      METABOLICAGE: metabolicAge,
      RESULTBAND: resultBand,
    });

    results.push({ email: contact.email, day: days, sent, templateId });
  }

  return NextResponse.json({
    ok: true,
    processed: contacts.length,
    sent: results.filter(r => r.sent).length,
    results,
  });
}
