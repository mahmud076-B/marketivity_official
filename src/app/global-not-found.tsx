import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Marketivity",
  description: "This page is not on the Marketivity website.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#F7F3F1] p-6 text-[#24202C]">
        <div className="w-full max-w-lg rounded-3xl border border-[#24202C]/10 bg-white p-8 text-center sm:p-12">
          <p className="text-sm font-bold tracking-widest text-[#8A4500]">404</p>
          <h1 className="mt-2 text-3xl font-extrabold">Page not found</h1>
          <p className="mt-3 text-[#4A4553]">This address is not a page on the Marketivity site.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/en/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#F7931E] px-5 py-3 font-bold text-[#24202C]"
            >
              Book a free call
            </Link>
            <a
              href="https://wa.me/8801767644696?text=Hello%20Marketivity%2C%20I%20would%20like%20to%20book%20a%20free%20call."
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#075E54] px-5 py-3 font-bold text-white"
            >
              Message on WhatsApp
            </a>
          </div>
          <nav className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <Link href="/en" className="text-[#8A4500] underline">
              English home
            </Link>
            <Link href="/bn" className="text-[#8A4500] underline">
              বাংলা হোম
            </Link>
            <Link href="/en/services" className="text-[#8A4500] underline">
              Services
            </Link>
            <Link href="/en/portfolio" className="text-[#8A4500] underline">
              Portfolio
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
