export type Review = {
  id: string;
  name: string;
  quote: string;
  /** Logo file whose text matches this page. */
  logo?: string;
  /** Used when no logo file matches. */
  initials?: string;
};

/** Facebook recommendations. Quotes are verbatim aside from spacing after punctuation. */
export const reviews: Review[] = [
  {
    id: "flower-bouquet",
    name: "Flower Bouquet",
    initials: "FB",
    quote:
      "Working with Marketivity has been a great experience. Their team is professional, responsive, and genuinely understands the needs of their clients. They provided clear communication throughout the process and delivered the work with great attention to detail. We are very satisfied with the quality of their service and look forward to working with Marketivity again in the future.",
  },
  {
    id: "vark-kord",
    name: "Vark Kord",
    initials: "VK",
    quote:
      "I'm genuinely impressed with Marketivity's service! They have done a great job improving our Instagram page and supporting our business with their professional digital marketing services. Their dedication, creativity, and attention to detail truly stand out. We're very satisfied with their work and grateful for their support. Highly recommended to anyone looking for reliable digital marketing services!",
  },
  {
    id: "lushious-bloom",
    name: "LUSHIOUS-Bloom",
    initials: "LB",
    quote:
      "Excellent service and a highly professional team. Their Facebook Ads service helped my business achieve better results. They also analyzed my page, explained what needed improvement, and provided clear guidance every step of the way. Highly recommended for anyone looking for reliable digital marketing services!",
  },
  {
    id: "green-investment",
    name: "GREEN InvestmenT",
    initials: "GI",
    quote:
      "They are very supportive. Their communication is very good. Some of their own systems offer premium feels. I recommend Marketivity for everyone. Great experience",
  },
  {
    id: "siro-lifestyle",
    name: "Siro lifestyle",
    logo: "/clients/7.webp",
    quote:
      "Really impressed with the quality of service. The team is professional, supportive, and delivers great results. Highly recommend Marketivity!",
  },
  {
    id: "fariha-tabassum",
    name: "Fariha Tabassum",
    initials: "FT",
    quote:
      "Great Service... I totally impressed with this agency's work. Their ad run result was so impressive. They were so dedicated totally worth it. I would highly recommend everyone",
  },
  {
    id: "clothing-is-luxury",
    name: "Clothing is Luxury",
    logo: "/clients/9.webp",
    quote:
      "I didn't expect to get such a great work. I Recommended 1000% Thanks Marketivity team",
  },
  {
    id: "grace-wear",
    name: "Grace Wear",
    logo: "/clients/10.webp",
    quote: "Best agency I have ever worked with. Great",
  },
];
