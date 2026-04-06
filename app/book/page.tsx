"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const FORMSPREE_ID = "mkopkopb";

const tiers = [
  { value: "initial", label: "Initial GP Consultation — £195" },
  { value: "core", label: "Core Metabolic Assessment — £495" },
  { value: "advanced", label: "Advanced Longevity Assessment — £895" },
  { value: "programme", label: "12-Week Metabolic Reset Programme — £1,895" },
];

function BookingFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tierParam = searchParams.get("tier") || "";

  const validTier = useMemo(
    () => (tiers.some((t) => t.value === tierParam) ? tierParam : "core"),
    [tierParam]
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tier: validTier,
    notes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, tier: validTier }));
  }, [validTier]);

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
      router.push("/book/thank-you");
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
              <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28 }}>
                Complete the short form below. Your chosen assessment will be pre-selected if you arrived here from the quiz or pricing page.
              </p>
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
                {error && <p style={{ color: "var(--red)", fontSize: ".82rem" }}>{error}</p>}
                <button type="submit" className="btn btn-fo" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "wait" : "pointer" }}>
                  {submitting ? "Submitting..." : "Request Booking →"}
                </button>
              </form>
            </div>
            <div style={{ display: "grid", gap: 20 }}>
              <div className="card-fo">
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>What to expect</p>
                <ul className="chk">
                  <li>Virtual, UK-wide delivery</li>
                  <li>GP-led clinical review</li>
                  <li>Clear next steps after booking</li>
                  <li>Secure intake available after confirmation</li>
                </ul>
              </div>
              <div className="card">
                <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>Need help choosing?</p>
                <p style={{ fontSize: ".86rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                  If you’re not completely sure which tier is right, take the free quiz first and we’ll point you to the best starting option.
                </p>
                <Link href="/quiz" className="btn btn-ol">Take the Free Quiz →</Link>
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
