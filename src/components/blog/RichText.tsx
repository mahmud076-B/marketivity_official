import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const label = match[1] ?? "";
    const href = match[2] ?? "";
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={`${href}-${index}`} href={href} className="font-semibold text-brand-ink underline decoration-brand-orange/70 underline-offset-2">
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${href}-${index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-ink underline decoration-brand-orange/70 underline-offset-2"
        >
          {label}
        </a>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
