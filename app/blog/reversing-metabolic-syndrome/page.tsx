import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";

export const metadata: Metadata = {
  title: "Reversing Metabolic Syndrome in 12 Weeks | Practical Clinical Strategy",
  description:
    "A guide to the main levers behind a 12-week metabolic reset, including diet quality, waist reduction, activity, sleep, and biomarker tracking.",
  alternates: {
    canonical: "https://veridian.clinic/blog/reversing-metabolic-syndrome",
  },
  openGraph: {
    title: "Reversing Metabolic Syndrome in 12 Weeks | Veridian Clinic",
    description:
      "How a focused 12-week reset can improve insulin burden, waist metrics, and cardiometabolic risk.",
    url: "https://veridian.clinic/blog/reversing-metabolic-syndrome",
    type: "article",
  },
};

const paragraph = {
  fontSize: ".96rem",
  color: "var(--sl2)",
  lineHeight: 1.95,
} as const;

const sectionHeading = {
  fontSize: "2rem",
  fontWeight: 500,
  color: "var(--sl)",
} as const;

export default function ReversingMetabolicSyndromePage() {
  return (
    <ClinicalArticleLayout
      title="Reversing metabolic syndrome in 12 weeks, what actually moves the needle"
      intro="The goal is not perfection. It is reducing the drivers that keep insulin elevated, waist circumference expanding, and cardiovascular risk quietly climbing, then measuring whether the system is genuinely improving."
      ctas={[
        { href: "/book?tier=programme", label: "Explore the 12-week reset →" },
        { href: "/metabolic-scorecard", label: "Take the scorecard", variant: "secondary" },
      ]}
    >
      <p style={paragraph}>
        Most people do not need a hundred tactics. They need a tighter system: better meal structure, more skeletal muscle stimulus, improved sleep consistency, and objective marker tracking so they can see what is changing.
      </p>
      <h2 className="cg" style={sectionHeading}>The 12-week focus areas</h2>
      <ul className="chk">
        <li>Reduce waist-to-height ratio through sustained nutrition and activity changes.</li>
        <li>Prioritise protein, meal timing, and lower ultra-processed intake.</li>
        <li>Use resistance training to improve glucose disposal and insulin sensitivity.</li>
        <li>Anchor sleep and recovery so appetite and glucose regulation improve.</li>
        <li>Track biomarkers, not just motivation.</li>
      </ul>
      <div style={{ padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" }}>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
          <strong style={{ color: "var(--fo)" }}>Clinical reality:</strong> visible body changes matter, but the deeper win is shifting the metabolic pattern underneath them.
        </p>
      </div>
      <p style={paragraph}>
        At Veridian, we combine these lifestyle levers with blood work, waist metrics, and where appropriate CGM interpretation, so the intervention becomes measurable rather than guesswork. That is how a short-term reset becomes the start of a longer-term trajectory change.
      </p>
    </ClinicalArticleLayout>
  );
}
