import { Link } from "@/i18n/navigation";
import { whatsappLink, type Locale } from "@/lib/site";

const copy = {
  en: {
    book: "Book a free call",
    whatsapp: "Message on WhatsApp",
    message: "Hello Marketivity, I would like to book a free call.",
  },
  bn: {
    book: "ফ্রি কল বুক করুন",
    whatsapp: "হোয়াটসঅ্যাপে লিখুন",
    message: "হ্যালো মার্কেটিভিটি, আমি একটি ফ্রি কল বুক করতে চাই।",
  },
} as const;

export default function PageActions({
  locale,
  topic,
  align = "start",
}: {
  locale: Locale;
  topic?: string;
  align?: "start" | "center";
}) {
  const text = copy[locale];
  const message = topic
    ? locale === "bn"
      ? `হ্যালো মার্কেটিভিটি, ${topic} নিয়ে কথা বলতে চাই।`
      : `Hello Marketivity, I would like to talk about ${topic}.`
    : text.message;

  return (
    <div
      className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${
        align === "center" ? "sm:justify-center" : ""
      }`}
    >
      <Link href="/contact" className="btn-primary w-full sm:w-auto">
        {text.book}
      </Link>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp w-full sm:w-auto"
      >
        {text.whatsapp}
      </a>
    </div>
  );
}
