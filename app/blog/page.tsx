import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Clinical Insights | Veridian Clinic",
  description: "GP-authored articles on metabolic health, longevity medicine, cardiovascular risk markers, and the science behind early intervention.",
};

const articles = [
  {
    slug: "homocysteine",
    title: "Homocysteine the cardiovascular risk marker most GPs don't check",
    excerpt: "Homocysteine is an independent cardiovascular and cognitive risk marker not included in standard NHS panels. Elevated levels are most commonly caused by low folate or B12 yet they silently drive endothelial damage, inflammation, and vascular risk that conventional screening completely misses.",
    tag: "Cardiovascular Risk",
    readTime: "14 min read",
  },
  {
    slug: "lipoprotein-a-apob-triglycerides",
    title: "The cardiovascular triple threat Lipoprotein(a), ApoB, and triglycerides",
    excerpt: "Three independent atherogenic pathways your standard NHS cholesterol panel does not measure and why having all three elevated compounds your risk in ways that standard screening completely misses.",
    tag: "Cardiovascular Risk",
    readTime: "12 min read",
  },
  {
    slug: "apob-vs-ldl",
    title: "ApoB vs LDL the cardiovascular risk marker question that changes the conversation",
    excerpt: "LDL cholesterol is still the headline number on most lipid panels, but ApoB often gives the cleaner answer to the question that actually matters: how many atherogenic particles are circulating through the arterial system?",
    tag: "Cardiovascular Risk",
    readTime: "8 min read",
  },
  {
    slug: "fast-insulin",
    title: "Fasting insulin the missing early signal in metabolic disease",
    excerpt: "Fasting glucose and HbA1c can look perfectly normal while hyperinsulinaemia silently drives visceral fat accumulation, fatigue, and vascular risk. Here is what fasting insulin actually tells you, what a normal range looks like, and who should be tested.",
    tag: "Metabolic Health",
    readTime: "10 min read",
  },
  {
    slug: "reversing-metabolic-syndrome",
    title: "Reversing metabolic syndrome what the evidence actually supports",
    excerpt: "Metabolic syndrome affects 1 in 4 UK adults and is among the most reversible of all cardiometabolic conditions. The clinical evidence on reversal is more optimistic than most patients are told. Here is what the data shows and where to start.",
    tag: "Metabolic Syndrome",
    readTime: "11 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Header */}
        <section className="sec bg-iv" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl a1">Clinical Insights</p>
            <div className="rule a1" />
            <h1
              className="cg a2"
              style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 16 }}
            >
              Doctor-written insights on energy, metabolism, and how to stay healthier for longer.
            </h1>
            <p
              className="a3"
              style={{ fontSize: "clamp(.92rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 620, marginBottom: 0 }}
            >
              GP-authored articles on the markers, mechanisms, and interventions that matter most for people who want to act early before dysfunction becomes disease.
            </p>
          </div>
        </section>

        {/* Article list */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gap: 2 }}>
              {articles.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    className="a1"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 20,
                      alignItems: "start",
                      padding: "32px 0",
                      borderBottom: i < articles.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <span style={{
                          fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em",
                          textTransform: "uppercase", color: "var(--go)", padding: "3px 8px",
                          border: "1px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.06)"
                        }}>
                          {article.tag}
                        </span>
                        <span style={{ fontSize: ".72rem", color: "var(--sl3)", letterSpacing: ".06em" }}>
                          {article.readTime}
                        </span>
                      </div>
                      <h2
                        className="cg"
                        style={{ fontSize: "clamp(1.1rem,2.5vw,1.45rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 10 }}
                      >
                        {article.title}
                      </h2>
                      <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, maxWidth: 680 }}>
                        {article.excerpt}
                      </p>
                    </div>
                    <span style={{
                      fontSize: "1.2rem", color: "var(--fo)", marginTop: 4,
                      transition: "transform .2s", flexShrink: 0,
                    }}>
                      →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Not sure where you stand?</p>
            <div className="rule rule-c" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
              Check your metabolic age in 60 seconds.
            </h2>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 28, maxWidth: 520, margin: "0 auto 28px" }}>
              A free clinical screening tool that estimates where your metabolism is tracking and points you to the most relevant next step.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/metabolic-quiz" className="btn btn-fo">Check My Metabolic Age Free →</Link>
              <Link href="/assessments" className="btn btn-ol">View All Pathways</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
