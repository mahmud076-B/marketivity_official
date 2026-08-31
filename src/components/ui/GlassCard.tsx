"use client";

import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/design-tokens";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  hover?: boolean;
  onClick?: () => void;
};

export default function GlassCard({
  children,
  className = "",
  variant = "light",
  hover = false,
  onClick,
}: GlassCardProps) {
  const baseClasses = variant === "light" 
    ? "glass" 
    : "glass-dark";
  
  const hoverClasses = hover
    ? "transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-brand"
    : "";

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ 
        duration: motionTokens.duration.fast,
        ease: motionTokens.ease.out 
      }}
      className={`rounded-2xl ${baseClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}