"use client";

import { motion } from "framer-motion";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
};

export default function GradientText({
  children,
  className = "",
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={`text-gradient ${className}`}
      animate={animate ? {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      } : {}}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.span>
  );
}