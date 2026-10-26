import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RotatingHeadline from "@/components/sections/RotatingHeadline";
import StatsMarquee from "@/components/sections/StatsMarquee";
import { createStatItems } from "@/lib/stats";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CTASection from "@/components/sections/CTASection";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import ClientReportedNote from "@/components/sections/ClientReportedNote";
import SoftwarePortfolio from "@/components/sections/SoftwarePortfolio";
import InteractiveGrowthFunnel from "@/components/hero/InteractiveGrowthFunnel";
import AnimatedBackground from "@/components/motion/AnimatedBackground";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ProblemSection from "@/components/sections/ProblemSection";
import GrowthEcosystem from "@/components/sections/GrowthEcosystem";
import WhyMarketivity from "@/components/sections/WhyMarketivity";
import ServiceConstellation from "@/components/sections/ServiceConstellation";
import LightRays from "@/components/reactbits/LightRays";
import { featuredCampaigns, clientNames, proofCopy } from "@/lib/campaigns";
import { serviceCategories, startingPriceLabel } from "@/lib/pricing";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const messages = (await import(`../../../messages/${safe}.json`)).default;
  return pageMetadata({
    locale: safe,
    title: messages.metadata.title,
    description: messages.metadata.description,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const rotatingWords = t.raw("hero.rotatingWords") as string[];
  const processSteps = [
    t.raw("process.steps.discover"),
    t.raw("process.steps.strategize"),
    t.raw("process.steps.create"),
    t.raw("process.steps.optimize"),
    t.raw("process.steps.scale"),
  ] as { title: string; description: string }[];

  const valuePropItems = {
    results: t.raw("valueProp.items.results") as { title: string; description: string },
    local: t.raw("valueProp.items.local") as { title: string; description: string },
    transparent: t.raw("valueProp.items.transparent") as { title: string; description: string },
    recommended: t.raw("valueProp.items.recommended") as { title: string; description: string },
  };

  const servicesData: Record<
    string,
    { title: string; shortDescription: string; priceLabel: string; features: string[] }
  > = {};
  for (const category of serviceCategories) {
    servicesData[category.slug] = {
      title: category.name[locale],
      shortDescription: category.summary[locale],
      priceLabel: startingPriceLabel(category, locale),
      features: category.tiers[0].includes[locale].slice(0, 4),
    };
  }

  return (
    <>
      <section className="gradient-hero safe-px py-16 md:py-24 relative overflow-hidden">
        <AnimatedBackground variant="mesh" className="absolute inset-0" />
        <LightRays color="mixed" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <ScrollReveal direction="up" className="w-full min-w-0 lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                <p className="text-xs md:text-sm font-black uppercase tracking-widest text-brand-purple">
                  {tc("tagline")}
                </p>
              </div>
              <h1 className="mb-5 font-display text-4xl font-extrabold leading-[1.12] text-brand-charcoal sm:text-5xl md:text-6xl">
                {t("hero.title")}{" "}
                <span className="block mt-2">
                  <RotatingHeadline words={rotatingWords} className="text-4xl sm:text-5xl md:text-6xl" />
                </span>
              </h1>
              <p className="mx-auto lg:mx-0 mb-8 max-w-xl text-base sm:text-lg text-brand-muted leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
                <Link
                  href="/contact"
                  className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-white sm:w-auto"
                >
                  <span>{t("hero.cta")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="touch-target inline-flex w-full items-center justify-center rounded-full border border-brand-charcoal/15 bg-white px-8 py-4 text-base font-bold text-brand-charcoal sm:w-auto"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2} className="w-full min-w-0 lg:col-span-6">
              <InteractiveGrowthFunnel />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <StatsMarquee items={createStatItems(locale)} />
      <p className="safe-px mx-auto max-w-4xl py-3 text-center text-xs leading-relaxed text-brand-muted">
        {proofCopy.source[locale]}
      </p>

      <ScrollReveal direction="up">
        <ProblemSection
          eyebrow={t("problem.eyebrow")}
          title={t("problem.title")}
          subtitle={t("problem.subtitle")}
          fragmentedLabel={t("problem.fragmented")}
          fragmentedDesc={t("problem.fragmentedDesc")}
          solutionLabel={t("problem.solution")}
          solutionDesc={t("problem.solutionDesc")}
          ctaText={t("problem.cta")}
        />
      </ScrollReveal>

      <GrowthEcosystem
        eyebrow={t("ecosystem.eyebrow")}
        title={t("ecosystem.title")}
        subtitle={t("ecosystem.subtitle")}
      />

      <LogoMarquee />
      <section className="safe-px pb-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-brand-charcoal">{proofCopy.clientsLabel[locale]}</h2>
          <p className="mt-2 text-sm text-brand-muted">{proofCopy.clientsNote[locale]}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {clientNames.map((name) => (
              <li
                key={name}
                className="rounded-full border border-brand-charcoal/10 bg-white px-3 py-1.5 text-sm text-brand-charcoal"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="safe-px py-16 sm:py-20 bg-brand-offwhite">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal mb-3">
              {t("process.title")}
            </h2>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">{t("process.subtitle")}</p>
          </div>
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      <ServiceConstellation
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        startingAt={tc("startingAt")}
        learnMore={tc("learnMore")}
        servicesData={servicesData}
      />

      <WhyMarketivity
        eyebrow={t("valueProp.eyebrow")}
        title={t("valueProp.title")}
        subtitle={t("valueProp.subtitle")}
        items={valuePropItems}
      />

      <section className="safe-px py-20 bg-brand-offwhite">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-brand-charcoal">
              {t("caseStudy.title")}
            </h2>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              {t("caseStudy.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCampaigns.map((campaign) => (
              <CaseStudyCard key={campaign.id} campaign={campaign} locale={locale} />
            ))}
          </div>
          <ClientReportedNote locale={locale} />
          <div className="mt-8 text-center">
            <Link href="/portfolio" className="text-sm font-bold text-brand-orange">
              {tc("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <section className="safe-px py-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-3 text-center text-3xl font-extrabold text-brand-charcoal">
            {locale === "bn" ? "সফটওয়্যার" : "Software"}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-brand-muted">
            {locale === "bn"
              ? "প্রতিষ্ঠাতার তৈরি সফটওয়্যার। কোনো পারফরম্যান্স সংখ্যা নেই। অভ্যন্তরীণ টুলের লিঙ্ক নেই।"
              : "Software built by the founder. No performance figures. Internal tools are not linked."}
          </p>
          <SoftwarePortfolio locale={locale} />
        </div>
      </section>

      <CTASection
        title={t("footerCta.title")}
        subtitle={t("footerCta.subtitle")}
        cta={t("footerCta.cta")}
      />
    </>
  );
}
