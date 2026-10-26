import { Megaphone, MessagesSquare, Eye, Wallet, ThumbsUp } from "lucide-react";
import { createElement } from "react";
import { proofHeadlines } from "@/lib/campaigns";
import type { Locale } from "@/lib/site";

export type StatItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const icons = [Wallet, Megaphone, Eye, MessagesSquare, ThumbsUp];

export function createStatItems(locale: Locale): StatItem[] {
  return proofHeadlines.map((item, index) => ({
    icon: createElement(icons[index] ?? Megaphone, { className: "h-5 w-5" }),
    value: item.value,
    label: item.label[locale],
  }));
}
