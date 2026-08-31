import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Briefcase, TrendingUp, Users, Clock } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("careers");
  const tc = await getTranslations("common");

  const cultureKeys = ["growth", "impact", "culture", "flexible"] as const;
  const cultureIcons = [TrendingUp, Briefcase, Users, Clock];
  const positionKeys = ["socialMedia", "graphicDesigner", "contentWriter"] as const;

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

      <section className="safe-px bg-white py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-brand-charcoal">
            {t("culture.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cultureKeys.map((key, i) => {
              const Icon = cultureIcons[i];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-brand-charcoal/10 p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold text-brand-charcoal">
                    {t(`culture.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70">
                    {t(`culture.items.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="safe-px py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-charcoal">
              {t("openings.title")}
            </h2>
            <p className="text-brand-charcoal/70">{t("openings.subtitle")}</p>
          </div>
          <div className="space-y-4">
            {positionKeys.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-4 rounded-2xl border border-brand-charcoal/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-brand-charcoal">
                    {t(`openings.positions.${key}.title`)}
                  </h3>
                  <p className="text-sm text-brand-charcoal/60">
                    {t(`openings.positions.${key}.type`)} ·{" "}
                    {t(`openings.positions.${key}.location`)}
                  </p>
                </div>
                <a
                  href="mailto:marketivitybd@gmail.com?subject=Job Application"
                  className="touch-target inline-flex shrink-0 items-center justify-center rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-light"
                >
                  {tc("applyNow")}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-brand-charcoal/60">
            {t("openings.noMatch")}
          </p>
        </div>
      </section>

      <CTASection
        title={t("title")}
        subtitle={t("subtitle")}
        cta={tc("contactUs")}
      />
    </>
  );
}
