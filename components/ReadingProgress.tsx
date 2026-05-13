"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "var(--nav-h)",
        left: 0,
        zIndex: 299,
        height: 2,
        width: `${pct}%`,
        background: "var(--go)",
        transition: "width .1s linear",
        pointerEvents: "none",
      }}
    />
  );
}
