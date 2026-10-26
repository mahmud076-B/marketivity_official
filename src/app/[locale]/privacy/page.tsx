import { setRequestLocale } from "next-intl/server";
import { isLocale, site, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Privacy policy",
    description:
      "How Marketivity handles personal data for clients in the UK, the USA and elsewhere, including contact forms and optional analytics cookies.",
  },
  bn: {
    title: "গোপনীয়তা নীতি",
    description:
      "যুক্তরাজ্য, যুক্তরাষ্ট্র ও অন্যত্র ক্লায়েন্টদের ব্যক্তিগত তথ্য মার্কেটিভিটি কীভাবে রাখে, যোগাযোগ ফর্ম ও ঐচ্ছিক অ্যানালিটিক্স কুকিসহ।",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  return pageMetadata({
    locale: safe,
    path: "/privacy",
    title: copy[safe].title,
    description: copy[safe].description,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  setRequestLocale(locale);
  const bn = locale === "bn";

  return (
    <article className="safe-px py-16">
      <div className="prose-policy mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-brand-charcoal">{copy[locale].title}</h1>
        <p className="mt-3 text-sm text-brand-muted">
          {bn ? "কার্যকর: ২৬ অক্টোবর ২০২৬" : "Effective 26 October 2026"}
        </p>
        <Section title={bn ? "আমরা কারা" : "Who we are"}>
          <p>
            {bn
              ? `মার্কেটিভিটি একটি ডিজিটাল স্টুডিও, প্রতিষ্ঠাতা এস এম মাহমুদ হাসান। ঠিকানা: ${site.address.bn}। ইমেইল ${site.email}। ফোন ${site.phoneDisplay}। এই নোটিশ যুক্তরাজ্যের UK GDPR ও Data Protection Act 2018, এবং যুক্তরাষ্ট্রের দর্শকদের জন্য একটি সহজ গোপনীয়তা বিবরণ মেনে লেখা।`
              : `Marketivity is a digital studio founded by S M Mahmud Hasan. Address: ${site.address.en}. Email ${site.email}. Phone ${site.phoneDisplay}. This notice is written for UK GDPR and the Data Protection Act 2018, and it also explains our practices for visitors in the United States.`}
          </p>
        </Section>
        <Section title={bn ? "আমরা যা সংগ্রহ করি" : "What we collect"}>
          <ul>
            <li>
              {bn
                ? "যোগাযোগ ফর্ম: নাম, ইমেইল, ঐচ্ছিক ফোন, বিষয়, বার্তা এবং আপনি যে সেবা বেছে নেন।"
                : "Contact form: name, email, optional phone, subject, message, and the service you choose."}
            </li>
            <li>
              {bn
                ? "হোয়াটসঅ্যাপ বা ইমেইলে আপনি যা পাঠান।"
                : "Whatever you send us by WhatsApp or email."}
            </li>
            <li>
              {bn
                ? "কুকি পছন্দ (গ্রহণ বা প্রত্যাখ্যান), আপনার ব্রাউজারে সংরক্ষিত।"
                : "Your cookie choice (accept or reject), stored in your browser."}
            </li>
            <li>
              {bn
                ? "আপনি সম্মতি দিলে এবং আইডি সেট থাকলে, GA4 ও মেটা পিক্সেল পেজ ভিউ সংক্রান্ত তথ্য। আইডি না থাকলে এই স্ক্রিপ্ট লোড হয় না।"
                : "If you consent and the IDs are set, GA4 and the Meta Pixel collect page-view data. If the IDs are unset, those scripts do not load."}
            </li>
          </ul>
        </Section>
        <Section title={bn ? "কেন, এবং কোন ভিত্তিতে" : "Why, and the lawful basis"}>
          <ul>
            <li>
              {bn
                ? "আপনার বার্তার উত্তর দিতে (চুক্তির আগের পদক্ষেপ, অথবা বৈধ স্বার্থ)।"
                : "To reply to your message (steps before a contract, or legitimate interests)."}
            </li>
            <li>
              {bn
                ? "একটি প্রস্তাব বা চুক্তি চালাতে (চুক্তি)।"
                : "To prepare a proposal or perform a contract (contract)."}
            </li>
            <li>
              {bn
                ? "বিশ্লেষণ ও বিজ্ঞাপন পরিমাপ, শুধু আপনার সম্মতিতে (সম্মতি)। সম্মতি প্রত্যাহার করলে স্ক্রিপ্ট আর লোড হয় না।"
                : "Analytics and ad measurement, only with your consent. If you reject or withdraw consent, the scripts are not loaded."}
            </li>
          </ul>
        </Section>
        <Section title={bn ? "কার সাথে শেয়ার হয়" : "Who receives it"}>
          <p>
            {bn
              ? "ফর্মের বার্তা Resend-এর মাধ্যমে আমাদের ইমেইলে যায়। সাইট Vercel-এ হোস্টেড। সম্মতির পর Google (GA4) ও Meta পিক্সেল ডেটা পেতে পারে। আমরা ব্যক্তিগত তথ্য বিক্রি করি না।"
              : "Form messages are emailed to us through Resend. The site is hosted on Vercel. After consent, Google (GA4) and Meta may receive pixel data. We do not sell personal information."}
          </p>
        </Section>
        <Section title={bn ? "আন্তর্জাতিক স্থানান্তর" : "International transfers"}>
          <p>
            {bn
              ? "আমরা বাংলাদেশে কাজ করি। Vercel, Resend, Google ও Meta যুক্তরাষ্ট্রসহ অন্য দেশে তথ্য প্রক্রিয়া করতে পারে। যুক্তরাজ্য থেকে পাঠানো তথ্যের জন্য আমরা প্রযোজ্য সুরক্ষা (যেমন সরবরাহকারীর আদর্শ চুক্তি ধারা) এর উপর নির্ভর করি।"
              : "We work from Bangladesh. Vercel, Resend, Google and Meta may process data in the United States and other countries. For information sent from the UK, we rely on the safeguards those providers offer, such as standard contractual clauses where they apply."}
          </p>
        </Section>
        <Section title={bn ? "কতদিন রাখি" : "How long we keep it"}>
          <p>
            {bn
              ? "যোগাযোগের বার্তা আমরা প্রয়োজনীয় সময় রাখি, সাধারণত শেষ যোগাযোগের দুই বছরের বেশি নয়, যদি কোনো চুক্তি বা আইন আরও সময় না চায়। কুকি পছন্দ আপনি মুছে ফেলা পর্যন্ত ব্রাউজারে থাকে।"
              : "We keep enquiry messages for as long as we need them to respond and keep a record of the conversation, and not longer than two years after the last message, unless a contract or the law requires more. Your cookie choice stays in the browser until you clear it."}
          </p>
        </Section>
        <Section title={bn ? "আপনার অধিকার" : "Your rights"}>
          <p>
            {bn
              ? "আপনি তথ্য দেখতে, সংশোধন করতে, মুছতে, সীমিত করতে, আপত্তি করতে এবং বহনযোগ্য কপি চাইতে পারেন। সম্মতি যেকোনো সময় তুলে নিতে পারেন। যুক্তরাজ্যে আপনি ICO-তে অভিযোগ করতে পারেন (ico.org.uk)। অনুরোধ পাঠান "
              : "You can ask for access, correction, deletion, restriction, objection, and a portable copy. You can withdraw consent at any time. In the UK you can complain to the ICO (ico.org.uk). Send requests to "}
            <a className="font-semibold text-brand-orange" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p className="mt-3">
            {bn
              ? "যুক্তরাষ্ট্রের দর্শক: আমরা ব্যক্তিগত তথ্য বিক্রি বা শেয়ার করি না টার্গেটেড বিজ্ঞাপনের অর্থের বিনিময়ে। সমান অপ্ট-আউট চাইলে একই ইমেইলে লিখুন।"
              : "United States visitors: we do not sell personal information or share it for cross-context behavioural advertising. To opt out of any future sale or share, email the same address. We will not discriminate against you for exercising that choice."}
          </p>
        </Section>
        <Section title={bn ? "শিশু" : "Children"}>
          <p>
            {bn
              ? "এই সাইট শিশুদের জন্য নয়। আমরা জেনেশুনে ১৬ বছরের কম বয়সীদের তথ্য সংগ্রহ করি না।"
              : "This site is not aimed at children. We do not knowingly collect information from anyone under 16."}
          </p>
        </Section>
        <Section title={bn ? "পরিবর্তন" : "Changes"}>
          <p>
            {bn
              ? "নীতি বদলালে এই পাতায় তারিখ বদলাব। গুরুত্বপূর্ণ পরিবর্তন হলে ফর্ম ব্যবহারকারীদের জানানোর চেষ্টা করব।"
              : "If this notice changes, we will update the date on this page. If a change is material, we will try to tell people who have written to us."}
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-brand-charcoal">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-brand-muted [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        {children}
      </div>
    </section>
  );
}
