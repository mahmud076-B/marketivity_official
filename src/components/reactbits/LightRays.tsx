"use client";

import React from "react";

type LightRaysProps = {
  className?: string;
  color?: "orange" | "purple" | "mixed";
};

export default function LightRays({
  className = "",
  color = "mixed",
}: LightRaysProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Ray 1 */}
      <div
        className={`absolute -top-[40%] left-[15%] h-[160%] w-[350px] rotate-[35deg] transform-gpu opacity-25 blur-[60px] ${
          color === "purple"
            ? "bg-gradient-to-b from-brand-purple via-brand-purple/20 to-transparent"
            : "bg-gradient-to-b from-brand-orange via-brand-orange/20 to-transparent"
        } animate-pulse`}
        style={{ animationDuration: "8s" }}
      />

      {/* Ray 2 */}
      <div
        className={`absolute -top-[30%] right-[10%] h-[150%] w-[280px] -rotate-[30deg] transform-gpu opacity-20 blur-[70px] ${
          color === "orange"
            ? "bg-gradient-to-b from-brand-orange via-brand-orange/20 to-transparent"
            : "bg-gradient-to-b from-brand-purple via-brand-purple/20 to-transparent"
        } animate-pulse`}
        style={{ animationDuration: "11s" }}
      />
    </div>
  );
}
