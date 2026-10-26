"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  formatExtraPrice,
  formatTierPrice,
  getCategory,
  priceTrust,
  startingPriceLabel,
  type Currency,
  type Extra,
  type Tier,
} from "@/lib/pricing";
import { whatsappLink, type Locale } from "@/lib/site";

const STORAGE_KEY = "marketivity-currency";

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}>({
  currency: "USD",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "USD" || saved === "GBP") {
        setCurrencyState(saved);
        return;
      }
      const lang = navigator.language.toLowerCase();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (lang === "en-gb" || lang.startsWith("en-gb") || timeZone === "Europe/London") {
        setCurrencyState("GBP");
      }
    } catch {
      /* keep USD */
    }
  }, []);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore private mode */
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyToggle({ locale }: { locale: Locale }) {
  const { currency, setCurrency } = useCurrency();
  const label = locale === "bn" ? "মুদ্রা" : "Currency";

  return (
    <div className="inline-flex rounded-full border border-brand-charcoal/15 bg-white p-1" role="group" aria-label={label}>
      {(["USD", "GBP"] as const).map((code) => {
        const selected = currency === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            onClick={() => setCurrency(code)}
            className={`min-h-11 min-w-14 rounded-full px-4 text-sm font-bold ${
              selected ? "bg-brand-orange text-brand-charcoal" : "text-brand-muted"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export function TierPrice({ tier, locale }: { tier: Tier; locale: Locale }) {
  const { currency } = useCurrency();
  return <>{formatTierPrice(tier, locale, currency)}</>;
}

export function ExtraPrice({ extra, locale }: { extra: Extra; locale: Locale }) {
  const { currency } = useCurrency();
  return <>{formatExtraPrice(extra, locale, currency)}</>;
}

export function StartingPrice({
  slug,
  locale,
  className,
}: {
  slug: string;
  locale: Locale;
  className?: string;
}) {
  const { currency } = useCurrency();
  const category = getCategory(slug);
  if (!category) return null;
  return <span className={className}>{startingPriceLabel(category, locale, currency)}</span>;
}

export function BangladeshPriceNote({ locale }: { locale: Locale }) {
  if (locale !== "bn") return null;
  return (
    <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-brand-charcoal">
      বাংলাদেশের ক্লায়েন্টদের জন্য টাকায় প্যাকেজ জানতে{" "}
      <a
        href={whatsappLink("হ্যালো মার্কেটিভিটি, টাকায় প্যাকেজ জানতে চাই।")}
        className="font-bold text-brand-ink underline"
      >
        WhatsApp-এ যোগাযোগ করুন
      </a>
    </p>
  );
}

export function PriceTrust({ locale }: { locale: Locale }) {
  return (
    <ul className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-2">
      {priceTrust.map((line) => (
        <li
          key={line.en}
          className="rounded-2xl border border-brand-charcoal/10 bg-white px-4 py-3 text-sm leading-relaxed text-brand-charcoal"
        >
          {line[locale]}
        </li>
      ))}
    </ul>
  );
}
