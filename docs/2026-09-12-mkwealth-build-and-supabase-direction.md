# MKWealth Platform Build Brief — Soft Launch + Access Layers + Supabase Direction

**Date:** 2026-09-12  
**Repo:** `MKWealth` (Morgan Kaiser personal brand + lead / client platform)  
**Purpose of this doc:** Single source of truth for discussion. Review → mark alterations → share automation architecture → decide Supabase schema and integration together.  
**Status:** Soft-launch site is live in code. Tools/Guide soft-gate + Private Desk approval + Client Portal link-out are implemented. **No Supabase yet** — leads are email (Resend) + signed cookies. This doc proposes how to move the system of record to Supabase so Morgan’s upcoming automation can share one brain.

---

## 1. What we are building (product intent)

Morgan Kaiser’s site is **not** a mass brokerage catalogue. It is:

1. **Public brand + SEO** — Vision → Strategy → Property; markets (Dubai / Abu Dhabi / RAK).  
2. **Prospect capture** — soft registration to unlock Tools + Investor Guide (videos / PDFs).  
3. **Qualification** — strategy session; human approval.  
4. **Private Desk** — elevated briefings after approval (Matt Siddell–style gate, lighter v1).  
5. **Client Portal** — existing investors only → hosted Private Wealth Dashboard (Firebase HTML today).  
6. **Future** — Morgan-assist **automation** (you are building) should read/write the same leads, approvals, engagement, and client records.

**Principle:** Soft unlock for volume education; hard unlock for trust / IP; portal for assets under management. Do not collapse all three into one cookie.

---

## 2. Current information architecture (nav)

Soft-launch primary nav:

| Tab | Path(s) | Audience |
|-----|---------|----------|
| **Morgan** | `/about` | Public |
| **Invest** | `/invest`, Dubai / AD / RAK | Public SEO |
| **Tools** | `/tools`, `/calculators/*`, `/guide`, link to `/desk` | Prospects (soft gate on use) |
| **Work With Morgan** | `/work-with-morgan`, `/strategy-session` | High-intent |
| **Portal** | `/portal`, link to `/desk` | Current clients (+ desk for approved) |

Intelligence hubs exist in the codebase but are **not advertised** in soft launch.

**Robots:** `/guide`, `/desk`, `/portal`, `/api/` are disallowed.

---

## Lead storage (Supabase) — added 2026-09-14

Every `submitLead` call now:

1. **Inserts** into Supabase `public.leads` (when `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set)
2. **Emails** Morgan via Resend (`LEAD_NOTIFY_EMAIL`)

SQL: `supabase/migrations/20260914_create_leads.sql` (run once in Supabase SQL Editor).

RLS enabled with **no public policies** — only the service role (Next.js API routes) can write.

```text
CALCULATORS (main site /tools)
  └── Gate: name + WhatsApp + email
  └── Lead includes calculatorSnapshot (inputs + outputs)
  └── Cookie: mk_tools_access

INVESTOR GUIDE (private community — prefer subdomain)
  └── Not in primary nav
  └── NEXT_PUBLIC_GUIDE_URL e.g. https://guide.morgankaiser.com
  └── Main /guide redirects to subdomain when configured
  └── Qualify questions → submit
  └── Default: pending until Morgan approve/reject email links
  └── Or GUIDE_AUTO_APPROVE=true → unlock immediately
  └── Cookie: mk_guide_access (separate from calculators)
  └── Approve: GET /api/guide/grant?email=&key=&action=approve
  └── Unlock: /guide/unlock?t=…

CLIENT PORTAL / PRIVATE DESK
  └── https://ml-private-wealth.tiiny.site (Firebase client logins)
```

### 3.1 Lead sources (code: `lib/leads.ts`)

`guide`, `guide-gate`, `tools`, `calculator`, `analyse`, `strategy-session`, `desk-request`, `insight`, `whatsapp`, `newsletter`, `service`, `invest`, `contact`

Only `tools` | `guide` | `guide-gate` set the Tools cookie.

### 3.2 APIs today

| Route | Role |
|-------|------|
| `POST /api/lead` | Validate + Resend notify; optional Tools cookie |
| `POST /api/guide-lead` | Legacy alias → guide unlock |
| `POST /api/desk/request` | Desk access request lead (no unlock) |
| `GET /api/desk/grant` | Admin secret → create unlock token; email client via Resend |
| `GET /desk/unlock` | Redeem token → set desk cookie |

### 3.3 Critical limitation (why Supabase)

- Leads are **not stored in a DB** — only emailed (and logged if email fails).  
- Approval is **stateless** (signed URL + cookie). No CRM status, no history, no automation hooks.  
- Guide engagement (watch / download) is **client analytics only**, not persisted.  
- Client Portal is a **separate Firebase app** (`ml-private-wealth`) with its own Auth/Firestore — not joined to the website identity.

Automation cannot reliably “assist Morgan” until there is a **shared system of record**.

---

## 4. Feature inventory (current build)

### 4.1 Public / marketing

- Cinema homepage, About (sticky sections), Invest markets, Work With Morgan  
- Strategy session form + booking URL  
- WhatsApp CTAs, Meta Pixel hooks (optional env)

### 4.2 Tools (soft-gated on interaction)

| Calculator | Path | Status |
|------------|------|--------|
| True Yield | `/calculators/true-yield` | Live |
| Purchase Cost | `/calculators/purchase-cost` | Live |
| Payment Plan | `/calculators/payment-plan` | Live |
| Mortgage Estimate | `/calculators/mortgage-estimate` | Live (TOB-style amortising PMT) |
| Cash-on-cash / Mortgage vs cash | — | Planned in registry |

### 4.3 Investor Guide (`/guide`, noIndex)

- Category pick → library  
- Videos gated behind soft registration (poster + “Register to watch”)  
- PDF + video downloads gated  
- Content: `content/guide-library.ts`  
- **Assets today:** cinema walk placeholders + stub PDFs (~600 bytes) — replace with real media

### 4.4 Private Desk (`/desk`, noIndex)

- Locked: request form + path explanation + strategy CTA  
- Unlocked: chapters from `content/desk-library.ts` (placeholder copy)  
- Ops approve: grant API + email unlock link

### 4.5 Client Portal (`/portal`, noIndex)

- Explains current-investor-only access  
- Button → `NEXT_PUBLIC_CLIENT_PORTAL_URL` if set; else WhatsApp fallback  
- External app: single-file React + Firebase Auth/Firestore “M&L Private Property Investment Dashboard”

### 4.6 Env (see `.env.example`)

- Site / WhatsApp / booking / social / Meta / GA  
- Resend: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`  
- `TOOLS_ACCESS_SECRET`, `DESK_ACCESS_SECRET`, `DESK_GRANT_SECRET`  
- `NEXT_PUBLIC_CLIENT_PORTAL_URL`

---

## 5. Competitive / reference models we adopted

| Reference | What we took | What we did not |
|-----------|--------------|-----------------|
| **Matt Siddell Data Room** | Gate → call → approval → private room; scarcity; not Instagram advice | Full passworded Next app + Pipedrive on day one |
| **Oasis Brothers #finance** | Mortgage estimate UX + formula; Huspy-as-platform framing | Their images / brand assets |
| **M&L dashboard HTML** | Target for Portal link-out; Firebase client logins | Embedding whole file into Next yet |

---

## 6. Proposed direction: Supabase as system of record

**Yes — Supabase is the right shared layer** between:

- MKWealth (Next.js site)  
- Morgan Assist automation (your agent / workflows)  
- Eventually Client Portal (Auth + portfolios)  
- Optional: n8n / Zapier / Cursor SDK / WhatsApp bots reading the same tables

### 6.1 Why Supabase fits this stack

| Need | Supabase |
|------|----------|
| Persist every lead + source + UTM | Postgres `leads` |
| Desk request → pending → approved | `access_grants` / status enum |
| Automation “who needs a call today?” | SQL + optional Realtime / Edge Functions |
| Auth for desk + later portal | Supabase Auth (email magic link or password) |
| Guide asset delivery | Storage + signed URLs |
| RLS so browser never sees all clients | Policies by `auth.uid()` + service role for automation |
| Replace HMAC cookies long-term | Session JWT + `profiles.access_level` |

### 6.2 Recommended access model (after migration)

```text
anon visitor
  → registers (lead + auth user optional)
  → access_level: prospect_tools   (Tools + Guide)

after strategy / Morgan (or automation) approval
  → access_level: desk_approved    (Private Desk)

when they become a managed client
  → access_level: client           (Portal + portfolio rows)

roles for staff
  → morgan | ops | automation (service_role only on server)
```

Keep **service_role** only on server / automation workers — never in the browser.

### 6.3 Draft schema (discussion — not implemented)

```sql
-- profiles: 1:1 with auth.users when we enable Auth
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  access_level text not null default 'prospect_tools'
    check (access_level in ('prospect_tools','desk_approved','client','blocked')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  phone text not null,
  source text not null,
  intent text,
  notes text,
  attribution jsonb default '{}'::jsonb,
  calculator_snapshot jsonb,
  lead_score_hint text,
  status text not null default 'new'
    check (status in ('new','contacted','session_booked','qualified','desk_approved','client','lost')),
  profile_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.desk_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  email text not null,
  status text not null default 'pending'
    check (status in ('pending','approved','declined')),
  requested_at timestamptz default now(),
  decided_at timestamptz,
  decided_by text,
  unlock_sent_at timestamptz
);

create table public.engagement_events (
  id uuid primary key default gen_random_uuid(),
  email text,
  profile_id uuid references public.profiles(id),
  event_type text not null, -- video_watch, pdf_download, calculator_complete, desk_open
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id),
  display_name text,
  portal_external_uid text, -- bridge to current Firebase UID if needed
  active boolean default true,
  created_at timestamptz default now()
);

create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  title text,
  payload jsonb not null default '{}'::jsonb, -- underwriting / deck JSON
  updated_at timestamptz default now()
);

-- Optional: automation job queue / notes for Morgan Assist
create table public.automation_tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  kind text not null, -- follow_up_whatsapp, prepare_session_brief, grant_desk, sync_crm
  status text not null default 'open',
  payload jsonb default '{}'::jsonb,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);
```

**RLS sketch**

- `anon` / `authenticated`: insert own lead; read own profile + engagement; clients read own portfolio.  
- Staff UI / automation: **service role** or a private `staff` schema.  
- Never authorize from editable `user_metadata`; use `app_metadata` or `profiles.access_level`.

### 6.4 Migration path (phased — discuss order)

| Phase | Work | Benefit |
|-------|------|---------|
| **A** | Supabase project + `leads` + write from `/api/lead` and desk request (keep cookies + Resend) | Automation can query leads immediately |
| **B** | `desk_requests` + grant writes status; unlock still cookie or magic link | Ops visibility; no lost approvals |
| **C** | Persist `engagement_events` from guide/calculators | Score leads for automation triage |
| **D** | Supabase Auth for Desk (and later Portal); retire HMAC cookies | Real identity; multi-device |
| **E** | Port Private Wealth Dashboard data → `portfolios` (or sync from Firebase) | One client graph |
| **F** | Automation worker uses service role + `automation_tasks` | Morgan Assist closed loop |

**Recommendation:** Do **A → B → C** before Auth rewrite. Fastest win for your automation.

---

## 7. How the whole system benefits together

```text
                    ┌─────────────────────┐
   Instagram / SEO  │   MKWealth (Next)    │
   WhatsApp CTAs    │  forms · tools · desk│
                    └──────────┬──────────┘
                               │ writes
                               ▼
                    ┌─────────────────────┐
                    │  Supabase (Postgres) │
                    │  leads · grants ·    │
                    │  engagement · tasks  │
                    │  clients · portfolios│
                    └──────────┬──────────┘
                          │           │
            reads/writes  │           │ reads
                          ▼           ▼
             ┌────────────────┐   ┌──────────────────┐
             │ Morgan Assist  │   │ Client Portal UI  │
             │ (your automation)│  │ (dashboard)      │
             │ triage · briefs│   │ Auth + portfolios │
             │ grant desk ·   │   └──────────────────┘
             │ WhatsApp drafts│
             └────────────────┘
```

**Concrete wins once connected**

1. **No lead lost in email** — every guide/tools/desk/strategy row is queryable.  
2. **Automation prep for strategy calls** — pull last calculator snapshot + videos watched.  
3. **One-click desk grant** from Assist (“approve email X”) instead of hand-built URLs (still auditable in DB).  
4. **Client continuity** — when a prospect becomes a client, same email → profile → portfolio.  
5. **Seedrix / multi-brand later** — same pattern; Morgan is pilot brand.  
6. **Huspy financing path** — tag leads who used mortgage estimate for mortgage-team handoff.

---

## 8. What stays on the website vs what moves to automation

| Stay on site (UX) | Move to Supabase + Assist |
|-------------------|---------------------------|
| Cinema, SEO, calculators UI | Lead storage, scoring, follow-up queues |
| Soft gate UX | Who is soft-unlocked vs desk-approved |
| Desk chapter presentation | Approving / declining / expiry |
| Portal teaser page | Portfolio CRUD, client auth |
| Booking calendar link | Pre-call brief generation |

---

## 9. Open decisions (please mark / reply)

Use this checklist when we discuss alterations:

- [ ] **Portal host:** Keep Firebase dashboard long-term, or migrate underwriting UI into Next + Supabase?  
- [ ] **Auth timing:** Cookie v1 longer, or jump to Supabase Auth for Desk in phase D soon?  
- [ ] **CRM:** Pipedrive / HubSpot needed, or Supabase + Assist enough for 6–12 months?  
- [ ] **WhatsApp:** Official API vs manual wa.me (automation impact)?  
- [ ] **Guide assets:** Real videos/PDFs timeline; Storage vs `public/`?  
- [ ] **Desk content:** Static MD/TS chapters vs CMS (Sanity) vs Supabase rows?  
- [ ] **Minimum investment / broker filter:** Soft messaging only, or hard qualification fields?  
- [ ] **Multi-brand Seedrix:** Same Supabase project with `brand_id`, or separate projects?  
- [ ] **Environments:** One Supabase project (prod) vs staging project for Assist experiments?

---

## 10. What you should send next (automation architecture)

When ready, share (even rough):

1. Trigger list (new lead, session booked, desk requested, calculator completed, …)  
2. Actions Assist should take (draft WhatsApp, email Morgan, grant desk, create task, …)  
3. Where it runs (Cursor SDK, n8n, custom worker, Edge Functions, …)  
4. What it must **never** do without human confirm (e.g. auto-grant desk, send to client)  
5. Preferred language/runtime and secrets location

Then we will map each trigger → table/event → policy → UI change on MKWealth.

---

## 11. Immediate next engineering steps (after you approve direction)

1. Create Supabase project; wire MCP / CLI; add env keys to Next.  
2. Migration for `leads` (+ optional `engagement_events`).  
3. Dual-write from `/api/lead` and `/api/desk/request` (Resend kept).  
4. Minimal staff view or SQL views for Morgan Assist to consume.  
5. Document grant flow as “update `desk_requests` + send unlock”.  
6. **Do not** rip cookies until Assist is reading DB successfully.

---

## 12. Key file map (codebase)

| Area | Paths |
|------|-------|
| Nav | `content/navigation.ts` |
| Soft gate | `lib/tools-access.ts`, `components/tools/*`, `app/api/lead/route.ts` |
| Desk gate | `lib/desk-access.ts`, `app/api/desk/*`, `app/desk/unlock/route.ts`, `app/(site)/desk/page.tsx` |
| Desk copy | `content/desk-library.ts` |
| Guide | `app/guide/*`, `content/guide-library.ts` |
| Portal | `app/(site)/portal/page.tsx`, `lib/site-config.ts` → `clientPortalUrl` |
| Calculators | `components/calculators/*`, `content/calculators.ts` |
| Leads | `lib/leads.ts` |
| Env template | `.env.example` |

---

## 13. Summary for discussion

- **Built:** Soft Tools/Guide registration, Mortgage estimate, Private Desk request/approve/unlock, Portal tab, nav, noIndex/robots.  
- **Gap:** No real database → automation and Morgan ops are blind.  
- **Agreement sought:** Adopt **Supabase** as shared DB; phase A–C first; Auth and Portal merge later.  
- **Your move:** Annotate section 9 + paste Assist architecture; we refine schema and implementation plan before coding migrations.

---

*End of brief. Alterations welcome as comments against section numbers.*
