import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: { absolute: "The Metabolic Turnaround | 90-Day GP-Led Programme | Veridian Clinic" },
  description: "In 90 days, go from guessing to knowing exactly what is happening inside your body. A doctor-built, data-led plan with a GP guiding you every fortnight. From £1,895.",
  alternates: { canonical: "https://veridianclinic.com/metabolic-turnaround" },
  openGraph: {
    title: "The Metabolic Turnaround | Veridian Clinic",
    description: "Comprehensive blood panel, GP interpretation, personalised plan, and 90 days of fortnightly check-ins. CQC regulated.",
    url: "https://veridianclinic.com/metabolic-turnaround",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Metabolic Turnaround available outside London?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RANDOX blood collection centres are available nationally across the UK. GP sessions are delivered by video. You do not need to travel to London.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if results flag something serious?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your GP will discuss findings with you directly and arrange appropriate referral or follow-up as clinically indicated. This is part of ongoing GP oversight throughout the programme.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a health MOT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A health MOT is typically a one-off assessment with no follow-through. The Metabolic Turnaround includes interpretation, a personalised plan, and 90 days of ongoing GP-led implementation support. The value is in the follow-through.",
      },
    },
    {
      "@type": "Question",
      name: "Is this regulated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Veridian Clinic is regulated by the Care Quality Commission (CQC). Dr Taiwo is a licensed GP registered with the GMC.",
      },
    },
    {
      "@type": "Question",
      name: "What is the investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Metabolic Turnaround is £1,895 in full, or 3 monthly payments of £695. Laboratory testing costs are included in the programme fee.",
      },
    },
  ],
};

const BOOKING_URL = process.env.NEXT_PUBLIC_THANKSDOC_BOOKING_URL || "https://notes.thanksdoc.co.uk/book/clinic/veridian";

const callout: React.CSSProperties = {
  padding: "20px 24px",
  background: "rgba(200,168,75,.07)",
  borderLeft: "3px solid var(--go)",
  marginBottom: 24,
};

export default function MetabolicTurnaroundPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* HERO */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
              <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", padding: "3px 10px", border: "1px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.06)" }}>
                Private GP Programme
              </span>
              <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)", padding: "3px 10px", border: "1px solid rgba(0,0,0,.1)" }}>
                Limited to 10 patients per month
              </span>
            </div>
            <h1
              className="cg a1"
              style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.1, marginBottom: 22 }}
            >
              In 90 days, go from guessing to knowing exactly what is happening inside your body.
            </h1>
            <p
              className="a2"
              style={{ fontSize: "clamp(1rem,2.2vw,1.15rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 660, marginBottom: 32 }}
            >
              A doctor-built, data-led plan you actually understand, with a GP guiding you every fortnight.
            </p>
            <div className="a3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={BOOKING_URL} className="btn btn-fo" target="_blank" rel="noopener noreferrer">
                Book a Free Discovery Call
              </Link>
              <a href="#what-is-included" className="btn btn-ol">See What is Included</a>
            </div>
            <div className="a3" style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              {["CQC regulated", "GP-authored, evidence-based", "Private and confidential"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--go)", flexShrink: 0 }} />
                  <span style={{ fontSize: ".75rem", color: "var(--sl3)", fontFamily: "var(--ff-sans)", letterSpacing: ".04em" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720 }}>
            <p className="lbl">The problem with standard testing</p>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 20 }}>
              A normal result is not the same as an optimal result.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 18 }}>
              The NHS Health Check measures fasting glucose, total cholesterol, and blood pressure. It is designed to detect established disease. It catches diabetes after insulin resistance has been developing for years. It catches high cardiovascular risk after arteries have been accumulating damage.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 18 }}>
              The Metabolic Turnaround panel measures the upstream markers: fasting insulin, the earliest signal of metabolic dysfunction; ApoB, a stronger cardiovascular predictor than LDL; Lp(a), genetically elevated in 1 in 5 people and unknown without testing; homocysteine, full thyroid function including free T3, cortisol, DHEA, vitamin D, inflammatory markers, full sex hormones, and biological age indicators.
            </p>
            <div style={callout}>
              <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, margin: 0 }}>
                <strong style={{ color: "var(--fo)" }}>The difference between a normal result and an optimal result</strong> is often where the real story is. Our panel is designed to find the gap.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT IS INCLUDED */}
        <section id="what-is-included" className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">The programme</p>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 40 }}>
              Everything in one programme.
            </h2>
            <div style={{ display: "grid", gap: 2 }}>
              {[
                {
                  num: "01",
                  title: "Comprehensive Blood Panel",
                  body: "A 70+ marker private panel covering metabolic function, cardiovascular risk, hormonal balance, thyroid, inflammation, and nutritional status. Collected at your chosen RANDOX clinic nationally. Results within 48-72 hours.",
                },
                {
                  num: "02",
                  title: "GP Result Interpretation Session (60 min)",
                  body: "A full-length GP consultation focused entirely on your results. An explanation of every relevant finding in plain language, what the pattern means for your specific physiology, and the clear action steps that follow.",
                },
                {
                  num: "03",
                  title: "Your Personalised Metabolic Plan",
                  body: "A written plan built from your results: dietary adjustments, activity modifications, supplements with clinical evidence, and any referrals or further investigations if warranted. Delivered within 24 hours of your interpretation session.",
                },
                {
                  num: "04",
                  title: "Fortnightly GP Check-ins (x5, over 90 days)",
                  body: "30-minute video consultations every two weeks. Review of what is working, adjustment of the plan based on how you are responding, and ongoing clinical oversight.",
                },
                {
                  num: "05",
                  title: "Metabolic Reset Guide Included Free",
                  body: "The Veridian Metabolic Reset Guide (usually £19.99) is included with every programme. A 21-day GP-authored practical guide covering nutrition, movement, fasting strategy, and the habits that support metabolic recovery.",
                },
                {
                  num: "06",
                  title: "GLP-1 Eligibility Assessment (if relevant)",
                  body: "For patients who meet clinical criteria, an assessment for GLP-1 receptor agonist prescribing is included within the programme structure.",
                },
              ].map((item, i, arr) => (
                <div
                  key={item.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 24,
                    alignItems: "start",
                    padding: "28px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      border: "1.5px solid var(--go)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--go)", fontFamily: "var(--ff-sans)", letterSpacing: ".06em" }}>{item.num}</span>
                  </div>
                  <div>
                    <p className="cg" style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--sl)", marginBottom: 8 }}>{item.title}</p>
                    <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.85 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">Our commitment</p>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 40 }}>
              Two guarantees. No small print.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ padding: "32px", border: "1.5px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.04)" }}>
                <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 14, fontFamily: "var(--ff-sans)" }}>
                  Complete Picture Guarantee
                </p>
                <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.85 }}>
                  If your panel does not uncover at least three findings that your previous NHS or private testing missed, we will extend your programme by one month at no charge. We are confident in what this testing finds.
                </p>
              </div>
              <div style={{ padding: "32px", border: "1.5px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.04)" }}>
                <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 14, fontFamily: "var(--ff-sans)" }}>
                  Engagement Guarantee
                </p>
                <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.85 }}>
                  If you follow the plan as agreed and do not feel the programme has given you a materially clearer understanding of your metabolic health within 90 days, we will refund the programme component. This has never been claimed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <p className="lbl">Right for you if</p>
                <div className="rule" />
                <ul className="chk">
                  <li>You have had normal blood tests but still feel that something is off</li>
                  <li>You want to understand your cardiovascular and metabolic risk before it becomes a problem</li>
                  <li>You have struggled with energy, weight, mood, or cognition and want a data-led explanation</li>
                  <li>You are approaching midlife and want a clear baseline to track against</li>
                  <li>You want a GP, not a wellness brand, in your corner</li>
                </ul>
              </div>
              <div>
                <p className="lbl">Not right for you if</p>
                <div className="rule" />
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "You are looking for a quick fix or a single supplement recommendation",
                    "You are currently under investigation for a serious acute medical condition",
                    "You are not willing to engage with fortnightly check-ins for 90 days",
                  ].map(item => (
                    <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                      <span style={{ color: "var(--sl3)", marginTop: 2, flexShrink: 0 }}>x</span>
                      <span style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INVESTMENT */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Programme investment</p>
            <div className="rule rule-c" />

            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              <div style={{ padding: "36px 40px", border: "2px solid var(--fo)", flex: "1", minWidth: 240 }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 12, fontFamily: "var(--ff-sans)" }}>Full payment</p>
                <p className="cg" style={{ fontSize: "2.8rem", fontWeight: 500, color: "var(--fo)", lineHeight: 1, marginBottom: 8 }}>£1,895</p>
                <p style={{ fontSize: ".82rem", color: "var(--sl3)" }}>Blood panel included</p>
              </div>
              <div style={{ padding: "36px 40px", border: "1.5px solid rgba(0,0,0,.12)", flex: "1", minWidth: 240 }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 12, fontFamily: "var(--ff-sans)" }}>Spread the cost</p>
                <p className="cg" style={{ fontSize: "2.8rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1, marginBottom: 8 }}>3 x £695</p>
                <p style={{ fontSize: ".82rem", color: "var(--sl3)" }}>Monthly payments over 90 days</p>
              </div>
            </div>

            <Link href={BOOKING_URL} className="btn btn-fo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginBottom: 18 }}>
              Book Your Free Discovery Call
            </Link>
            <p style={{ fontSize: ".82rem", color: "var(--sl3)", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
              The discovery call is 30 minutes with Dr Tosin. It is not a sales call. It is a clinical conversation to confirm the programme is the right fit and to answer your questions. There is no obligation.
            </p>
          </div>
        </section>

        {/* ABOUT DR TOSIN */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 720 }}>
            <p className="lbl">Your GP</p>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>
              Dr Tosin Taiwo
            </h2>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 18 }}>
              UK-qualified GP with a special interest in preventive medicine, metabolic health, and longevity medicine. Veridian Clinic is regulated by the CQC. All clinical services are delivered in compliance with UK medical regulation.
            </p>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 24 }}>
              The Metabolic Turnaround was designed because the gap between what standard testing measures and what meaningful health optimisation requires is too large to ignore. This programme is the bridge.
            </p>
            <Link href="/about" style={{ fontSize: ".88rem", color: "var(--fo)", textDecoration: "underline", fontFamily: "var(--ff-sans)" }}>
              Read more about Dr Tosin
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720 }}>
            <p className="lbl">Questions</p>
            <div className="rule" />
            <div style={{ display: "grid", gap: 24 }}>
              {[
                {
                  q: "Is this available outside London?",
                  a: "Yes. RANDOX blood collection centres are available nationally. GP sessions are delivered by video. You do not need to travel.",
                },
                {
                  q: "What happens if results flag something serious?",
                  a: "Your GP will discuss findings with you directly and arrange appropriate referral or follow-up as clinically indicated. This is part of ongoing GP oversight throughout the programme.",
                },
                {
                  q: "Is this regulated?",
                  a: "Yes. Veridian Clinic is regulated by the Care Quality Commission (CQC). Dr Taiwo is a licensed GP registered with the GMC.",
                },
                {
                  q: "What is the difference between this and a health MOT?",
                  a: "A health MOT is typically a one-off assessment. The Metabolic Turnaround includes interpretation, a personalised plan, and 90 days of ongoing GP-led implementation support. The value is in the follow-through.",
                },
                {
                  q: "Can I use my private health insurance?",
                  a: "Most private health insurance policies do not cover preventive programmes of this kind. We can provide an itemised receipt for tax or accounting purposes if relevant.",
                },
                {
                  q: "Is GLP-1 medication included?",
                  a: "An eligibility assessment is included for patients who meet clinical criteria. Prescribing decisions and any medication costs are separate and subject to clinical assessment.",
                },
              ].map(({ q, a }) => (
                <div key={q} style={{ padding: "24px 0", borderBottom: "1px solid rgba(0,0,0,.07)" }}>
                  <p className="cg" style={{ fontSize: "1rem", fontWeight: 500, color: "var(--sl)", marginBottom: 10 }}>{q}</p>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.85, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="sec bg-fo" style={{ textAlign: "center" }}>
          <div className="wrap" style={{ maxWidth: 680 }}>
            <p className="lbl" style={{ color: "rgba(200,168,75,.7)" }}>Ready to find out what is actually going on?</p>
            <div className="rule rule-c" style={{ background: "rgba(200,168,75,.3)" }} />
            <h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.15, marginBottom: 16 }}>
              Ten places are available per month.
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.7)", lineHeight: 1.9, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
              The discovery call is free and takes 30 minutes.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={BOOKING_URL} className="btn btn-go" target="_blank" rel="noopener noreferrer">
                Book Your Free Discovery Call
              </Link>
              <Link href="/metabolic-quiz" className="btn" style={{ background: "transparent", border: "1.5px solid rgba(246,241,232,.3)", color: "var(--iv)" }}>
                Check Your Metabolic Age Free
              </Link>
            </div>
            <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.4)", marginTop: 20, lineHeight: 1.6 }}>
              Or call 020 3633 9518 Monday to Friday
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
