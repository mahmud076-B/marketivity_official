"use client";

import { Fragment, useState } from "react";
import { Search, Compass, Palette, TrendingUp, Rocket, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Step = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: Step[];
};

const icons = [Search, Compass, Palette, TrendingUp, Rocket];

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  const t = useTranslations("home.process");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative">
      {/* 5-Step Interactive Milestone Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 relative z-10 mb-6 sm:mb-8">
        {steps.map((step, i) => {
          const Icon = icons[i] ?? Search;
          const isActive = activeStep === i;

          return (
            <Fragment key={i}>
              <motion.button
                type="button"
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.35 }}
                whileHover={{ y: -4, scale: isActive ? 1.04 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.7, delay: i * 0.045 }}
                style={{ willChange: "transform, opacity" }}
                className={`relative flex transform-gpu sm:flex-col items-center sm:text-center rounded-2xl p-4 sm:p-5 border text-left transition-shadow duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-white via-brand-orange/10 to-brand-purple/10 border-brand-orange shadow-glow-orange scale-[1.01] sm:scale-[1.03] ring-2 ring-brand-orange/20"
                    : "bg-white/85 border-brand-charcoal/12 shadow-soft-sm hover:bg-white hover:border-brand-purple/30 hover:shadow-soft-md opacity-90 hover:opacity-100"
                }`}
              >
              {/* Step Badge */}
              <div className="relative mr-3.5 sm:mr-0 sm:mb-3.5 shrink-0">
                <div
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-brand-orange text-white shadow-glow-orange"
                      : "bg-brand-charcoal/5 text-brand-charcoal/70"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold text-white shadow-sm ${
                    isActive ? "bg-brand-purple" : "bg-brand-charcoal/60"
                  }`}
                >
                  0{i + 1}
                </span>
              </div>

              <div>
                <h3
                  className={`mb-1 text-sm font-bold transition-colors ${
                    isActive ? "text-brand-charcoal font-black" : "text-brand-charcoal/80"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-brand-charcoal/65 line-clamp-2 sm:line-clamp-3">
                  {step.description}
                </p>
              </div>

              {isActive && (
                <div className="hidden sm:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-brand-orange" />
              )}
              </motion.button>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sm:hidden rounded-3xl border border-brand-orange/30 bg-gradient-to-br from-white via-brand-orange/10 to-brand-purple/10 p-5 shadow-soft-lg"
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-purple">
                    {t("stagePrefix")}{activeStep + 1} • {t(`details.${activeStep}.phase`)}
                  </span>
                  <h4 className="mt-1 text-base font-extrabold text-brand-charcoal">
                    {steps[activeStep]?.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-brand-charcoal/70">
                    {t(`details.${activeStep}.action`)}
                  </p>
                  <div className="mt-4 border-t border-brand-charcoal/8 pt-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                      {t("primaryKpi")}
                    </span>
                    <span className="text-xs font-black text-brand-orange">
                      {t(`details.${activeStep}.kpi`)}
                    </span>
                  </div>
                </motion.div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Active Milestone Deep Telemetry Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="hidden sm:flex rounded-3xl border border-brand-orange/30 bg-gradient-to-br from-white via-brand-orange/10 to-brand-purple/10 p-5 sm:p-6 md:p-8 shadow-soft-lg flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple shrink-0 mt-0.5 sm:mt-0">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-purple">
                {t("stagePrefix")}{activeStep + 1} • {t(`details.${activeStep}.phase`)}
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-brand-charcoal">
                {steps[activeStep]?.title}
              </h4>
              <p className="text-xs text-brand-charcoal/70 mt-1 max-w-2xl leading-relaxed">
                {t(`details.${activeStep}.action`)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto border-t md:border-t-0 border-brand-charcoal/8 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
            <div className="text-left md:text-right">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                {t("primaryKpi")}
              </span>
              <span className="text-xs font-black text-brand-orange">
                {t(`details.${activeStep}.kpi`)}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
