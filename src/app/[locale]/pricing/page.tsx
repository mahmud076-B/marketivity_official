import { setRequestLocale } from "next-intl/server";
import PricingBoard from "@/components/pricing/PricingBoard";
import CTASection from "@/components/sections/CTASection";
import PageActions from "@/components/sections/PageActions";
import TrustStrip from "@/components/sections/TrustStrip";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Pricing",
    description:
      "USD, GBP, or BDT pricing for Meta Ads, social media, websites, AI web apps and custom software. Three tiers in each category. Ad spend is separate.",
    note: "Prices are set in US dollars, pounds sterling, or taka, not a conversion. Prices exclude VAT/taxes where applicable. A written proposal confirms the fee.",
  },
  bn: {
    title: "মূল্য",
    description:
      "মেটা অ্যাডস, সোশ্যাল মিডিয়া, ওয়েবসাইট, এআই ওয়েব অ্যাপ ও কাস্টম সফটওয়্যারের ডলার, পাউন্ড, বা টাকার মূল্য। প্রতিটি বিভাগে তিনটি টিয়ার। বিজ্ঞাপন খরচ আলাদা।",
    note: "দাম মার্কিন ডলার, পাউন্ড স্টার্লিং, বা টাকায় নির্ধারিত, কনভার্সন নয়। যেখানে প্রযোজ্য, দামে ভ্যাট ও অন্যান্য কর নেই। লিখিত প্রস্তাবে ফি নিশ্চিত হয়।",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/pricing",
    title: copy[safe].title,
    description: copy[safe].description,
  });
}

export default async function PricingPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">{copy[locale].title}</h1>
          <p className="mt-4 text-lg text-brand-muted">{copy[locale].description}</p>
          <p className="mt-3 text-sm text-brand-muted">{copy[locale].note}</p>
          <div className="mt-8 flex justify-center">
            <PageActions locale={locale} topic={copy[locale].title} align="center" />
          </div>
        </div>
      </section>
      <TrustStrip locale={locale} />
      <section className="safe-px pb-16">
        <div className="mx-auto max-w-6xl">
          <PricingBoard locale={locale} />
        </div>
      </section>
      <CTASection
        title={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
        subtitle={copy[locale].note}
        cta={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
        href="/contact"
      />
    </>
  );
}
