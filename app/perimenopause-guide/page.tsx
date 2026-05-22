"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const SYMPTOMS = [
  "Weight gathering around your middle — despite no change in what you eat or how much you move",
  "Waking between 2am and 4am, often with your heart racing, body hot, or mind already spinning",
  "Concentration not what it was — losing words mid-sentence, forgetting things you'd never have forgotten",
  "Mood dropping sharply before your period, or seemingly at random, in a way that doesn't feel like you",
  "Cycles changing: shorter, longer, heavier, or arriving when you least expect them",
  "Anxiety that feels physical and newer — different from anything you've experienced before",
  "A GP told you your bloods are 'normal' — but nothing about this feels normal",
  "You've started wondering whether this is just stress, or whether something has fundamentally shifted",
];

const CLINICAL_FACTS = [
  {
    heading: "Perimenopause starts earlier than anyone tells you",
    body: "Average onset is 40–44. It can begin in the mid-30s. The hormonal shift that drives every symptom you're experiencing starts years — sometimes a decade — before your period stops. Most women aren't told this.",
  },
  {
    heading: "'Normal' bloods don't mean 'optimal for you'",
    body: "Standard reference ranges are population averages, not your personal baseline. Oestrogen can fluctuate dramatically within the 'normal' band and still drive weight gain, broken sleep, and mood shifts. Normal on paper is not the same as normal for you.",
  },
  {
    heading: "Most symptoms are metabolic — not just hormonal",
    body: "Oestrogen directly regulates insulin sensitivity, fat distribution, sleep architecture, and neurotransmitter balance. When it shifts, so does your entire metabolic environment. This is why lifestyle changes that worked at 35 no longer work the same way at 42.",
  },
];

const WHAT_IS_INSIDE = [
  { title: "The Perimenopause Window", body: "A plain-language explanation of what's happening hormonally — oestrogen fluctuation, progesterone decline, and the cascade effect on every system that depends on them." },
  { title: "Your Metabolic Shift", body: "Why weight now accumulates differently, particularly abdominally. The oestrogen–insulin connection explained. Why the approach that worked at 35 won't work the same way now." },
  { title: "Eating for Hormonal Balance", body: "A protein-first plate framework, phytoestrogen-rich foods, and what to reduce. UK supermarket-friendly. No elimination diets, no unsustainable restriction." },
  { title: "Sleep & the Hormonal Loop", body: "How falling oestrogen disrupts sleep architecture and worsens night sweats. Evidence-based evening protocols designed for this specific hormonal environment." },
  { title: "Movement That Works Now", body: "Resistance training for bone density and insulin sensitivity. Three tiers from low to high activity. Why cardio alone is not enough — and what to do instead." },
  { title: "Supplement Stack", body: "Magnesium glycinate, Vitamin D3/K2, Omega-3, and adaptogenic support. Clinical context for each — what the evidence actually says, not what wellness brands say." },
  { title: "Symptom & Cycle Tracker", body: "A printable one-page tracker for hot flushes, mood, energy, cycle length, and sleep quality — so you arrive at any clinical appointment with data, not just a vague sense that something is wrong." },
  { title: "When to Seek Clinical Assessment", body: "Red flags that warrant urgent review. What blood tests to ask for, what the results mean, and how to have the HRT conversation with confidence." },
];

const OUTCOMES = [
  "Exactly which hormonal changes are driving each symptom you're experiencing — and why",
  "How to eat to support oestrogen clearance and reduce the insulin resistance that's driving the weight",
  "Which supplements have real clinical evidence behind them and the correct form and dose",
  "Which blood tests to request, what 'normal' ranges actually mean for you, and what to push back on",
  "When lifestyle intervention is enough — and when to seek HRT or specialist assessment",
];

const FAQS = [
  {
    q: "Why is the guide free?",
    a: "Because getting the right information into the right hands matters more than the £9.99. Dr Tosin believes every woman in perimenopause deserves to understand what's happening to her body — and to arrive at any clinical appointment informed. The guide is free. If you want deeper support — your hormone panel or a clinical review — those are available when you're ready.",
  },
  {
    q: "Is this just another wellness guide?",
    a: "No. It's written by a practising GP and grounded in clinical evidence, not trends. There are no detox protocols, no miracle supplements, and no generic advice that could apply to anyone. Every section is built around the specific hormonal biology of perimenopause.",
  },
  {
    q: "I'm already on HRT. Is this still relevant?",
    a: "Yes. HRT addresses the hormonal deficit, but it doesn't automatically fix insulin resistance, poor sleep habits, nutritional gaps, or bone density decline. The guide works alongside HRT — or without it.",
  },
  {
    q: "My symptoms feel quite severe. What if I need more than a guide?",
    a: "The guide includes a red flags section and clear guidance on when symptoms require urgent clinical assessment. If you need clinical depth, Veridian's blood panel and discounted consultation pathway is there. The guide tells you exactly when to escalate.",
  },
  {
    q: "Will this tell me whether I need HRT?",
    a: "Not directly — that's a clinical decision between you and your doctor. What it does is give you the understanding and vocabulary to have that conversation from an informed position, rather than walking in uncertain about what you're experiencing.",
  },
];

function EmailForm({ dark = false }: { dark?: boolean }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle: React.CSSProperties = {
    padding: "13px 16px",
    fontSize: ".95rem",
    fontFamily: "inherit",
    border: `1.5px solid ${dark ? "rgba(200,168,75,.3)" : "rgba(0,0,0,.15)"}`,
    background: dark ? "rgba(255,255,255,.06)" : "#fff",
    color: dark ? "var(--iv)" : "var(--sl)",
    outline: "none",
    borderRadius: 2,
    width: "100%",
    boxSizing: "border-box" as const,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/peri-guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      window.location.href = "/perimenopause-guide/thank-you";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          style={inputStyle}
          aria-label="First name"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
          aria-label="Email address"
        />
      </div>
      {error && <p style={{ fontSize: ".82rem", color: dark ? "#f88" : "#c94a4a", margin: 0 }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-go"
        style={{ padding: "15px 32px", fontSize: ".95rem", opacity: loading ? 0.65 : 1, cursor: loading ? "default" : "pointer" }}
      >
        {loading ? "Sending…" : "Get the Free Guide →"}
      </button>
      <p style={{ fontSize: ".72rem", color: dark ? "rgba(246,241,232,.38)" : "var(--sl3)", lineHeight: 1.7, margin: 0 }}>
        No payment. No spam. Instant PDF download on the next page.
      </p>
    </form>
  );
}

export default function PerimenopauseGuidePage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* ── Hero ── */}
        <section className="sec bg-fo" style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center", paddingTop: 64, paddingBottom: 72 }}>
          <div className="wrap" style={{ maxWidth: 1020 }}>
            <div style={{ display: "flex", gap: "clamp(40px,8vw,80px)", alignItems: "center", flexWrap: "wrap" }}>

              {/* Left — text + email form */}
              <div style={{ flex: "1 1 340px", minWidth: 300 }}>
                <p className="lbl a1" style={{ color: "var(--go)", letterSpacing: ".18em" }}>GP-Authored · Women 35–52 · Free Instant Download</p>
                <div className="rule a1" style={{ background: "var(--go)", width: 48, height: 2, margin: "14px 0 22px" }} />
                <h1 className="cg a2" style={{ fontSize: "clamp(2.2rem,5.5vw,3.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.1, marginBottom: 20 }}>
                  The Perimenopause Reset
                </h1>
                <p className="cg a2" style={{ fontSize: "clamp(1.15rem,2.5vw,1.55rem)", fontStyle: "italic", color: "var(--go)", lineHeight: 1.4, marginBottom: 18 }}>
                  A Six-Week Guide to Reclaim Your Sleep, Brain and Body
                </p>
                <p className="a3" style={{ fontSize: ".97rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9, marginBottom: 32 }}>
                  A structured blueprint for women 35–52 dealing with brain fog, broken sleep, anxiety and stubborn mid-section weight — written by a practising UK GP. <strong style={{ color: "var(--go2)" }}>Free.</strong>
                </p>

                <div className="a4">
                  <EmailForm dark />
                  <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
                    {["6-Week Plan", "Daily Checklists", "Supplement Guide", "GP-Written"].map(b => (
                      <span key={b} style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--go)", border: "1px solid rgba(200,168,75,.3)", padding: "4px 10px" }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — 3D book mockup */}
              <div className="a3" style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ position: "relative", width: "clamp(240px,32vw,360px)" }}>
                  <div style={{ position: "absolute", inset: "-20%", background: "radial-gradient(ellipse at 60% 50%, rgba(200,168,75,.18) 0%, rgba(20,82,38,.12) 50%, transparent 75%)", filter: "blur(24px)", pointerEvents: "none", zIndex: 0 }} />
                  <div style={{ position: "absolute", left: 0, top: "2%", width: "8%", height: "96%", background: "linear-gradient(to right, #0a1812, #1a3a2e)", transform: "rotateY(60deg) translateX(-50%)", transformOrigin: "right center", borderRadius: "2px 0 0 2px", boxShadow: "-8px 0 20px rgba(0,0,0,.7)", zIndex: 1 }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/perimenopause-cover.jpg"
                    alt="The Perimenopause Reset Guide — Dr Tosin Taiwo"
                    style={{ width: "100%", display: "block", borderRadius: "0 5px 5px 0", transform: "perspective(900px) rotateY(-14deg) rotateX(3deg)", boxShadow: "28px 28px 80px rgba(0,0,0,.75), -4px 4px 18px rgba(0,0,0,.4), 0 0 60px rgba(200,168,75,.08)", transformOrigin: "left center", position: "relative", zIndex: 1 }}
                  />
                  {/* FREE badge */}
                  <div style={{ position: "absolute", bottom: "8%", right: "-8%", background: "var(--go)", color: "var(--fo)", padding: "10px 16px", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", boxShadow: "0 6px 24px rgba(0,0,0,.4)", zIndex: 2, lineHeight: 1.3, textAlign: "center" }}>
                    <span style={{ fontSize: "1.4rem", display: "block", letterSpacing: 0, fontFamily: "Georgia, serif" }}>FREE</span>
                    Instant PDF
                  </div>
                  <div style={{ position: "absolute", bottom: "-10%", left: "5%", right: "5%", height: "20%", background: "linear-gradient(to bottom, rgba(246,241,232,.07), transparent)", transform: "perspective(900px) rotateX(-30deg) scaleY(-1) rotateY(-14deg)", transformOrigin: "top center", filter: "blur(5px)", pointerEvents: "none", zIndex: 1 }} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Does this sound familiar? ── */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="sh text-center">
              <p className="lbl">Does this sound familiar?</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">If you're nodding at more than three of these, this guide is for you.</h2>
            </div>
            <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
              <ul className="chk" style={{ gap: 4 }}>
                {SYMPTOMS.map((s) => (
                  <li key={s} style={{ paddingBottom: 14, borderBottom: "1px solid rgba(0,0,0,.06)", marginBottom: 2, fontSize: ".92rem", lineHeight: 1.75 }}>{s}</li>
                ))}
              </ul>
              <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,.06)" }}>
                These are not signs of ageing, weakness, or stress. They are signs of a specific hormonal transition that has a name, a mechanism, and — crucially — a response.
              </p>
            </div>
          </div>
        </section>

        {/* ── Clinical facts ── */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 980 }}>
            <div className="sh text-center">
              <p className="lbl">What most women aren't told</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Three things that change everything.</h2>
            </div>
            <div className="g3">
              {CLINICAL_FACTS.map((f) => (
                <div key={f.heading} className="card">
                  <div style={{ width: 36, height: 2, background: "var(--go)", marginBottom: 20 }} />
                  <h3 className="cg" style={{ fontSize: "clamp(1.3rem,2.5vw,1.7rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 14 }}>{f.heading}</h3>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's inside ── */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 980 }}>
            <div className="sh text-center">
              <p className="lbl">What's inside</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">The conversation your GP didn't have 90 minutes for.</h2>
              <p className="sh-body">Eight clinically-grounded chapters covering every domain that shifts during perimenopause — hormones, metabolism, sleep, nutrition, movement, and clinical next steps.</p>
            </div>
            <div className="g3">
              {WHAT_IS_INSIDE.map((item, i) => (
                <div key={item.title} className="card">
                  <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", color: "var(--go)", marginBottom: 10, textTransform: "uppercase" }}>Chapter {i + 1}</p>
                  <p className="lbl" style={{ marginBottom: 10, fontSize: ".78rem" }}>{item.title}</p>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9 }}>{item.body}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <p style={{ fontSize: "1.05rem", color: "var(--sl2)", marginBottom: 24 }}>Enter your email — get the full guide instantly. No payment, no subscription.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <EmailForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Author credibility ── */}
        <section className="sec bg-fo">
          <div className="wrap" style={{ maxWidth: 780 }}>
            <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(200,168,75,.15)", border: "1.5px solid var(--go)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="cg" style={{ fontSize: "2rem", color: "var(--go)", fontWeight: 400 }}>T</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p className="lbl" style={{ color: "var(--go)", marginBottom: 8 }}>Written by</p>
                <h3 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 14 }}>Dr Tosin Taiwo, GP</h3>
                <p style={{ fontSize: ".9rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9, marginBottom: 16 }}>
                  "In a standard appointment I have seven minutes. Perimenopause deserves far more than that. I wrote this guide for every patient who left my consulting room with answers that still didn't add up — and for every woman who hasn't yet made it through the door."
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span className="badge" style={{ background: "rgba(200,168,75,.12)", borderColor: "rgba(200,168,75,.3)", color: "var(--go2)" }}>MRCGP</span>
                  <span className="badge" style={{ background: "rgba(200,168,75,.12)", borderColor: "rgba(200,168,75,.3)", color: "var(--go2)" }}>CQC Regulated</span>
                  <span className="badge" style={{ background: "rgba(200,168,75,.12)", borderColor: "rgba(200,168,75,.3)", color: "var(--go2)" }}>Veridian Clinic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What you'll know ── */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">What you'll know by the end</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Specific answers. Not vague reassurance.</h2>
            </div>
            <div className="card">
              <ul className="chk">
                {OUTCOMES.map((o) => (
                  <li key={o} style={{ paddingBottom: 14, borderBottom: "1px solid rgba(0,0,0,.06)", marginBottom: 2, fontSize: ".92rem", lineHeight: 1.75 }}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Safety note ── */}
        <section style={{ background: "var(--iv2)", padding: "28px var(--pad)" }}>
          <div className="wrap" style={{ maxWidth: 720 }}>
            <p style={{ fontSize: ".8rem", color: "var(--sl3)", lineHeight: 1.8, textAlign: "center" }}>
              <strong style={{ color: "var(--sl2)" }}>Safety note:</strong> This guide is for informational and educational purposes and does not replace professional medical advice. If you are on HRT, thyroid medication, insulin, or have a history of hormone-sensitive conditions, consult your clinician before making dietary or supplementation changes. The red flags section within the guide outlines when to seek urgent clinical review.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">Common questions</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Before you decide</h2>
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {FAQS.map((faq) => (
                <div key={faq.q} className="card">
                  <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 10, lineHeight: 1.5 }}>{faq.q}</p>
                  <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.9 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="sec bg-fo" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div className="wrap" style={{ maxWidth: 700, textAlign: "center" }}>
            <p className="lbl a1" style={{ color: "var(--go)" }}>The Perimenopause Reset Guide</p>
            <div className="rule rule-c" style={{ background: "var(--go)" }} />
            <h2 className="cg a2" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.15, marginBottom: 20 }}>
              You've been managing this alone long enough.
            </h2>
            <p className="a3" style={{ fontSize: ".97rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, maxWidth: 540, margin: "0 auto 36px" }}>
              A GP-authored clinical framework, a symptom tracker, a supplement guide with evidence, and a clear pathway to the clinical support that's right for you. It's free. Enter your email and download it now.
            </p>
            <div className="a4" style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
