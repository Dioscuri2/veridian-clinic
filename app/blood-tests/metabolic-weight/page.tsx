import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Metabolic Weight Resistance Blood Test UK | Veridian Clinic",
  description:
    "Eating well and exercising but weight won't shift? Fasting insulin, HOMA-IR, leptin, adiponectin, uric acid and thyroid — the metabolic panel that explains weight resistance. £199.",
  alternates: { canonical: "https://veridianclinic.com/blood-tests/metabolic-weight" },
  openGraph: {
    title: "Private Metabolic Weight Resistance Blood Test UK | Veridian Clinic",
    description: "Why won't the weight budge? Insulin resistance, leptin, thyroid and metabolic markers tested privately. GP-reviewed written report. £199.",
    url: "https://veridianclinic.com/blood-tests/metabolic-weight",
    type: "article",
  },
  keywords: [
    "metabolic weight resistance blood test UK",
    "insulin resistance blood test UK private",
    "why won't weight shift blood test UK",
    "leptin blood test UK",
    "HOMA-IR test UK private",
    "fasting insulin weight loss test UK",
    "thyroid weight gain blood test UK",
    "metabolic syndrome blood test UK",
    "private weight blood test UK",
    "adiponectin test UK",
    "uric acid weight resistance test",
    "weight loss resistance testing private",
    "why can't I lose weight blood test UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Private Metabolic Weight Resistance Blood Test UK",
  description: "A private metabolic weight panel including fasting insulin, HOMA-IR, leptin, adiponectin, uric acid, Lp(a) and thyroid — the markers that explain why weight won't shift despite diet and exercise.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: { "@type": "Organization", name: "Veridian Clinic", url: "https://veridianclinic.com" },
  url: "https://veridianclinic.com/blood-tests/metabolic-weight",
};

export default function MetabolicWeightPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
      eyebrow="Metabolic weight panel · £199"
      title="Why won't the weight budge?"
      intro="You are eating well, exercising regularly, and doing everything right. The weight still isn't moving. This is not a willpower problem. It is a metabolic problem — and the answer is almost always visible in the right blood tests."
      ctas={[
        { label: "Book Why Won't The Weight Budge? Panel — £199", href: "/book?tier=metabolic-weight", variant: "primary" },
        { label: "Book a GP Discovery Call first", href: "/book?tier=discovery" },
      ]}
    >
      <h2 className="cg" style={sectionHeading}>The four most common metabolic blocks to weight loss</h2>
      <p style={paragraph}>
        When a patient comes to clinic frustrated by weight that won't shift despite genuine effort, the answer is almost always one of four things — and none of them are detected by a standard GP blood test.
      </p>

      <div style={{ display: "grid", gap: 14, margin: "20px 0" }}>
        {[
          {
            title: "1. Insulin resistance — the most common and most overlooked",
            body: "Elevated fasting insulin is the earliest measurable sign of metabolic dysfunction — appearing years, sometimes decades, before fasting glucose rises into the diabetic range. When insulin is chronically elevated, fat cells are locked in storage mode. The body becomes unable to access stored fat as fuel. Calorie restriction makes this worse, not better, because it further stresses the system without addressing the underlying hormonal block. A standard fasting glucose or HbA1c will not catch this. Fasting insulin will.",
          },
          {
            title: "2. Thyroid dysfunction — often missed at the wrong threshold",
            body: "TSH within the lab normal range does not mean your thyroid is functioning optimally. Many patients with TSH in the upper-normal range (2.5–4.5 mU/L) experience genuine thyroid-related weight gain, fatigue and cold intolerance. The panel also includes liver markers that reflect the downstream metabolic impact of thyroid function.",
          },
          {
            title: "3. Leptin resistance — the satiety signal that stops working",
            body: "Leptin is the hormone that tells the brain fat stores are sufficient and suppresses appetite. In leptin resistance — common in people with obesity or long-term calorie restriction — leptin is present but the brain stops responding to it. You feel constantly hungry despite having adequate energy stores. Leptin and its counterpart adiponectin are almost never tested in standard care.",
          },
          {
            title: "4. Elevated uric acid — a metabolic distress signal",
            body: "High uric acid is strongly associated with insulin resistance, fructose metabolism dysfunction, and impaired fat oxidation. It is a sensitive early marker of metabolic stress that correlates with weight gain independent of caloric intake. Often completely absent from routine testing.",
          },
        ].map(item => (
          <div key={item.title} style={callout}>
            <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 8, lineHeight: 1.4 }}>{item.title}</p>
            <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <h2 className="cg" style={sectionHeading}>What the panel measures</h2>
      <ul style={{ paddingLeft: 20, color: "var(--sl2)", lineHeight: 2.1, fontSize: ".95rem" }}>
        <li><strong>Fasting insulin</strong> — the primary marker of insulin resistance, measured before glucose becomes abnormal</li>
        <li><strong>HbA1c</strong> — 3-month average blood glucose; context for the insulin result</li>
        <li><strong>HOMA-IR</strong> — calculated insulin resistance score combining fasting insulin and fasting glucose</li>
        <li><strong>Uric acid</strong> — metabolic stress and fructose metabolism marker</li>
        <li><strong>Lp(a)</strong> — cardiovascular risk marker that rises with metabolic dysfunction</li>
        <li><strong>Leptin</strong> — satiety hormone; elevated in leptin resistance</li>
        <li><strong>Adiponectin</strong> — anti-inflammatory fat hormone; low in metabolic syndrome</li>
        <li><strong>TSH</strong> — thyroid function screen</li>
        <li><strong>Liver markers (ALT, AST)</strong> — metabolic liver health, closely linked to insulin resistance</li>
        <li><strong>Fasting lipid profile</strong> — triglycerides and HDL pattern characteristic of metabolic syndrome</li>
      </ul>

      <h2 className="cg" style={sectionHeading}>The pattern that explains most cases</h2>
      <p style={paragraph}>
        In clinical practice, the most common finding in patients with unexplained weight resistance is a cluster: elevated fasting insulin, high-normal or elevated triglycerides, low HDL, and elevated uric acid — with TSH in the upper-normal range. Individually, none of these values trigger a flag on a standard report. Together, they form a clear metabolic picture with a targeted treatment pathway.
      </p>
      <p style={paragraph}>
        Dr Tosin's written report does not just list your numbers. It maps the pattern, explains the mechanism, and gives you a prioritised plan: what to change first, what to monitor, and whether a structured programme is likely to be necessary.
      </p>

      <h2 className="cg" style={sectionHeading}>What you get back</h2>
      <div style={callout}>
        <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>Why Won't The Weight Budge? Panel — £199</p>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>
          Fasting insulin · HbA1c · HOMA-IR · Uric acid · Lp(a) · Leptin · Adiponectin · TSH · ALT · AST · Full fasting lipid profile<br />
          GP-reviewed metabolic interpretation · Prioritised action plan · No GP referral needed · Results in 5 working days
        </p>
      </div>
    </ClinicalArticleLayout>
    </>
  );
}
