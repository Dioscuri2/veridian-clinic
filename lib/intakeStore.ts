import { createCipheriv, createDecipheriv, createHmac, randomBytes, randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

// The clinic's own record of every submitted intake. This, not an email, is
// the system of record: /api/intake saves here BEFORE it notifies anyone, so a
// mail provider outage can no longer lose a patient's history (that is what
// happened in Nov 2026, when Brevo's IP allow-list rejected Railway).
const INTAKES_KEY = "veridian:intakes";

export interface IntakeRecord {
  id: string;
  receivedAt: string; // ISO
  name: string;
  email: string;
  text: string; // the plain-text block exactly as built at submission
  source?: string; // set only when the clinic added it by hand, e.g. from WhatsApp
}

function r(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash not configured");
  return new Redis({ url, token });
}

// Records are encrypted here, before they leave the app, so the Redis host
// only ever holds ciphertext. The key is derived from ADMIN_PASSWORD because
// that is the one secret the reader (the admin) already has.
// TRAP: changing ADMIN_PASSWORD makes earlier records unreadable. Download or
// sync them first. Unreadable records are reported, never silently dropped.
function key(): Buffer {
  const secret = process.env.ADMIN_PASSWORD || "";
  if (!secret) throw new Error("ADMIN_PASSWORD not set, cannot encrypt intake records");
  return createHmac("sha256", secret).update("veridian-intake-store-v1").digest();
}

export function encryptRecord(record: IntakeRecord): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(record), "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64"), cipher.getAuthTag().toString("base64"), body.toString("base64")].join(".");
}

export function decryptRecord(value: string): IntakeRecord {
  const [version, iv, tag, body] = String(value).split(".");
  if (version !== "v1" || !iv || !tag || !body) throw new Error("Unrecognised intake record format");
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  const plain = Buffer.concat([decipher.update(Buffer.from(body, "base64")), decipher.final()]);
  return JSON.parse(plain.toString("utf8")) as IntakeRecord;
}

export async function saveIntake(data: Pick<IntakeRecord, "name" | "email" | "text" | "source">): Promise<IntakeRecord> {
  const record: IntakeRecord = { ...data, id: randomUUID(), receivedAt: new Date().toISOString() };
  const redis = r();
  await redis.hset(INTAKES_KEY, { [record.id]: encryptRecord(record) });
  // Read it back. "Saved" is only true once the store returns what we wrote.
  const check = await redis.hget<string>(INTAKES_KEY, record.id);
  if (!check || decryptRecord(check).id !== record.id) {
    throw new Error("Intake record did not read back after saving");
  }
  return record;
}

export async function listIntakes(): Promise<{ intakes: IntakeRecord[]; unreadable: number }> {
  const raw = await r().hgetall<Record<string, string>>(INTAKES_KEY);
  const intakes: IntakeRecord[] = [];
  let unreadable = 0;
  for (const value of Object.values(raw || {})) {
    try {
      intakes.push(decryptRecord(value));
    } catch {
      unreadable++;
    }
  }
  intakes.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  return { intakes, unreadable };
}

// One patient, one file. A fenced block keeps the layout intact in any
// Markdown viewer and stays paste-ready for the scribe.
export function intakeMarkdown(record: IntakeRecord): string {
  const received = new Date(record.receivedAt).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  });
  return [
    `# Clinical intake: ${record.name}`,
    "",
    `- Received: ${received}`,
    `- Reference: ${record.id}`,
    `- Source: ${record.source || "veridianclinic.com/intake, as submitted by the patient"}`,
    "",
    "````text",
    record.text,
    "````",
    "",
  ].join("\n");
}

export function intakeFilename(record: IntakeRecord): string {
  const safeName = record.name.replace(/[^A-Za-z0-9 '-]/g, "").trim().replace(/\s+/g, " ") || "patient";
  return `${record.receivedAt.slice(0, 10)} ${safeName} ${record.id.slice(0, 8)}.md`;
}
