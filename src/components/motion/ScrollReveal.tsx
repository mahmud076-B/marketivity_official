"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { motion as motionTokens } from "@/lib/design-tokens";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  once?: boolean;
  viewportMargin?: string;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = motionTokens.duration.normal,
  direction = "up",
  once = true,
  viewportMargin = "-60px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: viewportMargin as unknown as undefined,
  });

  const variants = {
    up: {
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -28 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -28 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 28 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const currentVariant = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={currentVariant}
      transition={{
        duration,
        delay,
        ease: motionTokens.ease.out,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}