import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not on the Marketivity website.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#F7F3F1] p-6 text-[#24202C]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-[#4A4553]">This page is not on the site.</p>
          <Link
            href="/en"
            className="mt-6 inline-block rounded-full bg-[#F7931E] px-6 py-3 font-semibold text-white"
          >
            Go to the English site
          </Link>
        </div>
      </body>
    </html>
  );
}
