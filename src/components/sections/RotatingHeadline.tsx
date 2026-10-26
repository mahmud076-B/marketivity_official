"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type RotatingHeadlineProps = {
  words: string[];
  className?: string;
};

export default function RotatingHeadline({
  words,
  className = "",
}: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words]);

  if (!words || words.length === 0) return null;

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word) => (
        <span key={word} className={`invisible col-start-1 row-start-1 font-extrabold ${className}`} aria-hidden>
          {word}
        </span>
      ))}
      <span className="col-start-1 row-start-1 overflow-hidden" aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`inline-block font-extrabold text-brand-purple ${className}`}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
