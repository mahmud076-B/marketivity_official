export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  location: string;
  service: string;
  serviceSlug: string;
  duration: string;
  challenge: string;
  result: string;
  metric: {
    value: string;
    label: string;
  };
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
  color: "orange" | "purple" | "green";
  emoji: string;
};

export const caseStudiesEn: CaseStudy[] = [
  {
    id: "zara-fashion",
    client: "Zara Fashion BD",
    industry: "Fashion & Retail",
    location: "Dhaka",
    service: "Social Media Marketing",
    serviceSlug: "social-media",
    duration: "4 Months",
    challenge:
      "A Dhaka-based fashion brand struggling with low social reach and stagnant online sales despite having quality products.",
    result:
      "Grew from 2,300 to 18,500+ followers and increased monthly revenue from social channels by 522%.",
    metric: {
      value: "522%",
      label: "Revenue Growth",
    },
    before: [
      { label: "Followers", value: "2,300" },
      { label: "Monthly Revenue", value: "৳45,000" },
      { label: "Engagement Rate", value: "0.8%" },
    ],
    after: [
      { label: "Followers", value: "18,500+" },
      { label: "Monthly Revenue", value: "৳2,80,000" },
      { label: "Engagement Rate", value: "6.4%" },
    ],
    color: "orange",
    emoji: "👗",
  },
  {
    id: "spice-garden",
    client: "Spice Garden Restaurant",
    industry: "Food & Beverage",
    location: "Rajshahi",
    service: "Paid Advertising",
    serviceSlug: "paid-ads",
    duration: "3 Months",
    challenge:
      "A popular Rajshahi restaurant with great food but minimal digital presence, relying entirely on walk-in customers and word of mouth.",
    result:
      "Facebook & Instagram Ads drove table bookings from 12 to 87 per week — a 625% increase in digital-sourced reservations.",
    metric: {
      value: "625%",
      label: "More Bookings",
    },
    before: [
      { label: "Weekly Bookings", value: "12" },
      { label: "Ad Reach", value: "~800/month" },
      { label: "Online Orders", value: "৳18,000/mo" },
    ],
    after: [
      { label: "Weekly Bookings", value: "87" },
      { label: "Ad Reach", value: "1,20,000/month" },
      { label: "Online Orders", value: "৳1,45,000/mo" },
    ],
    color: "purple",
    emoji: "🍛",
  },
  {
    id: "eduplex-academy",
    client: "EduPlex Academy",
    industry: "Education",
    location: "Bogura",
    service: "SEO Services",
    serviceSlug: "seo",
    duration: "6 Months",
    challenge:
      "A coaching center in Bogura invisible on Google search, losing students to competitors who ranked higher for key education terms.",
    result:
      "Went from page 8 to page 1 on Google for 14 keywords, growing organic traffic by 6,900% and admissions by 3x.",
    metric: {
      value: "6,900%",
      label: "Organic Traffic",
    },
    before: [
      { label: "Organic Visitors/mo", value: "45" },
      { label: "Google Ranking", value: "Page 8" },
      { label: "Online Admissions", value: "3/month" },
    ],
    after: [
      { label: "Organic Visitors/mo", value: "3,200" },
      { label: "Google Ranking", value: "Page 1 (×14)" },
      { label: "Online Admissions", value: "31/month" },
    ],
    color: "green",
    emoji: "🎓",
  },
];

export const caseStudiesBn: CaseStudy[] = [
  {
    id: "zara-fashion",
    client: "জারা ফ্যাশন বিডি",
    industry: "ফ্যাশন ও লাইফস্টাইল",
    location: "ঢাকা",
    service: "সোশ্যাল মিডিয়া মার্কেটিং",
    serviceSlug: "social-media",
    duration: "৪ মাস",
    challenge:
      "ঢাকার একটি উদীয়মান ফ্যাশন ব্র্যান্ড যাদের পণ্যের মান চমৎকার হলেও অনলাইনে রিচ কম থাকায় সেলস বাড়ছিল না।",
    result:
      "ফলোয়ার ২,৩০০ থেকে ১৮,৫০০+ এ পৌঁছায় এবং সোশ্যাল চ্যানেল থেকে মাসিক সেলস ৫২২% বৃদ্ধি পায়।",
    metric: {
      value: "+৫২২%",
      label: "মাসিক সেলস প্রবৃদ্ধি",
    },
    before: [
      { label: "ফলোয়ার সংখ্যা", value: "২,৩০০" },
      { label: "মাসিক সেলস", value: "৳৪৫,০০০" },
      { label: "এনগেজমেন্ট রেট", value: "০.৮%" },
    ],
    after: [
      { label: "ফলোয়ার সংখ্যা", value: "১৮,৫০০+" },
      { label: "মাসিক সেলস", value: "৳২,৮০,০০০" },
      { label: "এনগেজমেন্ট রেট", value: "৬.৪%" },
    ],
    color: "orange",
    emoji: "👗",
  },
  {
    id: "spice-garden",
    client: "স্পাইস গার্ডেন রেস্তোরাঁ",
    industry: "ফুড ও রেস্তোরাঁ",
    location: "রাজশাহী",
    service: "পেইড বিজ্ঞাপন ও মেটা অ্যাডস",
    serviceSlug: "paid-ads",
    duration: "৩ মাস",
    challenge:
      "রাজশাহীর একটি জনপ্রিয় রেস্তোরাঁ, খাবারের স্বাদ দারুণ হলেও ডিজিটাল উপস্থিতি না থাকায় শুধু পরিচিত কাস্টমারদের ওপর নির্ভর করতে হতো।",
    result:
      "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপনের মাধ্যমে প্রতি সপ্তাহে টেবিল বুকিং ১২ থেকে ৮৭-তে উন্নীত হয় — অনলাইন বুকিংয়ে ৬২৫% প্রবৃদ্ধি।",
    metric: {
      value: "+৬২৫%",
      label: "বেশি বুকিং ও সেলস",
    },
    before: [
      { label: "সাপ্তাহিক বুকিং", value: "১২টি" },
      { label: "বিজ্ঞাপন রিচ", value: "~৮০০/মাস" },
      { label: "অনলাইন অর্ডার", value: "৳১৮,০০০/মাস" },
    ],
    after: [
      { label: "সাপ্তাহিক বুকিং", value: "৮৭টি" },
      { label: "বিজ্ঞাপন রিচ", value: "১,২০,০০০/মাস" },
      { label: "অনলাইন অর্ডার", value: "৳১,৪৫,০০০/মাস" },
    ],
    color: "purple",
    emoji: "🍛",
  },
  {
    id: "eduplex-academy",
    client: "এডুপ্লেক্স একাডেমি",
    industry: "শিক্ষা ও এডুকেশন",
    location: "বগুড়া",
    service: "এসইও (SEO) সার্ভিস",
    serviceSlug: "seo",
    duration: "৬ মাস",
    challenge:
      "বগুড়ার একটি কোচিং একাডেমি যারা গুগল সার্চে কোনোভাবেই খুঁজে পাওয়া যাচ্ছিল না এবং প্রতিযোগীদের কাছে শিক্ষার্থী হারাচ্ছিল।",
    result:
      "গুগলের ৮ নম্বর পেজ থেকে ১৪টি গুরুত্বপূর্ণ কিওয়ার্ডে ১ম পেজে চলে আসে এবং অর্গানিক ট্রাফিক ৬,৯০০% বৃদ্ধি পায়।",
    metric: {
      value: "+৬,৯০০%",
      label: "অর্গানিক ওয়েবসাইট ট্রাফিক",
    },
    before: [
      { label: "অর্গানিক ভিজিটর/মাস", value: "৪৫" },
      { label: "গুগল র‍্যাঙ্কিং", value: "পেজ ৮" },
      { label: "অনলাইন ভর্তি", value: "৩ জন/মাস" },
    ],
    after: [
      { label: "অর্গানিক ভিজিটর/মাস", value: "৩,২০০" },
      { label: "গুগল র‍্যাঙ্কিং", value: "পেজ ১ (১৪টি কিওয়ার্ড)" },
      { label: "অনলাইন ভর্তি", value: "৩১ জন/মাস" },
    ],
    color: "green",
    emoji: "🎓",
  },
];

export function getCaseStudies(locale?: string): CaseStudy[] {
  return locale === "bn" ? caseStudiesBn : caseStudiesEn;
}

export const caseStudies = caseStudiesEn;
