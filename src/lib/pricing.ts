import type { Currency } from "@/lib/currency";
import type { Locale } from "@/lib/site";

export type { Currency };

/**
 * Founder-approved prices.
 * USD, GBP and BDT are set prices, not a conversion.
 */


export type PriceUnit = "month" | "project" | "account-month";

/** Null means that currency is not published. Do not invent a figure. */
export type Money = Record<Currency, number | null>;

export type Tier = {
  id: string;
  name: Record<Locale, string>;
  /** Null means the fee is quoted in a proposal. No public amount. */
  price: Money | null;
  /** When true, render a "from" label in front of both currencies. */
  priceFrom?: boolean;
  unit: PriceUnit;
  popular?: boolean;
  bestFor: Record<Locale, string>;
  timeline: Record<Locale, string>;
  includes: Record<Locale, string[]>;
};

export type Extra = {
  id: string;
  name: Record<Locale, string>;
  detail?: Record<Locale, string>;
  price: Money;
  priceFrom?: boolean;
  unit: PriceUnit;
};

export type ServiceCategory = {
  slug: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  model: Record<Locale, string>;
  notes?: Record<Locale, string[]>;
  tiers: [Tier, Tier, Tier];
  extras?: Extra[];
};

const month = "month" as const;
const project = "project" as const;
const accountMonth = "account-month" as const;

const money = (USD: number, GBP: number, BDT: number): Money => ({ USD, GBP, BDT });
const extra = (USD: number, GBP: number): Money => ({ USD, GBP, BDT: null });

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "meta-ads",
    name: { en: "Meta Ads management", bn: "মেটা অ্যাডস ম্যানেজমেন্ট" },
    summary: {
      en: "We plan, launch and improve Facebook and Instagram campaigns. Reports come from Ads Manager. The ad budget is paid by you to Meta, on top of the management fee.",
      bn: "আমরা ফেসবুক ও ইনস্টাগ্রাম ক্যাম্পেইন পরিকল্পনা, চালু ও উন্নত করি। রিপোর্ট অ্যাডস ম্যানেজার থেকে। বিজ্ঞাপন বাজেট আপনি সরাসরি মেটাকে দেন, ম্যানেজমেন্ট ফি আলাদা।",
    },
    model: { en: "Per month", bn: "প্রতি মাস" },
    notes: {
      en: ["The ad budget is paid separately to Meta, from an ad account in your name."],
      bn: ["বিজ্ঞাপন বাজেট আলাদাভাবে মেটাকে দেওয়া হয়, আপনার নামের অ্যাড অ্যাকাউন্ট থেকে।"],
    },
    tiers: [
      {
        id: "starter",
        name: { en: "Starter", bn: "স্টার্টার" },
        price: money(299, 249, 8000),
        unit: month,
        bestFor: {
          en: "One page with one offer",
          bn: "একটি পেজ, একটি অফার",
        },
        timeline: {
          en: "First campaigns in week one, once access and creatives are ready",
          bn: "অ্যাক্সেস ও ক্রিয়েটিভ প্রস্তুত থাকলে প্রথম সপ্তাহে ক্যাম্পেইন",
        },
        includes: {
          en: [
            "1 ad account",
            "Up to 2 active campaigns",
            "1 market",
            "Pixel and events check",
            "Monthly Ads Manager report",
            "WhatsApp on business days",
          ],
          bn: [
            "১টি অ্যাড অ্যাকাউন্ট",
            "সর্বোচ্চ ২টি সক্রিয় ক্যাম্পেইন",
            "১টি বাজার",
            "পিক্সেল ও ইভেন্ট যাচাই",
            "মাসিক অ্যাডস ম্যানেজার রিপোর্ট",
            "কর্মদিবসে হোয়াটসঅ্যাপ",
          ],
        },
      },
      {
        id: "growth",
        name: { en: "Growth", bn: "গ্রোথ" },
        price: money(549, 449, 15000),
        unit: month,
        popular: true,
        bestFor: {
          en: "A page testing more than one offer",
          bn: "একটি পেজ, একাধিক অফার পরীক্ষা",
        },
        timeline: {
          en: "Weekly optimisation after the first week",
          bn: "প্রথম সপ্তাহের পর সাপ্তাহিক অপটিমাইজেশন",
        },
        includes: {
          en: [
            "1 ad account",
            "Up to 5 active campaigns",
            "Weekly optimisation",
            "Up to 4 new ad variations a month, from assets you supply",
            "1 retargeting audience",
            "A report every two weeks",
            "One 30-minute call a month",
          ],
          bn: [
            "১টি অ্যাড অ্যাকাউন্ট",
            "সর্বোচ্চ ৫টি সক্রিয় ক্যাম্পেইন",
            "সাপ্তাহিক অপটিমাইজেশন",
            "মাসে সর্বোচ্চ ৪টি নতুন অ্যাড ভেরিয়েশন, আপনার দেওয়া অ্যাসেট থেকে",
            "১টি রিটার্গেটিং অডিয়েন্স",
            "দুই সপ্তাহে একটি রিপোর্ট",
            "মাসে একটি ৩০ মিনিটের কল",
          ],
        },
      },
      {
        id: "scale",
        name: { en: "Scale", bn: "স্কেল" },
        price: money(899, 749, 25000),
        priceFrom: true,
        unit: month,
        bestFor: {
          en: "Several offers, a catalogue, or a second ad account",
          bn: "একাধিক অফার, ক্যাটালগ, বা দ্বিতীয় অ্যাড অ্যাকাউন্ট",
        },
        timeline: {
          en: "Weekly call once the account is live",
          bn: "অ্যাকাউন্ট চালু হলে সাপ্তাহিক কল",
        },
        includes: {
          en: [
            "Up to 2 ad accounts",
            "Campaign structure for several offers or a catalogue",
            "Weekly optimisation",
            "Weekly written note",
            "Weekly 30-minute call",
            "Notes on the landing page",
            "Reply within one business day",
          ],
          bn: [
            "সর্বোচ্চ ২টি অ্যাড অ্যাকাউন্ট",
            "একাধিক অফার বা ক্যাটালগের ক্যাম্পেইন কাঠামো",
            "সাপ্তাহিক অপটিমাইজেশন",
            "সাপ্তাহিক লিখিত নোট",
            "সাপ্তাহিক ৩০ মিনিটের কল",
            "ল্যান্ডিং পেজ নিয়ে নোট",
            "এক কর্মদিবসের মধ্যে উত্তর",
          ],
        },
      },
    ],
    extras: [
      {
        id: "meta-setup",
        name: { en: "One-time setup", bn: "এককালীন সেটআপ" },
        detail: {
          en: "Waived when you start on a 3-month retainer.",
          bn: "৩ মাসের রিটেইনারে শুরু করলে সেটআপ ফি মওকুফ।",
        },
        price: extra(149, 119),
        unit: project,
      },
      {
        id: "white-label",
        name: {
          en: "White-label for agencies",
          bn: "এজেন্সির জন্য হোয়াইট-লেবেল",
        },
        detail: {
          en: "Per ad account, per month. Reporting can go out under your agency name.",
          bn: "প্রতি অ্যাড অ্যাকাউন্ট, প্রতি মাস। রিপোর্ট আপনার এজেন্সির নামে যেতে পারে।",
        },
        price: extra(249, 199),
        priceFrom: true,
        unit: accountMonth,
      },
    ],
  },
  {
    slug: "social-media",
    name: { en: "Social media management", bn: "সোশ্যাল মিডিয়া ম্যানেজমেন্ট" },
    summary: {
      en: "A posting calendar and community replies for Facebook and Instagram. We do not invent engagement figures.",
      bn: "ফেসবুক ও ইনস্টাগ্রামের পোস্টিং ক্যালেন্ডার ও কমিউনিটি উত্তর। আমরা এনগেজমেন্টের সংখ্যা বানিয়ে বলি না।",
    },
    model: { en: "Per month", bn: "প্রতি মাস" },
    tiers: [
      {
        id: "starter",
        name: { en: "Starter", bn: "স্টার্টার" },
        price: money(249, 199, 7000),
        unit: month,
        bestFor: {
          en: "A page that needs a steady calendar",
          bn: "একটি পেজ, যেখানে নিয়মিত ক্যালেন্ডার দরকার",
        },
        timeline: { en: "Calendar starts in the first week", bn: "প্রথম সপ্তাহে ক্যালেন্ডার শুরু" },
        includes: {
          en: [
            "Facebook and Instagram",
            "8 posts a month",
            "Captions and scheduling",
            "1 revision round on the monthly calendar",
            "A one-page monthly note",
          ],
          bn: [
            "ফেসবুক ও ইনস্টাগ্রাম",
            "মাসে ৮টি পোস্ট",
            "ক্যাপশন ও শিডিউলিং",
            "মাসিক ক্যালেন্ডারে ১ রাউন্ড সংশোধন",
            "এক পাতার মাসিক নোট",
          ],
        },
      },
      {
        id: "growth",
        name: { en: "Growth", bn: "গ্রোথ" },
        price: money(449, 369, 12000),
        unit: month,
        popular: true,
        bestFor: {
          en: "A brand that wants posts and replies together",
          bn: "একটি ব্র্যান্ড, যেখানে পোস্ট ও উত্তর একসাথে দরকার",
        },
        timeline: { en: "Ongoing, with a monthly review", bn: "চলমান, মাসিক একটি রিভিউ" },
        includes: {
          en: [
            "Facebook and Instagram",
            "12 posts a month",
            "Up to 4 short videos a month, cut from footage you supply",
            "Community replies on business days, 10:00–19:00 Bangladesh time",
            "Monthly report",
            "One content call a month",
          ],
          bn: [
            "ফেসবুক ও ইনস্টাগ্রাম",
            "মাসে ১২টি পোস্ট",
            "মাসে সর্বোচ্চ ৪টি শর্ট ভিডিও, আপনার দেওয়া ফুটেজ থেকে",
            "কর্মদিবসে কমিউনিটি উত্তর, বাংলাদেশ সময় সকাল ১০টা–সন্ধ্যা ৭টা",
            "মাসিক রিপোর্ট",
            "মাসে একটি কনটেন্ট কল",
          ],
        },
      },
      {
        id: "scale",
        name: { en: "Scale", bn: "স্কেল" },
        price: money(749, 599, 20000),
        unit: month,
        bestFor: {
          en: "A busier page, with a third profile where it helps",
          bn: "আরও ব্যস্ত পেজ, প্রয়োজনে তৃতীয় একটি প্রোফাইল",
        },
        timeline: { en: "Ongoing, with a monthly review", bn: "চলমান, মাসিক একটি রিভিউ" },
        includes: {
          en: [
            "Up to 3 platforms",
            "20 posts a month",
            "Community replies on business days",
            "2 revision rounds on the monthly calendar",
            "Monthly plan and report",
            "Priority WhatsApp on business days",
          ],
          bn: [
            "সর্বোচ্চ ৩টি প্ল্যাটফর্ম",
            "মাসে ২০টি পোস্ট",
            "কর্মদিবসে কমিউনিটি উত্তর",
            "মাসিক ক্যালেন্ডারে ২ রাউন্ড সংশোধন",
            "মাসিক পরিকল্পনা ও রিপোর্ট",
            "কর্মদিবসে অগ্রাধিকার হোয়াটসঅ্যাপ",
          ],
        },
      },
    ],
    extras: [
      {
        id: "social-setup",
        name: { en: "One-time setup", bn: "এককালীন সেটআপ" },
        detail: {
          en: "Profile check, highlights and the first calendar.",
          bn: "প্রোফাইল যাচাই, হাইলাইট ও প্রথম ক্যালেন্ডার।",
        },
        price: extra(99, 79),
        unit: project,
      },
    ],
  },
  {
    slug: "web-development",
    name: { en: "Website design and development", bn: "ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট" },
    summary: {
      en: "Marketing sites in Next.js. Fast on a phone, with a contact path and the basics of on-page SEO. You receive the repository.",
      bn: "Next.js-এ মার্কেটিং সাইট। ফোনে দ্রুত, যোগাযোগের পথ এবং অন-পেজ এসইওর ভিত্তিসহ। রিপোজিটরি আপনি পান।",
    },
    model: { en: "Fixed project", bn: "নির্দিষ্ট প্রজেক্ট" },
    tiers: [
      {
        id: "starter",
        name: { en: "Starter", bn: "স্টার্টার" },
        price: money(690, 549, 18000),
        unit: project,
        bestFor: {
          en: "A small business that needs a clear site",
          bn: "একটি ছোট ব্যবসা, যাদের একটি পরিষ্কার সাইট দরকার",
        },
        timeline: { en: "About 2–3 weeks", bn: "প্রায় ২–৩ সপ্তাহ" },
        includes: {
          en: [
            "Up to 5 pages",
            "Mobile layout",
            "Contact form",
            "Basic on-page SEO: titles, descriptions and headings",
            "2 rounds of revisions",
            "Handover of the repository",
          ],
          bn: [
            "সর্বোচ্চ ৫টি পাতা",
            "মোবাইল লেআউট",
            "যোগাযোগ ফর্ম",
            "বেসিক অন-পেজ এসইও: শিরোনাম, বিবরণ ও হেডিং",
            "২ রাউন্ড সংশোধন",
            "রিপোজিটরির হ্যান্ডওভার",
          ],
        },
      },
      {
        id: "business",
        name: { en: "Business", bn: "বিজনেস" },
        price: money(1490, 1190, 40000),
        unit: project,
        popular: true,
        bestFor: {
          en: "A company that needs more pages and a clearer path to enquire",
          bn: "একটি প্রতিষ্ঠান, যাদের আরও পাতা ও জিজ্ঞাসার পরিষ্কার পথ দরকার",
        },
        timeline: { en: "About 3–5 weeks", bn: "প্রায় ৩–৫ সপ্তাহ" },
        includes: {
          en: [
            "Up to 10 pages",
            "Layout in your brand colours",
            "Contact form and one enquiry path",
            "GA4 snippet if you provide the measurement ID",
            "Basic on-page SEO",
            "2 rounds of revisions",
            "A speed pass before launch",
            "Handover of the repository",
          ],
          bn: [
            "সর্বোচ্চ ১০টি পাতা",
            "আপনার ব্র্যান্ডের রঙে লেআউট",
            "যোগাযোগ ফর্ম ও একটি জিজ্ঞাসার পথ",
            "আপনি মেজারমেন্ট আইডি দিলে GA4 স্নিপেট",
            "বেসিক অন-পেজ এসইও",
            "২ রাউন্ড সংশোধন",
            "লঞ্চের আগে স্পিড পাস",
            "রিপোজিটরির হ্যান্ডওভার",
          ],
        },
      },
      {
        id: "ecommerce",
        name: { en: "E-commerce / Custom", bn: "ই-কমার্স / কাস্টম" },
        price: money(2900, 2290, 80000),
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "A catalogue, payments, or a scope that needs a written brief",
          bn: "ক্যাটালগ, পেমেন্ট, বা লিখিত ব্রিফ দরকার এমন কাজ",
        },
        timeline: { en: "Scoped in the proposal", bn: "প্রস্তাবে সময়সীমা ঠিক হয়" },
        includes: {
          en: [
            "Catalogue size, payments and languages named in the proposal",
            "Product or service templates, as agreed",
            "Checkout or an enquiry flow",
            "2 revision rounds on the agreed screens",
            "Handover of the code and design files",
          ],
          bn: [
            "ক্যাটালগের আকার, পেমেন্ট ও ভাষা প্রস্তাবে লেখা থাকে",
            "যেভাবে ঠিক হয়, পণ্য বা সেবার টেমপ্লেট",
            "চেকআউট বা জিজ্ঞাসার ফ্লো",
            "ঠিক করা স্ক্রিনে ২ রাউন্ড সংশোধন",
            "কোড ও ডিজাইন ফাইলের হ্যান্ডওভার",
          ],
        },
      },
    ],
    extras: [
      {
        id: "care",
        name: { en: "Care plan", bn: "কেয়ার প্ল্যান" },
        detail: {
          en: "Hosting check, dependency updates and up to 1 hour of small edits a month.",
          bn: "হোস্টিং যাচাই, ডিপেন্ডেন্সি আপডেট এবং মাসে সর্বোচ্চ ১ ঘণ্টা ছোট সম্পাদনা।",
        },
        price: extra(49, 39),
        unit: month,
      },
      {
        id: "care-plus",
        name: { en: "Care plan plus", bn: "কেয়ার প্ল্যান প্লাস" },
        detail: {
          en: "The care plan, plus up to 3 hours of small edits and a monthly backup check.",
          bn: "কেয়ার প্ল্যান, সাথে মাসে সর্বোচ্চ ৩ ঘণ্টা ছোট সম্পাদনা ও একটি ব্যাকআপ যাচাই।",
        },
        price: extra(99, 79),
        unit: month,
      },
    ],
  },
  {
    slug: "ai-web-apps",
    name: { en: "AI web apps", bn: "এআই ওয়েব অ্যাপ" },
    summary: {
      en: "A focused AI workflow in a web app: a chat, a document assistant, or a similar tool. AI Academic Advisor is an example of this kind of build.",
      bn: "একটি ওয়েব অ্যাপের ভেতরে একটি নির্দিষ্ট এআই কাজ: চ্যাট, ডকুমেন্ট সহকারী, বা একই ধরনের টুল। এআই অ্যাকাডেমিক অ্যাডভাইজার এই ধরনের একটি কাজ।",
    },
    model: { en: "Project", bn: "প্রজেক্ট" },
    notes: {
      en: ["AI model usage is billed at cost to the client’s own account. It is not included in the build fee."],
      bn: ["এআই মডেলের ব্যবহার খরচ অনুযায়ী ক্লায়েন্টের নিজের অ্যাকাউন্টে বিল হয়। এটি বিল্ড ফির মধ্যে নয়।"],
    },
    tiers: [
      {
        id: "assistant",
        name: { en: "AI Assistant", bn: "এআই অ্যাসিস্ট্যান্ট" },
        price: money(1490, 1190, 35000),
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "One workflow, shown as a hosted demo",
          bn: "একটি ওয়ার্কফ্লো, হোস্টেড ডেমো হিসেবে",
        },
        timeline: { en: "About 2–3 weeks", bn: "প্রায় ২–৩ সপ্তাহ" },
        includes: {
          en: [
            "One workflow, such as a chat or a document helper",
            "Hosted demo",
            "No custom sign-in",
            "A short handover note",
            "Model usage on your own account",
          ],
          bn: [
            "একটি ওয়ার্কফ্লো, যেমন চ্যাট বা ডকুমেন্ট সহকারী",
            "হোস্টেড ডেমো",
            "আলাদা সাইন-ইন নেই",
            "সংক্ষিপ্ত হ্যান্ডওভার নোট",
            "মডেলের ব্যবহার আপনার নিজের অ্যাকাউন্টে",
          ],
        },
      },
      {
        id: "mvp",
        name: { en: "MVP", bn: "এমভিপি" },
        price: money(3900, 3100, 80000),
        priceFrom: true,
        unit: project,
        popular: true,
        bestFor: {
          en: "A product people can sign in to",
          bn: "একটি পণ্য, যেখানে মানুষ সাইন ইন করতে পারে",
        },
        timeline: { en: "About 6–8 weeks", bn: "প্রায় ৬–৮ সপ্তাহ" },
        includes: {
          en: [
            "Sign-in",
            "One core workflow",
            "Database",
            "A simple admin view",
            "Usage limits",
            "Handover of the repository",
          ],
          bn: [
            "সাইন-ইন",
            "একটি মূল ওয়ার্কফ্লো",
            "ডেটাবেস",
            "একটি সহজ অ্যাডমিন ভিউ",
            "ব্যবহারের সীমা",
            "রিপোজিটরির হ্যান্ডওভার",
          ],
        },
      },
      {
        id: "product",
        name: { en: "Full product", bn: "ফুল প্রোডাক্ট" },
        price: money(8500, 6790, 180000),
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "More than one workflow, with roles",
          bn: "একাধিক ওয়ার্কফ্লো, ভূমিকাসহ",
        },
        timeline: { en: "Milestones in the proposal", bn: "প্রস্তাবে মাইলস্টোন" },
        includes: {
          en: [
            "Screens and roles named in the proposal",
            "More than one workflow",
            "Admin",
            "Milestone billing",
            "Handover of the repository",
          ],
          bn: [
            "স্ক্রিন ও ভূমিকা প্রস্তাবে লেখা থাকে",
            "একাধিক ওয়ার্কফ্লো",
            "অ্যাডমিন",
            "মাইলস্টোন বিলিং",
            "রিপোজিটরির হ্যান্ডওভার",
          ],
        },
      },
    ],
  },
  {
    slug: "custom-software",
    name: { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
    summary: {
      en: "Dashboards, portals and internal tools. Marketivity Billing and the Client Portal are examples. Those tools stay private.",
      bn: "ড্যাশবোর্ড, পোর্টাল ও অভ্যন্তরীণ টুল। মার্কেটিভিটি বিলিং ও ক্লায়েন্ট পোর্টাল এই কাজের উদাহরণ। সেই টুলগুলো ব্যক্তিগত থাকে।",
    },
    model: { en: "Project", bn: "প্রজেক্ট" },
    tiers: [
      {
        id: "starter",
        name: { en: "Starter", bn: "স্টার্টার" },
        price: money(3500, 2790, 70000),
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "One internal job for a small team",
          bn: "ছোট দলের একটি অভ্যন্তরীণ কাজ",
        },
        timeline: { en: "Scoped in the proposal", bn: "প্রস্তাবে সময়সীমা ঠিক হয়" },
        includes: {
          en: [
            "One main job, such as a tracker or a simple dashboard",
            "Agreed screens",
            "Sign-in for a small team",
            "Handover of the repository",
          ],
          bn: [
            "একটি মূল কাজ, যেমন ট্র্যাকার বা সহজ ড্যাশবোর্ড",
            "ঠিক করা স্ক্রিন",
            "ছোট দলের জন্য সাইন-ইন",
            "রিপোজিটরির হ্যান্ডওভার",
          ],
        },
      },
      {
        id: "business",
        name: { en: "Business system", bn: "বিজনেস সিস্টেম" },
        price: money(7500, 5990, 180000),
        priceFrom: true,
        unit: project,
        popular: true,
        bestFor: {
          en: "A dashboard, portal or tool with roles",
          bn: "ভূমিকাসহ ড্যাশবোর্ড, পোর্টাল বা টুল",
        },
        timeline: { en: "Milestones in the proposal", bn: "প্রস্তাবে মাইলস্টোন" },
        includes: {
          en: [
            "Agreed screens and roles",
            "Milestone billing",
            "Handover of the repository and the design files",
            "A short handover call",
          ],
          bn: [
            "ঠিক করা স্ক্রিন ও ভূমিকা",
            "মাইলস্টোন বিলিং",
            "রিপোজিটরি ও ডিজাইন ফাইলের হ্যান্ডওভার",
            "একটি সংক্ষিপ্ত হ্যান্ডওভার কল",
          ],
        },
      },
      {
        id: "enterprise",
        name: { en: "SaaS / Enterprise", bn: "সাস / এন্টারপ্রাইজ" },
        price: null,
        unit: project,
        bestFor: {
          en: "A product or an internal system that needs a written scope",
          bn: "একটি পণ্য বা অভ্যন্তরীণ সিস্টেম, যার লিখিত স্কোপ দরকার",
        },
        timeline: { en: "Quoted after discovery", bn: "ডিসকভারির পর কোট" },
        includes: {
          en: [
            "Scope, timeline and fee are written in the proposal",
            "No public fee until that proposal",
          ],
          bn: [
            "স্কোপ, সময় ও ফি প্রস্তাবে লেখা হয়",
            "সেই প্রস্তাবের আগে কোনো প্রকাশিত ফি নেই",
          ],
        },
      },
    ],
    extras: [
      {
        id: "discovery",
        name: { en: "Paid discovery", bn: "পেইড ডিসকভারি" },
        detail: {
          en: "Requirements, outline screens and a written estimate. The fee is credited to the build.",
          bn: "প্রয়োজনীয়তা, স্ক্রিনের রূপরেখা ও একটি লিখিত অনুমান। এই ফি বিল্ডে সমন্বয় হয়।",
        },
        price: extra(490, 390),
        unit: project,
      },
    ],
  },
];

export const priceTrust: { en: string; bn: string }[] = [
  {
    en: "No lock-in contracts. Retainers are monthly after the first 3 months.",
    bn: "লক-ইন চুক্তি নেই। রিটেইনার প্রথম ৩ মাসের পর মাসিক।",
  },
  {
    en: "You own the ad account, the code and the assets.",
    bn: "অ্যাড অ্যাকাউন্ট, কোড ও অ্যাসেট আপনার।",
  },
  {
    en: "Reporting is transparent and comes from the source tool. No guaranteed ROAS.",
    bn: "রিপোর্ট স্বচ্ছ এবং মূল টুল থেকে আসে। ROAS-এর কোনো গ্যারান্টি নেই।",
  },
  {
    en: "Prices exclude VAT/taxes where applicable.",
    bn: "যেখানে প্রযোজ্য, দামে ভ্যাট ও অন্যান্য কর নেই।",
  },
];

export const pricingFaq: { q: Record<Locale, string>; a: Record<Locale, string> }[] = [
  {
    q: {
      en: "Is Meta ad spend included?",
      bn: "মেটা বিজ্ঞাপন খরচ কি ফির মধ্যে?",
    },
    a: {
      en: "No. You pay the ad budget to Meta from an ad account in your name. The prices on this page are management fees.",
      bn: "না। বিজ্ঞাপন বাজেট আপনি আপনার নামের অ্যাড অ্যাকাউন্ট থেকে মেটাকে দেন। এই পাতার দাম ম্যানেজমেন্ট ফি।",
    },
  },
  {
    q: {
      en: "Which currencies are the prices in?",
      bn: "দাম কোন মুদ্রায়?",
    },
    a: {
      en: "US dollars, pounds sterling, or taka. The three are set prices, not a live conversion. They exclude VAT and other taxes. A written proposal confirms the fee before work starts.",
      bn: "মার্কিন ডলার, পাউন্ড স্টার্লিং, বা টাকা। তিনটিই নির্ধারিত দাম, লাইভ কনভার্সন নয়। ভ্যাট ও অন্যান্য কর আলাদা। কাজ শুরুর আগে লিখিত প্রস্তাবে ফি নিশ্চিত হয়।",
    },
  },
  {
    q: {
      en: "Do you guarantee a return?",
      bn: "আপনারা কি রিটার্নের গ্যারান্টি দেন?",
    },
    a: {
      en: "No. We do not guarantee ROAS, revenue or sales. Reports show the Ads Manager result the campaign was built for.",
      bn: "না। আমরা ROAS, রাজস্ব বা বিক্রির গ্যারান্টি দিই না। রিপোর্টে সেই অ্যাডস ম্যানেজার ফল থাকে, যার জন্য ক্যাম্পেইন বানানো হয়েছে।",
    },
  },
  {
    q: {
      en: "How do contracts work?",
      bn: "চুক্তি কীভাবে হয়?",
    },
    a: {
      en: "Retainers start with 3 months, then run month to month. There is no lock-in after that. Project work is billed by the milestones in the written proposal.",
      bn: "রিটেইনার ৩ মাস দিয়ে শুরু, তারপর মাসিক। এরপর লক-ইন নেই। প্রজেক্ট কাজ লিখিত প্রস্তাবের মাইলস্টোন অনুযায়ী বিল হয়।",
    },
  },
  {
    q: {
      en: "What are your working hours for the UK and the US?",
      bn: "যুক্তরাজ্য ও যুক্তরাষ্ট্রের জন্য কাজের সময় কী?",
    },
    a: {
      en: "Saturday to Thursday, 10:00–19:00 Bangladesh time (GMT+6). That covers the UK morning. For US clients we agree a call window in the proposal.",
      bn: "শনিবার থেকে বৃহস্পতিবার, বাংলাদেশ সময় সকাল ১০টা–সন্ধ্যা ৭টা (GMT+6)। এতে যুক্তরাজ্যের সকাল পড়ে। যুক্তরাষ্ট্রের ক্লায়েন্টদের কলের সময় প্রস্তাবে ঠিক করা হয়।",
    },
  },
  {
    q: {
      en: "Who owns the ad account, the site and the code?",
      bn: "অ্যাড অ্যাকাউন্ট, সাইট ও কোড কার?",
    },
    a: {
      en: "You own the ad account, the code and the assets agreed in the contract. Until that contract is signed, this page is only a price guide.",
      bn: "চুক্তিতে ঠিক করা অ্যাড অ্যাকাউন্ট, কোড ও অ্যাসেট আপনার। চুক্তি সই হওয়ার আগে এই পাতা শুধু একটি দামের নির্দেশিকা।",
    },
  },
  {
    q: {
      en: "How do we pay?",
      bn: "পেমেন্ট কীভাবে?",
    },
    a: {
      en: "By the method on the invoice, in USD, GBP, or BDT. We confirm it in the proposal. We do not take ad spend through this website.",
      bn: "ইনভয়েসের পদ্ধতিতে, ডলার, পাউন্ড, বা টাকায়। প্রস্তাবে এটি নিশ্চিত করা হয়। এই ওয়েবসাইটের মাধ্যমে বিজ্ঞাপন খরচ নেওয়া হয় না।",
    },
  },
];

export function getCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function serviceSlugs(): string[] {
  return serviceCategories.map((category) => category.slug);
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency === "GBP") {
    return `£${amount.toLocaleString("en-GB")}`;
  }
  if (currency === "BDT") {
    return `৳${amount.toLocaleString("en-US")}`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}

function unitSuffix(unit: PriceUnit, locale: Locale): string {
  if (unit === "month") return locale === "bn" ? "/মাস" : "/month";
  if (unit === "account-month") {
    return locale === "bn" ? "/অ্যাকাউন্ট/মাস" : "/account/month";
  }
  return "";
}

export function formatTierPrice(tier: Tier, locale: Locale, currency: Currency): string {
  if (tier.price == null) {
    return locale === "bn" ? "কাস্টম কোট" : "Custom quote";
  }
  const value = tier.price[currency];
  if (value == null) return "Ask on WhatsApp";
  const amount = `${formatMoney(value, currency)}${unitSuffix(tier.unit, locale)}`;
  if (!tier.priceFrom) return amount;
  return locale === "bn" ? `থেকে ${amount}` : `from ${amount}`;
}

export function formatExtraPrice(item: Extra, locale: Locale, currency: Currency): string {
  const value = item.price[currency];
  if (value == null) return "Ask on WhatsApp";
  const amount = `${formatMoney(value, currency)}${unitSuffix(item.unit, locale)}`;
  if (!item.priceFrom) return amount;
  return locale === "bn" ? `থেকে ${amount}` : `from ${amount}`;
}

/** Lowest published price for cards and the service index. */
export function startingPriceLabel(
  category: ServiceCategory,
  locale: Locale,
  currency: Currency,
): string {
  const priced = category.tiers.find((tier) => tier.price != null);
  if (!priced) return locale === "bn" ? "কাস্টম কোট" : "Custom quote";
  return formatTierPrice(priced, locale, currency);
}
