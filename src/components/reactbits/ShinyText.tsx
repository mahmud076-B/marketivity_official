"use client";

import React from "react";

type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
};

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-amber-200 to-brand-orange ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(247,147,30,0.9) 0%, rgba(255,255,255,0.95) 50%, rgba(247,147,30,0.9) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
