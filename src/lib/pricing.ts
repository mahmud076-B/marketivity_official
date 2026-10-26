import type { Locale } from "@/lib/site";

/**
 * SINGLE SOURCE OF PRICES. Do not put fees in translation files.
 *
 * Meta Ads Starter ($250/month) and Growth ($350/month) are the founder's figures.
 * The Scale tier is custom, with no public dollar amount.
 * Every other amount is a proposed starter estimate for the founder to confirm.
 */

export type PriceUnit = "month" | "project";

export type Tier = {
  id: string;
  name: Record<Locale, string>;
  /** Null means the fee is quoted per brief. */
  price: number | null;
  /** When true, the amount is a starting estimate ("From $900"). */
  priceFrom?: boolean;
  unit: PriceUnit;
  popular?: boolean;
  bestFor: Record<Locale, string>;
  timeline: Record<Locale, string>;
  includes: Record<Locale, string[]>;
};

export type ServiceCategory = {
  slug: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  model: Record<Locale, string>;
  tiers: [Tier, Tier, Tier];
};

export type Addon = {
  id: string;
  name: Record<Locale, string>;
  price: number;
  priceFrom?: boolean;
  unit: PriceUnit;
};

const month = "month" as const;
const project = "project" as const;

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "meta-ads",
    name: { en: "Meta Ads management", bn: "মেটা অ্যাডস ম্যানেজমেন্ট" },
    summary: {
      en: "We plan, launch and improve Facebook and Instagram campaigns. Reports use Ads Manager: conversations, follows or visits. You pay ad spend to Meta, on top of the management fee.",
      bn: "আমরা ফেসবুক ও ইনস্টাগ্রাম ক্যাম্পেইন পরিকল্পনা, চালু ও উন্নত করি। রিপোর্ট অ্যাডস ম্যানেজার থেকে: কথোপকথন, ফলো বা ভিজিট। বিজ্ঞাপন খরচ আপনি সরাসরি মেটাকে দেন, ম্যানেজমেন্ট ফি আলাদা।",
    },
    model: { en: "Monthly management", bn: "মাসিক ম্যানেজমেন্ট" },
    tiers: [
      {
        id: "starter",
        name: { en: "Starter", bn: "স্টার্টার" },
        price: 250,
        unit: month,
        bestFor: {
          en: "One shop or page that needs a steady campaign",
          bn: "একটি দোকান বা পেজ, যেখানে একটি স্থির ক্যাম্পেইন দরকার",
        },
        timeline: {
          en: "First campaigns in week one, once access and creatives are ready",
          bn: "অ্যাক্সেস ও ক্রিয়েটিভ প্রস্তুত থাকলে প্রথম সপ্তাহে ক্যাম্পেইন",
        },
        includes: {
          en: [
            "1 ad account",
            "Up to 2 campaigns",
            "Pixel and events check",
            "Monthly Ads Manager report",
            "WhatsApp support",
          ],
          bn: [
            "১টি অ্যাড অ্যাকাউন্ট",
            "সর্বোচ্চ ২টি ক্যাম্পেইন",
            "পিক্সেল ও ইভেন্ট যাচাই",
            "মাসিক অ্যাডস ম্যানেজার রিপোর্ট",
            "হোয়াটসঅ্যাপ সাপোর্ট",
          ],
        },
      },
      {
        id: "growth",
        name: { en: "Growth", bn: "গ্রোথ" },
        price: 350,
        unit: month,
        popular: true,
        bestFor: {
          en: "A page ready to test more than one offer",
          bn: "একটি পেজ, যেখানে একাধিক অফার পরীক্ষা করা যাবে",
        },
        timeline: {
          en: "Weekly optimisation after the first week",
          bn: "প্রথম সপ্তাহের পর সাপ্তাহিক অপটিমাইজেশন",
        },
        includes: {
          en: [
            "Up to 4 campaigns",
            "Weekly optimisation",
            "Creative testing",
            "One retargeting audience",
            "Report every two weeks",
          ],
          bn: [
            "সর্বোচ্চ ৪টি ক্যাম্পেইন",
            "সাপ্তাহিক অপটিমাইজেশন",
            "ক্রিয়েটিভ টেস্ট",
            "একটি রিটার্গেটিং অডিয়েন্স",
            "দুই সপ্তাহে একটি রিপোর্ট",
          ],
        },
      },
      {
        id: "scale",
        name: { en: "Scale", bn: "স্কেল" },
        price: null,
        unit: month,
        bestFor: {
          en: "Several offers, a catalogue, or more than one market",
          bn: "একাধিক অফার, ক্যাটালগ, বা একাধিক বাজার",
        },
        timeline: {
          en: "Agreed in the written proposal",
          bn: "লিখিত প্রস্তাবে ঠিক করা হয়",
        },
        includes: {
          en: [
            "Structure agreed per brief",
            "Catalogue or lead ads when the account is ready",
            "Notes on the landing page",
            "A weekly call",
          ],
          bn: [
            "ব্রিফ অনুযায়ী কাঠামো",
            "অ্যাকাউন্ট প্রস্তুত থাকলে ক্যাটালগ বা লিড অ্যাড",
            "ল্যান্ডিং পেজ নিয়ে নোট",
            "সাপ্তাহিক একটি কল",
          ],
        },
      },
    ],
  },
  {
    slug: "social-media",
    name: {
      en: "Social media and page management",
      bn: "সোশ্যাল মিডিয়া ও পেজ ম্যানেজমেন্ট",
    },
    summary: {
      en: "A posting and community plan for Facebook, Instagram and, where it helps, a third profile. We do not invent engagement figures.",
      bn: "ফেসবুক, ইনস্টাগ্রাম এবং প্রয়োজনে তৃতীয় একটি প্রোফাইলের পোস্টিং ও কমিউনিটি পরিকল্পনা। আমরা এনগেজমেন্টের সংখ্যা বানিয়ে বলি না।",
    },
    model: { en: "Monthly retainer", bn: "মাসিক রিটেইনার" },
    tiers: [
      {
        id: "essentials",
        name: { en: "Essentials", bn: "এসেনশিয়ালস" },
        price: 250,
        unit: month,
        bestFor: {
          en: "A page that needs a consistent calendar",
          bn: "একটি পেজ, যেখানে নিয়মিত ক্যালেন্ডার দরকার",
        },
        timeline: {
          en: "Calendar starts in the first week",
          bn: "প্রথম সপ্তাহে ক্যালেন্ডার শুরু",
        },
        includes: {
          en: [
            "2 platforms",
            "12 posts a month",
            "Captions and scheduling",
            "A short monthly note",
          ],
          bn: [
            "২টি প্ল্যাটফর্ম",
            "মাসে ১২টি পোস্ট",
            "ক্যাপশন ও শিডিউলিং",
            "সংক্ষিপ্ত মাসিক নোট",
          ],
        },
      },
      {
        id: "growth",
        name: { en: "Growth", bn: "গ্রোথ" },
        price: 400,
        unit: month,
        popular: true,
        bestFor: {
          en: "A brand that wants posts and replies in one place",
          bn: "একটি ব্র্যান্ড, যেখানে পোস্ট ও উত্তর একসাথে দরকার",
        },
        timeline: {
          en: "Ongoing, with a monthly review",
          bn: "চলমান, মাসিক একটি রিভিউ",
        },
        includes: {
          en: [
            "3 platforms",
            "20 posts a month, including short video",
            "Community replies on business days",
            "Monthly report",
          ],
          bn: [
            "৩টি প্ল্যাটফর্ম",
            "মাসে ২০টি পোস্ট, শর্ট ভিডিওসহ",
            "কর্মদিবসে কমিউনিটি উত্তর",
            "মাসিক রিপোর্ট",
          ],
        },
      },
      {
        id: "signature",
        name: { en: "Signature", bn: "সিগনেচার" },
        price: null,
        unit: month,
        bestFor: {
          en: "A page that needs a fuller content and community plan",
          bn: "একটি পেজ, যেখানে আরও পূর্ণ কনটেন্ট ও কমিউনিটি পরিকল্পনা দরকার",
        },
        timeline: {
          en: "Agreed in the written proposal",
          bn: "লিখিত প্রস্তাবে ঠিক করা হয়",
        },
        includes: {
          en: [
            "Content plan for the month",
            "A daily community window",
            "A short list of collaboration ideas",
            "Priority WhatsApp",
          ],
          bn: [
            "মাসিক কনটেন্ট পরিকল্পনা",
            "দৈনিক কমিউনিটি উইন্ডো",
            "সহযোগিতার একটি ছোট তালিকা",
            "অগ্রাধিকার হোয়াটসঅ্যাপ",
          ],
        },
      },
    ],
  },
  {
    slug: "web-development",
    name: { en: "Web development", bn: "ওয়েব ডেভেলপমেন্ট" },
    summary: {
      en: "Marketing sites and landing pages in Next.js. Fast on a phone, with a contact path and the basics of on-page SEO.",
      bn: "Next.js-এ মার্কেটিং সাইট ও ল্যান্ডিং পেজ। ফোনে দ্রুত, যোগাযোগের পথ এবং অন-পেজ এসইওর ভিত্তিসহ।",
    },
    model: { en: "Fixed project", bn: "নির্দিষ্ট প্রজেক্ট" },
    tiers: [
      {
        id: "launch",
        name: { en: "Launch site", bn: "লঞ্চ সাইট" },
        price: 900,
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "A small business that needs a clear site",
          bn: "একটি ছোট ব্যবসা, যাদের একটি পরিষ্কার সাইট দরকার",
        },
        timeline: { en: "About 2–3 weeks", bn: "প্রায় ২–৩ সপ্তাহ" },
        includes: {
          en: [
            "Up to 5 pages",
            "Next.js, mobile layout",
            "Basic on-page SEO",
            "Contact form",
          ],
          bn: [
            "সর্বোচ্চ ৫টি পাতা",
            "Next.js, মোবাইল লেআউট",
            "বেসিক অন-পেজ এসইও",
            "যোগাযোগ ফর্ম",
          ],
        },
      },
      {
        id: "business",
        name: { en: "Business site", bn: "বিজনেস সাইট" },
        price: 1800,
        priceFrom: true,
        unit: project,
        popular: true,
        bestFor: {
          en: "A company that needs more pages and room to edit",
          bn: "একটি প্রতিষ্ঠান, যাদের আরও পাতা ও সম্পাদনার জায়গা দরকার",
        },
        timeline: { en: "About 3–5 weeks", bn: "প্রায় ৩–৫ সপ্তাহ" },
        includes: {
          en: [
            "Up to 10 pages",
            "Content editing where agreed",
            "Analytics-ready setup",
            "A speed pass before launch",
          ],
          bn: [
            "সর্বোচ্চ ১০টি পাতা",
            "যেখানে ঠিক হয়, কনটেন্ট এডিটিং",
            "অ্যানালিটিক্সের জন্য প্রস্তুত সেটআপ",
            "লঞ্চের আগে স্পিড পাস",
          ],
        },
      },
      {
        id: "signature",
        name: { en: "Signature", bn: "সিগনেচার" },
        price: 3500,
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "A brand site with a design system and two languages",
          bn: "ডিজাইন সিস্টেম ও দুই ভাষার একটি ব্র্যান্ড সাইট",
        },
        timeline: {
          en: "Scoped in the proposal",
          bn: "প্রস্তাবে সময়সীমা ঠিক হয়",
        },
        includes: {
          en: [
            "Custom design system",
            "Motion where it helps",
            "English and Bangla",
            "Integrations named in the brief",
          ],
          bn: [
            "কাস্টম ডিজাইন সিস্টেম",
            "যেখানে কাজে লাগে, মোশন",
            "ইংরেজি ও বাংলা",
            "ব্রিফে উল্লেখিত ইন্টিগ্রেশন",
          ],
        },
      },
    ],
  },
  {
    slug: "ai-web-apps",
    name: { en: "AI web apps", bn: "এআই ওয়েব অ্যাপ" },
    summary: {
      en: "A focused AI workflow inside a web app: a chat, a document assistant, or a similar tool. AI Academic Advisor is an example of this kind of build.",
      bn: "একটি ওয়েব অ্যাপের ভেতরে একটি নির্দিষ্ট এআই কাজ: চ্যাট, ডকুমেন্ট সহকারী, বা একই ধরনের টুল। এআই অ্যাকাডেমিক অ্যাডভাইজার এই ধরনের একটি কাজ।",
    },
    model: { en: "Project, then care if you want it", bn: "প্রজেক্ট, চাইলে পরে কেয়ার" },
    tiers: [
      {
        id: "prototype",
        name: { en: "Prototype", bn: "প্রোটোটাইপ" },
        price: 2500,
        priceFrom: true,
        unit: project,
        bestFor: {
          en: "Testing one AI workflow with a hosted demo",
          bn: "একটি এআই ওয়ার্কফ্লো হোস্টেড ডেমো দিয়ে পরীক্ষা",
        },
        timeline: { en: "About 2–3 weeks", bn: "প্রায় ২–৩ সপ্তাহ" },
        includes: {
          en: [
            "One workflow",
            "Hosted demo",
            "A short handover note",
          ],
          bn: [
            "একটি ওয়ার্কফ্লো",
            "হোস্টেড ডেমো",
            "সংক্ষিপ্ত হ্যান্ডওভার নোট",
          ],
        },
      },
      {
        id: "product",
        name: { en: "AI web app", bn: "এআই ওয়েব অ্যাপ" },
        price: 6000,
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
            "Database",
            "An admin view",
            "Usage limits",
          ],
          bn: [
            "সাইন-ইন",
            "ডেটাবেস",
            "অ্যাডমিন ভিউ",
            "ব্যবহারের সীমা",
          ],
        },
      },
      {
        id: "care",
        name: { en: "Care plan", bn: "কেয়ার প্ল্যান" },
        price: 300,
        priceFrom: true,
        unit: month,
        bestFor: {
          en: "Keeping a shipped AI app updated",
          bn: "শিপ করা এআই অ্যাপ হালনাগাদ রাখা",
        },
        timeline: {
          en: "Monthly, after launch",
          bn: "লঞ্চের পর মাসিক",
        },
        includes: {
          en: [
            "Hosting checks",
            "Small changes",
            "Dependency updates",
          ],
          bn: [
            "হোস্টিং যাচাই",
            "ছোট পরিবর্তন",
            "ডিপেন্ডেন্সি আপডেট",
          ],
        },
      },
    ],
  },
  {
    slug: "custom-software",
    name: { en: "Custom software", bn: "কাস্টম সফটওয়্যার" },
    summary: {
      en: "Dashboards, portals and internal tools. Marketivity Billing and the Client Portal are examples of this work. Those tools stay private.",
      bn: "ড্যাশবোর্ড, পোর্টাল ও অভ্যন্তরীণ টুল। মার্কেটিভিটি বিলিং ও ক্লায়েন্ট পোর্টাল এই কাজের উদাহরণ। সেই টুলগুলো ব্যক্তিগত থাকে।",
    },
    model: { en: "Discovery, then a build quote", bn: "ডিসকভারি, তারপর বিল্ড কোট" },
    tiers: [
      {
        id: "discovery",
        name: { en: "Discovery", bn: "ডিসকভারি" },
        price: 750,
        unit: project,
        bestFor: {
          en: "A brief that is not ready to estimate yet",
          bn: "একটি ব্রিফ, যা এখনো অনুমানের জন্য প্রস্তুত নয়",
        },
        timeline: { en: "About 1 week", bn: "প্রায় ১ সপ্তাহ" },
        includes: {
          en: [
            "Requirements",
            "Outline screens",
            "A written estimate and sequence",
          ],
          bn: [
            "প্রয়োজনীয়তা",
            "স্ক্রিনের রূপরেখা",
            "লিখিত অনুমান ও ক্রম",
          ],
        },
      },
      {
        id: "build",
        name: { en: "Build", bn: "বিল্ড" },
        price: 8000,
        priceFrom: true,
        unit: project,
        popular: true,
        bestFor: {
          en: "A dashboard, portal or internal tool",
          bn: "একটি ড্যাশবোর্ড, পোর্টাল বা অভ্যন্তরীণ টুল",
        },
        timeline: {
          en: "Milestones in the proposal",
          bn: "প্রস্তাবে মাইলস্টোন",
        },
        includes: {
          en: [
            "Agreed screens and roles",
            "Milestone billing",
            "Handover of the agreed repository",
          ],
          bn: [
            "ঠিক করা স্ক্রিন ও ভূমিকা",
            "মাইলস্টোন বিলিং",
            "ঠিক করা রিপোজিটরির হ্যান্ডওভার",
          ],
        },
      },
      {
        id: "support",
        name: { en: "Support", bn: "সাপোর্ট" },
        price: 400,
        priceFrom: true,
        unit: month,
        bestFor: {
          en: "A tool that is already in use",
          bn: "একটি টুল, যা ইতিমধ্যে ব্যবহৃত হচ্ছে",
        },
        timeline: {
          en: "Monthly, after launch",
          bn: "লঞ্চের পর মাসিক",
        },
        includes: {
          en: [
            "Bug fixes",
            "Small features",
            "Uptime checks",
          ],
          bn: [
            "বাগ ফিক্স",
            "ছোট ফিচার",
            "আপটাইম যাচাই",
          ],
        },
      },
    ],
  },
];

export const addons: Addon[] = [
  {
    id: "extra-account",
    name: { en: "Extra ad account", bn: "অতিরিক্ত অ্যাড অ্যাকাউন্ট" },
    price: 100,
    unit: month,
  },
  {
    id: "landing",
    name: { en: "Landing page", bn: "ল্যান্ডিং পেজ" },
    price: 450,
    unit: project,
  },
  {
    id: "creatives",
    name: { en: "Static creative pack (8 ads)", bn: "স্ট্যাটিক ক্রিয়েটিভ প্যাক (৮টি বিজ্ঞাপন)" },
    price: 200,
    unit: project,
  },
  {
    id: "tracking",
    name: { en: "GA4 and Meta pixel setup", bn: "GA4 ও মেটা পিক্সেল সেটআপ" },
    price: 150,
    unit: project,
  },
  {
    id: "extra-page",
    name: { en: "Extra website page", bn: "অতিরিক্ত ওয়েবসাইট পাতা" },
    price: 120,
    unit: project,
  },
  {
    id: "care",
    name: { en: "Website care", bn: "ওয়েবসাইট কেয়ার" },
    price: 100,
    priceFrom: true,
    unit: month,
  },
];

export const pricingFaq: { q: Record<Locale, string>; a: Record<Locale, string> }[] = [
  {
    q: {
      en: "Is Meta ad spend included?",
      bn: "মেটা বিজ্ঞাপন খরচ কি ফির মধ্যে?",
    },
    a: {
      en: "No. Management fees are separate. You pay ad spend to Meta on an ad account in your name.",
      bn: "না। ম্যানেজমেন্ট ফি আলাদা। বিজ্ঞাপন খরচ আপনি আপনার নামের অ্যাড অ্যাকাউন্ট থেকে মেটাকে দেন।",
    },
  },
  {
    q: {
      en: "Which currency are the prices in?",
      bn: "দাম কোন মুদ্রায়?",
    },
    a: {
      en: "US dollars. They exclude any tax that applies in your country. A written proposal confirms the fee before work starts.",
      bn: "মার্কিন ডলার। আপনার দেশে প্রযোজ্য কর আলাদা। কাজ শুরুর আগে লিখিত প্রস্তাবে ফি নিশ্চিত করা হয়।",
    },
  },
  {
    q: {
      en: "Do you guarantee a financial return?",
      bn: "আপনারা কি আর্থিক রিটার্নের গ্যারান্টি দেন?",
    },
    a: {
      en: "No. We report conversations, follows, visits, reach and spend from Ads Manager. We do not promise revenue or a return multiple.",
      bn: "না। আমরা অ্যাডস ম্যানেজার থেকে কথোপকথন, ফলো, ভিজিট, রিচ ও খরচ জানাই। রাজস্ব বা রিটার্ন মাল্টিপলের প্রতিশ্রুতি দিই না।",
    },
  },
  {
    q: {
      en: "How do contracts work?",
      bn: "চুক্তি কীভাবে হয়?",
    },
    a: {
      en: "You receive a short written proposal. Monthly work is described there, including how either side can end it. Project work is billed by the milestones in that proposal.",
      bn: "আপনি একটি সংক্ষিপ্ত লিখিত প্রস্তাব পান। মাসিক কাজ সেখানে লেখা থাকে, কীভাবে যেকোনো পক্ষ শেষ করতে পারে তাসহ। প্রজেক্ট কাজ সেই প্রস্তাবের মাইলস্টোন অনুযায়ী বিল হয়।",
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
      en: "The ad account stays in your name. You own the copy and creative you supply. For websites and software, ownership of the repository and the design is written into the project contract. Until that contract is signed, this page is only a price guide.",
      bn: "অ্যাড অ্যাকাউন্ট আপনার নামে থাকে। আপনার দেওয়া কপি ও ক্রিয়েটিভ আপনার। ওয়েবসাইট ও সফটওয়্যারের রিপোজিটরি ও ডিজাইনের মালিকানা প্রজেক্ট চুক্তিতে লেখা হয়। চুক্তি সই হওয়ার আগে এই পাতা শুধু একটি দামের নির্দেশিকা।",
    },
  },
  {
    q: {
      en: "How do we pay?",
      bn: "পেমেন্ট কীভাবে?",
    },
    a: {
      en: "By the method on the invoice, usually an international bank transfer. We confirm it in the proposal. We do not take ad spend through this website.",
      bn: "ইনভয়েসের পদ্ধতিতে, সাধারণত আন্তর্জাতিক ব্যাংক ট্রান্সফার। প্রস্তাবে এটি নিশ্চিত করা হয়। এই ওয়েবসাইটের মাধ্যমে বিজ্ঞাপন খরচ নেওয়া হয় না।",
    },
  },
];

export function getCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function serviceSlugs(): string[] {
  return serviceCategories.map((category) => category.slug);
}

export function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatTierPrice(tier: Tier, locale: Locale): string {
  if (tier.price == null) {
    return locale === "bn" ? "কাস্টম" : "Custom";
  }
  const amount = formatMoney(tier.price);
  const unit =
    tier.unit === "month"
      ? locale === "bn"
        ? "/মাস"
        : "/month"
      : "";
  if (locale === "bn") {
    return tier.priceFrom ? `${amount}${unit} থেকে` : `${amount}${unit}`;
  }
  return tier.priceFrom ? `From ${amount}${unit}` : `${amount}${unit}`;
}

export function formatAddonPrice(addon: Addon, locale: Locale): string {
  const amount = formatMoney(addon.price);
  const unit = addon.unit === "month" ? (locale === "bn" ? "/মাস" : "/month") : "";
  if (locale === "bn") {
    return addon.priceFrom ? `${amount}${unit} থেকে` : `${amount}${unit}`;
  }
  return addon.priceFrom ? `From ${amount}${unit}` : `${amount}${unit}`;
}

/** Lowest published starting price for cards and the service index. */
export function startingPriceLabel(category: ServiceCategory, locale: Locale): string {
  const priced = category.tiers.find((tier) => tier.price != null);
  if (!priced) return locale === "bn" ? "কাস্টম" : "Custom";
  return formatTierPrice(priced, locale);
}
