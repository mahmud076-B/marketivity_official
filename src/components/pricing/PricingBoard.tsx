"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { pricingFaq, serviceCategories, type ServiceCategory } from "@/lib/pricing";
import {
  CurrencyToggle,
  ExtraPrice,
  PriceTrust,
  TierPrice,
} from "@/components/pricing/currency";
import { whatsappLink, type Locale } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function PricingBoard({
  locale,
  initialSlug,
}: {
  locale: Locale;
  initialSlug?: string;
}) {
  const initial = serviceCategories.some((item) => item.slug === initialSlug)
    ? initialSlug!
    : serviceCategories[0].slug;
  const [slug, setSlug] = useState(initial);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const category = useMemo(
    () => serviceCategories.find((item) => item.slug === slug) ?? serviceCategories[0],
    [slug],
  );

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <CurrencyToggle />
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label={locale === "bn" ? "সেবার ধরন" : "Service category"}
      >
        {serviceCategories.map((item) => {
          const selected = item.slug === category.slug;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSlug(item.slug)}
              className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                selected
                  ? "bg-brand-orange text-brand-charcoal"
                  : "border border-brand-charcoal/10 bg-white text-brand-charcoal"
              }`}
            >
              {item.name[locale]}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-brand-muted">
        {category.summary[locale]}
      </p>

      <TierGrid category={category} locale={locale} />
      <CategoryExtras category={category} locale={locale} />
      <PriceTrust locale={locale} />

      <section className="mt-14 rounded-3xl border border-brand-orange/20 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-brand-charcoal">
          {locale === "bn" ? "নিজের পরিকল্পনা বলুন" : "Tell us the brief"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-muted">
          {locale === "bn"
            ? "যদি কোনো টিয়ার মিলে না যায়, হোয়াটসঅ্যাপে কয়েক লাইনে কাজটি লিখুন। আমরা একটি লিখিত প্রস্তাব দিই।"
            : "If none of the tiers fit, send a short brief on WhatsApp. We reply with a written proposal."}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-primary text-sm">
            {locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
          </Link>
          <a
            href={whatsappLink(
              locale === "bn"
                ? "হ্যালো মার্কেটিভিটি, আমার একটি কাস্টম ব্রিফ আছে।"
                : "Hello Marketivity, I have a custom brief.",
            )}
            className="btn-whatsapp text-sm"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-center text-2xl font-bold text-brand-charcoal">
          {locale === "bn" ? "প্রশ্নোত্তর" : "FAQ"}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl divide-y divide-brand-charcoal/10 rounded-3xl border border-brand-charcoal/10 bg-white">
          {pricingFaq.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q.en}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : index)}
                >
                  <span className="font-semibold text-brand-charcoal">{item.q[locale]}</span>
                  <span className="text-brand-orange" aria-hidden>
                    {open ? "–" : "+"}
                  </span>
                </button>
                {open ? (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-brand-muted">{item.a[locale]}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function CategoryExtras({
  category,
  locale,
}: {
  category: ServiceCategory;
  locale: Locale;
}) {
  const notes = category.notes?.[locale] ?? [];
  const extras = category.extras ?? [];
  if (notes.length === 0 && extras.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      {notes.map((note) => (
        <p key={note} className="text-center text-sm leading-relaxed text-brand-muted">
          {note}
        </p>
      ))}
      {extras.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {extras.map((extra) => (
            <li
              key={extra.id}
              className="rounded-2xl border border-brand-charcoal/10 bg-white px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold text-brand-charcoal">{extra.name[locale]}</span>
                <span className="shrink-0 text-sm font-bold text-brand-charcoal">
                  <ExtraPrice extra={extra} locale={locale} />
                </span>
              </div>
              {extra.detail ? (
                <p className="mt-2 text-xs leading-relaxed text-brand-muted">{extra.detail[locale]}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function TierGrid({
  category,
  locale,
}: {
  category: ServiceCategory;
  locale: Locale;
}) {
  return (
    <>
    <div className="mt-10 grid items-stretch gap-5 pt-4 lg:grid-cols-3">
      {category.tiers.map((tier, index) => (
        <ScrollReveal key={tier.id} delay={index * 0.08} className="h-full">
          <article
            className={`relative flex h-full flex-col rounded-3xl border bg-white p-6 sm:p-7 ${
              tier.popular
                ? "border-brand-purple shadow-[0_18px_40px_-28px_rgba(123,63,228,0.65)] lg:-translate-y-2"
                : "border-brand-charcoal/10"
            }`}
          >
            {tier.popular ? (
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-brand-charcoal">
                {locale === "bn" ? "সবচেয়ে জনপ্রিয়" : "Most popular"}
              </p>
            ) : null}
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
              {category.model[locale]}
            </p>
            <h3 className="mt-3 text-xl font-bold text-brand-charcoal">{tier.name[locale]}</h3>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl">
              <TierPrice tier={tier} locale={locale} />
            </p>
            <p className="mt-3 text-sm text-brand-muted">{tier.bestFor[locale]}</p>
            <p className="mt-2 text-xs font-semibold text-brand-charcoal">{tier.timeline[locale]}</p>
            <ul className="mt-5 flex-1 space-y-2">
              {tier.includes[locale].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-brand-charcoal">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary mt-6 w-full text-sm">
              {locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
            </Link>
            <a
              href={whatsappLink(
                locale === "bn"
                  ? `হ্যালো মার্কেটিভিটি, আমি ${category.name.bn} — ${tier.name.bn} নিয়ে কথা বলতে চাই।`
                  : `Hello Marketivity, I would like to talk about ${category.name.en} — ${tier.name.en}.`,
              )}
              className="btn-whatsapp mt-3 w-full text-sm"
            >
              WhatsApp
            </a>
          </article>
        </ScrollReveal>
      ))}
    </div>
    </>
  );
}
