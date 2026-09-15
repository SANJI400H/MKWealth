# Social Video Strip — Design Spec

**Date:** 2026-09-15  
**Status:** Ready for review  
**Profiles:** YouTube `@itsmorgankaiser` · Instagram `@_morgankaiser_` (Creator)

## Goal

Add a homepage **social video strip** that surfaces Morgan’s **latest** and **most viewed** content from YouTube and Instagram, so visitors see live social proof without leaving the site for discovery.

## Placement

- Homepage only, **after Proof, before Contact** (`app/(site)/page.tsx` free-browse half).
- Not in cinema acts, not in hero, not on Portal/Guide.
- Section id: `social`.
- Optional later: reuse the same data on `/videos` — **out of scope for v1**.

## UX

One section, one job: watch recent / popular clips.

- Eyebrow + short title + one supporting line.
- Two sub-rows (or tabs): **Latest** | **Most viewed**.
- Each row shows up to **3 YouTube** + **3 Instagram** items (6 tiles max per row; on mobile horizontal scroll).
- Each tile: thumbnail, short title (YouTube), platform mark, opens embed lightbox **or** deep-links to the platform (prefer in-page YouTube iframe lightbox; Instagram often deep-links or oEmbed because IG embeds are brittle).
- Footer of section: text links to full YouTube channel + Instagram profile (existing `siteConfig.social`).
- No view-count numbers on the UI (avoid hype metrics voice); ranking is internal only.
- No card chrome beyond what’s needed for a clickable media tile (border/hover consistent with site).

## Data strategy (API-first, free tiers)

Both official APIs are **free** (quota / app review; no paid widget required).

### YouTube — primary

| Mode | Source |
|------|--------|
| Latest | Channel uploads playlist / `search` ordered by `date`, or uploads playlist `playlistItems` |
| Most viewed | Channel videos ordered by `viewCount` (`search.list` with `order=viewCount` + `channelId`) |

**Env:** `YOUTUBE_API_KEY` (server-only).  
**Resolve handle → channelId** once (`forHandle=itsmorgankaiser` or channels.list), cache channel id in memory/module.

**Fallback if no key / quota error:** YouTube RSS  
`https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`  
→ latest only; “most viewed” row uses same latest set or hides that row’s YouTube cells.

Optional hardcode `YOUTUBE_CHANNEL_ID` in env once known to skip resolve.

### Instagram — Creator via Graph API

Creator accounts can use Instagram Graph API when linked to a Facebook Page + Meta app.

| Mode | Source |
|------|--------|
| Latest | `GET /{ig-user-id}/media` (VIDEO / REELS preferred) |
| Most viewed | Sort media by insights `views` / `plays` when available; else by `like_count` as proxy; document limitation |

**Env (server-only):**

- `INSTAGRAM_ACCESS_TOKEN` (long-lived)
- `INSTAGRAM_USER_ID` (IG Business/Creator user id)

**Fallback if no token:** curated list in `content/social-videos.ts` — array of reel permalinks / embed URLs Morgan maintains. Strip still renders; “most viewed” for IG = curated order.

v1 does **not** depend on third-party paid widgets.

## Architecture

```
lib/social/
  youtube.ts      # fetch latest + top by views; RSS fallback
  instagram.ts    # Graph fetch + curated fallback
  types.ts
content/social-videos.ts  # curated IG permalinks (primary fallback)
components/sections/SocialVideoStrip.tsx   # RSC entry
components/social/SocialStripClient.tsx    # scroll + YouTube lightbox
```

**Preferred:** Server Component fetches via `unstable_cache` / `revalidate` (no public API key exposure). No public `/api/social` route in v1. Client only for lightbox / horizontal scroll.

**Cache:** `revalidate: 3600` (1 hour). Fail soft: empty platform → hide that platform’s tiles, keep section if either side has items; if both empty → hide entire section.

## Env additions (`.env.example`)

```
# YouTube Data API v3 (free quota). Server-only.
# YOUTUBE_API_KEY=
# YOUTUBE_CHANNEL_ID=   # optional once known

# Instagram Graph API (Creator/Business, free). Server-only.
# INSTAGRAM_ACCESS_TOKEN=
# INSTAGRAM_USER_ID=

```

Curated Instagram permalinks live in `content/social-videos.ts` (not secrets). Env is only for API credentials.

## Visual / motion

- Match paper / ink / maroon language; no purple glow, no pill clusters.
- Light reveal on scroll (existing `RevealOnScroll`).
- Horizontal scroll on small screens with snap; desktop 3+3 grid or two compact rows.
- Thumbnails: 16:9 YouTube; 9:16 Instagram cropped to consistent tile height in strip.

## Out of scope (v1)

- TikTok / LinkedIn embeds
- Fake view counts or scraped private metrics
- Guide / Portal injection
- Paid embed SaaS
- Editing `/videos` hub beyond optional “See all” link to YouTube/IG

## Success criteria

1. With `YOUTUBE_API_KEY` set, homepage shows latest + most-viewed YouTube tiles that update within ~1h of new uploads.
2. With Instagram Graph env set, same for Reels/video; without it, curated IG URLs still show.
3. Without any keys, YouTube RSS (if channel id known) + curated IG still produce a usable strip, or section hides cleanly.
4. No API secrets in client bundle.
5. Section never sits in the first cinema viewport.

## Setup notes (ops, free)

1. **YouTube:** Google Cloud project → enable YouTube Data API v3 → create API key → restrict by IP/referrer as practical for server → add `YOUTUBE_API_KEY`.
2. **Instagram:** Meta Developer app → Instagram Graph product → connect Creator account via Facebook Page → long-lived token → `INSTAGRAM_USER_ID` + `INSTAGRAM_ACCESS_TOKEN`. Refresh token before expiry (document in SUPABASE/leads-style setup doc or short `docs/SOCIAL-FEED-SETUP.md`).

## Open points resolved

| Topic | Decision |
|-------|----------|
| Placement | Homepage strip after Proof |
| Modes | Both latest + most viewed |
| Instagram account | Creator; Graph when ready, curated until then |
| APIs | Use free official APIs; no paid widget v1 |
| Metrics on UI | Hidden (rank only) |
