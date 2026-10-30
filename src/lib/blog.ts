export const blogCategories = [
  { id: "uk-restaurants", label: "UK Restaurants" },
  { id: "ecommerce", label: "E-commerce & Shopify" },
  { id: "web-ai", label: "Web & AI" },
  { id: "bangladesh", label: "Bangladesh" },
] as const;

export type BlogCategoryId = (typeof blogCategories)[number]["id"];

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategoryId;
  datePublished: string;
  dateModified: string;
  hero: { src: string; alt: string; width: number; height: number };
  og: string;
  /** Inline diagrams or portfolio images, already counted inside the body. */
  body: string;
  faqs: BlogFaq[];
  cta: { title: string; body: string; href: string; label: string };
};

export function categoryLabel(id: BlogCategoryId) {
  return blogCategories.find((item) => item.id === id)?.label ?? id;
}

export function readingMinutes(post: BlogPost) {
  const words = post.body.split(/\s+/).filter(Boolean).length;
  return Math.max(5, Math.round(words / 220));
}

export function relatedPosts(post: BlogPost, posts: readonly BlogPost[]) {
  const same = posts.filter((item) => item.slug !== post.slug && item.category === post.category);
  const rest = posts.filter((item) => item.slug !== post.slug && item.category !== post.category);
  return [...same, ...rest].slice(0, 3);
}
