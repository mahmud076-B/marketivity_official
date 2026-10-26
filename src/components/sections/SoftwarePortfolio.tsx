import { Link } from "@/i18n/navigation";
import { softwareProjects } from "@/lib/portfolio";
import type { Locale } from "@/lib/site";

export default function SoftwarePortfolio({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {softwareProjects.map((project) => (
        <article
          key={project.id}
          className="flex h-full flex-col rounded-3xl border border-brand-charcoal/10 bg-white p-6 shadow-soft-sm"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-purple">
            {project.kind[locale]}
          </p>
          <h3 className="mt-2 text-xl font-bold text-brand-charcoal">{project.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
            {project.summary[locale]}
          </p>
          {project.href ? (
            <Link
              href={project.href}
              className="mt-4 text-sm font-semibold text-brand-orange"
            >
              {locale === "bn" ? "এই সাইট" : "This site"}
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
