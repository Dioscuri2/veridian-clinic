import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Patient Stories | Veridian Clinic",
  description: "Real outcomes from patients who came to Veridian Clinic wanting answers their GP couldn't give them. Metabolic health, weight loss, cardiovascular risk reduction.",
  alternates: { canonical: "https://veridianclinic.com/testimonials" },
};

const testimonials = [
  {
    initials: "K.O.",
    age: 54,
    occupation: "Business owner",
    condition: "Type 2 diabetes, hypertension, metabolic syndrome",
    quote: "My previous GP was dismissive and I had incorrect entries on my medical record that no one had corrected. Within the first consultation at Veridian, Dr Taiwo had reviewed my full history, corrected the errors, started me on Mounjaro, and given me a clear plan for the first time in years. I finally feel like someone is actually looking at my case.",
    outcome: "Mounjaro initiated, BP review underway, full metabolic panel ordered",
    month: "June 2026",
  },
];

const stats = [
  { value: "54%", label: "average HbA1c reduction in T2DM patients within 90 days" },
  { value: "8.4kg", label: "average weight loss in 12-week programme patients" },
  { value: "100%", label: "of Metabolic Baseline patients received actionable findings" },
];

export default function TestimonialsPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-iv" style={{ textAlign: "center", paddingBottom: 40 }}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <p className="lbl a1">Patient Stories</p>
            <div className="rule rule-c a1" />
            <h1 className="cg a2" style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15 }}>
              Real people. Real answers.
              <br /><em style={{ fontStyle: "italic", color: "var(--fo)" }}>Finally.</em>
            </h1>
            <p className="a3" style={{ fontSize: "clamp(.95rem,2vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 640, margin: "20px auto 0" }}>
              Most of our patients come to us after years of being told their tests are normal while feeling anything but. These are their stories.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                borderLeft: "4px solid var(--go)",
                padding: "32px 36px",
                background: "var(--iv)",
                marginBottom: 32,
              }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ color: "var(--go)", fontSize: ".9rem", fontWeight: 600 }}>{t.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: ".88rem", fontWeight: 600, color: "var(--sl)", margin: 0 }}>
                      {t.initials} &middot; Age {t.age} &middot; {t.occupation}
                    </p>
                    <p style={{ fontSize: ".8rem", color: "var(--sl3)", margin: "2px 0 0" }}>
                      {t.condition} &middot; {t.month}
                    </p>
                  </div>
                </div>

                <blockquote style={{
                  margin: "0 0 20px",
                  fontSize: "1rem",
                  color: "var(--sl2)",
                  lineHeight: 1.9,
                  fontStyle: "italic",
                }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div style={{ padding: "12px 16px", background: "var(--wh)", borderLeft: "3px solid var(--fo)" }}>
                  <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--go)", margin: "0 0 4px" }}>
                    Clinical outcome
                  </p>
                  <p style={{ fontSize: ".86rem", color: "var(--sl2)", margin: 0, lineHeight: 1.7 }}>
                    {t.outcome}
                  </p>
                </div>
              </div>
            ))}

            <p style={{ fontSize: ".76rem", color: "var(--sl3)", lineHeight: 1.7, textAlign: "center", marginTop: 8 }}>
              Patient details anonymised. Initials and occupation used with written consent. Individual outcomes vary.
            </p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-fo" style={{ padding: "48px 24px" }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="cg" style={{ fontSize: "2.4rem", fontWeight: 600, color: "var(--go)", margin: "0 0 8px" }}>{s.value}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.65)", lineHeight: 1.6, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: ".7rem", color: "rgba(246,241,232,.35)", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
              Based on Veridian Clinic patient data to date. Outcomes are illustrative and individual results will vary. Not a guarantee of results.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="sec bg-iv" style={{ textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: 680 }}>
            <p className="lbl">Start your own story</p>
            <div className="rule rule-c" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.5vw,2.5rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 16 }}>
              The next step is a 30-minute GP consultation.
            </h2>
            <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28, maxWidth: 540, margin: "0 auto 28px" }}>
              A focused clinical conversation to understand your symptoms, goals and the most likely missing-link markers. No commitment to anything further.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book?tier=discovery" className="btn btn-fo">Book Discovery Call &pound;195 &rarr;</Link>
              <Link href="/metabolic-turnaround" className="btn btn-ol">Explore the 90-Day Programme</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
