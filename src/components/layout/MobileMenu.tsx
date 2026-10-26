"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "@/components/ui/LanguageToggle";
type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/work", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/blog", key: "blog" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col bg-brand-offwhite safe-pt safe-pb"
        >
          {/* Header Bar */}
          <div className="safe-px flex items-center justify-between border-b border-brand-charcoal/10 py-4 bg-white/80 backdrop-blur-md">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <Image
                src="/brand/logo.webp"
                alt={tc("brand")}
                width={148}
                height={128}
                sizes="36px"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <button
                type="button"
                onClick={onClose}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-full border border-brand-charcoal/15 bg-white text-brand-charcoal shadow-soft-sm active:scale-95 transition-transform"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="safe-px flex flex-1 flex-col justify-center gap-1.5 py-6 overflow-y-auto">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="touch-target flex items-center justify-between rounded-xl px-4 py-3 text-xl font-bold text-brand-charcoal transition-all hover:bg-brand-orange/10 hover:text-brand-orange active:bg-brand-orange/15"
                >
                  <span>{t(item.key)}</span>
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="safe-px flex flex-col items-center gap-3 border-t border-brand-charcoal/10 bg-white/80 py-4">
            <Link href="/contact" onClick={onClose} className="btn-primary w-full">
              {tc("bookCall")}
            </Link>
            <a
              href="https://wa.me/8801767644696?text=Hello%20Marketivity%2C%20I%20would%20like%20to%20book%20a%20free%20call."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {tc("whatsappChat")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
