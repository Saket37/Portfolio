import { skills, type SkillTier } from "@/lib/site-config";
import { accentStyle } from "@/lib/accents";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { cn } from "@/lib/utils";

const tierClasses: Record<SkillTier, string> = {
  featured:
    "border-[rgba(var(--accent),0.4)] bg-[rgba(var(--accent),0.1)] font-medium text-[rgb(var(--accent))]",
  accented:
    "border-[rgba(var(--accent),0.35)] bg-[rgba(var(--accent),0.08)] text-[rgb(var(--accent))]",
  muted: "border-[rgba(var(--accent),0.2)] bg-chip text-ink",
};

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="mx-auto max-w-[1140px] px-5 pb-[58px] sm:px-10">
        <Reveal>
          <SectionLabel accent="cyan" className="mb-[18px]">
            skills — ls /toolkit
          </SectionLabel>
        </Reveal>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 40}>
              <span
                style={accentStyle(skill.accent)}
                className={cn(
                  "inline-block rounded-lg border px-[15px] py-2.5 text-[12.5px] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[rgb(var(--accent))]",
                  tierClasses[skill.tier]
                )}
              >
                {skill.name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
