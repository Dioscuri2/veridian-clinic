"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";
import { bookUrl } from "@/data/panels";

// All Veridian services (consultations, blood panels, programmes) are booked
// and paid via ThanksDoc, payments must settle through the ThanksDoc Stripe
// account under the clinic agreement. This page only forwards the many
// /book?tier=... links across the site and in previously sent emails.
// A tier that maps to a panel with a ThanksDoc service id goes straight to that
// per-service link (service and doctor preselected, and the only link where a
// discount code can be entered). Anything else falls back to the clinic page.
function BookingInner() {
  const tier = useSearchParams().get("tier") || "";
  const destination = bookUrl(tier);

  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="sec bg-iv">
        <div className="wrap" style={{ maxWidth: 560, textAlign: "center", padding: "72px 0" }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Secure booking</p>
          <h1 style={{ marginBottom: 14 }}>Taking you to our clinic booking page</h1>
          <p style={{ color: "var(--sl2)", lineHeight: 1.7, marginBottom: 28 }}>
            Bookings and payments are handled on ThanksDoc, our secure clinic platform, which runs a CQC-registered framework. You will be redirected automatically.
          </p>
          <a className="btn btn-go" href={destination}>Continue to booking →</a>
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
