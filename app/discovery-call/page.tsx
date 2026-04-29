import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "GP Discovery Call | Veridian Clinic",
  description: "A focused 30-minute GP-led review of your metabolic result, your key risk factors, and a personalised clinical pathway recommendation.",
};

const agenda = [
  {
    time: "0–5 min",
    title: "Your quiz result and context",
    body: "We review your metabolic age result, the contributing factors the quiz identified, and any symptoms or history you want to bring to the conversation.",
  },
  {
    time: "5–15 min",
    title: "Clinical risk mapping",
    body: "Dr Taiwo walks through your likely metabolic blind spots — the markers that don't show up in lifestyle questions but are often the first to drift in people who appear healthy.",
  },
  {
    time: "15–25 min",
    title: "Pathway recommendation",
    body: "Based on your picture, we recommend the most appropriate next step — whether that's a targeted blood panel, the Veridian Baseline, or the Metabolic Screen — and explain exactly why.",
  },
  {
    time: "25–30 min",
    title: "Questions and written follow-up",
    body: "You ask anything. Within 24 hours you receive a written summary of the call, the recommended pathway, and what to do next — with no obligation to proceed.",
  },
];

const faqs = [
  {
    q: "Is this a sales call?",
    a: "No. It is a clinical consultation run by a GP. You will receive a genuine medical opinion on your metabolic picture. Whether you proceed with any further testing is entirely your choice.",
  },
  {
    q: "What if I haven't taken the quiz?",
    a: "You can still book. The call is useful for anyone who wants to understand their metabolic health picture before committing to a full assessment. We'll cover the same ground.",
  },
  {
    q: "Who runs the call?",
    a: "Dr Tosin Taiwo — a UK-registered GP with a specific focus on metabolic health, longevity medicine, and early clinical intervention.",
  },
  {
    q: "What happens after?",
    a: "Within 24 hours you receive a written summary: your key risk areas, the recommended next step, and pricing if you choose to proceed. No pressure, no follow-up calls unless you request them.",
  },
  {
    q: "Will I be pushed towards the most expensive option?",
    a: "No. The recommendation is based on your clinical picture. For some people, the Metabolic Screen (£195) is the right first move. For others, the full Baseline is more appropriate. We will tell you which and why.",
  },
];

export default function DiscoveryCallPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,400px),1fr))", gap: 56, alignItems: "start" }}>
              <div>
                <p className="lbl a1">GP-Led Consultation</p>
                <div className="rule a1" />
                <h1 className="cg a2" style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 16 }}>
                  30 minutes. A real clinical opinion. A clear next step.
                </h1>
                <p className="a3" style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 24 }}>
                  The discovery call is not a sales conversation. It is a focused GP-led review of your metabolic picture, your quiz result, and the markers most likely to explain what you're experiencing — with a written pathway recommendation within 24 hours.
                </p>
                <div style={{ padding: "18px 20px", background: "var(--iv2)", borderLeft: "3px solid var(--go)", marginBottom: 28 }}>
                  <p style={{ fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.85 }}>
                    <strong style={{ color: "var(--fo)" }}>CQC regulated.</strong> Clinical services are delivered under the umbrella of Thanksdoc (thanksdoc.co.uk), a registered CQC provider.
                  </p>
                </div>
                <div className="badge-row a4" style={{ flexWrap: "wrap" }}>
                  <span className="badge">30 Minutes</span>
                  <span className="badge">GP-Led</span>
                  <span className="badge">Written Follow-Up</span>
                  <span className="badge">No Obligation</span>
                </div>
              </div>

              {/* Pricing card */}
              <div className="card a2" style={{ padding: "clamp(24px,5vw,44px)" }}>
                <p className="lbl" style={{ marginBottom: 16 }}>Book your call</p>

                <div style={{ padding: "20px 22px", background: "var(--fo)", marginBottom: 16 }}>
                  <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
                    Standard Rate
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="cg" style={{ fontSize: "2.4rem", fontWeight: 500, color: "var(--go)" }}>£195</span>
                  </div>
                  <p style={{ fontSize: ".84rem", color: "rgba(246,241,232,.7)", lineHeight: 1.8, marginTop: 8, marginBottom: 16 }}>
                    GP-led 30-minute consultation, written summary within 24 hours, pathway recommendation.
                  </p>
                  <Link href="/book?tier=discovery" className="btn btn-go btn-full">
                    Book Discovery Call →
                  </Link>
                </div>

                <div style={{ padding: "16px 18px", background: "var(--iv2)", border: "1px solid rgba(200,168,75,.3)", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", background: "var(--go)", color: "var(--fo)", padding: "2px 8px" }}>
                      QUIZ TAKER RATE
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                    <span className="cg" style={{ fontSize: "1.8rem", fontWeight: 500, color: "var(--fo)" }}>£97</span>
                    <span style={{ fontSize: ".88rem", color: "var(--sl3)", textDecoration: "line-through" }}>£195</span>
                    <span style={{ fontSize: ".78rem", color: "var(--sl2)", fontWeight: 500 }}>Save £98</span>
                  </div>
                  <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.75, marginBottom: 12 }}>
                    If you arrived here from the metabolic quiz, your result already gives us a clinical starting point — the call is shorter and more targeted as a result.
                  </p>
                  <Link href="/book?tier=discovery&ref=quiz-high-risk" className="btn btn-fo btn-full">
                    Book at Quiz Rate — £97 →
                  </Link>
                </div>

                <p style={{ fontSize: ".74rem", color: "var(--sl3)", textAlign: "center", lineHeight: 1.6 }}>
                  Virtual. UK patients only. Payment processed securely via Stripe.
                  <br />May appear as "Olympus Premium Health" on bank statements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What happens in the call */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="sh text-center">
              <p className="lbl">The Agenda</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">What happens in the 30 minutes</h2>
              <p className="sh-body">Structured, efficient, and clinically focused. Every minute is purposeful.</p>
            </div>
            <div style={{ display: "grid", gap: 2 }}>
              {agenda.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 24, padding: "28px 0", borderBottom: i < agenda.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none", alignItems: "start" }}>
                  <div style={{ paddingTop: 4 }}>
                    <span style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--go)", background: "rgba(200,168,75,.1)", padding: "4px 8px", display: "inline-block" }}>
                      {item.time}
                    </span>
                  </div>
                  <div>
                    <h3 className="cg" style={{ fontSize: "1.1rem", fontWeight: 500, color: "var(--sl)", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you receive */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="sh text-center">
              <p className="lbl">After the call</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">What you receive within 24 hours</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,260px),1fr))", gap: 16 }}>
              {[
                { title: "Written clinical summary", body: "A clear summary of the key risk areas identified during the call and what they mean for your health trajectory." },
                { title: "Specific panel recommendation", body: "The exact blood panel we recommend — whether that's the Metabolic Screen, the Baseline, or the Longevity Panel — and why." },
                { title: "Pathway options and pricing", body: "Transparent pricing for the recommended next step, with no pressure to proceed. You choose if and when." },
                { title: "Priority booking access", body: "If you decide to proceed with a full assessment, you receive priority booking as a discovery call patient." },
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: "24px 20px" }}>
                  <div style={{ width: 32, height: 32, background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <svg width="16" height="16" viewBox="0 0 34 34" fill="none">
                      <path d="M8 17l5 5 13-13" stroke="var(--go2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--sl)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: ".86rem", color: "var(--sl2)", lineHeight: 1.85 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">Common Questions</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">What people ask before booking</h2>
            </div>
            <div style={{ display: "grid", gap: 0 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--sl)", marginBottom: 10 }}>{faq.q}</h3>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What comes next — pathway ladder */}
        <section className="sec bg-fo">
          <div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}>
            <p className="lbl" style={{ color: "var(--go2)" }}>After your discovery call</p>
            <div className="rule rule-c" style={{ background: "var(--go)" }} />
            <h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.25, marginBottom: 14 }}>
              Three pathways. One will fit.
            </h2>
            <p style={{ fontSize: ".95rem", color: "rgba(246,241,232,.7)", lineHeight: 1.9, maxWidth: 620, margin: "0 auto 32px" }}>
              Based on the call, we recommend the right entry point. Most patients start with the Metabolic Screen or Baseline. The Longevity Panel is for those who want the complete picture.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,220px),1fr))", gap: 12, marginBottom: 28 }}>
              {[
                { name: "Metabolic Screen", price: "£195", desc: "Targeted TATT panel — thyroid, iron, insulin, CRP, B12, Vitamin D. GP-reviewed report." },
                { name: "Metabolic Baseline", price: "£595", desc: "60+ markers including ApoB, metabolic syndrome hormones. Full GP consultation + protocol.", highlight: true },
                { name: "Longevity Panel", price: "£795", desc: "150+ markers. Hormones, Omega-3 index, gut, pancreatic. Full GP consultation + report." },
              ].map((p, i) => (
                <div key={i} style={{ padding: "20px 18px", background: p.highlight ? "rgba(200,168,75,.15)" : "rgba(246,241,232,.07)", border: p.highlight ? "1px solid rgba(200,168,75,.4)" : "1px solid rgba(246,241,232,.1)", textAlign: "left" }}>
                  <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--go)", marginBottom: 6 }}>
                    {p.highlight ? "Most Popular" : "Available"}
                  </p>
                  <p className="cg" style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--iv)", marginBottom: 4 }}>{p.name}</p>
                  <p style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--go)", marginBottom: 10 }}>{p.price}</p>
                  <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.65)", lineHeight: 1.8 }}>{p.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/book?tier=discovery" className="btn btn-go">
              Book Discovery Call →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
