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
  sleep: "Sleep quality — poor sleep directly disrupts glucose regulation, appetite signalling, and metabolic recovery.",
  activity: "Movement — low activity is one of the most direct and modifiable drivers of metabolic decline.",
  diet: "Diet quality — directly affects insulin load, systemic inflammation, and long-term metabolic function.",
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

                {/* CTA block */}
                <div style={{ padding: "24px 28px", background: "var(--fo)" }}>
                  <p
                    style={{
                      fontSize: ".68rem",
                      color: "var(--go2)",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Your full scorecard is ready
                  </p>
                  <p
                    style={{
                      fontSize: ".93rem",
                      color: "rgba(246,241,232,.78)",
                      lineHeight: 1.85,
                      marginBottom: 20,
                    }}
                  >
                    Get your personalised breakdown, key drivers, and next-step guidance emailed to you.
                  </p>
                  <Link href={scorecardUrl} className="btn btn-go btn-full">
                    Get My Full Scorecard →
                  </Link>
                </div>

                <p style={{ fontSize: ".78rem", color: "var(--sl3)", lineHeight: 1.7 }}>
                  The detailed breakdown is emailed to you. This unlocks your personalised interpretation.
                </p>
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
