import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { categoryLabel, readingMinutes, relatedPosts } from "@/lib/blog";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { PostBody } from "@/components/blog/PostBody";
import { founder, isLocale, site, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    locale: safe,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    image: post.og,
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const safe: Locale = isLocale(locale) ? locale : "en";
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const url = `${site.url}/${safe}/blog/${post.slug}`;
  const related = relatedPosts(post, blogPosts);
  const graph = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [`${site.url}${post.og}`],
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { "@type": "Person", name: founder.name },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      mainEntityOfPage: url,
      articleSection: categoryLabel(post.category),
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/${safe}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/${safe}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <article className="safe-px py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-brand-muted">
          <Link href="/" className="hover:text-brand-orange">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/blog" className="hover:text-brand-orange">Blog</Link>
          <span aria-hidden> / </span>
          <span className="text-brand-charcoal">{categoryLabel(post.category)}</span>
        </nav>

        <Link
          href={`/blog?category=${post.category}`}
          className="inline-flex rounded-full bg-brand-offwhite px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-charcoal"
        >
          {categoryLabel(post.category)}
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-brand-charcoal md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-brand-muted">{post.description}</p>
        <p className="mt-4 text-sm text-brand-muted">
          <time dateTime={post.datePublished}>
            {new Date(post.datePublished).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span> · Updated </span>
          <time dateTime={post.dateModified}>
            {new Date(post.dateModified).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span> · {founder.name}</span>
          <span> · {readingMinutes(post)} {t("readTime")}</span>
        </p>

        <figure className="mt-8 overflow-hidden rounded-3xl border border-brand-charcoal/10 bg-brand-offwhite">
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            width={post.hero.width}
            height={post.hero.height}
            quality={68}
            preload
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <figcaption className="px-4 py-3 text-sm text-brand-muted">
            Original Marketivity graphic. Not a stock photo.
          </figcaption>
        </figure>

        <div className="mt-10">
          <PostBody source={post.body} />
        </div>

        <section className="mt-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight text-brand-charcoal">
            FAQ
          </h2>
          <div className="mt-4 divide-y divide-brand-charcoal/10 rounded-3xl border border-brand-charcoal/10 bg-white">
            {post.faqs.map((faq) => (
              <div key={faq.q} className="px-5 py-4">
                <h3 className="font-bold text-brand-charcoal">{faq.q}</h3>
                <p className="mt-2 leading-relaxed text-brand-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="mt-10 rounded-3xl border border-brand-orange/30 bg-brand-offwhite px-6 py-6">
          <h2 className="text-2xl font-extrabold text-brand-charcoal">{post.cta.title}</h2>
          <p className="mt-2 leading-relaxed text-brand-muted">{post.cta.body}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={post.cta.href} className="btn-primary">{post.cta.label}</Link>
            <Link href="/pricing" className="btn-secondary">See pricing</Link>
          </div>
        </aside>

        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-extrabold text-brand-charcoal">Related notes</h2>
          <ul className="mt-4 grid gap-4">
            {related.map((item) => (
              <li key={item.slug} className="rounded-2xl border border-brand-charcoal/10 bg-white px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-purple">
                  {categoryLabel(item.category)}
                </p>
                <Link href={`/blog/${item.slug}`} className="mt-1 block text-lg font-bold text-brand-charcoal hover:text-brand-orange">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
