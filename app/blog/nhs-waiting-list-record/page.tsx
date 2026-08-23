import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "The NHS Waiting List Hit a Record 7.75 Million. Here Is What You Can Actually Do While You Wait | Veridian Clinic" },
  description:
    "The NHS waiting list in England has reached a record 7.75 million, with almost 397,000 people waiting over a year. A GP explains what is realistic to do while you wait, which checks are worth doing early, and when private testing genuinely changes the outcome.",
  alternates: { canonical: "https://veridianclinic.com/blog/nhs-waiting-list-record" },
  openGraph: {
    title: "The NHS Waiting List Hit a Record 7.75 Million. What Can You Actually Do While You Wait?",
    description:
      "A GP's practical guide to the record NHS backlog: what waiting actually costs you clinically, and which early checks are worth doing rather than waiting to become unwell enough to qualify.",
    url: "https://veridianclinic.com/blog/nhs-waiting-list-record",
    type: "article",
  },
  keywords: [
    "NHS waiting list 2026",
    "NHS waiting times record",
    "private GP while waiting NHS",
    "NHS backlog private healthcare",
    "private blood tests while waiting",
    "see a GP quickly UK",
    "private GP Cambridge",
    "private GP North West London",
    "NHS 18 week target",
    "private consultation NHS wait",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The NHS waiting list hit a record 7.75 million. Here is what you can actually do while you wait",
  description:
    "The NHS waiting list in England has reached a record 7.75 million. A GP explains what waiting costs you clinically and which early checks genuinely change the outcome.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-08-12",
  dateModified: "2026-08-12",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blog/nhs-waiting-list-record" },
};

export default function NhsWaitingListRecordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ClinicalArticleLayout
        datePublished="2026-08-12"
        dateModified="2026-08-12"
        title="The NHS waiting list hit a record 7.75 million. Here is what you can actually do while you wait"
        intro="The waiting list for planned NHS treatment in England has risen to a record 7.75 million, up more than 100,000 in a single month. Just under 397,000 people have now been waiting over a year. As a GP, the question I am asked most often is not political. It is practical: what do I do in the meantime? Here is an honest answer, including the parts where waiting is genuinely the right call."
        ctas={[
          { href: "/metabolic-quiz", label: "Check your metabolic age free →" },
          { href: "/blood-tests", label: "See what advanced blood testing covers →", variant: "secondary" },
          { href: "/discovery-call", label: "Book a GP discovery call, £127 →", variant: "tertiary" },
        ]}
      >
        <h2 className="cg" style={sectionHeading}>What the numbers actually say</h2>
        <p style={paragraph}>
          The NHS constitution sets a target that at least 92% of patients should wait no longer than 18 weeks from GP referral to the start of treatment. Current performance sits far below that: around 65.6% of pathways are being seen within 18 weeks. Nearly 9,000 people in England have been waiting more than 18 months.
        </p>
        <p style={paragraph}>
          It is worth being precise about what that list is, because it is widely misread. The 7.75 million figure counts <em>pathways</em>, not people. Roughly 6.2 million individuals are on it, some of them waiting on more than one pathway. It also counts planned, non-urgent treatment. If you have red-flag symptoms, you are not on this list, and you should not be treating yourself as though you are.
        </p>

        <h2 className="cg" style={sectionHeading}>The part that gets missed: waiting is not neutral</h2>
        <p style={paragraph}>
          The public conversation treats a waiting list as a queue where nothing happens until your turn. Clinically, that is not what a wait is. For a hip replacement, waiting mostly costs you pain and mobility, and the operation works just as well later. For metabolic disease, waiting costs you something you cannot get back.
        </p>
        <p style={paragraph}>
          Insulin resistance, rising ApoB, and progressive vascular change do not pause while you are in a queue. They are silent, they are cumulative, and by the time they generate a symptom that qualifies you for a referral, you have usually lost several years of the window in which the problem was most reversible. That is the real cost of the backlog, and it does not show up in any of the published figures.
        </p>

        <h2 className="cg" style={sectionHeading}>What is worth doing while you wait</h2>
        <p style={paragraph}>
          <strong>Stay on the list.</strong> This is the advice most private clinics will not give you. If you have an NHS referral, keep it. Going private for a consultation does not remove you from the NHS pathway, and you should not give up a place you have already earned.
        </p>
        <p style={paragraph}>
          <strong>Get the diagnostics moving.</strong> The slowest part of most pathways is not the treatment, it is the sequence of appointments needed to work out what is wrong. Blood testing is the piece that can be brought forward independently, and it is the piece most likely to change what happens next. If you arrive at your NHS appointment already holding a complete picture, that appointment does far more work.
        </p>
        <p style={paragraph}>
          <strong>Test the markers the standard panel omits.</strong> A routine NHS panel is designed to detect disease that has already arrived. It is not designed to detect trajectory. Fasting insulin, ApoB, Lp(a) and homocysteine are largely absent from it, and they are precisely the markers that identify risk early enough to act on. We cover these in detail in our guides to{" "}
          <Link href="/blog/fast-insulin" style={{ color: "var(--fo)", fontWeight: 600 }}>fasting insulin</Link>,{" "}
          <Link href="/blog/apob-vs-ldl" style={{ color: "var(--fo)", fontWeight: 600 }}>ApoB versus LDL</Link>, and{" "}
          <Link href="/blog/homocysteine" style={{ color: "var(--fo)", fontWeight: 600 }}>homocysteine</Link>.
        </p>
        <p style={paragraph}>
          <strong>Do the things that do not require anyone&apos;s permission.</strong> Cardiorespiratory fitness is one of the strongest predictors of long-term mortality available, and it is not gated behind a referral. Our piece on{" "}
          <Link href="/blog/vigorous-exercise" style={{ color: "var(--fo)", fontWeight: 600 }}>four minutes a day of vigorous exercise</Link>{" "}
          covers the evidence.
        </p>

        <h2 className="cg" style={sectionHeading}>When going private genuinely helps, and when it does not</h2>
        <p style={paragraph}>
          It helps when the bottleneck is <em>information</em>: you do not know what is wrong, standard tests came back &ldquo;normal&rdquo;, and nobody has had the time to look properly. It helps when the problem is metabolic, because that is a domain where early intervention changes the trajectory and late intervention mostly manages damage.
        </p>
        <p style={paragraph}>
          It helps considerably less when you already have a confirmed diagnosis and a place in a surgical queue. Paying for a second opinion that tells you the same thing is not a good use of your money, and I would rather say so.
        </p>

        <h2 className="cg" style={sectionHeading}>What we do</h2>
        <p style={paragraph}>
          Veridian Clinic is a GP-led metabolic and longevity practice. Consultations are unhurried, testing is doctor-ordered rather than sold as a panel off a shelf, and every result comes back with a written interpretation and a plan rather than a PDF of numbers. Blood draws are arranged at a Randox clinic or through a home kit posted to you. We see patients across the UK by secure video, with face-to-face consulting locations opening soon in{" "}
          <Link href="/private-gp-cambridge" style={{ color: "var(--fo)", fontWeight: 600 }}>Cambridge</Link>{" "}and{" "}
          <Link href="/private-gp-north-west-london" style={{ color: "var(--fo)", fontWeight: 600 }}>North West London</Link>.
        </p>
        <p style={{ ...paragraph, fontSize: ".84rem", color: "var(--sl3)", marginTop: 28 }}>
          This article is general information, not medical advice. If you have urgent or red-flag symptoms, contact your GP, NHS 111, or emergency services. Do not withdraw from an NHS pathway on the basis of a private consultation without discussing it with your treating team.
        </p>
      </ClinicalArticleLayout>
    </>
  );
}
