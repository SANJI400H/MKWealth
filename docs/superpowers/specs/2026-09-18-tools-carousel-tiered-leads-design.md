# Tools Carousel + Tiered Calculator Leads — Design

**Date:** 2026-09-18  
**Status:** Approved in conversation; awaiting final spec review before implementation  
**Pages:** `/calculators`, `/tools` (Calculators section)  
**Related:** `ToolsGateProvider`, `EditorialCarousel`, `lib/leads.ts`, guide qualify, strategy session

---

## 1. Problem

`/calculators` (and the Calculators block on `/tools`) show a plain vertical list of links. That feels static. Separately, calculator gating today blocks **editing inputs** until registration; the desired soft-launch behaviour is: **enter numbers freely**, gate only when the visitor asks for **results**, capture a lighter lead, and rank leads by intent tier.

## 2. Goals

1. Replace the plain calculator lists with an interactive **horizontal peek carousel** on `/calculators` and `/tools`.
2. Show **live tools first**, then **coming soon** tools (badge after the title).
3. Soften calculator access: inputs free; **Calculate / See results** opens a **name + email** modal; on submit, unlock results and **record the calculation snapshot**.
4. Persist explicit **lead tiers**: strategy = 1, private guide = 2, calculators = 3.

## 3. Non-goals

- New private guide PDF/video file hosting (remain “email materials” promise).
- Changing strategy-session approve → Meet booking UX.
- Autoplay carousel.
- Redesigning individual calculator maths / methodology copy.

## 4. UX

### 4.1 Carousel

- Reuse `EditorialCarousel` (scroll-snap, dots, prev/next, reduced-motion aware).
- Shared presentational cards so `/calculators` and `/tools` stay in sync.
- Card content:
  - Title
  - Status badge immediately after title: **Live** or **Coming soon**
  - Short summary from `content/calculators.ts`
  - CTA: “Open calculator” for live; muted/disabled (no navigation) for planned
- Sort order: all `status === "live"` first (registry order), then `status === "planned"`.

### 4.2 Calculator gate (Tier 3)

**Before unlock**

- All input fields are editable without a modal.
- Results remain obscured (existing blur / overlay pattern via `GatedResults`, or equivalent).
- Primary action labelled clearly (e.g. **Calculate** / **See results**) calls `requireAccess` after writing the latest snapshot into the gate context.

**On Calculate (locked)**

- Modal opens with a short intro.
- Fields: **Full name**, **Email** only (no phone required for this tier).
- Submit → POST `/api/lead` with:
  - `source`: `calculator` (or existing `tools` when opened from tools shell — prefer `calculator` for tool pages)
  - `leadScoreHint` / tier: **tier_3** (see §5)
  - `calculatorSnapshot`: inputs + computed outputs for that tool
- On success: unlock cookie/session as today, close modal, reveal results, run any pending “show results” callback.

**After unlock**

- Calculate updates results immediately; no second gate in the same browser session (existing unlock cookie behaviour).

### 4.3 Guide (Tier 2) and Strategy (Tier 1)

- No carousel work.
- Ensure submit paths stamp **tier_2** (guide qualify / grant flows) and **tier_1** (strategy session request).
- Private guide remains: qualify → approve → topic pick → “We’ll email your materials.”

## 5. Lead model

| Tier | Intent | Primary sources | Capture fields |
|------|--------|-----------------|----------------|
| **1** | Strategy session | `strategy-session` | Existing session form (name, phone, email, capital, ownership) |
| **2** | Private Investor Guide | `guide` | Existing qualify form |
| **3** | Calculator / tools | `calculator`, `tools` | Name + email (+ snapshot) |

**Storage**

- Add `lead_tier` smallint (1–3) on `public.leads` **or** encode via `lead_score_hint` values `tier_1` | `tier_2` | `tier_3` if a migration is undesirable for soft launch.
- **Preferred:** set `lead_score_hint` to `tier_1` / `tier_2` / `tier_3` and include `Lead tier: N` in the Resend notify body. Add optional DB column `lead_tier` in a follow-up migration when Supabase is confirmed on VPS.
- Phone validation: for tier 3 only, **phone may be empty** in the UI; other tiers keep current phone rules. Until a DB migration relaxes `leads.phone NOT NULL`, persist an empty string or a documented sentinel (e.g. `n/a`) server-side so inserts still succeed.

## 6. Architecture

```
content/calculators.ts          → registry (unchanged shape)
components/calculators/
  CalculatorToolsCarousel.tsx   → NEW client wrapper (sort + cards + EditorialCarousel)
app/(site)/calculators/page.tsx → use carousel
app/(site)/tools/page.tsx       → Calculators section uses same carousel
components/tools/ToolsGateProvider.tsx
  → intro/copy for calculate gate; optional phoneMode
components/ui/LeadForm.tsx
  → optional hidePhone / requirePhone=false for tier 3
components/calculators/*Calculator.tsx
  → remove guardSet on input change; gate on Calculate + setCalculatorSnapshot
lib/leads.ts
  → map tier hints; allow empty phone when tier_3 / calculator source
```

No new carousel library. Framer `useReducedMotion` continues via `EditorialCarousel`.

## 7. Copy

- Index intro: clarify that tools can be explored freely; results unlock with name and email.
- Gate title: e.g. “See your results”
- Gate intro: e.g. “Enter your name and email to unlock this calculation. We’ll keep your numbers with your enquiry.”
- Submit: “Show results”

## 8. Analytics

- Keep `calculator_start` on first interaction.
- On successful tier-3 submit: existing `lead_score_signal` / lead events; include calculator id in intent or snapshot.
- Optional: `calculator_calculate_gated` when Calculate opens the modal while locked.

## 9. Testing

- `/calculators` and `/tools`: carousel renders, live before planned, arrows/dots work, planned CTA does not navigate.
- Locked calculator: can edit inputs; results blurred; Calculate opens name+email modal (no phone field).
- Submit with snapshot → results unlock; second Calculate does not re-open gate.
- Strategy and guide submits still notify Morgan and carry tier_1 / tier_2 hints.
- `tsc` + page smoke 200s.

## 10. Rollout

1. Shared carousel component + wire both pages.
2. LeadForm / leads.ts phone + tier hints.
3. Soften all four live calculators to calculate-time gate.
4. Stamp tier_1 / tier_2 on session + guide paths.
5. Verify locally; commit; deploy with next soft-launch push.

---

## Decision log

- **Carousel style:** Horizontal peek cards (EditorialCarousel) — user chose A.
- **Surfaces:** Both `/calculators` and `/tools` — user chose B.
- **Cards:** Live first, Coming soon after title; calculate-time name+email gate; tiers 1/2/3 — user approved Approach 1 design 2026-09-18.
