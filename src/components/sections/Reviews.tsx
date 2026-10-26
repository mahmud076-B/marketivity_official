import ReviewsCarousel from "@/components/sections/ReviewsCarousel";
import { reviews } from "@/lib/reviews";
import type { Locale } from "@/lib/site";

const copy = {
  en: {
    heading: "100% recommend · 42 reviews on Facebook",
    badge: "Facebook review",
    recommends: "Recommends",
    newTab: "opens in a new tab",
    previous: "Previous reviews",
    next: "Next reviews",
    readMore: "Read more",
    showLess: "Show less",
    carousel: "Facebook reviews",
  },
  bn: {
    heading: "১০০% রেকমেন্ড · ফেসবুকে ৪২টি রিভিউ",
    badge: "ফেসবুক রিভিউ",
    recommends: "রেকমেন্ড করেছেন",
    newTab: "নতুন ট্যাবে খুলবে",
    previous: "আগের রিভিউ",
    next: "পরের রিভিউ",
    readMore: "আরও পড়ুন",
    showLess: "কম দেখুন",
    carousel: "ফেসবুক রিভিউ",
  },
} as const;

const reviewGraph = {
  "@context": "https://schema.org",
  "@graph": reviews.map((review) => ({
    "@type": "Review",
    inLanguage: "en",
    reviewBody: review.quote,
    author: {
      "@type": review.id === "fariha-tabassum" ? "Person" : "Organization",
      name: review.name,
    },
    itemReviewed: {
      "@type": "Organization",
      name: "Marketivity",
      url: "https://www.marketivity.agency",
    },
  })),
};

export default function Reviews({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section
      id="reviews"
      className="border-y border-brand-charcoal/8 bg-brand-offwhite py-12 sm:py-16"
      aria-labelledby="reviews-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewGraph) }} />
      <div className="safe-px mx-auto max-w-3xl text-center">
        <h2 id="reviews-heading" className="text-2xl font-extrabold tracking-tight text-brand-charcoal sm:text-3xl">
          <a
            href="https://www.facebook.com/marketivitybd/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-brand-orange decoration-2 underline-offset-4"
          >
            {text.heading}
            <span className="sr-only"> ({text.newTab})</span>
          </a>
        </h2>
      </div>
      <ReviewsCarousel reviews={reviews} copy={text} />
    </section>
  );
}
