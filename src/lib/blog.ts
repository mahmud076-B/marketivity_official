export const blogPosts = [
  {
    slug: "digital-marketing-trends-bangladesh-2026",
    image: "/images/blog-digital-marketing-trends.png",
    date: "2026-05-15",
    author: "Marketivity Team",
  },
  {
    slug: "facebook-ads-roi-tips",
    image: "/images/blog-facebook-ads-roi.png",
    date: "2026-04-22",
    author: "Marketivity Team",
  },
  {
    slug: "seo-local-business-rajshahi",
    image: "/images/blog-seo-rajshahi.png",
    date: "2026-03-10",
    author: "Marketivity Team",
  },
] as const;

export type BlogSlug = (typeof blogPosts)[number]["slug"];
