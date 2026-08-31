import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AnnouncementBar() {
  const t = await getTranslations("announcement");

  return (
    <div className="safe-pt bg-brand-orange text-center text-sm font-medium text-white">
      <div className="safe-px py-2">
        <Link href="/contact" className="hover:underline">
          {t("text")}
        </Link>
      </div>
    </div>
  );
}
