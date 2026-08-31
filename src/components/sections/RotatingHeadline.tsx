"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/design-tokens";

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
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span
      className={`relative inline-flex overflow-hidden align-bottom ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ 
            duration: motionTokens.duration.normal,
            ease: motionTokens.ease.inOut 
          }}
          className="font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
