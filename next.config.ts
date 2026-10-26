import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 68, 75],
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/en/work", permanent: true },
      { source: "/:locale(en|bn)/portfolio", destination: "/:locale/work", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
