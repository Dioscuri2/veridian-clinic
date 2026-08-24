import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";
import { bookUrl } from "@/data/panels";

export const metadata: Metadata = {
  title: { absolute: "Private Optimiser Baseline Blood Test UK: Performance & Longevity Panel | Veridian Clinic" },
  description:
    "A comprehensive performance and longevity blood panel for health optimisers. IGF-1, ApoB, Lp(a), sdLDL, Adiponectin, testosterone, morning cortisol, fasting insulin, full organ safety. GP-reviewed written report and a GP-led 30-minute consultation included. £549.",
  alternates: { canonical: "https://veridianclinic.com/blood-tests/optimiser-baseline" },
  openGraph: {
    title: "Private Optimiser Baseline Blood Test UK: Performance & Longevity Panel | Veridian Clinic",
    description: "The health optimiser's baseline panel. IGF-1, ApoB, Lp(a), testosterone, morning cortisol, Adiponectin and full organ safety. GP-reviewed written report and a GP-led 30-minute consultation included. £549.",
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
    "ApoB blood test private UK",
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
  description: "A private health optimiser baseline panel including IGF-1, ApoB, Lp(a), sdLDL, Adiponectin, testosterone, morning cortisol, fasting insulin, Cystatin C and full organ safety markers. Includes a GP-reviewed written report with a prioritised optimisation plan and a GP-led 30-minute consultation to go through the results.",
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
      eyebrow="Optimiser baseline panel · £549"
      title="You track everything. This tells you what's actually happening."
      intro="Most people who optimise their health are doing it without a documented clinical baseline. They're training, tracking sleep, wearing a CGM, taking supplements. But they don't know their IGF-1. They don't know their ApoB. They don't know whether their insulin is quietly undermining every protocol they run. This panel changes that."
      ctas={[
        { label: "Book The Optimiser's Baseline £549", href: bookUrl("optimiser-baseline"), variant: "primary" },
        { label: "See all panels and pricing", href: "/assessments" },
      ]}
    >
      <h2 className="cg" style={sectionHeading}>Why a baseline matters more than a single test</h2>
      <p style={paragraph}>
        A single result tells you where you are today. A documented baseline tells you where you are trending. Inflammation rising from 0.4 to 1.8 mg/L over three years means something very different from a single reading of 1.8 with no prior context. The same applies to IGF-1, ApoB, fasting insulin, testosterone, and every other marker in this panel.
      </p>
      <p style={paragraph}>
        The Optimiser's Baseline is built to create that reference point. It covers longevity, metabolic function, body composition hormones, cardiovascular risk, adrenal health, and organ safety in a single blood draw, with a GP-reviewed written interpretation and a GP-led 30-minute consultation to go through what it means. Both are included in the £549.
      </p>

      <h2 className="cg" style={sectionHeading}>What the panel measures and why</h2>
      <div style={{ display: "grid", gap: 12, margin: "20px 0" }}>
        {[
          {
            category: "Longevity and growth axis",
            markers: "IGF-1 (Insulin-like Growth Factor 1)",
            detail: "One of the most sensitive biomarkers of biological ageing. Low IGF-1 is associated with reduced muscle mass, cognitive decline and accelerated ageing. Elevated IGF-1 is associated with increased cancer risk. Optimal IGF-1, not just normal, is a core longevity target. Almost never tested in standard NHS or private GP care.",
          },
          {
            category: "Cardiovascular risk: the real picture",
            markers: "ApoB, Lp(a), small dense LDL, ApoA-I, full lipid profile",
            detail: "Total cholesterol tells you almost nothing. ApoB is the most predictive cardiovascular risk marker because it counts every atherogenic particle directly. Lp(a) is genetically determined, does not respond to statins, and one in five people carry elevated levels without knowing it. Small dense LDL is the dangerous LDL sub-fraction not captured by standard lipid tests. These four markers together give you the cardiovascular risk picture that matters.",
          },
          {
            category: "Body composition hormones",
            markers: "Adiponectin",
            detail: "Adiponectin is produced by fat cells and protects against insulin resistance and cardiovascular disease. Low adiponectin is one of the earliest signals that body composition is working against metabolic health, and it commonly falls before fasting insulin or HbA1c move out of range. It helps explain why body composition is not responding to training and diet the way it should.",
          },
          {
            category: "Metabolic function",
            markers: "Fasting insulin, HbA1c",
            detail: "Fasting insulin detects insulin resistance a decade before blood glucose becomes abnormal. It is the metabolic foundation of performance, body composition and recovery. A high fasting insulin explains why fat loss stalls, why inflammation stays elevated, and why training recovery feels harder than it should. Rarely included in standard health screens.",
          },
          {
            category: "Adrenal and recovery capacity",
            markers: "Morning cortisol (single serum sample), DHEA-S",
            detail: "Cortisol is highest in the morning, so this is drawn as a single morning serum sample and read against the morning reference range. A morning cortisol sitting outside that range is a signal of HPA axis disturbance, the physiological picture behind chronic stress, overtraining and burnout. DHEA-S is the counter-regulatory adrenal hormone that declines predictably with age and under sustained cortisol load, and the cortisol to DHEA-S ratio gives useful context on recovery capacity. This is one timed blood sample, not a series of samples across the day.",
          },
          {
            category: "Hormonal axis",
            markers: "Total testosterone, Free testosterone (calculated), SHBG, LH",
            detail: "Total testosterone can appear normal while free testosterone is functionally low. SHBG, which binds testosterone, is the variable that determines biological availability. LH establishes whether the issue originates at pituitary or gonadal level. Relevant for both men and women experiencing low energy, poor recovery, reduced drive or body composition resistance.",
          },
          {
            category: "Precision organ markers",
            markers: "Cystatin C, Magnesium, Uric Acid",
            detail: "Cystatin C is a more sensitive marker of early kidney dysfunction than creatinine, detecting decline before eGFR changes. Magnesium deficiency impairs sleep quality, glucose regulation, muscle recovery and over 300 enzyme systems. Uric acid is a sensitive metabolic marker elevated in insulin resistance, gout risk and mitochondrial dysfunction.",
          },
          {
            category: "Organ safety baseline",
            markers: "Full blood count, liver function (ALT, AST, GGT), kidney function with eGFR",
            detail: "GGT is a particularly sensitive early marker of liver stress, metabolic dysfunction and supplement burden, rising years before ALT. eGFR tracks kidney filtration rate, essential for anyone on supplements, NSAIDs, creatine loading or considering prescription interventions. A clean organ safety baseline before starting any protocol is not optional.",
          },
          {
            category: "Inflammation",
            markers: "CRP",
            detail: "CRP measures systemic low-grade inflammation, the underlying driver of cardiovascular disease, metabolic dysfunction, accelerated ageing and cognitive decline. A critical longevity marker. In an optimiser, a chronically elevated CRP is often the first signal that recovery is not matching training load.",
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
        The Optimiser's Baseline is the right starting point for people who are already managing their health proactively and want a comprehensive documented picture to guide the next phase.
      </p>
      <ul style={{ paddingLeft: 20, color: "var(--sl2)", lineHeight: 2.1, fontSize: ".95rem" }}>
        <li>Men and women aged 30 and over taking a structured approach to health, training and longevity</li>
        <li>Anyone who has been told everything is normal but suspects they are not performing optimally</li>
        <li>People using wearables, CGMs or tracking HRV who want to correlate device data with blood biomarkers</li>
        <li>Anyone considering hormone optimisation, peptide protocols or longevity interventions who needs a full safety baseline first</li>
        <li>People whose recovery is declining, body composition is not responding to training, or who want to understand the physiological reason why</li>
        <li>Health professionals and coaches who want their own documented baseline</li>
      </ul>

      <h2 className="cg" style={sectionHeading}>What you get back</h2>
      <p style={paragraph}>
        Dr Tosin reviews every result against both population norms and optimal longevity ranges, which are not the same thing. The written report covers: where each marker sits on the optimal-to-risk spectrum, the pattern across your metabolic, hormonal, cardiovascular and body-composition results, a prioritised list of what to address first, and specific next steps including whether any follow-up testing or clinical intervention is indicated.
      </p>
      <p style={paragraph}>
        A GP-led 30-minute consultation is included in the price. It is booked once your results are back, and it is a working session rather than a summary read aloud: Dr Tosin takes you through the report, explains what the pattern across your markers means for your training, recovery and long-term risk, answers your questions, and agrees with you which two or three things are worth acting on first. You are not buying the consultation separately and you are not being sold it afterwards. It is part of the £549, along with the panel and the written report.
      </p>
      <div style={callout}>
        <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>The Optimiser's Baseline · £549</p>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>
          IGF-1 · ApoB · Lp(a) · sdLDL · ApoA-I · Full lipid profile · Adiponectin · Fasting insulin · HbA1c · Morning cortisol (single serum sample) · DHEA-S · Total testosterone · Free testosterone (calculated) · SHBG · LH · Cystatin C · Magnesium · Uric Acid · Full blood count · Liver function (ALT/AST/GGT) · Kidney function + eGFR · CRP<br />
          GP-reviewed written baseline report · GP-led 30-minute consultation included · Prioritised optimisation plan · No GP referral needed · Results in 5 working days
        </p>
      </div>

      {/* Related tests */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 24, marginTop: 8 }}>
        <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Related Tests</p>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            { href: "/blood-tests/cardiovascular-risk", label: "Advanced Cardiovascular Risk Panel", note: "£349" },
            { href: "/blood-tests/mens-testosterone", label: "Men's Testosterone & Hormone Panel", note: "£325" },
            { href: "/blood-tests/biological-age", label: "Biological Age Blood Test", note: "From £795" },
            { href: "/blood-tests/fasting-insulin", label: "Fasting Insulin Test", note: "From £249" },
            { href: "/assessments", label: "View All Panels & Pricing", note: "Assessments" },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--iv)", border: "1px solid rgba(0,0,0,.07)", textDecoration: "none" }}>
              <span style={{ fontSize: ".88rem", color: "var(--sl)", fontWeight: 500 }}>{t.label}</span>
              <span style={{ fontSize: ".78rem", color: "var(--sl3)" }}>{t.note} →</span>
            </Link>
          ))}
        </div>
      </div>
    </ClinicalArticleLayout>
    </>
  );
}
