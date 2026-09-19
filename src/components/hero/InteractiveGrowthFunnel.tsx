"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { TrendingUp, Target, Users, Sparkles, HandCoins } from "lucide-react";
import type { FunnelStage } from "@/components/3d/Funnel3D";

// Lazy load the WebGL 3D Funnel
const Funnel3D = dynamic(() => import("@/components/3d/Funnel3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] md:min-h-[460px] flex items-center justify-center">
      <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-brand-orange/20 to-brand-purple/20 blur-2xl animate-pulse" />
    </div>
  ),
});

export default function InteractiveGrowthFunnel() {
  const t = useTranslations("home.growthFunnel");
  const [activeStage, setActiveStage] = useState<FunnelStage>("TRAFFIC");

  const stageConfigs: Record<
    FunnelStage,
    {
      id: FunnelStage;
      label: string;
      metric: string;
      desc: string;
      icon: typeof Users;
      colorClass: string;
      bgClass: string;
    }
  > = {
    TRAFFIC: {
      id: "TRAFFIC",
      label: t("traffic.title"),
      metric: t("traffic.metric"),
      desc: t("traffic.desc"),
      icon: Users,
      colorClass: "text-brand-purple",
      bgClass: "bg-brand-purple",
    },
    LEADS: {
      id: "LEADS",
      label: t("leads.title"),
      metric: t("leads.metric"),
      desc: t("leads.desc"),
      icon: Target,
      colorClass: "text-brand-orange",
      bgClass: "bg-brand-orange",
    },
    SALES: {
      id: "SALES",
      label: t("sales.title"),
      metric: t("sales.metric"),
      desc: t("sales.desc"),
      icon: HandCoins,
      colorClass: "text-brand-purple",
      bgClass: "bg-brand-purple",
    },
    SCALE: {
      id: "SCALE",
      label: t("scale.title"),
      metric: t("scale.metric"),
      desc: t("scale.desc"),
      icon: TrendingUp,
      colorClass: "text-brand-orange",
      bgClass: "bg-brand-orange",
    },
  };

  const currentStageData = stageConfigs[activeStage];
  const stageList: FunnelStage[] = ["TRAFFIC", "LEADS", "SALES", "SCALE"];

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      {/* 3D Glass Container */}
      <div className="relative rounded-3xl border border-black/8 bg-white/75 backdrop-blur-2xl p-4 sm:p-6 shadow-soft-lg overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="relative z-20 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange" />
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-brand-charcoal/60">
              {t("subtitle")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-2.5 py-1 border border-brand-purple/15">
            <Sparkles className="h-3 w-3 text-brand-purple" />
            <span className="text-[10px] font-extrabold text-brand-purple">
              {t("interactHint")}
            </span>
          </div>
        </div>

        {/* Central WebGL 3D Funnel */}
        <div className="relative z-10 w-full h-[300px] sm:h-[360px]">
          <Funnel3D activeStage={activeStage} />
        </div>

        {/* Interactive Funnel Stage Selector */}
        <div className="relative z-20 mt-2 flex justify-between p-1 rounded-2xl bg-brand-charcoal/5 border border-brand-charcoal/8 overflow-hidden">
          {stageList.map((stageKey) => {
            const isSelected = activeStage === stageKey;
            return (
              <button
                key={stageKey}
                type="button"
                onClick={() => setActiveStage(stageKey)}
                className={`relative flex-1 py-2.5 px-1 text-center rounded-xl transition-all duration-300 z-10 ${
                  isSelected
                    ? "text-brand-charcoal font-black"
                    : "text-brand-charcoal/50 hover:text-brand-charcoal/80 font-bold"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-soft-sm border border-black/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20 block text-[10px] sm:text-xs tracking-tight">
                  {stageConfigs[stageKey].label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Data Card */}
        <div className="relative z-20 mt-4 h-[88px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-between rounded-2xl bg-white/90 p-3 sm:p-4 border border-brand-charcoal/8 shadow-soft-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${currentStageData.colorClass.replace("text-", "bg-").replace("-brand", "")}/10 ${currentStageData.colorClass} shrink-0`}>
                  <currentStageData.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-black text-brand-charcoal uppercase tracking-wide">
                    {currentStageData.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-brand-charcoal/70 leading-snug max-w-[200px]">
                    {currentStageData.desc}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStageData.colorClass} opacity-60 mb-0.5`}>
                  Target
                </span>
                <span className={`text-sm sm:text-base font-black ${currentStageData.colorClass} bg-white px-2 py-0.5 rounded-md border border-brand-charcoal/5 shadow-soft-xs`}>
                  {currentStageData.metric}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
