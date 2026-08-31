import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import StatsMarquee from "@/components/sections/StatsMarquee";
import { createStatItems } from "@/lib/stats";
import CTASection from "@/components/sections/CTASection";
import FacebookBadge from "@/components/ui/FacebookBadge";

const teamMembersEn = [
  {
    name: "Ahmed Rahman",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Sadia Islam",
    role: "Head of Strategy",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Tanvir Hossain",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Nadia Parvin",
    role: "Social Media Lead",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

const teamMembersBn = [
  {
    name: "আহমেদ রহমান",
    role: "প্রতিষ্ঠাতা ও সিইও",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "সাদিয়া ইসলাম",
    role: "হেড অব স্ট্র্যাটেজি",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "তানভীর হোসেন",
    role: "ক্রিয়েটিভ ডিরেক্টর",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "নাদিয়া পারভীন",
    role: "সোশ্যাল মিডিয়া লিড",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const th = await getTranslations("home");
  const tc = await getTranslations("common");
  const tfb = await getTranslations("facebookBadge");

  const valueKeys = ["integrity", "excellence", "innovation", "partnership"] as const;
  const statItems = createStatItems((key) => th(`stats.${key}`));
  const members = locale === "bn" ? teamMembersBn : teamMembersEn;

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <FacebookBadge
            recommended={tfb("recommended")}
            onFacebook={tfb("onFacebook")}
          />
          <h1 className="mt-6 text-4xl font-bold text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-charcoal/70">{t("subtitle")}</p>
        </div>
      </section>

      <StatsMarquee items={statItems} />

      <section className="safe-px py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-brand-charcoal">
              {t("story.title")}
            </h2>
            <p className="mb-4 leading-relaxed text-brand-charcoal/70">
              {t("story.p1")}
            </p>
            <p className="leading-relaxed text-brand-charcoal/70">
              {t("story.p2")}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-purple/10">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Marketivity team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="safe-px bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-brand-charcoal/10 p-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-orange">
              {t("mission.title")}
            </h2>
            <p className="leading-relaxed text-brand-charcoal/70">
              {t("mission.description")}
            </p>
          </div>
          <div className="rounded-2xl border border-brand-charcoal/10 p-8">
            <h2 className="mb-4 text-2xl font-bold text-brand-purple">
              {t("vision.title")}
            </h2>
            <p className="leading-relaxed text-brand-charcoal/70">
              {t("vision.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="safe-px py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-brand-charcoal">
            {t("values.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-brand-charcoal/10 bg-white p-6 text-center shadow-sm"
              >
                <h3 className="mb-2 font-bold text-brand-charcoal">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="text-sm text-brand-charcoal/70">
                  {t(`values.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="safe-px bg-white py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-charcoal">
              {t("team.title")}
            </h2>
            <p className="text-brand-charcoal/70">{t("team.subtitle")}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4 aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <h3 className="font-bold text-brand-charcoal">{member.name}</h3>
                <p className="text-sm text-brand-charcoal/60">{member.role}</p>
              </div>
            ))}
          </div>
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
