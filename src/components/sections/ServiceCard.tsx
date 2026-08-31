"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  unitType: "month" | "project";
  slug: string;
  currency: string;
  startingAt: string;
  perMonth: string;
  perProject: string;
  learnMore: string;
};

export default function ServiceCard({
  title,
  description,
  price,
  unitType,
  slug,
  currency,
  startingAt,
  perMonth,
  perProject,
  learnMore,
}: ServiceCardProps) {
  const unitLabel = unitType === "month" ? perMonth : perProject;

  return (
    <Link href={`/services/${slug}`} className="block h-full group">
      <div className="relative flex flex-col h-full rounded-2xl border border-brand-charcoal/10 bg-white p-7 shadow-soft-sm transition-all duration-300 group-hover:shadow-soft-lg group-hover:-translate-y-1.5 group-hover:border-brand-orange/30 overflow-hidden">
        {/* Subtle Ambient Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Subtle Gradient Backdrop Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/[0.03] to-brand-purple/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors duration-200">
              {title}
            </h3>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-200">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </div>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-brand-charcoal/70">
            {description}
          </p>

          <div className="pt-4 border-t border-brand-charcoal/8 mt-auto flex items-end justify-between">
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-charcoal/45">
                {startingAt}
              </span>
              <p className="text-2xl font-extrabold text-brand-purple group-hover:text-brand-orange transition-colors duration-200">
                {currency}
                {price}
                <span className="text-xs font-normal text-brand-charcoal/60 ml-1">
                  {unitLabel}
                </span>
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-orange group-hover:underline">
              {learnMore}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
