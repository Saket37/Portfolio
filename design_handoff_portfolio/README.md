# Handoff: saketanand.dev — Portfolio Redesign (Direction 2a, "Playful Terminal")

## Overview
A ground-up redesign of Saket Anand's personal portfolio. Dark, developer/terminal-inspired
aesthetic with a terminal-green primary accent and playful multi-color pops. Sections: Hero,
About, Skills, Projects, **Blog** (new), Contact. Target stack: **Next.js (App Router) + React +
Tailwind CSS + shadcn/ui**.

## About the Design Files
The file in this bundle — `Portfolio_designs.dc.html` — is a **design reference created in HTML**.
It is a prototype communicating the intended *look, layout, copy, and motion* — NOT production code
to copy line-for-line. Your task is to **recreate this design in the existing Next.js + Tailwind +
shadcn codebase**, using its established conventions (component structure, `cn()` helpers, theme
tokens, etc.).

The HTML contains **two turns of options**. Build from **option `2a`** (turn 2, "Terminal, playful").
Options `1a` and `1b` are earlier explorations kept for context — ignore them unless referenced.
Open the file in a browser and zoom into the `2a` card to inspect exact spacing/color.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final. Recreate the UI faithfully, then
layer in the animations described below. Placeholder images (portrait, blog covers) are marked in the
design — swap in real assets.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0a0f0c` | Page background (near-black, green-tinted) |
| `panel` | `#0d1512` | Cards, terminal window, tiles |
| `panel-alt` | `#0f1a15` | Terminal title bar, placeholder fills |
| `border` | `rgba(74,222,128,0.18)` | Default hairline borders (often **dashed** for playfulness) |
| `text` | `#c3cfc6` | Body text |
| `text-dim` | `#8ea095` | Secondary text |
| `text-mute` | `#6b7d72` / `#5c6d62` | Terminal prompts, footer |
| `heading` | `#f4fff8` / `#eafff1` | Headings |
| **`green`** (primary) | `#4ade80` | Primary accent, CTAs, links |
| `amber` | `#fbbf24` | Playful accent #2 |
| `cyan` | `#38bdf8` | Playful accent #3 |
| `pink` | `#f472b6` | Playful accent #4 |
| `purple` | `#a78bfa` | Playful accent #5 |
| Terminal dots | `#ff5f56` `#ffbd2e` `#27c93f` | macOS window dots |

Accent usage rule: **green is dominant**; amber/cyan/pink/purple are *rotational* — each nav item,
skill chip, project card, and blog card cycles through them so no single pop dominates. Keep saturated
pops sparse against the dark field.

### Tailwind config (suggested `theme.extend.colors`)
```js
colors: {
  bg: '#0a0f0c', panel: '#0d1512', 'panel-alt': '#0f1a15',
  ink: '#c3cfc6', 'ink-dim': '#8ea095', 'ink-mute': '#6b7d72',
  head: '#f4fff8',
  brand: { green: '#4ade80', amber: '#fbbf24', cyan: '#38bdf8', pink: '#f472b6', purple: '#a78bfa' },
}
```

### Typography
- **Display / headings:** `Space Grotesk` (700, some 400). Tight tracking `-0.02em`.
- **Body, UI, terminal, labels:** `JetBrains Mono` (400/500/700). The mono is core to the identity —
  use it for nav, section labels (`// about`), chips, tags, footer.
- Load via `next/font/google` (both families). Expose as CSS vars `--font-display`, `--font-mono`
  and map in Tailwind `fontFamily`.

Scale (px, desktop):
- H1 hero: **60** / line-height 1.02 / 700 (Space Grotesk)
- Section heading (contact H2): 40 / 700
- About statement: 24 / 1.5 / 400 (Space Grotesk)
- Card title (H3): 19 / Space Grotesk 700
- Blog card title (H4): 15 / Space Grotesk 700
- Body: 14 / 1.7
- Small / meta / tags: 11–12.5 / mono
- Section label (`// about`): 12 / mono, colored per section

### Spacing / radius / shadow
- Section horizontal padding: `40px`; vertical rhythm ~`56–68px`.
- Card padding: `22px`. Terminal body padding: `16–18px`.
- Radius: cards `13px`, terminal window `12px`, chips `8px`, tags `6px`, buttons `9px`.
- Section dividers: `1px dashed rgba(74,222,128,0.14)` (dashed = the playful signature).
- **Offset "sticker" shadows** (hard, no blur): e.g. `box-shadow: 5px 5px 0 rgba(74,222,128,0.12)` on
  project cards (color matches each card's accent); CV button `3px 3px 0 #fbbf24`; primary CTA
  `4px 4px 0 #38bdf8`; terminal window `6px 6px 0 rgba(167,139,250,0.25)`.
- Background grid: two 1px linear-gradients at `rgba(74,222,128,0.04)`, `background-size: 44px 44px`.

---

## Screens / Views (build as Next.js routes)

### `/` — Home (single scrolling page, anchored nav)
Max content width ~1140px, centered. Sticky top nav.

1. **Nav** — flex row, space-between, padding `20px 40px`, `1px dashed` bottom border,
   `backdrop-filter: blur(6px)`, bg `rgba(10,15,12,0.7)`.
   - Left: `>_saket.dev` — `>_` in green, `.dev` in amber.
   - Center links (mono 12.5px), each a different accent, active `~/home` green with 2px green underline:
     `~/home` `about` `skills` `projects` `blog` `contact`.
   - Right: `./download_cv` button — green bg, near-black text, radius 8, sticker shadow `3px 3px 0 #fbbf24`.

2. **Hero** — 2-col grid `1.15fr .85fr`, gap 44, padding `60px 40px 68px`.
   - **Left:**
     - **Terminal window** (max-width 450, radius 12, purple sticker shadow). Title bar: 3 macOS dots
       + label `saket@dev: ~`. Body (mono 13, line-height 1.95):
       ```
       $ whoami
       ⇒ Saket Anand 👋
       $ cat role.txt
       ⇒ Android Developer · 2.5 yrs   (2.5 yrs in amber)
       $ ./say_hi ▌   (blinking green caret)
       ```
       Prompt `$` in pink, commands in body color, output arrows.
     - H1: "I make Android / apps that feel / **buttery smooth** ⚡" — "buttery smooth" green with
       glow `text-shadow: 0 0 28px rgba(74,222,128,0.5)`, ⚡ amber.
     - Sub-paragraph (body 14, dim), 450px max.
     - Buttons: primary "View projects →" (green, cyan sticker shadow); secondary "Say hello 👋"
       (dashed green border).
   - **Right:** portrait card rotated `-2deg`, dashed/solid green border, padding 10, inner 4:5
     striped placeholder labeled `[ portrait.jpg — drop your photo ]`. Two floating sticker badges:
     amber "open to work!" (rotate 6deg, top-right) and pink "Compose ♥" (rotate -5deg, bottom-left),
     both floating (see animations). One amber sparkle glyph floats above the columns.

3. **About** — label `// about — the human behind the caret` (pink). Large Space Grotesk statement
   (24px), max 840, with green/cyan/amber emphasis spans on "elegant", "efficient", "Jetpack Compose".

4. **Skills** — label `// skills — ls /toolkit` (cyan). Wrapping flex of chips (radius 8, padding
   10×15, mono 12.5). Top three (Kotlin=green, Jetpack Compose=cyan, Android=pink) get filled tinted
   backgrounds + colored text; the rest (PHP, Laravel, C++, MySQL, SQLite, Azure, Firebase, Git,
   Markdown) are muted panel chips with faint rotating-accent borders. See data below.

5. **Projects** — label `// projects — git log --best` (purple). 3-col grid, gap 18. Each card:
   panel bg, radius 13, accent-colored sticker shadow, an emoji glyph, H3 title, one-line description,
   accent-colored tech tags. See data below.

6. **Blog** *(new)* — label `// blog — things I've been figuring out` (amber) + right link
   `cd /blog →` (green). 3-col **card grid with thumbnails**: striped cover (44px stripe, per-card
   accent) with a large emoji, then mono category·readtime + Space Grotesk title. See data below.

7. **Contact** — top dashed divider, centered, radial green glow at bottom. Label `// contact — ping
   me` (green). H2 "Let's build something fun ⚡" (40px). Email `contact@saketanand.dev`. Three
   outline social chips (GitHub=green, LinkedIn=cyan, Twitter=pink).

8. **Footer** — dashed top border, space-between: `© 2026 Saket Anand` · `>_ built with caffeine & Kotlin`.

### `/blog` — Blog index
Reuse the blog card grid full-page (3-col, more rows). Add a mono page header `~/blog` and optional
tag filter chips (reuse skill-chip styling).

### `/blog/[slug]` — Post detail
Mono breadcrumb `~/blog/<slug>`, Space Grotesk H1, meta row (category·date·read time), then MDX
content. Style code blocks as the terminal window (dot header, mono, green). Keep max prose width ~720px.

### `/projects/[slug]` — Project detail (optional, recommended)
Hero with title + tech tags + live/GitHub links, striped screenshot placeholders, problem/approach/stack
sections. Mirror project-card accent color per project.

---

## Content (use verbatim)

### Identity
- Name: **Saket Anand** · Role: **Android Developer · 2.5 yrs**
- Email: `contact@saketanand.dev`
- CV: https://drive.google.com/file/d/1RNq-4HSTUBDdsPqkz7E5zf8B3BS5wkhx/view?usp=share_link
- Socials: GitHub https://github.com/Saket37 · LinkedIn https://www.linkedin.com/in/anandsaket379/
  · Twitter https://twitter.com/Anandsaket37

### About copy
> A seasoned Android developer who loves turning messy ideas into elegant, efficient mobile solutions —
> from XML layouts to modern Jetpack Compose. Clean, testable code is my love language.

(Long-form, for About page if needed — adapted from current site:)
> A seasoned Android Developer with 2.5 years of experience and a strong foundation in creating elegant
> and efficient mobile solutions. Proficient in Kotlin, and experienced with both traditional XML
> layouts and modern Jetpack Compose. A firm believer in writing clean and testable code, adhering to
> Clean Architecture and patterns like MVI and MVVM to build modular, maintainable, scalable apps.

### Skills (order + accent)
`[{name, accent, featured}]`
```json
[
  {"name":"Kotlin","accent":"green","featured":true},
  {"name":"Jetpack Compose","accent":"cyan","featured":true},
  {"name":"Android","accent":"pink","featured":true},
  {"name":"PHP","accent":"amber"},
  {"name":"Laravel","accent":"purple"},
  {"name":"C++","accent":"muted"},
  {"name":"MySQL","accent":"muted"},
  {"name":"SQLite","accent":"muted"},
  {"name":"Azure","accent":"muted"},
  {"name":"Firebase","accent":"muted"},
  {"name":"Git","accent":"muted"},
  {"name":"Markdown","accent":"muted"}
]
```

### Projects
```json
[
  {"title":"Ready Weather","glyph":"⛈","accent":"green",
   "desc":"7-day & 48-hour hourly forecasts for your location.",
   "tags":["Kotlin","MapQuest","OpenWeather"],
   "repo":"https://github.com/Saket37/Ready-Weather"},
  {"title":"Clinicio","glyph":"🏥","accent":"cyan",
   "desc":"Book doctor appointments; manage slots & bookings.",
   "tags":["Kotlin","Laravel","MySQL"],
   "repo":"https://github.com/Saket37/Clinicio"},
  {"title":"Edge Detection","glyph":"🖼️","accent":"pink",
   "desc":"Detect edges from camera, device, or image URL.",
   "tags":["Kotlin","Firebase","OpenCV"],
   "repo":"https://github.com/Saket37/Edge-Detection"}
]
```

### Blog posts (placeholder set — replace with real MDX)
```json
[
  {"title":"Mastering State in Jetpack Compose","category":"compose","read":"6 min","glyph":"🧩","accent":"green"},
  {"title":"Clean Architecture with MVI","category":"architecture","read":"9 min","glyph":"🏗️","accent":"cyan"},
  {"title":"Coroutines: A Practical Guide","category":"kotlin","read":"7 min","glyph":"🤔","accent":"pink"}
]
```

---

## Interactions & Behavior / Animation Menu

The brief is "rich, animated & lively." Recommended, in priority order (respect
`prefers-reduced-motion` — disable non-essential motion). Framer Motion pairs well with Next; simple
ones can stay pure CSS.

1. **Terminal type-on (hero centerpiece).** On load, "type" the terminal lines sequentially with a
   blinking block caret (`▌`, green, 1s steps blink) that moves line to line, ~30–50ms/char, prompt
   lines appearing before output lines. Highest-impact moment — invest here. (Libs: a typewriter hook,
   or Framer Motion staggered chars.)
2. **Staggered hero entrance.** Terminal, H1, paragraph, buttons fade+rise (`translateY(16px)→0`,
   opacity 0→1) with 80–120ms stagger, ~0.7s ease-out.
3. **Floating stickers.** The "open to work!", "Compose ♥" badges and the ✦ sparkle bob vertically
   (`translateY(0 → -10px → 0)`, 3.5–4.5s ease-in-out, infinite, offset delays). Keep their static
   rotation (6deg / -5deg / -2deg).
4. **Animated background grid.** Slow diagonal pan of the 44px dot grid
   (`background-position 0→44px 44px`, 6s linear infinite). Very subtle.
5. **Scroll reveals.** Section labels + cards fade/rise as they enter viewport (IntersectionObserver
   or Framer `whileInView`), staggered within a grid.
6. **Card hover.** Project/blog/skill cards: lift `translateY(-4px)`, brighten border to full accent,
   and *grow the offset sticker shadow* (e.g. `5px 5px 0 → 8px 8px 0`) — 0.2s ease. Cheap, very "playful".
7. **Nav link hover.** Underline wipe in the link's own accent color; active link keeps green underline.
8. **CTA press.** Buttons translate toward their sticker shadow on `:active` (`translate(2px,2px)` +
   shrink shadow) — tactile "physical button" feel.
9. **Caret + cursor accents.** Blinking caret persists after typing; optional mono cursor on hover of
   terminal-style links.
10. **Optional flair.** Marquee of skills; magnetic buttons; a subtle green scan-line/glow on the hero;
    count-up on the "2.5 yrs" figure.

Durations: entrances 0.6–0.7s; hovers 0.15–0.2s; ambient loops 3–6s. Easing: `cubic-bezier(0.22,1,0.36,1)`
(ease-out-quint) for entrances, `ease-in-out` for loops.

## State Management
Mostly static/presentational. Client state: mobile nav open/close; active-section highlight
(IntersectionObserver on sections); optional blog tag filter. Blog/projects data as local MDX/JSON —
no fetching required for v1.

## Responsive Behavior
- Hero grid → single column below ~900px (terminal + copy stack above portrait).
- Projects/blog grids → 2-col at ~768px, 1-col on mobile.
- Nav → hamburger drawer on mobile; keep the `>_saket.dev` mark.
- Reduce H1 to ~40px on mobile; keep 40px min body-adjacent sizes for legibility.

## Assets
- **Portrait:** `saket_anand.jpg` (from current site: https://saketanand.dev/assets/saket_anand.jpg).
  Placeholder in the design is a striped box labeled `[ portrait.jpg ]`.
- **Skill/tech logos** (optional, from current site `/assets/`): android-logomark.svg, kotlin.svg,
  jetpack-compose.svg, new-php-logo.svg, laravel.svg, c.svg, mysql.svg, sqlite.svg, firebase.svg,
  microsoft-azure-seeklogo.com.svg, git.svg, markdown.svg. The redesign uses text chips + emoji glyphs;
  logos are optional enhancement.
- **Blog covers:** striped placeholders with emoji in the design — replace with real cover images.
- **Fonts:** Space Grotesk + JetBrains Mono (Google Fonts, via `next/font`).
- Emoji are used as playful glyphs (👋 ⚡ ⛈ 🏥 🖼️ 🧩 🏗️ 🤔). If you prefer, swap for a consistent
  icon set (e.g. Lucide, which ships with shadcn) — keep them monochrome-accent to match.

## Files
- `Portfolio_designs.dc.html` — the HTML design reference. Build from option **`2a`** (top turn).
  `1a` / `1b` are prior explorations for context only.
