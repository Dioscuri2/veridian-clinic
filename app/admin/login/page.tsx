"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1916",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          background: "#2c2a26",
          border: "1px solid #3a3830",
          borderRadius: "12px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#c8a84b20",
              border: "1px solid #c8a84b40",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "22px",
            }}
          >
            ⚕
          </div>
          <h1 style={{ color: "#c8a84b", fontSize: "18px", fontWeight: "600", margin: 0 }}>
            Veridian Admin
          </h1>
          <p style={{ color: "#8a8278", fontSize: "13px", marginTop: "6px" }}>
            Clinical operations dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#8a8278",
                fontSize: "12px",
                letterSpacing: "0.08em",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Admin password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "#1a1916",
                border: "1px solid #3a3830",
                borderRadius: "8px",
                color: "#f6f1e8",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#c97b7b",
                fontSize: "13px",
                marginBottom: "16px",
                padding: "10px 14px",
                background: "#7a161620",
                borderRadius: "6px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "#3a3830" : "#c8a84b",
              color: loading ? "#8a8278" : "#1a1916",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.04em",
            }}
          >
            {loading ? "Verifying..." : "Enter dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
