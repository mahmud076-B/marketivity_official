"use client";

import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  viewportMargin?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const hidden: Record<Direction, { opacity: number; x: number; y: number; scale: number }> = {
  up: { opacity: 0, x: 0, y: 22, scale: 0.985 },
  down: { opacity: 0, x: 0, y: -16, scale: 0.985 },
  left: { opacity: 0, x: -22, y: 0, scale: 0.985 },
  right: { opacity: 0, x: 22, y: 0, scale: 0.985 },
  fade: { opacity: 0, x: 0, y: 0, scale: 1 },
  scale: { opacity: 0, x: 0, y: 0, scale: 0.97 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.62,
  direction = "up",
  once = true,
  viewportMargin = "0px 0px -8% 0px",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={reduce ? false : hidden[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: viewportMargin }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration, delay, ease }
      }
    >
      {children}
    </motion.div>
  );
}
