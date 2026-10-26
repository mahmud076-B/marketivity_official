import Image from "next/image";
import { clientNames, proofCopy, proofHeadlines } from "@/lib/campaigns";
import type { Locale } from "@/lib/site";

const logos = Array.from({ length: 18 }, (_, index) => index + 1);

export default function TrustStrip({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-brand-charcoal/10 bg-white">
      <div className="safe-px mx-auto max-w-7xl py-8 sm:py-10">
        <h2 id="trust-heading" className="text-center text-lg font-bold text-brand-charcoal sm:text-xl">
          {proofCopy.clientsLabel[locale]}
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-relaxed text-brand-muted">
          {proofCopy.clientsNote[locale]}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3" aria-hidden="true">
          {logos.map((id) => (
            <li
              key={id}
              className="h-14 w-14 overflow-hidden rounded-full border border-brand-charcoal/10 bg-white sm:h-16 sm:w-16"
            >
              <Image
                src={`/clients/${id}.webp`}
                alt=""
                width={64}
                height={64}
                sizes="64px"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {proofHeadlines.map((item) => (
            <div key={item.value} className="rounded-2xl border border-brand-charcoal/10 bg-brand-offwhite px-3 py-4 text-center">
              <dt className="text-xs leading-snug text-brand-muted">{item.label[locale]}</dt>
              <dd className="mt-1 text-xl font-bold text-brand-charcoal sm:text-2xl">{item.value}</dd>
            </div>
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
  );
}
