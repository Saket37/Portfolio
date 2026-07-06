import { accentText, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/** Mono `// section — quip` label, colored per section. */
export function SectionLabel({
  accent,
  children,
  className,
}: {
  accent: Accent;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs", accentText[accent], className)}>
      <span aria-hidden>{"// "}</span>
      {children}
    </p>
  );
}
