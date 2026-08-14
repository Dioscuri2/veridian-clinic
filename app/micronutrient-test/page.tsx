import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const PAGE_URL = "https://veridianclinic.com/micronutrient-test";

export const metadata: Metadata = {
  title: { absolute: "Micronutrient & Vitamin Deficiency Test UK | Selenium, Iodine, Zinc | Veridian Clinic" },
  description:
    "GP-led micronutrient blood test measuring the markers mainstream UK panels leave out: selenium, iodine, zinc, copper, red cell magnesium and active B12. Interpreted against inflammation, not read in isolation.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Micronutrient & Vitamin Deficiency Test | Veridian Clinic",
    description:
      "Selenium, iodine, zinc, copper, red cell magnesium and active B12, interpreted by a GMC-registered GP. The markers standard UK panels miss.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
  keywords: [
    "micronutrient test UK",
    "vitamin deficiency test UK",
    "selenium blood test UK",
    "iodine test UK",
    "zinc blood test UK",
    "red cell magnesium test",
    "active B12 test UK",
    "omega 3 index test UK",
    "vitamin deficiency test Cambridge",
    "vitamin deficiency test North West London",
    "private micronutrient panel London",
  ],
};

const tiers = [
  {
    tier: "micronutrient-core",
    name: "Core Micronutrient Screen",
    price: "£199",
    tag: "Start here",
    featured: false,
    summary:
      "The markers that account for the overwhelming majority of genuine deficiency in UK adults, measured properly and read against inflammation.",
    markers: [
      "Vitamin D (25-OH)",
      "Active B12 (holotranscobalamin)",
      "Folate",
      "Ferritin, full iron studies, transferrin saturation",
      "Red cell magnesium",
      "hs-CRP (inflammation control)",
      "Full Blood Count",
    ],
  },
  {
    tier: "micronutrient-complete",
    name: "Complete Micronutrient Panel",
    price: "£399",
    tag: "Most complete",
    featured: true,
    summary:
      "Everything in the Core Screen plus the trace elements and thyroid cofactors that no mainstream UK consumer panel includes.",
    markers: [
      "Everything in the Core Micronutrient Screen",
      "Selenium and zinc (with albumin)",
      "Urinary iodine, with creatinine correction",
      "Thyroid: TSH, Free T4, Free T3, TPO antibodies",
      "Copper and caeruloplasmin, with zinc to copper ratio",
      "Vitamin A and Vitamin E",
      "Homocysteine (functional B vitamin status)",
    ],
  },
  {
    tier: "omega-3-index",
    name: "Omega-3 Index",
    price: "£89",
    tag: "Add on, or standalone",
    featured: false,
    summary:
      "Measured in red blood cell membranes rather than plasma, so it reflects your intake over months instead of what you ate yesterday.",
    markers: [
      "Red cell EPA and DHA as a percentage of total fatty acids",
      "Finger-prick kit posted to your door",
      "No fasting and no clinic visit needed",
      "Target range interpretation, not just a number",
    ],
  },
];

const faqs = [
  {
    q: "How is this different from a supermarket or online vitamin test?",
    a: "Two ways. First, the markers: mainstream UK consumer panels cluster around the same four results, vitamin D, B12, folate and ferritin. Selenium, iodine, zinc, copper and the fat soluble vitamins are almost never included. Second, the interpretation: every result is reviewed by a GMC-registered GP against your history, medication and inflammatory markers rather than being returned as a colour coded chart.",
  },
  {
    q: "Why do you measure hs-CRP in a nutrition panel?",
    a: "Because zinc and selenium are negative acute phase reactants. Their blood levels fall during any inflammation, infection or injury, independently of your actual nutritional status. Measuring them without a simultaneous inflammatory marker produces false lows and leads to supplementing something you were never short of. If your hs-CRP is raised, we say so and re-test rather than reporting a deficiency that may not exist.",
  },
  {
    q: "Why red cell magnesium instead of the usual magnesium test?",
    a: "Serum magnesium is tightly regulated by the body and stays within range until depletion is well advanced, so a normal result is genuinely reassuring only at the extremes. Red cell magnesium reflects intracellular stores and is the more informative measurement. It is not perfect, and no magnesium test is, but it is a better question to ask.",
  },
  {
    q: "Why is iodine a urine sample?",
    a: "Iodine status is assessed from urinary iodine concentration, corrected for creatinine, because the great majority of dietary iodine is excreted in urine. There is no useful routine blood test for it. Your kit includes a urine collection pot alongside the blood draw.",
  },
  {
    q: "Where is the blood actually taken?",
    a: "At a Randox clinic. The trace element markers require a fasted sample taken at least eight hours after your last supplement, and the sample must reach the laboratory quickly, so this part cannot be done as a posted home kit. The Omega-3 Index is the exception: it is a finger-prick test that posts perfectly well and can be done entirely at home.",
  },
  {
    q: "Do you offer toxic burden, mycotoxin or hair mineral testing?",
    a: "No. We are a GP-led clinic and we only offer tests we can defend clinically. Hair mineral analysis is not a valid measure of nutritional status, and total toxic burden style panels are not accredited for diagnostic use in the UK and carry a weak evidence base. We would rather lose the sale than sell a test we could not stand behind in front of a colleague.",
  },
  {
    q: "Who should not bother with this?",
    a: "If you are well, eating a varied diet, have no symptoms and are not in a higher risk group, a broad micronutrient panel will most likely tell you that you are fine, and there is a real chance of finding a borderline result that causes worry without changing anything. This test earns its place when there are symptoms to explain, a restrictive or plant based diet, malabsorption, bariatric or gastrointestinal surgery, heavy menstrual loss, long term acid suppression or metformin, or a thyroid problem you want to understand properly.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTest",
      name: "Micronutrient and Vitamin Deficiency Blood Test",
      description:
        "GP-led micronutrient panel measuring vitamin D, active B12, folate, iron studies, red cell magnesium, selenium, zinc, copper, urinary iodine, vitamins A and E, homocysteine and thyroid function, interpreted against hs-CRP.",
      usedToDiagnose: ["Vitamin deficiency", "Iron deficiency", "Trace element deficiency", "Thyroid dysfunction"],
      url: PAGE_URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function MicronutrientTestPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-fo" style={{ textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: 780 }}>
            <p className="lbl" style={{ color: "var(--go2)" }}>Micronutrient &amp; Vitamin Testing</p>
            <div className="rule rule-c" style={{ background: "var(--go)" }} />
            <h1 className="cg" style={{ fontSize: "clamp(2rem,4.6vw,3.1rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.22, marginBottom: 18 }}>
              The nutrient markers your last blood test almost certainly skipped
            </h1>
            <p style={{ fontSize: "1.02rem", color: "rgba(246,241,232,.72)", lineHeight: 1.95, marginBottom: 30 }}>
              Most UK vitamin panels measure the same four things. Selenium, iodine, zinc, copper and the fat soluble
              vitamins are left out, which is a problem if what you actually want to understand is your thyroid, your
              energy, or why a supplement shelf has not changed how you feel.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="#panels" className="btn btn-go">See the panels</Link>
              <Link href="/discovery-call" className="btn btn-ol-lt">Speak to the GP first</Link>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="sh text-center">
              <p className="lbl">The gap</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Normal is not the same as optimal, and neither is the same as measured</h2>
            </div>
            <div className="g2">
              <div className="card">
                <p className="lbl" style={{ marginBottom: 14 }}>What standard panels test</p>
                <ul className="chk">
                  <li>Vitamin D</li>
                  <li>Vitamin B12 (total, not active)</li>
                  <li>Folate</li>
                  <li>Ferritin</li>
                  <li>Sometimes serum magnesium</li>
                </ul>
              </div>
              <div className="card">
                <p className="lbl" style={{ marginBottom: 14 }}>What almost nobody tests</p>
                <ul className="chk">
                  <li>Selenium, a thyroid hormone cofactor</li>
                  <li>Iodine, the substrate thyroid hormone is built from</li>
                  <li>Zinc, with albumin and inflammation to read it against</li>
                  <li>Copper and caeruloplasmin, and the zinc to copper balance</li>
                  <li>Red cell magnesium rather than serum</li>
                  <li>Active B12, which total B12 can mask</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Panels */}
        <section className="sec bg-wh" id="panels">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">The panels</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Three ways in</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 720 }}>
                Every panel includes a GP-reviewed written report explaining what the numbers mean for you and what,
                if anything, to do about them. Clinic blood draw is £30, payable at the Randox clinic.
              </p>
            </div>
            <div className="g3">
              {tiers.map((t) => (
                <div key={t.tier} className="card" style={t.featured ? { border: "1px solid var(--go)" } : undefined}>
                  <p className="lbl" style={{ marginBottom: 10, color: t.featured ? "var(--go)" : "var(--sl3)" }}>{t.tag}</p>
                  <h3 className="cg" style={{ fontSize: "1.35rem", fontWeight: 500, marginBottom: 6 }}>{t.name}</h3>
                  <p className="cg" style={{ fontSize: "1.8rem", fontWeight: 500, color: "var(--fo)", marginBottom: 14 }}>{t.price}</p>
                  <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 16 }}>{t.summary}</p>
                  <ul className="chk" style={{ marginBottom: 22 }}>
                    {t.markers.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                  <Link href={`/book?tier=${t.tier}`} className={t.featured ? "btn btn-go" : "btn btn-ol"}>
                    Book {t.name} →
                  </Link>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: ".88rem", color: "var(--sl3)", marginTop: 26, maxWidth: 700, margin: "26px auto 0", lineHeight: 1.9 }}>
              Bought separately the Core Screen, the trace element module and the extended module come to £447.
              The Complete Panel brings them together at £399.
            </p>
          </div>
        </section>

        {/* Interpretation */}
        <section className="sec bg-fo">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="sh text-center">
              <p className="lbl" style={{ color: "var(--go2)" }}>Why interpretation is the product</p>
              <div className="rule rule-c" style={{ background: "var(--go)" }} />
              <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.3 }}>
                A number without context is how people end up supplementing the wrong thing
              </h2>
            </div>
            <div className="g3" style={{ textAlign: "left" }}>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Inflammation first</p>
                <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9 }}>
                  Zinc and selenium fall whenever the body is inflamed, regardless of intake. We measure hs-CRP in the
                  same draw so a low result is either believed or challenged, rather than assumed.
                </p>
              </div>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>The right sample</p>
                <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9 }}>
                  Red cell magnesium instead of serum. Active B12 instead of total. Urinary iodine rather than a blood
                  test that does not exist. The sample type decides whether the answer means anything.
                </p>
              </div>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>A plan, not a chart</p>
                <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9 }}>
                  You get a GP-authored explanation of what matters, what does not, what to repeat and when, and where
                  a result should go back to your NHS GP instead of into a supplement order.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Honesty */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="sh text-center">
              <p className="lbl">What we will not sell you</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">The tests we have deliberately left out</h2>
            </div>
            <div className="card">
              <ul className="chk">
                <li>Hair mineral analysis, which is not a valid measure of nutritional status</li>
                <li>Total toxic burden and mycotoxin panels, which are not accredited for diagnostic use in the UK</li>
                <li>Food intolerance and IgG testing, which does not identify food intolerance</li>
                <li>Intracellular micronutrient panels, which have no demonstrated advantage over standard testing</li>
              </ul>
              <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.9, marginTop: 18 }}>
                Your data stays with your treating clinician. We do not sell, share or broker your results, and you can
                ask us to delete them at any time.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="sh text-center">
              <p className="lbl">Questions</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Before you book</h2>
            </div>
            {faqs.map((f) => (
              <div key={f.q} className="card" style={{ marginBottom: 14 }}>
                <h3 className="cg" style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: 10 }}>{f.q}</h3>
                <p style={{ fontSize: ".94rem", color: "var(--sl2)", lineHeight: 1.9 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-fo" style={{ padding: "60px 24px", textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: 720 }}>
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", fontWeight: 500, color: "var(--iv)", marginBottom: 16 }}>
              Not sure which panel you need?
            </h2>
            <p style={{ fontSize: ".97rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, marginBottom: 26 }}>
              A short GP-led call is usually the cheapest way to find out, and often the answer is that you need fewer
              tests than you thought. Available across Cambridge, North West London and the rest of the UK by secure video.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/discovery-call" className="btn btn-go">Book a Discovery Call</Link>
              <Link href="/blood-tests" className="btn btn-ol-lt">See all blood tests</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
