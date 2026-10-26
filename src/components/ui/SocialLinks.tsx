import type { ComponentType } from "react";
import { MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { site } from "@/lib/site";

type Network = "facebook" | "instagram" | "linkedin" | "whatsapp";

const items: {
  id: Network;
  href: string;
  label: string;
  text: string;
  icon: ComponentType<{ className?: string }>;
  pill: string;
  circle: string;
}[] = [
  {
    id: "facebook",
    href: site.facebook,
    label: "Facebook",
    text: "Facebook",
    icon: FacebookIcon,
    pill: "bg-[#1877F2] text-white",
    circle:
      "bg-white text-brand-charcoal shadow-soft-sm hover:bg-brand-orange hover:text-white",
  },
  {
    id: "instagram",
    href: site.instagram,
    label: "Instagram",
    text: "Instagram",
    icon: InstagramIcon,
    pill: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    circle:
      "bg-white text-brand-charcoal shadow-soft-sm hover:bg-brand-orange hover:text-white",
  },
  {
    id: "linkedin",
    href: site.linkedin,
    label: "Marketivity on LinkedIn",
    text: "LinkedIn",
    icon: LinkedInIcon,
    pill: "bg-[#0A66C2] text-white",
    circle:
      "bg-white text-brand-charcoal shadow-soft-sm hover:bg-brand-orange hover:text-white",
  },
  {
    id: "whatsapp",
    href: site.whatsapp,
    label: "WhatsApp",
    text: "WhatsApp",
    icon: MessageCircle,
    pill: "bg-[#075E54] text-white",
    circle: "bg-[#075E54] text-white",
  },
];

export default function SocialLinks({
  variant = "circles",
  networks = ["facebook", "instagram", "linkedin", "whatsapp"],
}: {
  variant?: "circles" | "pills";
  networks?: Network[];
}) {
  const visible = items.filter((item) => networks.includes(item.id));

  if (variant === "pills") {
    return (
      <div className="flex flex-wrap gap-3">
        {visible.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`touch-target inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${item.pill}`}
            >
              <Icon className="h-4 w-4" />
              {item.text}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {visible.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`touch-target flex h-10 w-10 items-center justify-center rounded-full transition-colors ${item.circle}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
