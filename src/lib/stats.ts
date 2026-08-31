import { Users, Megaphone, Award, Trophy } from "lucide-react";
import { createElement } from "react";

export type StatItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

export function createStatItems(
  t: (key: string) => string
): StatItem[] {
  return [
    {
      icon: createElement(Users, { className: "h-5 w-5" }),
      value: "20+",
      label: t("clients"),
    },
    {
      icon: createElement(Megaphone, { className: "h-5 w-5" }),
      value: "35+",
      label: t("campaigns"),
    },
    {
      icon: createElement(Award, { className: "h-5 w-5" }),
      value: "100%",
      label: t("recommended"),
    },
    {
      icon: createElement(Trophy, { className: "h-5 w-5" }),
      value: "Top 3",
      label: t("ranking"),
    },
  ];
}
