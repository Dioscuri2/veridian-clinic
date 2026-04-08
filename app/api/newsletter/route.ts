import { NextRequest, NextResponse } from "next/server";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

type LeadPayload = {
  firstName?: string;
  email?: string;
  consent?: boolean;
  source?: string;
  quizScore?: number;
  metabolicAge?: number;
  resultBand?: string;
};

const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mkopkopb";
const BREVO_BASE_URL = "https://api.brevo.com/v3";
const VERIDIAN_LIST_NAME = "Veridian Leads";
const FALLBACK_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "newsletter-leads.ndjson");

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function appendLocalLead(entry: Record<string, unknown>) {
  await mkdir(FALLBACK_DIR, { recursive: true });
  await appendFile(FALLBACK_FILE, `${JSON.stringify(entry)}\n`, "utf8");
}

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

async function ensureBrevoList(): Promise<number | null> {
  if (!BREVO_API_KEY) return null;

  const listResponse = await fetchBrevo(`/contacts/lists?limit=50&offset=0`);
  if (!listResponse.ok) return null;

  const listData = await listResponse.json();
  const existing = Array.isArray(listData?.lists)
    ? listData.lists.find((list: { id: number; name: string }) => list.name === VERIDIAN_LIST_NAME)
    : null;

  if (existing?.id) return existing.id;

  const createResponse = await fetchBrevo("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({ name: VERIDIAN_LIST_NAME, folderId: 1 }),
  });

  if (!createResponse.ok) return null;

  const created = await createResponse.json();
  return created?.id ?? null;
}

async function submitToBrevo(payload: LeadPayload) {
  const listId = await ensureBrevoList();
  if (!listId) return { ok: false as const, reason: "brevo_unavailable" };

  const response = await fetchBrevo("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      listIds: [listId],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: payload.firstName || "",
        SOURCE: payload.source || "website",
        QUIZSCORE: payload.quizScore ?? "",
        METABOLICAGE: payload.metabolicAge ?? "",
        RESULTBAND: payload.resultBand || "",
        CONSENT: payload.consent ? "true" : "false",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { ok: false as const, reason: errorText || "brevo_error" };
  }

  return { ok: true as const };
}

async function submitToFormspree(payload: LeadPayload) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      firstName: payload.firstName || "",
      email: payload.email,
      source: payload.source || "website",
      quizScore: payload.quizScore ?? "",
      metabolicAge: payload.metabolicAge ?? "",
      resultBand: payload.resultBand || "",
      consent: payload.consent ? "yes" : "no",
    }),
  });

  return response.ok;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const email = payload.email?.trim().toLowerCase() || "";
    const source = payload.source?.trim() || "website";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      email,
      firstName: payload.firstName?.trim() || "",
      consent: Boolean(payload.consent),
      source,
      quizScore: payload.quizScore ?? null,
      metabolicAge: payload.metabolicAge ?? null,
      resultBand: payload.resultBand ?? null,
      userAgent: request.headers.get("user-agent") || "",
      ip:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "",
    };

    let destination = "local-log";

    if (BREVO_API_KEY) {
      const brevoResult = await submitToBrevo({ ...payload, email, source });
      if (brevoResult.ok) {
        destination = "brevo";
      }
    }

    if (destination !== "brevo") {
      const formspreeOk = await submitToFormspree({ ...payload, email, source }).catch(() => false);
      destination = formspreeOk ? "formspree" : "local-log";
    }

    try {
      await appendLocalLead({ ...entry, destination });
    } catch {
      // Ignore filesystem write failures on read-only serverless runtimes.
    }

    return NextResponse.json({
      ok: true,
      destination,
      message:
        destination === "brevo"
          ? "You’re on the Veridian list. We’ll be in touch with your roadmap shortly."
          : "Your details are captured securely. We’ll follow up with your roadmap shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to process subscription.",
      },
      { status: 500 }
    );
  }
}
