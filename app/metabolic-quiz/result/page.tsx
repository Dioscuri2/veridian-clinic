"use client";
import { Suspense } from "react";
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
    note: "There are early signs of metabolic drift. This is often the best intervention window — before more obvious dysfunction becomes established.",
  },
  "high-risk": {
    tone: "High Priority",
    color: "var(--red)",
    bg: "rgba(122,22,22,.08)",
    border: "rgba(122,22,22,.22)",
    note: "Your pattern shows multiple drivers of metabolic stress. That does not make the outcome fixed — but it does mean the next move matters.",
  },
};

const WEAKEST_LABELS: Record<string, string> = {
  waist: "Waist-to-height ratio — a strong proxy for visceral fat, insulin resistance, and cardiovascular risk.",
  energy: "Daily energy levels — persistent fatigue and post-meal crashes are early markers of hyperinsulinaemia, often detectable years before fasting glucose changes.",
  sleep: "Sleep quality — poor sleep directly disrupts glucose regulation, cortisol rhythm, appetite signalling, and metabolic recovery.",
  stress: "Chronic stress load — sustained cortisol elevation drives visceral fat accumulation and insulin resistance independently of diet and exercise habits.",
  activity: "Movement — skeletal muscle is the primary site of glucose disposal. Low activity is one of the most direct and modifiable drivers of metabolic decline.",
  diet: "Diet quality — dietary insulin load, fibre intake, and ultra-processed food frequency are the strongest dietary predictors of metabolic age drift.",
  gut: "Gut health — chronic gut dysbiosis increases intestinal permeability, triggering systemic inflammation that directly impairs insulin sensitivity.",
};

function ResultContent() {
  const params = useSearchParams();
  const mAge = Number(params.get("mAge") || 0);
  const chrono = Number(params.get("chrono") || 0);
  const delta = Number(params.get("delta") || 0);
  const bandKey = (params.get("band") || "drifting") as keyof typeof BANDS;
  const weakest = params.get("weakest") || "sleep";
  const band = BANDS[bandKey] ?? BANDS.drifting;

  const scorecardUrl =
    `/metabolic-quiz/scorecard?mAge=${mAge}&chrono=${chrono}&delta=${delta}&band=${bandKey}&weakest=${weakest}`;

  const deltaLabel = delta > 0 ? `+${delta} years` : delta < 0 ? `${delta} years` : "Matched";
  const interpretation =
    delta > 0
      ? `Your metabolism appears to be running approximately ${delta} year${delta === 1 ? "" : "s"} ahead of your calendar age.`
      : delta < 0
        ? `Your metabolic age is tracking behind your calendar age — a positive sign of metabolic resilience.`
        : "Your metabolic age closely matches your chronological age.";

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

                {/* Primary CTA — band conditional */}
                {bandKey === "strong" ? (
                  <div style={{ padding: "24px 28px", background: "var(--fo)" }}>
                    <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                      Confirm your advantage
                    </p>
                    <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.95)", lineHeight: 1.3, fontWeight: 500, marginBottom: 8 }}>
                      Your quiz result is strong. Your biomarkers may tell a different story.
                    </p>
                    <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 20 }}>
                      Fasting insulin, ApoB, and hsCRP don't show up in lifestyle questions — and they're often the first markers to shift in people who appear perfectly healthy. A targeted blood panel takes 10 minutes and gives you the full picture.
                    </p>
                    <Link href="/assessments#metabolic-panel" className="btn btn-go btn-full">
                      Check Your Metabolic Markers →
                    </Link>
                  </div>
                ) : bandKey === "drifting" ? (
                  <div style={{ padding: "24px 28px", background: "var(--fo)" }}>
                    <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                      Your next step
                    </p>
                    <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.95)", lineHeight: 1.3, fontWeight: 500, marginBottom: 8 }}>
                      Why Your Weight Isn't Shifting
                    </p>
                    <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 20 }}>
                      A Doctor's 21-Day Metabolic Reset Guide — the structured reset protocol matched to your result, with meal plans, fasting strategies, and movement tiers. £19.99 · Instant download.
                    </p>
                    <Link href="/metabolic-reset-guide" className="btn btn-go btn-full">
                      Get the Metabolic Reset Guide →
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
                      A 30-minute GP-led review of your result, your key risk factors, and a personalised pathway — whether that's a targeted blood panel, a structured reset, or a full baseline assessment.
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
                      <span style={{ fontSize: "1.8rem", fontWeight: 600, color: "var(--go)" }}>£97</span>
                      <span style={{ fontSize: ".88rem", color: "rgba(246,241,232,.5)", textDecoration: "line-through" }}>£195</span>
                      <span style={{ fontSize: ".78rem", color: "var(--go2)", fontWeight: 500 }}>Save £98 today</span>
                    </div>
                    <Link href="/book?tier=discovery&ref=quiz-high-risk" className="btn btn-go btn-full">
                      Book My Discovery Call — £97 →
                    </Link>
                  </div>
                )}

                {/* Secondary CTA — free scorecard */}
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
