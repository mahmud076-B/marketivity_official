function ClientLogoPlaceholder({ index }: { index: number }) {
  const variants = [
    "M12 2L2 22h20L12 2z",
    "M4 4h16v16H4z",
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M2 12h20M12 2v20",
    "M4 8l8-6 8 6v12H4V8z",
    "M6 6h12v12H6z",
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-24 text-brand-charcoal/20"
      fill="currentColor"
      aria-hidden
    >
      <path d={variants[index % variants.length]} />
    </svg>
  );
}

export default function LogoMarquee() {
  const logos = Array.from({ length: 12 }, (_, i) => i);
  const doubled = [...logos, ...logos];

  return (
    <section className="overflow-hidden bg-white py-10">
      <div className="flex animate-marquee-reverse items-center">
        {doubled.map((i, idx) => (
          <div
            key={idx}
            className="mx-10 flex shrink-0 items-center justify-center opacity-60 grayscale"
          >
            <ClientLogoPlaceholder index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
