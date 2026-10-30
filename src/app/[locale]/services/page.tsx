import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CurrencyToggle, StartingPrice } from "@/components/pricing/currency";
import { serviceCategories } from "@/lib/pricing";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import PageActions from "@/components/sections/PageActions";
import TrustStrip from "@/components/sections/TrustStrip";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Services",
    description:
      "Meta Ads management, social and page management, web development, AI web apps and custom software.",
  },
  bn: {
    title: "সেবা",
    description:
      "মেটা অ্যাডস ম্যানেজমেন্ট, সোশ্যাল ও পেজ ম্যানেজমেন্ট, ওয়েব ডেভেলপমেন্ট, এআই ওয়েব অ্যাপ ও কাস্টম সফটওয়্যার।",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/services",
    title: copy[safe].title,
    description: copy[safe].description,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);

  return (
    <>
    <section className="section-block safe-px">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">{copy[locale].title}</h1>
          <p className="mt-4 text-lg text-brand-muted">
            {locale === "bn"
              ? "মেটা অ্যাডস ও ওয়েবসাইট গ্রোথ পার্টনার, এবং একটি সফটওয়্যার এজেন্সি।"
              : "A Meta Ads and website growth partner, and a software studio."}
          </p>
          <div className="mt-6">
            <CurrencyToggle />
          </div>
          <div className="mt-8">
            <PageActions locale={locale} topic={copy[locale].title} />
          </div>
        </div>
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          {serviceCategories.map((category, index) => (
            <ScrollReveal key={category.slug} delay={index * 0.08} className="h-full">
            <article className="surface-card surface-tint p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple">
                {category.model[locale]}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-charcoal">{category.name[locale]}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">{category.summary[locale]}</p>
              <p className="mt-4 text-sm font-semibold text-brand-charcoal">
                <StartingPrice slug={category.slug} locale={locale} />
              </p>
              <p className="mt-1 text-xs text-brand-muted">{category.tiers[1].bestFor[locale]}</p>
              <div className="mt-5">
                <Link href={`/services/${category.slug}`} className="btn-secondary px-4 py-2 text-sm">
                  {locale === "bn" ? "বিস্তারিত" : "View details"}
                </Link>
              </div>
            </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <TrustStrip locale={locale} />
    <CTASection
      title={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
      subtitle={copy[locale].description}
      cta={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
    />
    </>
  );
}
