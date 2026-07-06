import { projects } from "@/lib/site-config";
import { accentStyle } from "@/lib/accents";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export function ProjectsSection() {
  return (
    <section id="projects">
      <div className="mx-auto max-w-[1140px] px-5 pb-[58px] sm:px-10">
        <Reveal>
          <SectionLabel accent="purple" className="mb-[18px]">
            projects — git log --best
          </SectionLabel>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 90}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                style={accentStyle(project.accent)}
                className="block h-full rounded-[13px] border border-[rgba(var(--accent),0.18)] bg-panel p-[22px] shadow-[5px_5px_0_rgba(var(--accent),0.12)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[rgb(var(--accent))] hover:shadow-[8px_8px_0_rgba(var(--accent),0.2)]"
              >
                <div aria-hidden className="mb-3 text-[22px]">
                  {project.glyph}
                </div>
                <h3 className="font-display mb-2.5 text-[19px] font-bold text-head-soft">
                  {project.name}
                </h3>
                <p className="mb-4 text-[12.5px] leading-[1.6] text-ink-dim">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      style={accentStyle(tag.accent)}
                      className="rounded-md border border-[rgba(var(--accent),0.3)] px-2 py-[3px] text-[10.5px] text-[rgb(var(--accent))]"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
