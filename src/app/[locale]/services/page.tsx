import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serviceCategories, startingPriceLabel } from "@/lib/pricing";
import { isLocale, whatsappLink, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

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
    <section className="safe-px py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">{copy[locale].title}</h1>
          <p className="mt-4 text-lg text-brand-muted">
            {locale === "bn"
              ? "মেটা অ্যাডস ও ওয়েবসাইট গ্রোথ পার্টনার, এবং একটি সফটওয়্যার এজেন্সি।"
              : "A Meta Ads and website growth partner, and a software studio."}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceCategories.map((category) => (
            <article key={category.slug} className="flex h-full flex-col rounded-3xl border border-brand-charcoal/10 bg-white p-6 shadow-soft-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                {category.model[locale]}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-charcoal">{category.name[locale]}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">{category.summary[locale]}</p>
              <p className="mt-4 text-sm font-semibold text-brand-purple">
                {startingPriceLabel(category, locale)}
              </p>
              <p className="mt-1 text-xs text-brand-muted">{category.tiers[1].bestFor[locale]}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/services/${category.slug}`}
                  className="rounded-full border border-brand-charcoal/15 px-4 py-2 text-sm font-semibold"
                >
                  {locale === "bn" ? "বিস্তারিত" : "View details"}
                </Link>
                <a
                  href={whatsappLink(
                    locale === "bn"
                      ? `হ্যালো মার্কেটিভিটি, ${category.name.bn} নিয়ে কথা বলতে চাই।`
                      : `Hello Marketivity, I want to talk about ${category.name.en}.`
                  )}
                  className="rounded-full bg-brand-orange px-4 py-2 text-sm font-bold text-white"
                >
                  {locale === "bn" ? "ফ্রি কল" : "Book a free call"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
