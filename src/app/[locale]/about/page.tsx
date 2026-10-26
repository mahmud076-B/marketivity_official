import { getTranslations, setRequestLocale } from "next-intl/server";
import CTASection from "@/components/sections/CTASection";
import TrustStrip from "@/components/sections/TrustStrip";
import PageActions from "@/components/sections/PageActions";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SocialLinks from "@/components/ui/SocialLinks";
import { SHOW_TEAM, founder, isLocale, site, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const titles = {
  en: "About Marketivity",
  bn: "মার্কেটিভিটি সম্পর্কে",
};
const descriptions = {
  en: "Marketivity was founded in July 2025 by S M Mahmud Hasan. A Meta ads and software studio in Rajshahi, working with clients in Bangladesh, the UK and the USA.",
  bn: "মার্কেটিভিটি ২০২৫ সালের জুলাইয়ে এস এম মাহমুদ হাসান প্রতিষ্ঠা করেন। রাজশাহীর একটি মেটা অ্যাডস ও সফটওয়্যার স্টুডিও, যা বাংলাদেশ, যুক্তরাজ্য ও যুক্তরাষ্ট্রের ক্লায়েন্টদের সাথে কাজ করে।",
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/about",
    title: titles[safe],
    description: descriptions[safe],
  });
}

const team = [
  {
    name: founder.name,
    role: founder.role,
  },
];

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const valueKeys = ["integrity", "excellence", "innovation", "partnership"] as const;

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">{titles[locale]}</h1>
          <p className="mt-4 text-lg text-brand-muted">{descriptions[locale]}</p>
          <div className="mt-8 flex justify-center">
            <PageActions locale={locale} align="center" />
          </div>
        </div>
      </section>

      <TrustStrip locale={locale} />

      <section className="safe-px py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-brand-charcoal">{t("story.title")}</h2>
            <p className="mb-4 leading-relaxed text-brand-muted">{t("story.p1")}</p>
            <p className="leading-relaxed text-brand-muted">{t("story.p2")}</p>
          </div>
          <aside className="rounded-3xl border border-brand-purple/20 bg-white p-6 shadow-soft-md">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              {founder.role[locale]}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-brand-charcoal">{founder.name}</h2>
            <p className="mt-2 text-sm text-brand-muted">{founder.foundedLabel[locale]}</p>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              {locale === "bn"
                ? "তিনি মেটা ক্যাম্পেইন চালান এবং মার্কেটিভিটির সফটওয়্যার তৈরি করেন। ছবি পরে যোগ করা হবে।"
                : "He runs the Meta campaigns and builds Marketivity’s software. A photo will be added when one is ready."}
            </p>
            <a
              href={site.github}
              className="mt-4 inline-flex text-sm font-semibold text-brand-purple"
              rel="noreferrer"
              target="_blank"
            >
              GitHub · mahmud076-B
            </a>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </aside>
        </div>
      </section>

      <section className="safe-px bg-white py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-brand-orange/20 bg-brand-offwhite p-8">
            <h2 className="mb-3 text-2xl font-bold text-brand-charcoal">{t("mission.title")}</h2>
            <p className="leading-relaxed text-brand-muted">{t("mission.description")}</p>
          </div>
          <div className="rounded-3xl border border-brand-purple/20 bg-brand-offwhite p-8">
            <h2 className="mb-3 text-2xl font-bold text-brand-purple">{t("vision.title")}</h2>
            <p className="leading-relaxed text-brand-muted">{t("vision.description")}</p>
          </div>
        </div>
      </section>

      <section className="safe-px py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-charcoal">{t("values.title")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key) => (
              <ScrollReveal key={key} direction="up" delay={valueKeys.indexOf(key) * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-brand-charcoal/10 bg-white p-5">
                  <h3 className="font-bold text-brand-charcoal">{t(`values.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm text-brand-muted">{t(`values.items.${key}.description`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {SHOW_TEAM ? (
        <section className="safe-px bg-white py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-brand-charcoal">{t("team.title")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-brand-charcoal/10 bg-brand-offwhite p-5 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-purple/10 text-lg font-bold text-brand-purple">
                    SM
                  </div>
                  <h3 className="font-bold text-brand-charcoal">{member.name}</h3>
                  <p className="text-sm text-brand-muted">{member.role[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection title={titles[locale]} subtitle={descriptions[locale]} cta={tc("contactUs")} />
    </>
  );
}
