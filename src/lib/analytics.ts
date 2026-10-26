export const DEFAULT_GA_ID = "G-HBCP7WF7SB";

const GA_PATTERN = /^G-[A-Z0-9]+$/i;

/** Env measurement ID when it is a GA4 id, otherwise the site default. */
export function gaMeasurementId(configured = process.env.NEXT_PUBLIC_GA_ID) {
  const value = configured?.trim() ?? "";
  return GA_PATTERN.test(value) ? value : DEFAULT_GA_ID;
}

type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, params?: Record<string, string>) => void;
};

/** No-ops until the consent-gated gtag snippet has run. */
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as AnalyticsWindow).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
