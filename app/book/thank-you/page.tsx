"use client";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FONTS, CSS } from "@/components/globalStyles";
const THANKSDOC_URL = process.env.NEXT_PUBLIC_THANKSDOC_BOOKING_URL || "https://notes.thanksdoc.co.uk/book/clinic/veridian";

const REVIEW_TIERS = ["discovery", "discovery-quiz", "wl-consultation", "wl-consultation-quiz"];
const BLOOD_TEST_TIERS = ["metabolic-screen", "womens-hormones", "mens-testosterone", "cardiovascular-risk", "fatigue-energy", "metabolic-weight", "optimiser-baseline"];

function PixelPurchase() {
  const params = useSearchParams();
  const tier = params.get("tier") || "";
  useEffect(() => {
    const tierMap: Record<string, number> = {
      discovery: 97,
      "discovery-quiz": 77,
      "metabolic-screen": 195,
      baseline: 595,
      "longevity-panel": 795,
      programme: 1895,
      "womens-hormones": 375,
      "mens-testosterone": 325,
      "cardiovascular-risk": 349,
      "fatigue-energy": 249,
      "metabolic-weight": 199,
      "optimiser-baseline": 549,
      "wl-consultation": 60,
      "wl-consultation-quiz": 48,
    };
    const value = tierMap[tier] ?? 0;
    if (value > 0 && typeof window !== "undefined") {
      (window as Window & { fbq?: Function }).fbq?.("track", "Purchase", { value, currency: "GBP", content_name: "Veridian " + tier });
    }
  }, [tier]);
  return null;
}

function ThankYouContent() {
  const params = useSearchParams();
  const tier = params.get("tier") || "";
  const isReviewTier = REVIEW_TIERS.includes(tier);
  const isBloodTestTier = BLOOD_TEST_TIERS.includes(tier);

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <Suspense fallback={null}><PixelPurchase /></Suspense>
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* ── Confirmation header ── */}
        <section className="sec bg-fo" style={{ paddingTop: 64, paddingBottom: isReviewTier ? 56 : 80 }}>
          <div className="wrap" style={{ maxWidth: 760, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto 22px", borderRadius: "50%", background: "rgba(200,168,75,.15)", border: "1.5px solid var(--go)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M7 15.5l5 5L23 10" stroke="#c8a84b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="lbl" style={{ color: "var(--go)" }}>Payment Confirmed</p>
            <div className="rule rule-c" style={{ background: "var(--go)" }} />
            <h1 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 16 }}>
              {isReviewTier ? "Payment confirmed." : isBloodTestTier ? "Your test is confirmed." : "Thank you."}
              {" "}<em style={{ fontStyle: "italic", color: "var(--go)" }}>
                {isReviewTier ? "Now book your slot." : isBloodTestTier ? "We'll be in touch shortly." : "You're in."}
              </em>
            </h1>
            <p style={{ fontSize: ".94rem", color: "rgba(246,241,232,.65)", lineHeight: 1.95, maxWidth: 580, margin: "0 auto" }}>
              {isReviewTier
                ? "Your payment is confirmed. Select a date and time on ThanksDoc to schedule your virtual consultation with Dr Tosin. You will receive a video call link by email before your appointment."
                : isBloodTestTier
                ? "Payment confirmed. A confirmation email is on its way with everything you need what's being tested, how your sample is collected, and what to expect. Dr Tosin will contact you within 24 hours to arrange your kit or walk-in booking."
                : "Your booking request has been submitted successfully. We'll be in touch within 24 hours to confirm next steps."}
            </p>
          </div>
        </section>

        {/* ── ThanksDoc booking CTA (consultation tiers) ── */}
        {isReviewTier && (
          <section className="sec bg-iv" style={{ paddingTop: 56, paddingBottom: 72 }}>
            <div className="wrap" style={{ maxWidth: 680, textAlign: "center" }}>
              <p className="lbl">Step 2 of 2</p>
              <div className="rule rule-c" />
              <h2 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 12 }}>
                Choose your appointment slot
              </h2>
              <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 36 }}>
                Virtual consultation · Video call · Dr Tosin Taiwo
              </p>
              <a
                href={THANKSDOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-fo"
                style={{ fontSize: "1rem", padding: "16px 36px", display: "inline-block", marginBottom: 16 }}
              >
                Book your appointment slot →
              </a>
              <p style={{ fontSize: ".78rem", color: "var(--sl3)", lineHeight: 1.7 }}>
                Opens ThanksDoc, our secure clinical booking system. Select any available slot and you will receive a video call link by email.
              </p>
            </div>
          </section>
        )}

        {/* ── Next steps (non-consultation tiers) ── */}
        {!isReviewTier && (
          <section className="sec bg-iv" style={{ paddingTop: 56, paddingBottom: 72 }}>
            <div className="wrap" style={{ maxWidth: 760, textAlign: "center" }}>
              <div className="card" style={{ textAlign: "left", maxWidth: 680, margin: "0 auto 28px" }}>
                <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>What happens next</p>
                <div style={{ display: "grid", gap: 14 }}>
                  {(isReviewTier
                    ? [
                        "Your payment is confirmed and your appointment is reserved.",
                        "You'll receive a confirmation email with a video call link within 24 hours.",
                        "If relevant, we'll ask for any blood test results to review before your call.",
                        "You can complete your clinical intake form ahead of the appointment.",
                      ]
                    : isBloodTestTier
                    ? [
                        "A confirmation email is on its way check your inbox (and spam folder) now.",
                        "Dr Tosin will contact you within 24 hours to confirm your preferred sample collection method.",
                        "Your sample is processed by our nationally accredited UK laboratory results within 48-72 hours of receipt.",
                        "Dr Tosin's written clinical interpretation and personalised next-step plan is sent directly to your email.",
                      ]
                    : [
                        "Your booking request has been sent to Veridian Clinic.",
                        "You'll receive a confirmation email with next steps.",
                        "If relevant, we'll send details for blood testing, CGM, or pre-consultation prep.",
                        "You can now complete your secure clinical intake to make the consultation more useful.",
                      ]
                  ).map((step, i, arr) => (
                    <div key={step} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 14, borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
                      <div style={{ width: 28, height: 28, background: "var(--fo)", color: "var(--go2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                      <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              {isBloodTestTier && (
                <div className="card" style={{ textAlign: "left", maxWidth: 680, margin: "0 auto 24px", background: "var(--iv2)", border: "1px solid rgba(200,168,75,.3)" }}>
                  <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 10 }}>Important: takes 3 minutes</p>
                  <h3 className="cg" style={{ fontSize: "1.15rem", fontWeight: 500, color: "var(--sl)", marginBottom: 10, lineHeight: 1.3 }}>Complete your clinical context form</h3>
                  <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 16 }}>
                    8 short questions about your symptoms and health goals. Dr Tosin uses your answers when interpreting your results so your report is personalised to you, not just a list of reference ranges.
                  </p>
                  <Link href={`/blood-tests/questionnaire?tier=${tier}`} className="btn btn-go" style={{ display: "inline-block" }}>
                    Complete 8-question form →
                  </Link>
                </div>
              )}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {!isBloodTestTier && <Link href="/intake" className="btn btn-fo">Complete Clinical Intake →</Link>}
                <Link href="/" className="btn btn-ol">Return to Home</Link>
              </div>
            </div>
          </section>
        )}

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
