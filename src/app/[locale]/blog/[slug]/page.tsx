import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/lib/blog";
import CTASection from "@/components/sections/CTASection";
import { ArrowLeft, Calendar } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tc = await getTranslations("common");
  const th = await getTranslations("home");

  const content = t.raw(`posts.${slug}.content`) as Record<string, string>;
  const paragraphs = Object.values(content);

  return (
    <>
      <article className="safe-px py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-charcoal/60 hover:text-brand-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            {tc("backToBlog")}
          </Link>

          <div className="mb-6 flex items-center gap-2 text-sm text-brand-charcoal/50">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
            <span>·</span>
            <span>5 {t("readTime")}</span>
          </div>

          <h1 className="mb-8 text-3xl font-bold leading-tight text-brand-charcoal md:text-4xl">
            {t(`posts.${slug}.title`)}
          </h1>

          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={t(`posts.${slug}.title`)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="leading-relaxed text-brand-charcoal/80"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </article>

      <CTASection
        title={th("footerCta.title")}
        subtitle={th("footerCta.subtitle")}
        cta={th("footerCta.cta")}
      />
    </>
  );
}
