import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { serviceCategories } from "@/lib/pricing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    ...serviceCategories.map((category) => `/services/${category.slug}`),
    "/portfolio",
    "/pricing",
    "/blog",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const lastModified = new Date("2026-10-26");

  const pages = ["en", "bn"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: {
          en: `${site.url}/en${path}`,
          bn: `${site.url}/bn${path}`,
        },
      },
    })),
  );

  const posts = ["en", "bn"].flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${site.url}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      alternates: {
        languages: {
          en: `${site.url}/en/blog/${post.slug}`,
          bn: `${site.url}/bn/blog/${post.slug}`,
        },
      },
    })),
  );

  return [...pages, ...posts];
}
