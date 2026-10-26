"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  addons,
  formatAddonPrice,
  formatTierPrice,
  pricingFaq,
  serviceCategories,
  type ServiceCategory,
} from "@/lib/pricing";
import { whatsappLink, type Locale } from "@/lib/site";

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
    [slug]
  );

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
        {serviceCategories.map((item) => {
          const selected = item.slug === category.slug;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSlug(item.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-brand-orange text-white"
                  : "bg-white text-brand-charcoal border border-brand-charcoal/10"
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

      <section className="mt-14">
        <h2 className="text-center text-2xl font-bold text-brand-charcoal">
          {locale === "bn" ? "অ্যাড-অন" : "Add-ons"}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addons.map((addon) => (
            <li
              key={addon.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-brand-charcoal/10 bg-white px-4 py-4"
            >
              <span className="text-sm font-medium text-brand-charcoal">
                {addon.name[locale]}
              </span>
              <span className="shrink-0 text-sm font-bold text-brand-purple">
                {formatAddonPrice(addon, locale)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-3xl border border-brand-orange/20 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-brand-charcoal">
          {locale === "bn" ? "নিজের পরিকল্পনা বলুন" : "Tell us the brief"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-muted">
          {locale === "bn"
            ? "যদি কোনো টিয়ার মিলে না যায়, হোয়াটসঅ্যাপে কয়েক লাইনে কাজটি লিখুন। আমরা একটি লিখিত প্রস্তাব দিই।"
            : "If none of the tiers fit, send a short brief on WhatsApp. We reply with a written proposal."}
        </p>
        <a
          href={whatsappLink(
            locale === "bn"
              ? "হ্যালো মার্কেটিভিটি, আমার একটি কাস্টম ব্রিফ আছে।"
              : "Hello Marketivity, I have a custom brief."
          )}
          className="mt-5 inline-flex rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white"
        >
          {locale === "bn" ? "হোয়াটসঅ্যাপে লিখুন" : "WhatsApp the brief"}
        </a>
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
                  <p className="px-5 pb-4 text-sm leading-relaxed text-brand-muted">
                    {item.a[locale]}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
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
    <div className="mt-8 grid gap-5 lg:grid-cols-3">
      {category.tiers.map((tier) => (
        <article
          key={tier.id}
          className={`flex h-full flex-col rounded-3xl border bg-white p-6 shadow-soft-md ${
            tier.popular
              ? "border-brand-orange ring-2 ring-brand-orange/30"
              : "border-brand-charcoal/10"
          }`}
        >
          {tier.popular ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-orange">
              {locale === "bn" ? "সবচেয়ে বেশি নেওয়া হয়" : "Most chosen"}
            </p>
          ) : (
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-muted">
              {category.model[locale]}
            </p>
          )}
          <h3 className="text-xl font-bold text-brand-charcoal">{tier.name[locale]}</h3>
          <p className="mt-2 text-3xl font-extrabold text-brand-purple">
            {formatTierPrice(tier, locale)}
          </p>
          <p className="mt-3 text-sm text-brand-muted">{tier.bestFor[locale]}</p>
          <p className="mt-2 text-xs font-semibold text-brand-charcoal">
            {tier.timeline[locale]}
          </p>
          <ul className="mt-5 flex-1 space-y-2">
            {tier.includes[locale].map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-brand-charcoal">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(
              locale === "bn"
                ? `হ্যালো মার্কেটিভিটি, আমি ${category.name.bn} — ${tier.name.bn} নিয়ে একটি ফ্রি কল বুক করতে চাই।`
                : `Hello Marketivity, I would like to book a free call about ${category.name.en} — ${tier.name.en}.`
            )}
            className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold ${
              tier.popular
                ? "bg-brand-orange text-white"
                : "border border-brand-orange text-brand-orange"
            }`}
          >
            {locale === "bn" ? "ফ্রি কল বুক করুন" : "Book a free call"}
          </a>
        </article>
      ))}
    </div>
  );
}
