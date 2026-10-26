"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MobileMenu from "./MobileMenu";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 h-16 w-full transition-colors duration-300 safe-pt ${
          scrolled
            ? "border-b border-brand-charcoal/10 bg-white/90 shadow-soft-sm backdrop-blur-xl"
            : "bg-brand-offwhite/80 backdrop-blur-md"
        }`}
      >
        <div className="safe-px mx-auto flex h-full max-w-7xl items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/brand/logo.webp"
              alt={tc("brand")}
              width={148}
              height={128}
              sizes="42px"
              preload
              className="h-8 w-auto object-contain md:h-9"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/5 shadow-soft-sm">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="touch-target rounded-full px-4 py-2 text-sm font-semibold text-brand-charcoal/85 transition-all duration-200 hover:text-brand-orange hover:bg-brand-orange/5 relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-brand-orange transition-all duration-300 group-hover:w-4" />
              </Link>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/contact" className="btn-primary hidden px-4 py-2 text-sm lg:inline-flex">
              {tc("bookCall")}
            </Link>
            <div className="flex items-center">
              <LanguageToggle />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="touch-target flex items-center justify-center rounded-full border border-brand-charcoal/15 bg-white/90 backdrop-blur-sm text-brand-charcoal p-2.5 lg:hidden hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-200 active:scale-95"
              aria-label={t("menu")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
