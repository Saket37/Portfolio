import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="divider-dashed">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between px-5 py-[18px] text-[11px] text-ink-faint sm:px-10">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>
          <span className="text-brand-green">&gt;_</span> built with caffeine &amp;
          Kotlin
        </span>
      </div>
    </footer>
  );
}
