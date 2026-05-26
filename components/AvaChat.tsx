"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Message = { role: "user" | "assistant"; content: string };

const COLORS = {
  brand: "#2c2a26",
  gold: "#c8a84b",
  ivory: "#f6f1e8",
  ivoryDark: "#ede8df",
  muted: "#8a8278",
  white: "#ffffff",
};

export default function AvaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Ava — your Veridian health assistant. I can help with blood test panels, consultation packages, pricing, and booking. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const submit = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = messages.slice(-10);

    try {
      const res = await fetch("/api/ava-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply =
        data.reply || "Sorry, I didn't catch that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again or email support@veridianclinic.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Ava chat" : "Chat with Ava"}
        aria-expanded={open}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: COLORS.brand,
          border: `2px solid ${COLORS.gold}`,
          cursor: "pointer",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(44,42,38,0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          padding: 0,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.08)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill={COLORS.gold}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill={COLORS.gold}>
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="ava-panel"
          role="dialog"
          aria-label="Ava — Veridian health assistant"
          aria-modal="true"
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            width: 380,
            height: 520,
            background: COLORS.ivory,
            borderRadius: 16,
            boxShadow: "0 8px 48px rgba(44,42,38,0.22)",
            zIndex: 9997,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: COLORS.brand,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: COLORS.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={COLORS.brand}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: COLORS.ivory,
                  fontWeight: 600,
                  fontSize: 15,
                  lineHeight: 1.2,
                }}
              >
                Ava
              </div>
              <div
                style={{ color: COLORS.gold, fontSize: 12, opacity: 0.9 }}
              >
                Veridian Health Assistant
              </div>
            </div>
            <a
              href="https://wa.me/447344290497?text=Hi%2C%20I%20found%20you%20via%20Veridian%20Clinic%20and%20would%20like%20to%20find%20out%20more."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Message us on WhatsApp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#25D366",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: COLORS.muted,
                lineHeight: 1,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.ivoryDark}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            aria-live="polite"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "82%",
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontSize: 14,
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.role === "user" ? COLORS.brand : COLORS.white,
                  color:
                    msg.role === "user" ? COLORS.ivory : COLORS.brand,
                  borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                  borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14,
                  boxShadow: "0 1px 4px rgba(44,42,38,0.08)",
                }}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: COLORS.white,
                  borderRadius: "14px 14px 14px 4px",
                  padding: "10px 16px",
                  display: "flex",
                  gap: 5,
                  boxShadow: "0 1px 4px rgba(44,42,38,0.08)",
                }}
              >
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: COLORS.gold,
                      display: "inline-block",
                      animation: `ava-bounce 1.2s ${delay}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderTop: `1px solid ${COLORS.ivoryDark}`,
              flexShrink: 0,
              background: COLORS.ivory,
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 80) + "px";
              }}
              onKeyDown={handleKey}
              placeholder="Ask me anything…"
              rows={1}
              aria-label="Message Ava"
              style={{
                flex: 1,
                border: `1px solid ${COLORS.ivoryDark}`,
                borderRadius: 22,
                padding: "9px 14px",
                fontSize: 14,
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                color: COLORS.brand,
                background: COLORS.white,
                maxHeight: 80,
                overflowY: "auto",
                lineHeight: 1.4,
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = COLORS.gold)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = COLORS.ivoryDark)
              }
            />
            <button
              onClick={submit}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background:
                  !input.trim() || loading ? COLORS.ivoryDark : COLORS.brand,
                border: "none",
                cursor: !input.trim() || loading ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              {loading ? (
                <span
                  style={{
                    width: 16,
                    height: 16,
                    border: `2px solid ${COLORS.muted}`,
                    borderTopColor: COLORS.gold,
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "ava-spin 0.7s linear infinite",
                  }}
                />
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill={!input.trim() ? COLORS.muted : COLORS.gold}
                >
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes ava-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes ava-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          .ava-panel {
            width: calc(100vw - 16px) !important;
            height: calc(100dvh - 100px) !important;
            right: 8px !important;
            bottom: 76px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
