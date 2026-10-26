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
    label: "Earth",
    places: ["USA", "UK", "UAE", "Canada", "Australia", "Germany"],
  },
  bn: {
    label: "পৃথিবী",
    places: ["যুক্তরাষ্ট্র", "যুক্তরাজ্য", "আরব আমিরাত", "কানাডা", "অস্ট্রেলিয়া", "জার্মানি"],
  },
} as const;

/** Positions on the still Earth, which is centered on Rajshahi. Far-side places are omitted. */
const stillPins = [
  { home: true, x: "50%", y: "50%", anchor: "above" },
  { place: 2, x: "71.8%", y: "55.9%", anchor: "above" },
  { place: 1, x: "74.2%", y: "84.8%", anchor: "left" },
  { place: 5, x: "74.9%", y: "82.4%", anchor: "right" },
  { place: 4, x: "20.4%", y: "16.5%", anchor: "above" },
] as const;

function pinClass(anchor: "above" | "left" | "right") {
  if (anchor === "left") return "-translate-x-[108%] -translate-y-[55%]";
  if (anchor === "right") return "translate-x-[8%] -translate-y-[55%]";
  return "-translate-x-1/2 -translate-y-[135%]";
}

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
      timer = window.setTimeout(enable, 3200);
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
      <div className="relative aspect-square w-full">
        <div className={ready ? "opacity-0" : "opacity-100"} aria-hidden={ready}>
          <GlobeFallback />
        </div>
        {ready
          ? null
          : stillPins.map((pin) => {
              const home = "home" in pin;
              const name = home ? "Marketivity" : text.places[pin.place];
              return (
                <span
                  key={name}
                  className={`pointer-events-none absolute z-10 text-center ${pinClass(pin.anchor)}`}
                  style={{ left: pin.x, top: pin.y }}
                >
                  <span
                    className={
                      home
                        ? "inline-block rounded-full bg-brand-orange px-2 py-0.5 text-[11px] font-bold leading-none text-brand-charcoal shadow-sm"
                        : "inline-block rounded-full bg-brand-offwhite px-1.5 py-0.5 text-[10px] font-bold leading-none text-brand-charcoal shadow-sm"
                    }
                  >
                    {name}
                  </span>
                  <span
                    className={`mx-auto mt-1 block rounded-full ${
                      home
                        ? "h-2 w-2 bg-brand-orange shadow-[0_0_0_3px_rgba(247,147,30,0.35)]"
                        : "h-1.5 w-1.5 bg-brand-purple"
                    }`}
                    aria-hidden
                  />
                </span>
              );
            })}
        {webgl ? (
          <div className="absolute inset-0">
            <HeroGlobeCanvas onReady={handleReady} label={text.label} places={text.places} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
