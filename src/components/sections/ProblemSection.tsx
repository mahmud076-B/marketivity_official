"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, Zap, Target } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type ProblemSectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  fragmentedLabel: string;
  fragmentedDesc: string;
  solutionLabel: string;
  solutionDesc: string;
  ctaText: string;
};

export default function ProblemSection({
  eyebrow,
  title,
  subtitle,
  fragmentedLabel,
  fragmentedDesc,
  solutionLabel,
  solutionDesc,
  ctaText,
}: ProblemSectionProps) {
  const [activeMode, setActiveMode] = useState<"CHAOS" | "STRUCTURED">("STRUCTURED");
  const tLab = useTranslations("home.lab");

  return (
    <section className="safe-px py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-brand-orange/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-brand-purple/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Storytelling & Pain Point Narrative */}
          <div className="lg:col-span-5 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 border border-brand-orange/15">
              <Zap className="h-3.5 w-3.5" />
              {eyebrow}
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal leading-tight tracking-tight mb-4 sm:mb-5">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-brand-charcoal/75 leading-relaxed mb-6 sm:mb-8">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="touch-target inline-flex items-center gap-2 rounded-full bg-brand-charcoal px-7 py-3.5 text-sm font-bold text-white shadow-soft-sm hover:bg-brand-orange hover:shadow-glow-orange transition-all active:scale-95"
              >
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Chaos → Structure System Simulator */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-brand-charcoal/10 bg-gradient-to-br from-brand-offwhite/80 via-white to-brand-offwhite p-4 sm:p-6 md:p-8 shadow-soft-lg relative overflow-hidden">
              {/* Simulator Header & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 sm:pb-6 sm:mb-6 border-b border-brand-charcoal/8">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-purple block mb-0.5">
                    {tLab("badge")}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-brand-charcoal">
                    {tLab("title")}
                  </h3>
                </div>

                <div className="flex items-center p-1 rounded-xl bg-brand-charcoal/5 border border-brand-charcoal/8 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveMode("CHAOS")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeMode === "CHAOS"
                        ? "bg-red-500 text-white shadow-sm"
                        : "text-brand-charcoal/60 hover:text-brand-charcoal"
                    }`}
                  >
                    {tLab("isolated")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode("STRUCTURED")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeMode === "STRUCTURED"
                        ? "bg-brand-orange text-white shadow-sm"
                        : "text-brand-charcoal/60 hover:text-brand-charcoal"
                    }`}
                  >
                    {tLab("connected")}
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Stage Simulator Display */}
              <AnimatePresence mode="wait">
                {activeMode === "CHAOS" ? (
                  <motion.div
                    key="chaos"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-red-200 bg-red-50/50 p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 shrink-0">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-red-950">
                          {fragmentedLabel}
                        </h4>
                        <p className="text-xs text-red-800/80">
                          {fragmentedDesc}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                      <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 border border-red-200 text-center">
                        <span className="block text-lg sm:text-xl font-black text-red-600 mb-0.5 sm:mb-1">
                          68%
                        </span>
                        <span className="block text-xs font-semibold text-brand-charcoal/80 leading-snug">
                          {tLab("wastedBudget")}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 border border-red-200 text-center">
                        <span className="block text-lg sm:text-xl font-black text-red-600 mb-0.5 sm:mb-1">
                          0
                        </span>
                        <span className="block text-xs font-semibold text-brand-charcoal/80 leading-snug">
                          {tLab("noFunnels")}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/90 p-3 sm:p-3.5 border border-red-200 text-center">
                        <span className="block text-lg sm:text-xl font-black text-red-600 mb-0.5 sm:mb-1">
                          High CPL
                        </span>
                        <span className="block text-xs font-semibold text-brand-charcoal/80 leading-snug">
                          {tLab("zeroRepeat")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="structured"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 via-white to-brand-purple/10 p-4 sm:p-6 shadow-soft-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange text-white shadow-glow-orange shrink-0">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-brand-charcoal">
                          {solutionLabel}
                        </h4>
                        <p className="text-xs text-brand-charcoal/70">
                          {solutionDesc}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                      <div className="rounded-xl bg-white p-3 sm:p-3.5 border border-brand-orange/20 text-center shadow-soft-xs">
                        <span className="block text-lg sm:text-xl font-black text-brand-orange mb-0.5 sm:mb-1">
                          +522%
                        </span>
                        <span className="block text-xs font-bold text-brand-charcoal leading-snug">
                          {tLab("salesGrowth")}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white p-3 sm:p-3.5 border border-brand-purple/20 text-center shadow-soft-xs">
                        <span className="block text-lg sm:text-xl font-black text-brand-purple mb-0.5 sm:mb-1">
                          ROAS 5.2x
                        </span>
                        <span className="block text-xs font-bold text-brand-charcoal leading-snug">
                          {tLab("abTested")}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white p-3 sm:p-3.5 border border-emerald-200 text-center shadow-soft-xs">
                        <span className="block text-lg sm:text-xl font-black text-emerald-600 mb-0.5 sm:mb-1">
                          100%
                        </span>
                        <span className="block text-xs font-bold text-brand-charcoal leading-snug">
                          {tLab("transparentReport")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
