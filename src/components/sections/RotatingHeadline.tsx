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
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words]);

  if (!words || words.length === 0) return null;

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            y: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.35, ease: "easeOut" },
          }}
          className={`text-gradient inline-block font-extrabold pb-2 pt-1 px-1 ${className}`}
          style={{
            backgroundSize: "200% 200%",
            willChange: "transform, opacity",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
