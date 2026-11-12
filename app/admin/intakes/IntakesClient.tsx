"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Intake {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  text: string;
  filename: string;
  markdown: string;
}

type State = "loading" | "ready" | "error";

const gold = "#c8a84b";
const btn: React.CSSProperties = {
  padding: "8px 16px",
  background: "transparent",
  color: gold,
  border: "1px solid rgba(200,168,75,.5)",
  fontSize: ".8rem",
  cursor: "pointer",
  fontFamily: "Georgia, serif",
};

function download(intake: Intake) {
  const url = URL.createObjectURL(new Blob([intake.markdown], { type: "text/markdown;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = intake.filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function IntakesClient() {
  const [state, setState] = useState<State>("loading");
  const [err, setErr] = useState("");
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [unreadable, setUnreadable] = useState(0);
  const [openId, setOpenId] = useState("");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/intakes", { cache: "no-store" });
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const data = await res.json();
        if (!res.ok) {
          setErr(data?.error || "Could not load intakes.");
          setState("error");
          return;
        }
        setIntakes(data.intakes || []);
        setUnreadable(data.unreadable || 0);
        setState("ready");
      } catch {
        setErr("Could not load intakes. Please refresh.");
        setState("error");
      }
    })();
  }, []);

  async function copy(intake: Intake) {
    try {
      await navigator.clipboard.writeText(intake.text);
    } catch {
      return;
    }
    setCopiedId(intake.id);
    setTimeout(() => setCopiedId(""), 2000);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#2c2a26", padding: "40px 20px", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Link href="/admin" style={{ fontSize: ".78rem", color: gold, textDecoration: "none", letterSpacing: ".1em", textTransform: "uppercase" }}>
          &larr; Admin
        </Link>

        <h1 style={{ fontSize: "1.9rem", fontWeight: 500, color: "#f6f1e8", margin: "16px 0 8px" }}>Patient intakes</h1>
        <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.5)", lineHeight: 1.8, maxWidth: 660 }}>
          Every intake form a patient has submitted, newest first. Each one is saved here before any
          email or alert goes out. Open one to read it, copy it into the scribe, or download it as a
          Markdown file for the patient&apos;s record.
        </p>

        {state === "loading" && <p style={{ marginTop: 28, color: "rgba(246,241,232,.6)", fontSize: ".9rem" }}>Loading...</p>}

        {state === "error" && (
          <p style={{ marginTop: 20, padding: "14px 18px", background: "rgba(122,22,22,.2)", border: "1px solid rgba(122,22,22,.5)", color: "#ff9b9b", fontSize: ".88rem" }}>
            {err}
          </p>
        )}

        {state === "ready" && unreadable > 0 && (
          <p style={{ marginTop: 20, padding: "14px 18px", background: "rgba(122,22,22,.2)", border: "1px solid rgba(122,22,22,.5)", color: "#ff9b9b", fontSize: ".88rem", lineHeight: 1.7 }}>
            {unreadable} saved {unreadable === 1 ? "intake" : "intakes"} cannot be opened. They were saved
            under a previous admin password. Nothing has been deleted.
          </p>
        )}

        {state === "ready" && intakes.length === 0 && (
          <p style={{ marginTop: 28, color: "rgba(246,241,232,.6)", fontSize: ".9rem" }}>No intakes have been saved yet.</p>
        )}

        {state === "ready" &&
          intakes.map((intake) => {
            const open = openId === intake.id;
            return (
              <div key={intake.id} style={{ marginTop: 16, border: "1px solid rgba(246,241,232,.16)", background: "rgba(246,241,232,.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 18px", flexWrap: "wrap" }}>
                  <div>
                    <p style={{ margin: 0, color: "#f6f1e8", fontSize: "1.02rem" }}>{intake.name}</p>
                    <p style={{ margin: "4px 0 0", color: "rgba(246,241,232,.5)", fontSize: ".78rem" }}>
                      {new Date(intake.receivedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" })}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button style={btn} onClick={() => setOpenId(open ? "" : intake.id)}>{open ? "Close" : "View"}</button>
                    <button style={btn} onClick={() => copy(intake)}>{copiedId === intake.id ? "Copied" : "Copy"}</button>
                    <button style={{ ...btn, background: gold, color: "#2c2a26", fontWeight: 600 }} onClick={() => download(intake)}>Download .md</button>
                  </div>
                </div>
                {open && (
                  <pre style={{ margin: 0, padding: 18, background: "#f6f1e8", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: ".78rem", lineHeight: 1.7, color: "#2c2a26", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {intake.text}
                  </pre>
                )}
              </div>
            );
          })}
      </div>
    </main>
  );
}
