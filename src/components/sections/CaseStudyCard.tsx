"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/lib/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  learnMoreLabel: string;
  beforeLabel: string;
  afterLabel: string;
  durationLabel: string;
};

const colorMap = {
  orange: {
    badge: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
    metric: "text-brand-orange",
    border: "hover:border-brand-orange/40",
    icon: "bg-brand-orange/10 text-brand-orange",
    bar: "bg-brand-orange",
    glow: "shadow-brand-orange/10",
    accent: "bg-brand-orange",
  },
  purple: {
    badge: "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
    metric: "text-brand-purple",
    border: "hover:border-brand-purple/40",
    icon: "bg-brand-purple/10 text-brand-purple",
    bar: "bg-brand-purple",
    glow: "shadow-brand-purple/10",
    accent: "bg-brand-purple",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    metric: "text-emerald-600",
    border: "hover:border-emerald-300/60",
    icon: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
    glow: "shadow-emerald-500/10",
    accent: "bg-emerald-500",
  },
};

export default function CaseStudyCard({
  study,
  learnMoreLabel,
  beforeLabel,
  afterLabel,
  durationLabel,
}: CaseStudyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[study.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border shadow-soft-md transition-all duration-300 hover:shadow-soft-lg ${
        study.color === "orange"
          ? "border-brand-orange/20 bg-gradient-to-br from-white via-brand-orange/5 to-brand-orange/10"
          : study.color === "purple"
          ? "border-brand-purple/20 bg-gradient-to-br from-white via-brand-purple/5 to-brand-purple/10"
          : "border-emerald-200/60 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-50"
      } ${c.border}`}
    >
      {/* Top Accent Gradient Bar */}
      <div className={`h-1.5 w-full ${c.accent}`} />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {/* Header Row */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-soft-sm ${c.icon}`}
          >
            {study.emoji}
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${c.badge}`}
          >
            {study.service}
          </span>
        </div>

        {/* Client & Metadata */}
        <h3 className="mb-1.5 text-xl font-bold text-brand-charcoal">
          {study.client}
        </h3>
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-brand-charcoal/60">
          <MapPin className="h-3.5 w-3.5 text-brand-orange" />
          <span>{study.location}</span>
          <span>•</span>
          <span>{study.industry}</span>
        </div>
        <div className="mb-4 flex items-center gap-1.5 text-xs text-brand-charcoal/50">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {durationLabel}: {study.duration}
          </span>
        </div>

        {/* Big Metric Banner */}
        <div className={`mb-4 flex items-center gap-3.5 rounded-2xl p-4 border shadow-soft-sm ${
          study.color === "orange"
            ? "border-brand-orange/20 bg-brand-orange/10"
            : study.color === "purple"
            ? "border-brand-purple/20 bg-brand-purple/10"
            : "border-emerald-200 bg-emerald-50"
        }`}>
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.icon}`}
          >
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className={`text-2xl font-black leading-none ${c.metric}`}>
              {study.metric.value}
            </p>
            <p className="mt-1 text-xs font-semibold text-brand-charcoal/70">
              {study.metric.label}
            </p>
          </div>
        </div>

        {/* Challenge / Strategy Narrative */}
        <p className="mb-4 text-sm leading-relaxed text-brand-charcoal/75">
          {study.challenge}
        </p>

        {/* Before / After Morph Toggle Button */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mb-4 flex w-full items-center justify-between rounded-xl border border-brand-charcoal/10 bg-brand-offwhite/60 px-4 py-2.5 text-xs font-bold text-brand-charcoal transition-colors hover:bg-brand-offwhite"
        >
          <span>
            {beforeLabel} ↔ {afterLabel}
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-brand-charcoal/50" />
          ) : (
            <ChevronDown className="h-4 w-4 text-brand-charcoal/50" />
          )}
        </button>

        {/* Expandable Comparison Metrics */}
        {expanded && (
          <div className="mb-4 grid grid-cols-2 gap-2.5 text-left">
            {/* Before */}
            <div className="rounded-xl border border-brand-charcoal/10 bg-brand-offwhite/40 p-3">
              <p className="mb-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-brand-charcoal/40">
                {beforeLabel}
              </p>
              {study.before.map((item) => (
                <div key={item.label} className="mb-2 last:mb-0">
                  <p className="text-[11px] text-brand-charcoal/55">{item.label}</p>
                  <p className="text-sm font-bold text-brand-charcoal">{item.value}</p>
                </div>
              ))}
            </div>
            
            {/* After */}
            <div
              className={`rounded-xl border p-3 ${
                study.color === "orange"
                  ? "border-brand-orange/20 bg-brand-orange/5"
                  : study.color === "purple"
                  ? "border-brand-purple/20 bg-brand-purple/5"
                  : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <p className={`mb-2 text-center text-[10px] font-extrabold uppercase tracking-wider ${c.metric}`}>
                {afterLabel}
              </p>
              {study.after.map((item) => (
                <div key={item.label} className="mb-2 last:mb-0">
                  <p className="text-[11px] text-brand-charcoal/55">{item.label}</p>
                  <p className={`text-sm font-bold ${c.metric}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Action Link */}
        <Link
          href={`/services/${study.serviceSlug}`}
          className={`mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${c.metric} hover:underline`}
        >
          {learnMoreLabel} {study.service}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
