"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const DISCOVERY_QUIZ_BOOKING = "https://notes.thanksdoc.co.uk/book/service/136/36";

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get("name") || "";
  const quizRate = params.get("rate") === "quiz";

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Confirmation block */}
        <section className="sec bg-iv" style={{ paddingBottom: 48 }}>
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <div
              className="a1"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(200,168,75,.1)",
                border: "1.5px solid var(--go)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11l5 5 9-9" stroke="var(--go)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="lbl a2">Confirmed</p>
            <div className="rule rule-c a2" />
            <h1
              className="cg a2"
              style={{
                fontSize: "clamp(2rem,5vw,3.4rem)",
                fontWeight: 500,
                color: "var(--sl)",
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              {name
                ? `${name}, your scorecard is on its way.`
                : "Your scorecard is on its way."}
            </h1>
            <p
              className="a3"
              style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 24 }}
            >
              We've emailed your personalised metabolic score breakdown and next-step guidance.
            </p>
            <div
              className="a3"
              style={{
                padding: "14px 22px",
                background: "rgba(200,168,75,.07)",
                borderLeft: "3px solid var(--go)",
                textAlign: "left",
                display: "inline-block",
                maxWidth: 520,
              }}
            >
              <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                <strong style={{ color: "var(--sl)" }}>Check your inbox.</strong>{" "}
                If it doesn't arrive within 5 minutes, check your spam folder and add support@veridianclinic.com to your contacts.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz-rate booking handoff */}
        {quizRate && (
          <section className="sec bg-fo" style={{ paddingTop: 8, paddingBottom: 48 }}>
            <div className="wrap" style={{ maxWidth: 620 }}>
              <div style={{ padding: "clamp(24px,5vw,40px)", background: "rgba(200,168,75,.08)", border: "1.5px solid var(--go)", textAlign: "center" }}>
                <p style={{ fontSize: ".66rem", color: "var(--go)", letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
                  Quiz rate unlocked
                </p>
                <h2 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.3rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 12 }}>
                  Book your GP Discovery Call for £77
                </h2>
                <p style={{ fontSize: ".92rem", color: "rgba(246,241,232,.75)", lineHeight: 1.85, marginBottom: 20 }}>
                  A 30-minute GP-led review of your result and a personalised pathway. At the review step of booking, enter the code below to get your quiz-taker rate.
                </p>
                <div style={{ display: "inline-block", padding: "12px 26px", background: "var(--go)", marginBottom: 22 }}>
                  <span style={{ fontSize: ".72rem", color: "rgba(44,42,38,.7)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 2 }}>Your code</span>
                  <span className="cg" style={{ fontSize: "1.6rem", fontWeight: 600, color: "var(--fo)", letterSpacing: ".12em" }}>QUIZRATE</span>
                </div>
                <a href={DISCOVERY_QUIZ_BOOKING} target="_blank" rel="noopener noreferrer" className="btn btn-go btn-full">
                  Book my £77 Discovery Call →
                </a>
                <p style={{ fontSize: ".74rem", color: "rgba(246,241,232,.5)", lineHeight: 1.7, marginTop: 14 }}>
                  £97 standard · £77 with code QUIZRATE · applied at checkout. Secure payment via ThanksDoc.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Free guide offer */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="text-center" style={{ marginBottom: 40 }}>
              <p className="lbl">Want the practical next step?</p>
              <div className="rule rule-c" />
              <h2
                className="cg"
                style={{
                  fontSize: "clamp(1.9rem,4vw,2.9rem)",
                  fontWeight: 500,
                  color: "var(--sl)",
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                The Metabolic Reset Guide Free
              </h2>
              <p
                style={{
                  fontSize: ".97rem",
                  color: "var(--sl2)",
                  lineHeight: 1.95,
                  maxWidth: 620,
                  margin: "0 auto",
                }}
              >
                A doctor-led practical guide for people who want to start improving the hidden drivers of weight gain, poor energy, and metabolic stress now. No payment, just your email.
              </p>
            </div>

            <div className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 22 }}>
                <span
                  className="cg"
                  style={{ fontSize: "2.8rem", fontWeight: 400, color: "var(--fo)", lineHeight: 1 }}
                >
                  Free
                </span>
                <span style={{ fontSize: ".88rem", color: "var(--sl3)" }}>instant download · no payment</span>
              </div>

              <ul className="chk" style={{ marginBottom: 28 }}>
                <li>Understand what may be driving your metabolism right now</li>
                <li>Simple first actions for food, movement, sleep, and recovery</li>
                <li>Know which markers matter most and why</li>
                <li>Prepare properly before deeper clinical work</li>
                <li>Designed by a GP with a longevity and metabolic focus</li>
              </ul>

              <Link href="/metabolic-reset-guide" className="btn btn-fo btn-full" style={{ marginBottom: 14 }}>
                Get the Free Guide →
              </Link>
              <p
                style={{
                  fontSize: ".78rem",
                  color: "var(--sl3)",
                  lineHeight: 1.7,
                  textAlign: "center",
                }}
              >
                This is optional. Your free scorecard is already on its way.
              </p>
            </div>
          </div>
        </section>

        {/* Lower navigation */}
        <section style={{ padding: "36px 24px", textAlign: "center", background: "var(--iv)" }}>
          <div className="wrap">
            <p style={{ fontSize: ".88rem", color: "var(--sl3)", lineHeight: 1.9 }}>
              Not ready for the guide yet?{" "}
              <Link href="/" style={{ color: "var(--fo)", textDecoration: "underline" }}>
                Return to Veridian
              </Link>
              {" "}or{" "}
              <Link href="/assessments" style={{ color: "var(--fo)", textDecoration: "underline" }}>
                explore our clinical assessments
              </Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
