import { serviceCategories } from "@/lib/pricing";

export type ServiceSlug = (typeof serviceCategories)[number]["slug"];

export const serviceSlugs: ServiceSlug[] = serviceCategories.map(
  (category) => category.slug
);

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceCategories.some((category) => category.slug === value);
}
