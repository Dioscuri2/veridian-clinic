"use client";
import { useEffect } from "react";

const PIXEL_ID = "681542251506672";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w._fbqLoaded) return;
  w._fbqLoaded = true;

  const fbq: any = function (...args: any[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  if (!w.fbq) w.fbq = fbq;
  if (!w._fbq) w._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  w.fbq("init", PIXEL_ID);
  w.fbq("track", "PageView");
}

function loadGA4() {
  if (!GA4_ID || typeof window === "undefined") return;
  const w = window as any;
  if (w._ga4Loaded) return;
  w._ga4Loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  w.dataLayer = w.dataLayer || [];
  function gtag(...args: any[]) { w.dataLayer.push(args); }
  w.gtag = gtag;
  gtag("js", new Date());
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
  gtag("config", GA4_ID, { anonymize_ip: true });
  // Update consent to granted (user has already accepted at this point)
  gtag("consent", "update", { analytics_storage: "granted" });
}

export default function Analytics() {
  useEffect(() => {
    const stored = localStorage.getItem("vc_cookie_consent");
    if (stored === "granted") {
      loadMetaPixel();
      loadGA4();
    }

    function handleConsent(e: Event) {
      if ((e as CustomEvent).detail === "granted") {
        loadMetaPixel();
        loadGA4();
      }
    }

    window.addEventListener("consentUpdated", handleConsent);
    return () => window.removeEventListener("consentUpdated", handleConsent);
  }, []);

  return null;
}
