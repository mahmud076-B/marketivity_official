import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogCategories, categoryLabel, readingMinutes } from "@/lib/blog";
import { blogPosts } from "@/lib/blog-posts";
import { Calendar } from "lucide-react";
import { isLocale, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import PageActions from "@/components/sections/PageActions";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
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

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const tc = await getTranslations("common");
  const safe: Locale = isLocale(locale) ? locale : "en";
  const selected = blogCategories.some((item) => item.id === category) ? category : undefined;
  const posts = blogPosts.filter((post) => (selected ? post.category === selected : true));

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-purple">Marketivity</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                selected ? "border border-brand-charcoal/10 bg-white text-brand-charcoal" : "bg-brand-orange text-brand-charcoal"
              }`}
            >
              All
            </Link>
            {blogCategories.map((item) => (
              <Link
                key={item.id}
                href={`/blog?category=${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  selected === item.id
                    ? "bg-brand-orange text-brand-charcoal"
                    : "border border-brand-charcoal/10 bg-white text-brand-charcoal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <PageActions locale={safe} align="center" />
          </div>
        </div>
      </section>

      <section className="safe-px pb-16 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-charcoal/10 bg-white shadow-soft-md"
            >
              <Link href={`/blog/${post.slug}`} className="relative aspect-[1200/630] overflow-hidden bg-brand-offwhite">
                <Image
                  src={post.hero.src}
                  alt={post.hero.alt}
                  fill
                  quality={68}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                  <Link href={`/blog?category=${post.category}`} className="rounded-full bg-brand-offwhite px-2.5 py-1 font-bold text-brand-charcoal">
                    {categoryLabel(post.category)}
                  </Link>
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>
                    {readingMinutes(post)} {t("readTime")}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-brand-muted">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 text-sm font-bold text-brand-orange">
                  {tc("readMore")} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
