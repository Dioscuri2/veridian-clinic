import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Optimiser Baseline Blood Test UK Performance Health Panel | Veridian Clinic",
  description:
    "A comprehensive performance and longevity blood panel for health optimisers. IGF-1, testosterone, cortisol, fasting insulin, Lp(a), full organ function — GP-reviewed written report. £395.",
  alternates: { canonical: "https://veridianclinic.com/blood-tests/optimiser-baseline" },
  openGraph: {
    title: "Private Optimiser Baseline Blood Test UK Performance Health Panel | Veridian Clinic",
    description: "The health optimiser's baseline panel. IGF-1, testosterone, cortisol, fasting insulin, Lp(a) and full organ function — GP-reviewed written report. £395.",
    url: "https://veridianclinic.com/blood-tests/optimiser-baseline",
    type: "article",
  },
  keywords: [
    "private health optimiser blood test UK",
    "performance blood test UK private",
    "IGF-1 blood test UK",
    "longevity blood test UK private",
    "biohacker blood test UK",
    "health optimisation blood panel UK",
    "testosterone blood test UK private",
    "cortisol blood test UK private",
    "comprehensive private blood test UK",
    "preventive health blood test UK",
    "optimiser baseline blood test UK",
    "anti-ageing blood test UK private",
    "full body blood test private UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Private Optimiser Baseline Blood Test UK: Performance and Longevity Panel",
  description: "A private health optimiser baseline panel including IGF-1, testosterone, cortisol, fasting insulin, Lp(a), full organ function and inflammatory markers. GP-reviewed written report with prioritised optimisation plan.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: { "@type": "Organization", name: "Veridian Clinic", url: "https://veridianclinic.com" },
  url: "https://veridianclinic.com/blood-tests/optimiser-baseline",
};

export default function OptimiserBaselinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
      eyebrow="Optimiser baseline panel · £395"
      title="You're not unwell. You want to know how well you actually are."
      intro="Most private blood tests are designed to detect disease. The Optimiser's Baseline is built for a different kind of patient — one who already manages their health proactively and wants a comprehensive starting point that will mean something in five years' time."
      ctas={[
        { label: "Book The Optimiser's Baseline — £395", href: "/book?tier=optimiser-baseline", variant: "primary" },
        { label: "Book a GP Discovery Call first", href: "/book?tier=discovery" },
      ]}
    >
      <h2 className="cg" style={sectionHeading}>Why a baseline matters more than a single test</h2>
      <p style={paragraph}>
        A single blood result tells you where you are today. A documented baseline tells you where you are trending. The most important value of comprehensive health testing is not the number you get back — it is the reference point it creates. Inflammation that rises from 0.4 to 1.8 mg/L over three years means something very different from a single reading of 1.8 with no context. The same applies to IGF-1, testosterone, fasting insulin, and every other marker in this panel.
      </p>
      <p style={paragraph}>
        The Optimiser's Baseline is designed to create that reference point. It covers the markers most relevant to longevity, metabolic function, hormonal health, cardiovascular risk, and organ safety — in a single blood draw, with a GP-reviewed written interpretation.
      </p>

      <h2 className="cg" style={sectionHeading}>What the panel measures and why</h2>
      <div style={{ display: "grid", gap: 12, margin: "20px 0" }}>
        {[
          {
            category: "Longevity and growth",
            markers: "IGF-1",
            detail: "Insulin-like Growth Factor 1 is one of the most sensitive biomarkers of biological ageing. Low IGF-1 is associated with reduced muscle mass, cognitive decline, and accelerated ageing. Elevated IGF-1 is associated with cancer risk. Optimal — not just normal — IGF-1 is a key longevity target. Almost never tested in standard care.",
          },
          {
            category: "Hormonal axis",
            markers: "Total testosterone, Free testosterone (calculated), SHBG, LH, FSH, DHEA-S",
            detail: "The complete male hormonal picture. SHBG determines how much testosterone is biologically active — total testosterone can be normal while free testosterone is low. DHEA-S reflects adrenal function and declines predictably with age. LH and FSH contextualise whether the problem is pituitary or testicular. Relevant for both men and women.",
          },
          {
            category: "Stress and cortisol",
            markers: "Cortisol (morning sample)",
            detail: "Morning cortisol should peak between 7am and 9am. A blunted or elevated cortisol awakening response indicates HPA axis dysregulation — the physiological signature of chronic stress, burnout, or adrenal fatigue. Affects sleep, body composition, cognitive function, and immune response.",
          },
          {
            category: "Metabolic function",
            markers: "Fasting insulin, HbA1c, fasting lipid profile",
            detail: "The core metabolic triad. Fasting insulin detects insulin resistance a decade before glucose becomes abnormal. Together with the lipid profile — particularly triglycerides and HDL pattern — these paint a complete metabolic picture.",
          },
          {
            category: "Cardiovascular risk",
            markers: "Lp(a), full lipid profile including ApoA-I",
            detail: "Lp(a) is genetically determined and highly atherogenic. One in five people carry elevated levels without knowing it. It does not respond to statins. Knowing your Lp(a) is essential for accurate lifetime cardiovascular risk assessment.",
          },
          {
            category: "Organ safety",
            markers: "Full blood count, liver function (ALT, AST, GGT), kidney function with eGFR",
            detail: "Comprehensive organ health baseline. GGT is a particularly sensitive early marker of liver stress and metabolic dysfunction, often rising years before ALT. eGFR tracks kidney filtration rate — essential for anyone taking supplements, NSAIDs, or considering prescription interventions.",
          },
          {
            category: "Inflammation",
            markers: "hs-CRP",
            detail: "High-sensitivity CRP measures systemic low-grade inflammation — the underlying driver of cardiovascular disease, metabolic dysfunction, accelerated ageing, and cognitive decline. A critical longevity marker.",
          },
        ].map(item => (
          <div key={item.category} style={callout}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--go)", marginBottom: 4 }}>{item.category}</p>
            <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>{item.markers}</p>
            <p style={{ fontSize: ".87rem", color: "var(--sl2)", lineHeight: 1.8 }}>{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="cg" style={sectionHeading}>Who this is for</h2>
      <p style={paragraph}>
        The Optimiser's Baseline is most useful for people who are already managing their health actively — exercising consistently, paying attention to nutrition, tracking sleep — and want a comprehensive clinical picture to guide their next steps. It is also the right starting point for anyone new to private health testing who wants a comprehensive baseline rather than a targeted panel.
      </p>
      <ul style={{ paddingLeft: 20, color: "var(--sl2)", lineHeight: 2.1, fontSize: ".95rem" }}>
        <li>Men and women aged 30 and over taking a proactive approach to health</li>
        <li>Anyone who has been told everything is normal but suspects they are not optimally healthy</li>
        <li>People who use wearables, CGMs, or track HRV and want to correlate that data with blood biomarkers</li>
        <li>Those considering hormone optimisation, peptide protocols, or other longevity interventions who want a full safety baseline first</li>
        <li>People preparing for a significant health or body composition goal</li>
      </ul>

      <h2 className="cg" style={sectionHeading}>What you get back</h2>
      <p style={paragraph}>
        Dr Tosin reviews every result against both population norms and optimal longevity ranges — not the same thing. The written report covers: where each marker sits on the optimal-to-risk spectrum, the pattern across your metabolic, hormonal, and cardiovascular results, a prioritised list of what to address first, and specific next steps.
      </p>
      <div style={callout}>
        <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>The Optimiser's Baseline — £395</p>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>
          IGF-1 · Fasting insulin · HbA1c · Cortisol (AM) · Total testosterone · Free testosterone · SHBG · LH · FSH · DHEA-S · Full blood count · Liver function (ALT/AST/GGT) · Kidney function + eGFR · Lp(a) · Full lipid profile · hs-CRP<br />
          GP-reviewed written baseline report · Prioritised optimisation plan · No GP referral needed · Results in 5 working days
        </p>
      </div>
    </ClinicalArticleLayout>
    </>
  );
}
