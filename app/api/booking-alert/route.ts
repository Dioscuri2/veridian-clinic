import { NextRequest, NextResponse } from "next/server";
import { PANELS } from "@/data/panels";

/**
 * Real-time alert that a ThanksDoc booking completed.
 *
 * ThanksDoc's own notifications are in-app only: a "New Appointment" entry
 * appears in the doctor portal and nothing else happens. That is fine when you
 * are already logged in and expecting two bookings a month, and it is a way to
 * miss a patient once leaflets are driving strangers to book.
 *
 * ThanksDoc redirects the patient to our thank-you page after payment, so that
 * redirect is the one moment we can observe a booking from our own side. This
 * route turns it into a Discord ping.
 *
 * Deliberately limited: the redirect carries only the tier, so this says a
 * booking happened and which product it was, not who booked. It is a prompt to
 * go and look, not a substitute for the clinical record.
 */

const DISCORD_WEBHOOK = (process.env.DISCORD_WEBHOOK_VERIDIAN || "").replace(/^"|"$/g, "");

export async function POST(request: NextRequest) {
  const { tier } = await request.json().catch(() => ({ tier: null }));

  const panel = typeof tier === "string" ? PANELS.find((p) => p.checkoutTier === tier) : undefined;
  const product = panel ? `${panel.productName} (£${panel.pricePence / 100})` : (tier || "unknown product");

  const when = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    weekday: "short", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit",
  });

  if (!DISCORD_WEBHOOK) {
    // Fail loud in logs rather than silently swallowing a missed patient.
    console.error("booking-alert: DISCORD_WEBHOOK_VERIDIAN is not set, alert not sent", { tier });
    return NextResponse.json({ ok: false, reason: "webhook not configured" }, { status: 200 });
  }

  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: [
          "**New booking on ThanksDoc**",
          `Product: ${product}`,
          `Reached the thank-you page: ${when}`,
          "Open ThanksDoc to see the patient and the slot: https://notes.thanksdoc.co.uk/staff/appointments/calendar",
        ].join("\n"),
      }),
    });
  } catch (err) {
    console.error("booking-alert: Discord ping failed", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
