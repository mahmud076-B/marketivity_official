"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export default function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : "0");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
  }, [springValue, decimals]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}