# Cinema + Gallery Premium Redesign — Implementation Plan

> **For agentic workers:** Execute inline in this session. No git repo present — skip commit steps.

**Goal:** Finish the Cinema + Gallery premium redesign so video acts feel cinematic and the static half hard-cuts to a stark white gallery.

**Architecture:** Keep existing Next.js App Router structure. Polish tokens, ActScrollScene edges, cinema section copy/layout, and gallery sections. Videos remain drop-in via `content/videos.ts`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, GSAP ScrollTrigger (scrub: true, native scroll — no Lenis), Montserrat

**Video mapping (locked):** walk-1 → Hero, walk-2 → About, walk-3 → Services

## Global Constraints

- No ivory/cream washes or full-frame white opacity over video
- Sharp gold CTAs (no pills); underline ghosts for secondary
- Full mobile scrub (same pin behavior as desktop)
- Hard cut to pure white after Services
- Prefer existing files; YAGNI

## File map

| File | Role |
|---|---|
| `app/globals.css` | Tokens, buttons, act overlay, thinner cinema aids |
| `tailwind.config.ts` | Paper/ink/gold only |
| `components/motion/ActScrollScene.tsx` | Full-bleed scrub; local dark edge only |
| `components/sections/Hero.tsx` | Cinema act 1 |
| `components/sections/Bio.tsx` | Cinema act 2 |
| `components/sections/Services.tsx` | Cinema act 3 + open list |
| `components/sections/Invest.tsx` | Gallery stills |
| `components/sections/Testimonials.tsx` | Gallery quotes |
| `components/sections/Contact.tsx` | Gallery close |
| `components/sections/SiteNav.tsx` | Transparent ↔ white |

---

### Task 1: Cinema edge + gallery hard cut

**Files:** Modify `ActScrollScene.tsx`, `globals.css`, `Invest.tsx`

- [ ] Soften edge gradients to local-only (lower max opacity, shorter falloff)
- [ ] Add gallery hard-cut: Invest opens with generous top padding and optional top hairline; ensure `bg-paper` pure white
- [ ] Verify no `ivory` classes remain on homepage sections

### Task 2: Cinema acts polish

**Files:** `Hero.tsx`, `Bio.tsx`, `Services.tsx`, `SiteNav.tsx`

- [ ] Ensure brand-first hero, high-contrast white type
- [ ] Bio/Services: no glass panels; open service list
- [ ] Nav transparent over `#home|#about|#services`, white on gallery

### Task 3: Gallery half polish

**Files:** `Invest.tsx`, `Testimonials.tsx`, `Contact.tsx`, `SiteFooter.tsx`

- [ ] Larger display type, more whitespace, square stills, snap carousel mobile
- [ ] Contact typographic close with sharp CTAs

### Task 4: Verify

- [ ] `npx next build` exits 0
- [ ] Smoke: homepage loads; no ivory overlays in ActScrollScene

---

## Spec coverage

- Visual system → Tasks 1–2
- Cinema acts → Task 2
- Gallery half → Tasks 1, 3
- Mobile full scrub → already in ActScrollScene (Task 1 check)
- Out-of-scope videos/GHL → not tasked
