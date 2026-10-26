export const blogPosts = [
  {
    slug: "digital-marketing-trends-bangladesh-2026",
    image: "/images/blog-digital-marketing-trends.webp",
    date: "2026-05-15",
    author: "Marketivity",
  },
  {
    slug: "facebook-ads-roi-tips",
    image: "/images/blog-facebook-ads-roi.webp",
    date: "2026-04-22",
    author: "Marketivity",
  },
  {
    slug: "seo-local-business-rajshahi",
    image: "/images/blog-seo-rajshahi.webp",
    date: "2026-03-10",
    author: "Marketivity",
  },
] as const;

export type BlogSlug = (typeof blogPosts)[number]["slug"];
