import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";
import PixelPurchase from "@/components/PixelPurchase";

export const metadata: Metadata = {
  title: "Guide Purchase Confirmed | Veridian Clinic",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PeriGuideThankyouPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let verified = false;
  let customerEmail = "";
  let customerName = "";

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        httpClient: Stripe.createFetchHttpClient(),
      });
      const session = await stripe.checkout.sessions.retrieve(session_id);
      verified = session.payment_status === "paid";
      customerEmail = session.customer_details?.email || session.customer_email || "";
      customerName = session.customer_details?.name || "";
    } catch {
      // Stripe error — still show page
    }
  }

  const firstName = customerName?.split(" ")[0] || "there";

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv" style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}>
          <div className="wrap" style={{ maxWidth: 820, textAlign: "center" }}>

            {verified ? (
              <>
                <div style={{ width: 78, height: 78, margin: "0 auto 26px", borderRadius: "50%", background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <circle cx="17" cy="17" r="16" stroke="var(--go2)" strokeWidth="1.5" />
                    <path d="M10 17.5l4.3 4.3L24 12" stroke="var(--go2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <p className="lbl">Payment Confirmed</p>
                <PixelPurchase value={9.99} content_name="Perimenopause Reset Guide" />
                <div className="rule rule-c" />
                <h1 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>
                  Your guide is ready,{" "}
                  <em style={{ fontStyle: "italic", color: "var(--fo)" }}>{firstName}.</em>
                </h1>
                <p style={{ fontSize: ".94rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 560, margin: "0 auto 32px" }}>
                  Download The Perimenopause Reset Guide below.
                  {customerEmail ? ` A receipt email will be sent to ${customerEmail}.` : " Save it somewhere easy to find."}
                </p>

                <div style={{ marginBottom: 40 }}>
                  <a
                    href={`/api/guide-download?session_id=${session_id}`}
                    className="btn btn-fo"
                    style={{ padding: "16px 48px", fontSize: ".95rem" }}
                    download="Veridian-Perimenopause-Reset-Guide.pdf"
                  >
                    Download Your Guide (PDF) ↓
                  </a>
                </div>

                {/* Upsell 1 — Perimenopause Blood Panel */}
                <div className="card" style={{ textAlign: "left", maxWidth: 760, margin: "0 auto 20px", background: "var(--fo)" }}>
                  <p style={{ fontSize: ".68rem", color: "var(--go)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                    Step 1 in your guide: Know Your Numbers
                  </p>
                  <h2 className="cg" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.3, marginBottom: 12 }}>
                    The Veridian Women's Hormone & Health Panel
                  </h2>
                  <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.75)", lineHeight: 1.9, marginBottom: 14 }}>
                    Dr Tosin recommends getting your baseline blood work done before starting the reset. This panel covers every marker discussed in the guide — oestradiol, progesterone, FSH, LH, testosterone, DHEA-S, thyroid (TSH/fT4/fT3), fasting glucose, HbA1c, vitamin D, and ferritin. You'll receive a GP-reviewed digital report with your personalised next steps.
                  </p>
                  <ul style={{ margin: "0 0 20px 0", padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Oestradiol", "Progesterone", "FSH & LH", "Testosterone", "DHEA-S", "Thyroid Panel", "HbA1c", "Vitamin D", "Ferritin"].map(m => (
                      <li key={m} style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", color: "var(--go)", border: "1px solid rgba(200,168,75,.3)", padding: "3px 9px" }}>{m}</li>
                    ))}
                  </ul>
                  <Link href="/book?tier=perimenopause-panel" className="btn btn-go" style={{ display: "inline-block" }}>
                    Book the Women's Hormone Panel — £295 →
                  </Link>
                </div>

                {/* Upsell 2 — Discovery call (softer) */}
                <div className="card" style={{ textAlign: "left", maxWidth: 760, margin: "0 auto 28px", background: "rgba(44,42,38,.6)", border: "1px solid rgba(200,168,75,.2)" }}>
                  <p style={{ fontSize: ".68rem", color: "rgba(246,241,232,.5)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                    Not sure if you're ready for blood tests?
                  </p>
                  <h3 className="cg" style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 500, color: "rgba(246,241,232,.9)", lineHeight: 1.3, marginBottom: 10 }}>
                    Start with a GP conversation — £97 (guide-buyer rate)
                  </h3>
                  <p style={{ fontSize: ".86rem", color: "rgba(246,241,232,.62)", lineHeight: 1.85, marginBottom: 18 }}>
                    A 30-minute 1:1 with Dr Tosin to review your symptoms, discuss what blood tests are relevant for you, and map out your personal reset plan. Normally £195 — guide buyers pay £97.
                  </p>
                  <Link href="/book?tier=discovery-quiz" className="btn btn-ol" style={{ borderColor: "rgba(246,241,232,.25)", color: "var(--go2)", display: "inline-block" }}>
                    Book a Discovery Call — £97 →
                  </Link>
                </div>

                <p style={{ fontSize: ".78rem", color: "var(--sl3)", lineHeight: 1.7 }}>
                  Questions? Email us at <a href="mailto:hello@veridianclinic.com" style={{ color: "var(--fo)" }}>hello@veridianclinic.com</a>
                </p>
              </>
            ) : (
              <>
                <p className="lbl">Something went wrong</p>
                <div className="rule rule-c" />
                <h1 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>
                  We couldn't verify your payment.
                </h1>
                <p style={{ fontSize: ".94rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 520, margin: "0 auto 28px" }}>
                  If you completed payment, please email us at{" "}
                  <a href="mailto:hello@veridianclinic.com" style={{ color: "var(--fo)" }}>hello@veridianclinic.com</a>{" "}
                  and we'll send your guide manually within a few hours.
                </p>
                <Link href="/perimenopause-guide" className="btn btn-fo">
                  Back to Guide Page →
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
