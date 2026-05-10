"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface Stats {
  revenue: {
    allTime: number;
    thisMonth: number;
    thisWeek: number;
    byTier: Record<string, { count: number; amount: number; name: string }>;
  };
  funnel: {
    quizCompletions: number;
    guidePurchases: number;
    discoveryCalls: number;
    bloodTests: number;
    programmes: number;
    totalPaidConversions: number;
    quizToGuideRate: string;
  };
  leads: {
    total: number;
    byBand: Record<string, number>;
    bySource: Record<string, number>;
    recent: Array<{
      timestamp: string;
      email: string;
      firstName: string;
      source: string;
      resultBand?: string;
      metabolicAge?: number;
    }>;
  };
  recentPayments: Array<{
    id: string;
    amount: number;
    tier: string;
    tierName: string;
    customerName: string;
    email: string;
    createdAt: number;
  }>;
  generatedAt: string;
}

interface WAMessage {
  id: string;
  from: string;
  name: string;
  type: string;
  text?: string;
  timestamp: string;
  replied: boolean;
  repliedAt?: string;
}

function pence(amount: number) {
  return `£${(amount / 100).toFixed(2)}`;
}

function timeAgo(ts: number) {
  const seconds = Math.floor((Date.now() - ts * 1000) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function relTime(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const BAND_COLOURS: Record<string, string> = {
  strong: "#145226",
  drifting: "#8a5500",
  "high-risk": "#7a1616",
};

const TIER_BADGE: Record<string, string> = {
  guide: "#1a3a5c",
  discovery: "#2d4a1e",
  "discovery-quiz": "#2d4a1e",
  "metabolic-screen": "#3a2d0a",
  baseline: "#1e2d3a",
  "longevity-panel": "#2a1a3a",
  programme: "#3a1a1a",
};

// ── WhatsApp Inbox ────────────────────────────────────────────────────────────

function WhatsAppInbox() {
  const [messages, setMessages] = useState<WAMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<WAMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"" | "ok" | "err">("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/whatsapp");
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (e: any) {
      setError("Failed to load messages — " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function sendReply() {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    setSendStatus("");
    try {
      const res = await fetch("/api/admin/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selected.from,
          text: replyText.trim(),
          replyToMsgId: selected.id,
          markId: selected.id,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setSendStatus("ok");
      setReplyText("");
      // Optimistically mark replied
      setMessages(prev => prev.map(m => m.id === selected.id ? { ...m, replied: true } : m));
      setSelected(prev => prev ? { ...prev, replied: true } : null);
    } catch {
      setSendStatus("err");
    } finally {
      setSending(false);
    }
  }

  const card = (style?: React.CSSProperties) => ({
    background: "#1a1916",
    border: "1px solid #2a2820",
    borderRadius: "10px",
    padding: "22px",
    ...style,
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {/* Message list */}
      <div style={card()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: 0, letterSpacing: "0.04em" }}>
            WhatsApp Messages
          </h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ color: "#5a534a", fontSize: "12px" }}>{messages.length} total</span>
            <button
              onClick={load}
              style={{ background: "#2c2a26", border: "1px solid #3a3830", color: "#c8a84b", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: "#c97b7b", fontSize: "13px", margin: "0 0 12px" }}>{error}</p>
        )}

        {loading && (
          <p style={{ color: "#5a534a", fontSize: "13px", textAlign: "center", margin: "40px 0" }}>Loading…</p>
        )}

        {!loading && messages.length === 0 && (
          <p style={{ color: "#3a3830", fontSize: "13px", textAlign: "center", margin: "40px 0" }}>
            No messages yet. They'll appear here when patients WhatsApp you.
          </p>
        )}

        <div style={{ maxHeight: "520px", overflowY: "auto" }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => { setSelected(msg); setReplyText(""); setSendStatus(""); }}
              style={{
                padding: "12px 14px",
                borderRadius: "8px",
                marginBottom: "6px",
                cursor: "pointer",
                background: selected?.id === msg.id ? "#25251f" : "transparent",
                border: selected?.id === msg.id ? "1px solid #3a3830" : "1px solid transparent",
                transition: "background 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <span style={{ color: "#f6f1e8", fontSize: "13px", fontWeight: "600" }}>{msg.name}</span>
                    {msg.replied && (
                      <span style={{ background: "#14522630", color: "#4caf82", fontSize: "10px", padding: "1px 6px", borderRadius: "4px", border: "1px solid #14522650" }}>
                        replied
                      </span>
                    )}
                    {!msg.replied && (
                      <span style={{ background: "#3a82f720", color: "#3a82f7", fontSize: "10px", padding: "1px 6px", borderRadius: "4px", border: "1px solid #3a82f740" }}>
                        new
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, color: "#5a534a", fontSize: "11px", marginBottom: "3px" }}>
                    +{msg.from}
                  </p>
                  <p style={{ margin: 0, color: "#8a8278", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {msg.type !== "text" ? `[${msg.type}]` : (msg.text || "—")}
                  </p>
                </div>
                <span style={{ color: "#3a3830", fontSize: "11px", marginLeft: "12px", flexShrink: 0 }}>
                  {relTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply panel */}
      <div style={card()}>
        {!selected ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "300px" }}>
            <p style={{ color: "#3a3830", fontSize: "13px", textAlign: "center" }}>
              Select a message to view and reply
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ color: "#f6f1e8", fontSize: "15px", fontWeight: "600", margin: "0 0 4px" }}>
                    {selected.name}
                  </h3>
                  <p style={{ color: "#5a534a", fontSize: "12px", margin: "0 0 2px" }}>+{selected.from}</p>
                  <p style={{ color: "#3a3830", fontSize: "11px", margin: 0 }}>
                    {new Date(selected.timestamp).toLocaleString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
                <a
                  href={`https://wa.me/${selected.from}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#25D36620", color: "#25D366", border: "1px solid #25D36640", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", textDecoration: "none" }}
                >
                  Open in WA ↗
                </a>
              </div>
            </div>

            {/* Message bubble */}
            <div style={{ background: "#111009", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px", border: "1px solid #2a2820" }}>
              {selected.type !== "text" ? (
                <p style={{ color: "#8a8278", fontSize: "13px", margin: 0, fontStyle: "italic" }}>
                  [{selected.type} message — view in WhatsApp]
                </p>
              ) : (
                <p style={{ color: "#ede8df", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
                  {selected.text || "—"}
                </p>
              )}
            </div>

            {/* Reply form */}
            <div>
              <label style={{ color: "#8a8278", fontSize: "11px", display: "block", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Reply
              </label>
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                rows={5}
                placeholder="Type your reply…"
                style={{
                  width: "100%",
                  background: "#111009",
                  border: "1px solid #3a3830",
                  borderRadius: "8px",
                  color: "#f6f1e8",
                  fontSize: "13px",
                  fontFamily: "Georgia, serif",
                  padding: "12px 14px",
                  resize: "vertical",
                  boxSizing: "border-box",
                  outline: "none",
                  lineHeight: 1.6,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                <span style={{ fontSize: "11px", color: sendStatus === "ok" ? "#4caf82" : sendStatus === "err" ? "#c97b7b" : "transparent" }}>
                  {sendStatus === "ok" ? "✓ Sent via WhatsApp" : sendStatus === "err" ? "✗ Send failed — check Vercel logs" : "·"}
                </span>
                <button
                  onClick={sendReply}
                  disabled={sending || !replyText.trim()}
                  style={{
                    background: sending || !replyText.trim() ? "#2a2820" : "#25D366",
                    color: sending || !replyText.trim() ? "#5a534a" : "#fff",
                    border: "none",
                    padding: "9px 20px",
                    borderRadius: "7px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: sending || !replyText.trim() ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {sending ? "Sending…" : "Send via WhatsApp"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboardClient({
  stats,
  error,
}: {
  stats: Stats | null;
  error: string;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "whatsapp">("overview");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function refresh() {
    router.refresh();
  }

  const tabStyle = (active: boolean) => ({
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid #c8a84b" : "2px solid transparent",
    color: active ? "#c8a84b" : "#5a534a",
    padding: "0 2px",
    paddingBottom: "4px",
    fontSize: "13px",
    fontWeight: active ? "600" : "400",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.03em",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#111009", color: "#f6f1e8", fontFamily: "Georgia, serif" }}>
      {/* Top bar */}
      <div style={{ background: "#1a1916", borderBottom: "1px solid #2a2820", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#c8a84b", fontSize: "18px" }}>⚕</span>
          <span style={{ color: "#f6f1e8", fontWeight: "600", fontSize: "15px" }}>Veridian Admin</span>
          <span style={{ background: "#c8a84b20", color: "#c8a84b", fontSize: "11px", padding: "2px 8px", borderRadius: "4px", border: "1px solid #c8a84b30", letterSpacing: "0.05em" }}>
            CLINICAL OPS
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {stats && activeTab === "overview" && (
            <span style={{ color: "#5a534a", fontSize: "12px" }}>
              Updated {new Date(stats.generatedAt).toLocaleTimeString("en-GB")}
            </span>
          )}
          {activeTab === "overview" && (
            <button onClick={refresh} style={{ background: "#2c2a26", border: "1px solid #3a3830", color: "#c8a84b", padding: "7px 14px", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>
              Refresh
            </button>
          )}
          <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #3a3830", color: "#8a8278", padding: "7px 14px", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: "#1a1916", borderBottom: "1px solid #2a2820", padding: "0 24px", display: "flex", gap: "24px", alignItems: "center", height: "44px" }}>
        <button style={tabStyle(activeTab === "overview")} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button style={tabStyle(activeTab === "whatsapp")} onClick={() => setActiveTab("whatsapp")}>
          📱 WhatsApp
        </button>
      </div>

      <div style={{ padding: "28px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Overview tab */}
        {activeTab === "overview" && (
          <>
            {error && (
              <div style={{ background: "#7a161620", border: "1px solid #7a1616", color: "#c97b7b", padding: "14px 18px", borderRadius: "8px", marginBottom: "24px" }}>
                {error}
              </div>
            )}

            {!stats && !error && (
              <p style={{ color: "#5a534a", textAlign: "center", marginTop: "80px" }}>Loading...</p>
            )}

            {stats && (
              <>
                {/* Revenue cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                  {[
                    { label: "All-time revenue", value: pence(stats.revenue.allTime), sub: "from Stripe" },
                    { label: "This month", value: pence(stats.revenue.thisMonth), sub: "calendar month" },
                    { label: "This week", value: pence(stats.revenue.thisWeek), sub: "rolling 7 days" },
                    { label: "Total leads", value: String(stats.leads.total), sub: "newsletter + quiz" },
                    { label: "Paid conversions", value: String(stats.funnel.totalPaidConversions), sub: "all paid tiers" },
                    { label: "Quiz → guide rate", value: `${stats.funnel.quizToGuideRate}%`, sub: "of quiz completions" },
                  ].map(({ label, value, sub }) => (
                    <div key={label} style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "20px" }}>
                      <p style={{ color: "#5a534a", fontSize: "12px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
                      <p style={{ color: "#c8a84b", fontSize: "26px", fontWeight: "700", margin: "0 0 4px" }}>{value}</p>
                      <p style={{ color: "#3a3830", fontSize: "11px", margin: 0 }}>{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Two column: funnel + revenue by tier */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  {/* Patient flow funnel */}
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>
                      Patient flow funnel
                    </h2>
                    {[
                      { stage: "Quiz completions", count: stats.funnel.quizCompletions, colour: "#3a82f7" },
                      { stage: "Guide purchases (£19.99)", count: stats.funnel.guidePurchases, colour: "#c8a84b" },
                      { stage: "Discovery calls (£97–£195)", count: stats.funnel.discoveryCalls, colour: "#145226" },
                      { stage: "Blood tests (£195–£795)", count: stats.funnel.bloodTests, colour: "#8b5cf6" },
                      { stage: "12-week programme (£1,895)", count: stats.funnel.programmes, colour: "#ef4444" },
                    ].map(({ stage, count, colour }) => (
                      <div key={stage} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2a2820" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: colour, display: "inline-block" }} />
                          <span style={{ color: "#ede8df", fontSize: "13px" }}>{stage}</span>
                        </div>
                        <span style={{ color: colour, fontWeight: "700", fontSize: "16px" }}>{count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Revenue by tier */}
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>
                      Revenue by product
                    </h2>
                    {Object.keys(stats.revenue.byTier).length === 0 && (
                      <p style={{ color: "#3a3830", fontSize: "13px" }}>No paid sessions yet.</p>
                    )}
                    {Object.entries(stats.revenue.byTier)
                      .sort((a, b) => b[1].amount - a[1].amount)
                      .map(([tier, data]) => (
                        <div key={tier} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2a2820" }}>
                          <div>
                            <span style={{ background: TIER_BADGE[tier] || "#2a2820", color: "#c8a84b", fontSize: "10px", padding: "2px 7px", borderRadius: "4px", marginRight: "8px", letterSpacing: "0.05em" }}>
                              ×{data.count}
                            </span>
                            <span style={{ color: "#ede8df", fontSize: "13px" }}>{data.name}</span>
                          </div>
                          <span style={{ color: "#c8a84b", fontWeight: "700", fontSize: "15px" }}>{pence(data.amount)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Two column: recent payments + leads */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  {/* Recent payments */}
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>
                      Recent payments
                    </h2>
                    {stats.recentPayments.length === 0 && (
                      <p style={{ color: "#3a3830", fontSize: "13px" }}>No payments yet.</p>
                    )}
                    {stats.recentPayments.map((p) => (
                      <div key={p.id} style={{ padding: "10px 0", borderBottom: "1px solid #2a2820" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <p style={{ margin: "0 0 2px", color: "#ede8df", fontSize: "13px" }}>{p.customerName || p.email}</p>
                            <p style={{ margin: 0, color: "#5a534a", fontSize: "11px" }}>{p.tierName}</p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p style={{ margin: "0 0 2px", color: "#c8a84b", fontSize: "14px", fontWeight: "700" }}>{pence(p.amount)}</p>
                            <p style={{ margin: 0, color: "#3a3830", fontSize: "11px" }}>{timeAgo(p.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent leads */}
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>
                      Recent leads
                    </h2>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                      {Object.entries(stats.leads.byBand).map(([band, count]) => (
                        <span key={band} style={{ background: `${BAND_COLOURS[band] || "#2a2820"}30`, border: `1px solid ${BAND_COLOURS[band] || "#3a3830"}60`, color: BAND_COLOURS[band] || "#8a8278", fontSize: "12px", padding: "4px 10px", borderRadius: "6px" }}>
                          {band}: {count}
                        </span>
                      ))}
                    </div>
                    {stats.leads.recent.length === 0 && (
                      <p style={{ color: "#3a3830", fontSize: "13px" }}>No leads captured yet.</p>
                    )}
                    {stats.leads.recent.map((lead, i) => (
                      <div key={i} style={{ padding: "9px 0", borderBottom: "1px solid #2a2820" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div>
                            <p style={{ margin: "0 0 2px", color: "#ede8df", fontSize: "13px" }}>
                              {lead.firstName ? `${lead.firstName} — ` : ""}{lead.email}
                            </p>
                            <p style={{ margin: 0, color: "#5a534a", fontSize: "11px" }}>
                              {lead.source}
                              {lead.resultBand && (
                                <span style={{ marginLeft: "6px", color: BAND_COLOURS[lead.resultBand] || "#8a8278" }}>
                                  • {lead.resultBand}{lead.metabolicAge ? ` (age ${lead.metabolicAge})` : ""}
                                </span>
                              )}
                            </p>
                          </div>
                          <span style={{ color: "#3a3830", fontSize: "11px" }}>
                            {new Date(lead.timestamp).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Source breakdown */}
                {Object.keys(stats.leads.bySource).length > 0 && (
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 16px", letterSpacing: "0.04em" }}>
                      Lead sources
                    </h2>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {Object.entries(stats.leads.bySource)
                        .sort((a, b) => b[1] - a[1])
                        .map(([source, count]) => (
                          <div key={source} style={{ background: "#2a2820", border: "1px solid #3a3830", borderRadius: "8px", padding: "12px 18px", textAlign: "center" }}>
                            <p style={{ margin: "0 0 4px", color: "#c8a84b", fontSize: "22px", fontWeight: "700" }}>{count}</p>
                            <p style={{ margin: 0, color: "#8a8278", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{source}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* WhatsApp tab */}
        {activeTab === "whatsapp" && <WhatsAppInbox />}
      </div>
    </div>
  );
}
