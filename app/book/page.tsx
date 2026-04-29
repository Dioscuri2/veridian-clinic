"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const FORMSPREE_ID = "mkopkopb";

const tiers = [
  { value: "discovery", label: "GP Discovery Call — £195" },
  { value: "baseline", label: "Veridian Baseline — £595" },
  { value: "programme", label: "12-Week Metabolic Reset — £1,895" },
];

const paidTiers = new Set(["discovery", "discovery-quiz", "baseline", "programme"]);

const tierAliasMap: Record<string, string> = {
  advanced: "programme",
};

const tierDetails: Record<string, { title: string; price: string; strikethrough?: string; badge?: string; description: string }> = {
  discovery: {
    title: "GP-Led Discovery Call",
    price: "£195",
    description:
      "A 30-minute GP-led review of your metabolic result, key risk factors, and a personalised clinical pathway recommendation.",
  },
  "discovery-quiz": {
    title: "GP-Led Discovery Call",
    price: "£97",
    strikethrough: "£195",
    badge: "Quiz Rate — Save £98",
    description:
      "A 30-minute GP-led review of your metabolic quiz result and a personalised pathway — whether that's a targeted blood panel, a structured reset, or a full baseline assessment.",
  },
  baseline: {
    title: "Veridian Baseline",
    price: "£595",
    description:
      "A longevity-focused baseline audit designed to reveal the most actionable metabolic drivers of decline before they become disease.",
  },
  programme: {
    title: "12-Week Metabolic Reset",
    price: "£1,895",
    description:
      "A structured reset for patients who need guided implementation, accountability and follow-through, not just a report.",
  },
};

function BookingFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tierParam = searchParams.get("tier") || "";

  const refParam = searchParams.get("ref") || "";

  const validTier = useMemo(() => {
    const normalizedTier = tierAliasMap[tierParam] || tierParam;
    // Quiz high-risk referral gets the discounted discovery rate
    if (normalizedTier === "discovery" && refParam === "quiz-high-risk") return "discovery-quiz";
    if (normalizedTier === "discovery-quiz") return "discovery-quiz";
    if (tierDetails[normalizedTier]) return normalizedTier;
    return "baseline";
  }, [tierParam, refParam]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tier: validTier,
    notes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, tier: validTier }));
  }, [validTier]);

  useEffect(() => {
    setCancelled(searchParams.get("cancelled") === "1");
  }, [searchParams]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.tier.trim()) {
      setError("Please complete your name, email, and assessment tier.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          tier: form.tier,
          notes: form.notes,
          source: "Veridian Clinic website",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      if (paidTiers.has(form.tier)) {
        const checkoutRes = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            tier: form.tier,
            notes: form.notes,
          }),
        });

        const checkoutData = await checkoutRes.json();
        if (!checkoutRes.ok || !checkoutData?.url) {
          throw new Error(checkoutData?.error || "Checkout session failed");
        }

        window.location.href = checkoutData.url;
        return;
      }

      router.push(`/book/thank-you?tier=${encodeURIComponent(form.tier)}`);
    } catch {
      setError("There was a problem submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="sec bg-iv">
        <div className="wrap">
          <div className="g2-wide" style={{ display: "grid", alignItems: "start" }}>
            <div>
              <p className="lbl">Booking Request</p>
              <div className="rule" />
              <h1 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 18 }}>
                Book your assessment.
                <br /><em style={{ fontStyle: "italic", color: "var(--fo)" }}>Start with clarity.</em>
              </h1>
              <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 18 }}>
                Complete the short form below. Your chosen assessment will be pre-selected if you arrived here from the quiz or pricing page.
              </p>
              <p style={{ fontSize: ".82rem", color: "var(--sl3)", lineHeight: 1.85, marginBottom: 18 }}>
                CQC regulated clinical services — including prescribing where indicated — are delivered under the umbrella of thanksdoc.co.uk.
              </p>
              <div className="card" style={{ marginBottom: 28 }}>
                <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>
                  Selected pathway
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                  <h2 className="cg" style={{ fontSize: "1.4rem", color: "var(--sl)", margin: 0 }}>
                    {tierDetails[form.tier].title}
                  </h2>
                  <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--fo)" }}>
                    {tierDetails[form.tier].price}
                  </span>
                  {tierDetails[form.tier].strikethrough && (
                    <span style={{ fontSize: ".9rem", color: "var(--sl3)", textDecoration: "line-through" }}>
                      {tierDetails[form.tier].strikethrough}
                    </span>
                  )}
                  {tierDetails[form.tier].badge && (
                    <span style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", background: "var(--go)", color: "var(--fo)", padding: "2px 8px" }}>
                      {tierDetails[form.tier].badge}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                  {tierDetails[form.tier].description}
                </p>
              </div>
              <form onSubmit={onSubmit} className="card" style={{ display: "grid", gap: 14 }}>
                <input className="form-field" name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
                <input className="form-field" name="email" type="email" placeholder="Email address" value={form.email} onChange={onChange} required />
                <input className="form-field" name="phone" placeholder="Phone number (optional)" value={form.phone} onChange={onChange} />
                <select className="form-field form-select" name="tier" value={form.tier} onChange={onChange}>
                  {tiers.map((tier) => (
                    <option key={tier.value} value={tier.value}>{tier.label}</option>
                  ))}
                </select>
                <textarea className="form-field" name="notes" placeholder="Anything useful to know before we contact you?" rows={5} value={form.notes} onChange={onChange} />
                {cancelled && !error ? (
                  <p style={{ color: "var(--fo)", fontSize: ".82rem" }}>
                    Checkout was cancelled. Your form details are still here if you want to try again.
                  </p>
                ) : null}
                {error && <p style={{ color: "var(--red)", fontSize: ".82rem" }}>{error}</p>}
                <button type="submit" className="btn btn-fo" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "wait" : "pointer" }}>
                  {submitting ? "Submitting..." : paidTiers.has(form.tier) ? "Continue to Secure Payment →" : "Request Booking →"}
                </button>
              </form>
            </div>
            <div style={{ display: "grid", gap: 20 }}>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>What to expect</p>
                <ul className="chk">
                  <li>Virtual, UK-wide delivery</li>
                  <li>Clinical review via trusted medical partners where needed</li>
                  <li>Pricing aligned to your selected pathway</li>
                  <li>Clear next steps after booking</li>
                  <li>Secure intake available after confirmation</li>
                </ul>
              </div>
              <div className="card">
                <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>Need help choosing?</p>
                <p style={{ fontSize: ".86rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                  If you’re not completely sure which pathway is right, take the free quiz first and we’ll point you to the best starting option.
                </p>
                <Link href="/metabolic-quiz" className="btn btn-ol">Take the Free Metabolic Quiz →</Link>
              </div>
            </div>
          </div>
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
      <Suspense fallback={<main style={{ paddingTop: "var(--nav-h)" }}><section className="sec bg-iv"><div className="wrap"><p>Loading booking form…</p></div></section></main>}>
        <BookingFormInner />
      </Suspense>
      <Footer />
    </>
  );
}
