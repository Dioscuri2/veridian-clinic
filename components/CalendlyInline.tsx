"use client";
import { useEffect } from "react";
import Script from "next/script";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (opts: { url: string; parentElement: HTMLElement | null; prefill?: object }) => void;
    initPopupWidget: (opts: { url: string }) => void;
  };
};

interface Props {
  url: string;
  height?: number;
}

export default function CalendlyInline({ url, height = 700 }: Props) {
  useEffect(() => {
    const w = window as CalendlyWindow;
    const el = document.getElementById("calendly-inline-container");
    if (el && w.Calendly) {
      w.Calendly.initInlineWidget({ url, parentElement: el });
    }
  }, [url]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          const w = window as CalendlyWindow;
          const el = document.getElementById("calendly-inline-container");
          if (el && w.Calendly) {
            w.Calendly.initInlineWidget({ url, parentElement: el });
          }
        }}
      />
      <div
        id="calendly-inline-container"
        data-url={url}
        style={{ minWidth: 320, height, borderRadius: 2, overflow: "hidden" }}
      />
    </>
  );
}
