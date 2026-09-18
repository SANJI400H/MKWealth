# Tools Carousel + Tiered Calculator Leads — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Horizontal calculator carousel on `/calculators` and `/tools`, calculate-time name+email gate with snapshot, and lead tiers 1/2/3.

**Architecture:** Reuse `EditorialCarousel` for cards; soften `ToolsGateProvider` + calculators so inputs are free and Calculate opens a phone-optional lead modal; stamp `lead_score_hint` as `tier_1` | `tier_2` | `tier_3`.

**Tech Stack:** Next.js 14 App Router, React 18, existing Framer `useReducedMotion` via EditorialCarousel, Supabase/Resend lead pipeline.

**Spec:** `docs/superpowers/specs/2026-09-18-tools-carousel-tiered-leads-design.md`

## Global Constraints

- No new carousel library — use `components/ui/EditorialCarousel.tsx`.
- Tier 3 form: name + email only; phone may be empty in UI; server accepts empty phone for calculator/tools/tier_3.
- Live calculators before planned in carousel sort.
- Do not change strategy Meet approve UX or guide email-promise UX beyond tier stamps.
- Prefer matching existing copy/typography (`font-display`, maroon, `btn-primary`).

---

### Task 1: Lead tiers + optional phone for calculator leads

**Files:**
- Modify: `lib/leads.ts`
- Modify: `components/ui/LeadForm.tsx`
- Modify: `components/tools/ToolsGateProvider.tsx`
- Modify: `app/api/session/request/route.ts`
- Modify: `app/api/guide/request/route.ts`

**Interfaces:**
- Produces: `leadScoreHint` values `tier_1` | `tier_2` | `tier_3`; `LeadForm` prop `requirePhone?: boolean` (default true); gate uses `requirePhone={false}` and `leadScoreHint: "tier_3"`.

- [ ] **Step 1:** In `parseLead`, skip phone pattern when `leadScoreHint === "tier_3"` OR `source` is `calculator` or `tools`; if phone empty, store `""` (or `"n/a"` if empty string breaks notify — prefer `""`).
- [ ] **Step 2:** In `notifyByEmail`, prepend `Lead tier: N` derived from hint (`tier_1`→1, etc.; fallback by source).
- [ ] **Step 3:** `LeadForm`: add `requirePhone?: boolean` and `leadScoreHint?: string`; when `requirePhone === false`, omit phone field and send `phone: ""` plus `leadScoreHint`.
- [ ] **Step 4:** `ToolsGateProvider`: title/intro for results unlock; `LeadForm` with `requirePhone={false}`, `leadScoreHint="tier_3"`, submit “Show results”; source `calculator` when `source === "calculator"` else `tools`.
- [ ] **Step 5:** Session request → `leadScoreHint: "tier_1"`; guide request → `leadScoreHint: "tier_2"`.

---

### Task 2: CalculatorToolsCarousel + wire pages

**Files:**
- Create: `components/calculators/CalculatorToolsCarousel.tsx`
- Modify: `app/(site)/calculators/page.tsx`
- Modify: `app/(site)/tools/page.tsx`

**Interfaces:**
- Consumes: `calculators` from `content/calculators.ts`, `EditorialCarousel`
- Produces: `<CalculatorToolsCarousel />` client component

- [ ] **Step 1:** Build client component: sort live then planned; each slide is a card with title + Live/Coming soon badge + summary + CTA (Link if live, `span` disabled if planned).
- [ ] **Step 2:** Replace `<ul>` lists on both pages; update intro copy per spec §7.
- [ ] **Step 3:** Smoke: both pages 200; planned cards not links.

---

### Task 3: Soften all four live calculators

**Files:**
- Modify: `components/calculators/TrueYieldCalculator.tsx`
- Modify: `components/calculators/PurchaseCostCalculator.tsx`
- Modify: `components/calculators/PaymentPlanCalculator.tsx`
- Modify: `components/calculators/MortgageEstimateCalculator.tsx`
- Modify: `components/tools/GatedResults.tsx` (button copy → Calculate / See results)
- Modify: calculator page wrappers under `app/(site)/calculators/*/page.tsx` (gate title/intro)

**Interfaces:**
- Consumes: `useToolsGate().requireAccess`, `setCalculatorSnapshot`, `unlocked`
- Behaviour: inputs use plain setters; Calculate button / GatedResults overlay calls `requireAccess` after snapshot is current.

- [ ] **Step 1:** Remove `guardSet` and `onFocus` gates that block editing.
- [ ] **Step 2:** Keep `GatedResults` blur until unlocked; overlay button triggers `requireAccess()`.
- [ ] **Step 3:** Ensure `setCalculatorSnapshot` still runs on input change so submit includes latest numbers.
- [ ] **Step 4:** Update ToolsGateProvider props on each calculator page to “See your results” copy.

---

### Task 4: Verify

- [ ] `./node_modules/.bin/tsc --noEmit` exit 0
- [ ] Manual: edit calculator inputs locked → Calculate → name+email → results unlock with emailed lead
- [ ] Carousel on `/calculators` and `/tools`

---

## Spec coverage

| Spec item | Task |
|-----------|------|
| Carousel both pages | 2 |
| Live then coming soon | 2 |
| Calculate-time name+email + snapshot | 1, 3 |
| Tiers 1/2/3 | 1 |
| Phone optional tier 3 | 1 |
| No guide file / session Meet changes | — (non-goal) |
