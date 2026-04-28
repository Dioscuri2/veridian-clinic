"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";
import { CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/siteConfig";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.trim(),
          email: email.trim(),
          source: "contact-form",
          list: "newsletter",
          metadata: { message: message.trim(), funnel: "contact" },
        }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv" style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}>
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,380px),1fr))", gap: 48, alignItems: "start" }}>

              {/* Left — info */}
              <div>
                <p className="lbl a1">Get in touch</p>
                <div className="rule a1" />
                <h1 className="cg a2" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>
                  We're here to help you find the right pathway.
                </h1>
                <p className="a3" style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 32 }}>
                  Whether you have a question about our assessments, want to understand which pathway is right for you, or simply want to speak with someone before committing — reach out.
                </p>

                <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                    <div style={{ width: 40, height: 40, background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--go2)" strokeWidth="1.8">
                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: ".68rem", color: "var(--sl3)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 2 }}>Email</p>
                      <p style={{ fontSize: ".9rem", color: "var(--fo)", fontWeight: 500 }}>{CONTACT_EMAIL}</p>
                    </div>
                  </a>

                  <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                    <div style={{ width: 40, height: 40, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: ".68rem", color: "var(--sl3)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 2 }}>WhatsApp</p>
                      <p style={{ fontSize: ".9rem", color: "#25D366", fontWeight: 500 }}>Message us directly</p>
                    </div>
                  </a>
                </div>

                <div style={{ padding: "16px 18px", background: "var(--iv2)", borderLeft: "3px solid var(--go)" }}>
                  <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                    <strong style={{ color: "var(--fo)" }}>Not sure which pathway is right?</strong> Take the free metabolic quiz first — it'll take 60 seconds and point you in the right direction.
                  </p>
                  <Link href="/metabolic-quiz" style={{ fontSize: ".82rem", color: "var(--fo)", fontWeight: 600, textDecoration: "underline", display: "inline-block", marginTop: 8 }}>
                    Take the free quiz →
                  </Link>
                </div>
              </div>

              {/* Right — form */}
              <div className="card a2" style={{ padding: "clamp(24px,5vw,44px)" }}>
                {status === "done" ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ width: 60, height: 60, margin: "0 auto 20px", borderRadius: "50%", background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
                        <path d="M8 17l5 5 13-13" stroke="var(--go2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 className="cg" style={{ fontSize: "1.6rem", fontWeight: 500, color: "var(--sl)", marginBottom: 10 }}>Message received.</h2>
                    <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8 }}>We'll be in touch within one working day.</p>
                  </div>
                ) : (
                  <>
                    <p className="lbl" style={{ marginBottom: 20 }}>Send a message</p>
                    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                      <div>
                        <label htmlFor="c-name" className="lead-label">Your name</label>
                        <input id="c-name" type="text" className="form-field" placeholder="Dr Smith" value={name} onChange={e => setName(e.target.value)} required />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="lead-label">Email address</label>
                        <input id="c-email" type="email" className="form-field" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                      </div>
                      <div>
                        <label htmlFor="c-msg" className="lead-label">Your question or message</label>
                        <textarea
                          id="c-msg"
                          className="form-field"
                          placeholder="Tell us what you're looking for or what questions you have..."
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          required
                          rows={5}
                          style={{ resize: "vertical", minHeight: 120 }}
                        />
                      </div>
                      {status === "error" && (
                        <p style={{ fontSize: ".82rem", color: "var(--red)", padding: "10px 12px", borderLeft: "3px solid var(--red)", background: "rgba(122,22,22,.05)" }}>
                          Something went wrong. Please email us directly at {CONTACT_EMAIL}
                        </p>
                      )}
                      <button type="submit" className="btn btn-fo btn-full" disabled={status === "submitting"} style={{ opacity: status === "submitting" ? 0.6 : 1 }}>
                        {status === "submitting" ? "Sending…" : "Send Message →"}
                      </button>
                      <p style={{ fontSize: ".74rem", color: "var(--sl3)", textAlign: "center", lineHeight: 1.6 }}>
                        We respond within one working day. Your data is never shared.
                      </p>
                    </form>
                  </>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
