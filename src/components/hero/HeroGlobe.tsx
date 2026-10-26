"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import GlobeFallback from "@/components/hero/GlobeFallback";
import type { Locale } from "@/lib/site";

const HeroGlobeCanvas = dynamic(() => import("@/components/hero/HeroGlobeCanvas"), {
  ssr: false,
});

const copy = {
  en: {
    label: "Dotted globe showing Bangladesh, the UK, and the USA.",
    places: "Where we work",
    chips: ["Bangladesh", "UK", "USA"],
  },
  bn: {
    label: "বাংলাদেশ, যুক্তরাজ্য ও যুক্তরাষ্ট্র দেখানো একটি বিন্দুর গ্লোব।",
    places: "যে দেশে কাজ করি",
    chips: ["বাংলাদেশ", "যুক্তরাজ্য", "যুক্তরাষ্ট্র"],
  },
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
        {webgl ? (
          <div className="absolute inset-0">
            <HeroGlobeCanvas onReady={handleReady} label={text.label} />
          </div>
        ) : null}
      </div>
      <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label={text.places}>
        {text.chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-brand-charcoal/10 bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-charcoal shadow-sm"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}
