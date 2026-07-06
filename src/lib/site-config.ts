import type { Accent } from "@/lib/accents";

export const siteConfig = {
  name: "Saket Anand",
  role: "Android Developer · 3+ yrs",
  description:
    "A seasoned Android Developer with 3+ years of experience and a strong foundation in creating elegant and efficient mobile solutions.",
  url: "https://saketanand.dev",
  resumeUrl:
    "https://drive.google.com/file/d/1RNq-4HSTUBDdsPqkz7E5zf8B3BS5wkhx/view?usp=share_link",
  email: "contact@saketanand.dev",
};

export const navItems: {
  id: string;
  label: string;
  href: string;
  accent: Accent | null;
}[] = [
  { id: "home", label: "~/home", href: "/#home", accent: "green" },
  { id: "about", label: "about", href: "/#about", accent: "pink" },
  { id: "skills", label: "skills", href: "/#skills", accent: "cyan" },
  { id: "projects", label: "projects", href: "/#projects", accent: "purple" },
  // Blog hidden until real posts exist — restore alongside <BlogTeaser /> in page.tsx:
  // { id: "blog", label: "blog", href: "/#blog", accent: "amber" },
  { id: "contact", label: "contact", href: "/#contact", accent: null },
];

export const socialLinks: { label: string; href: string; accent: Accent }[] = [
  { label: "GitHub", href: "https://github.com/Saket37", accent: "green" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anandsaket379/",
    accent: "cyan",
  },
  { label: "Twitter", href: "https://twitter.com/Anandsaket37", accent: "pink" },
];

export const hero = {
  terminalTitle: "saket@dev: ~",
  titleLines: ["I make Android", "apps that feel"],
  titleHighlight: "buttery smooth",
  subtitle:
    "Kotlin, Jetpack Compose, Kotlin Multiplatform, clean architecture — shipped with a smile and a suspiciously green terminal.",
  primaryCta: { label: "View projects", href: "/#projects" },
  secondaryCta: { label: "Say hello 👋", href: "/#contact" },
  photo: "/images/saket-anand.jpg",
  badges: [
    { label: "open to work!", accent: "amber" },
    { label: "Compose ♥", accent: "pink" },
  ],
} as const;

/** About statement with per-word accent emphasis. */
export const aboutStatement: { text: string; accent?: Accent }[] = [
  {
    text: "A seasoned Android developer with 3+ years of experience turning messy ideas into ",
  },
  { text: "elegant", accent: "green" },
  { text: ", " },
  { text: "efficient", accent: "cyan" },
  { text: " mobile solutions — from XML layouts to modern " },
  { text: "Jetpack Compose", accent: "amber" },
  { text: " and cross-platform " },
  { text: "Kotlin Multiplatform", accent: "purple" },
  { text: ", with backend work in Kotlin + " },
  { text: "Spring Boot", accent: "pink" },
  { text: " (or PHP/Laravel) whenever a project calls for it. Clean, testable code is my love language." },
];

/**
 * Career progression, most recent first — rendered as a `cat career.log` list.
 * Each role can carry its own `period` (shown as a hover tooltip on the title,
 * hinted by a dotted underline) so multi-title rows stay a single compact
 * line while the exact per-role dates are still available on demand.
 */
export const experience: {
  company: string;
  roles: { title: string; period?: string; note?: string }[];
  period: string;
  current?: boolean;
  accent: Accent;
}[] = [
  {
    company: "eBay",
    roles: [{ title: "Software Engineer II" }],
    period: "Jun 2026 — Present",
    current: true,
    accent: "green",
  },
  {
    company: "Scoremarks Technologies Pvt. Ltd. (MathonGo)",
    roles: [
      { title: "Intern", period: "Mar 2023 — Jul 2023" },
      { title: "SDE1", period: "Aug 2023 — Jul 2025" },
      { title: "SDE2", period: "Aug 2025 — Nov 2025" },
      {
        title: "Lead Android Developer",
        period: "Dec 2025 — Jun 2026",
        note: "Marks UPSC",
      },
    ],
    period: "Mar 2023 — Jun 2026",
    accent: "cyan",
  },
  {
    company: "AgriLinks Data Technologies Pvt. Ltd.",
    roles: [{ title: "Android Developer Intern" }],
    period: "Apr 2022 — Jun 2022",
    accent: "pink",
  },
];

export type SkillTier = "featured" | "accented" | "muted";

export const skills: { name: string; accent: Accent; tier: SkillTier }[] = [
  { name: "Kotlin", accent: "green", tier: "featured" },
  { name: "Jetpack Compose", accent: "cyan", tier: "featured" },
  { name: "Android", accent: "pink", tier: "featured" },
  { name: "Kotlin Multiplatform", accent: "amber", tier: "accented" },
  { name: "Spring Boot", accent: "cyan", tier: "accented" },
  { name: "PHP", accent: "purple", tier: "accented" },
  { name: "Laravel", accent: "green", tier: "accented" },
  { name: "Coroutines & Flow", accent: "cyan", tier: "muted" },
  { name: "Dagger-Hilt", accent: "pink", tier: "muted" },
  { name: "Retrofit", accent: "amber", tier: "muted" },
  { name: "Room DB", accent: "purple", tier: "muted" },
  { name: "Firebase", accent: "green", tier: "muted" },
  { name: "MySQL", accent: "cyan", tier: "muted" },
  { name: "SQLite", accent: "pink", tier: "muted" },
  { name: "Redis", accent: "amber", tier: "muted" },
  { name: "Git", accent: "purple", tier: "muted" },
  { name: "XML", accent: "green", tier: "muted" },
  { name: "OpenCV", accent: "cyan", tier: "muted" },
];

export const projects: {
  name: string;
  glyph: string;
  accent: Accent;
  href: string;
  description: string;
  tags: { name: string; accent: Accent }[];
}[] = [
  {
    name: "Ready Weather",
    glyph: "⛈",
    accent: "green",
    href: "https://github.com/Saket37/Ready-Weather",
    description: "7-day & 48-hour hourly forecasts for your location.",
    tags: [
      { name: "Kotlin", accent: "green" },
      { name: "MapQuest", accent: "cyan" },
      { name: "OpenWeather", accent: "amber" },
    ],
  },
  {
    name: "Clinicio",
    glyph: "🏥",
    accent: "cyan",
    href: "https://github.com/Saket37/Clinicio",
    description: "Book doctor appointments; manage slots & bookings.",
    tags: [
      { name: "Kotlin", accent: "green" },
      { name: "Laravel", accent: "purple" },
      { name: "MySQL", accent: "cyan" },
    ],
  },
  {
    name: "Edge Detection",
    glyph: "🖼️",
    accent: "pink",
    href: "https://github.com/Saket37/Edge-Detection",
    description: "Detect edges from camera, device, or image URL.",
    tags: [
      { name: "Kotlin", accent: "green" },
      { name: "Firebase", accent: "amber" },
      { name: "OpenCV", accent: "pink" },
    ],
  },
];

export const githubUrl = "https://github.com/Saket37";
