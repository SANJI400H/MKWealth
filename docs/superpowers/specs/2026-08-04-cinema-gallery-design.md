# Morgan Kaiser — Cinema + Gallery Premium Redesign

Date: 2026-08-04  
Status: Approved direction (Approach 1)  
Scope: Visual + motion redesign of existing Next.js site. Section flow unchanged. Videos may arrive later.

---

## Goal

Make the Morgan Kaiser site feel **cinematic and bespoke**, not like a generic AI landing page — while keeping the approved IA:

Home → About → Services → Invest → Testimonials → Contact (+ `/about`, `/invest/*`, `/guide`).

## Decisions locked

| Decision | Choice |
|---|---|
| Pass type | Premium redesign (keep flow) |
| Cinema personality | Cinematic editorial |
| Mobile scrub | Full pinned scrub on mobile (same as desktop) |
| Static half | Hard cut to stark white gallery |

## Visual system

### Palette
- **Cinema acts:** video full-bleed; page chrome behind video is black; type white + gold `#B8953F`
- **Gallery half:** pure white `#FFFFFF`, ink `#111111`, same gold
- **Forbidden:** ivory/cream washes, full-frame white/ivory opacity over video, pill CTAs, frosted glass cards on video

### Type
- Montserrat Black — display / hero / section titles
- Montserrat Medium–Regular — body
- Gold **Morgan Kaiser** wordmark is a hero-level brand signal on cinema sections (not nav-only)
- Per cinema viewport: brand (where relevant) + one headline + one short line + CTA group

### Chrome
- Primary CTA: sharp rectangle, gold fill, ink text
- Secondary CTA: underline ghost (no border pill)
- Nav: transparent over cinema (white links, gold logo); solid white + hairline on gallery
- Separators: hairline rules, not cards

## Homepage — Cinema acts (1–3)

### Shared act behavior
- GSAP ScrollTrigger pin + **`scrub: true`** (realtime, no lag smoothing)
- Native document scroll only — **no Lenis**
- Videos locked: `walk-1.mp4` → Hero, `walk-2.mp4` → About, `walk-3.mp4` → Services
- Text reveal timed to video scroll progress (CSS `--act-fade`)
- Scrim: thin dark edge under type only (`left` / `right` / `bottom`) — never full white veil
- Mobile: same pin + scrub
- Do not nest `overflow-y-auto` inside pinned acts (steals wheel from scrub)

### Act 1 — Hero (`#home`)
- Walk L→R, stop, point; copy + CTAs fade ~mid scrub
- Brand name gold, large; headline white; CTAs Book + Guide

### Act 2 — Bio (`#about`)
- Whiteboard sequence; copy on opposite side after turn beat
- No glass panel — type over video with local edge
- Link to `/about`

### Act 3 — Services (`#services`)
- Seated turn; vertical service list on the open side (screen-right)
- List is open (hairline rows), not a frosted card
- Each row WhatsApp with service-specific prefill

## Homepage — Gallery half (4–6)

Hard mood cut after Services ends — pure white, quiet motion.

### Invest (`#invest`)
- Sparse intro type
- Three full-bleed stills (no rounded “card” chrome), Dubai / Abu Dhabi / RAK → `/invest/*`

### Testimonials (`#testimonials`)
- White field, hairline-top quotes only
- Mobile: native horizontal snap scroll
- Desktop: slow auto track, pause on hover

### Contact (`#contact`)
- Typographic close on white
- Sharp gold primary + underline secondaries + social text links

## Subpages
- `/about`, `/invest/*`, `/guide` inherit gallery tokens (white, sharp buttons, Montserrat)
- Guide gate: four fields; unlock without GHL if unset
- Old `/insights/*` remain redirected to `/invest/*`

## Motion rules
- Cinema: long scrub height (~2.8–3.2× vh), scrub ~0.65, lerped seek
- Gallery: RevealOnScroll fade/rise only; respect `prefers-reduced-motion` (reveal content immediately; scrub may freeze on first/last frame)
- Loader: first-session % loader on white/gold/black — keep, no ivory

## Out of scope (this pass)
- Final act video production (drop-in paths only)
- Real testimonials/project CMS
- GHL production wiring
- Instagram/YouTube live feeds

## Success criteria
1. No milky white overlay on any video act
2. Clear cinema → gallery mood break
3. Does not read as rounded-pill / frosted-card AI template
4. Mobile retains full scrub
5. `next build` passes
