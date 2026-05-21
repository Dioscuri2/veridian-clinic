"use client";
import { useEffect } from "react";

interface Props {
  value: number;
  currency?: string;
  content_name: string;
}

export default function PixelPurchase({ value, currency = "GBP", content_name }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "Purchase", {
        value,
        currency,
        content_name,
      });
      // Also track a custom event for easier filtering
      (window as any).fbq?.("track", "PurchaseVerified", {
        value,
        currency,
        content_name,
      });
    }
  }, [value, currency, content_name]);

  return null;
}
