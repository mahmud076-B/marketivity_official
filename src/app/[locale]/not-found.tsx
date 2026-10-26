import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageActions from "@/components/sections/PageActions";
import { isLocale } from "@/lib/site";

export default async function LocaleNotFound() {
  const localeParam = await getLocale();
  const locale = isLocale(localeParam) ? localeParam : "en";
  const copy =
    locale === "bn"
      ? {
          title: "পেজটি পাওয়া যায়নি",
          body: "এই ঠিকানায় মার্কেটিভিটির কোনো পেজ নেই।",
          home: "হোমে ফিরুন",
          services: "সেবা দেখুন",
          work: "কাজ দেখুন",
        }
      : {
          title: "Page not found",
          body: "This address is not a page on the Marketivity site.",
          home: "Back home",
          services: "View services",
          work: "See the work",
        };

  return (
    <section className="safe-px flex min-h-[70vh] items-center py-20">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-brand-charcoal/10 bg-white p-8 text-center shadow-soft-md sm:p-12">
        <p className="text-sm font-bold tracking-widest text-brand-ink">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-brand-charcoal sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 text-brand-muted">{copy.body}</p>
        <div className="mt-8 flex justify-center">
          <PageActions locale={locale} align="center" />
        </div>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-semibold">
          <Link href="/" className="text-brand-ink underline">
            {copy.home}
          </Link>
          <Link href="/services" className="text-brand-ink underline">
            {copy.services}
          </Link>
          <Link href="/work" className="text-brand-ink underline">
            {copy.work}
          </Link>
        </nav>
      </div>
    </section>
  );
}
