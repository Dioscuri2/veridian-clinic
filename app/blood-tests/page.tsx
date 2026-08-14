import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: { absolute: "Private Blood Tests UK Advanced Metabolic & Longevity Testing | Veridian Clinic" },
  description:
    "GP-ordered private blood tests for high-intent health screening in the UK. ApoB, fasting insulin, Lp(a), biological age, and metabolic fatigue panels results interpreted by a GP with a personalised action plan.",
  alternates: {
    canonical: "https://veridianclinic.com/blood-tests",
  },
  openGraph: {
    title: "Private Blood Tests UK Veridian Clinic",
    description:
      "Advanced metabolic and longevity blood tests ordered by a UK GP. Includes ApoB, fasting insulin, Lp(a), and biological age estimation.",
    url: "https://veridianclinic.com/blood-tests",
    type: "website",
  },
  keywords: [
    "private blood tests UK",
    "advanced metabolic blood test UK",
    "longevity blood test UK",
    "ApoB test UK",
    "fasting insulin test UK",
    "Lp(a) test UK",
    "biological age blood test UK",
    "fatigue blood test UK",
    "GP private blood test UK",
    "metabolic screening UK",
  ],
};

const tests = [
  {
    slug: "micronutrient",
    title: "Micronutrient & Vitamin Deficiency Test",
    excerpt:
      "Selenium, iodine, zinc, copper, red cell magnesium and active B12, the markers mainstream UK vitamin panels leave out. Every result is read against hs-CRP, because zinc and selenium fall with inflammation regardless of intake.",
    tag: "Nutrition & Thyroid",
    price: "From £199",
    includedIn: "Core Micronutrient Screen & Complete Micronutrient Panel",
  },
  {
    slug: "apob",
    title: "ApoB Blood Test",
    excerpt:
      "Apolipoprotein B measures the number of atherogenic lipoprotein particles in your bloodstream a more direct indicator of cardiovascular risk than LDL cholesterol, especially in insulin resistance and metabolic syndrome.",
    tag: "Cardiovascular Risk",
    price: "From £595",
    includedIn: "Metabolic Baseline & Longevity Panel",
  },
  {
    slug: "fasting-insulin",
    title: "Fasting Insulin Test",
    excerpt:
      "Fasting insulin reveals early insulin resistance years before HbA1c or fasting glucose become abnormal. The NHS does not routinely test it yet it is one of the most clinically actionable markers in preventive metabolic medicine.",
    tag: "Metabolic Health",
    price: "From £195",
    includedIn: "Energy Screen & Metabolic Baseline",
  },
  {
    slug: "lipoprotein-a",
    title: "Lipoprotein(a) Blood Test",
    excerpt:
      "Lp(a) is a genetically determined cardiovascular risk marker that is largely independent of lifestyle. NHS screening does not include it, yet it affects 1 in 5 people and carries significant implications for lifetime heart disease risk.",
    tag: "Cardiovascular Risk",
    price: "From £795",
    includedIn: "Longevity Panel",
  },
  {
    slug: "biological-age",
    title: "Biological Age Blood Test",
    excerpt:
      "A 150+ marker Longevity Panel that estimates your biological age alongside organ function, inflammation, hormones, and metabolic health giving a far richer picture than any single number can provide.",
    tag: "Longevity",
    price: "£795",
    includedIn: "Longevity Panel",
  },
  {
    slug: "metabolic-screen",
    title: "Fatigue & Energy Blood Test",
    excerpt:
      "Unexplained fatigue can originate from thyroid dysfunction, insulin resistance, iron deficiency, B12 depletion, cortisol pattern, or low testosterone. Standard GP panels rarely test all these simultaneously. The Energy Screen does.",
    tag: "Energy & Fatigue",
    price: "£195",
    includedIn: "Energy Screen",
  },
  {
    slug: "womens-hormones",
    title: "Perimenopause & Women's Hormone Blood Test",
    excerpt:
      "Fatigue, weight gain, poor sleep, low mood, irregular cycles and a normal blood test result every time. This panel measures what standard tests miss: oestradiol, FSH, LH, progesterone, testosterone, SHBG, prolactin, thyroid, Lp(a) and fasting insulin. Interpreted by a GP.",
    tag: "Women's Health",
    price: "£375",
    includedIn: "Is It My Hormones? Panel",
    guideBonus: "Perimenopause Reset Guide included free",
  },
  {
    slug: "mens-testosterone",
    title: "Testosterone & Men's Hormone Blood Test",
    excerpt:
      "Total testosterone alone misses the picture in most men where free testosterone determined by SHBG is the clinically relevant value. This panel measures free testosterone, SHBG, LH, FSH, DHEA-S, cortisol, Lp(a) and fasting insulin. GP-reviewed.",
    tag: "Men's Health",
    price: "£325",
    includedIn: "Running on Empty Panel",
  },
  {
    slug: "fatigue-energy",
    title: "Fatigue & Energy Deep Screen",
    excerpt:
      "For people who have already had a standard thyroid and blood count and been told everything is normal. This panel adds TPO antibodies, fasting insulin, uric acid, full iron studies and ferritin at the optimal threshold the markers that explain the majority of cases where standard tests return nothing.",
    tag: "Energy & Fatigue",
    price: "£249",
    includedIn: "Tired of Being Told You're Fine Panel",
    guideBonus: "Metabolic Reset Guide included free",
  },
  {
    slug: "cardiovascular-risk",
    title: "Cardiovascular Risk Beyond Cholesterol",
    excerpt:
      "Half of all heart attacks happen in people with normal cholesterol. ApoB, Lp(a), homocysteine, small dense LDL, hs-CRP and fasting insulin are the markers that actually predict cardiovascular events. Almost none are included in a standard cholesterol test.",
    tag: "Cardiovascular Risk",
    price: "£349",
    includedIn: "What Your Cholesterol Test Missed Panel",
  },
  {
    slug: "metabolic-weight",
    title: "Metabolic Weight Resistance Panel",
    excerpt:
      "If diet and exercise are not shifting the weight, the answer is almost always in the blood. Fasting insulin, HOMA-IR, leptin, adiponectin, uric acid and thyroid markers reveal the specific metabolic block that standard tests never look for.",
    tag: "Metabolic Health",
    price: "£199",
    includedIn: "Why Won't The Weight Budge? Panel",
    guideBonus: "Metabolic Reset Guide included free",
  },
  {
    slug: "optimiser-baseline",
    title: "The Optimiser's Baseline",
    excerpt:
      "For people who track their biology seriously and want a documented starting point. IGF-1, ApoB, Lp(a), sdLDL, Leptin, Adiponectin, cortisol, DHEA-S, testosterone, fasting insulin, Cystatin C and full organ safety. A benchmark to return to every year.",
    tag: "Longevity",
    price: "£449",
    includedIn: "Optimiser's Baseline Panel",
  },
];

export default function BloodTestsIndexPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Header */}
        <section className="sec bg-iv" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl a1">Private Blood Tests</p>
            <div className="rule a1" />
            <h1
              className="cg a2"
              style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 16 }}
            >
              Advanced blood tests your NHS panel doesn&apos;t include.
            </h1>
            <p
              className="a3"
              style={{ fontSize: "clamp(.92rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 640, marginBottom: 0 }}
            >
              GP-ordered testing for the markers that reveal metabolic dysfunction, cardiovascular risk, and biological ageing interpreted by a doctor with a personalised action plan, not just a PDF of numbers.
            </p>
          </div>
        </section>

        {/* Test list */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gap: 2 }}>
              {tests.map((test, i) => (
                <Link
                  key={test.slug}
                  href={`/blood-tests/${test.slug}`}
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
                      borderBottom: i < tests.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em",
                          textTransform: "uppercase", color: "var(--go)", padding: "3px 8px",
                          border: "1px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.06)"
                        }}>
                          {test.tag}
                        </span>
                        <span style={{ fontSize: ".72rem", color: "var(--sl3)", letterSpacing: ".06em" }}>
                          {test.price}
                        </span>
                        <span style={{ fontSize: ".72rem", color: "var(--sl3)", letterSpacing: ".04em" }}>
                          Included in: {test.includedIn}
                        </span>
                        {(test as { guideBonus?: string }).guideBonus && (
                          <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#145226", background: "rgba(20,82,38,.1)", padding: "3px 8px" }}>
                            {(test as { guideBonus?: string }).guideBonus}
                          </span>
                        )}
                      </div>
                      <h2
                        className="cg"
                        style={{ fontSize: "clamp(1.1rem,2.5vw,1.45rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 10 }}
                      >
                        {test.title}
                      </h2>
                      <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, maxWidth: 680 }}>
                        {test.excerpt}
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

        {/* How it works strip */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">How It Works</p>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 32 }}>
              Doctor-ordered. Lab-processed. GP-interpreted.
            </h2>
            <div className="g3" style={{ gap: 24 }}>
              {[
                { n: "1", heading: "Book online", body: "Select your panel and book. No GP referral needed we handle the clinical ordering." },
                { n: "2", heading: "Sample collected", body: "Home phlebotomy kit, walk-in draw, or nurse home visit. Your choice, across the UK." },
                { n: "3", heading: "Results + GP report", body: "Processed by an accredited UK lab. Results with a written GP interpretation and next-step action plan." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, background: "var(--fo)", color: "var(--go2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 500, flexShrink: 0,
                  }}>
                    {step.n}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--sl)", marginBottom: 6, fontSize: ".93rem" }}>{step.heading}</p>
                    <p style={{ fontSize: ".87rem", color: "var(--sl2)", lineHeight: 1.85 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz CTA */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Not sure which test you need?</p>
            <div className="rule rule-c" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
              Check your metabolic age in 60 seconds.
            </h2>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 28, maxWidth: 520, margin: "0 auto 28px" }}>
              A free clinical screening tool that estimates where your metabolism is tracking and recommends the most relevant test panel for your pattern.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/metabolic-quiz" className="btn btn-fo">Check My Metabolic Age Free →</Link>
              <Link href="/assessments" className="btn btn-ol">View All Panels</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
