import { setRequestLocale } from "next-intl/server";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import ClientReportedNote from "@/components/sections/ClientReportedNote";
import SoftwarePortfolio from "@/components/sections/SoftwarePortfolio";
import CTASection from "@/components/sections/CTASection";
import TrustStrip from "@/components/sections/TrustStrip";
import PageActions from "@/components/sections/PageActions";
import { featuredCampaigns, proofCopy } from "@/lib/campaigns";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Work",
    description:
      "Meta Ads campaigns with Ads Manager figures, plus software built by the founder. Conversations, follows and visits. No revenue claims.",
    ads: "Meta Ads",
    software: "Software",
    softwareNote: "Software built by the founder. No performance figures. Internal tools are not linked.",
  },
  bn: {
    title: "কাজ",
    description:
      "অ্যাডস ম্যানেজারের সংখ্যাসহ মেটা অ্যাডস ক্যাম্পেইন, এবং প্রতিষ্ঠাতার তৈরি সফটওয়্যার। কথোপকথন, ফলো ও ভিজিট। রাজস্বের দাবি নেই।",
    ads: "মেটা অ্যাডস",
    software: "সফটওয়্যার",
    softwareNote: "প্রতিষ্ঠাতার তৈরি সফটওয়্যার। কোনো পারফরম্যান্স সংখ্যা নেই। অভ্যন্তরীণ টুলের লিঙ্ক নেই।",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/work",
    title: copy[safe].title,
    description: copy[safe].description,
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);

  return (
    <>
      <section className="gradient-hero section-block safe-px text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-brand-charcoal md:text-5xl">{copy[locale].title}</h1>
          <p className="mt-4 text-lg text-brand-muted">{copy[locale].description}</p>
          <div className="mt-8 flex justify-center">
            <PageActions locale={locale} topic={copy[locale].title} align="center" />
          </div>
        </div>
      </section>
      <TrustStrip locale={locale} />
      <section className="section-block safe-px border-t border-brand-charcoal/8 bg-brand-offwhite">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">{copy[locale].ads}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted">{proofCopy.source[locale]}</p>
          <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCampaigns.map((campaign, index) => (
              <CaseStudyCard key={campaign.id} campaign={campaign} locale={locale} index={index} />
            ))}
          </div>
          <ClientReportedNote locale={locale} />
        </div>
      </section>
      <section className="section-block safe-px border-t border-brand-charcoal/8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">{copy[locale].software}</h2>
          <p className="mt-2 max-w-3xl text-sm text-brand-muted">{copy[locale].softwareNote}</p>
          <div className="mt-6">
            <SoftwarePortfolio locale={locale} />
          </div>
        </div>
      </section>
      <CTASection
        title={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
        subtitle={copy[locale].description}
        cta={locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
      />
    </>
  );
}
