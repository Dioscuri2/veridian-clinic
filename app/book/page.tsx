"use client";
import { Suspense, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const THANKSDOC_URL = process.env.NEXT_PUBLIC_THANKSDOC_BOOKING_URL || "https://notes.thanksdoc.co.uk/book/clinic/veridian";

// All Veridian services (consultations, blood panels, programmes) are booked
// and paid via ThanksDoc, payments must settle through the ThanksDoc Stripe
// account under the clinic agreement. This page only forwards the many
// /book?tier=... links across the site and in previously sent emails.
function BookingInner() {
  useEffect(() => {
    window.location.replace(THANKSDOC_URL);
  }, []);

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="sec bg-iv">
        <div className="wrap" style={{ maxWidth: 560, textAlign: "center", padding: "72px 0" }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Secure booking</p>
          <h1 style={{ marginBottom: 14 }}>Taking you to our clinic booking page</h1>
          <p style={{ color: "var(--sl2)", lineHeight: 1.7, marginBottom: 28 }}>
            Bookings and payments are handled on ThanksDoc, our secure clinic platform, which runs a CQC-registered framework. You will be redirected automatically.
          </p>
          <a className="btn btn-go" href={THANKSDOC_URL}>Continue to booking →</a>
          <p style={{ fontSize: ".74rem", color: "var(--sl3)", lineHeight: 1.85, marginTop: 40, borderTop: "1px solid rgba(0,0,0,.07)", paddingTop: 20 }}>
            Registered clinical activities via ThanksDoc (thanksdoc.co.uk). All consultations are virtual, available UK-wide. Refund policy available on request.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <Suspense fallback={
        <main style={{ paddingTop: "var(--nav-h)" }}>
          <section className="sec bg-iv"><div className="wrap"><p>Loading…</p></div></section>
        </main>
      }>
        <BookingInner />
      </Suspense>
      <Footer />
    </>
  );
}
