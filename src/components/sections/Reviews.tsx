import Image from "next/image";
import { reviews } from "@/lib/reviews";
import type { Locale } from "@/lib/site";

const copy = {
  en: {
    heading: "100% recommend · 42 reviews on Facebook",
    badge: "Facebook review",
    recommends: "Recommends",
    newTab: "opens in a new tab",
  },
  bn: {
    heading: "১০০% রেকমেন্ড · ফেসবুকে ৪২টি রিভিউ",
    badge: "ফেসবুক রিভিউ",
    recommends: "রেকমেন্ড করেছেন",
    newTab: "নতুন ট্যাবে খুলবে",
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
  const copies = [0, 1] as const;

  return (
    <section
      id="reviews"
      className="reviews-marquee border-y border-brand-charcoal/8 bg-brand-offwhite py-12 sm:py-16"
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
      <div className="reviews-viewport mt-8">
        <ul className="reviews-track">
          {copies.map((copyIndex) =>
            reviews.map((review) => (
              <li
                key={`${copyIndex}-${review.id}`}
                data-clone={copyIndex === 1 ? "" : undefined}
                aria-hidden={copyIndex === 1 ? true : undefined}
                className="w-[min(22rem,78vw)] shrink-0"
              >
                <blockquote
                  tabIndex={copyIndex === 0 ? 0 : undefined}
                  className="flex h-full flex-col rounded-3xl border border-brand-charcoal/10 bg-white p-6 shadow-[0_16px_36px_-28px_rgba(36,32,44,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
                >
                  <p className="text-sm leading-relaxed text-brand-charcoal" lang="en">
                    {review.quote}
                  </p>
                  <footer className="mt-5 flex items-center gap-3">
                    {review.logo ? (
                      <Image
                        src={review.logo}
                        alt=""
                        width={112}
                        height={112}
                        sizes="56px"
                        className="h-14 w-14 shrink-0 rounded-2xl border border-brand-charcoal/10 bg-white object-contain p-1 ring-1 ring-brand-charcoal/10"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-orange/40 bg-brand-offwhite text-sm font-bold text-brand-charcoal ring-1 ring-brand-orange/30"
                      >
                        {review.initials}
                      </span>
                    )}
                    <div className="min-w-0">
                      <cite className="block text-sm font-bold not-italic text-brand-charcoal">{review.name}</cite>
                      <p className="mt-1 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-brand-offwhite px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-ink">
                          {text.badge}
                        </span>
                        <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-charcoal ring-1 ring-brand-purple/20">
                          {text.recommends}
                        </span>
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
