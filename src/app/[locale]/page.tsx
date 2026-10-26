import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RotatingHeadline from "@/components/sections/RotatingHeadline";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CTASection from "@/components/sections/CTASection";
import SelectedWork from "@/components/sections/SelectedWork";
import InteractiveGrowthFunnel from "@/components/hero/InteractiveGrowthFunnel";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ProblemSection from "@/components/sections/ProblemSection";
import GrowthEcosystem from "@/components/sections/GrowthEcosystem";
import WhyMarketivity from "@/components/sections/WhyMarketivity";
import ServiceConstellation from "@/components/sections/ServiceConstellation";
import TrustStrip from "@/components/sections/TrustStrip";
import PageActions from "@/components/sections/PageActions";
import { serviceCategories, startingPriceLabel } from "@/lib/pricing";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

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
      <section className="gradient-hero safe-px section-block">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="w-full min-w-0 text-center lg:col-span-6 lg:text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-purple md:text-sm">
                {tc("tagline")}
              </p>
              <h1 className="mb-5 font-display text-4xl font-extrabold leading-[1.12] text-brand-charcoal sm:text-5xl md:text-6xl">
                {t("hero.title")}{" "}
                <span className="mt-2 block">
                  <RotatingHeadline words={rotatingWords} className="text-4xl sm:text-5xl md:text-6xl" />
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg lg:mx-0">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col items-center gap-3 lg:items-start">
                <PageActions locale={locale} />
                <Link href="/portfolio" className="text-sm font-semibold text-brand-ink underline">
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </div>
            <div className="w-full min-w-0 lg:col-span-6">
              <InteractiveGrowthFunnel />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip locale={locale} />

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

      <ScrollReveal>
        <GrowthEcosystem
          eyebrow={t("ecosystem.eyebrow")}
          title={t("ecosystem.title")}
          subtitle={t("ecosystem.subtitle")}
        />
      </ScrollReveal>

      <section className="section-block safe-px border-t border-brand-charcoal/8 bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-purple">
              {t("process.badge")}
            </p>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
              {t("process.title")}
            </h2>
            <p className="text-base leading-relaxed text-brand-muted sm:text-lg">{t("process.subtitle")}</p>
          </ScrollReveal>
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

      <SelectedWork locale={locale} />

      <CTASection
        title={t("footerCta.title")}
        subtitle={t("footerCta.subtitle")}
        cta={t("footerCta.cta")}
      />
    </>
  );
}
