"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, Zap, ShieldCheck, MessageCircle } from "lucide-react";
import LightRays from "@/components/reactbits/LightRays";

type CTASectionProps = {
  title: string;
  subtitle: string;
  cta: string;
  href?: string;
};

export default function CTASection({
  title,
  subtitle,
  cta,
  href = "/contact",
}: CTASectionProps) {
  const tCta = useTranslations("home.footerCta");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-offwhite via-white to-brand-orange/10 text-brand-charcoal safe-px py-16 sm:py-24 md:py-32">
      {/* Cinematic Ambient Brand Glows & Volumetric Light Beams */}
      <LightRays color="mixed" />
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-brand-orange/20 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-brand-purple/25 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 backdrop-blur-md border border-brand-orange/20 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-orange mb-5 sm:mb-6">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange animate-pulse" />
          <span>{tCta("badge")}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 sm:mb-6 leading-[1.1]">
          {title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-brand-charcoal/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <Link
            href={href}
            className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-light px-8 sm:px-10 py-4 sm:py-5 text-base md:text-lg font-bold text-white shadow-soft-lg hover:shadow-glow-orange transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{cta}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>

          <a
            href="https://wa.me/8801767644696"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-brand-charcoal/15 bg-white/80 backdrop-blur-md px-7 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold text-brand-charcoal shadow-soft-sm transition-all hover:bg-white hover:border-brand-purple/40 hover:text-brand-purple active:scale-95"
          >
            <MessageCircle className="h-5 w-5 text-emerald-400" />
            <span>{tCta("whatsapp")}</span>
          </a>
        </div>

        {/* Live System Trust Signals */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-charcoal/10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 text-xs text-brand-charcoal/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-orange" />
            <span>{tCta("metaRecommended")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-purple" />
            <span>{tCta("monthlyReporting")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{tCta("acceptingClients")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
