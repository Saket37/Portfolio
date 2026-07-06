import type { CSSProperties } from "react";

/**
 * The 2a "Playful Terminal" accent system: green is dominant, the other four
 * pops rotate across nav items, chips, cards, and blog covers.
 *
 * Components set `--accent` (an RGB triplet) inline via `accentStyle()` and
 * derive every color from it with arbitrary Tailwind values, e.g.
 * `text-[rgb(var(--accent))]` or `border-[rgba(var(--accent),0.3)]`.
 */
export type Accent = "green" | "amber" | "cyan" | "pink" | "purple";

export const ACCENT_CYCLE: Accent[] = ["green", "cyan", "pink", "amber", "purple"];

export const accentRgb: Record<Accent, string> = {
  green: "74,222,128",
  amber: "251,191,36",
  cyan: "56,189,248",
  pink: "244,114,182",
  purple: "167,139,250",
};

export const accentText: Record<Accent, string> = {
  green: "text-brand-green",
  amber: "text-brand-amber",
  cyan: "text-brand-cyan",
  pink: "text-brand-pink",
  purple: "text-brand-purple",
};

export function accentStyle(accent: Accent): CSSProperties {
  return { "--accent": accentRgb[accent] } as CSSProperties;
}

/** 45deg striped placeholder fill (blog covers, screenshots). */
export function accentStripes(accent: Accent, alpha = 0.12): string {
  return `repeating-linear-gradient(45deg, rgba(${accentRgb[accent]},${alpha}) 0 10px, transparent 10px 20px)`;
}
