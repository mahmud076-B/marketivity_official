"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GA_PATTERN = /^G-[A-Z0-9]+$/i;
const PIXEL_PATTERN = /^\d{5,20}$/;

function loadAnalytics() {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-HBCP7WF7SB";
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1433606852275637";

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

export default function Analytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Track PageView on client-side route changes without duplicating initial load
    if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: Function }).fbq === "function") {
      (window as unknown as { fbq: Function }).fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
