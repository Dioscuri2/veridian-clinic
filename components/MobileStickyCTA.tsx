"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { bookUrl } from "@/data/panels";

/** Mobile-only sticky bottom CTA bar. Appears after the visitor scrolls past
 *  the hero so the offer and booking action stay one tap away. */
export default function MobileStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("vc-sticky-cta", show);
    return () => document.body.classList.remove("vc-sticky-cta");
  }, [show]);

  return (
    <>
      <style>{`
        .msc-bar {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 9990;
          display: none;
          align-items: center; justify-content: space-between; gap: 12px;
          padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
          background: rgba(44,42,38,.97);
          border-top: 1px solid rgba(200,168,75,.35);
          transform: translateY(100%); transition: transform .35s ease;
        }
        .msc-bar.msc-show { transform: translateY(0); }
        .msc-label {
          font-size: .68rem; font-weight: 600; letter-spacing: .08em;
          text-transform: uppercase; color: var(--go2); line-height: 1.3;
          margin: 0; min-width: 0;
        }
        .msc-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .msc-btn {
          font-size: .76rem; font-weight: 600; letter-spacing: .05em;
          padding: 10px 14px; text-decoration: none; white-space: nowrap;
        }
        .msc-book { background: var(--go); color: var(--fo); }
        .msc-quiz { border: 1px solid rgba(246,241,232,.4); color: var(--iv); }
        @media (max-width: 899px) {
          .msc-bar { display: flex; }
          body.vc-sticky-cta .ava-toggle { bottom: 88px !important; }
        }
      `}</style>
      <div className={`msc-bar${show ? " msc-show" : ""}`} aria-hidden={!show}>
        <p className="msc-label">GP-led metabolic clinic</p>
        <div className="msc-actions">
          <Link href={bookUrl("discovery")} className="msc-btn msc-book" tabIndex={show ? 0 : -1}>
            Book →
          </Link>
          <Link href="/metabolic-quiz" className="msc-btn msc-quiz" tabIndex={show ? 0 : -1}>
            Free quiz
          </Link>
        </div>
      </div>
    </>
  );
}
