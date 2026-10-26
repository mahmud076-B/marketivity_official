import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marketivity | Software Development, Web Design & Marketing Agency",
    short_name: "Marketivity",
    description:
      "Custom software, web design and development, and Meta, Facebook and Instagram ads for businesses in the UK and the USA.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3F1",
    theme_color: "#F7931E",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
