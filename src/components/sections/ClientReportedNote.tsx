import { proofCopy } from "@/lib/campaigns";
import type { Locale } from "@/lib/site";

export default function ClientReportedNote({ locale }: { locale: Locale }) {
  return (
    <aside className="mx-auto mt-8 max-w-3xl rounded-2xl border border-brand-charcoal/10 bg-white px-5 py-4 text-left">
      <p className="text-sm font-semibold text-brand-charcoal">
        {proofCopy.clientReported[locale]}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-brand-muted">
        <span className="mr-1 inline-block rounded-full bg-brand-purple/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-purple">
          {locale === "bn" ? "ক্লায়েন্ট-রিপোর্টেড" : "Client-reported"}
        </span>
        {proofCopy.clientReportedNote[locale]}
      </p>
    </aside>
  );
}
