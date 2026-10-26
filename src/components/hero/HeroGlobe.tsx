"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import GlobeFallback from "@/components/hero/GlobeFallback";
import type { Locale } from "@/lib/site";

const HeroGlobeCanvas = dynamic(() => import("@/components/hero/HeroGlobeCanvas"), {
  ssr: false,
});

const copy = {
  en: { label: "Earth" },
  bn: { label: "পৃথিবী" },
} as const;

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroGlobe({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let timer = 0;

    const enable = () => {
      if (cancelled) return;
      if (motion.matches || !canUseWebGL()) {
        setWebgl(false);
        setReady(false);
        return;
      }
      setWebgl(true);
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(enable, 1800);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    const onChange = () => {
      if (motion.matches) {
        setWebgl(false);
        setReady(false);
      } else {
        schedule();
      }
    };
    motion.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      motion.removeEventListener("change", onChange);
      window.removeEventListener("load", schedule);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:ml-auto lg:mr-0 lg:max-w-[420px]">
      <div
        className="relative aspect-square w-full"
        role={ready ? undefined : "img"}
        aria-label={ready ? undefined : text.label}
      >
        <div className={ready ? "opacity-0" : "opacity-100"} aria-hidden>
          <GlobeFallback />
        </div>
        {webgl ? null : (
          <>
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[160%] rounded-full bg-brand-orange px-2 py-0.5 text-[11px] font-bold leading-none text-brand-charcoal shadow-sm">
              Marketivity
            </span>
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange shadow-[0_0_0_3px_rgba(247,147,30,0.35)]"
              aria-hidden
            />
          </>
        )}
        {webgl ? (
          <div className="absolute inset-0">
            <HeroGlobeCanvas onReady={handleReady} label={text.label} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
