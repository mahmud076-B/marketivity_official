import { setRequestLocale } from "next-intl/server";
import { isLocale, site, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Terms of use",
    description:
      "Terms for using the Marketivity website and for enquiries about Meta ads, websites and software. A project starts only with a written proposal.",
  },
  bn: {
    title: "ব্যবহারের শর্ত",
    description:
      "মার্কেটিভিটি ওয়েবসাইট ব্যবহার এবং মেটা অ্যাডস, ওয়েবসাইট ও সফটওয়্যার নিয়ে জিজ্ঞাসার শর্ত। প্রজেক্ট শুরু হয় শুধু লিখিত প্রস্তাবে।",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/terms",
    title: copy[safe].title,
    description: copy[safe].description,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);
  const bn = locale === "bn";

  const sections: { title: string; body: string }[] = bn
    ? [
        {
          title: "এই শর্ত কী কভার করে",
          body: `এই শর্ত ${site.url} ব্যবহার এবং মার্কেটিভিটির কাছে জিজ্ঞাসার জন্য। একটি প্রজেক্ট বা রিটেইনার শুরু হয় শুধু যখন দুই পক্ষ একটি লিখিত প্রস্তাব বা চুক্তিতে রাজি হয়। সেই চুক্তি এই পাতার সাথে না মিললে, চুক্তি প্রাধান্য পায়।`,
        },
        {
          title: "সেবা",
          body: "আমরা মেটা অ্যাডস ম্যানেজমেন্ট, সোশ্যাল ও পেজ ম্যানেজমেন্ট, ওয়েবসাইট, এআই ওয়েব অ্যাপ এবং কাস্টম সফটওয়্যার নিয়ে কাজ করি। ওয়েবসাইটের দাম একটি নির্দেশিকা। চূড়ান্ত ফি প্রস্তাবে লেখা হয়।",
        },
        {
          title: "দাম ও বিজ্ঞাপন খরচ",
          body: "প্রকাশিত দাম মার্কিন ডলার, পাউন্ড স্টার্লিং, বা টাকায়, নির্ধারিত দাম, কনভার্সন নয়। যেখানে প্রযোজ্য, ভ্যাট ও অন্যান্য কর আলাদা। মেটা অ্যাডসের খরচ ফির মধ্যে নয়। আপনি সেই খরচ আপনার নিজের অ্যাড অ্যাকাউন্ট থেকে মেটাকে দেন।",
        },
        {
          title: "আমরা যা প্রতিশ্রুতি দিই না",
          body: "আমরা বিক্রি, রাজস্ব, বিজ্ঞাপন খরচের উপর রিটার্ন, র‍্যাঙ্কিং বা একটি নির্দিষ্ট সংখ্যক কথোপকথনের গ্যারান্টি দিই না। রিপোর্ট অ্যাডস ম্যানেজার বা সম্মত টুল থেকে আসে।",
        },
        {
          title: "আপনার দায়িত্ব",
          body: "আপনি অ্যাকাউন্ট অ্যাক্সেস, সঠিক পণ্য তথ্য এবং যেসব দাবি বিজ্ঞাপনে যায় তার জন্য দায়ী। অবৈধ, বিভ্রান্তিকর বা অন্যের অধিকার লঙ্ঘনকারী কনটেন্ট আমরা চালাব না।",
        },
        {
          title: "মেধাস্বত্ব",
          body: "অ্যাড অ্যাকাউন্ট আপনার নামে থাকে। আপনার দেওয়া কপি ও ফাইল আপনার। ওয়েবসাইট ও সফটওয়্যারের কোড ও ডিজাইনের মালিকানা প্রজেক্ট চুক্তিতে লেখা হয়। এই ওয়েবসাইট মার্কেটিভিটির।",
        },
        {
          title: "পেমেন্ট ও বাতিল",
          body: "ইনভয়েসের তারিখ ও পদ্ধতি প্রস্তাবে থাকে। মাসিক কাজ কীভাবে শেষ হবে তাও প্রস্তাবে থাকে। দেওয়া কাজের জন্য ইতিমধ্যে বিল হওয়া ফি ফেরত হয় না, যদি প্রস্তাবে অন্য কথা না থাকে।",
        },
        {
          title: "দায়ের সীমা",
          body: "আইনে যতটুকু বাদ দেওয়া যায় না (যেমন প্রতারণা, বা মৃত্যু ও ব্যক্তিগত আঘাত যেখানে আইন বাদ দিতে দেয় না), আমাদের মোট দায় সেই কাজের জন্য আপনি আগের তিন মাসে যে ফি দিয়েছেন তার বেশি নয়। আমরা হারানো মুনাফার দায় নিই না।",
        },
        {
          title: "আইন",
          body: "এই ওয়েবসাইট শর্ত ইংল্যান্ড ও ওয়েলসের আইনে চলে। আপনার দেশের বাধ্যতামূলক ভোক্তা অধিকার অক্ষুণ্ণ থাকে। আদালত ইংল্যান্ড ও ওয়েলসের, যদি বাধ্যতামূলক স্থানীয় আদালতের অধিকার না থাকে।",
        },
      ]
    : [
        {
          title: "What these terms cover",
          body: `These terms cover use of ${site.url} and enquiries to Marketivity. A project or retainer starts only when both sides agree a written proposal or contract. If that contract conflicts with this page, the contract wins.`,
        },
        {
          title: "Services",
          body: "We work on Meta Ads management, social and page management, websites, AI web apps and custom software. Prices on the website are a guide. The fee is the one written in the proposal.",
        },
        {
          title: "Prices and ad spend",
          body: "Published prices are set in US dollars, pounds sterling, or taka. They are not a currency conversion, and they exclude VAT and other taxes where those apply. Meta ad spend is not part of the fee. You pay that spend to Meta from an ad account in your name.",
        },
        {
          title: "What we do not promise",
          body: "We do not guarantee sales, revenue, a return on ad spend, rankings, or a set number of conversations. Reports come from Ads Manager or another tool named in the proposal.",
        },
        {
          title: "Your responsibilities",
          body: "You are responsible for account access, accurate product information, and the claims that go into ads. We will not run content that is illegal, misleading, or infringes someone else’s rights.",
        },
        {
          title: "Intellectual property",
          body: "The ad account stays in your name. Copy and files you supply stay yours. Ownership of website and software code and design is set in the project contract. This website belongs to Marketivity.",
        },
        {
          title: "Payment and ending the work",
          body: "Invoice dates and the payment method are in the proposal, as is how either side can end a monthly plan. Fees already billed for work done are not refunded unless the proposal says otherwise.",
        },
        {
          title: "Limit of liability",
          body: "Except where the law does not allow a limit (including fraud, and death or personal injury caused by negligence where a limit is unlawful), our total liability for a piece of work is the fees you paid for that work in the previous three months. We are not liable for lost profits.",
        },
        {
          title: "Law",
          body: "These website terms are governed by the laws of England and Wales. Mandatory consumer rights in your country still apply. The courts of England and Wales have jurisdiction, unless a mandatory local forum applies.",
        },
      ];

  return (
    <article className="safe-px py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-brand-charcoal">{copy[locale].title}</h1>
        <p className="mt-3 text-sm text-brand-muted">
          {bn ? "কার্যকর: ২৬ অক্টোবর ২০২৬" : "Effective 26 October 2026"}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-brand-muted">
          {bn
            ? `প্রশ্ন: ${site.email}। ${site.address.bn}।`
            : `Questions: ${site.email}. ${site.address.en}.`}
        </p>
        {sections.map((section) => (
          <section key={section.title} className="mt-8">
            <h2 className="text-xl font-bold text-brand-charcoal">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
