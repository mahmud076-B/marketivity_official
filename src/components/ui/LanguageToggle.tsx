"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "bn" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="touch-target inline-flex items-center justify-center rounded-full border border-brand-charcoal/15 bg-white px-3 py-1.5 text-sm font-semibold text-brand-charcoal transition-colors hover:border-brand-orange hover:text-brand-orange"
      aria-label={`Switch to ${locale === "en" ? "Bengali" : "English"}`}
    >
      {locale === "en" ? "বাং" : "EN"}
    </button>
  );
}
