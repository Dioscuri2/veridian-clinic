import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { scheduleQuizSequence } from "@/lib/quizEmailSequence";

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_BASE_URL = "https://api.brevo.com/v3";
const LIST_NAME = process.env.BREVO_NEWSLETTER_LIST_NAME || "Veridian Leads";

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

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const email = (payload.email || "").trim().toLowerCase();
    const firstName = (payload.firstName || "").trim();
    const mAge = Number(payload.mAge || 0);
    const band = (payload.band || "drifting") as string;
    const delta = Number(payload.delta || 0);

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
            JOINDATE: new Date().toISOString().split("T")[0],
          },
        }),
      });
    }

    scheduleQuizSequence(email, firstName, mAge, band, delta).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to process." },
      { status: 500 },
    );
  }
}
