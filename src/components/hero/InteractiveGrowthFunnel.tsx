import { getTranslations } from "next-intl/server";

const stages = ["traffic", "leads", "sales", "scale"] as const;

export default async function InteractiveGrowthFunnel() {
  const t = await getTranslations("home.growthFunnel");

  return (
    <div className="mx-auto w-full max-w-[580px] rounded-3xl border border-brand-charcoal/10 bg-white p-4 shadow-soft-lg sm:p-6">
      <h2 className="text-sm font-bold text-brand-charcoal">{t("subtitle")}</h2>
      <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stages.map((key, index) => (
          <li key={key} className="rounded-2xl border border-brand-charcoal/10 bg-brand-offwhite p-4 text-left">
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
