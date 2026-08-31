import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-brand-offwhite p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal">404</h1>
          <p className="mt-2 text-brand-charcoal/70">Page not found</p>
          <Link
            href="/en"
            className="mt-6 inline-block rounded-full bg-brand-orange px-6 py-3 font-semibold text-white"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
