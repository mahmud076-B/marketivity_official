/**
 * Public site facts. Team photos are not on the site yet.
 * Set SHOW_TEAM to true when real photos are ready. The About page
 * already introduces the founder, so it stays complete while this is false.
 */
export const SHOW_TEAM = false;

export const site = {
  name: "Marketivity",
  domain: "marketivity.agency",
  url: "https://www.marketivity.agency",
  email: "marketivitybd@gmail.com",
  phoneDisplay: "+880 1767-644696",
  phoneTel: "+8801767644696",
  whatsapp: "https://wa.me/8801767644696",
  facebook: "https://facebook.com/marketivitybd",
  instagram: "https://instagram.com/marketivitybd",
  linkedin: "https://www.linkedin.com/company/marketivity-bd",
  github: "https://github.com/mahmud076-B",
  address: {
    en: "Padma R/A, Chandrima, Rajshahi, Bangladesh",
    bn: "পদ্মা আর/এ, চন্দ্রিমা, রাজশাহী, বাংলাদেশ",
  },
} as const;

export const founder = {
  name: "S M Mahmud Hasan",
  role: {
    en: "Founder & CEO",
    bn: "প্রতিষ্ঠাতা ও প্রধান নির্বাহী",
  },
  foundedLabel: {
    en: "Founded Marketivity in July 2025",
    bn: "২০২৫ সালের জুলাইয়ে মার্কেটিভিটি প্রতিষ্ঠা করেন",
  },
} as const;

export type Locale = "en" | "bn";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "bn";
}

export function whatsappLink(message: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
