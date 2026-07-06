import { siteConfig, socialLinks } from "@/lib/site-config";
import { accentStyle } from "@/lib/accents";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="divider-dashed [background:radial-gradient(ellipse_at_50%_120%,rgba(74,222,128,0.12),transparent_60%)]"
    >
      <div className="mx-auto max-w-[1140px] px-5 pt-14 pb-[60px] text-center sm:px-10">
        <Reveal>
          <SectionLabel accent="green" className="mb-3.5">
            contact — ping me
          </SectionLabel>
          <h2 className="font-display mb-2.5 text-[32px] font-bold text-head md:text-[40px]">
            Let&rsquo;s build something fun{" "}
            <span className="text-brand-amber">⚡</span>
          </h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[13px] text-ink-dim transition-colors hover:text-brand-green"
          >
            {siteConfig.email}
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={accentStyle(link.accent)}
                className="rounded-lg border border-[rgba(var(--accent),0.35)] px-4 py-[9px] text-[rgb(var(--accent))] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[rgba(var(--accent),0.1)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
