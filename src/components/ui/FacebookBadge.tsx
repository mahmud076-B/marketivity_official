import { ThumbsUp } from "lucide-react";

type FacebookBadgeProps = {
  recommended: string;
  onFacebook: string;
  size?: "sm" | "md";
  className?: string;
};

export default function FacebookBadge({
  recommended,
  onFacebook,
  size = "md",
  className = "",
}: FacebookBadgeProps) {
  const sizeClasses =
    size === "sm" ? "text-xs px-2 py-1 gap-1" : "text-sm px-3 py-1.5 gap-1.5";

  return (
    <a
      href="https://facebook.com/marketivitybd"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-full bg-[#1877F2] font-semibold text-white transition-opacity hover:opacity-90 ${sizeClasses} ${className}`}
    >
      <ThumbsUp className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      <span>{recommended}</span>
      <span className="opacity-80">{onFacebook}</span>
    </a>
  );
}
