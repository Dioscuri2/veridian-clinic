"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  revenue: {
    allTime: number; thisMonth: number; thisWeek: number;
    byTier: Record<string, { count: number; amount: number; name: string }>;
  };
  funnel: {
    quizCompletions: number; guidePurchases: number; discoveryCalls: number;
    bloodTests: number; programmes: number; totalPaidConversions: number; quizToGuideRate: string;
  };
  leads: {
    total: number; byBand: Record<string, number>; bySource: Record<string, number>;
    recent: Array<{ timestamp: string; email: string; firstName: string; source: string; resultBand?: string; metabolicAge?: number }>;
  };
  recentPayments: Array<{ id: string; amount: number; tier: string; tierName: string; customerName: string; email: string; createdAt: number }>;
  generatedAt: string;
}

interface WAMessage {
  id: string; from: string; name: string; type: string;
  text?: string; timestamp: string; replied: boolean; repliedAt?: string;
}

// ── FAQ Templates ─────────────────────────────────────────────────────────────

const TEMPLATES: { label: string; keywords: string[]; emoji: string; body: string }[] = [
  {
    label: "Greeting & overview",
    emoji: "👋",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "more information", "info", "find out", "services", "offer", "what do you"],
    body: `Hi! Welcome to Veridian Clinic 👋

We're a longevity and metabolic health clinic led by Dr Oluwatosin Taiwo. We help people understand what's really driving their weight, energy, and long-term health then fix it.

Our services include:
• Metabolic assessments & blood panels
• CGM (continuous glucose monitoring)
• 12-week personalised programmes
• Longevity-focused health optimisation

Everything is done via video consultation no waiting rooms!

Is there something specific you'd like to know more about?`,
  },
  {
    label: "Pricing",
    emoji: "💷",
    keywords: ["cost", "price", "how much", "fee", "afford", "expensive", "charge", "pay", "money", "pound", "£"],
    body: `Great question here's a quick overview of our fees:

• Initial Discovery Consultation £195 (45 min with Dr Taiwo)
• Energy Screen £195 (key hormones & metabolic markers)
• Core Metabolic Assessment £595 (full metabolic + hormonal review)
• Advanced Longevity Assessment £795 (comprehensive biomarker panel)
• 12-Week Metabolic Reset Programme £1,895 (includes consultations + monitoring)

Full details are at veridianclinic.com/assessments

Most patients start with the Discovery Consultation it's the best way to find out which package fits your goals. Would you like to know more about any specific service?`,
  },
  {
    label: "Assessment details",
    emoji: "🩺",
    keywords: ["assessment", "consultation", "what's included", "what does it involve", "what happen", "appointment", "session", "what do i get", "process"],
    body: `Our Initial Discovery Consultation (£195, 45 minutes with Dr Taiwo) is the best starting point. We'll review your health history, current symptoms, and goals then design a personalised plan.

The Core Metabolic Assessment (£595) is our most popular package and includes:
✓ Comprehensive blood panel (see below)
✓ CGM (continuous glucose monitor) guidance
✓ A full results review with Dr Taiwo
✓ Personalised optimisation plan with specific targets

All consultations are via secure video call no travel required. You can book at veridianclinic.com/book

What are your main health goals?`,
  },
  {
    label: "Blood panel",
    emoji: "🔬",
    keywords: ["blood", "test", "panel", "result", "lab", "biomarker", "marker", "cholesterol", "glucose", "hormone", "thyroid", "apob", "hba1c"],
    body: `Our blood panels go well beyond what most GPs test. The Core Metabolic Assessment panel includes:

Metabolic markers:
• ApoB & LDL particle size
• HbA1c & fasting insulin
• Fasting glucose

Hormonal:
• Full thyroid (TSH, Free T3, Free T4)
• Testosterone, oestrogen, SHBG
• DHEA, cortisol

Inflammation & nutrients:
• High-sensitivity CRP, homocysteine
• Vitamin D, B12, ferritin, folate

Results are typically ready within 5-7 days, then reviewed in detail with Dr Taiwo. Full marker list at veridianclinic.com/assessments

Any specific markers you're interested in?`,
  },
  {
    label: "How to book",
    emoji: "📅",
    keywords: ["book", "booking", "appointment", "available", "schedule", "when", "how do i", "next step", "start", "sign up", "register"],
    body: `Booking is straightforward:

1. Go to veridianclinic.com/book
2. Select your preferred service
3. Complete the short intake form
4. You'll receive a confirmation with video call details

Dr Taiwo is typically available Mon-Fri, 9am-6pm. We also offer early morning slots just mention this when booking and we'll do our best.

If you're not sure which service to start with, the Discovery Consultation (£195) is the right first step Dr Taiwo will assess your situation and recommend the best path forward.

Any questions before you book?`,
  },
  {
    label: "CGM / glucose monitoring",
    emoji: "📊",
    keywords: ["cgm", "glucose", "monitor", "sensor", "libre", "dexcom", "continuous", "blood sugar", "insulin resistance", "metabolic age"],
    body: `Continuous Glucose Monitoring (CGM) is a key part of our approach. A small sensor worn on your arm tracks your glucose 24/7 no finger pricks.

It shows us:
• How your body responds to different foods
• Your fasting glucose trends overnight
• Whether you have hidden insulin resistance
• How sleep, stress, and exercise affect your metabolism

CGM is included as part of our Core Metabolic Assessment and 12-Week Programme. We guide you through setup and help you interpret what the data means for you specifically.

Would you like to know more about what the data reveals?`,
  },
];

function detectTemplates(text: string): typeof TEMPLATES {
  if (!text) return [];
  const lower = text.toLowerCase();
  return TEMPLATES.filter(t => t.keywords.some(kw => lower.includes(kw)));
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pence(amount: number) { return `£${(amount / 100).toFixed(2)}`; }

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts * 1000) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function relTime(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const BAND_COLOURS: Record<string, string> = { strong: "#145226", drifting: "#8a5500", "high-risk": "#7a1616" };
const TIER_BADGE: Record<string, string> = {
  guide: "#1a3a5c", discovery: "#2d4a1e", "discovery-quiz": "#2d4a1e",
  "metabolic-screen": "#3a2d0a", baseline: "#1e2d3a", "longevity-panel": "#2a1a3a", programme: "#3a1a1a",
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
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/whatsapp");
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (e: any) {
      setError("Failed to load " + e.message);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function selectMessage(msg: WAMessage) {
    setSelected(msg);
    setReplyText("");
    setSendStatus("");
    setShowAllTemplates(false);
  }

  function applyTemplate(body: string) {
    setReplyText(body);
    setShowAllTemplates(false);
  }

  async function sendReply() {
    if (!selected || !replyText.trim()) return;
    setSending(true); setSendStatus("");
    try {
      const res = await fetch("/api/admin/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: selected.from, text: replyText.trim(), replyToMsgId: selected.id, markId: selected.id }),
      });
      if (!res.ok) throw new Error("send failed");
      setSendStatus("ok");
      setReplyText("");
      setMessages(prev => prev.map(m => m.id === selected.id ? { ...m, replied: true } : m));
      setSelected(prev => prev ? { ...prev, replied: true } : null);
    } catch { setSendStatus("err"); }
    finally { setSending(false); }
  }

  const suggested = selected?.text ? detectTemplates(selected.text) : [];
  const card = (extra?: React.CSSProperties) => ({ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px", ...extra });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "16px" }}>
      {/* ── Message list ── */}
      <div style={card({ padding: "18px" })}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <h2 style={{ color: "#f6f1e8", fontSize: "13px", fontWeight: "600", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Messages <span style={{ color: "#5a534a", fontWeight: "400" }}>({messages.length})</span>
          </h2>
          <button onClick={load} style={{ background: "#2c2a26", border: "1px solid #3a3830", color: "#c8a84b", padding: "4px 10px", borderRadius: "5px", fontSize: "11px", cursor: "pointer" }}>
            Refresh
          </button>
        </div>

        {error && <p style={{ color: "#c97b7b", fontSize: "12px", margin: "0 0 10px" }}>{error}</p>}
        {loading && <p style={{ color: "#5a534a", fontSize: "12px", textAlign: "center", margin: "40px 0" }}>Loading…</p>}
        {!loading && messages.length === 0 && (
          <p style={{ color: "#3a3830", fontSize: "12px", textAlign: "center", margin: "40px 8px", lineHeight: 1.7 }}>
            No messages yet.<br />They appear here when patients WhatsApp you.
          </p>
        )}

        <div style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
          {messages.map(msg => (
            <div key={msg.id} onClick={() => selectMessage(msg)} style={{
              padding: "10px 12px", borderRadius: "8px", marginBottom: "4px", cursor: "pointer",
              background: selected?.id === msg.id ? "#25251f" : "transparent",
              border: selected?.id === msg.id ? "1px solid #3a3830" : "1px solid transparent",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                    <span style={{ color: "#f6f1e8", fontSize: "12px", fontWeight: "600" }}>{msg.name}</span>
                    {!msg.replied && <span style={{ background: "#3a82f720", color: "#3a82f7", fontSize: "9px", padding: "1px 5px", borderRadius: "3px", border: "1px solid #3a82f740" }}>NEW</span>}
                    {msg.replied && <span style={{ background: "#14522620", color: "#4caf82", fontSize: "9px", padding: "1px 5px", borderRadius: "3px", border: "1px solid #14522640" }}>REPLIED</span>}
                  </div>
                  <p style={{ margin: 0, color: "#8a8278", fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {msg.type !== "text" ? `[${msg.type}]` : (msg.text || " ")}
                  </p>
                </div>
                <span style={{ color: "#3a3830", fontSize: "10px", marginLeft: "8px", flexShrink: 0 }}>{relTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reply panel ── */}
      <div style={card()}>
        {!selected ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "400px" }}>
            <p style={{ color: "#3a3830", fontSize: "13px", textAlign: "center" }}>Select a message to view and reply</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <h3 style={{ color: "#f6f1e8", fontSize: "15px", fontWeight: "600", margin: "0 0 3px" }}>{selected.name}</h3>
                <p style={{ color: "#5a534a", fontSize: "12px", margin: "0 0 2px" }}>+{selected.from}</p>
                <p style={{ color: "#3a3830", fontSize: "11px", margin: 0 }}>
                  {new Date(selected.timestamp).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <a href={`https://wa.me/${selected.from}`} target="_blank" rel="noopener noreferrer"
                style={{ background: "#25D36618", color: "#25D366", border: "1px solid #25D36630", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", textDecoration: "none" }}>
                Open in WA ↗
              </a>
            </div>

            {/* Message bubble */}
            <div style={{ background: "#111009", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px", border: "1px solid #2a2820" }}>
              {selected.type !== "text" ? (
                <p style={{ color: "#8a8278", fontSize: "13px", margin: 0, fontStyle: "italic" }}>[{selected.type} view in WhatsApp]</p>
              ) : (
                <p style={{ color: "#ede8df", fontSize: "14px", margin: 0, lineHeight: 1.65 }}>{selected.text || " "}</p>
              )}
            </div>

            {/* Suggested replies */}
            {suggested.length > 0 && (
              <div style={{ marginBottom: "12px" }}>
                <p style={{ color: "#5a534a", fontSize: "10px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Suggested replies</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {suggested.map(t => (
                    <button key={t.label} onClick={() => applyTemplate(t.body)}
                      style={{ background: "#2c2a26", border: "1px solid #3a3830", color: "#c8a84b", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All templates toggle */}
            <div style={{ marginBottom: "12px" }}>
              <button onClick={() => setShowAllTemplates(v => !v)}
                style={{ background: "none", border: "none", color: "#5a534a", fontSize: "11px", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                {showAllTemplates ? "Hide templates" : "All templates ▾"}
              </button>
              {showAllTemplates && (
                <div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {TEMPLATES.map(t => (
                    <button key={t.label} onClick={() => applyTemplate(t.body)}
                      style={{ background: "#1a1916", border: "1px solid #2a2820", color: "#8a8278", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reply textarea */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <label style={{ color: "#8a8278", fontSize: "10px", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reply</label>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={6}
                placeholder="Type or select a template above…"
                style={{ flex: 1, width: "100%", background: "#111009", border: "1px solid #3a3830", borderRadius: "8px", color: "#f6f1e8", fontSize: "13px", fontFamily: "Georgia, serif", padding: "12px 14px", resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: 1.6 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                <span style={{ fontSize: "11px", color: sendStatus === "ok" ? "#4caf82" : sendStatus === "err" ? "#c97b7b" : "#3a3830" }}>
                  {sendStatus === "ok" ? "✓ Sent via WhatsApp" : sendStatus === "err" ? "✗ Send failed check logs" : replyText.length > 0 ? `${replyText.length} chars` : "·"}
                </span>
                <button onClick={sendReply} disabled={sending || !replyText.trim()}
                  style={{ background: sending || !replyText.trim() ? "#2a2820" : "#25D366", color: sending || !replyText.trim() ? "#5a534a" : "#fff", border: "none", padding: "9px 22px", borderRadius: "7px", fontSize: "13px", fontWeight: "600", cursor: sending || !replyText.trim() ? "not-allowed" : "pointer" }}>
                  {sending ? "Sending…" : "Send via WhatsApp"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Social panel ─────────────────────────────────────────────────────────────

type SocialPlatform = "linkedin" | "twitter" | "both";
type PostStatus = "pending" | "posted" | "failed";

interface SocialPost {
  id: string; platform: SocialPlatform; linkedinContent: string; xContent: string;
  scheduledAt: number; status: PostStatus; createdAt: number; postedAt?: number; errorMsg?: string;
}

function fmtDate(ms: number) {
  return new Date(ms).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function SocialPanel() {
  const [linkedin, setLinkedin] = useState<{ connected: boolean; name?: string }>({ connected: false });
  const [twitter, setTwitter] = useState<{ connected: boolean }>({ connected: false });
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [queueFilter, setQueueFilter] = useState<PostStatus>("pending");
  const [queueLoading, setQueueLoading] = useState(true);

  const [topic, setTopic] = useState("");
  const [linkedinDraft, setLinkedinDraft] = useState("");
  const [xDraft, setXDraft] = useState("");
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftErr, setDraftErr] = useState("");

  const [platform, setPlatform] = useState<SocialPlatform>("both");
  const [scheduleTime, setScheduleTime] = useState("");
  const [postNow, setPostNow] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [scheduleMsg, setScheduleMsg] = useState("");

  const [actingId, setActingId] = useState<string | null>(null);

  const loadQueue = useCallback(async () => {
    setQueueLoading(true);
    try {
      const res = await fetch("/api/social/queue");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setLinkedin(data.linkedin || { connected: false });
        setTwitter(data.twitter || { connected: false });
      }
    } finally { setQueueLoading(false); }
  }, []);

  useEffect(() => { loadQueue(); }, [loadQueue]);

  // Check for ?connected=linkedin or ?error= after OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "linkedin") loadQueue();
  }, [loadQueue]);

  async function generateDraft() {
    if (!topic.trim()) return;
    setDraftLoading(true); setDraftErr("");
    try {
      const res = await fetch("/api/social/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) { setDraftErr(data.error || "Draft failed"); return; }
      setLinkedinDraft(data.linkedin || "");
      setXDraft(data.x || "");
    } catch { setDraftErr("Network error"); }
    finally { setDraftLoading(false); }
  }

  async function schedulePost() {
    const scheduledAt = postNow ? Date.now() : new Date(scheduleTime).getTime();
    if (!postNow && (!scheduleTime || isNaN(scheduledAt))) {
      setScheduleMsg("Pick a date/time first."); return;
    }
    if ((platform === "linkedin" || platform === "both") && !linkedinDraft.trim()) {
      setScheduleMsg("LinkedIn draft is empty."); return;
    }
    if ((platform === "twitter" || platform === "both") && !xDraft.trim()) {
      setScheduleMsg("X draft is empty."); return;
    }
    if ((platform === "twitter" || platform === "both") && xDraft.trim().length > 280) {
      setScheduleMsg("X post exceeds 280 characters."); return;
    }

    setScheduling(true); setScheduleMsg("");
    try {
      const res = await fetch("/api/social/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, linkedinContent: linkedinDraft, xContent: xDraft, scheduledAt }),
      });
      const data = await res.json();
      if (!res.ok) { setScheduleMsg(data.error || "Failed"); return; }

      if (postNow) {
        // Publish immediately
        const pubRes = await fetch("/api/social/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: data.post.id }),
        });
        const pubData = await pubRes.json();
        setScheduleMsg(pubData.ok ? "Published!" : `Error: ${pubData.errors?.join(", ")}`);
      } else {
        setScheduleMsg(`Scheduled for ${fmtDate(scheduledAt)}`);
      }

      setLinkedinDraft(""); setXDraft(""); setTopic(""); setScheduleTime("");
      await loadQueue();
    } finally { setScheduling(false); }
  }

  async function publishNow(post: SocialPost) {
    setActingId(post.id);
    try {
      const res = await fetch("/api/social/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id }),
      });
      await loadQueue();
    } finally { setActingId(null); }
  }

  async function deletePost(post: SocialPost) {
    setActingId(post.id);
    try {
      await fetch("/api/social/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id }),
      });
      await loadQueue();
    } finally { setActingId(null); }
  }

  const card = (extra?: React.CSSProperties): React.CSSProperties => ({ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px", ...extra });
  const inp = (extra?: React.CSSProperties): React.CSSProperties => ({ width: "100%", background: "#111009", border: "1px solid #3a3830", borderRadius: "6px", color: "#f6f1e8", fontSize: "13px", fontFamily: "Georgia, serif", padding: "10px 12px", outline: "none", boxSizing: "border-box" as const, ...extra });
  const lbl: React.CSSProperties = { color: "#5a534a", fontSize: "11px", display: "block", marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.05em" };

  const filteredPosts = posts.filter(p => p.status === queueFilter);
  const PLATFORM_LABELS: Record<SocialPlatform, string> = { linkedin: "LinkedIn", twitter: "X/Twitter", both: "LinkedIn + X" };
  const STATUS_COLOUR: Record<PostStatus, string> = { pending: "#c8a84b", posted: "#4caf82", failed: "#c97b7b" };

  return (
    <div style={{ display: "grid", gap: "20px" }}>

      {/* Platform connections */}
      <div style={card()}>
        <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>Platform connections</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* LinkedIn */}
          <div style={{ background: "#111009", border: "1px solid #2a2820", borderRadius: "8px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 4px", color: "#f6f1e8", fontSize: "13px", fontWeight: "600" }}>LinkedIn</p>
                {linkedin.connected
                  ? <p style={{ margin: 0, color: "#4caf82", fontSize: "12px" }}>Connected{linkedin.name ? ` as ${linkedin.name}` : ""}</p>
                  : <p style={{ margin: 0, color: "#8a8278", fontSize: "12px" }}>Not connected</p>}
              </div>
              {!linkedin.connected && (
                <a href="/api/auth/linkedin"
                  style={{ background: "#0a66c2", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", textDecoration: "none", fontWeight: "600", fontFamily: "Georgia, serif" }}>
                  Connect
                </a>
              )}
            </div>
            {!linkedin.connected && (
              <p style={{ margin: "10px 0 0", color: "#5a534a", fontSize: "11px", lineHeight: 1.6 }}>
                Requires a LinkedIn Developer App — set <code style={{ color: "#c8a84b" }}>LINKEDIN_CLIENT_ID</code> + <code style={{ color: "#c8a84b" }}>LINKEDIN_CLIENT_SECRET</code> on Railway first.
              </p>
            )}
          </div>

          {/* X/Twitter */}
          <div style={{ background: "#111009", border: "1px solid #2a2820", borderRadius: "8px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 4px", color: "#f6f1e8", fontSize: "13px", fontWeight: "600" }}>X / Twitter</p>
                {twitter.connected
                  ? <p style={{ margin: 0, color: "#4caf82", fontSize: "12px" }}>Connected</p>
                  : <p style={{ margin: 0, color: "#8a8278", fontSize: "12px" }}>Not connected</p>}
              </div>
            </div>
            {!twitter.connected && (
              <p style={{ margin: "10px 0 0", color: "#5a534a", fontSize: "11px", lineHeight: 1.6 }}>
                Set <code style={{ color: "#c8a84b" }}>TWITTER_CONSUMER_KEY</code>, <code style={{ color: "#c8a84b" }}>TWITTER_CONSUMER_SECRET</code>, <code style={{ color: "#c8a84b" }}>TWITTER_ACCESS_TOKEN</code>, <code style={{ color: "#c8a84b" }}>TWITTER_ACCESS_SECRET</code> on Railway using your developer.twitter.com app.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Draft & schedule */}
      <div style={card()}>
        <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>Draft & schedule</h2>
        <div style={{ display: "grid", gap: "14px" }}>
          <div>
            <label style={lbl}>Topic or angle</label>
            <textarea value={topic} onChange={e => setTopic(e.target.value)} rows={2}
              placeholder="e.g. Why fasting insulin matters more than HbA1c for early metabolic dysfunction"
              style={{ ...inp(), resize: "vertical" }} />
          </div>

          <button onClick={generateDraft} disabled={!topic.trim() || draftLoading}
            style={{ background: !topic.trim() || draftLoading ? "#2a2820" : "#2d4a1e", color: !topic.trim() || draftLoading ? "#5a534a" : "#f6f1e8", border: "none", padding: "9px 20px", borderRadius: "7px", fontSize: "13px", fontWeight: "600", cursor: "pointer", alignSelf: "start" }}>
            {draftLoading ? "Generating…" : "Generate drafts with AI"}
          </button>

          {draftErr && <p style={{ margin: 0, color: "#c97b7b", fontSize: "12px" }}>{draftErr}</p>}

          {(linkedinDraft || xDraft) && (
            <>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                  <label style={{ ...lbl, marginBottom: 0 }}>LinkedIn post</label>
                  <span style={{ fontSize: "11px", color: "#5a534a" }}>{linkedinDraft.length} chars</span>
                </div>
                <textarea value={linkedinDraft} onChange={e => setLinkedinDraft(e.target.value)} rows={8}
                  style={{ ...inp(), resize: "vertical", lineHeight: "1.6" }} />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                  <label style={{ ...lbl, marginBottom: 0 }}>X / Twitter post</label>
                  <span style={{ fontSize: "11px", color: xDraft.length > 280 ? "#c97b7b" : "#5a534a" }}>{xDraft.length}/280</span>
                </div>
                <textarea value={xDraft} onChange={e => setXDraft(e.target.value)} rows={3}
                  style={{ ...inp(), resize: "vertical", lineHeight: "1.6", borderColor: xDraft.length > 280 ? "#7a1616" : "#3a3830" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={lbl}>Platform</label>
                  <select value={platform} onChange={e => setPlatform(e.target.value as SocialPlatform)} style={inp()}>
                    <option value="both">LinkedIn + X/Twitter</option>
                    <option value="linkedin">LinkedIn only</option>
                    <option value="twitter">X/Twitter only</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Schedule time</label>
                  <input type="datetime-local" value={scheduleTime} onChange={e => { setScheduleTime(e.target.value); setPostNow(false); }}
                    disabled={postNow} style={{ ...inp(), opacity: postNow ? 0.4 : 1 }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="postNow" checked={postNow} onChange={e => setPostNow(e.target.checked)}
                  style={{ accentColor: "#c8a84b" }} />
                <label htmlFor="postNow" style={{ color: "#8a8278", fontSize: "13px", cursor: "pointer" }}>Post immediately</label>
              </div>

              {scheduleMsg && (
                <p style={{ margin: 0, fontSize: "13px", color: scheduleMsg.startsWith("Error") ? "#c97b7b" : "#4caf82" }}>{scheduleMsg}</p>
              )}

              <button onClick={schedulePost} disabled={scheduling}
                style={{ background: scheduling ? "#2a2820" : "#c8a84b", color: scheduling ? "#5a534a" : "#111009", border: "none", padding: "10px 24px", borderRadius: "7px", fontSize: "13px", fontWeight: "600", cursor: scheduling ? "not-allowed" : "pointer", alignSelf: "start" }}>
                {scheduling ? "Working…" : postNow ? "Publish now" : "Schedule post"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Post queue */}
      <div style={card()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: 0, letterSpacing: "0.04em" }}>Post queue</h2>
          <div style={{ display: "flex", gap: "6px" }}>
            {(["pending", "posted", "failed"] as PostStatus[]).map(s => (
              <button key={s} onClick={() => setQueueFilter(s)}
                style={{ background: queueFilter === s ? "#25251f" : "transparent", border: `1px solid ${queueFilter === s ? "#3a3830" : "transparent"}`, color: queueFilter === s ? STATUS_COLOUR[s] : "#5a534a", padding: "4px 12px", borderRadius: "5px", fontSize: "11px", cursor: "pointer", fontFamily: "Georgia, serif", textTransform: "capitalize" }}>
                {s} ({posts.filter(p => p.status === s).length})
              </button>
            ))}
            <button onClick={loadQueue} style={{ background: "#2c2a26", border: "1px solid #3a3830", color: "#c8a84b", padding: "4px 10px", borderRadius: "5px", fontSize: "11px", cursor: "pointer" }}>Refresh</button>
          </div>
        </div>

        {queueLoading && <p style={{ color: "#5a534a", fontSize: "13px", textAlign: "center", margin: "40px 0" }}>Loading…</p>}
        {!queueLoading && filteredPosts.length === 0 && (
          <p style={{ color: "#3a3830", fontSize: "13px", textAlign: "center", margin: "40px 0" }}>No {queueFilter} posts.</p>
        )}

        {filteredPosts.map(post => (
          <div key={post.id} style={{ padding: "14px 0", borderBottom: "1px solid #2a2820" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                  <span style={{ background: "#2a2820", color: "#c8a84b", fontSize: "10px", padding: "2px 7px", borderRadius: "4px", letterSpacing: "0.05em" }}>
                    {PLATFORM_LABELS[post.platform]}
                  </span>
                  <span style={{ color: STATUS_COLOUR[post.status], fontSize: "11px", textTransform: "capitalize" }}>{post.status}</span>
                  <span style={{ color: "#5a534a", fontSize: "11px" }}>
                    {post.status === "posted" ? `Posted ${fmtDate(post.postedAt!)}` : `Due ${fmtDate(post.scheduledAt)}`}
                  </span>
                </div>
                {(post.platform === "linkedin" || post.platform === "both") && post.linkedinContent && (
                  <p style={{ margin: "0 0 4px", color: "#ede8df", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    LI: {post.linkedinContent.slice(0, 120)}…
                  </p>
                )}
                {(post.platform === "twitter" || post.platform === "both") && post.xContent && (
                  <p style={{ margin: 0, color: "#8a8278", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    X: {post.xContent}
                  </p>
                )}
                {post.errorMsg && (
                  <p style={{ margin: "4px 0 0", color: "#c97b7b", fontSize: "11px" }}>{post.errorMsg}</p>
                )}
              </div>
              {post.status !== "posted" && (
                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button onClick={() => publishNow(post)} disabled={actingId === post.id}
                    style={{ background: "#2d4a1e", color: "#f6f1e8", border: "none", padding: "5px 12px", borderRadius: "5px", fontSize: "11px", cursor: "pointer" }}>
                    {actingId === post.id ? "…" : "Publish now"}
                  </button>
                  <button onClick={() => deletePost(post)} disabled={actingId === post.id}
                    style={{ background: "#2a2820", color: "#8a8278", border: "1px solid #3a3830", padding: "5px 10px", borderRadius: "5px", fontSize: "11px", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Refund panel ─────────────────────────────────────────────────────────────

function RefundPanel() {
  const [sessionId, setSessionId] = useState("");
  const [reason, setReason] = useState("requested_by_customer");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{ refundId: string; status: string; amountPence: number; currency: string } | null>(null);
  const [errMsg, setErrMsg] = useState("");

  async function handleRefund() {
    if (!sessionId.trim()) return;
    setStatus("loading");
    setErrMsg("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.trim(), reason }),
      });
      const data = await res.json();
      if (!res.ok) { setErrMsg(data?.error || "Refund failed."); setStatus("error"); return; }
      setResult(data);
      setStatus("done");
      setSessionId("");
    } catch {
      setErrMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <p style={{ color: "#8a8278", fontSize: "12px", marginBottom: "24px", lineHeight: 1.7 }}>
        Enter a Stripe checkout session ID to issue a full refund. You can find session IDs in the recent payments list (hover over a payment row and check the Stripe dashboard, or locate the session ID from the checkout URL or webhook log).
      </p>

      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={{ color: "#5a534a", fontSize: "11px", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Stripe checkout session ID</label>
          <input
            type="text"
            value={sessionId}
            onChange={e => setSessionId(e.target.value)}
            placeholder="cs_live_..."
            style={{ width: "100%", background: "#111009", border: "1px solid #3a3830", borderRadius: "6px", color: "#f6f1e8", fontSize: "13px", fontFamily: "Georgia, serif", padding: "10px 12px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ color: "#5a534a", fontSize: "11px", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reason</label>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            style={{ width: "100%", background: "#111009", border: "1px solid #3a3830", borderRadius: "6px", color: "#f6f1e8", fontSize: "13px", fontFamily: "Georgia, serif", padding: "10px 12px", outline: "none", boxSizing: "border-box" }}
          >
            <option value="requested_by_customer">Requested by customer</option>
            <option value="duplicate">Duplicate payment</option>
            <option value="fraudulent">Fraudulent</option>
          </select>
        </div>

        {errMsg && <p style={{ color: "#c97b7b", fontSize: "13px", margin: 0 }}>{errMsg}</p>}

        {status === "done" && result && (
          <div style={{ background: "#145226" + "30", border: "1px solid #14522660", borderRadius: "8px", padding: "14px 16px" }}>
            <p style={{ margin: "0 0 4px", color: "#4caf82", fontSize: "13px", fontWeight: "600" }}>Refund issued successfully</p>
            <p style={{ margin: 0, color: "#8a8278", fontSize: "12px" }}>
              ID: {result.refundId} &middot; Status: {result.status} &middot; Amount: &pound;{(result.amountPence / 100).toFixed(2)} {result.currency?.toUpperCase()}
            </p>
          </div>
        )}

        <button
          onClick={handleRefund}
          disabled={!sessionId.trim() || status === "loading"}
          style={{
            background: (!sessionId.trim() || status === "loading") ? "#2a2820" : "#7a1616",
            color: (!sessionId.trim() || status === "loading") ? "#5a534a" : "#f6f1e8",
            border: "none", padding: "11px 24px", borderRadius: "7px", fontSize: "13px", fontWeight: "600",
            cursor: (!sessionId.trim() || status === "loading") ? "not-allowed" : "pointer", alignSelf: "start",
          }}
        >
          {status === "loading" ? "Processing..." : "Issue Full Refund"}
        </button>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboardClient({
  stats, error, initialTab = "overview",
}: {
  stats: Stats | null; error: string; initialTab?: "overview" | "whatsapp" | "social";
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "whatsapp" | "refund" | "social" | "interpret">(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("tab") === "social") return "social";
    }
    return (initialTab as "overview" | "whatsapp" | "refund" | "social") || "overview";
  });

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    background: "none", border: "none",
    borderBottom: active ? "2px solid #c8a84b" : "2px solid transparent",
    color: active ? "#c8a84b" : "#5a534a",
    padding: "0 2px", paddingBottom: "4px",
    fontSize: "13px", fontWeight: active ? "600" : "400",
    cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: "0.03em",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#111009", color: "#f6f1e8", fontFamily: "Georgia, serif" }}>
      {/* Top bar */}
      <div style={{ background: "#1a1916", borderBottom: "1px solid #2a2820", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#c8a84b", fontSize: "18px" }}>⚕</span>
          <span style={{ color: "#f6f1e8", fontWeight: "600", fontSize: "15px" }}>Veridian Admin</span>
          <span style={{ background: "#c8a84b20", color: "#c8a84b", fontSize: "11px", padding: "2px 8px", borderRadius: "4px", border: "1px solid #c8a84b30", letterSpacing: "0.05em" }}>CLINICAL OPS</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {stats && activeTab === "overview" && (
            <span style={{ color: "#5a534a", fontSize: "12px" }}>Updated {new Date(stats.generatedAt).toLocaleTimeString("en-GB")}</span>
          )}
          {activeTab === "overview" && (
            <button onClick={() => router.refresh()} style={{ background: "#2c2a26", border: "1px solid #3a3830", color: "#c8a84b", padding: "7px 14px", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>
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
        <button style={tabStyle(activeTab === "overview")} onClick={() => setActiveTab("overview")}>Overview</button>
        <button style={tabStyle(activeTab === "whatsapp")} onClick={() => setActiveTab("whatsapp")}>📱 WhatsApp</button>
        <button style={tabStyle(activeTab === "refund")} onClick={() => setActiveTab("refund")}>Refunds</button>
        <button style={tabStyle(activeTab === "social")} onClick={() => setActiveTab("social")}>Social</button>
        <button style={tabStyle(activeTab === "interpret")} onClick={() => setActiveTab("interpret")}>Interpret</button>
      </div>

      <div style={{ padding: "28px 24px", maxWidth: "1400px", margin: "0 auto" }}>

        {/* ── Overview tab ── */}
        {activeTab === "overview" && (
          <>
            {error && <div style={{ background: "#7a161620", border: "1px solid #7a1616", color: "#c97b7b", padding: "14px 18px", borderRadius: "8px", marginBottom: "24px" }}>{error}</div>}
            {!stats && !error && <p style={{ color: "#5a534a", textAlign: "center", marginTop: "80px" }}>Loading...</p>}
            {stats && (
              <>
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

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>Patient flow funnel</h2>
                    {[
                      { stage: "Quiz completions", count: stats.funnel.quizCompletions, colour: "#3a82f7" },
                      { stage: "Guide downloads (free)", count: stats.funnel.guidePurchases, colour: "#c8a84b" },
                      { stage: "Discovery calls (£97-£195)", count: stats.funnel.discoveryCalls, colour: "#145226" },
                      { stage: "Blood tests (£195-£795)", count: stats.funnel.bloodTests, colour: "#8b5cf6" },
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
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>Revenue by product</h2>
                    {Object.keys(stats.revenue.byTier).length === 0 && <p style={{ color: "#3a3830", fontSize: "13px" }}>No paid sessions yet.</p>}
                    {Object.entries(stats.revenue.byTier).sort((a, b) => b[1].amount - a[1].amount).map(([tier, data]) => (
                      <div key={tier} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2a2820" }}>
                        <div>
                          <span style={{ background: TIER_BADGE[tier] || "#2a2820", color: "#c8a84b", fontSize: "10px", padding: "2px 7px", borderRadius: "4px", marginRight: "8px", letterSpacing: "0.05em" }}>×{data.count}</span>
                          <span style={{ color: "#ede8df", fontSize: "13px" }}>{data.name}</span>
                        </div>
                        <span style={{ color: "#c8a84b", fontWeight: "700", fontSize: "15px" }}>{pence(data.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>Recent payments</h2>
                    {stats.recentPayments.length === 0 && <p style={{ color: "#3a3830", fontSize: "13px" }}>No payments yet.</p>}
                    {stats.recentPayments.map(p => (
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
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 18px", letterSpacing: "0.04em" }}>Recent leads</h2>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                      {Object.entries(stats.leads.byBand).map(([band, count]) => (
                        <span key={band} style={{ background: `${BAND_COLOURS[band] || "#2a2820"}30`, border: `1px solid ${BAND_COLOURS[band] || "#3a3830"}60`, color: BAND_COLOURS[band] || "#8a8278", fontSize: "12px", padding: "4px 10px", borderRadius: "6px" }}>
                          {band}: {count}
                        </span>
                      ))}
                    </div>
                    {stats.leads.recent.length === 0 && <p style={{ color: "#3a3830", fontSize: "13px" }}>No leads yet.</p>}
                    {stats.leads.recent.map((lead, i) => (
                      <div key={i} style={{ padding: "9px 0", borderBottom: "1px solid #2a2820" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div>
                            <p style={{ margin: "0 0 2px", color: "#ede8df", fontSize: "13px" }}>{lead.firstName ? `${lead.firstName} ` : ""}{lead.email}</p>
                            <p style={{ margin: 0, color: "#5a534a", fontSize: "11px" }}>
                              {lead.source}
                              {lead.resultBand && <span style={{ marginLeft: "6px", color: BAND_COLOURS[lead.resultBand] || "#8a8278" }}>• {lead.resultBand}{lead.metabolicAge ? ` (age ${lead.metabolicAge})` : ""}</span>}
                            </p>
                          </div>
                          <span style={{ color: "#3a3830", fontSize: "11px" }}>{new Date(lead.timestamp).toLocaleDateString("en-GB")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {Object.keys(stats.leads.bySource).length > 0 && (
                  <div style={{ background: "#1a1916", border: "1px solid #2a2820", borderRadius: "10px", padding: "22px" }}>
                    <h2 style={{ color: "#f6f1e8", fontSize: "14px", fontWeight: "600", margin: "0 0 16px", letterSpacing: "0.04em" }}>Lead sources</h2>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {Object.entries(stats.leads.bySource).sort((a, b) => b[1] - a[1]).map(([source, count]) => (
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

        {/* ── WhatsApp tab ── */}
        {activeTab === "whatsapp" && <WhatsAppInbox />}

        {/* ── Social tab ── */}
        {activeTab === "social" && (
          <div>
            <h2 style={{ color: "#f6f1e8", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>Social scheduling</h2>
            <p style={{ color: "#5a534a", fontSize: "12px", margin: "0 0 24px" }}>Draft posts with AI, schedule to LinkedIn and X/Twitter.</p>
            <SocialPanel />
          </div>
        )}

        {/* ── Refund tab ── */}
        {activeTab === "refund" && (
          <div>
            <h2 style={{ color: "#f6f1e8", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>Issue Refund</h2>
            <p style={{ color: "#5a534a", fontSize: "12px", margin: "0 0 24px" }}>Full refund only. Partial refunds must be done directly in the Stripe dashboard.</p>
            <RefundPanel />
          </div>
        )}

        {/* ── Interpret tab ── */}
        {activeTab === "interpret" && <InterpretPanel />}

      </div>
    </div>
  );
}

// ── Blood test interpretation panel ──────────────────────────────────────────

function InterpretPanel() {
  const [email, setEmail] = useState("");
  const [panelName, setPanelName] = useState("");
  const [resultsText, setResultsText] = useState("");
  const [draft, setDraft] = useState("");
  const [editedDraft, setEditedDraft] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "drafted" | "sent">("idle");
  const [error, setError] = useState("");

  const inp: React.CSSProperties = { width: "100%", padding: "10px 13px", background: "#1a1916", border: "1px solid #3a3830", color: "#f6f1e8", fontSize: "13px", boxSizing: "border-box", outline: "none" };
  const lbl: React.CSSProperties = { fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8278", marginBottom: "6px", display: "block" };

  async function generate() {
    if (!email || !resultsText) { setError("Email and results text are required."); return; }
    setGenerating(true); setError("");
    try {
      const res = await fetch("/api/admin/interpret", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, resultsText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "generation failed");
      setDraft(data.draft);
      setEditedDraft(data.draft);
      setStatus("drafted");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "failed");
    } finally {
      setGenerating(false);
    }
  }

  async function sendReport() {
    if (!editedDraft || !email) return;
    setSending(true); setError("");
    try {
      const res = await fetch("/api/admin/send-interpretation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ patientEmail: email, patientName: "", panelName, reportText: editedDraft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "send failed");
      setStatus("sent");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "send failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ maxWidth: "820px" }}>
      <h2 style={{ color: "#f6f1e8", fontSize: "16px", fontWeight: "600", margin: "0 0 6px" }}>Blood Test Interpretation</h2>
      <p style={{ color: "#5a534a", fontSize: "12px", margin: "0 0 24px", lineHeight: "1.6" }}>Paste the patient&apos;s results, generate a draft interpretation using UK optimal ranges, review and edit, then send.</p>

      {error && <div style={{ background: "rgba(122,22,22,.2)", border: "1px solid #7a1616", color: "#c97b7b", padding: "12px 16px", fontSize: "13px", marginBottom: "20px" }}>{error}</div>}

      {status === "sent" ? (
        <div style={{ background: "rgba(20,82,38,.2)", border: "1px solid #145226", color: "#6bbf7a", padding: "20px 24px", fontSize: "14px" }}>
          Report sent to {email}. Check Brevo for delivery confirmation.
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gap: "16px", marginBottom: "20px" }}>
            <div>
              <span style={lbl}>Patient email</span>
              <input style={inp} type="email" placeholder="patient@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <p style={{ fontSize: "11px", color: "#5a534a", margin: "4px 0 0", lineHeight: "1.5" }}>Used to look up their questionnaire answers from Redis for context.</p>
            </div>
            <div>
              <span style={lbl}>Panel name (for email subject)</span>
              <input style={inp} type="text" placeholder="e.g. Is It My Hormones? Panel" value={panelName} onChange={e => setPanelName(e.target.value)} />
            </div>
            <div>
              <span style={lbl}>Blood test results — paste raw values</span>
              <p style={{ fontSize: "11px", color: "#5a534a", margin: "0 0 6px", lineHeight: "1.5" }}>Copy from Randox portal or PDF. Include marker names and values with units. One per line is fine.</p>
              <textarea
                style={{ ...inp, height: "220px", resize: "vertical", lineHeight: "1.6" }}
                placeholder={"TSH: 2.8 mIU/L\nFT4: 14.2 pmol/L\nFT3: 4.1 pmol/L\nTPO antibodies: 42 IU/mL\nFasting Insulin: 18.4 mIU/L\n..."}
                value={resultsText}
                onChange={e => setResultsText(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={generate}
            disabled={generating || !email || !resultsText}
            style={{ background: generating ? "#2a2820" : "#c8a84b", color: generating ? "#5a534a" : "#2c2a26", border: "none", padding: "11px 24px", fontSize: "13px", fontWeight: "700", cursor: generating ? "default" : "pointer", marginBottom: "24px" }}
          >
            {generating ? "Generating draft..." : status === "drafted" ? "Regenerate draft" : "Generate draft interpretation"}
          </button>

          {status === "drafted" && (
            <div style={{ marginTop: "8px" }}>
              <span style={{ ...lbl, marginBottom: "8px" }}>Draft report — review and edit before sending</span>
              <div style={{ background: "#0f0e0c", border: "1px solid #2a2820", padding: "6px 10px", marginBottom: "8px" }}>
                <p style={{ color: "#5a534a", fontSize: "11px", margin: "0", lineHeight: "1.5" }}>
                  IMPORTANT: This is an AI-generated draft. Read it carefully. Check every clinical claim against the actual results. Edit freely before sending. You are responsible for the final report.
                </p>
              </div>
              <textarea
                style={{ ...inp, height: "480px", resize: "vertical", lineHeight: "1.7", fontSize: "13px" }}
                value={editedDraft}
                onChange={e => setEditedDraft(e.target.value)}
              />
              <div style={{ display: "flex", gap: "12px", marginTop: "16px", alignItems: "center" }}>
                <button
                  onClick={sendReport}
                  disabled={sending || !editedDraft}
                  style={{ background: sending ? "#2a2820" : "#145226", color: sending ? "#5a534a" : "#6bbf7a", border: "none", padding: "11px 28px", fontSize: "13px", fontWeight: "700", cursor: sending ? "default" : "pointer" }}
                >
                  {sending ? "Sending..." : `Send report to ${email}`}
                </button>
                <p style={{ color: "#5a534a", fontSize: "11px", margin: 0 }}>Sends via Brevo from support@veridianclinic.com</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
