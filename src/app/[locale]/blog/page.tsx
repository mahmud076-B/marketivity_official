import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogCategories, categoryLabel, readingMinutes } from "@/lib/blog";
import { blogPosts } from "@/lib/blog-posts";
import { BlogIndex } from "@/components/blog/BlogIndex";
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
  const initialCategory = blogCategories.some((item) => item.id === category) ? category! : null;

  const cards = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryName: categoryLabel(post.category),
    date: post.datePublished,
    dateLabel: new Date(post.datePublished).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    minutes: readingMinutes(post),
    image: post.hero.src,
    alt: post.hero.alt,
  }));

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-purple">Marketivity</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{t("subtitle")}</p>
          <div className="mt-8 flex justify-center">
            <PageActions locale={safe} align="center" />
          </div>
        </div>
      </section>

      <section className="safe-px pb-16 md:pb-20">
        <BlogIndex
          posts={cards}
          initialCategory={initialCategory}
          readTimeLabel={t("readTime")}
          readMoreLabel={tc("readMore")}
        />
      </section>
    </>
  );
}
