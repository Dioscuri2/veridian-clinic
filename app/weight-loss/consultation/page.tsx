"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const THANKSDOC_URL = process.env.NEXT_PUBLIC_THANKSDOC_BOOKING_URL || "https://notes.thanksdoc.co.uk/book/clinic/veridian";

function Shield() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1.2L2 4.2v3.5c0 2.8 2.1 5 5.5 5.8 3.4-.8 5.5-3 5.5-5.8V4.2z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".7"/>
      <path d="M5 7.5l1.7 1.7 2.8-2.8" stroke="var(--go)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ConsultationContent() {
  const params = useSearchParams();
  const isQuizRate = params.get("quiz") === "1";

  // Also check for quiz cookie
  const [hasQuizCookie, setHasQuizCookie] = useState(false);
  useEffect(() => {
    const hasCookie = document.cookie.split(";").some(c => c.trim().startsWith("wl_quiz="));
    setHasQuizCookie(hasCookie);
  }, []);

  const quizRate = isQuizRate || hasQuizCookie;
  const price = quizRate ? "£48" : "£60";
  const priceLabel = quizRate ? "Quiz rate" : "Standard rate";
  const bookingUrl = quizRate ? "https://notes.thanksdoc.co.uk/book/service/138/36" : THANKSDOC_URL;

  return (
    <>
      <style>{FONTS + CSS}</style>
      <style>{`
        .wl-grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: start; }
        @media (min-width: 900px) { .wl-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
      `}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* ── Header ── */}
        <section className="sec bg-fo" style={{ paddingTop: 56, paddingBottom: 64 }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            {quizRate && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,.15)", border: "1px solid var(--go)", padding: "5px 14px", marginBottom: 20 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 2.9L10 4.4l-2 1.9.5 2.8L6 7.9l-2.5 1.2.5-2.8L2 4.4l2.8-.5Z" fill="#c8a84b"/></svg>
                <span style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--go)" }}>Quiz rate applied</span>
              </div>
            )}
            <p className="lbl">Weight loss consultation</p>
            <div className="rule" />
            <h1 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 16 }}>
              15-Minute Private Consultation
              <br />
              <em style={{ fontStyle: "italic", color: "var(--go)" }}>with Dr Tosin</em>
            </h1>
            <p style={{ fontSize: ".96rem", color: "rgba(246,241,232,.7)", lineHeight: 1.9, maxWidth: 560 }}>
              A focused 15-minute clinical assessment for adults seeking a GLP-1 weight loss medicine. Dr Tosin reviews your case, selects the right medicine for your profile, and issues a private prescription if appropriate.
            </p>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section className="sec bg-iv">
          <div className="wrap wl-grid" style={{ maxWidth: 900 }}>

            {/* Left, what's included */}
            <div>
              <h2 className="cg" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--fo)", marginBottom: 20 }}>What this consultation covers</h2>
              {[
                { title: "Full medical history review", detail: "Dr Tosin reviews your weight history, medical conditions, current medications, and relevant family history before any prescribing decision." },
                { title: "Medicine selection", detail: "Tirzepatide (Mounjaro) or semaglutide (Wegovy), Dr Tosin selects based on your diabetes status, other conditions, and personal profile." },
                { title: "Safety and contraindication check", detail: "Comprehensive review of all contraindications including thyroid history, pancreatitis, kidney function, and interactions with your current medicines." },
                { title: "Dose titration plan", detail: "A clear, personalised plan for starting dose and escalation schedule, including what to expect at each stage and how to manage side effects." },
                { title: "Private prescription", detail: "If clinically appropriate, Dr Tosin issues a private prescription you can take to any registered UK pharmacy or an online pharmacy." },
                { title: "Written clinical summary", detail: "A written post-consultation summary with your agreed plan, monitoring schedule, and when to return for review." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
                  <div style={{ width: 22, height: 22, border: "1px solid var(--go)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: ".55rem", color: "var(--go)", fontWeight: 700 }}>✓</div>
                  <div>
                    <p style={{ fontSize: ".88rem", fontWeight: 600, color: "var(--fo)", marginBottom: 3 }}>{item.title}</p>
                    <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.7 }}>{item.detail}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 28, padding: "16px 20px", background: "var(--iv2)", borderLeft: "2px solid var(--go)" }}>
                <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 6 }}>About Dr Tosin</p>
                <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.75 }}>
                  Dr Oluwatosin Taiwo is a UK-registered GP (GMC registered). He leads all Veridian consultations personally. Clinical services are delivered through ThanksDoc, a CQC-registered clinical framework.
                </p>
              </div>
            </div>

            {/* Right, booking form */}
            <div>
              <div className="card" style={{ padding: "32px 28px" }}>
                {/* Price block */}
                <div style={{ padding: "18px 20px", background: "var(--fo)", marginBottom: 24 }}>
                  <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(246,241,232,.5)", marginBottom: 4 }}>{priceLabel}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--iv)", lineHeight: 1 }}>{price}</span>
                    {quizRate && <span style={{ fontSize: ".88rem", color: "rgba(246,241,232,.4)", textDecoration: "line-through" }}>£60</span>}
                  </div>
                  <p style={{ fontSize: ".76rem", color: "rgba(246,241,232,.55)", marginTop: 4 }}>15-minute virtual consultation · Video call</p>
                </div>

                {quizRate && (
                  <div style={{ padding: "12px 14px", background: "rgba(200,168,75,.1)", border: "1px solid var(--go)", marginBottom: 16, textAlign: "center" }}>
                    <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.6 }}>
                      At the review step, enter code <strong style={{ color: "var(--fo)", letterSpacing: ".06em" }}>WLQUIZRATE</strong> for your £48 rate.
                    </p>
                  </div>
                )}

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-fo btn-full"
                  style={{ display: "block", textAlign: "center", marginBottom: 12 }}
                >
                  Book consultation, {price}
                </a>

                <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginBottom: 16 }}>
                  <Shield />
                  <span style={{ fontSize: ".72rem", color: "var(--sl3)" }}>Secure payment via ThanksDoc</span>
                </div>

                <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    "Video call, accessible from any device",
                    "Confirmation email with call link sent immediately",
                    "Dr Tosin contacts you to confirm your appointment time",
                  ].map(t => (
                    <div key={t} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: ".65rem", color: "var(--go)", fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: ".78rem", color: "var(--sl2)", lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>

                {!quizRate && (
                  <div style={{ marginTop: 18, padding: "12px 14px", background: "var(--iv2)", borderLeft: "2px solid var(--go)" }}>
                    <p style={{ fontSize: ".76rem", color: "var(--sl2)", lineHeight: 1.6 }}>
                      Complete the <Link href="/weight-loss#quiz" style={{ color: "var(--fo)", fontWeight: 700, textDecoration: "underline" }}>free eligibility quiz</Link> to unlock the £48 quiz rate.
                    </p>
                  </div>
                )}
              </div>

              <p style={{ fontSize: ".72rem", color: "var(--sl3)", marginTop: 14, lineHeight: 1.7, textAlign: "center" }}>
                Not medical advice. Prescribing is subject to clinical assessment. This service is not suitable for pregnant or breastfeeding patients. Always inform your registered GP of any private prescription.
              </p>
            </div>
          </div>
        </section>

        {/* ── Responsive mobile stack fix ── */}
        <style>{`
          @media (max-width: 640px) {
            .wrap > div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

      </main>
      <Footer />
    </>
  );
}

export default function WeightLossConsultationPage() {
  return (
    <Suspense fallback={null}>
      <ConsultationContent />
    </Suspense>
  );
}
