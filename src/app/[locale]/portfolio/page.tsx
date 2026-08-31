import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import CTASection from "@/components/sections/CTASection";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getCaseStudies } from "@/lib/case-studies";
import FacebookBadge from "@/components/ui/FacebookBadge";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio");
  const th = await getTranslations("home");
  const tc = await getTranslations("common");
  const tfb = await getTranslations("facebookBadge");

  return (
    <>
      <section className="gradient-hero safe-px py-16 md:py-24 text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl relative z-10">
          <div className="mb-6 flex justify-center">
            <FacebookBadge
              recommended={tfb("recommended")}
              onFacebook={tfb("onFacebook")}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-charcoal">
            {t("title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-charcoal/75 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="safe-px py-16 md:py-20 bg-brand-offwhite">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
              {t("featuredBadge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
              {t("featuredTitle")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getCaseStudies(locale).map((study, i) => (
              <ScrollReveal key={study.id} direction="up" delay={i * 0.1}>
                <CaseStudyCard
                  study={study}
                  learnMoreLabel={th("caseStudy.learnMore")}
                  beforeLabel={th("caseStudy.before")}
                  afterLabel={th("caseStudy.after")}
                  durationLabel={th("caseStudy.duration")}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-brand-charcoal/50 max-w-xl mx-auto">
              {th("caseStudy.disclaimer")}
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title={t("title")}
        subtitle={t("ctaSubtitle")}
        cta={tc("contactUs")}
      />
    </>
  );
}
