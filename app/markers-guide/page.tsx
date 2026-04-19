import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { FONTS, CSS } from "@/components/globalStyles";

const markers = [
  {
    title: "Fasting Insulin",
    note: "Why glucose can stay normal while metabolic dysfunction builds in the background.",
  },
  {
    title: "ApoB",
    note: "The particle marker that often tells you more than LDL alone.",
  },
  {
    title: "Homocysteine",
    note: "The overlooked clue linking vascular risk, methylation, and fatigue.",
  },
  {
    title: "hs-CRP",
    note: "A practical window into chronic low-grade inflammation.",
  },
  {
    title: "ALT / AST",
    note: "Early signals of metabolic liver strain before disease is obvious.",
  },
  {
    title: "Ferritin",
    note: "The iron-storage marker that can also reflect inflammation and liver stress.",
  },
  {
    title: "Vitamin D / B12",
    note: "Foundational optimisation markers for energy, resilience, and recovery.",
  },
];

const outcomes = [
  "Understand which biomarkers routine screening commonly misses",
  "Learn what each marker may reveal about long-term metabolic and cardiovascular risk",
  "Know why \"normal\" does not always mean optimal in preventive medicine",
  "Get a clinical framework for what to test next and why it matters",
];

export const metadata = {
  title: "7 Missing Markers Guide | Veridian Clinic",
  description:
    "Download Veridian Clinic's guide to the 7 missing longevity biomarkers most people are never properly shown.",
};

export default function MarkersGuidePage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>
        <section
          style={{
            padding: "28px var(--pad) 56px",
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,168,75,.12) 0%, transparent 58%), var(--iv)",
          }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, .95fr)",
                gap: 28,
                alignItems: "start",
              }}
              className="g2"
            >
              <div>
                <div className="badge-row" style={{ marginBottom: 18 }}>
                  <span className="badge">Free GP-Led Guide</span>
                  <span className="badge">Built for prevention</span>
                  <span className="badge">FB / IG ready</span>
                </div>
                <p className="lbl" style={{ marginBottom: 10 }}>
                  The GP-Led Guide to Longevity Biomarkers
                </p>
                <div className="rule" style={{ marginBottom: 16 }} />
                <h1
                  className="cg"
                  style={{
                    fontSize: "clamp(2.3rem,8vw,4.8rem)",
                    lineHeight: 1.03,
                    fontWeight: 500,
                    color: "var(--sl)",
                    marginBottom: 16,
                  }}
                >
                  7 Missing Markers
                  <br />
                  that can change the way
                  <br />
                  you read your health.
                </h1>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--sl2)",
                    lineHeight: 1.95,
                    maxWidth: 680,
                    marginBottom: 18,
                  }}
                >
                  Most people are shown glucose, total cholesterol, and a vague reassurance that everything looks fine.
                  This guide explains the biomarkers that often matter earlier — the ones that can reveal hidden
                  metabolic strain, vascular risk, inflammation, liver stress, and foundational optimisation gaps.
                </p>
                <p
                  style={{
                    fontSize: ".92rem",
                    color: "var(--fo2)",
                    lineHeight: 1.85,
                    marginBottom: 26,
                    fontWeight: 500,
                  }}
                >
                  Clear. Clinical. Mobile-first. Designed for high-performing adults who want signal, not noise.
                </p>

                <div
                  style={{
                    background: "var(--wh)",
                    border: "1px solid rgba(0,0,0,.08)",
                    padding: "22px 20px",
                    marginBottom: 18,
                  }}
                >
                  <p className="lbl" style={{ marginBottom: 14 }}>
                    Inside the guide
                  </p>
                  <div style={{ display: "grid", gap: 12 }}>
                    {markers.map((marker, index) => (
                      <div
                        key={marker.title}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "30px minmax(0, 1fr)",
                          gap: 12,
                          alignItems: "start",
                          paddingBottom: 12,
                          borderBottom:
                            index === markers.length - 1 ? "none" : "1px solid rgba(0,0,0,.06)",
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "var(--fo)",
                            color: "var(--go2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: ".72rem",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <p style={{ fontSize: ".94rem", fontWeight: 600, color: "var(--sl)", marginBottom: 4 }}>
                            {marker.title}
                          </p>
                          <p style={{ fontSize: ".82rem", color: "var(--sl3)", lineHeight: 1.75 }}>{marker.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 10,
                    background: "rgba(200,168,75,.08)",
                    borderLeft: "3px solid var(--go)",
                    padding: "16px 18px",
                  }}
                >
                  <p style={{ fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fo)" }}>
                    Why it converts well from social
                  </p>
                  <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                    This is built as a single-focus lead magnet with a strong curiosity gap: not generic wellness advice,
                    but seven clinically meaningful markers most people have never had properly explained.
                  </p>
                </div>
              </div>

              <div>
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(13,40,24,1) 0%, rgba(19,31,46,1) 100%)",
                    border: "1px solid rgba(0,0,0,.08)",
                    padding: "clamp(22px,5vw,34px)",
                    boxShadow: "0 24px 70px rgba(13,40,24,.18)",
                  }}
                >
                  <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>
                    Free instant access
                  </p>
                  <h2
                    className="cg"
                    style={{
                      fontSize: "clamp(1.9rem,5.8vw,3rem)",
                      lineHeight: 1.08,
                      fontWeight: 500,
                      color: "var(--iv)",
                      marginBottom: 12,
                    }}
                  >
                    Get the guide.
                    <br />
                    Then decide your next step.
                  </h2>
                  <p style={{ fontSize: ".92rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 20 }}>
                    Enter your details and we’ll send the Veridian guide to the 7 missing longevity biomarkers,
                    plus relevant follow-up insight from the clinic.
                  </p>

                  <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                    {outcomes.map((item) => (
                      <div key={item} style={{ display: "flex", gap: 10, alignItems: "start" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--go)", marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: ".82rem", color: "rgba(246,241,232,.74)", lineHeight: 1.75 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "rgba(246,241,232,.05)", padding: 16, marginBottom: 18 }}>
                    <LeadCaptureForm
                      source="markers-guide"
                      title="Send me the 7 Missing Markers guide"
                      subtitle="Use the form below for immediate access and future Veridian updates."
                      ctaLabel="Get the Free Guide →"
                      buttonClassName="btn btn-go btn-full"
                      compact
                    />
                  </div>

                  <p style={{ fontSize: ".74rem", color: "rgba(246,241,232,.46)", lineHeight: 1.7 }}>
                    By signing up, you’ll receive the guide plus occasional Veridian Clinic emails on longevity,
                    metabolic health, and related offers. You can unsubscribe at any time.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    background: "var(--wh)",
                    border: "1px solid rgba(0,0,0,.08)",
                    padding: "18px 18px 16px",
                  }}
                >
                  <p className="lbl" style={{ marginBottom: 10 }}>
                    Prefer a clinical pathway?
                  </p>
                  <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 14 }}>
                    If you already know you want a deeper assessment, explore Veridian’s longevity pathways for
                    metabolic and longevity screening.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Link href="/assessments" className="btn btn-fo">
                      View Assessments →
                    </Link>
                    <Link href="/metabolic-age" className="btn btn-ol">
                      Take the Quiz
                    </Link>
                  </div>
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
