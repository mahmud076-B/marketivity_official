import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RotatingHeadline from "@/components/sections/RotatingHeadline";
import StatsMarquee from "@/components/sections/StatsMarquee";
import { createStatItems } from "@/lib/stats";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServiceConstellation from "@/components/sections/ServiceConstellation";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import CTASection from "@/components/sections/CTASection";
import FacebookBadge from "@/components/ui/FacebookBadge";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import DigitalGrowthEngine from "@/components/hero/DigitalGrowthEngine";
import AnimatedBackground from "@/components/motion/AnimatedBackground";
import ScrollReveal from "@/components/motion/ScrollReveal";
import GradientText from "@/components/motion/GradientText";
import ProblemSection from "@/components/sections/ProblemSection";
import GrowthEcosystem from "@/components/sections/GrowthEcosystem";
import WhyMarketivity from "@/components/sections/WhyMarketivity";
import LightRays from "@/components/reactbits/LightRays";
import { serviceSlugs, serviceKeys } from "@/lib/services";
import { getCaseStudies } from "@/lib/case-studies";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const ts = await getTranslations("services");
  const tfb = await getTranslations("facebookBadge");

  const rotatingWords = t.raw("hero.rotatingWords") as string[];

  const processSteps = [
    t.raw("process.steps.discover"),
    t.raw("process.steps.strategize"),
    t.raw("process.steps.create"),
    t.raw("process.steps.optimize"),
    t.raw("process.steps.scale"),
  ] as { title: string; description: string }[];

  const reviews = Object.values(
    t.raw("testimonials.items") as Record<
      string,
      { name: string; text: string; rating: number }
    >
  );

  const statItems = createStatItems((key) => t(`stats.${key}`));

  const valuePropItems = {
    results: t.raw("valueProp.items.results") as { title: string; description: string },
    local: t.raw("valueProp.items.local") as { title: string; description: string },
    transparent: t.raw("valueProp.items.transparent") as { title: string; description: string },
    recommended: t.raw("valueProp.items.recommended") as { title: string; description: string },
  };

  const servicesData: Record<
    string,
    {
      title: string;
      shortDescription: string;
      price: string;
      features: string[];
    }
  > = {};

  serviceSlugs.forEach((slug) => {
    const key = serviceKeys[slug];
    servicesData[key] = {
      title: ts(`${key}.title`),
      shortDescription: ts(`${key}.shortDescription`),
      price: ts(`${key}.price`),
      features: [0, 1, 2, 3].map((i) => ts(`${key}.features.${i}`)),
    };
  });

  return (
    <>
      {/* ── 01. HERO: DIGITAL GROWTH ENGINE & 3D GROWTH CORE ─────────── */}
      <section className="gradient-hero safe-px py-16 md:py-24 relative overflow-hidden">
        <AnimatedBackground variant="mesh" className="absolute inset-0" />
        <LightRays color="mixed" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <ScrollReveal direction="up" className="lg:col-span-6 text-center lg:text-left">
              <div className="mb-5 flex justify-center lg:justify-start">
                <FacebookBadge
                  recommended={tfb("recommended")}
                  onFacebook={tfb("onFacebook")}
                />
              </div>

              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                <p className="text-xs md:text-sm font-black uppercase tracking-widest text-brand-purple">
                  {tc("tagline")}
                </p>
              </div>

              <h1 className="mb-5 font-display text-4xl font-extrabold leading-[1.12] text-brand-charcoal sm:text-5xl md:text-6xl">
                {t("hero.title")}{" "}
                <span className="block mt-1 sm:inline sm:mt-0">
                  <GradientText className="text-4xl sm:text-5xl md:text-6xl">
                    <RotatingHeadline
                      words={rotatingWords}
                      className="text-4xl sm:text-5xl md:text-6xl"
                    />
                  </GradientText>
                </span>
              </h1>

              <p className="mx-auto lg:mx-0 mb-8 max-w-xl text-base sm:text-lg text-brand-charcoal/75 leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
                <Link
                  href="/contact"
                  className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-light px-8 py-4 text-base font-bold text-white shadow-soft-lg hover:shadow-glow-orange transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto"
                >
                  <span>{t("hero.cta")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="touch-target inline-flex w-full items-center justify-center rounded-full border border-brand-charcoal/20 bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-bold text-brand-charcoal transition-all duration-300 hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple/5 sm:w-auto"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Interactive 3D Growth Core & Digital Lab */}
            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-6">
              <DigitalGrowthEngine />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 02. STATS MARQUEE ────────────────────────────────────────── */}
      <StatsMarquee items={statItems} />

      {/* ── 03. PROBLEM & PAIN POINT SECTION ─────────────────────────── */}
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

      {/* ── 04. CENTERPIECE: DIGITAL GROWTH ECOSYSTEM ───────────────── */}
      <ScrollReveal direction="up">
        <GrowthEcosystem
          eyebrow={t("ecosystem.eyebrow")}
          title={t("ecosystem.title")}
          subtitle={t("ecosystem.subtitle")}
        />
      </ScrollReveal>

      {/* ── 05. CLIENT TRUST MARQUEE ─────────────────────────────────── */}
      <LogoMarquee />

      {/* ── 06. 5-STEP PROCESS SECTION (HOW WE GROW) ─────────────────── */}
      <ScrollReveal direction="up">
        <section className="safe-px py-16 sm:py-20 md:py-28 bg-brand-offwhite">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
              <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                {t("process.badge")}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal mb-3 sm:mb-4">
                {t("process.title")}
              </h2>
              <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
                {t("process.subtitle")}
              </p>
            </div>
            <ProcessSteps steps={processSteps} />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 07. INTERACTIVE SERVICE CONSTELLATION ───────────────────── */}
      <ScrollReveal direction="up">
        <ServiceConstellation
          title={t("services.title")}
          subtitle={t("services.subtitle")}
          currency={tc("currency")}
          startingAt={tc("startingAt")}
          perMonth={tc("perMonth")}
          perProject={tc("perProject")}
          learnMore={tc("learnMore")}
          servicesData={servicesData}
        />
      </ScrollReveal>

      {/* ── 08. WHY MARKETIVITY 4 PILLARS ────────────────────────────── */}
      <ScrollReveal direction="up">
        <WhyMarketivity
          eyebrow={t("valueProp.eyebrow")}
          title={t("valueProp.title")}
          subtitle={t("valueProp.subtitle")}
          items={valuePropItems}
        />
      </ScrollReveal>

      {/* ── 09. REAL VERIFIED CASE STUDIES ──────────────────────────── */}
      <ScrollReveal direction="up">
        <section className="safe-px py-20 md:py-28 bg-brand-offwhite">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <span className="mb-3 inline-block rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
                {t("caseStudy.badge")}
              </span>
              <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-brand-charcoal">
                {t("caseStudy.title")}
              </h2>
              <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
                {t("caseStudy.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {getCaseStudies(locale).map((study, i) => (
                <ScrollReveal key={study.id} direction="up" delay={i * 0.1}>
                  <CaseStudyCard
                    study={study}
                    learnMoreLabel={t("caseStudy.learnMore")}
                    beforeLabel={t("caseStudy.before")}
                    afterLabel={t("caseStudy.after")}
                    durationLabel={t("caseStudy.duration")}
                  />
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-xs text-brand-charcoal/50 max-w-xl mx-auto">
                {t("caseStudy.disclaimer")}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 10. TESTIMONIALS & SOCIAL PROOF ─────────────────────────── */}
      <ScrollReveal direction="up">
        <section className="safe-px py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <span className="inline-block rounded-full bg-brand-purple/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-purple mb-3">
                COMMUNITY TRUST
              </span>
              <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-brand-charcoal">
                {t("testimonials.title")}
              </h2>
              <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
                {t("testimonials.subtitle")}
              </p>
            </div>
            <TestimonialCarousel
              reviews={reviews}
              badgeRecommended={tfb("recommended")}
              badgeOnFacebook={tfb("onFacebook")}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 11. FINAL HIGH IMPACT CTA ───────────────────────────────── */}
      <ScrollReveal direction="up">
        <CTASection
          title={t("footerCta.title")}
          subtitle={t("footerCta.subtitle")}
          cta={t("footerCta.cta")}
        />
      </ScrollReveal>
    </>
  );
}
