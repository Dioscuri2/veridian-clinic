"use client";
import Script from "next/script";

// Calendly global — shared type is declared in CalendlyInline.tsx; augment here only if needed
type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (opts: { url: string }) => void;
    initInlineWidget: (opts: { url: string; parentElement: HTMLElement | null }) => void;
  };
};

interface Props {
  url: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CalendlyPopupButton({ url, children, className, style }: Props) {
  function open() {
    const w = window as CalendlyWindow;
    if (typeof window !== "undefined" && w.Calendly) {
      w.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      {/* Calendly popup styles — Next.js deduplicates */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <button onClick={open} className={className} style={{ fontFamily: "inherit", cursor: "pointer", ...style }}>
        {children}
      </button>
    </>
  );
}
