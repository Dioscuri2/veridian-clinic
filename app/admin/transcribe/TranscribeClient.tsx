"use client";
import { useState } from "react";
import Link from "next/link";

type State = "idle" | "working" | "done" | "error";

export default function TranscribeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  const [contextBlock, setContextBlock] = useState("");
  const [copied, setCopied] = useState(false);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!file || state === "working") return;
    setState("working");
    setErr("");
    setContextBlock("");
    try {
      const fd = new FormData();
      fd.set("audio", file);
      const res = await fetch("/api/admin/transcribe", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Transcription failed.");
        setState("error");
        return;
      }
      setContextBlock(data.contextBlock || "");
      setState("done");
    } catch {
      setErr("Transcription failed. Please try again.");
      setState("error");
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(contextBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#2c2a26", padding: "40px 20px", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Link href="/admin" style={{ fontSize: ".78rem", color: "#c8a84b", textDecoration: "none", letterSpacing: ".1em", textTransform: "uppercase" }}>
          &larr; Admin
        </Link>

        <h1 style={{ fontSize: "1.9rem", fontWeight: 500, color: "#f6f1e8", margin: "16px 0 8px" }}>
          Voice note to consultation context
        </h1>
        <p style={{ fontSize: ".92rem", color: "rgba(246,241,232,.62)", lineHeight: 1.85, maxWidth: 660 }}>
          For a patient who would rather talk than type. Ask them to send a voice note to the clinic
          WhatsApp, export it, and drop it here. You get a verbatim transcript wrapped in the same
          block format as the written intake email, ready to paste into Heidi.
        </p>
        <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.4)", lineHeight: 1.8, maxWidth: 660, marginTop: 10 }}>
          The audio is sent to Groq for transcription and is not stored by us. Nothing here is
          summarised by a model: the transcript is the patient&apos;s own words, so the clinical
          structuring stays with you and with Heidi.
        </p>

        <form onSubmit={run} style={{ marginTop: 28, display: "grid", gap: 16 }}>
          <input
            type="file"
            accept="audio/*,.opus,.ogg,.m4a,.mp3,.wav,.webm,.mp4,.flac"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ fontSize: ".9rem", color: "#f6f1e8", padding: "14px", background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.16)" }}
          />
          {file && (
            <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.5)", margin: 0 }}>
              {file.name} &middot; {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
          <button
            type="submit"
            disabled={!file || state === "working"}
            style={{
              padding: "14px 28px",
              background: !file || state === "working" ? "rgba(200,168,75,.35)" : "#c8a84b",
              color: "#2c2a26",
              border: "none",
              fontSize: ".9rem",
              fontWeight: 600,
              letterSpacing: ".05em",
              cursor: !file || state === "working" ? "not-allowed" : "pointer",
              justifySelf: "start",
            }}
          >
            {state === "working" ? "Transcribing..." : "Transcribe"}
          </button>
        </form>

        {state === "error" && (
          <p style={{ marginTop: 20, padding: "14px 18px", background: "rgba(122,22,22,.2)", border: "1px solid rgba(122,22,22,.5)", color: "#ff9b9b", fontSize: ".88rem" }}>
            {err}
          </p>
        )}

        {state === "done" && (
          <div style={{ marginTop: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#c8a84b", margin: 0 }}>
                Paste into Heidi
              </p>
              <button
                onClick={copy}
                style={{ padding: "8px 16px", background: "transparent", color: "#c8a84b", border: "1px solid rgba(200,168,75,.5)", fontSize: ".8rem", cursor: "pointer" }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre style={{ margin: 0, padding: 18, background: "#f6f1e8", border: "1px solid rgba(0,0,0,.1)", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: ".78rem", lineHeight: 1.7, color: "#2c2a26", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {contextBlock}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
