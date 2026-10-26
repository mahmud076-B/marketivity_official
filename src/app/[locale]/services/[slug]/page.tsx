import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryExtras, TierGrid } from "@/components/pricing/PricingBoard";
import { BangladeshPriceNote, CurrencyToggle, PriceTrust, StartingPrice } from "@/components/pricing/currency";
import { getCategory, pricingFaq, serviceCategories } from "@/lib/pricing";
import { isServiceSlug } from "@/lib/services";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import PageActions from "@/components/sections/PageActions";
import CTASection from "@/components/sections/CTASection";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    locale: safe,
    path: `/services/${slug}`,
    title: category.name[safe],
    description: category.summary[safe],
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);
  if (!isServiceSlug(slug)) notFound();
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <section className="gradient-hero safe-px py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {category.model[locale]}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-brand-charcoal md:text-5xl">
            {category.name[locale]}
          </h1>
          <p className="mt-4 text-lg text-brand-muted">{category.summary[locale]}</p>
          <p className="mt-4 text-2xl font-extrabold text-brand-charcoal">
            <StartingPrice slug={category.slug} locale={locale} />
          </p>
          <div className="mt-5 flex justify-center">
            <CurrencyToggle locale={locale} />
          </div>
          <div className="mt-8 flex justify-center">
            <PageActions locale={locale} topic={category.name[locale]} align="center" />
          </div>
        </div>
      </section>

      <section className="safe-px py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-brand-charcoal">
            {locale === "bn" ? "যা অন্তর্ভুক্ত" : "What’s included"}
          </h2>
          <TierGrid category={category} locale={locale} />
          <CategoryExtras category={category} locale={locale} />
          <PriceTrust locale={locale} />
          <BangladeshPriceNote locale={locale} />
        </div>
      </section>

      <section className="safe-px pb-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-brand-charcoal">
            {locale === "bn" ? "প্রশ্ন" : "Questions"}
          </h2>
          <div className="space-y-4">
            {pricingFaq.slice(0, 4).map((item) => (
              <div key={item.q.en} className="rounded-2xl border border-brand-charcoal/10 bg-white p-5">
                <h3 className="font-semibold text-brand-charcoal">{item.q[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.a[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="safe-px pb-16">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3">
          {serviceCategories
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-full border border-brand-charcoal/15 bg-white px-4 py-2 text-sm font-medium"
              >
                {item.name[locale]}
              </Link>
            ))}
        </div>
      </section>
      <CTASection
        title={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
        subtitle={category.summary[locale]}
        cta={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
      />
    </>
  );
}
