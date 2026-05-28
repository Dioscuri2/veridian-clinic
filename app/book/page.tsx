"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

// Set NEXT_PUBLIC_CALENDLY_URL in Vercel env vars once Calendly account is ready.
// Different event types per tier are optional — use one URL initially.
const CALENDLY_BASE = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

const tierDetails: Record<string, {
  title: string; price: string; duration: string;
  description: string; strikethrough?: string; badge?: string;
}> = {
  discovery: {
    title: "GP Discovery Call",
    price: "£195",
    duration: "30 min",
    description: "A GP-led review of your metabolic picture, key risk factors, and a personalised clinical pathway recommendation.",
  },
  "discovery-quiz": {
    title: "GP Discovery Call",
    price: "£97",
    strikethrough: "£195",
    badge: "Quiz rate — save £98",
    duration: "30 min",
    description: "A 30-minute GP-led review of your metabolic quiz result and a personalised pathway recommendation.",
  },
  "metabolic-screen": {
    title: "Energy Screen",
    price: "£195",
    duration: "45 min",
    description: "A targeted fatigue, thyroid, insulin and inflammation panel with GP-reviewed interpretation and a clear written next-step recommendation.",
  },
  baseline: {
    title: "Veridian Baseline",
    price: "£595",
    duration: "60 min",
    description: "A longevity-focused baseline audit designed to reveal the most actionable metabolic drivers before they become disease.",
  },
  "longevity-panel": {
    title: "Longevity Panel",
    price: "£795",
    duration: "60 min",
    description: "A premium biological-age audit covering 150+ data points with GP interpretation.",
  },
  programme: {
    title: "12-Week Metabolic Reset",
    price: "£1,895",
    duration: "90 min",
    description: "A structured reset with guided implementation, accountability and follow-through.",
  },
};

const aliasMap: Record<string, string> = { advanced: "programme" };

function Shield() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M7.5 1.2L2 4.2v3.5c0 2.8 2.1 5 5.5 5.8 3.4-.8 5.5-3 5.5-5.8V4.2z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".7"/>
      <path d="M5 7.5l1.7 1.7 2.8-2.8" stroke="var(--go)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type Step = "calendar" | "pay" | "submitting" | "done" | "no-calendly";

function BookingInner() {
  const searchParams = useSearchParams();
  const rawTier = searchParams.get("tier") || "discovery";
  const refParam = searchParams.get("ref") || "";

  const resolvedTier = (() => {
    const t = aliasMap[rawTier] || rawTier;
    if (t === "discovery" && refParam === "quiz-high-risk") return "discovery-quiz";
    return tierDetails[t] ? t : "discovery";
  })();

  const details = tierDetails[resolvedTier];

  const [step, setStep] = useState<Step>(CALENDLY_BASE ? "calendar" : "no-calendly");
  const [invitee, setInvitee] = useState<{ name: string; email: string } | null>(null);
  const [slotLabel, setSlotLabel] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Load Calendly widget script once
  useEffect(() => {
    if (!CALENDLY_BASE) return;
    if (document.querySelector('script[src*="calendly.com/assets"]')) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Detect when patient completes Calendly booking
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.event !== "calendly.event_scheduled") return;
      const payload = e.data.payload ?? {};
      const name: string = payload.invitee?.name ?? "";
      const email: string = payload.invitee?.email ?? "";
      const startTime: string = payload.event?.start_time ?? "";
      setInvitee({ name, email });
      if (startTime) {
        setSlotLabel(
          new Date(startTime).toLocaleString("en-GB", {
            weekday: "long", day: "numeric", month: "long",
            year: "numeric", hour: "2-digit", minute: "2-digit",
          })
        );
      }
      setStep("pay");
      // Scroll to payment section smoothly
      setTimeout(() => {
        document.getElementById("pay-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const onPay = async () => {
    if (!invitee) return;
    setStep("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: invitee.name,
          email: invitee.email,
          tier: resolvedTier,
          notes: slotLabel ? `Calendly slot: ${slotLabel}` : "",
          turnstileToken: "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error || "Checkout session failed");
      window.location.href = data.url;
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Payment setup failed. Please try again.");
      setStep("pay");
    }
  };

  const embedUrl = `${CALENDLY_BASE}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=f6f1e8&text_color=131f2e&primary_color=c8a84b`;

  return (
    <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>
      <section className="sec bg-iv">
        <div className="wrap" style={{ maxWidth: 860 }}>

          {/* Header */}
          <p className="lbl">Booking</p>
          <div className="rule" />
          <h1 className="cg" style={{ fontSize: "clamp(2rem,4.2vw,3rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 20 }}>
            {step === "pay" || step === "submitting"
              ? <><em style={{ fontStyle: "italic", color: "var(--fo2)" }}>Your slot is reserved.</em><br />Pay now to confirm.</>
              : <>Choose your time.<br /><em style={{ fontStyle: "italic", color: "var(--fo2)" }}>Pay to confirm.</em></>
            }
          </h1>

          {/* Tier summary card */}
          <div className="card" style={{ maxWidth: 580, marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
              <span style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--go)", border: "1px solid rgba(200,168,75,.3)", padding: "2px 8px" }}>
                {details.duration}
              </span>
              <h2 className="cg" style={{ fontSize: "1.35rem", color: "var(--sl)", margin: 0 }}>{details.title}</h2>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fo)" }}>{details.price}</span>
              {details.strikethrough && (
                <span style={{ fontSize: ".88rem", color: "var(--sl3)", textDecoration: "line-through" }}>{details.strikethrough}</span>
              )}
              {details.badge && (
                <span style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".1em", background: "var(--go)", color: "var(--fo)", padding: "2px 8px" }}>{details.badge}</span>
              )}
            </div>
            <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.85 }}>{details.description}</p>
          </div>

          {/* STEP 1: Calendly embed */}
          {step !== "no-calendly" && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 14 }}>
                Step 1 — Pick a date and time
              </p>
              <div
                className="calendly-inline-widget"
                data-url={embedUrl}
                style={{ minWidth: 280, height: 660, border: "1px solid rgba(0,0,0,.08)" }}
              />
            </div>
          )}

          {/* Fallback: Calendly not yet configured */}
          {step === "no-calendly" && (
            <div className="card" style={{ borderLeft: "3px solid var(--go)", maxWidth: 580, marginBottom: 36 }}>
              <p style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--fo)", marginBottom: 6 }}>Online booking coming shortly</p>
              <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 16 }}>
                To book your appointment right now, email us at{" "}
                <a href="mailto:hello@veridianclinic.com" style={{ color: "var(--fo)", fontWeight: 500 }}>hello@veridianclinic.com</a>{" "}
                or call and we'll confirm your slot directly.
              </p>
              <p style={{ fontSize: ".8rem", color: "var(--sl3)", lineHeight: 1.75 }}>
                Available: alternate Wednesdays &amp; Fridays
              </p>
            </div>
          )}

          {/* STEP 2: Pay to confirm */}
          {(step === "pay" || step === "submitting") && invitee && (
            <div id="pay-section" style={{ marginBottom: 48 }}>
              <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 14 }}>
                Step 2 — Confirm payment
              </p>
              <div className="card" style={{ borderLeft: "3px solid var(--go)", maxWidth: 580 }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 10 }}>
                  Slot reserved
                </p>
                {slotLabel && (
                  <p className="cg" style={{ fontSize: "1.4rem", fontWeight: 500, color: "var(--sl)", marginBottom: 5, lineHeight: 1.25 }}>
                    {slotLabel}
                  </p>
                )}
                <p style={{ fontSize: ".9rem", color: "var(--sl2)", marginBottom: 4 }}>
                  {details.title} · {details.price}
                </p>
                <p style={{ fontSize: ".8rem", color: "var(--sl3)", marginBottom: 20 }}>
                  {invitee.name} · {invitee.email}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", color: "var(--sl3)", lineHeight: 1.7, marginBottom: 22 }}>
                  <Shield />
                  <span>Secure payment via Stripe. Confirmation sent immediately after payment.</span>
                </div>
                {errorMsg && (
                  <p style={{ color: "var(--red)", fontSize: ".82rem", marginBottom: 14 }}>{errorMsg}</p>
                )}
                <button
                  className="btn btn-go"
                  onClick={onPay}
                  disabled={step === "submitting"}
                  style={{ opacity: step === "submitting" ? 0.65 : 1, cursor: step === "submitting" ? "wait" : "pointer" }}
                >
                  {step === "submitting" ? "Redirecting to payment…" : `Pay ${details.price} to Confirm →`}
                </button>
              </div>
            </div>
          )}

          {/* Trust footer */}
          <p style={{ fontSize: ".74rem", color: "var(--sl3)", lineHeight: 1.85, maxWidth: 560, borderTop: "1px solid rgba(0,0,0,.07)", paddingTop: 20 }}>
            Registered clinical activities via ThanksDoc (thanksdoc.co.uk). All consultations are virtual, available UK-wide. Refund policy available on request.
          </p>

        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <Suspense fallback={
        <main style={{ paddingTop: "var(--nav-h)" }}>
          <section className="sec bg-iv"><div className="wrap"><p>Loading…</p></div></section>
        </main>
      }>
        <BookingInner />
      </Suspense>
      <Footer />
    </>
  );
}
