import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "ApoB vs LDL | Which Marker Better Reflects Cardiovascular Risk?",
  description:
    "A GP-led explainer on ApoB vs LDL, why particle number matters, and how to think about cardiovascular risk with more precision.",
  alternates: {
    canonical: "https://veridian.clinic/blog/apob-vs-ldl",
  },
  openGraph: {
    title: "ApoB vs LDL | Veridian Clinic",
    description:
      "Why ApoB can be more clinically useful than LDL alone when assessing atherogenic risk.",
    url: "https://veridian.clinic/blog/apob-vs-ldl",
    type: "article",
  },
};

export default function ApoBVsLDLPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">Clinical Insights</p>
            <div className="rule" />
            <h1 className="sh-title">ApoB vs LDL, the marker question that changes risk interpretation</h1>
            <p className="sh-body" style={{ margin: "16px 0 28px", maxWidth: 760 }}>
              LDL cholesterol gets most of the attention. But ApoB often tells you more about the number of atherogenic particles actually circulating through the system.
            </p>
            <article className="card" style={{ display: "grid", gap: 20 }}>
              <p style={{ fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 }}>
                LDL-C is a cholesterol content estimate. ApoB is a particle count proxy. That difference matters because atherosclerosis is driven by the number of atherogenic particles entering the arterial wall, not just the amount of cholesterol packaged inside them.
              </p>
              <p style={{ fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 }}>
                In real patients, LDL and ApoB can diverge. Someone may show an LDL that looks acceptable while ApoB remains elevated, especially in the setting of insulin resistance, high triglycerides, central adiposity, or mixed dyslipidaemia.
              </p>
              <div style={{ padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" }}>
                <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                  <strong style={{ color: "var(--fo)" }}>Clinical bottom line:</strong> if you want a cleaner view of atherogenic burden, ApoB is often the sharper marker.
                </p>
              </div>
              <h2 className="cg" style={{ fontSize: "2rem", fontWeight: 500, color: "var(--sl)" }}>Why this matters in metabolic health</h2>
              <p style={{ fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 }}>
                Metabolic dysfunction often creates a more atherogenic particle pattern long before major disease is diagnosed. That is why Veridian looks at insulin burden, waist metrics, inflammation, and ApoB together rather than relying on one traditional lipid number in isolation.
              </p>
              <ul className="chk">
                <li>ApoB helps quantify particle burden more directly.</li>
                <li>Discordance between LDL and ApoB can hide true risk.</li>
                <li>Risk interpretation improves when paired with insulin and waist-to-height ratio.</li>
              </ul>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/book?tier=baseline" className="btn btn-go">Book a baseline audit →</Link>
                <Link href="/metabolic-scorecard" className="btn btn-ol">Take the scorecard</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
