"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";

export const CONSENT_KEY = "marketivity-consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("marketivity-consent", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("marketivity-consent", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(CONSENT_KEY);
}

function getServerSnapshot() {
  return "pending";
}

export default function CookieConsent({ locale }: { locale: "en" | "bn" }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function choose(value: "granted" | "denied") {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("marketivity-consent"));
  }

  if (stored === "pending" || stored === "granted" || stored === "denied") return null;

  const copy =
    locale === "bn"
      ? {
          text: "আমরা সাইট চালাতে প্রয়োজনীয় কুকি ব্যবহার করি। বিশ্লেষণ (GA4) ও মেটা পিক্সেল শুধু আপনার সম্মতিতে লোড হয়, এবং আইডি সেট না থাকলে কিছু লোড হয় না।",
          accept: "গ্রহণ করুন",
          reject: "প্রত্যাখ্যান",
          privacy: "গোপনীয়তা নীতি",
        }
      : {
          text: "We use essential cookies to run the site. Analytics (GA4) and the Meta Pixel load only after you accept, and they stay off when their IDs are not set.",
          accept: "Accept",
          reject: "Reject",
          privacy: "Privacy policy",
        };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] safe-px pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-brand-charcoal/10 bg-white p-4 shadow-soft-lg sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-brand-muted">
          {copy.text}{" "}
          <Link href="/privacy" className="font-semibold text-brand-orange">
            {copy.privacy}
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-brand-charcoal/15 px-4 py-2 text-sm font-semibold text-brand-charcoal"
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
