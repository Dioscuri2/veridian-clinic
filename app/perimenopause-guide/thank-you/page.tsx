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

                {/* Blood test upsell */}
                <div className="card" style={{ textAlign: "left", maxWidth: 760, margin: "0 auto 28px", background: "var(--fo)" }}>
                  <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                    Your next step
                  </p>
                  <h2 className="cg" style={{ fontSize: "clamp(1.5rem,3.5vw,2.1rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.3, marginBottom: 12 }}>
                    Find out exactly what your hormones and metabolism are doing.
                  </h2>
                  <p style={{ fontSize: ".9rem", color: "rgba(246,241,232,.78)", lineHeight: 1.9, marginBottom: 20 }}>
                    The guide gives you the framework. A comprehensive blood panel — oestradiol, FSH, LH, SHBG, thyroid, fasting insulin, and full metabolic markers — gives you the data. Dr Taiwo reviews every result personally and provides a written clinical report with your next steps.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Link href="/book?tier=baseline" className="btn btn-go">
                      Book a Comprehensive Blood Test →
                    </Link>
                    <Link href="/book?tier=discovery" className="btn btn-ol" style={{ borderColor: "rgba(246,241,232,.3)", color: "var(--go2)" }}>
                      Book a Discovery Call First
                    </Link>
                  </div>
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
