import { Link } from "@/i18n/navigation";
import PortfolioCard from "@/components/sections/PortfolioCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getPortfolioItem, selectedPortfolioIds } from "@/lib/portfolio-items";
import type { Locale } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "Portfolio",
    title: "Selected work",
    subtitle:
      "One software project, the website, and a Meta Ads campaign. Campaign figures are from Ads Manager. No revenue claims.",
    viewAll: "View portfolio",
  },
  bn: {
    eyebrow: "পোর্টফোলিও",
    title: "নির্বাচিত কাজ",
    subtitle:
      "একটি সফটওয়্যার, ওয়েবসাইট, এবং একটি মেটা অ্যাডস ক্যাম্পেইন। ক্যাম্পেইনের সংখ্যা অ্যাডস ম্যানেজার থেকে। রাজস্বের দাবি নেই।",
    viewAll: "পোর্টফোলিও দেখুন",
  },
} as const;

export default function SelectedWork({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const items = selectedPortfolioIds.map((id) => getPortfolioItem(id)!);

  return (
    <section className="section-block safe-px border-t border-brand-charcoal/8 bg-white">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-purple">
            {text.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
            {text.title}
          </h2>
          <p className="text-base leading-relaxed text-brand-muted sm:text-lg">{text.subtitle}</p>
        </ScrollReveal>
        <div className="grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              locale={locale}
              index={index}
              teaserTab={item.tab}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/portfolio" className="text-sm font-bold text-brand-ink underline">
            {text.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
