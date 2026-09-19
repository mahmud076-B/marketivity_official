"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MobileMenu from "./MobileMenu";
import MagneticButton from "@/components/motion/MagneticButton";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/services/seo", key: "services" },
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
        className={`fixed w-full top-0 z-50 transition-all duration-300 safe-pt ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-soft-md border-b border-white/40 py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="safe-px mx-auto flex max-w-7xl items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Marketivity_Exact_Logo_Web_Assets/Marketivity_logo_exact.svg"
                alt={tc("brand")}
                width={42}
                height={37}
                className="h-8 w-auto object-contain transition-opacity group-hover:opacity-95 md:h-9"
                priority
              />
            </div>
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
          <div className="flex items-center gap-2.5 sm:gap-3">
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
