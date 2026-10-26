import type { Locale } from "@/lib/site";

/**
 * Real Meta Ads Manager figures.
 * Account 1 (1073017198649986) itemised rows plus the founder's note of
 * 46 campaigns and roughly $230–$240 lifetime spend.
 * Account 2 (1698221284961487) Meta totals row: $373.57, 882,320 impressions,
 * 75 campaigns. Political, recruitment and matrimony campaigns are not used.
 *
 * Combined headlines are approximate and rounded down:
 * - spend floor $230 + $373.57 = $603.57 → "$600+"
 * - 46 + 75 = 121 campaigns → "120+"
 * - impressions floor 500,000 + 882,320 = 1,382,320 → "1.3 million+"
 *
 * 4,600+ conversations and 4,500+ follows are floors of the business
 * campaigns itemised in the export (4,635 messaging and 4,552 follows).
 * They are not the full account totals.
 */

export type ResultKind = "messaging" | "follows";

export type FeaturedCampaign = {
  id: string;
  name: string;
  kind: ResultKind;
  spend: number;
  results: number;
  impressions: number;
  reach: number;
  /** Cost per result truncated to 3 decimals. Never rounded up. */
  costPerResult: string;
};

function costTruncated(spend: number, results: number): string {
  const truncated = Math.floor((spend / results) * 1000) / 1000;
  return truncated.toFixed(3);
}

export const featuredCampaigns: FeaturedCampaign[] = [
  {
    id: "baby-dress",
    name: "Baby Dress",
    kind: "messaging",
    spend: 41.74,
    results: 257,
    impressions: 61993,
    reach: 48772,
    costPerResult: costTruncated(41.74, 257),
  },
  {
    id: "sunglass-sell-ad",
    name: "Sunglass Sell Ad",
    kind: "messaging",
    spend: 9.96,
    results: 250,
    impressions: 25184,
    reach: 19019,
    costPerResult: costTruncated(9.96, 250),
  },
  {
    id: "argentina-brazil-cap",
    name: "Argentina/Brazil Cap",
    kind: "messaging",
    spend: 7.15,
    results: 217,
    impressions: 17845,
    reach: 14651,
    costPerResult: costTruncated(7.15, 217),
  },
  {
    id: "womens-watch",
    name: "Women's Watch",
    kind: "messaging",
    spend: 9.92,
    results: 183,
    impressions: 32907,
    reach: 24580,
    costPerResult: costTruncated(9.92, 183),
  },
  {
    id: "bikkhata-watch",
    name: "Bikkhata Watch Combo",
    kind: "messaging",
    spend: 13.93,
    results: 157,
    impressions: 27566,
    reach: 17638,
    costPerResult: costTruncated(13.93, 157),
  },
  {
    id: "dr-fardin-khan",
    name: "Dr. Fardin Khan",
    kind: "follows",
    spend: 7.67,
    results: 1419,
    impressions: 24757,
    reach: 17564,
    costPerResult: costTruncated(7.67, 1419),
  },
];

export const clientNames = [
  "Baby Dress",
  "Women's Watch",
  "Argentina/Brazil Cap",
  "Sunglass",
  "Bikkhata",
  "Dr. Fardin Khan",
  "HIYAM",
  "Twistoria",
  "Prime Finds",
  "NOORI",
  "SaRinn",
  "Lushious",
  "Smart Cart",
  "Vektor",
  "Cake Theory",
  "The Paradise",
  "SB Fashion House",
  "Sukoon Collection",
  "JOSS BD",
  "Taqwa Shop",
  "Grace Wear",
  "Royal Touch Spa",
  "Za-Ta",
  "Akota Mango",
  "Chittagong Gadget",
  "Vark Kord",
  "Mr Hossain",
  "Clothing is Luxury",
  "Stories the Silence Told Me",
  "চাঁদের অলংকার",
  "Men's Wear Collection",
  "Flower Bouquet",
  "Jewellery Combo",
  "Event Management",
  "Summer Collection",
] as const;

export const proofHeadlines = [
  {
    value: "$600+",
    label: {
      en: "ad spend managed",
      bn: "পরিচালিত বিজ্ঞাপন খরচ",
    },
  },
  {
    value: "120+",
    label: {
      en: "campaigns",
      bn: "ক্যাম্পেইন",
    },
  },
  {
    value: "1.3 million+",
    label: {
      en: "impressions",
      bn: "ইমপ্রেশন",
    },
  },
  {
    value: "4,600+",
    label: {
      en: "messaging conversations counted",
      bn: "গণনা করা মেসেজিং কথোপকথন",
    },
  },
  {
    value: "4,500+",
    label: {
      en: "follows and likes counted",
      bn: "গণনা করা ফলো ও লাইক",
    },
  },
] as const;

export function campaignHeadline(campaign: FeaturedCampaign, locale: Locale): string {
  const spend = `$${campaign.spend.toFixed(2)}`;
  const results = campaign.results.toLocaleString("en-US");
  if (locale === "bn") {
    return campaign.kind === "messaging"
      ? `${spend}-এ ${results}টি মেসেজিং কথোপকথন`
      : `${spend}-এ ${results}টি ফলো`;
  }
  return campaign.kind === "messaging"
    ? `${results} messaging conversations for ${spend}`
    : `${results} follows for ${spend}`;
}

export function campaignResultLabel(kind: ResultKind, locale: Locale): string {
  if (locale === "bn") {
    return kind === "messaging" ? "মেসেজিং কথোপকথন" : "ফলো ও লাইক";
  }
  return kind === "messaging" ? "Messaging conversations" : "Follows and likes";
}

export const proofCopy = {
  source: {
    en: "From Meta Ads Manager, read on 26 October 2026, maximum date range. Combined totals are approximate and rounded down. Conversation and follow counts are a floor from the business campaigns in the export, not every campaign on the accounts.",
    bn: "মেটা অ্যাডস ম্যানেজার থেকে, ২৬ অক্টোবর ২০২৬, সর্বোচ্চ তারিখ সীমা। মিলিত যোগফল আনুমানিক এবং নিচের দিকে পূর্ণসংখ্যায় রাখা। কথোপকথন ও ফলোর সংখ্যা এক্সপোর্টের ব্যবসায়িক ক্যাম্পেইনের নিম্নসীমা, অ্যাকাউন্টের প্রতিটি ক্যাম্পেইন নয়।",
  },
  clientReported: {
    en: "Clients reported an average of 17–20 sales per messaging campaign.",
    bn: "ক্লায়েন্টরা জানিয়েছেন, মেসেজিং ক্যাম্পেইনপ্রতি গড়ে ১৭–২০টি বিক্রি।",
  },
  clientReportedNote: {
    en: "Client-reported. Not measured in Ads Manager. An average across messaging campaigns, not a result for any single campaign.",
    bn: "ক্লায়েন্ট-রিপোর্টেড। অ্যাডস ম্যানেজারে মাপা হয়নি। এটি মেসেজিং ক্যাম্পেইনের গড়, কোনো একটি ক্যাম্পেইনের ফল নয়।",
  },
  clientsLabel: {
    en: "Clients and pages we have advertised",
    bn: "আমরা যেসব ক্লায়েন্ট ও পেজের বিজ্ঞাপন চালিয়েছি",
  },
  clientsNote: {
    en: "Names are taken from campaign names. The logo strip uses the client marks we already have permission to show.",
    bn: "নামগুলো ক্যাম্পেইনের নাম থেকে নেওয়া। লোগো স্ট্রিপে শুধু সেই চিহ্ন আছে, যেগুলো দেখানোর অনুমতি আছে।",
  },
} as const;
