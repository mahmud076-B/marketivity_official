import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { PortfolioItem, PortfolioTab } from "@/lib/portfolio-items";
import type { Locale } from "@/lib/site";

const visitLabel: Record<Locale, Record<"site" | "demo", string>> = {
  en: { site: "Visit site", demo: "Live demo" },
  bn: { site: "সাইট দেখুন", demo: "লাইভ ডেমো" },
};

export default function PortfolioCard({
  item,
  locale,
  index = 0,
  teaserTab,
}: {
  item: PortfolioItem;
  locale: Locale;
  index?: number;
  /** Home teaser: the whole card links to this portfolio tab. */
  teaserTab?: PortfolioTab;
}) {
  const wide = !teaserTab && item.tab === "websites";

  const media = (
    <div className={`relative aspect-[16/10] overflow-hidden bg-brand-offwhite ${wide ? "md:aspect-auto md:min-h-[320px]" : ""}`}>
      <Image
        src={item.cover}
        alt={item.coverAlt[locale]}
        fill
        sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
        className="portfolio-shot object-cover"
      />
    </div>
  );

  const title = item.client?.[locale] ?? item.name;

  const body = (
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-purple">{item.kind[locale]}</p>
      <div className="mt-2 flex items-center gap-3">
        {item.logo ? (
          <Image
            src={item.logo}
            alt=""
            width={112}
            height={112}
            sizes="56px"
            className="h-14 w-14 shrink-0 rounded-2xl border border-brand-charcoal/10 bg-white object-contain p-1 ring-1 ring-brand-charcoal/10"
          />
        ) : null}
        <div className="min-w-0">
          <h3 className="text-2xl font-bold tracking-tight text-brand-charcoal">{title}</h3>
          {item.campaign ? (
            <p className="mt-1 text-sm text-brand-muted">
              {locale === "bn" ? "ক্যাম্পেইন" : "Campaign"}: {item.campaign}
            </p>
          ) : null}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.summary[locale]}</p>
      <p className="mt-4 text-sm leading-relaxed text-brand-charcoal">
        <span className="font-bold">{item.stackLabel[locale]}: </span>
        {item.stack[locale]}
      </p>
      {item.results ? (
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {item.results.map((result, resultIndex) => (
            <div
              key={result.label.en}
              className={`rounded-2xl bg-brand-offwhite px-3 py-3 ${
                item.results && item.results.length % 2 === 1 && resultIndex === item.results.length - 1
                  ? "col-span-2"
                  : ""
              }`}
            >
              <dt className="text-xs font-medium text-brand-muted">{result.label[locale]}</dt>
              <dd className="mt-1 font-bold text-brand-charcoal">{result.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {item.resultNote ? (
        <p className="mt-4 text-xs leading-relaxed text-brand-muted">{item.resultNote[locale]}</p>
      ) : null}
      {item.visit && !teaserTab ? (
        <a
          href={item.visit.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-brand-ink underline"
        >
          {visitLabel[locale][item.visit.kind]}
          <span className="sr-only">: {item.name}</span>
        </a>
      ) : null}
      {teaserTab ? (
        <span className="mt-5 text-sm font-bold text-brand-ink underline">
          {locale === "bn" ? "পোর্টফোলিওতে দেখুন" : "View in the portfolio"}
        </span>
      ) : null}
    </div>
  );

  const card = (
    <article
      id={teaserTab ? undefined : item.id}
      className={`portfolio-card surface-card scroll-mt-28 overflow-hidden ${
        wide ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      {media}
      {body}
    </article>
  );

  return (
    <ScrollReveal delay={index * 0.08} className={`h-full ${wide ? "sm:col-span-2" : ""}`}>
      {teaserTab ? (
        <Link
          href={{ pathname: "/portfolio", query: { tab: teaserTab }, hash: item.id }}
          className="block h-full rounded-3xl"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </ScrollReveal>
  );
}
