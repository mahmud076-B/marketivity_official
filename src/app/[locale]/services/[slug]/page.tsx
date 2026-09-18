import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  serviceSlugs,
  serviceKeys,
  type ServiceSlug,
} from "@/lib/services";
import CTASection from "@/components/sections/CTASection";
import FacebookBadge from "@/components/ui/FacebookBadge";
import { Check, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!serviceSlugs.includes(slug as ServiceSlug)) notFound();

  const key = serviceKeys[slug as ServiceSlug];
  const ts = await getTranslations("services");
  const tc = await getTranslations("common");
  const tfb = await getTranslations("facebookBadge");

  const isProject = slug === "branding";
  const features = [0, 1, 2, 3, 4, 5].map((i) =>
    ts(`${key}.features.${i}`)
  );
  const steps = [0, 1, 2, 3, 4].map((i) =>
    ts(`${key}.process.steps.${i}`)
  );

  return (
    <>
      <section className="gradient-hero safe-px py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <FacebookBadge
            recommended={tfb("recommended")}
            onFacebook={tfb("onFacebook")}
          />
          <h1 className="mt-6 text-4xl font-bold text-brand-charcoal md:text-5xl">
            {ts(`${key}.title`)}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-charcoal/70">
            {ts(`${key}.heroSubtitle`)}
          </p>
          <div className="mt-8">
            <span className="text-sm font-medium uppercase tracking-wide text-brand-charcoal/50">
              {tc("startingAt")}
            </span>
            <p className="text-4xl font-bold text-brand-purple">
              {tc("currency")}
              {ts(`${key}.price`)}
              <span className="text-lg font-normal text-brand-charcoal/60">
                {isProject ? tc("perProject") : tc("perMonth")}
              </span>
            </p>
          </div>
          <Link
            href="/contact"
            className="touch-target mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-3 text-base font-bold text-white transition-transform hover:scale-105"
          >
            {ts(`${key}.cta`)}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="safe-px py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-brand-charcoal">
              {ts(`${key}.benefits.title`)}
            </h2>
            <p className="leading-relaxed text-brand-charcoal/70">
              {ts(`${key}.benefits.description`)}
            </p>
          </div>
          <ScrollReveal direction="up" delay={0.08}>
          <div className="rounded-2xl border border-brand-purple/25 bg-gradient-to-br from-white via-brand-purple/5 to-brand-orange/10 p-8 shadow-soft-md backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-bold text-brand-charcoal">
              {ts("includedTitle")}
            </h2>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-brand-charcoal/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="safe-px bg-white py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-brand-charcoal">
            {ts(`${key}.process.title`)}
          </h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.07}>
              <div className="flex items-start gap-4 rounded-2xl border border-brand-orange/15 bg-white/65 p-4 shadow-soft-sm backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-2 text-brand-charcoal/80">{step}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="safe-px py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-brand-charcoal">
            {ts("otherServices")}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceSlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <Link
                  key={s}
                  href={`/services/${s}`}
                  className="touch-target rounded-full border border-brand-charcoal/15 bg-white px-5 py-2.5 text-sm font-medium text-brand-charcoal transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  {ts(`${serviceKeys[s]}.title`)}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection
        title={ts(`${key}.title`)}
        subtitle={ts(`${key}.heroSubtitle`)}
        cta={ts(`${key}.cta`)}
      />
    </>
  );
}
