import { Users, Megaphone, Award, Trophy, TrendingUp, BarChart3, Funnel } from "lucide-react";

export type StatItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

export function createStatItems(t: (key: string) => string): StatItem[] {
  return [
    { icon: <Users className="h-5 w-5" />, value: "50+", label: t("clients") },
    {
      icon: <Megaphone className="h-5 w-5" />,
      value: "144+",
      label: t("campaigns"),
    },
    {
      icon: <Award className="h-5 w-5" />,
      value: "100%",
      label: t("recommended"),
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      value: "Best in Bangladesh",
      label: "",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: "5.2x",
      label: t("roas"),
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      value: "100%",
      label: t("dataDriven"),
    },
    {
      icon: <Funnel className="h-5 w-5" />,
      value: "Full-Funnel",
      label: t("growth"),
    },
  ];
}
