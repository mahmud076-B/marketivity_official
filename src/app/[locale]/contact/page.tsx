import { Mail, MapPin, Phone } from "lucide-react";
import SocialLinks from "@/components/ui/SocialLinks";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/forms/ContactForm";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { serviceCategories } from "@/lib/pricing";
import { isLocale, site, type Locale } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import PageActions from "@/components/sections/PageActions";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const title = safe === "bn" ? "যোগাযোগ" : "Contact";
  const description =
    safe === "bn"
      ? `মার্কেটিভিটিকে লিখুন বা হোয়াটসঅ্যাপ করুন ${site.phoneDisplay}। ইমেইল ${site.email}।`
      : `Write to Marketivity or message us on WhatsApp at ${site.phoneDisplay}. Email ${site.email}.`;
  return pageMetadata({ locale: safe, path: "/contact", title, description });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safe: Locale = isLocale(locale) ? locale : "en";

  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const services = serviceCategories.map((category) => ({
    value: category.name.en,
    label: category.name[safe],
  }));

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-muted">{t("subtitle")}</p>
          <div className="mt-8 flex justify-center">
            <PageActions locale={safe} align="center" />
          </div>
        </div>
      </section>

      <section className="safe-px pb-16 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <ScrollReveal direction="up">
          <div id="enquiry" className="rounded-2xl border border-brand-charcoal/10 bg-white p-6 shadow-soft-md sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-brand-charcoal">
              {t("form.title")}
            </h2>
            <ContactForm services={services} />
          </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.08}>
          <div className="rounded-2xl border border-brand-purple/20 bg-white/65 p-8 shadow-soft-md backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-bold text-brand-charcoal">
              {t("info.title")}
            </h2>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-medium">{tc("email")}</p>
                  <a
                    href="mailto:marketivitybd@gmail.com"
                    className="text-brand-charcoal/70 hover:text-brand-orange"
                  >
                    marketivitybd@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-medium">{tc("whatsapp")}</p>
                  <a
                    href="https://wa.me/8801767644696"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-charcoal/70 hover:text-brand-orange"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-medium">{tc("address")}</p>
                  <p className="text-brand-charcoal/70">
                    {tc("addressValue")}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mb-6 rounded-2xl bg-brand-purple/5 p-6">
              <p className="font-medium text-brand-charcoal">{t("info.hours")}</p>
              <p className="text-brand-charcoal/70">{t("info.hoursValue")}</p>
              <p className="mt-2 text-sm text-brand-charcoal/60">
                {t("info.response")}
              </p>
            </div>

            <div className="mt-6">
              <SocialLinks variant="pills" networks={["facebook", "instagram", "linkedin"]} />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
