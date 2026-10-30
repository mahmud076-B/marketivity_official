"use client";

import { createContext, useContext, useState } from "react";
import {
  CURRENCY_COOKIE,
  type Currency,
} from "@/lib/currency";
import {
  formatExtraPrice,
  formatTierPrice,
  getCategory,
  priceTrust,
  startingPriceLabel,
  type Extra,
  type Tier,
} from "@/lib/pricing";
import type { Locale } from "@/lib/site";

const CURRENCIES = ["USD", "GBP", "BDT"] as const;

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}>({
  currency: "USD",
  setCurrency: () => {},
});

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency: Currency;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    document.cookie = `${CURRENCY_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
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

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className="grid w-full max-w-lg grid-cols-3 gap-1 rounded-2xl border-2 border-brand-charcoal/15 bg-white p-1.5 shadow-sm"
      role="group"
      aria-label="Currency"
    >
      {CURRENCIES.map((code) => {
        const selected = currency === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            onClick={() => setCurrency(code)}
            className={`min-h-14 rounded-xl text-lg font-extrabold tracking-wide ${
              selected ? "bg-brand-orange text-brand-charcoal" : "text-brand-muted hover:text-brand-charcoal"
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
