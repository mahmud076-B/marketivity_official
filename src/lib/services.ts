export const serviceSlugs = [
  "seo",
  "social-media",
  "paid-ads",
  "content-marketing",
  "branding",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceKeys: Record<ServiceSlug, string> = {
  seo: "seo",
  "social-media": "socialMedia",
  "paid-ads": "paidAds",
  "content-marketing": "contentMarketing",
  branding: "branding",
};

export const serviceMeta: Record<
  ServiceSlug,
  { unitType: "month" | "project" }
> = {
  seo: { unitType: "month" },
  "social-media": { unitType: "month" },
  "paid-ads": { unitType: "month" },
  "content-marketing": { unitType: "month" },
  branding: { unitType: "project" },
};
