"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhatsAppFloat() {
  const tc = useTranslations("common");

  return (
    <a
      href="https://wa.me/8801767644696?text=Hello%20Marketivity%2C%20I%20would%20like%20to%20book%20a%20free%20call."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#075E54] text-white shadow-lg"
      aria-label={tc("whatsapp")}
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
