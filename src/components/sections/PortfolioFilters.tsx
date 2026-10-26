import { Link } from "@/i18n/navigation";
import { portfolioTabs, type PortfolioTab } from "@/lib/portfolio-items";
import type { Locale } from "@/lib/site";

const labels: Record<Locale, Record<PortfolioTab | "nav", string>> = {
  en: {
    nav: "Filter portfolio",
    software: "Software",
    websites: "Websites",
    "meta-ads": "Meta Ads",
  },
  bn: {
    nav: "পোর্টফোলিও ফিল্টার",
    software: "সফটওয়্যার",
    websites: "ওয়েবসাইট",
    "meta-ads": "মেটা অ্যাডস",
  },
};

export default function PortfolioFilters({
  locale,
  tab,
}: {
  locale: Locale;
  tab: PortfolioTab;
}) {
  const text = labels[locale];

  return (
    <nav aria-label={text.nav} className="mt-8 flex flex-wrap justify-center gap-2">
      {portfolioTabs.map((id) => {
        const active = id === tab;
        return (
          <Link
            key={id}
            href={{ pathname: "/portfolio", query: { tab: id } }}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-bold ${
              active
                ? "bg-brand-charcoal text-white"
                : "border border-brand-charcoal/15 bg-white text-brand-charcoal"
            }`}
          >
            {text[id]}
          </Link>
        );
      })}
    </nav>
  );
}
