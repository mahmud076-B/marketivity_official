"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type TrueFocusProps = {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
};

export default function TrueFocus({
  sentence = "Attention is everywhere Strategy makes it valuable",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#F7931E",
  glowColor = "rgba(247, 147, 30, 0.4)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 select-none ${className}`}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="relative cursor-pointer text-2xl sm:text-3xl md:text-4xl font-extrabold transition-[filter,opacity] duration-300"
            style={{
              filter:
                manualMode
                  ? isActive
                    ? "blur(0px)"
                    : `blur(${blurAmount}px)`
                  : isActive
                  ? "blur(0px)"
                  : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.45,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="pointer-events-none absolute top-0 left-0 border-2 rounded-xl"
        animate={{
          x: focusRect.x - 6,
          y: focusRect.y - 4,
          width: focusRect.width + 12,
          height: focusRect.height + 8,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          borderColor,
          boxShadow: `0 0 15px ${glowColor}`,
        }}
      >
        <span
          className="absolute -top-2 -left-2 h-3 w-3 border-t-2 border-l-2"
          style={{ borderColor }}
        />
        <span
          className="absolute -top-2 -right-2 h-3 w-3 border-t-2 border-r-2"
          style={{ borderColor }}
        />
        <span
          className="absolute -bottom-2 -left-2 h-3 w-3 border-b-2 border-l-2"
          style={{ borderColor }}
        />
        <span
          className="absolute -bottom-2 -right-2 h-3 w-3 border-b-2 border-r-2"
          style={{ borderColor }}
        />
      </motion.div>
    </div>
  );
}
