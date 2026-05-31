import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Terms of Service | Veridian Clinic",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://veridianclinic.com/terms" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--sl)", marginBottom: 12, letterSpacing: ".01em" }}>{title}</h2>
    <div style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.95 }}>{children}</div>
  </div>
);

export default function TermsPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <p className="lbl">Legal</p>
            <div className="rule" />
            <h1 className="cg" style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 8 }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: ".82rem", color: "var(--sl3)", marginBottom: 32 }}>Last updated: May 2026</p>

            {/* ThanksDoc regulatory banner */}
            <div style={{
              background: "var(--fo)",
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 32,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}>
              <div style={{
                background: "var(--go)",
                color: "var(--fo)",
                fontSize: ".7rem",
                fontWeight: 700,
                letterSpacing: ".1em",
                padding: "4px 10px",
                borderRadius: 4,
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginTop: 2,
                textTransform: "uppercase",
              }}>
                Powered by ThanksDoc
              </div>
              <p style={{ color: "rgba(246,241,232,.85)", fontSize: ".88rem", lineHeight: 1.75, margin: 0 }}>
                Registered clinical activities at Veridian Clinic are delivered via{" "}
                <a href="https://thanksdoc.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "var(--go)", textDecoration: "underline" }}>
                  ThanksDoc
                </a>{" "}
                (Endura Health Ltd). By using our clinical services, you are also subject to ThanksDoc's terms and conditions, linked below.
              </p>
            </div>

            {/* Veridian terms */}
            <div className="card" style={{ padding: "clamp(24px,5vw,48px)", marginBottom: 40 }}>
              <p style={{ fontSize: ".82rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 28 }}>
                Part A — Veridian Clinic Terms
              </p>

              <Section title="1. About Veridian Clinic">
                <p>Veridian Clinic is a trading name of Olympus Premium Health Ltd, registered in England and Wales (Company No. 13621708). Registered address: 82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE.</p>
                <p style={{ marginTop: 10 }}>Registered clinical activities, including prescribing where indicated, are delivered via ThanksDoc (thanksdoc.co.uk).</p>
              </Section>

              <Section title="2. Services">
                <p>Veridian Clinic provides health optimisation and longevity services, including metabolic assessments, GP-led consultations, and digital health tools. Our services complement, but do not replace, NHS care.</p>
                <p style={{ marginTop: 10 }}>The free metabolic age quiz, guides, and digital content provided on this website are for informational purposes only and do not constitute medical advice or a clinical diagnosis.</p>
              </Section>

              <Section title="3. Not an Emergency Service">
                <p>Veridian Clinic is <strong>not an emergency service</strong>. If you are experiencing a medical emergency — including chest pain, difficulty breathing, severe bleeding, loss of consciousness, stroke symptoms, or severe allergic reactions — call <strong>999 immediately</strong> or attend your nearest A&amp;E. If unsure, call NHS 111.</p>
              </Section>

              <Section title="4. Purchases, Payments, and Right to Cancel">
                <p>All prices are displayed in GBP and are inclusive of VAT where applicable. Payments are processed securely via Stripe. Payment descriptors on bank statements may appear as &quot;Olympus Premium Health&quot;.</p>

                <p style={{ marginTop: 14, fontWeight: 600, color: "var(--sl)" }}>Your right to cancel — Consumer Contracts Regulations 2013</p>
                <p style={{ marginTop: 6 }}>Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, you have the right to cancel orders for services within <strong>14 calendar days</strong> of booking, without giving a reason. To cancel, email us at <a href="mailto:support@veridianclinic.com" style={{ color: "var(--fo)" }}>support@veridianclinic.com</a> within 14 days of your booking confirmation. A full refund will be issued within 14 days of receiving your cancellation.</p>
                <p style={{ marginTop: 10 }}>If you request that we begin providing the service before the 14-day cancellation period expires — for example by confirming your appointment and requesting an earlier date — you expressly consent to early commencement. If the service is fully performed within the cancellation period following such a request, you lose your right to cancel in respect of that service.</p>

                <p style={{ marginTop: 14, fontWeight: 600, color: "var(--sl)" }}>Free digital content (Metabolic Reset Guide &amp; Perimenopause Reset Guide)</p>
                <p style={{ marginTop: 6 }}>The Metabolic Reset Guide and Perimenopause Reset Guide are provided free of charge as educational resources. They are supplied immediately on email submission. As no payment is taken, Consumer Contracts cancellation rights do not apply. If you experience any issue downloading a guide, contact <a href="mailto:support@veridianclinic.com" style={{ color: "var(--fo)" }}>support@veridianclinic.com</a>.</p>
              </Section>

              <Section title="5. Clinical Services and Cancellations">
                <p>Consultations cancelled with less than 24 hours notice may be subject to a cancellation fee of up to 50% of the session cost. We reserve the right to reschedule appointments where necessary and will provide at least 24 hours notice where possible.</p>
                <p style={{ marginTop: 10 }}>The 14-day Consumer Contracts right to cancel (Section 4 above) applies to clinical service bookings. Cancellation requests received after 14 days from booking, or after the service has been performed, are not eligible for a full refund under the Regulations, though we will review requests sympathetically on a case-by-case basis.</p>
              </Section>

              <Section title="6. Intellectual Property">
                <p>All content on this website, including articles, tools, guides, and design, is the intellectual property of Olympus Premium Health Ltd. You may not reproduce, distribute, or use our content for commercial purposes without written permission.</p>
              </Section>

              <Section title="7. Privacy">
                <p>Our collection and use of personal data is governed by our <a href="/privacy" style={{ color: "var(--fo)" }}>Privacy Policy</a>. By using our services, you agree to the terms of that policy.</p>
              </Section>

              <Section title="8. Governing Law">
                <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
              </Section>

              <Section title="9. Contact">
                <p>For questions about these terms, contact us at <a href="mailto:support@veridianclinic.com" style={{ color: "var(--fo)" }}>support@veridianclinic.com</a> or via the <a href="/contact" style={{ color: "var(--fo)" }}>contact page</a>.</p>
              </Section>
            </div>

            {/* ThanksDoc T&Cs — live link */}
            <div className="card" style={{ padding: "clamp(24px,5vw,48px)", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ background: "var(--fo)", color: "var(--go)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", padding: "4px 10px", borderRadius: 4, textTransform: "uppercase" }}>
                  ThanksDoc
                </span>
                <p style={{ fontSize: ".82rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", margin: 0 }}>
                  Registered Clinical Activities
                </p>
              </div>
              <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 24px" }}>
                Registered clinical activities at Veridian Clinic are delivered via ThanksDoc (Endura Health Ltd).
                Their full terms and conditions are published and kept up to date on their website.
              </p>
              <a
                href="https://thanksdoc.co.uk/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-fo"
                style={{ display: "inline-flex" }}
              >
                View ThanksDoc Terms &amp; Conditions →
              </a>
              <p style={{ fontSize: ".76rem", color: "var(--sl3)", marginTop: 16 }}>
                Opens on thanksdoc.co.uk in a new tab.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
