import type { Metadata } from "next";
import { site, type Locale } from "@/lib/site";

type PageMetaInput = {
  locale: Locale;
  /** Path after the locale, starting with "/" or "" for home. */
  path?: string;
  title: string;
  description: string;
  image?: string;
};

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image,
}: PageMetaInput): Metadata {
  const suffix = path.startsWith("/") || path === "" ? path : `/${path}`;
  const canonical = `${site.url}/${locale}${suffix}`;
  const ogImage = image ? `${site.url}${image}` : undefined;

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
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
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
    description:
      "Marketivity builds custom software, designs and develops websites, and runs digital marketing — Meta, Facebook and Instagram ads — for businesses in the UK and the USA.",
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
    sameAs: [site.facebook, site.instagram, site.linkedin, site.github],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: ["marketivity", site.domain],
    url: `${site.url}/`,
  };
}
