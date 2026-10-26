import { getTranslations } from "next-intl/server";

const stages = ["traffic", "leads", "sales", "scale"] as const;

export default async function InteractiveGrowthFunnel() {
  const t = await getTranslations("home.growthFunnel");

  return (
    <div className="surface-card mx-auto w-full max-w-[580px] p-4 sm:p-6">
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-purple">{t("subtitle")}</h2>
      <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stages.map((key, index) => (
          <li
            key={key}
            className={`rounded-2xl border p-4 text-left ${
              index % 2 === 0
                ? "border-brand-orange/20 bg-brand-orange/5"
                : "border-brand-purple/15 bg-brand-purple/5"
            }`}
          >
            <p className="text-xs font-bold text-brand-ink">{index + 1}</p>
            <p className="mt-1 font-bold text-brand-charcoal">{t(`${key}.title`)}</p>
            <p className="mt-1 text-sm font-semibold text-brand-charcoal">{t(`${key}.metric`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">{t(`${key}.desc`)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
