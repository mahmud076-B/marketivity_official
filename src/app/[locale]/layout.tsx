import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { Poppins, Hind_Siliguri } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Analytics from "@/components/consent/Analytics";
import { CurrencyProvider } from "@/components/pricing/currency";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { currencyFromRequest, CURRENCY_COOKIE } from "@/lib/currency";
import { isLocale, site } from "@/lib/site";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
  preload: true,
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#F7931E",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const safe = isLocale(locale) ? locale : "en";

  return {
    metadataBase: new URL(site.url),
    title: messages.metadata.title,
    description: messages.metadata.description,
    alternates: {
      canonical: `${site.url}/${safe}`,
      languages: {
        en: `${site.url}/en`,
        bn: `${site.url}/bn`,
        "x-default": `${site.url}/en`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: messages.metadata.title,
      description: messages.metadata.description,
      locale: safe === "bn" ? "bn_BD" : "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "bn")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const savedCurrency = (await cookies()).get(CURRENCY_COOKIE)?.value;
  const country = (await headers()).get("x-vercel-ip-country");
  const initialCurrency = currencyFromRequest(savedCurrency, country);

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${hindSiliguri.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-brand-offwhite font-sans text-brand-charcoal">
        <NextIntlClientProvider messages={messages}>
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","z3sxw85xvg");`}
          </Script>
          <CurrencyProvider initialCurrency={initialCurrency}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
          />
          <a href="#content" className="skip-link">
            {locale === "bn" ? "মূল অংশে যান" : "Skip to content"}
          </a>
          <Header />
          <main id="content" className="flex-1 pt-16">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Analytics />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=1433606852275637&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
