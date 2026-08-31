"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "@/components/ui/LanguageToggle";
import FacebookBadge from "@/components/ui/FacebookBadge";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services/seo", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/blog", key: "blog" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const tfb = useTranslations("facebookBadge");

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
                src="/logo/marketivity-logo.png"
                alt={tc("brand")}
                width={140}
                height={40}
                className="h-8 w-auto"
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
          <div className="safe-px flex flex-col items-center gap-3.5 border-t border-brand-charcoal/10 py-5 bg-white/60">
            <FacebookBadge
              recommended={tfb("recommended")}
              onFacebook={tfb("onFacebook")}
              size="sm"
            />
            <a
              href="https://wa.me/8801767644696"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-bold text-white shadow-soft-md hover:brightness-105 active:scale-95 transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              {tc("whatsapp")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
