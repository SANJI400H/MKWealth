# MKWealth P0 → P1 Authority Platform

**Scope:** P0 launch hygiene + P1 core authority (no P2 area/developer scaffolds).  
**Content system:** TypeScript modules under `content/`.  
**Preserve:** Cinema Hero → About → Services, then Invest → Proof → Contact.

## P0

1. Canonical `www.morgankaiser.com`; expandable brand/role config; regulatory config.
2. Soften tax-free / unsourced yield claims; centralise Golden Visa / fees.
3. Remove fake testimonials → Methodology section.
4. Restore `/insights` hub; remove `/insights` → `/#invest` redirect; keep old market article 301s to `/invest/*`.
5. Add `/analyse`, `/privacy`, `/terms`, `/disclaimer`, strategy-session page framing.
6. Analytics event helper (GA4-ready + Meta); expand lead sources.
7. Guide: unlock PDFs after lead (engagement for scoring only).
8. Nav/footer/CTAs: Book a Strategy Session; Analyse; Insights; Tools.

## P1

1. Insights content model + `[slug]` template + 2 educational sample articles (methodology, not invented returns).
2. `/calculators` + `/calculators/true-yield` + handoff to `/analyse`.
3. Services regroup; About placeholders; `/credentials`; `/case-studies` template (draft-only empty).
4. Dubai page: off-plan vs secondary architecture (no invented thesis).
5. CRM-ready lead payload; Article/Person schema updates.

## Verify

`npm run lint`, `npm run build`, sitemap/robots, forms.
