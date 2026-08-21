import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const PAGE_URL = "https://veridianclinic.com/micronutrient-test";

export const metadata: Metadata = {
  title: { absolute: "Micronutrient & Vitamin Deficiency Test UK | Red Cell Magnesium, Active B12, Zinc | Veridian Clinic" },
  description:
    "GP-led micronutrient blood panel measuring red cell magnesium, red cell folate, active B12, zinc, copper and full iron studies, all interpreted against inflammation. 17 markers, GP-reviewed report, from £295.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Micronutrient & Vitamin Deficiency Test | Veridian Clinic",
    description:
      "Red cell magnesium, active B12, zinc and copper, interpreted by a GMC-registered GP against hs-CRP. The markers standard UK panels measure badly or not at all.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
  keywords: [
    "micronutrient test UK",
    "vitamin deficiency test UK",
    "red cell magnesium test UK",
    "active B12 test UK",
    "zinc blood test UK",
    "copper blood test UK",
    "red cell folate test",
    "selenium blood test UK",
    "vitamin deficiency test Cambridge",
    "vitamin deficiency test North West London",
    "private micronutrient panel London",
  ],
};

const markers = [
  { group: "Vitamins", items: ["Vitamin D (25-OH)", "Active B12 (holotranscobalamin)", "Vitamin B12 (total)", "Folate", "Red cell folate"] },
  { group: "Minerals & trace elements", items: ["Red cell magnesium", "Magnesium (serum)", "Zinc", "Copper", "Adjusted calcium"] },
  { group: "Iron status", items: ["Ferritin", "Iron", "Transferrin", "Transferrin saturation", "Total iron binding capacity"] },
  { group: "Interpretation controls", items: ["hs-CRP (inflammation)", "Albumin (protein binding)"] },
];

const faqs = [
  {
    q: "How is this different from a supermarket or online vitamin test?",
    a: "Mainstream UK consumer panels cluster around the same four results: vitamin D, B12, folate and ferritin. This panel measures those, then adds the ones that actually change decisions: red cell magnesium rather than serum, active B12 rather than total alone, red cell folate, zinc, copper, and full iron studies. Every result is reviewed by a GMC-registered GP against your history and medication rather than returned as a colour coded chart.",
  },
  {
    q: "Why do you measure hs-CRP in a nutrition panel?",
    a: "Because zinc is a negative acute phase reactant. Its blood level falls during any inflammation, infection or injury, independently of your actual nutritional status. Measuring zinc without a simultaneous inflammatory marker produces false lows and leads to supplementing something you were never short of. If your hs-CRP is raised we say so and re-test, rather than reporting a deficiency that may not be real. Albumin is included for the same reason, since it carries a large share of circulating zinc and calcium.",
  },
  {
    q: "Why red cell magnesium instead of the usual magnesium test?",
    a: "Serum magnesium is tightly regulated and stays within range until depletion is well advanced, so a normal result is genuinely reassuring only at the extremes. Red cell magnesium reflects intracellular stores and is the more informative measurement. This panel includes both, so the two can be read against each other. No magnesium test is perfect, but this is a better question to ask than the one most panels ask.",
  },
  {
    q: "What is active B12 and why does it matter?",
    a: "Most B12 in your blood is bound to a protein that cannot deliver it to your cells. Active B12, or holotranscobalamin, is the fraction that can. Total B12 can look comfortably normal while the usable portion is low, which is one reason people are told their B12 is fine while still having symptoms. This panel measures both.",
  },
  {
    q: "Where is the blood taken?",
    a: "At a Randox clinic near you. You will need to attend in person for the draw. There are Randox Health clinics in London, Manchester, Birmingham and other locations nationwide. This is a clinic visit rather than a home or postal kit, because the panel includes red cell markers that need proper handling to give a reliable result.",
  },
  {
    q: "Is the phlebotomy fee included?",
    a: "No. A £30 phlebotomy fee is paid directly to Randox on the day of your appointment. That is their charge for taking the sample, not ours, and it applies whichever panel you book.",
  },
  {
    q: "Can I add selenium?",
    a: "Yes. Red cell selenium can be added for £40 at checkout. It is worth considering if your interest is thyroid function, since selenium is a cofactor for the enzymes that convert thyroid hormone into its active form. It is not in the standard panel because it is a specialist assay and most people do not need it.",
  },
  {
    q: "Do you offer iodine, toxic burden or hair mineral testing?",
    a: "No. Hair mineral analysis is not a valid measure of nutritional status, and total toxic burden style panels are not accredited for diagnostic use in the UK. Iodine is a reasonable thyroid question but our laboratory does not currently offer it, and we would rather say so than substitute a marker that does not answer the same question.",
  },
  {
    q: "Who should not bother with this?",
    a: "If you are well, eating a varied diet, have no symptoms and are not in a higher risk group, a broad micronutrient panel will most likely tell you that you are fine, and there is a real chance of finding a borderline result that causes worry without changing anything. This panel earns its place when there are symptoms to explain, a restrictive or plant based diet, malabsorption, bariatric or gastrointestinal surgery, heavy menstrual loss, long term acid suppression or metformin, or a thyroid problem you want to understand properly.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTest",
      name: "Micronutrient and Vitamin Deficiency Blood Panel",
      description:
        "GP-led 17 marker micronutrient panel measuring vitamin D, active B12, total B12, folate, red cell folate, red cell magnesium, serum magnesium, zinc, copper, adjusted calcium, full iron studies, albumin and hs-CRP.",
      usedToDiagnose: ["Vitamin deficiency", "Iron deficiency", "Trace element deficiency"],
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
              The nutrient markers your last blood test measured badly, or not at all
            </h1>
            <p style={{ fontSize: "1.02rem", color: "rgba(246,241,232,.72)", lineHeight: 1.95, marginBottom: 30 }}>
              Most UK vitamin panels report serum magnesium and total B12, both of which can look entirely normal while
              the thing they are meant to measure is not. This panel uses the better markers, and reads them against
              inflammation rather than in isolation.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="#panel" className="btn btn-go">See what is measured</Link>
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
              <h2 className="sh-title">Normal is not the same as optimal, and neither is the same as measured properly</h2>
            </div>
            <div className="g2">
              <div className="card">
                <p className="lbl" style={{ marginBottom: 14 }}>What standard panels measure</p>
                <ul className="chk">
                  <li>Vitamin D</li>
                  <li>Total B12, which can mask a low usable fraction</li>
                  <li>Folate</li>
                  <li>Ferritin, often without full iron studies</li>
                  <li>Serum magnesium, which stays normal until depletion is advanced</li>
                </ul>
              </div>
              <div className="card">
                <p className="lbl" style={{ marginBottom: 14 }}>What this panel adds</p>
                <ul className="chk">
                  <li>Red cell magnesium, reflecting intracellular stores</li>
                  <li>Active B12, the fraction your cells can actually use</li>
                  <li>Red cell folate, a longer term measure than serum folate</li>
                  <li>Zinc and copper, with the balance between them</li>
                  <li>Albumin and hs-CRP, so the above can be interpreted honestly</li>
                  <li>Transferrin saturation and TIBC, not just ferritin</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The panel */}
        <section className="sec bg-wh" id="panel">
          <div className="wrap" style={{ maxWidth: 1000 }}>
            <div className="sh text-center">
              <p className="lbl">The panel</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Micronutrient Panel, 17 markers</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 720 }}>
                One fasted blood draw at a Randox clinic near you, and a GP-reviewed written report explaining what the
                numbers mean and what, if anything, to do about them.
              </p>
            </div>

            <div className="g2" style={{ marginBottom: 30 }}>
              {markers.map((m) => (
                <div key={m.group} className="card">
                  <p className="lbl" style={{ marginBottom: 14 }}>{m.group}</p>
                  <ul className="chk">
                    {m.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="g2">
              <div className="card" style={{ border: "1px solid var(--go)" }}>
                <p className="lbl" style={{ marginBottom: 10, color: "var(--go)" }}>Complete panel</p>
                <p className="cg" style={{ fontSize: "2.1rem", fontWeight: 500, color: "var(--fo)", marginBottom: 10 }}>£295</p>
                <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                  All 17 markers, GP-reviewed written report, and a clear recommendation on what to repeat and when.
                  Clinic phlebotomy fee of £30 is paid to Randox on the day.
                </p>
                <Link href="/book?tier=micronutrient-panel" className="btn btn-go">Book the Micronutrient Panel →</Link>
              </div>
              <div className="card">
                <p className="lbl" style={{ marginBottom: 10 }}>Optional upgrade</p>
                <p className="cg" style={{ fontSize: "2.1rem", fontWeight: 500, color: "var(--fo)", marginBottom: 10 }}>+ £40</p>
                <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                  <strong>Red cell selenium.</strong> Worth adding if your interest is thyroid function, since selenium
                  is a cofactor for the enzymes that activate thyroid hormone. Taken from the same draw, so there is no
                  second appointment.
                </p>
                <Link href="/book?tier=micronutrient-panel-selenium" className="btn btn-ol">Book with selenium, £335 →</Link>
              </div>
            </div>
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
                  Zinc falls whenever the body is inflamed, regardless of intake. We measure hs-CRP and albumin in the
                  same draw so a low result is either believed or challenged, rather than assumed.
                </p>
              </div>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>The right sample</p>
                <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9 }}>
                  Red cell magnesium alongside serum. Active B12 alongside total. Red cell folate alongside serum
                  folate. Measuring both halves of each pair is what makes the answer interpretable.
                </p>
              </div>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>A plan, not a chart</p>
                <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9 }}>
                  You get a GP-authored explanation of what matters, what does not, what to repeat and when, and where a
                  result should go back to your NHS GP instead of into a supplement order.
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
              Not sure this is the panel you need?
            </h2>
            <p style={{ fontSize: ".97rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, marginBottom: 26 }}>
              A short GP-led call is usually the cheapest way to find out, and often the answer is that you need fewer
              tests than you thought. Available across Cambridge, North West London and the rest of the UK by secure video.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/discovery-call" className="btn btn-go">Book a Discovery Core</Link>
              <Link href="/blood-tests" className="btn btn-ol-lt">See all blood tests</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
