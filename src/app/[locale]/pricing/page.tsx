import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serviceSlugs, serviceKeys } from "@/lib/services";
import CTASection from "@/components/sections/CTASection";
import { Check } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pricing");
  const tc = await getTranslations("common");
  const ts = await getTranslations("services");

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-charcoal/70">{t("subtitle")}</p>
        </div>
      </section>

      <section className="safe-px pb-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceSlugs.map((slug) => {
            const key = serviceKeys[slug];
            const isProject = slug === "branding";
            return (
              <ScrollReveal key={slug} direction="up" delay={serviceSlugs.indexOf(slug) * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-brand-purple/25 bg-gradient-to-br from-white via-brand-purple/5 to-brand-orange/10 p-8 shadow-soft-md backdrop-blur-sm transition-shadow hover:shadow-soft-lg">
                <h2 className="mb-2 text-xl font-bold text-brand-charcoal">
                  {ts(`${key}.title`)}
                </h2>
                <p className="mb-6 flex-1 text-sm text-brand-charcoal/70">
                  {ts(`${key}.shortDescription`)}
                </p>
                <div className="mb-6">
                  <span className="text-xs font-medium uppercase tracking-wide text-brand-charcoal/50">
                    {tc("startingAt")}
                  </span>
                  <p className="text-3xl font-bold text-brand-purple">
                    {tc("currency")}
                    {ts(`${key}.price`)}
                    <span className="text-base font-normal text-brand-charcoal/60">
                      {isProject ? tc("perProject") : tc("perMonth")}
                    </span>
                  </p>
                </div>
                <ul className="mb-6 space-y-2">
                  {[0, 1, 2].map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-brand-charcoal/70"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {ts(`${key}.features.${i}`)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${slug}`}
                  className="touch-target inline-flex items-center justify-center rounded-full border-2 border-brand-orange px-6 py-2.5 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
                >
                  {tc("learnMore")}
                </Link>
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="safe-px pb-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-brand-purple/30 bg-brand-purple/5 p-8 text-center">
          <p className="mb-2 text-brand-charcoal/70">{t("note")}</p>
          <p className="font-semibold text-brand-purple">{t("tiersComing")}</p>
        </div>
      </section>

      <CTASection
        title={t("title")}
        subtitle={t("note")}
        cta={t("cta")}
      />
    </>
  );
}
