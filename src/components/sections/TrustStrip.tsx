import { clientNames, proofCopy, proofHeadlines } from "@/lib/campaigns";
import type { Locale } from "@/lib/site";
import ScrollReveal from "@/components/motion/ScrollReveal";
import LogoMarquee from "@/components/sections/LogoMarquee";

export default function TrustStrip({ locale }: { locale: Locale }) {
  return (
    <>
      <LogoMarquee locale={locale} note={proofCopy.clientsNote[locale]} />
      <section aria-labelledby="trust-heading" className="safe-px bg-white">
      <div className="mx-auto max-w-7xl py-8 sm:py-10">
        <h2 id="trust-heading" className="text-center text-lg font-bold text-brand-charcoal sm:text-xl">
          {proofCopy.clientsLabel[locale]}
        </h2>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {proofHeadlines.map((item, index) => (
            <ScrollReveal key={item.value} delay={index * 0.07} className="h-full">
              <div className="surface-card surface-tint h-full px-3 py-4 text-center shadow-none">
                <dt className="text-xs leading-snug text-brand-muted">{item.label[locale]}</dt>
                <dd className="mt-1 text-xl font-bold text-brand-charcoal sm:text-2xl">{item.value}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-relaxed text-brand-muted">
          {proofCopy.source[locale]}
        </p>

        <details className="mx-auto mt-6 max-w-4xl rounded-2xl border border-brand-charcoal/10 bg-brand-offwhite px-4 py-3">
          <summary className="cursor-pointer text-sm font-semibold text-brand-charcoal">
            {locale === "bn" ? "ক্যাম্পেইনের নামগুলো" : "Names from the campaigns"}
          </summary>
          <ul className="mt-3 flex flex-wrap gap-2">
            {clientNames.map((name) => (
              <li
                key={name}
                lang={/[\u0980-\u09FF]/.test(name) ? "bn" : undefined}
                className="rounded-full border border-brand-charcoal/10 bg-white px-3 py-1 text-sm text-brand-charcoal"
              >
                {name}
              </li>
            ))}
          </ul>
        </details>
      </div>
      </section>
    </>
  );
}
