"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

function PayPalReturnInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token"); // PayPal order ID
  const tier = searchParams.get("tier") || "";
  const [status, setStatus] = useState<"capturing" | "done" | "error">("capturing");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrMsg("No payment token received. Please try booking again.");
      return;
    }
    fetch("/api/paypal-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: token }),
    })
      .then(r => r.json())
      .then((data: { ok?: boolean; error?: string }) => {
        if (data.ok) {
          setStatus("done");
          router.replace(`/book/thank-you?tier=${encodeURIComponent(tier)}&via=paypal`);
        } else {
          setStatus("error");
          setErrMsg(data.error || "Your payment could not be confirmed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setErrMsg("Connection error. Please email hello@veridianclinic.com if payment was taken.");
      });
  }, [token, tier, router]);

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <section className="sec bg-iv">
        <div className="wrap" style={{ maxWidth: 580 }}>
          {status === "capturing" && (
            <>
              <p className="lbl">Confirming your PayPal payment…</p>
              <div className="rule" />
              <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.85 }}>
                Please do not close this page. This takes a few seconds.
              </p>
            </>
          )}
          {status === "done" && (
            <>
              <p className="lbl" style={{ color: "var(--go)" }}>Payment confirmed</p>
              <div className="rule" />
              <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.85 }}>
                Redirecting to your confirmation…
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <p className="lbl" style={{ color: "var(--red)" }}>Payment issue</p>
              <div className="rule" />
              <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 24 }}>
                {errMsg}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={`/book?tier=${encodeURIComponent(tier)}`} className="btn btn-fo">
                  Try again →
                </a>
                <a href="mailto:hello@veridianclinic.com" className="btn btn-ol">
                  Contact us
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default function PayPalReturnPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <Suspense fallback={
        <main style={{ paddingTop: "var(--nav-h)" }}>
          <section className="sec bg-iv">
            <div className="wrap">
              <p style={{ fontSize: ".95rem", color: "var(--sl2)" }}>Processing payment…</p>
            </div>
          </section>
        </main>
      }>
        <PayPalReturnInner />
      </Suspense>
      <Footer />
    </>
  );
}
