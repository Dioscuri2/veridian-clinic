"use client";

import { FormEvent, useMemo, useState } from "react";

type LeadCaptureFormProps = {
  source: string;
  quizScore?: number;
  metabolicAge?: number;
  resultBand?: string;
  list?: string;
  successMessage?: string;
  consentLabel?: string;
  ctaLabel?: string;
  title?: string;
  subtitle?: string;
  buttonClassName?: string;
  compact?: boolean;
  fields?: Array<"firstName" | "email" | "phone">;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function LeadCaptureForm({
  source,
  quizScore,
  metabolicAge,
  resultBand,
  list,
  successMessage,
  consentLabel = "I agree to receive Veridian marketing emails, including newsletter updates, quiz results, and roadmap-related follow-up.",
  ctaLabel = "Get Your Full Longevity Roadmap →",
  title = "Get your full roadmap",
  subtitle = "Enter your details and we’ll send your next-step longevity roadmap.",
  buttonClassName = "btn btn-fo btn-full",
  compact = false,
  fields = ["firstName", "email"],
}: LeadCaptureFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const requiresFirstName = fields.includes("firstName");
  const requiresEmail = fields.includes("email");
  const requiresPhone = fields.includes("phone");

  const disabled = useMemo(() => {
    if (status === "submitting" || !consent) return true;
    if (requiresEmail && !email.trim()) return true;
    if (requiresFirstName && !firstName.trim()) return true;
    if (requiresPhone && !phone.trim()) return true;
    return false;
  }, [status, consent, requiresEmail, email, requiresFirstName, firstName, requiresPhone, phone]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          consent,
          source,
          list,
          quizScore,
          metabolicAge,
          resultBand,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to save your details right now.");
      }

      setStatus("success");
      setMessage(
        data?.message || successMessage || "You’re in. Your roadmap request has been captured successfully."
      );
      setFirstName("");
      setEmail("");
      setPhone("");
      setConsent(true);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your details."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: compact ? 12 : 16 }}>
      <div>
        <p className="lbl" style={{ marginBottom: 8 }}>
          {title}
        </p>
        <p
          style={{
            fontSize: compact ? ".82rem" : ".9rem",
            color: "var(--sl2)",
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
        }}
      >
        {requiresFirstName ? (
          <div>
            <label htmlFor={`${source}-first-name`} className="lead-label">
              Name
            </label>
            <input
              id={`${source}-first-name`}
              type="text"
              className="form-field"
              placeholder="Your full name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>
        ) : null}

        {requiresEmail ? (
          <div>
            <label htmlFor={`${source}-email`} className="lead-label">
              Email address
            </label>
            <input
              id={`${source}-email`}
              type="email"
              className="form-field"
              placeholder="Enter your best email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        ) : null}

        {requiresPhone ? (
          <div>
            <label htmlFor={`${source}-phone`} className="lead-label">
              Phone number
            </label>
            <input
              id={`${source}-phone`}
              type="tel"
              className="form-field"
              placeholder="Best number for priority access updates"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
        ) : null}
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          fontSize: ".78rem",
          color: "var(--sl3)",
          lineHeight: 1.7,
          textAlign: "left",
        }}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          style={{ marginTop: 3, minWidth: 18, minHeight: 18, flexShrink: 0 }}
        />
        <span>{consentLabel}</span>
      </label>

      <button type="submit" className={buttonClassName} disabled={disabled} style={{ opacity: disabled ? 0.6 : 1 }}>
        {status === "submitting" ? "Submitting..." : ctaLabel}
      </button>

      {message ? (
        <div
          style={{
            padding: "12px 14px",
            borderLeft: `3px solid ${status === "success" ? "var(--go)" : "var(--red)"}`,
            background: status === "success" ? "rgba(200,168,75,.08)" : "rgba(122,22,22,.06)",
          }}
        >
          <p
            style={{
              fontSize: ".8rem",
              color: status === "success" ? "var(--sl2)" : "var(--red)",
              lineHeight: 1.7,
            }}
          >
            {message}
          </p>
        </div>
      ) : null}
    </form>
  );
}
