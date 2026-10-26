import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/lib/blog";
import { Calendar } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import PageActions from "@/components/sections/PageActions";
import CTASection from "@/components/sections/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const messages = (await import(`../../../../messages/${safe}.json`)).default;
  return pageMetadata({
    locale: safe,
    path: "/blog",
    title: messages.blog.title,
    description: messages.blog.subtitle,
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const tc = await getTranslations("common");

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-muted">{t("subtitle")}</p>
          <div className="mt-8 flex justify-center">
            <PageActions locale={isLocale(locale) ? locale : "en"} align="center" />
          </div>
        </div>
      </section>

      <section className="safe-px pb-16 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.slug} direction="up" delay={index * 0.08} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-purple/20 bg-gradient-to-br from-white via-brand-purple/5 to-brand-orange/10 shadow-soft-md backdrop-blur-sm transition-shadow hover:shadow-soft-lg">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={t(`posts.${post.slug}.title`)}
                  fill
                  quality={60}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-brand-charcoal/50">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>5 {t("readTime")}</span>
                </div>
                <h2 className="mb-2 text-lg font-bold text-brand-charcoal group-hover:text-brand-orange">
                  <Link href={`/blog/${post.slug}`}>
                    {t(`posts.${post.slug}.title`)}
                  </Link>
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-brand-charcoal/70">
                  {t(`posts.${post.slug}.excerpt`)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-brand-orange hover:underline"
                >
                  {tc("readMore")} →
                </Link>
              </div>
            </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <CTASection title={t("title")} subtitle={t("subtitle")} cta={tc("bookCall")} />
    </>
  );
}
