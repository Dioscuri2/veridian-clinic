import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Terms of Service | Veridian Clinic",
  robots: { index: false },
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
            <p style={{ fontSize: ".82rem", color: "var(--sl3)", marginBottom: 40 }}>Last updated: April 2026</p>

            <div className="card" style={{ padding: "clamp(24px,5vw,48px)" }}>

              <Section title="1. About Veridian Clinic">
                <p>Veridian Clinic is a trading name of Olympus Premium Health Ltd, registered in England and Wales (Company No. 13621708). Registered address: 82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE.</p>
                <p style={{ marginTop: 10 }}>CQC regulated clinical services, including prescribing where indicated, are delivered under the umbrella of Thanksdoc (thanksdoc.co.uk).</p>
              </Section>

              <Section title="2. Services">
                <p>Veridian Clinic provides health optimisation and longevity services, including metabolic assessments, GP-led consultations, and digital health tools. Our services complement, but do not replace, NHS care.</p>
                <p style={{ marginTop: 10 }}>The free metabolic age quiz, guides, and digital content provided on this website are for informational purposes only and do not constitute medical advice or a clinical diagnosis.</p>
              </Section>

              <Section title="3. Purchases and Payments">
                <p>All prices are displayed in GBP and are inclusive of VAT where applicable. Payments are processed securely via Stripe. Payment descriptors on bank statements may appear as "Olympus Premium Health".</p>
                <p style={{ marginTop: 10 }}>Digital products (such as the Metabolic Reset Guide) are delivered electronically and are non-refundable once downloaded. If you experience any issue with delivery, please contact us at hello@veridianclinic.com within 14 days.</p>
              </Section>

              <Section title="4. Clinical Services and Cancellations">
                <p>Consultations cancelled with less than 24 hours notice may be subject to a cancellation fee of up to 50% of the session cost. We reserve the right to reschedule appointments where necessary and will provide at least 24 hours notice where possible.</p>
              </Section>

              <Section title="5. Limitations">
                <p>Veridian Clinic provides health optimisation services, not emergency medical care. If you believe you are experiencing a medical emergency, call 999 or attend your nearest A&E immediately.</p>
                <p style={{ marginTop: 10 }}>Results from our assessments and tools are based on self-reported data and should be interpreted in context. They do not replace a full clinical consultation.</p>
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
                <p>For questions about these terms, contact us at <a href="mailto:hello@veridianclinic.com" style={{ color: "var(--fo)" }}>hello@veridianclinic.com</a> or via the <a href="/contact" style={{ color: "var(--fo)" }}>contact page</a>.</p>
              </Section>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
