"use client";

import Script from "next/script";

declare global {
  interface Window {
    umami?: {
      track?: (eventName: string, eventData?: Record<string, unknown>) => void;
      trackEvent?: (
        eventName: string,
        eventData?: Record<string, unknown>
      ) => void;
    };
  }
}

export default function Umami() {
  const handleLoad = () => {
    if (typeof window === "undefined") return;
    setTimeout(() => {
      if (
        window.umami &&
        (typeof window.umami.track === "function" ||
          typeof window.umami.trackEvent === "function")
      ) {
        window.dispatchEvent(new Event("umami-ready"));
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Umami cargado y listo");
        }
      } else {
        window.dispatchEvent(new Event("umami-ready"));
      }
    }, 200);
  };

  return (
    <Script
      src="https://umami.kudev.cloud/script.js"
      data-website-id="ca6c8ee7-28c6-4150-8c08-abbbea281ab7"
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}
