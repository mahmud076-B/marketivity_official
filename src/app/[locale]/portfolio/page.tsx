import { setRequestLocale } from "next-intl/server";
import ClientReportedNote from "@/components/sections/ClientReportedNote";
import CTASection from "@/components/sections/CTASection";
import PageActions from "@/components/sections/PageActions";
import PortfolioCard from "@/components/sections/PortfolioCard";
import PortfolioFilters from "@/components/sections/PortfolioFilters";
import { proofCopy } from "@/lib/campaigns";
import { itemsForTab, resolvePortfolioTab, type PortfolioTab } from "@/lib/portfolio-items";
import { pageMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string | string[] }>;
};

const copy: Record<
  Locale,
  {
    title: string;
    description: string;
    sections: Record<PortfolioTab, { title: string; note: string }>;
  }
> = {
  en: {
    title: "Portfolio",
    description:
      "Software, websites, and Meta Ads. Live screenshots where a public URL exists. Campaign figures are from Ads Manager. No revenue claims.",
    sections: {
      software: {
        title: "Software",
        note: "AI apps and custom software built by the founder.",
      },
      websites: {
        title: "Websites",
        note: "Websites designed and built by the founder.",
      },
      "meta-ads": {
        title: "Meta Ads",
        note: "The client page is the one the founder confirmed. A logo is shown only when that file clearly reads as the same brand. Figures are from Ads Manager and are not sales.",
      },
    },
  },
  bn: {
    title: "পোর্টফোলিও",
    description:
      "সফটওয়্যার, ওয়েবসাইট ও মেটা অ্যাডস। পাবলিক ঠিকানা থাকলে লাইভ স্ক্রিনশট। ক্যাম্পেইনের সংখ্যা অ্যাডস ম্যানেজার থেকে। রাজস্বের দাবি নেই।",
    sections: {
      software: {
        title: "সফটওয়্যার",
        note: "প্রতিষ্ঠাতার তৈরি এআই অ্যাপ ও কাস্টম সফটওয়্যার।",
      },
      websites: {
        title: "ওয়েবসাইট",
        note: "প্রতিষ্ঠাতার নকশা ও তৈরি ওয়েবসাইট।",
      },
      "meta-ads": {
        title: "মেটা অ্যাডস",
        note: "ক্লায়েন্ট পেজ প্রতিষ্ঠাতার নিশ্চিত করা নাম। লোগো তখনই দেখানো হয়, যখন ফাইলে সেই ব্র্যান্ডের নাম স্পষ্ট পড়া যায়। সংখ্যা অ্যাডস ম্যানেজার থেকে, বিক্রি নয়।",
      },
    },
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/portfolio",
    title: copy[safe].title,
    description: copy[safe].description,
  });
}

export default async function PortfolioPage({ params, searchParams }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);
  const tab = resolvePortfolioTab((await searchParams).tab);
  const text = copy[locale];
  const section = text.sections[tab];
  const items = itemsForTab(tab);

  return (
    <>
      <section className="gradient-hero section-block safe-px text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-purple">
            Marketivity
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-charcoal md:text-6xl">
            {text.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{text.description}</p>
          <PortfolioFilters locale={locale} tab={tab} />
          <div className="mt-8 flex justify-center">
            <PageActions locale={locale} topic={text.title} align="center" />
          </div>
        </div>
      </section>

      <section className="section-block safe-px border-t border-brand-charcoal/8 bg-brand-offwhite">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted">{section.note}</p>
          {tab === "meta-ads" ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted">
              {proofCopy.source[locale]}
            </p>
          ) : null}
          <div className="mt-10 grid items-stretch gap-8 sm:grid-cols-2">
            {items.map((item, index) => (
              <PortfolioCard key={item.id} item={item} locale={locale} index={index} />
            ))}
          </div>
          {tab === "meta-ads" ? <ClientReportedNote locale={locale} /> : null}
        </div>
      </section>

      <CTASection
        title={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
        subtitle={text.description}
        cta={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
      />
    </>
  );
}
