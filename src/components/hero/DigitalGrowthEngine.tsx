"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { TrendingUp, Target, Users, Zap, Sparkles } from "lucide-react";
import { type GrowthStage } from "@/components/3d/GrowthCore3D";

// Lazy load the WebGL 3D Growth Core
const GrowthCore3D = dynamic(() => import("@/components/3d/GrowthCore3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[260px] md:min-h-[360px] flex items-center justify-center">
      <div className="h-28 w-28 md:h-36 md:w-36 rounded-full bg-gradient-to-tr from-brand-orange/20 to-brand-purple/20 blur-2xl animate-pulse" />
    </div>
  ),
});

export default function DigitalGrowthEngine() {
  const t = useTranslations("home.growthEngine");
  const [activeStage, setActiveStage] = useState<GrowthStage>("GROWTH");

  const stageConfigs: Record<
    GrowthStage,
    {
      id: GrowthStage;
      label: string;
      metric: string;
      desc: string;
      icon: typeof TrendingUp;
    }
  > = {
    AUDIENCE: {
      id: "AUDIENCE",
      label: t("audience.title"),
      metric: t("audience.metric"),
      desc: t("audience.desc"),
      icon: Users,
    },
    CAMPAIGN: {
      id: "CAMPAIGN",
      label: t("campaign.title"),
      metric: t("campaign.metric"),
      desc: t("campaign.desc"),
      icon: Target,
    },
    LEADS: {
      id: "LEADS",
      label: t("leads.title"),
      metric: t("leads.metric"),
      desc: t("leads.desc"),
      icon: Zap,
    },
    GROWTH: {
      id: "GROWTH",
      label: t("growth.title"),
      metric: t("growth.metric"),
      desc: t("growth.desc"),
      icon: TrendingUp,
    },
  };

  const currentStageData = stageConfigs[activeStage];
  const stageList: GrowthStage[] = ["AUDIENCE", "CAMPAIGN", "LEADS", "GROWTH"];

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      {/* 3D Glass Laboratory Container */}
      <div className="relative rounded-3xl border border-black/8 bg-white/75 backdrop-blur-2xl p-3.5 sm:p-5 md:p-6 shadow-soft-lg overflow-hidden">
        {/* Subtle Laboratory Grid Background */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        {/* Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row with Discoverable Invitation */}
        <div className="relative z-20 flex items-center justify-between mb-2 sm:mb-3 px-1 sm:px-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
            </span>
            <span className="text-[10px] md:text-[11px] font-extrabold tracking-widest uppercase text-brand-charcoal/60">
              {t("simulator")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-2.5 py-0.5 border border-brand-purple/15">
            <Sparkles className="h-3 w-3 text-brand-purple" />
            <span className="text-[9px] sm:text-[10px] font-extrabold text-brand-purple">
              {t("interactHint")}
            </span>
          </div>
        </div>

        {/* Central WebGL 3D Growth Core */}
        <div className="relative z-10 w-full h-[260px] sm:h-[320px] md:h-[360px]">
          <GrowthCore3D activeStage={activeStage} />
        </div>

        {/* Interactive Growth Node Selector Bar */}
        <div className="relative z-20 mt-2 grid grid-cols-4 gap-1 p-1 rounded-2xl bg-brand-charcoal/5 border border-brand-charcoal/8">
          {stageList.map((stageKey) => {
            const stage = stageConfigs[stageKey];
            const isSelected = activeStage === stageKey;
            return (
              <button
                key={stageKey}
                type="button"
                onClick={() => setActiveStage(stageKey)}
                className={`py-2 px-1 text-center rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "bg-white text-brand-charcoal font-black shadow-soft-sm border border-brand-orange/30 scale-[1.02]"
                    : "text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-white/50 text-[10px] sm:text-[11px] font-bold"
                }`}
              >
                <span className="block text-[10px] sm:text-[11px] tracking-tight truncate">
                  {stageKey}
                </span>
                <span
                  className={`block text-[9px] sm:text-[10px] font-extrabold truncate ${
                    isSelected ? "text-brand-orange" : "text-brand-charcoal/40"
                  }`}
                >
                  {stage.metric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Live Telemetry Readout */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 mt-3 flex items-center justify-between rounded-2xl bg-white/90 p-3 border border-brand-charcoal/8 shadow-soft-xs"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
              <currentStageData.icon className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-brand-charcoal">
                {currentStageData.label}
              </p>
              <p className="text-[11px] text-brand-charcoal/70 leading-snug">
                {currentStageData.desc}
              </p>
            </div>
          </div>

          <span className="text-[11px] sm:text-xs font-black text-brand-orange bg-brand-orange/10 px-2 sm:px-2.5 py-1 rounded-lg shrink-0 ml-2">
            {currentStageData.metric}
          </span>
        </motion.div>
      </div>
    </div>
  );
}