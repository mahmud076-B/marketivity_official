"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type RotatingHeadlineProps = {
  words: string[];
  className?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function RotatingHeadline({
  words,
  className = "",
}: RotatingHeadlineProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || !words || words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [reduce, words]);

  if (!words || words.length === 0) return null;

  const current = words[reduce ? 0 : index];

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word) => (
        <span
          key={word}
          className={`invisible col-start-1 row-start-1 px-0.5 font-extrabold ${className}`}
          aria-hidden
        >
          {word}
        </span>
      ))}
      <span className="col-start-1 row-start-1 overflow-hidden px-0.5" aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current}
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.55, ease }}
            className={`inline-block font-extrabold text-brand-purple ${className}`}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
