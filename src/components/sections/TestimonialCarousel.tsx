"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback } from "react";
import { motion } from "framer-motion";
import FacebookBadge from "@/components/ui/FacebookBadge";

type Review = {
  name: string;
  text: string;
  rating: number;
};

type TestimonialCarouselProps = {
  reviews: Review[];
  badgeRecommended: string;
  badgeOnFacebook: string;
};

export default function TestimonialCarousel({
  reviews,
  badgeRecommended,
  badgeOnFacebook,
}: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="mb-8 flex justify-center">
        <FacebookBadge
          recommended={badgeRecommended}
          onFacebook={badgeOnFacebook}
        />
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 shrink-0 grow-0 basis-full px-1 sm:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="relative flex flex-col h-full rounded-3xl border border-brand-orange/20 bg-gradient-to-br from-white via-brand-orange/5 to-brand-purple/5 p-7 shadow-soft-md transition-shadow duration-300 hover:shadow-soft-lg"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-orange/15 pointer-events-none" />

                {/* Rating Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-brand-orange text-brand-orange"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-brand-charcoal/80">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-brand-charcoal/5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple flex items-center justify-center text-white font-extrabold text-sm shadow-soft-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-brand-charcoal">
                      {review.name}
                    </p>
                    <span className="text-[11px] text-brand-charcoal/50">Verified Facebook Client</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          className="touch-target flex h-10 w-10 items-center justify-center rounded-full border border-brand-charcoal/15 bg-white text-brand-charcoal shadow-soft-sm transition-all duration-200 hover:border-brand-orange hover:text-brand-orange hover:shadow-glow-orange active:scale-95"
          aria-label="Previous review"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="touch-target flex h-10 w-10 items-center justify-center rounded-full border border-brand-charcoal/15 bg-white text-brand-charcoal shadow-soft-sm transition-all duration-200 hover:border-brand-orange hover:text-brand-orange hover:shadow-glow-orange active:scale-95"
          aria-label="Next review"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
