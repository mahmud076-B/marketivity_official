import Image from "next/image";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serviceCategories } from "@/lib/pricing";
import { isLocale, site } from "@/lib/site";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const localeParam = await getLocale();
  const locale = isLocale(localeParam) ? localeParam : "en";

  const quickLinks = [
    { href: "/about", label: tn("about") },
    { href: "/portfolio", label: tn("portfolio") },
    { href: "/pricing", label: tn("pricing") },
    { href: "/blog", label: tn("blog") },
    { href: "/careers", label: tn("careers") },
    { href: "/contact", label: tn("contact") },
  ];

  return (
    <footer className="relative bg-brand-offwhite text-brand-charcoal safe-pb overflow-hidden">
      {/* Subtle Top Border Gradient */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />

      <div className="safe-px mx-auto max-w-7xl py-14 md:py-20 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <Image
              src="/Marketivity_Exact_Logo_Web_Assets/Marketivity_logo_exact.svg"
              alt={tc("brand")}
              width={45}
              height={39}
              className="mb-4 h-9 w-auto object-contain"
            />
            <p className="mb-2 text-sm font-semibold text-brand-orange">{tc("tagline")}</p>
            <p className="mb-5 text-sm leading-relaxed text-brand-charcoal/65">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-brand-charcoal tracking-wide">{t("quickLinks")}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-charcoal/70 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-base font-bold text-brand-charcoal tracking-wide">{t("services")}</h3>
            <ul className="space-y-2.5">
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="text-sm text-brand-charcoal/70 transition-colors hover:text-brand-orange"
                  >
                    {category.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-base font-bold text-brand-charcoal tracking-wide">{t("contact")}</h3>
            <ul className="space-y-3.5 text-sm text-brand-charcoal/70">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <a
                  href="mailto:marketivitybd@gmail.com"
                  className="hover:text-brand-orange transition-colors"
                >
                  marketivitybd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <a
                  href="https://wa.me/8801767644696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span>{tc("addressValue")}</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com/marketivitybd"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-charcoal shadow-soft-sm transition-colors hover:bg-brand-orange hover:text-white"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/marketivitybd"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-charcoal shadow-soft-sm transition-colors hover:bg-brand-orange hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/8801767644696"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-brand-charcoal/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-charcoal/55">
          <p>© {new Date().getFullYear()} {tc("brand")}. {tc("allRightsReserved")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-orange">{locale === "bn" ? "গোপনীয়তা" : "Privacy"}</Link>
            <Link href="/terms" className="hover:text-brand-orange">{locale === "bn" ? "শর্তাবলি" : "Terms"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
