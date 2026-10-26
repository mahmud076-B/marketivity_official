import Image from "next/image";
import type { Locale } from "@/lib/site";

const logos = Array.from({ length: 18 }, (_, index) => index + 1);

const title = {
  en: "Trusted by growing brands",
  bn: "ক্রমবর্ধমান ব্র্যান্ডের আস্থা",
} as const;

function Track({ reverse = false }: { reverse?: boolean }) {
  const copies = [0, 1];

  return (
    <div className="logo-viewport">
      <ul className={`logo-track ${reverse ? "logo-track-reverse" : ""}`}>
        {copies.map((copy) =>
          logos.map((id) => (
            <li
              key={`${reverse ? "rev" : "fwd"}-${copy}-${id}`}
              className="logo-item"
              data-clone={copy === 1 ? "" : undefined}
              aria-hidden={copy === 1 ? true : undefined}
            >
              <Image
                src={`/clients/${id}.webp`}
                alt=""
                width={144}
                height={144}
                sizes="76px"
                className="h-full w-full object-cover"
              />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export default function LogoMarquee({
  locale,
  note,
}: {
  locale: Locale;
  note?: string;
}) {
  return (
    <section className="logo-marquee border-y border-brand-charcoal/8 bg-white py-8 sm:py-10" aria-labelledby="logo-marquee-heading">
      <div className="safe-px mx-auto max-w-3xl text-center">
        <h2 id="logo-marquee-heading" className="text-sm font-bold uppercase tracking-[0.18em] text-brand-purple">
          {title[locale]}
        </h2>
        {note ? <p className="mt-2 text-xs leading-relaxed text-brand-muted">{note}</p> : null}
      </div>
      <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
        <Track reverse />
        <div className="logo-row-secondary">
          <Track />
        </div>
      </div>
    </section>
  );
}
