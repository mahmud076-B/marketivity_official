import {
  campaignHeadline,
  campaignResultLabel,
  featuredCampaigns,
  type FeaturedCampaign,
} from "@/lib/campaigns";
import type { Locale } from "@/lib/site";

export type PortfolioTab = "software" | "websites" | "meta-ads";

export type PortfolioItem = {
  id: string;
  tab: PortfolioTab;
  name: string;
  kind: Record<Locale, string>;
  summary: Record<Locale, string>;
  /** Tech stack or ad channels. */
  stackLabel: Record<Locale, string>;
  stack: Record<Locale, string>;
  cover: string;
  coverAlt: Record<Locale, string>;
  visit?: {
    href: string;
    kind: "site" | "demo";
  };
  results?: { label: Record<Locale, string>; value: string }[];
  resultNote?: Record<Locale, string>;
};

const noUsage: Record<Locale, string> = {
  en: "No usage figures are published.",
  bn: "কোনো ব্যবহারের সংখ্যা প্রকাশ করা হয়নি।",
};

const tech: Record<Locale, string> = { en: "Tech", bn: "প্রযুক্তি" };
const channels: Record<Locale, string> = { en: "Channels", bn: "চ্যানেল" };

const softwareAndSites: PortfolioItem[] = [
  {
    id: "ai-academic-advisor",
    tab: "software",
    name: "AI Academic Advisor",
    kind: { en: "AI web app", bn: "এআই ওয়েব অ্যাপ" },
    summary: {
      en: "The public app describes itself as an intelligent campus memory assistant. Built by the founder.",
      bn: "পাবলিক অ্যাপটি নিজেকে একটি বুদ্ধিমান ক্যাম্পাস মেমোরি সহকারী বলে। প্রতিষ্ঠাতার তৈরি।",
    },
    stackLabel: tech,
    stack: {
      en: "Next.js, React, Tailwind CSS, Supabase, Vercel AI SDK",
      bn: "Next.js, React, Tailwind CSS, Supabase, Vercel AI SDK",
    },
    cover: "/portfolio/ai-academic-advisor.webp",
    coverAlt: {
      en: "AI Academic Advisor sign-in screen",
      bn: "এআই অ্যাকাডেমিক অ্যাডভাইজারের সাইন-ইন স্ক্রিন",
    },
    visit: { href: "https://ai-academic-advisor-eight.vercel.app", kind: "demo" },
    resultNote: noUsage,
  },
  {
    id: "marketivity-billing",
    tab: "software",
    name: "Marketivity Billing",
    kind: { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
    summary: {
      en: "The public page describes invoice, payment and client billing for Marketivity. Built by the founder.",
      bn: "পাবলিক পাতায় মার্কেটিভিটির ইনভয়েস, পেমেন্ট ও ক্লায়েন্ট বিলিংয়ের কথা বলা হয়েছে। প্রতিষ্ঠাতার তৈরি।",
    },
    stackLabel: tech,
    stack: {
      en: "React, TanStack Start, Tailwind CSS",
      bn: "React, TanStack Start, Tailwind CSS",
    },
    cover: "/portfolio/marketivity-billing.webp",
    coverAlt: {
      en: "Marketivity Billing screen",
      bn: "মার্কেটিভিটি বিলিংয়ের স্ক্রিন",
    },
    visit: { href: "https://marketivitybilling.vercel.app", kind: "demo" },
    resultNote: noUsage,
  },
  {
    id: "client-portal",
    tab: "software",
    name: "Client Portal",
    kind: { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
    summary: {
      en: "The sign-in page describes a secure client portal for Marketivity campaigns. Built by the founder.",
      bn: "সাইন-ইন পাতায় মার্কেটিভিটির ক্যাম্পেইনের জন্য একটি সুরক্ষিত ক্লায়েন্ট পোর্টালের কথা বলা হয়েছে। প্রতিষ্ঠাতার তৈরি।",
    },
    stackLabel: tech,
    stack: {
      en: "Next.js, React, Supabase, Tailwind CSS",
      bn: "Next.js, React, Supabase, Tailwind CSS",
    },
    cover: "/portfolio/client-portal.webp",
    coverAlt: {
      en: "Marketivity Client Portal sign-in screen",
      bn: "মার্কেটিভিটি ক্লায়েন্ট পোর্টালের সাইন-ইন স্ক্রিন",
    },
    visit: { href: "https://client-portal-xi-khaki.vercel.app", kind: "demo" },
    resultNote: noUsage,
  },
  {
    id: "marketivity-website",
    tab: "websites",
    name: "Marketivity website",
    kind: { en: "Website", bn: "ওয়েবসাইট" },
    summary: {
      en: "This website. A bilingual Next.js site in English and Bangla, designed and built by the founder.",
      bn: "এই ওয়েবসাইট। ইংরেজি ও বাংলায় একটি দ্বিভাষিক Next.js সাইট, প্রতিষ্ঠাতার নকশা ও নির্মাণ।",
    },
    stackLabel: tech,
    stack: {
      en: "Next.js, React, Tailwind CSS, next-intl",
      bn: "Next.js, React, Tailwind CSS, next-intl",
    },
    cover: "/portfolio/marketivity-website.webp",
    coverAlt: {
      en: "Marketivity website homepage",
      bn: "মার্কেটিভিটি ওয়েবসাইটের হোমপেজ",
    },
    visit: { href: "https://www.marketivity.agency", kind: "site" },
    resultNote: {
      en: "No traffic figures are published.",
      bn: "কোনো ট্রাফিকের সংখ্যা প্রকাশ করা হয়নি।",
    },
  },
];

function adsItem(campaign: FeaturedCampaign): PortfolioItem {
  const resultLabel = {
    en: campaignResultLabel(campaign.kind, "en"),
    bn: campaignResultLabel(campaign.kind, "bn"),
  };
  return {
    id: campaign.id,
    tab: "meta-ads",
    name: campaign.name,
    kind: resultLabel,
    summary: {
      en: campaignHeadline(campaign, "en"),
      bn: campaignHeadline(campaign, "bn"),
    },
    stackLabel: channels,
    stack: { en: "Meta Ads", bn: "মেটা অ্যাডস" },
    cover: `/portfolio/${campaign.id}.webp`,
    coverAlt: {
      en: `${campaign.name} results from Meta Ads Manager`,
      bn: `${campaign.name}: মেটা অ্যাডস ম্যানেজারের ফল`,
    },
    results: [
      {
        label: { en: "Spend", bn: "খরচ" },
        value: `$${campaign.spend.toFixed(2)}`,
      },
      {
        label: resultLabel,
        value: campaign.results.toLocaleString("en-US"),
      },
      {
        label: { en: "Impressions", bn: "ইমপ্রেশন" },
        value: campaign.impressions.toLocaleString("en-US"),
      },
      {
        label: { en: "Reach", bn: "রিচ" },
        value: campaign.reach.toLocaleString("en-US"),
      },
      {
        label: {
          en: "Cost per result (not rounded up)",
          bn: "প্রতি ফলের খরচ (উপরের দিকে পূর্ণ করা হয়নি)",
        },
        value: `$${campaign.costPerResult}`,
      },
    ],
    resultNote: {
      en: "Ads Manager figures. This is not a sales or revenue result.",
      bn: "অ্যাডস ম্যানেজারের সংখ্যা। এটি বিক্রি বা রাজস্ব নয়।",
    },
  };
}

/** Software, then websites, then Meta Ads. */
export const portfolioItems: PortfolioItem[] = [
  ...softwareAndSites,
  ...featuredCampaigns.map(adsItem),
];

export const portfolioTabs: PortfolioTab[] = ["software", "websites", "meta-ads"];

export function resolvePortfolioTab(value: string | string[] | undefined): PortfolioTab {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "websites" || raw === "meta-ads" || raw === "software") return raw;
  return "software";
}

export function itemsForTab(tab: PortfolioTab): PortfolioItem[] {
  return portfolioItems.filter((item) => item.tab === tab);
}

export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id);
}

export const selectedPortfolioIds = [
  "ai-academic-advisor",
  "marketivity-website",
  "baby-dress",
] as const;
