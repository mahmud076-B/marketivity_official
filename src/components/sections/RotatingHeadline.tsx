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
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [words.length]);

  const longestWord = [...words].sort((a, b) => b.length - a.length)[0];

  return (
    <span
      className={`relative inline-grid max-w-full align-bottom ${className}`}
    >
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 block font-bold pb-2 pt-1 px-1"
      >
        {longestWord}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut" 
          }}
          className={`text-gradient col-start-1 row-start-1 block font-bold pb-2 pt-1 px-1 ${className}`}
          style={{ backgroundSize: "200% 200%" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
