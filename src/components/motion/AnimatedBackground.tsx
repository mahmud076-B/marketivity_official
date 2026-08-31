"use client";

import { motion } from "framer-motion";

type AnimatedBackgroundProps = {
  variant?: "gradient" | "grid" | "noise" | "mesh" | "dark";
  className?: string;
  children?: React.ReactNode;
};

export default function AnimatedBackground({
  variant = "gradient",
  className = "",
  children,
}: AnimatedBackgroundProps) {
  const backgrounds = {
    gradient: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-purple/5 blur-3xl" />
      </div>
    ),
    grid: (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-offwhite" />
      </div>
    ),
    noise: (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-purple/5" />
      </div>
    ),
    mesh: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[10%] left-[15%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-orange/[0.07] blur-[80px]"
          animate={{
            scale: [1, 1.08, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-brand-purple/[0.06] blur-[90px]"
          animate={{
            scale: [1, 1.12, 1],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-25" />
      </div>
    ),
    dark: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-brand-charcoal">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-purple/15 blur-[120px]" />
        <div className="absolute inset-0 grid-pattern-dark opacity-15" />
      </div>
    ),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backgrounds[variant]}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}