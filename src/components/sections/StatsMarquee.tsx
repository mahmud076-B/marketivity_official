"use client";

import type { StatItem } from "@/lib/stats";

type StatsMarqueeProps = {
  items: StatItem[];
};

export default function StatsMarquee({ items }: StatsMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-brand-charcoal/10 bg-brand-charcoal py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="mx-8 flex shrink-0 items-center gap-3 text-white"
          >
            <span className="text-brand-orange">{item.icon}</span>
            <span className="text-xl font-bold">{item.value}</span>
            {item.label && (
              <span className="text-sm text-white/70">{item.label}</span>
            )}
            <span className="mx-4 text-brand-orange/40">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}
