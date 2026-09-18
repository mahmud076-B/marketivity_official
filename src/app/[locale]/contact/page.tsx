import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/forms/ContactForm";
import FacebookBadge from "@/components/ui/FacebookBadge";
import ScrollReveal from "@/components/motion/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const tfb = await getTranslations("facebookBadge");

  return (
    <>
      <section className="safe-px py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-brand-charcoal md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-charcoal/70">{t("subtitle")}</p>
        </div>
      </section>

      <section className="safe-px pb-16 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <ScrollReveal direction="up">
          <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-white via-brand-orange/5 to-brand-purple/10 p-8 shadow-soft-md backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-bold text-brand-charcoal">
              {t("form.title")}
            </h2>
            <ContactForm />
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
                    01767644696
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

            <FacebookBadge
              recommended={tfb("recommended")}
              onFacebook={tfb("onFacebook")}
            />

            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com/marketivitybd"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white"
              >
                <FacebookIcon className="h-4 w-4" />
                Facebook
              </a>
              <a
                href="https://instagram.com/marketivitybd"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
