import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Briefcase, TrendingUp, Users, Clock } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const messages = (await import(`../../../../messages/${safe}.json`)).default;
  return pageMetadata({
    locale: safe,
    path: "/careers",
    title: messages.careers.title,
    description: messages.careers.subtitle,
  });
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("careers");
  const tc = await getTranslations("common");

  const cultureKeys = ["growth", "impact", "culture", "flexible"] as const;
  const cultureIcons = [TrendingUp, Briefcase, Users, Clock];

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-muted">{t("subtitle")}</p>
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
                <ScrollReveal key={key} direction="up" delay={i * 0.07}>
                <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-white via-brand-orange/5 to-brand-purple/10 p-6 text-center shadow-soft-md backdrop-blur-sm transition-shadow hover:shadow-soft-lg">
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
                </ScrollReveal>
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
          <div className="rounded-2xl border border-brand-charcoal/10 bg-white p-6 text-center shadow-soft-sm">
            <p className="text-brand-muted">{t("openings.noMatch")}</p>
            <a href="mailto:marketivitybd@gmail.com" className="btn-primary mt-6">
              {tc("email")}
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title={t("title")}
        subtitle={t("subtitle")}
        cta={tc("bookCall")}
      />
    </>
  );
}
