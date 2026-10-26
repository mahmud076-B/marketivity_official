import { setRequestLocale } from "next-intl/server";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import ClientReportedNote from "@/components/sections/ClientReportedNote";
import SoftwarePortfolio from "@/components/sections/SoftwarePortfolio";
import CTASection from "@/components/sections/CTASection";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { featuredCampaigns, clientNames, proofCopy } from "@/lib/campaigns";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Work",
    description:
      "Meta Ads campaigns with Ads Manager figures, plus software built by the founder. Conversations, follows and visits. No revenue claims.",
  },
  bn: {
    title: "কাজ",
    description:
      "অ্যাডস ম্যানেজারের সংখ্যাসহ মেটা অ্যাডস ক্যাম্পেইন, এবং প্রতিষ্ঠাতার তৈরি সফটওয়্যার। কথোপকথন, ফলো ও ভিজিট। রাজস্বের দাবি নেই।",
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

export default async function PortfolioPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);

  return (
    <>
      <section className="gradient-hero safe-px py-16 md:py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-brand-charcoal md:text-5xl">{copy[locale].title}</h1>
          <p className="mt-4 text-lg text-brand-muted">{copy[locale].description}</p>
        </div>
      </section>
      <LogoMarquee />
      <section className="safe-px py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-brand-charcoal">
            {locale === "bn" ? "মেটা অ্যাডস" : "Meta Ads"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-brand-muted">{proofCopy.source[locale]}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCampaigns.map((campaign) => (
              <CaseStudyCard key={campaign.id} campaign={campaign} locale={locale} />
            ))}
          </div>
          <ClientReportedNote locale={locale} />
        </div>
      </section>
      <section className="safe-px pb-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-brand-charcoal">{proofCopy.clientsLabel[locale]}</h2>
          <p className="mt-2 text-sm text-brand-muted">{proofCopy.clientsNote[locale]}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {clientNames.map((name) => (
              <li key={name} className="rounded-full bg-white px-3 py-1.5 text-sm border border-brand-charcoal/10">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="safe-px py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-brand-charcoal">
            {locale === "bn" ? "সফটওয়্যার" : "Software"}
          </h2>
          <SoftwarePortfolio locale={locale} />
        </div>
      </section>
      <CTASection
        title={locale === "bn" ? "একটি ফ্রি কল বুক করুন" : "Book a free call"}
        subtitle={copy[locale].description}
        cta={locale === "bn" ? "যোগাযোগ" : "Contact"}
      />
    </>
  );
}
