"use client";

import { Compass, BarChart2, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

type PillarItem = {
  title: string;
  description: string;
};

type WhyMarketivityProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  items: {
    results: PillarItem;
    local: PillarItem;
    transparent: PillarItem;
    recommended: PillarItem;
  };
};

export default function WhyMarketivity({
  eyebrow,
  title,
  subtitle,
  items,
}: WhyMarketivityProps) {
  const pillars = [
    { ...items.results, icon: Compass, color: "orange" },
    { ...items.local, icon: BarChart2, color: "purple" },
    { ...items.transparent, icon: Eye, color: "orange" },
    { ...items.recommended, icon: TrendingUp, color: "purple" },
  ];

  return (
    <section className="safe-px py-16 sm:py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          {eyebrow && (
            <span className="inline-block rounded-full bg-brand-purple/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-purple mb-3 border border-brand-purple/15">
              {eyebrow}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isOrange = pillar.color === "orange";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor={
                    isOrange
                      ? "rgba(247, 147, 30, 0.22)"
                      : "rgba(111, 66, 193, 0.22)"
                  }
                  className={`h-full p-6 sm:p-7 shadow-soft-md transition-shadow hover:shadow-soft-lg ${
                    isOrange
                      ? "bg-gradient-to-br from-white via-brand-orange/5 to-brand-orange/10 border-brand-orange/20"
                      : "bg-gradient-to-br from-white via-brand-purple/5 to-brand-purple/10 border-brand-purple/20"
                  }`}
                >
                <div
                  className={`mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isOrange
                      ? "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-glow-orange"
                      : "bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white group-hover:shadow-glow-purple"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <h3 className="mb-2 text-base sm:text-lg font-bold text-brand-charcoal transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-charcoal/70">
                  {pillar.description}
                </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
