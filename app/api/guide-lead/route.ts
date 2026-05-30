import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { scheduleGuideSequence } from "@/lib/guideEmailSequence";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE_URL = "https://api.brevo.com/v3";
const FALLBACK_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "guide-leads.ndjson");
const LIST_NAME = "Metabolic Guide Leads";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function ensureBrevoList(): Promise<number | null> {
  if (!BREVO_API_KEY) return null;
  const res = await fetch(`${BREVO_BASE_URL}/contacts/lists?limit=100&offset=0`, {
    headers: { accept: "application/json", "api-key": BREVO_API_KEY },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const existing = Array.isArray(data?.lists)
    ? data.lists.find((l: { id: number; name: string }) => l.name === LIST_NAME)
    : null;
  if (existing?.id) return existing.id;
  const create = await fetch(`${BREVO_BASE_URL}/contacts/lists`, {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
    body: JSON.stringify({ name: LIST_NAME, folderId: 1 }),
  });
  if (!create.ok) return null;
  const created = await create.json();
  return created?.id ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, email } = await request.json() as {
      firstName?: string;
      email?: string;
    };
    const cleanEmail = email?.trim().toLowerCase() || "";
    const cleanName = firstName?.trim() || "";

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      email: cleanEmail,
      firstName: cleanName,
      source: "metabolic-guide",
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
    };

    const listId = await ensureBrevoList();
    if (listId && BREVO_API_KEY) {
      await fetch(`${BREVO_BASE_URL}/contacts`, {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json", "api-key": BREVO_API_KEY },
        body: JSON.stringify({
          email: cleanEmail,
          listIds: [listId],
          updateEnabled: true,
          attributes: { FIRSTNAME: cleanName, SOURCE: "metabolic-guide" },
        }),
      });
    }

    try {
      await mkdir(FALLBACK_DIR, { recursive: true });
      await appendFile(FALLBACK_FILE, `${JSON.stringify(entry)}\n`, "utf8");
    } catch { /* read-only filesystem on some runtimes */ }

    // Schedule 4-email sequence (fire-and-forget — never blocks the response)
    scheduleGuideSequence(cleanEmail, cleanName, "metabolic").catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
