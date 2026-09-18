"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Search,
  Target,
  Share2,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { serviceSlugs, serviceKeys, type ServiceSlug } from "@/lib/services";

type ServiceConstellationProps = {
  title: string;
  subtitle: string;
  currency: string;
  startingAt: string;
  perMonth: string;
  perProject: string;
  learnMore: string;
  servicesData: Record<
    string,
    {
      title: string;
      shortDescription: string;
      price: string;
      features: string[];
    }
  >;
};

const serviceIcons: Record<ServiceSlug, typeof Search> = {
  seo: Search,
  "paid-ads": Target,
  "social-media": Share2,
  "content-marketing": FileText,
  branding: Sparkles,
};

export default function ServiceConstellation({
  title,
  subtitle,
  currency,
  startingAt,
  perMonth,
  perProject,
  learnMore,
  servicesData,
}: ServiceConstellationProps) {
  const tConst = useTranslations("home.constellation");
  const [selectedSlug, setSelectedSlug] = useState<ServiceSlug>("paid-ads");
  const selectedKey = serviceKeys[selectedSlug];
  const currentService = servicesData[selectedKey] || {
    title: "Digital Growth",
    shortDescription: "End-to-end digital solutions.",
    price: "15,000",
    features: ["Strategic Roadmaps", "Data Analytics", "Conversion Optimization"],
  };

  const isProject = selectedSlug === "branding";
  const CurrentIcon = serviceIcons[selectedSlug] || Sparkles;

  return (
    <section className="safe-px py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-brand-purple/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-purple mb-3.5 border border-brand-purple/15">
            {tConst("badge")}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Constellation Grid (Interactive Node Selector on Left, Deep Dossier on Right) */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Interactive Service Constellation Nodes */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2.5 sm:space-y-3">
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-charcoal/40 mb-1 pl-2">
              {tConst("selectSector")}
            </p>

            {serviceSlugs.map((slug) => {
              const key = serviceKeys[slug];
              const item = servicesData[key];
              const isSelected = selectedSlug === slug;
              const Icon = serviceIcons[slug];

              return (
                <Fragment key={slug}>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedSlug(slug)}
                    onMouseEnter={() => setSelectedSlug(slug)}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.35 }}
                    whileHover={{ y: -4, scale: isSelected ? 1.02 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.7, delay: serviceSlugs.indexOf(slug) * 0.05 }}
                    style={{ willChange: "transform, opacity" }}
                    className={`group relative flex transform-gpu items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left transition-shadow duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-brand-orange/10 via-brand-purple/5 to-white border-brand-orange shadow-soft-md scale-[1.01] sm:scale-[1.02]"
                        : "bg-brand-offwhite/50 border-brand-charcoal/8 hover:bg-white hover:border-brand-charcoal/20 opacity-80 hover:opacity-100"
                    }`}
                  >
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div
                      className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                        isSelected
                          ? "bg-brand-orange text-white shadow-glow-orange"
                          : "bg-white text-brand-charcoal/70 border border-brand-charcoal/10 group-hover:text-brand-orange"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div>
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isSelected
                            ? "text-brand-charcoal font-extrabold"
                            : "text-brand-charcoal/85"
                        }`}
                      >
                        {item?.title || slug}
                      </h3>
                      <span className="text-xs text-brand-charcoal/50">
                        {currency}
                        {item?.price}{" "}
                        {slug === "branding" ? perProject : perMonth}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {isSelected && (
                      <span className="flex h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse mr-2" />
                    )}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isSelected
                          ? "text-brand-orange translate-x-1"
                          : "text-brand-charcoal/30 group-hover:text-brand-charcoal/60"
                      }`}
                    />
                  </div>
                  </motion.button>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      layout
                      className="lg:hidden rounded-3xl border border-brand-charcoal/10 bg-white p-5 shadow-soft-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-purple">
                            {tConst("specialization")}
                          </span>
                          <h3 className="text-xl font-extrabold text-brand-charcoal">
                            {item?.title || slug}
                          </h3>
                        </div>
                        <p className="shrink-0 text-right text-lg font-black text-brand-orange">
                          {currency}{item?.price}
                          <span className="block text-[10px] font-normal text-brand-charcoal/60">
                            {slug === "branding" ? perProject : perMonth}
                          </span>
                        </p>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/75">
                        {item?.shortDescription}
                      </p>
                      <div className="mt-5 space-y-2">
                        {item?.features?.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 rounded-xl border border-brand-charcoal/8 p-3">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" />
                            <span className="text-xs font-semibold text-brand-charcoal">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/services/${slug}`}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-charcoal px-6 py-3 text-sm font-bold text-white"
                      >
                        {learnMore}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* Right Column: Active Service Deep Dossier Showcase */}
          <div className="hidden lg:col-span-7 lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSlug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(247, 147, 30, 0.2)"
                  className="relative h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 shadow-soft-lg"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-purple text-white shadow-soft-md shrink-0">
                          <CurrentIcon className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-brand-purple">
                            {tConst("specialization")}
                          </span>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-charcoal">
                            {currentService.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                          {startingAt}
                        </span>
                        <p className="text-xl sm:text-2xl md:text-3xl font-black text-brand-orange">
                          {currency}
                          {currentService.price}
                          <span className="text-xs font-normal text-brand-charcoal/60 ml-1">
                            {isProject ? perProject : perMonth}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-brand-charcoal/75 leading-relaxed mb-6 sm:mb-8">
                      {currentService.shortDescription}
                    </p>

                    {/* Deliverables / Value Features */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-charcoal/50 mb-3 sm:mb-4">
                        {tConst("included")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                        {currentService.features?.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 rounded-xl bg-white p-3 border border-brand-charcoal/8 shadow-soft-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0" />
                            <span className="text-xs font-semibold text-brand-charcoal">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dossier Bottom Action */}
                  <div className="pt-5 sm:pt-6 border-t border-brand-charcoal/8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 sm:mt-6">
                    <div className="text-xs text-brand-charcoal/60 text-center sm:text-left">
                      <span className="font-bold text-brand-charcoal">
                        {tConst("transparentRetainers")}
                      </span>{" "}
                      {tConst("noHiddenFees")}
                    </div>

                    <Link
                      href={`/services/${selectedSlug}`}
                      className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-charcoal px-7 py-3.5 text-sm font-bold text-white shadow-soft-sm transition-all hover:bg-brand-orange hover:shadow-glow-orange active:scale-95"
                    >
                      <span>{learnMore}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
