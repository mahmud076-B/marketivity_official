import type { Metadata } from "next";
import { site, type Locale } from "@/lib/site";

type PageMetaInput = {
  locale: Locale;
  /** Path after the locale, starting with "/" or "" for home. */
  path?: string;
  title: string;
  description: string;
};

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: PageMetaInput): Metadata {
  const suffix = path.startsWith("/") || path === "" ? path : `/${path}`;
  const canonical = `${site.url}/${locale}${suffix}`;

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${site.url}/en${suffix}`,
        bn: `${site.url}/bn${suffix}`,
        "x-default": `${site.url}/en${suffix}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "bn" ? "bn_BD" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneTel,
    foundingDate: "2025-07",
    founder: {
      "@type": "Person",
      name: "S M Mahmud Hasan",
      sameAs: [site.github],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Padma R/A, Chandrima",
      addressLocality: "Rajshahi",
      addressCountry: "BD",
    },
    sameAs: [site.facebook, site.instagram, site.github],
  };
}
