import { NextRequest, NextResponse } from "next/server";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

type LeadPayload = {
  firstName?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
  source?: string;
  list?: string;
  quizScore?: number;
  metabolicAge?: number;
  resultBand?: string;
  metadata?: Record<string, unknown>;
};

const BREVO_API_KEY =
  process.env.BREVO_API_KEY ||
  "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";
const BREVO_BASE_URL = "https://api.brevo.com/v3";
const FALLBACK_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "newsletter-leads.ndjson");

const LIST_CONFIG = {
  newsletter: {
    key: "newsletter",
    name: process.env.BREVO_NEWSLETTER_LIST_NAME || "Veridian Leads",
    fallbackSource: "website",
    message:
      "You’re on the Veridian list. We’ll be in touch with your roadmap shortly.",
  },
  executive_waitlist: {
    key: "executive_waitlist",
    name: process.env.BREVO_EXECUTIVE_WAITLIST_NAME || "waitlist executive health span waitlist",
    fallbackSource: "executive-waitlist",
    message:
      "Your Executive Healthspan application has been received. We’ll contact you when priority access opens.",
  },
} as const;

type ListKey = keyof typeof LIST_CONFIG;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeListKey(list?: string, source?: string): ListKey {
  const raw = `${list || source || ""}`.trim().toLowerCase();
  if (
    raw.includes("executive") ||
    raw.includes("priority") ||
    raw.includes("healthspan")
  ) {
    return "executive_waitlist";
  }
  return "newsletter";
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

async function ensureBrevoList(listName: string): Promise<number | null> {
  if (!BREVO_API_KEY) return null;

  const listResponse = await fetchBrevo(`/contacts/lists?limit=100&offset=0`);
  if (!listResponse.ok) return null;

  const listData = await listResponse.json();
  const existing = Array.isArray(listData?.lists)
    ? listData.lists.find((list: { id: number; name: string }) => list.name === listName)
    : null;

  if (existing?.id) return existing.id;

  const createResponse = await fetchBrevo("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({ name: listName, folderId: 1 }),
  });

  if (!createResponse.ok) return null;

  const created = await createResponse.json();
  return created?.id ?? null;
}

async function submitToBrevo(payload: LeadPayload, listKey: ListKey) {
  const config = LIST_CONFIG[listKey];
  const listId = await ensureBrevoList(config.name);
  if (!listId) return { ok: false as const, reason: "brevo_unavailable" };

  const response = await fetchBrevo("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      listIds: [listId],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: payload.firstName || "",
        SMS: payload.phone || "",
        PHONE: payload.phone || "",
        SOURCE: payload.source || config.fallbackSource,
        LIST: config.key,
        QUIZSCORE: payload.quizScore ?? "",
        METABOLICAGE: payload.metabolicAge ?? "",
        RESULTBAND: payload.resultBand || "",
        METADATA: payload.metadata ? JSON.stringify(payload.metadata) : "",
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

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const email = payload.email?.trim().toLowerCase() || "";
    const listKey = normalizeListKey(payload.list, payload.source);
    const listConfig = LIST_CONFIG[listKey];
    const source = payload.source?.trim() || listConfig.fallbackSource;
    const phone = payload.phone?.trim() || "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (listKey === "executive_waitlist" && !payload.firstName?.trim()) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (listKey === "executive_waitlist" && !phone) {
      return NextResponse.json({ error: "Please enter your phone number." }, { status: 400 });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      email,
      firstName: payload.firstName?.trim() || "",
      phone,
      consent: Boolean(payload.consent),
      source,
      list: listConfig.key,
      listName: listConfig.name,
      quizScore: payload.quizScore ?? null,
      metabolicAge: payload.metabolicAge ?? null,
      resultBand: payload.resultBand ?? null,
      metadata: payload.metadata ?? null,
      userAgent: request.headers.get("user-agent") || "",
      ip:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "",
    };

    let destination = "local-log";

    const brevoResult = await submitToBrevo({ ...payload, email, phone, source }, listKey);
    if (brevoResult.ok) {
      destination = "brevo";
    }

    try {
      await appendLocalLead({ ...entry, destination });
    } catch {
      // Ignore filesystem write failures on read-only serverless runtimes.
    }

    return NextResponse.json({
      ok: true,
      destination,
      list: listConfig.key,
      message:
        destination === "brevo"
          ? listConfig.message
          : listKey === "executive_waitlist"
            ? "Your Executive Healthspan details are captured securely. We’ll be in touch when enrolment opens."
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
