import {
  YOUTUBE_CHANNEL_ID_DEFAULT,
  YOUTUBE_HANDLE_DEFAULT,
} from "@/content/social-videos";
import type { SocialFeedBucket, SocialVideoItem } from "@/lib/social/types";

const LIMIT = 6;

function channelId(): string {
  return (process.env.YOUTUBE_CHANNEL_ID || YOUTUBE_CHANNEL_ID_DEFAULT).trim();
}

function apiKey(): string {
  return (process.env.YOUTUBE_API_KEY || "").trim();
}

function thumb(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function watchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Parse Atom RSS (includes view counts when present). */
function parseRss(xml: string): SocialVideoItem[] {
  const entries = xml.split("<entry>").slice(1);
  const items: SocialVideoItem[] = [];

  for (const chunk of entries) {
    const id = chunk.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
    if (!id) continue;
    const titleRaw = chunk.match(/<title>([^<]*)<\/title>/)?.[1] ?? "YouTube video";
    const publishedAt = chunk.match(/<published>([^<]+)<\/published>/)?.[1];
    const viewsRaw = chunk.match(/<media:statistics[^>]*views="(\d+)"/)?.[1];
    const views = viewsRaw ? Number(viewsRaw) : undefined;

    items.push({
      id,
      platform: "youtube",
      title: decodeXml(titleRaw),
      url: watchUrl(id),
      thumbnailUrl: thumb(id),
      publishedAt,
      viewCount: Number.isFinite(views) ? views : undefined,
    });
  }

  return items;
}

async function fetchRss(): Promise<SocialVideoItem[]> {
  const id = channelId();
  if (!id) return [];
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const xml = await res.text();
  return parseRss(xml);
}

async function resolveChannelIdViaApi(key: string): Promise<string | null> {
  const configured = channelId();
  if (configured) return configured;

  const handle = YOUTUBE_HANDLE_DEFAULT.replace(/^@/, "");
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "id");
  url.searchParams.set("forHandle", handle);
  url.searchParams.set("key", key);

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  if (!res.ok) return null;
  const data = (await res.json()) as { items?: { id: string }[] };
  return data.items?.[0]?.id ?? null;
}

async function searchVideos(
  key: string,
  channel: string,
  order: "date" | "viewCount",
): Promise<SocialVideoItem[]> {
  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("channelId", channel);
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("order", order);
  searchUrl.searchParams.set("maxResults", String(LIMIT));
  searchUrl.searchParams.set("key", key);

  const searchRes = await fetch(searchUrl.toString(), { next: { revalidate: 3600 } });
  if (!searchRes.ok) return [];
  const searchData = (await searchRes.json()) as {
    items?: {
      id?: { videoId?: string };
      snippet?: { title?: string; publishedAt?: string; thumbnails?: { medium?: { url?: string }; high?: { url?: string } } };
    }[];
  };

  const ids = (searchData.items ?? [])
    .map((item) => item.id?.videoId)
    .filter((id): id is string => Boolean(id));

  if (!ids.length) return [];

  const statsUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  statsUrl.searchParams.set("part", "statistics,snippet");
  statsUrl.searchParams.set("id", ids.join(","));
  statsUrl.searchParams.set("key", key);

  const statsRes = await fetch(statsUrl.toString(), { next: { revalidate: 3600 } });
  const statsData = statsRes.ok
    ? ((await statsRes.json()) as {
        items?: {
          id: string;
          snippet?: { title?: string; publishedAt?: string; thumbnails?: { medium?: { url?: string }; high?: { url?: string } } };
          statistics?: { viewCount?: string };
        }[];
      })
    : { items: [] };

  const byId = new Map((statsData.items ?? []).map((item) => [item.id, item]));

  return ids.map((id) => {
    const full = byId.get(id);
    const snippet = full?.snippet ?? searchData.items?.find((i) => i.id?.videoId === id)?.snippet;
    const views = full?.statistics?.viewCount ? Number(full.statistics.viewCount) : undefined;
    return {
      id,
      platform: "youtube" as const,
      title: snippet?.title ?? "YouTube video",
      url: watchUrl(id),
      thumbnailUrl: snippet?.thumbnails?.high?.url ?? snippet?.thumbnails?.medium?.url ?? thumb(id),
      publishedAt: snippet?.publishedAt,
      viewCount: Number.isFinite(views) ? views : undefined,
    };
  });
}

function bucketFromList(items: SocialVideoItem[]): SocialFeedBucket {
  const latest = items.slice(0, 3);
  const mostViewed = [...items]
    .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    .slice(0, 3);
  // If no view data, reuse latest for most-viewed row rather than blanking YouTube
  const popular = mostViewed.some((i) => i.viewCount != null) ? mostViewed : latest;
  return { latest, mostViewed: popular };
}

export async function fetchYouTubeFeed(): Promise<SocialFeedBucket> {
  const key = apiKey();

  try {
    if (key) {
      const channel = (await resolveChannelIdViaApi(key)) ?? channelId();
      if (channel) {
        const [latest, popular] = await Promise.all([
          searchVideos(key, channel, "date"),
          searchVideos(key, channel, "viewCount"),
        ]);
        if (latest.length || popular.length) {
          return {
            latest: latest.slice(0, 3),
            mostViewed: (popular.length ? popular : latest).slice(0, 3),
          };
        }
      }
    }
  } catch {
    // fall through to RSS
  }

  try {
    const rss = await fetchRss();
    return bucketFromList(rss);
  } catch {
    return { latest: [], mostViewed: [] };
  }
}
