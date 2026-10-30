import Image from "next/image";
import { RichText } from "@/components/blog/RichText";

type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "takeaways"; items: string[] }
  | { kind: "figure"; src: string; alt: string; caption: string };

function parseBody(source: string): Block[] {
  const blocks: Block[] = [];
  const chunks = source.trim().split(/\n{2,}/);
  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trimEnd());
    const first = lines[0]?.trim() ?? "";
    if (first.startsWith(":::takeaways")) {
      const items = lines
        .slice(1)
        .map((line) => line.trim())
        .filter((line) => line.startsWith("- "))
        .map((line) => line.slice(2));
      blocks.push({ kind: "takeaways", items });
      continue;
    }
    if (first.startsWith(":::figure")) {
      const rows = lines.map((line) => line.trim()).filter((line) => line && line !== ":::");
      const src = rows[1] ?? "";
      const alt = rows[2] ?? "";
      const caption = rows.slice(3).join(" ");
      blocks.push({ kind: "figure", src, alt, caption });
      continue;
    }
    if (first.startsWith("## ")) {
      blocks.push({ kind: "h2", text: first.slice(3).trim() });
      continue;
    }
    if (first.startsWith("### ")) {
      blocks.push({ kind: "h3", text: first.slice(4).trim() });
      continue;
    }
    if (lines.every((line) => line.trim().startsWith("- "))) {
      blocks.push({
        kind: "ul",
        items: lines.map((line) => line.trim().slice(2)),
      });
      continue;
    }
    blocks.push({ kind: "p", text: lines.join(" ").trim() });
  }
  return blocks;
}

export function PostBody({ source }: { source: string }) {
  const blocks = parseBody(source);
  return (
    <div className="space-y-5 text-[1.05rem] leading-8 text-brand-charcoal/85">
      {blocks.map((block, index) => {
        if (block.kind === "h2") {
          return (
            <h2 key={index} className="pt-6 text-2xl font-extrabold tracking-tight text-brand-charcoal">
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3 key={index} className="pt-2 text-xl font-bold text-brand-charcoal">
              {block.text}
            </h3>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === "takeaways") {
          return (
            <aside key={index} className="rounded-3xl border border-brand-orange/30 bg-brand-offwhite px-5 py-5 sm:px-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange">Key takeaways</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-charcoal">
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            </aside>
          );
        }
        if (block.kind === "figure") {
          const svg = block.src.endsWith(".svg");
          return (
            <figure key={index} className="overflow-hidden rounded-3xl border border-brand-charcoal/10 bg-brand-offwhite">
              {svg ? (
                // SVG diagrams are authored by us. next/image does not rasterise them.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={block.src} alt={block.alt} className="h-auto w-full" />
              ) : (
                <Image src={block.src} alt={block.alt} width={1200} height={750} quality={68} className="h-auto w-full" />
              )}
              {block.caption ? (
                <figcaption className="px-4 py-3 text-sm leading-6 text-brand-muted">
                  <RichText text={block.caption} />
                </figcaption>
              ) : null}
            </figure>
          );
        }
        return (
          <p key={index}>
            <RichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
