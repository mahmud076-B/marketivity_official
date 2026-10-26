import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { serviceCategories } from "@/lib/pricing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    ...serviceCategories.map((category) => `/services/${category.slug}`),
    "/work",
    "/pricing",
    "/blog",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const lastModified = new Date("2026-10-26");

  return ["en", "bn"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: {
          en: `${site.url}/en${path}`,
          bn: `${site.url}/bn${path}`,
        },
      },
    }))
  );
}
