import Image from "next/image";

export default function LogoMarquee() {
  const logos = Array.from({ length: 18 }, (_, i) => i + 1);
  const doubled = [...logos, ...logos];

  const renderTrack = (animationClass: string, keyPrefix: string) => (
    <div className={`flex w-max items-center will-change-transform ${animationClass}`}>
      {doubled.map((i, idx) => (
        <div
          key={`${keyPrefix}-${i}-${idx}`}
          className="mx-8 flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-charcoal/10 bg-white shadow-soft-sm sm:mx-12 sm:h-[84px] sm:w-[84px]"
        >
          <Image
            src={`/${i}.svg`}
            alt=""
            width={144}
            height={144}
            className="h-full w-full scale-125 object-cover"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden bg-white py-8 sm:py-10">
      <div className="space-y-4 sm:space-y-5">
        {renderTrack("animate-logo-marquee-reverse", "top")}
        {renderTrack("animate-logo-marquee", "bottom")}
      </div>
    </section>
  );
}
