# Morgan Kaiser / MKWealth — Full Site Architecture & Content Brief

> **Purpose of this document:** Upload or paste into ChatGPT (or similar) to analyse positioning, copy, SEO content, funnel assets, and what should be included or replaced before launch.  
> **Codebase:** `MKWealth` (package name `morgan-kaiser`)  
> **Repo:** https://github.com/SANJI400H/MKWealth  
> **Primary domain (env example):** `https://www.morgankaiser.com`  
> **Code fallback URL:** `https://www.morgankaiser.ae` *(mismatch — decide one canonical domain)*  
> **Locale:** `en-AE`

---

## 1. What this website is

A **personal brand + lead-generation site** for **Morgan Kaiser**, positioned as:

| Field | Current value |
|--------|----------------|
| Name | Morgan Kaiser |
| Config role | Off-Plan Real Estate Investment Advisor |
| Hero subtitle | Associate Director of Huspy |
| Company | Huspy (partner agent) |
| Market focus | Dubai off-plan for **foreign investors**; Abu Dhabi & Ras Al Khaimah as regional comparison |
| Tone | Numbers-first, anti–brochure-pitch; brokerage + mortgage under one roof |

**Primary conversion goals**

1. **Book a Meeting** → Google Appointment Schedule  
2. **Download Free Guide** → gated `/guide` funnel (Instagram/DM automation traffic)  
3. **WhatsApp** → prefilled messages from services / contact / footer  

---

## 2. Tech stack & architecture

| Layer | Choice |
|--------|--------|
| Framework | Next.js **14.2.35** (App Router) |
| Language | TypeScript 5.5, React 18.3 |
| Styling | Tailwind CSS 3.4 + `app/globals.css` design tokens |
| Motion | GSAP 3.15 (cinema homepage), Framer Motion 13 |
| Fonts | Montserrat (`next/font/google`, weights 400–800) |
| Icons | lucide-react |
| Email | Resend HTTP API (no SDK) — optional for lead notify |
| Booking | Plain URL (Google Calendar Appointment Schedule; env still named `NEXT_PUBLIC_CALENDLY_URL`) |
| Analytics | Meta Pixel (optional; fires PageView + Lead on form success) |

### High-level folder map

```
MKWealth/
├── app/
│   ├── layout.tsx              # Root layout, font, Meta Pixel, JSON-LD
│   ├── globals.css             # Brand tokens + cinema/button utilities
│   ├── robots.ts / sitemap.ts
│   ├── (site)/                 # Public marketing pages + SiteNav/BrandLoader
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   ├── invest/{dubai,abu-dhabi,rak}/
│   │   └── insights/…          # Legacy pages; redirected away
│   ├── guide/                  # Gated funnel (noIndex)
│   └── api/lead/ + guide-lead/ # Lead capture
├── components/
│   ├── motion/                 # CinemaController, CinemaPlayScene
│   ├── sections/               # Hero, Bio, Services, Invest, Testimonials, Contact, Nav, Footer
│   ├── insights/               # FAQ, GuideCallout
│   ├── seo/                    # Breadcrumbs, JsonLd
│   └── ui/                     # Logo, LeadForm, BookMeeting, WhatsApp, MetaPixel, etc.
├── content/                    # Editable content modules (services, guide, invest, videos, testimonials)
├── lib/                        # site-config, metadata, schema, leads
├── public/images|videos|reports/
└── .env.example
```

### Content vs code

Most **marketing copy and lists** live under `content/` and page files under `app/(site)/`. Changing “what the site says” usually means editing those files, not rewriting React structure.

---

## 3. Site map & routes

### Live / canonical pages

| Path | In sitemap? | Indexable? | Purpose |
|------|-------------|------------|---------|
| `/` | Yes | Yes | Cinema homepage + invest/testimonials/contact |
| `/about` | Yes | Yes | Long bio + portrait |
| `/invest/dubai` | Yes | Yes | Dubai off-plan SEO pillar |
| `/invest/abu-dhabi` | Yes | Yes | Abu Dhabi vs Dubai SEO |
| `/invest/rak` | Yes | Yes | Ras Al Khaimah SEO |
| `/guide` | No | **noIndex** | Lead-gated guide library (DM funnel) |

### Homepage section anchors (nav)

`/#home` → `/#about` → `/#services` → `/#invest` → `/#testimonials` → `/#contact`

### Redirects (legacy)

| From | To |
|------|-----|
| `/insights` | `/#invest` (302) |
| `/insights/dubai-off-plan-investment` | `/invest/dubai` (301) |
| `/insights/abu-dhabi-real-estate-investment` | `/invest/abu-dhabi` (301) |
| `/insights/ras-al-khaimah-real-estate-investment` | `/invest/rak` (301) |

**Content note:** Treat `/invest/*` as the SEO surface. `/insights/*` files still exist in the repo but users never see them without going through redirects.

### Robots

- Allow: `/`
- Disallow: `/guide`, `/api/`

---

## 4. Homepage experience (cinema UX)

### Flow

1. **CinemaController** snaps between three full-viewport “acts”:
   - **Home (Hero)** — `walk-1.mp4`
   - **About (Bio)** — `walk-2.mp4`
   - **Services** — `walk-3.mp4`
2. After cinema: normal scroll for **Invest → Testimonials → Contact → Footer**
3. Each cinema act plays video on arrive; copy/panel reveals around **50%** of clip (`textRevealAt`)
4. Playback rate ~**1.2×**; device-tuned panel timings (phone / tablet / desktop)
5. Reduced-motion / accessibility fallbacks exist

### Panel behaviours (design)

| Act | Overlay style |
|-----|----------------|
| Hero | Full-section white wash; brand name + title + CTAs |
| About | Side panel on desktop/tablet; full cover treatment on phone |
| Services | Split layout + service carousel (manual prev/next; autoplay pauses after manual use) |

### Homepage section copy (current)

#### Hero (`/#home`)

- **Brand line:** Morgan Kaiser  
- **Subtitle:** Associate Director of Huspy  
- **H1:** Dubai off-plan, without the brochure pitch.  
- **Sub:** Tax-free returns, Golden Visa paths, payment plans that fit your cash flow, from a Huspy partner who underwrites the deal first.  
- **CTAs:** Book a Meeting · Download Free Guide (`/guide`)

#### About cinema (`/#about`)

- **Eyebrow:** About  
- **H2:** Numbers first. / Listings second.  
- **Body:** Morgan Kaiser advises foreign investors on Dubai off-plan: unit selection, payment structure, financing, and handover. As a Huspy partner agent, brokerage and mortgage sit under one roof.  
- **Body 2:** Most clients buy from abroad. The first conversation is cash flow and risk, not a sales suite.  
- **CTA:** Full biography → `/about`

#### Services (`/#services`)

- **Eyebrow:** Services  
- **H2:** Around the deal, not just the unit.  
- **Interaction:** Carousel of 6 services; each opens WhatsApp with a tailored message  

#### Invest (`/#invest`)

- **Eyebrow:** Invest in the UAE  
- **H2:** Three markets. Different rules.  
- **Cards:** Dubai / Abu Dhabi / Ras Al Khaimah → respective `/invest/*` pages  

#### Testimonials (`/#testimonials`)

- **Eyebrow:** Testimonials  
- **H2:** After closing.  
- **Status:** All three entries are **PLACEHOLDER** (see §8)

#### Contact (`/#contact`)

- **Eyebrow:** Contact  
- **H2:** Start the conversation.  
- **CTAs:** Book a Meeting · Guide · WhatsApp *(no lead form on homepage)*  

---

## 5. Services catalogue (full)

Source: `content/services.ts`

| ID | Title | Summary | WhatsApp prefill |
|----|--------|---------|------------------|
| visa | Visa | Golden Visa eligibility through real estate, residency planning, and the paperwork path that actually clears. | Hi Morgan, I'd like to discuss Visa options through UAE real estate investment. |
| portfolio | Portfolio Management | Build and rebalance a Dubai-first property portfolio around yield, handover timing, and capital preservation. | Hi Morgan, I'd like to discuss Portfolio Management for UAE real estate. |
| banking | Banking Setup | Local account setup guidance so payments, mortgages, and rental income clear without last-minute friction. | Hi Morgan, I'd like help with Banking Setup for a UAE property purchase. |
| corporate | Corporate Structuring | When a personal freehold title is not enough: structuring options for holding UAE property through a company. | Hi Morgan, I'd like to discuss Corporate Structuring for UAE property. |
| mortgage | Mortgage Advisory | Financing options via Huspy, matching lender appetite to your payment plan and off-plan drawdown schedule. | Hi Morgan, I'd like Mortgage Advisory for an off-plan purchase in the UAE. |
| cashflow | Cash Flow Management | Map deposit, construction milestones, and post-handover costs so the plan fits your actual liquidity. | Hi Morgan, I'd like to discuss Cash Flow Management for a UAE investment. |

**Discussion prompts:** Are these the right six service buckets? Missing “developer due diligence”, “rental management”, “secondary market / exit”, “family office” etc.? Are WhatsApp openers on-brand?

---

## 6. Markets / invest pages

Source cards: `content/invest-locations.ts`

| Market | Tag | Card summary | Page |
|--------|-----|--------------|------|
| Dubai | Primary market | Deepest liquidity, widest off-plan inventory, and the market where Morgan places most clients. | `/invest/dubai` |
| Abu Dhabi | Lower volatility | Government-anchored demand and a calmer secondary market, suited to longer hold periods. | `/invest/abu-dhabi` |
| Ras Al Khaimah | Lower entry | Lower ticket sizes and a growing tourism story, with a thinner resale market as the trade-off. | `/invest/rak` |

### `/invest/dubai` — structure & claims

**Title:** Dubai Off-Plan Property Investment  
**Intro:** This is the market Morgan works in daily. Everything below is drawn from active deal flow, specific projects, not a citywide average.

**Sections**

1. **What off-plan actually means** — sold before/during construction; lower day-one capital; handover risk; developer delivery history > brochure  
2. **Buying as a foreigner** — 100% freehold in designated areas since 2002; no residency required; passport + funding + payment-plan clarity  
3. **ROI: what to actually expect** — gross rental yields generally **5–9%**; booking→handover appreciation often overstated  
4. **Golden Visa** — **AED 2M+** for 10-year renewable; off-plan often needs minimum % paid — confirm thresholds  

**FAQs**

1. How does buying off-plan property in Dubai work for foreigners?  
2. What is a realistic ROI on Dubai off-plan property?  
3. Is Dubai real estate really tax-free? *(no income/CGT for individuals; DLD ~4% transfer + admin fees)*  
4. How much deposit do I need? *(typically 5–20% booking; 60/40 or 70/30 style structures)*  

Ends with cross-links to AD/RAK + **GuideCallout** → `/guide`.

### `/invest/abu-dhabi` — structure & claims

**Title:** Abu Dhabi Real Estate Investment  
**Framing:** Regional context vs Dubai — comparison, not equal day-to-day deal flow.

**Sections**

1. **Who Abu Dhabi suits** — lower volatility, longer hold; thinner secondary market  
2. **Ownership & areas** — Saadiyat, Yas, Al Reem, Al Maryah; shorter freehold list than Dubai  

**FAQs:** Foreign ownership; better than Dubai?; yields **~5–7%**; Golden Visa at AED 2M federal threshold  

### `/invest/rak` — structure & claims

**Title:** Ras Al Khaimah Real Estate Investment  
**Intro:** Lower entry, thinner resale — what that trade-off means.

**Sections**

1. **The real trade-off** — price vs liquidity / smaller developer set  
2. **Who it suits** — longer horizon, lower ticket, tourism-led coastal growth  

**FAQs:** Foreign freehold (Al Marjan, Mina Al Arab, Al Hamra); tourism attention; vs Dubai; Golden Visa same AED 2M  

**Discussion prompts:** Accuracy of yield ranges, Golden Visa rules, fee % — need legal/compliance review. Depth of Dubai page vs AD/RAK — enough for SEO? Add project examples, process steps, risk disclosures, disclaimers?

---

## 7. About page (`/about`)

**Meta title:** About Morgan Kaiser | Dubai Off-Plan Investment Advisor  

**On-page**

- Portrait image  
- **H1:** Morgan Kaiser  
- **Sub:** Off-plan real estate investment advisor · Huspy partner agent · Dubai, UAE  

**Body paragraphs (paraphrased structure)**

1. Advises foreign investors who want UAE RE without a developer inventory pitch — covers unit selection, payment plans, financing, Golden Visa, handover, rental setup.  
2. Huspy partner = brokerage + mortgage advisory useful for off-plan (lender appetite must match construction payment schedules).  
3. Most clients outside UAE; first conversation = numbers, liquidity, risk — not a listing tour.  
4. Engagement shape: clarify brief → shortlist units → structure & close with handover plan.  

**CTAs:** Book a Meeting · See services (`/#services`)

---

## 8. Testimonials (placeholders — replace before launch)

Source: `content/testimonials.json`

| Placeholder name | Location | Quote | Claimed result |
|------------------|----------|-------|----------------|
| R. Al Farsi | London, UK | PLACEHOLDER | Purchased a 1BR in Dubai Marina, handed over on schedule. |
| S. Kapoor | Mumbai, India | PLACEHOLDER | Built a two-property portfolio in Dubai Creek Harbour. |
| J. Mueller | Berlin, Germany | PLACEHOLDER | Qualified for the Golden Visa through a Dubai off-plan purchase. |

**Discussion:** Real names/permission, photo policy, which outcomes are claimable, geography mix, compliance for “results”.

---

## 9. Guide funnel (`/guide`) — architecture & content library

### Intent

Automation-only traffic (e.g. Instagram DM → link). **Not meant to rank** (`noIndex`, excluded from sitemap).

### User journey

1. **Gate form** — name, phone (country-aware), email → `POST /api/lead` (source `guide-gate`)  
2. **Category pick** — multi-select topics  
3. **Videos** — one-by-one watch and/or download  
4. **PDF unlock** — after **≥75% watch** OR **≥1 download** of a video in that category  

Meta Pixel `Lead` fires on successful form submit when pixel ID is configured.

### Categories (`content/guide-library.ts`)

| ID | Label | Description |
|----|-------|-------------|
| off-plan | Off-plan basics | How off-plan works, risk, and what to check before you book. |
| payments | Payment plans | Construction milestones, cash flow, and handover structures. |
| visa | Golden Visa | Eligibility thresholds and the path through property investment. |
| dubai | Dubai market | Where deal flow sits today and how to read a micro-location. |

### Videos (currently placeholders reusing cinema clips)

| ID | Category | Title | Summary |
|----|----------|-------|---------|
| vid-off-plan-1 | off-plan | Why Dubai off-plan, right now | The case for off-plan versus completed stock for foreign buyers. |
| vid-payments-1 | payments | Payment plans and handover risk | How to stress-test a plan against your actual liquidity. |
| vid-visa-1 | visa | Golden Visa eligibility, step by step | What usually qualifies, and what still needs confirmation. |
| vid-dubai-1 | dubai | Reading Dubai deal flow | How Morgan shortlists units from active market context. |

### PDF reports (`public/reports/` — currently tiny stub files)

| ID | Category | Title | Summary |
|----|----------|-------|---------|
| pdf-off-plan | off-plan | Off-plan basics checklist | A one-page checklist before you reserve a unit. |
| pdf-payments | payments | Payment plan briefing | How to compare 60/40 vs 70/30 style structures. |
| pdf-visa | visa | Golden Visa notes | Eligibility points to confirm with the Land Department path. |
| pdf-dubai | dubai | Dubai market snapshot | A short briefing on where Morgan focuses day to day. |

**Discussion prompts:** Real video scripts/outlines; PDF outlines/page counts; more topics (Abu Dhabi, RAK, mortgages, developer due diligence)?; unlock rules too strict/loose?; email nurture after gate?

---

## 10. Lead capture & APIs

| Endpoint | Role |
|----------|------|
| `POST /api/lead` | Validate name (≥2 chars), phone (E.164-ish), email; optional Resend email to Morgan; returns `{ ok, emailed }` |
| `POST /api/guide-lead` | Legacy alias; forces `source: "guide-gate"` |

**Typed sources (code):** `guide-gate` | `service` | `invest` | `contact`  
**Currently wired UI:** primarily the **guide gate**. Homepage contact does **not** use a form.

**Resend env (local only — never commit keys)**

- `RESEND_API_KEY`  
- `LEAD_NOTIFY_EMAIL`  
- `LEAD_FROM_EMAIL` (until custom domain verified, often `onboarding@resend.dev`)  

If Resend is unset, API still returns success and logs server-side.

---

## 11. Contact, booking, socials

| Channel | Current |
|---------|---------|
| WhatsApp | `+971 58 530 0329` → `971585300329` → `wa.me` |
| Book a Meeting | Google Appointment Schedule URL (env `NEXT_PUBLIC_CALENDLY_URL`) |
| Instagram | https://www.instagram.com/_morgankaiser_/ |
| LinkedIn | https://www.linkedin.com/in/morgan-kaiser-0701902b7 |
| TikTok | https://www.tiktok.com/@_morgankaiser_ |
| YouTube | https://www.youtube.com/@itsmorgankaiser |
| Facebook | https://www.facebook.com/share/18TWwVSoLe/ |

Socials appear in footer and Person schema `sameAs`.

---

## 12. SEO & structured data

- Per-page metadata via `lib/metadata.ts` (title, description, canonical, OG, Twitter)  
- Root: Person + RealEstateAgent JSON-LD  
- Invest pages: FAQPage JSON-LD via `FaqSection`  
- Breadcrumbs on about + invest pages  
- Default OG image: `/images/og-default.jpg`  
- Sitemap: `/`, `/about`, `/invest/dubai`, `/invest/abu-dhabi`, `/invest/rak` only  

**Current meta examples**

| Page | Title | Description focus |
|------|-------|-------------------|
| Home | Dubai Off-Plan Property Investment Advisor \| Morgan Kaiser | Foreign investors, Huspy, Golden Visa |
| About | About Morgan Kaiser \| … | Bio, Huspy, portfolio structuring |
| Dubai | Dubai Off-Plan Property Investment Guide \| … | Payment plans, ROI, Golden Visa, tax-free |
| Abu Dhabi | Abu Dhabi Real Estate Investment vs. Dubai \| … | Ownership, yields, liquidity, who suits |
| RAK | RAK Property Investment for Foreigners \| … | Lower entry, tourism, liquidity trade-offs |
| Guide | Unlock the Dubai Off-Plan Investment Guide | noIndex |

---

## 13. Design system (visual brand)

| Token | Value |
|-------|--------|
| Ink | `#1d1d1f` |
| Ink muted | `#6e6e73` |
| Maroon (primary) | `#681A2B` |
| Maroon dark | `#42101C` |
| Silver | `#C4C7CB` |
| Soft white / surface | `#F7F7F5` |
| Charcoal / ink | `#111111` |
| Paper / white | `#FFFFFF` |
| Paper | `#ffffff` |
| Font | Montserrat everywhere (display + body) |
| Max content width | ~1120px |

**Look:** Light paper background, gold accents, editorial cinema (not dark mode / purple AI defaults). Primary buttons = gold gradient pills; ghost buttons for secondary.

**Branding assets**

- Nav/footer/loader: MK silver logo `public/images/mk-logo.png` (transparent)  
- Hero: **text brand** (“Morgan Kaiser”) — no logo in hero  

---

## 14. Media inventory

### Images (`public/images/`)

- `mk-logo.png`  
- `morgan-hero.jpg`, `morgan-offer.jpg`, `morgan-portrait.jpg`  
- `morgan-walk-wave-poster.jpg`  
- `og-default.jpg`  
- `project-1.jpg`, `project-2.jpg`, `project-3.jpg` (invest cards)

### Videos (`public/videos/`)

- `walk-1.mp4`, `walk-2.mp4`, `walk-3.mp4` — cinema acts  
- `morgan-walk-wave.mp4` — also used as one guide video placeholder  

### Reports (`public/reports/`)

- `off-plan-basics.pdf`, `payment-plans.pdf`, `golden-visa.pdf`, `dubai-market.pdf`  
- **Status:** placeholder stubs — replace with real documents before promoting the guide  

---

## 15. Integrations checklist

| Integration | Status / note |
|-------------|----------------|
| Google Appointment Schedule | Wired via env/default URL |
| WhatsApp | Wired |
| Social profile links | Wired |
| Meta Pixel | Env empty until ID set |
| Resend lead email | Optional; needs domain for branded From |
| Vercel / hosting | Separate deploy step (CLI login if using Vercel CLI) |
| Canonical domain | Decide `.com` vs `.ae` |

---

## 16. Known content / launch gaps (for ChatGPT discussion)

Use this as a prioritisation list:

1. **Replace placeholder testimonials** with real, permissioned quotes/results.  
2. **Replace guide videos** with dedicated educational clips (scripts, length, CTAs).  
3. **Replace stub PDFs** with real checklists/briefings.  
4. **Legal/compliance review** of tax, ROI ranges, Golden Visa, fees — add disclaimers if needed.  
5. **Canonical domain** (`.com` vs `.ae`) and Meta Pixel ID.  
6. **Resend From domain** when DNS ready.  
7. **Homepage contact** — keep CTAs only, or add a simple lead form?  
8. **Service set** — confirm the six offerings vs what Morgan actually sells day-to-day.  
9. **SEO depth** — more Dubai sections (process timeline, risk, developer selection)? Separate blog/insights again?  
10. **Voice consistency** — hero “Associate Director of Huspy” vs config role “Off-Plan Real Estate Investment Advisor”.  
11. **About page length** — enough social proof (credentials, years, markets closed)?  
12. **Languages** — English only today; any Arabic/Russian/etc. demand?  

---

## 17. Suggested ChatGPT prompts (copy-paste)

**Positioning**

> Based on this site brief, critique Morgan Kaiser’s positioning for foreign Dubai off-plan buyers. What’s strong, what’s generic, and what content would make this feel like a real advisor brand vs a brochure site?

**Homepage copy**

> Rewrite or stress-test the homepage hero, about, services, invest, and contact headlines for clarity and conversion without sounding salesy. Keep the “numbers first” voice.

**Guide library**

> Propose a full curriculum for the /guide funnel: category list, video titles + 5-bullet outlines, and PDF outlines. Assume one video + one PDF per category to start.

**SEO**

> Suggest an SEO content plan for /invest/dubai, /invest/abu-dhabi, and /invest/rak: H2s, FAQ additions, internal links, and claims that need fact-checking.

**Compliance**

> Flag any statements in this brief that need legal disclaimers or softer wording for UAE property marketing to foreign investors.

**Missing pages**

> What additional pages or sections should this site have before launch (e.g. process, FAQ hub, privacy, credentials)? Prioritise by conversion vs SEO vs trust.

---

## 18. Quick product summary (one paragraph)

MKWealth is a Next.js authority platform for Morgan Kaiser (Huspy) with a three-act cinematic homepage, numbers-first positioning, three UAE market pillars (off-plan and secondary framed on Dubai), regrouped services, an Insights hub with scalable articles, a live True Yield calculator, `/analyse` and strategy-session conversion paths, methodology (no fake testimonials), credentials/case-study templates, and legal placeholders. The noindexed `/guide` funnel captures leads then unlocks resources; analytics and CRM-ready lead fields are prepared for automation.

---

## Navigation architecture — Phase 1 IA (implemented)

Single source: `content/navigation.ts` (header mega menus + footer).

**Primary bar:** Morgan ▾ · Invest ▾ · Intelligence ▾ · Work With Morgan ▾ · **[Book Strategy Session]** → `/strategy-session`

| Family | Landing | Mega menu |
|--------|---------|-----------|
| Morgan | `/about` | Overview, Story, Philosophy, Methodology, Credentials, Media, Client Results |
| Invest | `/invest` | Markets (Dubai, AD, RAK) · Strategies (off-plan / secondary anchors on Dubai) |
| Intelligence | `/insights` | Category filters + Calculators / True Yield |
| Work With Morgan | `/work-with-morgan` | Engagement sections + Analyse + Strategy Session |
| CTA | `/strategy-session` | Briefing page first; calendar booking on that page |

**Homepage after cinema:** Invest → Investor Intelligence → Proof → Contact.  
**Section nav:** local sticky nav on `/about`, `/invest/dubai`, `/work-with-morgan`.  
**Not in primary bar:** Free guide (`/guide` noindex), legal.

**Phase 2/3 live:** `/resources`, `/videos`, `/reports`, `/the-real-numbers`, `/areas` (+slug), `/developers` (+slug), purchase-cost + payment-plan calculators. Case studies remain unpublished until permissioned.

**Footer columns:** Morgan · Invest · Intelligence · Work With Morgan · Legal

---

## 19. Status update — P0 + P1 complete (Aug 2026)

### Calculator

| Tool | Status | URL |
|------|--------|-----|
| True Yield Calculator | **LIVE** | `/calculators/true-yield` |
| Calculators index / registry | **LIVE** | `/calculators` |
| Dubai Purchase Cost Calculator | Planned (not built) | — |
| Cash-on-Cash Return Calculator | Planned | — |
| Mortgage vs Cash Comparison | Planned | — |
| Off-Plan Payment Plan Comparison | Planned | — |

True Yield is fully usable now (gross yield, net income, true capital deployed, annual cost breakdown, handoff into `/analyse`). **No Morgan input is required for it to function.** Optional later: preferred default fee assumptions, example numbers, or wording tweaks on each cost line.

---

### What we have done so far (P0 + P1)

**Positioning & cinema (kept)**

- Broader public title: Dubai Real Estate Investment Advisor & Property Portfolio Strategist
- Expertise line: Off-Plan | Secondary Market | Property Portfolio Strategy
- Hero: “Numbers first. Property second.”
- Primary CTAs: Book a Strategy Session · Analyse an Investment · Explore Investment Insights
- Cinema sequence preserved: Hero → About → Services, then Invest → Methodology → Contact
- Fake testimonials removed; replaced with Methodology / how Morgan works

**Conversion levels**

- Level 1 (research): Insights, True Yield calculator, `/guide` (still noindex)
- Level 2 (evaluation): `/analyse` — CRM-ready fields; document upload reserved for later
- Level 3 (high intent): `/work-with-morgan` + Google Appointment Schedule booking

**Authority platform**

- `/insights` hub restored (removed redirect to `/#invest`)
- Scalable TypeScript insight content model + article template + Article JSON-LD
- Two published educational articles (gross vs net yield; off-plan payment plans)
- Dubai invest page: off-plan vs secondary comparison architecture (opinions not invented)
- Services regrouped around strategy, underwriting, acquisition, financing, portfolio, post-purchase
- `/credentials` and `/case-studies` templates — nothing fabricated published
- About expanded with clearly marked Morgan discovery placeholders
- Legal placeholders: `/privacy`, `/terms`, `/disclaimer`
- Canonical domain default: `https://www.morgankaiser.com`
- Central regulatory config (`content/regulatory.ts`) for visa/fees/yield/tax language
- Analytics event layer + optional GA4; UTM attribution capture; expanded lead sources
- Guide: PDFs unlock after lead submit; video/PDF engagement used for scoring signals only

**Verification:** `npm run build` succeeded after P0+P1.

**P2/P3 expansion (Aug 2026):** Areas, developers, resources, videos, reports, The Real Numbers hubs + two additional live calculators (purchase cost, payment plan). Starter content is working-framework / provisional — not invented yields, rankings, or credentials. Cash-on-cash and mortgage-vs-cash remain planned. Newsletter and CRM webhook still deferred.

---

### What is required from Morgan to continue

#### Must-have before a strong public launch (content / trust)

1. Exact **Huspy role title** (e.g. Associate Director vs “Partner agent”)
2. **About answers:** career story, why numbers-first, international-investor experience, methodology, how clients work with him
3. **Strategy session details:** confirmation of who it’s for, duration if any, what to prepare beforehand, what happens after
4. **Approve or correct** the current public title and expertise line
5. **Regulatory confirmations** (or sources + dates): Golden Visa wording, typical DLD/transfer fee, yield language — so claims can be marked verified
6. **Legal:** approve or supply Privacy / Terms / Disclaimer text (or send to counsel)

#### Should-have for authority (next content sprint)

7. **Credentials** with evidence only: RERA/DLD number, transaction volume, client geographies, awards, media/speaking
8. **1–3 real case studies** (permissioned) — otherwise keep the empty template
9. **Real testimonials** (permissioned) — otherwise keep Methodology only
10. **Guide assets:** real category videos + real PDFs (current files are placeholders)
11. **More Insights:** topics/titles he wants published (team can draft; Morgan approves)
12. **Off-plan vs secondary:** his actual views/rankings for Dubai (page structure exists; do not invent)

#### Ops (Sanji / deploy — not Morgan narrative)

- Commit & push to GitHub
- Deploy and set env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, Meta Pixel, Resend
- Redirect `morgankaiser.ae` → `.com` if both exist

---

### Suggested next-step order

1. Commit & push + deploy / env
2. Morgan discovery interview → fill profile, About, credentials, regulatory verified flags
3. Replace guide PDFs/videos + add 2–4 more approved insights
4. Then deepen area/developer theses with Morgan-verified comps (replace working frameworks)
5. Newsletter + CRM webhook when ops ready
6. Remaining calculators: cash-on-cash, mortgage vs cash

---

*Generated from the MKWealth codebase for content & architecture analysis. Updated Aug 2026 after P0 + P1 authority-platform implementation.*
