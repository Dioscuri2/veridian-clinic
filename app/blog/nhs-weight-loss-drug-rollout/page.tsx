import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "250,000 Patients, 3.4 Million Eligible: The Real Maths of the NHS Weight Loss Drug Rollout | Veridian Clinic" },
  description:
    "The NHS weight management rollout reaches GP surgeries in 2026, but covers 250,000 patients over three years out of 3.4 million who could qualify. A GP explains what the numbers mean, who realistically gets treated, and what matters more than the medicine itself.",
  alternates: { canonical: "https://veridianclinic.com/blog/nhs-weight-loss-drug-rollout" },
  openGraph: {
    title: "250,000 Patients, 3.4 Million Eligible: The Real Maths of the NHS Weight Loss Drug Rollout",
    description:
      "NHS England has acknowledged full rollout of weight management medication could take up to 12 years. A GP explains what that means in practice.",
    url: "https://veridianclinic.com/blog/nhs-weight-loss-drug-rollout",
    type: "article",
  },
  keywords: [
    "NHS weight loss drug rollout 2026",
    "NHS weight management medication eligibility",
    "GLP-1 NHS criteria UK",
    "weight loss medication UK access",
    "obesity treatment NHS waiting",
    "metabolic health weight loss",
    "insulin resistance weight loss",
    "private weight management UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "250,000 patients, 3.4 million eligible: the real maths of the NHS weight loss drug rollout",
  description:
    "The NHS weight management rollout covers 250,000 patients over three years out of 3.4 million eligible. A GP explains what the numbers mean in practice.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-08-12",
  dateModified: "2026-08-12",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blog/nhs-weight-loss-drug-rollout" },
};

export default function NhsWeightLossRolloutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ClinicalArticleLayout
        title="250,000 patients, 3.4 million eligible: the real maths of the NHS weight loss drug rollout"
        intro="The NHS weight management rollout began reaching GP surgeries from April 2026, and from February 2026 GPs have been financially incentivised to prescribe obesity medication as part of the 2026/27 contract. The headlines read like access has arrived. The arithmetic underneath tells a more sober story: 250,000 patients over three years, against roughly 3.4 million who could theoretically qualify. NHS England has acknowledged full rollout could take up to 12 years."
        ctas={[
          { href: "/metabolic-quiz", label: "Check your metabolic age free →" },
          { href: "/blood-tests/metabolic-weight", label: "See the Metabolic Weight Resistance panel →", variant: "secondary" },
          { href: "/discovery-call", label: "Book a GP discovery call, £97 →", variant: "tertiary" },
        ]}
      >
        <h2 className="cg" style={sectionHeading}>Do the division</h2>
        <p style={paragraph}>
          250,000 treated over three years is roughly 83,000 a year. Against 3.4 million eligible, that is about 2.4% of the eligible population per year. If you are otherwise well and sitting in the middle of the eligibility criteria rather than at the severe end, the realistic expectation is not months. It is years, and possibly a decade.
        </p>
        <p style={paragraph}>
          This is not a criticism of the rollout. Rationing a genuinely expensive intervention by clinical severity is the correct thing for a public system to do, and the people at the front of that queue should be there. But it does mean the honest answer to &ldquo;when will the NHS treat my weight?&rdquo; is, for most people asking, &ldquo;not soon.&rdquo;
        </p>

        <h2 className="cg" style={sectionHeading}>The question nobody is asking</h2>
        <p style={paragraph}>
          Almost all the public debate is about access to the medicine. Very little of it is about the far more useful question: <em>why</em> is this person&apos;s weight not shifting?
        </p>
        <p style={paragraph}>
          If diet and exercise are genuinely not working, the explanation is usually visible in the blood. Fasting insulin and HOMA-IR reveal insulin resistance that standard glucose and HbA1c testing miss for years. Thyroid function, leptin, adiponectin, uric acid and cortisol pattern each produce a recognisable and different metabolic block. These are testable, and the answers change what treatment is appropriate.
        </p>
        <p style={paragraph}>
          That matters because GLP-1 receptor agonists are not equally suited to everyone who technically qualifies for them, and a person whose weight is driven by an untreated thyroid problem or a cortisol pattern needs that identified rather than overwritten. Starting any weight medication without knowing the underlying metabolic picture means you learn less, and you have no baseline to measure against.
        </p>

        <h2 className="cg" style={sectionHeading}>What we would do first</h2>
        <p style={paragraph}>
          Establish the metabolic baseline before deciding anything. Our{" "}
          <Link href="/blood-tests/metabolic-weight" style={{ color: "var(--fo)", fontWeight: 600 }}>Metabolic Weight Resistance panel</Link>{" "}
          looks specifically at the markers that explain why weight is not moving, and our guide to{" "}
          <Link href="/blog/fast-insulin" style={{ color: "var(--fo)", fontWeight: 600 }}>fasting insulin</Link>{" "}
          explains why it is the single most useful early marker and why the NHS does not routinely test it.
        </p>
        <p style={paragraph}>
          From there, treatment is a clinical decision made by a doctor who has seen the whole picture, taken a full history, and checked contraindications properly. Any prescribing decision is individual and is made in consultation, not chosen from a menu.
        </p>

        <h2 className="cg" style={sectionHeading}>A note on the private market</h2>
        <p style={paragraph}>
          Wholesale prices in the UK rose substantially from September 2025, and the private market now runs roughly £130 to £340 per pen depending on dose and supplier. Be cautious of any service where a form is the only thing between you and a prescription. The medical review is not an administrative obstacle to getting treatment, it <em>is</em> the treatment decision, and a service that treats it as a formality is not doing the part that keeps you safe.
        </p>
        <p style={paragraph}>
          Veridian Clinic is GP-led. Consultations are with Dr Tosin personally, with a full history and contraindication review before any prescribing decision. We see patients across the UK by secure video, with face-to-face consulting locations opening soon in{" "}
          <Link href="/private-gp-cambridge" style={{ color: "var(--fo)", fontWeight: 600 }}>Cambridge</Link>{" "}and{" "}
          <Link href="/private-gp-north-west-london" style={{ color: "var(--fo)", fontWeight: 600 }}>North West London</Link>.
        </p>
        <p style={{ ...paragraph, fontSize: ".84rem", color: "var(--sl3)", marginTop: 28 }}>
          This article is general information about NHS policy and metabolic health, not medical advice and not an advertisement for any prescription medicine. Prescription-only medicines are supplied only following an individual clinical assessment where appropriate. This service is not suitable for pregnant or breastfeeding patients. Always inform your registered GP of any private prescription.
        </p>
      </ClinicalArticleLayout>
    </>
  );
}
