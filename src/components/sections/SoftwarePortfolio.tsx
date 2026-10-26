import { Link } from "@/i18n/navigation";
import { softwareProjects } from "@/lib/portfolio";
import type { Locale } from "@/lib/site";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function SoftwarePortfolio({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {softwareProjects.map((project, index) => (
        <ScrollReveal key={project.id} delay={index * 0.08} className="h-full">
        <article id={project.id} className="surface-card surface-tint scroll-mt-28 p-6 sm:p-7">
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
        </ScrollReveal>
      ))}
    </div>
  );
}
