import { MessagesSquare, ThumbsUp } from "lucide-react";
import {
  campaignHeadline,
  campaignResultLabel,
  type FeaturedCampaign,
} from "@/lib/campaigns";
import type { Locale } from "@/lib/site";

export default function CaseStudyCard({
  campaign,
  locale,
}: {
  campaign: FeaturedCampaign;
  locale: Locale;
}) {
  const Icon = campaign.kind === "messaging" ? MessagesSquare : ThumbsUp;
  const spend = `$${campaign.spend.toFixed(2)}`;
  const impressions = campaign.impressions.toLocaleString("en-US");
  const reach = campaign.reach.toLocaleString("en-US");

  return (
    <article className="flex h-full flex-col rounded-3xl border border-brand-purple/15 bg-white p-6 shadow-soft-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {campaignResultLabel(campaign.kind, locale)}
        </span>
        <span className="text-sm font-semibold text-brand-muted">{spend}</span>
      </div>
      <h3 className="text-xl font-bold text-brand-charcoal">{campaign.name}</h3>
      <p className="mt-3 text-lg font-semibold leading-snug text-brand-charcoal">
        {campaignHeadline(campaign, locale)}
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-brand-offwhite px-3 py-3">
          <dt className="text-xs font-medium text-brand-muted">
            {locale === "bn" ? "ইমপ্রেশন" : "Impressions"}
          </dt>
          <dd className="mt-1 font-bold text-brand-charcoal">{impressions}</dd>
        </div>
        <div className="rounded-2xl bg-brand-offwhite px-3 py-3">
          <dt className="text-xs font-medium text-brand-muted">
            {locale === "bn" ? "রিচ" : "Reach"}
          </dt>
          <dd className="mt-1 font-bold text-brand-charcoal">{reach}</dd>
        </div>
        <div className="col-span-2 rounded-2xl bg-brand-offwhite px-3 py-3">
          <dt className="text-xs font-medium text-brand-muted">
            {locale === "bn"
              ? "প্রতি ফলের খরচ (উপরের দিকে পূর্ণ করা হয়নি)"
              : "Cost per result (not rounded up)"}
          </dt>
          <dd className="mt-1 font-bold text-brand-charcoal">
            ${campaign.costPerResult}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-brand-muted">
        {locale === "bn"
          ? "অ্যাডস ম্যানেজারের সংখ্যা। এটি বিক্রি বা রাজস্ব নয়।"
          : "Ads Manager figures. This is not a sales or revenue result."}
      </p>
    </article>
  );
}
