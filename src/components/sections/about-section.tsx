import { aboutStatement, experience } from "@/lib/site-config";
import { accentStyle, accentText } from "@/lib/accents";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function AboutSection() {
  return (
    <section id="about" className="divider-dashed">
      <div className="mx-auto max-w-[1140px] px-5 pt-5 pb-[54px] sm:px-10">
        <Reveal>
          <SectionLabel accent="pink" className="mb-4">
            about — the human behind the caret
          </SectionLabel>
          <p className="font-display max-w-[840px] text-2xl leading-[1.5] text-[#d6e2da]">
            {aboutStatement.map((segment, i) =>
              segment.accent ? (
                <span key={i} className={accentText[segment.accent]}>
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-9 max-w-[560px]">
          <p className="mb-3 text-[11px] text-ink-mute">
            <span className="text-brand-pink">$</span> cat career.log
          </p>
          <ul className="space-y-2.5">
            {experience.map((job) => (
              <li
                key={job.company}
                style={accentStyle(job.accent)}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[13px]"
              >
                <span className="text-[rgb(var(--accent))]">⇒</span>
                <span className="font-medium text-head-soft">
                  {job.roles.map((role, i) => (
                    <span key={role.title}>
                      {i > 0 && " → "}
                      {role.period ? (
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <span className="cursor-help underline decoration-dotted decoration-ink-mute/60 underline-offset-2" />
                            }
                          >
                            {role.title}
                          </TooltipTrigger>
                          <TooltipContent>
                            {role.note ? `${role.period} · ${role.note}` : role.period}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        role.title
                      )}
                    </span>
                  ))}
                </span>
                <span className="text-ink-mute">@ {job.company}</span>
                <span className="text-[11px] text-ink-faint">· {job.period}</span>
                {job.current ? (
                  <span className="rounded-full border border-[rgba(74,222,128,0.4)] px-2 py-px text-[10px] text-brand-green">
                    now
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
