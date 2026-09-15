# Social video strip setup

Homepage section `#social` (after Proof) loads **Latest** and **Most viewed** from YouTube and Instagram.

## YouTube (works without a key)

Channel `@itsmorgankaiser` resolves to `UCzJ8G2TDN5wn5MN7hxsg5hg`.

1. Optional: create a [YouTube Data API v3](https://console.cloud.google.com/) key (free quota).
2. In `.env.local`:

```bash
YOUTUBE_CHANNEL_ID=UCzJ8G2TDN5wn5MN7hxsg5hg
YOUTUBE_API_KEY=your_key_here
```

Without `YOUTUBE_API_KEY`, the site uses the public Atom RSS feed (includes view counts for most-viewed sorting).

## Instagram (Creator)

Graph API is free but needs a Meta app + long-lived token.

1. Link the Creator account to a Facebook Page.
2. Meta Developer → Instagram Graph API → get IG user id + long-lived token.
3. In `.env.local`:

```bash
INSTAGRAM_USER_ID=...
INSTAGRAM_ACCESS_TOKEN=...
```

Until that is set, add public reel URLs in `content/social-videos.ts` (`curatedInstagramReels`). Instagram tiles open the reel on Instagram (YouTube plays in an on-page lightbox).

## Cache

Feeds are cached for about **1 hour** (`unstable_cache` + fetch revalidate).
