"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Globe,
  Eye,
  MessageSquare,
  UserCheck,
  CreditCard,
  Repeat,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

type GrowthEcosystemProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

const stageMeta = [
  { id: "traffic", icon: Globe, color: "#F7931E" },
  { id: "attention", icon: Eye, color: "#FFAA4D" },
  { id: "engagement", icon: MessageSquare, color: "#6F42C1" },
  { id: "leads", icon: UserCheck, color: "#8B5FC4" },
  { id: "conversion", icon: CreditCard, color: "#F7931E" },
  { id: "retention", icon: Repeat, color: "#6F42C1" },
  { id: "growth", icon: TrendingUp, color: "#10B981" },
];

export default function GrowthEcosystem({
  eyebrow,
  title,
  subtitle,
}: GrowthEcosystemProps) {
  const t = useTranslations("home.ecosystem");
  const [activeStage, setActiveStage] = useState(0);

  const stages = stageMeta.map((meta, idx) => ({
    ...meta,
    label: t(`stages.${idx}.label`),
    sublabel: t(`stages.${idx}.sublabel`),
    description: t(`stages.${idx}.desc`),
  }));

  return (
    <section className="safe-px py-16 sm:py-20 md:py-28 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-orange/15 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern-dark opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-orange mb-3 sm:mb-4 border border-white/10 backdrop-blur-sm">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Interactive Funnel Loop (Mobile: 2 cols, Tablet: 4 cols, Desktop: 7 cols) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`relative flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-white/15 border-brand-orange shadow-glow-orange scale-[1.02] sm:scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* Stage Step Indicator */}
                <span className="text-[10px] font-extrabold tracking-wider text-white/50 mb-1.5 sm:mb-2">
                  0{idx + 1}
                </span>

                <div
                  className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl mb-2 sm:mb-3 transition-colors"
                  style={{
                    backgroundColor: isSelected
                      ? stage.color
                      : "rgba(255, 255, 255, 0.1)",
                    color: isSelected ? "#FFFFFF" : stage.color,
                  }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase text-white mb-0.5 truncate w-full">
                  {stage.label}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/60 leading-tight truncate w-full">
                  {stage.sublabel}
                </span>

                {/* Connecting Arrow for Desktop */}
                {idx < stages.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/30 z-20" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Active Stage */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 sm:p-8 text-center shadow-soft-lg"
        >
          <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-orange">
              0{activeStage + 1} • {t("stageFocus")}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {stages[activeStage].label} — {stages[activeStage].sublabel}
          </h3>
          <p className="text-xs sm:text-base text-white/80 leading-relaxed">
            {stages[activeStage].description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
