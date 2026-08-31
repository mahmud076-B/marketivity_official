"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { motion as motionTokens } from "@/lib/design-tokens";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isCaseStudy, setIsCaseStudy] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted] = useState(() => typeof window !== "undefined");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable entirely on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]')
      );
      
      const isCard = Boolean(target.closest('[data-cursor="case-study"]'));
      
      setIsPointer(isInteractive);
      setIsCaseStudy(isCard);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isMounted || !isVisible) {
    return null;
  }

  // Check if touch device
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ambient follower ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border flex items-center justify-center transition-colors"
          animate={{
            width: isCaseStudy ? 64 : isPointer ? 38 : 24,
            height: isCaseStudy ? 64 : isPointer ? 38 : 24,
            borderColor: isPointer
              ? "rgba(247, 147, 30, 0.6)"
              : "rgba(111, 66, 193, 0.35)",
            backgroundColor: isCaseStudy
              ? "rgba(247, 147, 30, 0.9)"
              : isPointer
              ? "rgba(247, 147, 30, 0.08)"
              : "rgba(111, 66, 193, 0.04)",
          }}
          transition={{
            duration: motionTokens.duration.fast,
            ease: motionTokens.ease.out,
          }}
        >
          {isCaseStudy && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
              VIEW
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Central crisp precision dot */}
      {!isCaseStudy && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-glow-orange"
            animate={{
              scale: isPointer ? 0.5 : 1,
              opacity: isPointer ? 0.6 : 1,
            }}
            transition={{
              duration: motionTokens.duration.fast,
            }}
          />
        </motion.div>
      )}
    </>
  );
}