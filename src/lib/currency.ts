export const CURRENCY_COOKIE = "marketivity-currency";

export type Currency = "USD" | "GBP" | "BDT";

export function isCurrency(value: string | null | undefined): value is Currency {
  return value === "USD" || value === "GBP" || value === "BDT";
}

/** BD → BDT, GB → GBP, everyone else (including an unknown country) → USD. */
export function currencyFromCountry(country: string | null | undefined): Currency {
  const code = country?.trim().toUpperCase();
  if (code === "BD") return "BDT";
  if (code === "GB") return "GBP";
  return "USD";
}

/** A saved choice wins. Otherwise the country header decides. */
export function currencyFromRequest(
  saved: string | null | undefined,
  country: string | null | undefined,
): Currency {
  if (isCurrency(saved)) return saved;
  return currencyFromCountry(country);
}
