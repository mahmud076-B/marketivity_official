import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/lib/blog";

function body(slug: string) {
  return fs.readFileSync(path.join(process.cwd(), "content/blog", `${slug}.md`), "utf8");
}

const cover = (slug: string) => ({
  src: `/blog/${slug}-cover.webp`,
  alt: "",
  width: 1200,
  height: 630,
});

export const blogPosts: BlogPost[] = [
  {
    slug: "website-development-rajshahi",
    title: "Website Development in Rajshahi: What to Pay and What to Ask",
    description:
      "Website development in Rajshahi: published Bangladesh price bands, Marketivity’s set fees, and the questions to ask before you pay a web design price.",
    excerpt:
      "What a small business site costs in Bangladesh, which questions separate a real handover from a rented page, and how Marketivity prices the build.",
    category: "bangladesh",
    datePublished: "2026-10-30",
    dateModified: "2026-10-30",
    hero: {
      ...cover("website-development-rajshahi"),
      alt: "Cream cover for the Rajshahi website cost guide, with an orange rule and the article title",
    },
    og: "/blog/website-development-rajshahi-cover.webp",
    body: body("website-development-rajshahi"),
    faqs: [
      {
        q: "How much does website development in Rajshahi cost?",
        a: "Published Bangladesh guides put a small business site anywhere from about ৳20,000 to ৳80,000, and they do not agree. Marketivity’s set fees are ৳18,000 for Starter, ৳40,000 for Business and from ৳80,000 for E-commerce / Custom, also listed in dollars and pounds. The proposal confirms the fee.",
      },
      {
        q: "What should I ask a website development company before I pay?",
        a: "Ask who owns the repository, which pages are included, how many revision rounds you get, whether Bangla and photos are extra, and what hosting costs after launch. Ask them to show the site on a phone.",
      },
      {
        q: "Does the price include hosting and Google rankings?",
        a: "No. A domain and hosting are ongoing costs. Basic on-page titles are not a promise of page-one rankings. Marketivity does not sell a fixed local-SEO retainer.",
      },
    ],
    cta: {
      title: "Get a written website quote",
      body: "Send the page list and the action you want. We will reply with a proposal, not a ranking promise.",
      href: "/contact",
      label: "Book a free call",
    },
  },
  {
    slug: "meta-ads-vs-boosted-posts-uk-takeaways",
    title: "Meta Ads vs Boosted Posts for UK Takeaways",
    description:
      "Facebook ads for takeaways: when a boosted post is enough, when a UK shop should use Ads Manager, and how to read the result without inventing a return.",
    excerpt:
      "Meta’s own help pages draw the line between a boost and Ads Manager. Here is how a takeaway should use each one.",
    category: "uk-restaurants",
    datePublished: "2026-10-30",
    dateModified: "2026-10-30",
    hero: {
      ...cover("meta-ads-vs-boosted-posts-uk-takeaways"),
      alt: "Cream cover comparing boosted posts and Ads Manager for UK takeaways",
    },
    og: "/blog/meta-ads-vs-boosted-posts-uk-takeaways-cover.webp",
    body: body("meta-ads-vs-boosted-posts-uk-takeaways"),
    faqs: [
      {
        q: "Are Facebook ads for takeaways just boosted posts?",
        a: "No. Meta describes a boosted post as an ad made from content you already published, with fewer options. Ads Manager is where you set an objective, a local radius and a result such as messages or link clicks.",
      },
      {
        q: "Can I target a neighbourhood by ethnicity?",
        a: "No. Meta does not offer ethnic targeting. Use a radius around the shop, people who already interacted with the page, and creative that shows the actual food.",
      },
      {
        q: "How many orders should a boost produce?",
        a: "We do not publish a forecast. The only sales line we state is client-reported: about 17 to 20 sales per messaging campaign on average, counted by the client. It is not a ROAS.",
      },
    ],
    cta: {
      title: "Plan the takeaway campaign",
      body: "Bring the menu and the area you deliver or collect from. The ad account stays in your name.",
      href: "/services/meta-ads",
      label: "See Meta Ads management",
    },
  },
  {
    slug: "takeaway-direct-orders-without-commission",
    title: "How to Get Direct Orders Without Deliveroo or Just Eat Commission",
    description:
      "A takeaway direct ordering website versus published Just Eat, Uber Eats and Deliveroo fees, and how to move regulars without pretending the apps disappear.",
    excerpt:
      "Published UK commission rates, what your own menu page still costs, and a Sunday sum you can do from the payout report.",
    category: "uk-restaurants",
    datePublished: "2026-10-30",
    dateModified: "2026-10-30",
    hero: {
      ...cover("takeaway-direct-orders-without-commission"),
      alt: "Cream cover about direct takeaway orders and delivery-app commission",
    },
    og: "/blog/takeaway-direct-orders-without-commission-cover.webp",
    body: body("takeaway-direct-orders-without-commission"),
    faqs: [
      {
        q: "How much commission do Just Eat and Uber Eats publish in the UK?",
        a: "Uber Eats’ UK pricing page lists 30% when its couriers deliver, 33% for Uber One orders, and 13% for self-delivery or pickup, before VAT, plus a £650 activation fee excluding VAT. Eclyde, on 10 September 2026, quotes Just Eat’s UK partner page at 30% plus VAT when Just Eat delivers and 14% plus VAT when you use your own drivers.",
      },
      {
        q: "What is Deliveroo’s standard UK commission?",
        a: "Deliveroo’s partner terms describe a percentage of the order plus VAT. They do not publish one standard percentage. Your agreement is the source.",
      },
      {
        q: "Does a direct ordering website remove every fee?",
        a: "No. You still pay for packaging, your own driver’s time if you deliver, and a card processor. You drop the large platform percentage on orders that come to you directly.",
      },
    ],
    cta: {
      title: "Put the menu on a site you own",
      body: "A short ordering page is enough to start. We will scope the pages in a written proposal.",
      href: "/services/web-development",
      label: "See website design",
    },
  },
  {
    slug: "facebook-ad-cost-bangladesh",
    title: "Facebook Ad Cost in Bangladesh: Budget in BDT",
    description:
      "Facebook ad cost in Bangladesh: why published BDT ranges disagree, how to separate Meta spend from a management fee, and how to set a first budget.",
    excerpt:
      "Three public guides, three different bands. Here is how to read them and how Marketivity splits fee from ad spend.",
    category: "bangladesh",
    datePublished: "2026-10-30",
    dateModified: "2026-10-30",
    hero: {
      ...cover("facebook-ad-cost-bangladesh"),
      alt: "Cream cover about Facebook ad costs in Bangladesh in taka",
    },
    og: "/blog/facebook-ad-cost-bangladesh-cover.webp",
    body: body("facebook-ad-cost-bangladesh"),
    faqs: [
      {
        q: "What is the average Facebook ad cost in Bangladesh?",
        a: "There isn’t a single official average. IH Tahim, Kuiperz and Digital Marketing Dhaka publish different CPM and CPC bands, and none of them is Meta’s price list. Use your own Ads Manager export after a real test.",
      },
      {
        q: "Does a ৳15,000 package include the ad spend?",
        a: "Ask. Marketivity’s Growth management tier is ৳15,000 a month, and the money you pay Meta is extra, from an ad account in your name.",
      },
      {
        q: "Is boosting a post cheaper than Ads Manager?",
        a: "It spends the same kind of money with fewer controls. Meta says a boosted post has fewer customisation and targeting options than a standard ad.",
      },
    ],
    cta: {
      title: "Separate the fee from the spend",
      body: "Tell us the offer and the result you want. We will not quote a national average CPC.",
      href: "/services/meta-ads",
      label: "See Meta Ads management",
    },
  },
  {
    slug: "shopify-meta-ads-budget",
    title: "How Much Should a Small Shopify Brand Spend on Meta Ads?",
    description:
      "A facebook ads budget for Shopify: Meta’s learning phase, Shopify’s $1 and $5 notes, and why other playbooks disagree on a minimum Meta ads budget.",
    excerpt:
      "There is no universal daily budget. Here is how to use Meta’s 50-result learning note without copying someone else’s ROAS.",
    category: "ecommerce",
    datePublished: "2026-10-30",
    dateModified: "2026-10-30",
    hero: {
      ...cover("shopify-meta-ads-budget"),
      alt: "Cream cover about Shopify Meta ads budgets and the learning phase",
    },
    og: "/blog/shopify-meta-ads-budget-cover.webp",
    body: body("shopify-meta-ads-budget"),
    faqs: [
      {
        q: "What is the minimum Meta ads budget for a Shopify store?",
        a: "Meta’s learning guidance is about 50 results a week, not a universal dollar minimum. Shopify’s 2025 article says $1 a day for impression billing and recommends $5 a day for traffic or sales. Other studios suggest $5–$10 or more. Check the minimum Ads Manager shows on your account.",
      },
      {
        q: "Why did my daily spend go over the budget?",
        a: "Meta’s budget documentation says a daily budget is an average and spend can run up to about 25% higher on a high-opportunity day, with the week meant to balance.",
      },
      {
        q: "Should I wait until I can afford 50 purchases a week?",
        a: "Not always. If that volume is unrealistic, judge earlier signals on purpose or optimise for a more frequent event that still means something. Do not pretend the learning phase has ended.",
      },
    ],
    cta: {
      title: "Bring the margin, not a borrowed ROAS",
      body: "We will look at the result you can actually measure and keep the ad account in your name.",
      href: "/contact",
      label: "Book a free call",
    },
  },
  {
    slug: "digital-marketing-trends-bangladesh-2026",
    title: "Digital Marketing in Bangladesh in 2026: What Is Worth Doing",
    description:
      "Digital marketing trends in Bangladesh for 2026, without invented user counts: page, website and Meta ads, and how the fees are split.",
    excerpt:
      "The useful 2026 choices for a small Bangladesh business: a clear offer, a site you own, and a paid result you can name.",
    category: "bangladesh",
    datePublished: "2026-05-15",
    dateModified: "2026-10-30",
    hero: {
      ...cover("digital-marketing-trends-bangladesh-2026"),
      alt: "Cream cover about practical digital marketing choices in Bangladesh in 2026",
    },
    og: "/blog/digital-marketing-trends-bangladesh-2026-cover.webp",
    body: body("digital-marketing-trends-bangladesh-2026"),
    faqs: [
      {
        q: "What digital marketing should a small Bangladesh business do first in 2026?",
        a: "Make the offer, price and area obvious, and make sure someone answers. Then decide whether you need a site, a Meta campaign, or both. Do not start with a tool you will not check.",
      },
      {
        q: "Do short videos guarantee more sales?",
        a: "No. Short video is a placement you can buy. Marketivity does not publish a universal engagement multiple for it.",
      },
      {
        q: "Are AI captions enough?",
        a: "They are a draft. A person still has to check the price, the address and the claim. A custom chat product is a separate build.",
      },
    ],
    cta: {
      title: "Scope the next step",
      body: "Page, site or ads. Tell us which result you want and we will say which one you actually need.",
      href: "/services",
      label: "See services",
    },
  },
  {
    slug: "facebook-ads-roi-tips",
    title: "Five Checks Before You Scale a Meta Campaign",
    description:
      "Five checks before you scale a Meta campaign: name the result, keep the account, respect the learning phase, change one thing, and do not call a click a sale.",
    excerpt:
      "How to raise a Meta budget without inventing a return. The checks are dull. They are the ones that stop a bad scale.",
    category: "ecommerce",
    datePublished: "2026-04-22",
    dateModified: "2026-10-30",
    hero: {
      ...cover("facebook-ads-roi-tips"),
      alt: "Cream cover listing five checks before scaling a Meta campaign",
    },
    og: "/blog/facebook-ads-roi-tips-cover.webp",
    body: body("facebook-ads-roi-tips"),
    faqs: [
      {
        q: "When should I increase a Meta ads budget?",
        a: "When the result you named is happening, the account is yours, you have a clean week since the last big edit, and you will change only one thing. Do not scale because a single afternoon looked busy.",
      },
      {
        q: "What is a good ROI on Facebook ads?",
        a: "We do not publish one. ROI needs real spend and real income. The only sales figure we state is client-reported: about 17 to 20 sales per messaging campaign on average, counted by the client. It is not ROAS.",
      },
      {
        q: "What is the learning phase?",
        a: "Meta says an ad set usually leaves learning after about 50 results in the week following the last significant edit. A big edit starts that clock again.",
      },
    ],
    cta: {
      title: "Read an export with us",
      body: "Send the result you think you were buying. We will not fill in a fake return.",
      href: "/contact",
      label: "Book a free call",
    },
  },
  {
    slug: "seo-local-business-rajshahi",
    title: "SEO for Local Businesses in Rajshahi",
    description:
      "SEO for a local business in Rajshahi: a Google Business Profile that matches the shop, one phone number, and a page that says where you are.",
    excerpt:
      "A practical Rajshahi listing check. No ranking promise, no bought reviews, and no pile of keyword pages.",
    category: "web-ai",
    datePublished: "2026-03-10",
    dateModified: "2026-10-30",
    hero: {
      ...cover("seo-local-business-rajshahi"),
      alt: "Cream cover about local SEO checks for a Rajshahi business",
    },
    og: "/blog/seo-local-business-rajshahi-cover.webp",
    body: body("seo-local-business-rajshahi"),
    faqs: [
      {
        q: "How do I get my Rajshahi business on Google?",
        a: "Claim the Google Business Profile, match the hours and phone to the shop, and link a website that says what you do and where. Google’s own help is the reference when the buttons move.",
      },
      {
        q: "Can you guarantee the map pack?",
        a: "No. The pack moves, competitors open, and Google changes the layout. Marketivity does not sell a fixed local-SEO retainer or a ranking promise.",
      },
      {
        q: "Do I need a website as well as a Facebook page?",
        a: "You need a listing either way. A website is worth it when you want a link you control. Build prices start at Marketivity’s Starter tier.",
      },
    ],
    cta: {
      title: "Fix the page people land on",
      body: "If the listing is fine and the site is the gap, we can scope the pages. We still will not promise the map pack.",
      href: "/services/web-development",
      label: "See website design",
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
