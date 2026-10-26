import type { Locale } from "@/lib/site";

export type SoftwareProject = {
  id: string;
  name: string;
  kind: Record<Locale, string>;
  summary: Record<Locale, string>;
  /** Public path on this site. Internal tools are not linked. */
  href?: string;
};

/** Software the founder has built. No performance figures. */
export const softwareProjects: SoftwareProject[] = [
  {
    id: "ai-academic-advisor",
    name: "AI Academic Advisor",
    kind: { en: "AI web app", bn: "এআই ওয়েব অ্যাপ" },
    summary: {
      en: "An AI web app built by S M Mahmud Hasan (GitHub mahmud076-B). It is listed here as shipped software. No usage figures are published.",
      bn: "এস এম মাহমুদ হাসান (GitHub mahmud076-B) তৈরি একটি এআই ওয়েব অ্যাপ। এটি শিপ করা সফটওয়্যার হিসেবে দেখানো হয়েছে। কোনো ব্যবহারের সংখ্যা প্রকাশ করা হয়নি।",
    },
  },
  {
    id: "marketivity-billing",
    name: "Marketivity Billing",
    kind: { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
    summary: {
      en: "Internal billing software for Marketivity, built by the founder. It is not a public product, and this site does not link to it.",
      bn: "মার্কেটিভিটির অভ্যন্তরীণ বিলিং সফটওয়্যার, প্রতিষ্ঠাতার তৈরি। এটি সর্বসাধারণের পণ্য নয়, তাই এই সাইট থেকে লিঙ্ক দেওয়া হয় না।",
    },
  },
  {
    id: "client-portal",
    name: "Client Portal",
    kind: { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
    summary: {
      en: "An internal portal for Marketivity clients, built by the founder. It is not linked from the public website.",
      bn: "মার্কেটিভিটির ক্লায়েন্টদের জন্য একটি অভ্যন্তরীণ পোর্টাল, প্রতিষ্ঠাতার তৈরি। পাবলিক ওয়েবসাইট থেকে এটির লিঙ্ক দেওয়া হয় না।",
    },
  },
  {
    id: "marketivity-website",
    name: "Marketivity website",
    kind: { en: "Website", bn: "ওয়েবসাইট" },
    summary: {
      en: "This website. A bilingual Next.js site in English and Bangla, designed and built by the founder.",
      bn: "এই ওয়েবসাইট। ইংরেজি ও বাংলায় একটি দ্বিভাষিক Next.js সাইট, প্রতিষ্ঠাতার নকশা ও নির্মাণ।",
    },
    href: "/",
  },
];
