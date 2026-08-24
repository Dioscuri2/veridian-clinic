import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";
import { bookUrl } from "@/data/panels";

export const metadata: Metadata = {
  title: { absolute: "About Dr Tosin Taiwo | GP, Veridian Clinic" },
  description: "Dr Tosin Taiwo is a UK-qualified GP and founder of Veridian Clinic. Specialising in preventive medicine, metabolic health, and longevity medicine. Services run through ThanksDoc's CQC-registered framework.",
  alternates: { canonical: "https://veridianclinic.com/about" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr Tosin Taiwo",
  jobTitle: "General Practitioner",
  description: "UK-qualified GP specialising in preventive medicine, metabolic health, and longevity medicine.",
  worksFor: {
    "@type": "MedicalOrganization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
  },
  medicalSpecialty: ["General Practice", "Preventive Medicine", "Metabolic Medicine"],
  url: "https://veridianclinic.com/about",
};

export default function AboutPage() {
  const section: React.CSSProperties = { marginBottom: 48 };
  const para: React.CSSProperties = { fontSize: "1rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 18 };
  const h2: React.CSSProperties = { fontSize: "clamp(1.3rem,2.5vw,1.7rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 16, marginTop: 40 };

  return (
    <>
      <style>{FONTS + CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Header */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start" }}>
              <div>
                <p className="lbl a1">About</p>
                <div className="rule a1" />
                <h1
                  className="cg a2"
                  style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 16 }}
                >
                  Dr Tosin Taiwo
                </h1>
                <p
                  className="a3"
                  style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: "var(--go)", fontWeight: 500, fontFamily: "var(--ff-sans)", letterSpacing: ".04em", marginBottom: 12 }}
                >
                  GP, Founder, Veridian Clinic
                </p>
                <p
                  className="a3"
                  style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.85, maxWidth: 560 }}
                >
                  UK-qualified GP with a special interest in preventive medicine, metabolic health, and longevity. Founder of Veridian Clinic, a private practice focused on finding what standard testing misses. Services run through ThanksDoc's CQC-registered framework.
                </p>
              </div>

              {/* Photo placeholder */}
              <div
                className="a2"
                style={{
                  width: 180,
                  height: 220,
                  background: "var(--iv2)",
                  border: "1.5px solid rgba(200,168,75,.25)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="15" r="8" stroke="var(--sl3)" strokeWidth="1.5" fill="none" />
                  <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="var(--sl3)" strokeWidth="1.5" fill="none" />
                </svg>
                <p style={{ fontSize: ".7rem", color: "var(--sl3)", textAlign: "center", lineHeight: 1.5, padding: "0 12px" }}>
                  Photo<br />coming soon
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials bar */}
        <section style={{ background: "var(--fo)", padding: "20px 24px" }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
              {[
                "GMC Registered",
                "CQC-registered framework",
                "UK-Qualified GP",
                "Preventive Medicine",
                "Metabolic Health Focus",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, background: "var(--go)", borderRadius: "50%", flexShrink: 0 }} />
                  <span style={{ fontSize: ".75rem", color: "rgba(246,241,232,.75)", fontFamily: "var(--ff-sans)", letterSpacing: ".06em" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bio content */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720 }}>

            <div style={section}>
              <h2 className="cg" style={h2}>Why Veridian Clinic</h2>
              <p style={para}>
                Veridian Clinic was founded on a single observation: the gap between what standard NHS testing measures and what genuine health optimisation requires is large, and for many patients, it is the gap where years of decline quietly happen.
              </p>
              <p style={para}>
                A normal fasting glucose does not mean insulin resistance is absent. It can be developing silently for a decade before glucose rises. A normal cholesterol does not tell you your ApoB, your Lp(a), or your homocysteine. Those are three independent atherogenic pathways that standard screening misses entirely. A normal TSH does not tell you your free T3, the active thyroid hormone that matters most for energy and cognitive function.
              </p>
              <p style={para}>
                Most patients who come to Veridian have had their GP tests come back normal. They have been told everything is fine. They do not feel fine. The Veridian approach is to test what has not been tested, interpret the full pattern, and build a specific plan from what the data shows.
              </p>
            </div>

            <div style={section}>
              <h2 className="cg" style={h2}>Clinical approach</h2>
              <p style={para}>
                My practice is evidence-based preventive medicine. That means using the same clinical literature and evidence standards as mainstream medicine, but applying them to the question that mainstream medicine rarely asks: what is happening upstream, before disease?
              </p>
              <p style={para}>
                I do not use speculative diagnoses, unvalidated tests, or treatment approaches that lack a coherent evidence base. Everything I recommend has a clear clinical rationale and a testable outcome. If an intervention is working, the markers should move. If they are not moving, the plan changes.
              </p>
              <p style={para}>
                The Metabolic Turnaround programme reflects this approach: measure first, interpret the full pattern, build a personalised plan, and track whether the plan is actually working with fortnightly check-ins over 90 days.
              </p>
            </div>

            <div style={section}>
              <h2 className="cg" style={h2}>Areas of focus</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { area: "Metabolic Health", detail: "Insulin resistance, metabolic syndrome, fasting insulin, HOMA-IR, glucose dysregulation" },
                  { area: "Cardiovascular Risk", detail: "ApoB, Lp(a), homocysteine, omega-3 index, small dense LDL, coronary risk stratification" },
                  { area: "Longevity Medicine", detail: "Biological age assessment, telomere length, mitochondrial function markers, NAD metabolism" },
                  { area: "Thyroid and Hormones", detail: "Full thyroid including free T3, sex hormones, DHEA, cortisol, adrenal function" },
                  { area: "Nutritional Biochemistry", detail: "Vitamin D, B12, folate, iron studies, magnesium, zinc, omega-3 status" },
                  { area: "Weight and Body Composition", detail: "Metabolic drivers of weight resistance, GLP-1 eligibility assessment" },
                ].map(({ area, detail }) => (
                  <div
                    key={area}
                    style={{
                      padding: "20px",
                      background: "var(--iv)",
                      borderLeft: "3px solid rgba(200,168,75,.4)",
                    }}
                  >
                    <p style={{ fontSize: ".88rem", fontWeight: 600, color: "var(--sl)", marginBottom: 6 }}>{area}</p>
                    <p style={{ fontSize: ".78rem", color: "var(--sl3)", lineHeight: 1.7 }}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={section}>
              <h2 className="cg" style={h2}>Regulation and credentials</h2>
              <p style={para}>
                Services run through ThanksDoc's CQC-registered framework. Dr Taiwo is registered with the General Medical Council (GMC) and practises in accordance with UK medical regulation and GMC Good Medical Practice standards.
              </p>
              <p style={para}>
                All clinical interpretations are provided by a qualified GP. Veridian does not operate as a wellness platform or supplement company. We are a regulated medical service.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Work with Dr Tosin</p>
            <div className="rule rule-c" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
              Start with a 30-minute Discovery Core consultation.
            </h2>
            <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
              A clinical conversation to understand your situation, answer your questions, and confirm whether the programme is the right fit for you.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={bookUrl("discovery")} className="btn btn-fo">Book Discovery Core, £127</Link>
              <Link href="/metabolic-quiz" className="btn btn-ol">Check Your Metabolic Age Free</Link>
            </div>
          </div>
        </section>

        {/* Articles by Dr Tosin */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">Written by Dr Tosin</p>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 32 }}>
              Clinical articles on metabolic health and longevity
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {[
                { slug: "vigorous-exercise", title: "Four minutes a day: the most powerful longevity intervention", tag: "Longevity" },
                { slug: "fast-insulin", title: "Fasting insulin: the missing early signal in metabolic disease", tag: "Metabolic Health" },
                { slug: "homocysteine", title: "Homocysteine: the cardiovascular risk marker most GPs do not check", tag: "Cardiovascular Risk" },
                { slug: "vitamin-d", title: "Vitamin D is not really a vitamin, and that changes everything", tag: "Longevity" },
                { slug: "omega-3", title: "The blood marker that predicts heart risk better than cholesterol", tag: "Cardiovascular Risk" },
                { slug: "reversing-metabolic-syndrome", title: "Reversing metabolic syndrome: what the evidence actually supports", tag: "Metabolic Health" },
              ].map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ padding: "20px", border: "1px solid rgba(0,0,0,.07)", cursor: "pointer" }}>
                    <span style={{
                      fontSize: ".6rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
                      color: "var(--go)", display: "block", marginBottom: 10,
                    }}>
                      {article.tag}
                    </span>
                    <p style={{ fontSize: ".92rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.4, margin: 0 }}>
                      {article.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28, textAlign: "center" }}>
              <Link href="/blog" className="btn btn-ol">View All Articles</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
