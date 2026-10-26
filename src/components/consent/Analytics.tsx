"use client";

import { useEffect } from "react";
import { CONSENT_KEY } from "@/components/consent/CookieConsent";
import { gaMeasurementId, trackEvent } from "@/lib/analytics";

const GA_PATTERN = /^G-[A-Z0-9]+$/i;
const PIXEL_PATTERN = /^\d{5,20}$/;

function loadAnalytics(gaId: string) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(CONSENT_KEY) !== "granted") return;

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

  if (GA_PATTERN.test(gaId) && !document.getElementById("marketivity-ga")) {
    const script = document.createElement("script");
    script.id = "marketivity-ga";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);
    const inline = document.createElement("script");
    inline.id = "marketivity-ga-inline";
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`;
    document.head.appendChild(inline);
  }

  if (PIXEL_PATTERN.test(pixelId) && !document.getElementById("marketivity-pixel")) {
    const inline = document.createElement("script");
    inline.id = "marketivity-pixel";
    inline.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixelId)});fbq('track','PageView');`;
    document.head.appendChild(inline);
  }
}

function trackOutboundClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest("a");
  if (!anchor) return;

  let host = "";
  try {
    host = new URL(anchor.href).hostname.replace(/^www\./, "");
  } catch {
    return;
  }

  if (host === "wa.me" || host === "api.whatsapp.com") {
    trackEvent("whatsapp_click");
    return;
  }
  if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
    trackEvent("social_click", { platform: "linkedin" });
    return;
  }
  if (host === "facebook.com" || host === "fb.com" || host.endsWith(".facebook.com")) {
    trackEvent("social_click", { platform: "facebook" });
  }
}

export default function Analytics({ gaId = gaMeasurementId() }: { gaId?: string }) {
  useEffect(() => {
    const id = gaMeasurementId(gaId);
    loadAnalytics(id);
    const onChange = () => loadAnalytics(id);
    window.addEventListener("marketivity-consent", onChange);
    window.addEventListener("storage", onChange);
    document.addEventListener("click", trackOutboundClick);
    return () => {
      window.removeEventListener("marketivity-consent", onChange);
      window.removeEventListener("storage", onChange);
      document.removeEventListener("click", trackOutboundClick);
    };
  }, [gaId]);

  return null;
}
