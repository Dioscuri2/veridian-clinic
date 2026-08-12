import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "What a Private GP Checks That Your NHS Panel Does Not | Veridian Clinic" },
  description:
    "A GP-authored breakdown of exactly which markers a standard NHS blood panel includes, which it omits, and why. Covers ApoB, fasting insulin, Lp(a), homocysteine and the difference between 'no disease' and 'optimal'.",
  alternates: { canonical: "https://veridianclinic.com/blog/what-private-gp-checks-nhs-doesnt" },
  openGraph: {
    title: "What a Private GP Checks That Your NHS Panel Does Not",
    description:
      "Standard NHS panels are built to detect disease that has already arrived, not to detect trajectory. Here is exactly what gets left out, and why it matters.",
    url: "https://veridianclinic.com/blog/what-private-gp-checks-nhs-doesnt",
    type: "article",
  },
  keywords: [
    "private GP vs NHS blood test",
    "what NHS blood test does not include",
    "private blood tests UK what is tested",
    "NHS panel normal but still unwell",
    "private GP consultation UK",
    "advanced blood test markers UK",
    "private GP Cambridge",
    "private GP North West London",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What a private GP checks that your NHS panel does not",
  description:
    "A GP-authored breakdown of which markers a standard NHS blood panel includes, which it omits, and why that gap matters for early metabolic and cardiovascular risk.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-08-12",
  dateModified: "2026-08-12",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blog/what-private-gp-checks-nhs-doesnt" },
};

export default function WhatPrivateGpChecksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ClinicalArticleLayout
        title="What a private GP checks that your NHS panel does not"
        intro="&ldquo;Your bloods are normal&rdquo; is one of the most frustrating sentences in medicine, because it is usually true and unhelpful at the same time. Normal means above the threshold at which disease is diagnosed. It does not mean optimal, and it does not mean nothing is changing. Here is precisely what a standard NHS panel covers, what it leaves out, and why the gap exists."
        ctas={[
          { href: "/metabolic-quiz", label: "Check your metabolic age free →" },
          { href: "/blood-tests", label: "See all advanced blood test panels →", variant: "secondary" },
          { href: "/discovery-call", label: "Book a GP discovery call, £97 →", variant: "tertiary" },
        ]}
      >
        <h2 className="cg" style={sectionHeading}>Why the NHS panel is built the way it is</h2>
        <p style={paragraph}>
          This is not negligence, and it is important to say so clearly. A population-level screening panel is designed around a specific question: does this person have a disease we can treat today? Tests are included when they change immediate management across millions of people at acceptable cost. That is a reasonable design goal, and the NHS achieves it well.
        </p>
        <p style={paragraph}>
          Preventive medicine asks a different question: where is this person heading over the next twenty years, and can we change it? Different question, different tests. The markers below are absent from routine panels not because they are fringe, but because they answer the second question rather than the first.
        </p>

        <h2 className="cg" style={sectionHeading}>The main omissions</h2>
        <p style={paragraph}>
          <strong>Fasting insulin.</strong> Insulin rises to compensate for insulin resistance for years, sometimes a decade, before glucose or HbA1c drift out of range. By the time HbA1c is abnormal, the process is well established. Fasting insulin catches it while it is still readily reversible, and it is not on standard panels at all. See our{" "}
          <Link href="/blog/fast-insulin" style={{ color: "var(--fo)", fontWeight: 600 }}>full guide to fasting insulin</Link>.
        </p>
        <p style={paragraph}>
          <strong>ApoB.</strong> Standard cholesterol testing measures the cholesterol carried inside lipoprotein particles. ApoB counts the particles themselves, which is closer to the thing that actually drives atherosclerosis. The two frequently disagree, and they disagree most in exactly the people whose risk is being underestimated: those with insulin resistance or metabolic syndrome. See{" "}
          <Link href="/blog/apob-vs-ldl" style={{ color: "var(--fo)", fontWeight: 600 }}>ApoB versus LDL</Link>.
        </p>
        <p style={paragraph}>
          <strong>Lipoprotein(a).</strong> Genetically determined, largely unmoved by lifestyle, and affecting roughly one in five people. It carries real implications for lifetime cardiovascular risk and for how aggressively other risk factors should be treated. It needs measuring once in a lifetime, and it is not routinely measured at all.
        </p>
        <p style={paragraph}>
          <strong>Homocysteine.</strong> An independent cardiovascular and cognitive risk marker, most often elevated because of low folate or B12, and correctable when found. Omitted from standard panels. See{" "}
          <Link href="/blog/homocysteine" style={{ color: "var(--fo)", fontWeight: 600 }}>our homocysteine guide</Link>.
        </p>
        <p style={paragraph}>
          <strong>Ferritin interpreted for function rather than disease.</strong> Ferritin above roughly 13 ug/L clears the laboratory range, so a result of 15 is reported as normal. Sustained energy in most people requires considerably more. This single threshold difference explains a large share of the &ldquo;I am exhausted but my tests are fine&rdquo; consultations.
        </p>

        <h2 className="cg" style={sectionHeading}>The other half: the appointment itself</h2>
        <p style={paragraph}>
          Tests are only part of the gap. A ten-minute appointment is enough to address one clearly defined problem. It is not enough to take a full history, connect three symptoms that appeared over two years, and think properly about pattern. Much of what a longer consultation buys is not access to exotic tests. It is time for a doctor to consider the whole picture at once.
        </p>

        <h2 className="cg" style={sectionHeading}>When you do not need any of this</h2>
        <p style={paragraph}>
          If you are young, well, have no family history of note and no symptoms, comprehensive private testing will most likely tell you that you are fine. That is a legitimate thing to buy reassurance about, but it is not a clinical necessity, and I would rather you knew that before spending. Testing earns its cost when there is a real question to answer: unexplained symptoms, a concerning family history, results that sit at the edge of normal, or weight that will not move despite genuine effort.
        </p>

        <h2 className="cg" style={sectionHeading}>How we work</h2>
        <p style={paragraph}>
          Every panel at Veridian is doctor-ordered rather than picked off a shelf, and every result comes back with a written GP interpretation and a plan. Blood draws are arranged at a Randox clinic or through a home kit posted to you. Consultations are by secure video across the UK, with face-to-face consulting locations opening soon in{" "}
          <Link href="/private-gp-cambridge" style={{ color: "var(--fo)", fontWeight: 600 }}>Cambridge</Link>{" "}and{" "}
          <Link href="/private-gp-north-west-london" style={{ color: "var(--fo)", fontWeight: 600 }}>North West London</Link>.
        </p>
        <p style={{ ...paragraph, fontSize: ".84rem", color: "var(--sl3)", marginTop: 28 }}>
          This article is general information, not medical advice. Private testing complements NHS care and does not replace it. Always inform your registered GP of significant private results.
        </p>
      </ClinicalArticleLayout>
    </>
  );
}
