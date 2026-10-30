"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { blogCategories, type BlogCategoryId } from "@/lib/blog";

export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  categoryName: string;
  date: string;
  dateLabel: string;
  minutes: number;
  image: string;
  alt: string;
};

function isCategory(value: string | null): value is BlogCategoryId {
  return blogCategories.some((item) => item.id === value);
}

export function BlogIndex({
  posts,
  initialCategory,
  readTimeLabel,
  readMoreLabel,
}: {
  posts: BlogCard[];
  initialCategory: string | null;
  readTimeLabel: string;
  readMoreLabel: string;
}) {
  const [category, setCategory] = useState<BlogCategoryId | null>(
    isCategory(initialCategory) ? initialCategory : null,
  );
  const visible = category ? posts.filter((post) => post.category === category) : posts;

  function select(next: BlogCategoryId | null) {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("category", next);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  return (
    <>
      <div className="mx-auto mb-8 flex max-w-6xl flex-wrap gap-2" role="group" aria-label="Filter posts by category">
        <button
          type="button"
          aria-pressed={category === null}
          onClick={() => select(null)}
          className={`rounded-full px-4 py-2 text-sm font-bold ${
            category === null
              ? "bg-brand-orange text-brand-charcoal"
              : "border border-brand-charcoal/10 bg-white text-brand-charcoal"
          }`}
        >
          All
        </button>
        {blogCategories.map((item) => {
          const pressed = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                pressed
                  ? "bg-brand-orange text-brand-charcoal"
                  : "border border-brand-charcoal/10 bg-white text-brand-charcoal"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
        {visible.map((post) => (
          <article
            key={post.slug}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-charcoal/10 bg-white shadow-soft-md"
          >
            <Link href={`/blog/${post.slug}`} className="relative aspect-[1200/630] overflow-hidden bg-brand-offwhite">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                quality={68}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                <button
                  type="button"
                  aria-pressed={category === post.category}
                  onClick={() => select(post.category)}
                  className="rounded-full bg-brand-offwhite px-2.5 py-1 font-bold text-brand-charcoal"
                >
                  {post.categoryName}
                </button>
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>·</span>
                <span>
                  {post.minutes} {readTimeLabel}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-brand-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 text-sm font-bold text-brand-orange">
                {readMoreLabel} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
