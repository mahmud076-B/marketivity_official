import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  return (
    <div className="safe-px flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold text-brand-charcoal">404</h1>
      <p className="mt-2 text-brand-muted">This page is not on the site.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-brand-orange px-6 py-3 font-semibold text-white"
      >
        Back home
      </Link>
    </div>
  );
}
