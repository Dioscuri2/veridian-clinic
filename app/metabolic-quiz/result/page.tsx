"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const BANDS = {
  strong: {
    tone: "On Track",
    color: "var(--grn)",
    bg: "rgba(20,82,38,.08)",
    border: "rgba(20,82,38,.22)",
    note: "Your inputs suggest relatively strong metabolic resilience. The priority is protecting this trajectory and confirming the unseen biomarkers before they drift.",
  },
  drifting: {
    tone: "Needs Attention",
    color: "var(--amr)",
    bg: "rgba(138,85,0,.08)",
    border: "rgba(138,85,0,.22)",
    note: "There are early signs of metabolic drift. This is often the best intervention window before more obvious dysfunction becomes established.",
  },
  "high-risk": {
    tone: "High Priority",
    color: "var(--red)",
    bg: "rgba(122,22,22,.08)",
    border: "rgba(122,22,22,.22)",
    note: "Your pattern shows multiple drivers of metabolic stress. That does not make the outcome fixed but it does mean the next move matters.",
  },
};

const WEAKEST_LABELS: Record<string, string> = {
  waist: "Waist-to-height ratio a strong proxy for visceral fat, insulin resistance, and cardiovascular risk.",
  energy: "Daily energy levels persistent fatigue and post-meal crashes are early markers of hyperinsulinaemia, often detectable years before fasting glucose changes.",
  sleep: "Sleep quality poor sleep directly disrupts glucose regulation, cortisol rhythm, appetite signalling, and metabolic recovery.",
  stress: "Chronic stress load sustained cortisol elevation drives visceral fat accumulation and insulin resistance independently of diet and exercise habits.",
  activity: "Movement skeletal muscle is the primary site of glucose disposal. Low activity is one of the most direct and modifiable drivers of metabolic decline.",
  diet: "Diet quality dietary insulin load, fibre intake, and ultra-processed food frequency are the strongest dietary predictors of metabolic age drift.",
  gut: "Gut health chronic gut dysbiosis increases intestinal permeability, triggering systemic inflammation that directly impairs insulin sensitivity.",
};

function fbq(event: string, data?: Record<string, unknown>) {
  (window as any).fbq?.("track", event, data);
}

function ResultContent() {
  const params = useSearchParams();
  const mAge = Number(params.get("mAge") || 0);
  const chrono = Number(params.get("chrono") || 0);
  const delta = Number(params.get("delta") || 0);
  const bandKey = (params.get("band") || "drifting") as keyof typeof BANDS;
  const weakest = params.get("weakest") || "sleep";
  const band = BANDS[bandKey] ?? BANDS.drifting;

  const fw = params.get("fw") ?? "0";
  const fe = params.get("fe") ?? "0";
  const fs = params.get("fs") ?? "0";
  const fst = params.get("fst") ?? "0";
  const fa = params.get("fa") ?? "0";
  const fd = params.get("fd") ?? "0";
  const fg = params.get("fg") ?? "0";

  const scorecardBase = `mAge=${mAge}&chrono=${chrono}&delta=${delta}&band=${bandKey}&weakest=${weakest}&fw=${fw}&fe=${fe}&fs=${fs}&fst=${fst}&fa=${fa}&fd=${fd}&fg=${fg}`;
  const scorecardUrl = `/metabolic-quiz/scorecard?${scorecardBase}&redirect=discovery-quiz`;

  const deltaLabel = delta > 0 ? `+${delta} years` : delta < 0 ? `${delta} years` : "Matched";
  const interpretation =
    delta > 0
      ? `Your metabolism appears to be running approximately ${delta} year${delta === 1 ? "" : "s"} ahead of your calendar age.`
      : delta < 0
        ? `Your metabolic age is tracking behind your calendar age a positive sign of metabolic resilience.`
        : "Your metabolic age closely matches your chronological age.";

  const [submitted, setSubmitted] = useState(false);
  const [gEmail, setGEmail] = useState("");
  const [gName, setGName] = useState("");
  const [gLoading, setGLoading] = useState(false);
  const [gError, setGError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("vc_quiz_gate") === "1") setSubmitted(true);
  }, []);

  useEffect(() => {
    if (submitted) {
      fbq("ViewContent", { content_name: "Metabolic Age Result", content_category: bandKey });
    }
  }, [submitted, bandKey]);

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gEmail.trim()) { setGError("Please enter your email address."); return; }
    setGLoading(true);
    setGError("");
    try {
      const res = await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: gEmail.trim(), firstName: gName.trim(), mAge, band: bandKey, delta, weakest, fw: Number(fw), fe: Number(fe), fs: Number(fs), fst: Number(fst), fa: Number(fa), fd: Number(fd), fg: Number(fg) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setGError((data as any).error || "Something went wrong. Please try again.");
        setGLoading(false);
        return;
      }
      fbq("Lead", { value: 0, currency: "GBP", content_name: "Metabolic Quiz" });
      fbq("QuizComplete", { content_name: "Metabolic Quiz", content_category: bandKey, score: mAge });
      sessionStorage.setItem("vc_quiz_gate", "1");
      setSubmitted(true);
    } catch {
      setGError("Something went wrong. Please try again.");
      setGLoading(false);
    }
  }

  if (!submitted) {
    return (
      <>
        <style>{FONTS + CSS}</style>
        <Navigation />
        <main style={{ paddingTop: "var(--nav-h)" }}>
          <section
            className="sec bg-iv"
            style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}
          >
            <div className="wrap" style={{ maxWidth: 540 }}>
              <div className="text-center a1" style={{ marginBottom: 36 }}>
                <p className="lbl">Metabolic Age Result</p>
                <div className="rule rule-c" />
                <h1
                  className="cg a2"
                  style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}
                >
                  Your result is ready.
                </h1>
                <p className="a3" style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.9 }}>
                  Enter your email to receive your full scorecard breakdown your metabolic age and a colour-coded report across all seven factors.
                </p>
              </div>
              <form onSubmit={handleGateSubmit} className="a4" style={{ display: "grid", gap: 14 }}>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={gName}
                  onChange={(e) => setGName(e.target.value)}
                  className="form-field"
                  disabled={gLoading}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={gEmail}
                  onChange={(e) => setGEmail(e.target.value)}
                  className="form-field"
                  required
                  disabled={gLoading}
                  autoFocus
                />
                {gError && (
                  <p style={{ fontSize: ".85rem", color: "var(--red)", margin: 0 }}>{gError}</p>
                )}
                <button
                  type="submit"
                  className="btn btn-fo"
                  disabled={gLoading}
                  style={{ width: "100%", padding: "15px 32px" }}
                >
                  {gLoading ? "Loading…" : "See My Metabolic Age →"}
                </button>
                <p style={{ fontSize: ".75rem", color: "var(--sl3)", textAlign: "center", lineHeight: 1.7 }}>
                  No spam. You&apos;ll get your result now plus 2 clinical follow-up emails. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 940 }}>
            <div className="text-center a1" style={{ marginBottom: 48 }}>
              <p className="lbl">Metabolic Age Result</p>
              <div className="rule rule-c" />
            </div>

            <div
              className="a2"
              style={{
                display: "grid",
                gap: 48,
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,380px),1fr))",
                alignItems: "start",
              }}
            >
              {/* Metabolic age display */}
              <div style={{ display: "grid", gap: 20 }}>
                {/* Main age card */}
                <div
                  style={{
                    padding: "36px 32px",
                    background: band.bg,
                    border: `1.5px solid ${band.border}`,
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: ".68rem",
                      color: "var(--sl3)",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    Estimated Metabolic Age
                  </p>
                  <div
                    className="cg"
                    style={{
                      fontSize: "clamp(5rem,14vw,8rem)",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: band.color,
                    }}
                  >
                    {mAge}
                  </div>
                  <p
                    style={{
                      fontSize: ".82rem",
                      color: "var(--sl3)",
                      marginTop: 10,
                      letterSpacing: ".06em",
                    }}
                  >
                    years
                  </p>
                </div>

                {/* Comparison row */}
                {chrono > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      gap: 8,
                      alignItems: "center",
                      textAlign: "center",
                      padding: "18px 20px",
                      background: "var(--iv2)",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: ".62rem",
                          color: "var(--sl3)",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          marginBottom: 6,
                        }}
                      >
                        Your Age
                      </p>
                      <div className="cg" style={{ fontSize: "2.2rem", fontWeight: 400, color: "var(--sl3)" }}>
                        {chrono}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "6px 12px",
                        background: band.bg,
                        color: band.color,
                        fontSize: ".76rem",
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {deltaLabel}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: ".62rem",
                          color: "var(--sl3)",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          marginBottom: 6,
                        }}
                      >
                        Metabolic Age
                      </p>
                      <div className="cg" style={{ fontSize: "2.2rem", fontWeight: 400, color: band.color }}>
                        {mAge}
                      </div>
                    </div>
                  </div>
                )}

                {/* Band badge */}
                <div
                  style={{
                    padding: "10px 20px",
                    background: band.bg,
                    color: band.color,
                    fontSize: ".72rem",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {band.tone}
                </div>
              </div>

              {/* Interpretation + CTA */}
              <div style={{ display: "grid", gap: 22 }}>
                <h1
                  className="cg"
                  style={{
                    fontSize: "clamp(1.9rem,4vw,2.8rem)",
                    fontWeight: 500,
                    color: "var(--sl)",
                    lineHeight: 1.2,
                  }}
                >
                  {interpretation}
                </h1>

                <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95 }}>{band.note}</p>

                {/* Likely driver */}
                <div
                  style={{
                    padding: "16px 18px",
                    background: "var(--iv2)",
                    borderLeft: `3px solid ${band.color}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: ".68rem",
                      color: "var(--sl3)",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Likely contributing factor
                  </p>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                    {WEAKEST_LABELS[weakest] ?? WEAKEST_LABELS.sleep}
                  </p>
                </div>

                {/* Primary CTA band conditional */}
                {bandKey === "strong" ? (
                  <div style={{ padding: "24px 28px", background: "var(--fo)" }}>
                    <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                      Confirm your advantage
                    </p>
                    <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.95)", lineHeight: 1.3, fontWeight: 500, marginBottom: 8 }}>
                      Your quiz result is strong. Your biomarkers may tell a different story.
                    </p>
                    <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 20 }}>
                      Fasting insulin, ApoB, and hsCRP don't show up in lifestyle questions and they're often the first markers to shift in people who appear perfectly healthy. A targeted blood panel takes 10 minutes and gives you the full picture.
                    </p>
                    <Link
                      href="/assessments#metabolic-panel"
                      className="btn btn-go btn-full"
                      onClick={() => fbq("InitiateCheckout", { value: 195, currency: "GBP", content_name: "Metabolic Screen" })}
                    >
                      Check Your Metabolic Markers →
                    </Link>
                  </div>
                ) : bandKey === "drifting" ? (
                  <div style={{ padding: "24px 28px", background: "var(--fo)" }}>
                    <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                      Your next step
                    </p>
                    <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.95)", lineHeight: 1.3, fontWeight: 500, marginBottom: 8 }}>
                      Why Your Weight Isn&apos;t Shifting
                    </p>
                    <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 20 }}>
                      A Doctor&apos;s 21-Day Metabolic Reset Guide the structured reset protocol matched to your result, with meal plans, fasting strategies, and movement tiers. Free · Instant download.
                    </p>
                    <Link
                      href="/metabolic-reset-guide"
                      className="btn btn-go btn-full"
                      onClick={() => fbq("Lead", { content_name: "Metabolic Reset Guide" })}
                    >
                      Get the Free Metabolic Reset Guide →
                    </Link>
                  </div>
                ) : (
                  <div style={{ padding: "24px 28px", background: "var(--fo)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600 }}>
                        GP-Led Discovery Call
                      </p>
                      <span style={{ fontSize: ".72rem", background: "#c8a84b", color: "#2c2a26", fontWeight: 700, padding: "2px 8px", letterSpacing: ".06em" }}>
                        QUIZ RATE
                      </span>
                    </div>
                    <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.95)", lineHeight: 1.3, fontWeight: 500, marginBottom: 8 }}>
                      Your pattern warrants a direct clinical conversation.
                    </p>
                    <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 16 }}>
                      A 30-minute GP-led review of your result, your key risk factors, and a personalised pathway whether that&apos;s a targeted blood panel, a structured reset, or a full baseline assessment.
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: "1.8rem", fontWeight: 600, color: "var(--go)" }}>£97</span>
                      <span style={{ fontSize: ".88rem", color: "rgba(246,241,232,.5)", textDecoration: "line-through" }}>£195</span>
                      <span style={{ fontSize: ".78rem", color: "var(--go2)", fontWeight: 500 }}>Save £98</span>
                    </div>
                    <p style={{ fontSize: ".78rem", color: "rgba(246,241,232,.55)", lineHeight: 1.6, marginBottom: 16 }}>
                      Enter your email for your free scorecard your £97 rate is unlocked immediately after.
                    </p>
                    <Link
                      href={scorecardUrl}
                      className="btn btn-go btn-full"
                      onClick={() => fbq("InitiateCheckout", { value: 97, currency: "GBP", content_name: "Discovery Call" })}
                    >
                      Get My Scorecard &amp; Unlock £97 →
                    </Link>
                  </div>
                )}

                {/* Secondary CTA free scorecard */}
                <div style={{ padding: "16px 20px", background: "var(--iv2)", border: "1px solid rgba(0,0,0,.07)" }}>
                  <p style={{ fontSize: ".72rem", color: "var(--sl3)", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
                    Free option
                  </p>
                  <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 12 }}>
                    Get your free personalised scorecard breakdown emailed to you.
                  </p>
                  <Link href={scorecardUrl} style={{ fontSize: ".86rem", color: "var(--fo)", fontWeight: 600, textDecoration: "underline" }}>
                    Email me my free scorecard →
                  </Link>
                </div>

                {/* VERIDIAN50 discovery call upsell */}
                <div style={{ padding: "20px 22px", border: "1.5px solid var(--go)", background: "rgba(200,168,75,.06)" }}>
                  <p style={{ fontSize: ".66rem", color: "var(--go)", letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
                    Quiz-taker offer
                  </p>
                  <p style={{ fontSize: ".93rem", color: "var(--sl)", fontWeight: 500, lineHeight: 1.4, marginBottom: 6 }}>
                    Book a GP Discovery Call at half price.
                  </p>
                  <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 14 }}>
                    A 30-minute GP-led review of your result enter code <strong style={{ color: "var(--fo)", letterSpacing: ".06em" }}>VERIDIAN50</strong> at checkout to reduce the price from £195 to £97.
                  </p>
                  <Link
                    href="/book?tier=discovery"
                    style={{ fontSize: ".86rem", fontWeight: 600, color: "var(--fo)", textDecoration: "underline" }}
                    onClick={() => fbq("InitiateCheckout", { value: 97, currency: "GBP", content_name: "Discovery Call VERIDIAN50" })}
                  >
                    Book now use VERIDIAN50 at checkout →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}
