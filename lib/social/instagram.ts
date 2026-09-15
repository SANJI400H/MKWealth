import { curatedInstagramReels } from "@/content/social-videos";
import type { SocialFeedBucket, SocialVideoItem } from "@/lib/social/types";

const LIMIT = 6;

function token(): string {
  return (process.env.INSTAGRAM_ACCESS_TOKEN || "").trim();
}

function userId(): string {
  return (process.env.INSTAGRAM_USER_ID || "").trim();
}

function curatedBucket(): SocialFeedBucket {
  const items: SocialVideoItem[] = curatedInstagramReels.slice(0, LIMIT).map((reel) => ({
    id: reel.id,
    platform: "instagram",
    title: reel.title,
    url: reel.url,
    thumbnailUrl: reel.thumbnailUrl ?? "/images/morgan-offer.jpg",
  }));

  return {
    latest: items.slice(0, 3),
    mostViewed: items.slice(0, 3),
  };
}

type IgMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  like_count?: number;
};

async function fetchGraphMedia(): Promise<SocialVideoItem[]> {
  const access = token();
  const igUser = userId();
  if (!access || !igUser) return [];

  const url = new URL(`https://graph.facebook.com/v21.0/${igUser}/media`);
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count",
  );
  url.searchParams.set("limit", String(LIMIT * 2));
  url.searchParams.set("access_token", access);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = (await res.json()) as { data?: IgMedia[] };
  const videos = (data.data ?? []).filter((m) =>
    ["VIDEO", "REELS", "IMAGE", "CAROUSEL_ALBUM"].includes((m.media_type || "").toUpperCase()),
  );

  return videos.slice(0, LIMIT).map((m) => ({
    id: m.id,
    platform: "instagram" as const,
    title: (m.caption || "Instagram").split("\n")[0].slice(0, 80),
    url: m.permalink || `https://www.instagram.com/p/${m.id}/`,
    thumbnailUrl: m.thumbnail_url || m.media_url || "/images/morgan-offer.jpg",
    publishedAt: m.timestamp,
    viewCount: typeof m.like_count === "number" ? m.like_count : undefined,
  }));
}

export async function fetchInstagramFeed(): Promise<SocialFeedBucket> {
  try {
    const items = await fetchGraphMedia();
    if (items.length) {
      const latest = [...items]
        .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""))
        .slice(0, 3);
      const mostViewed = [...items]
        .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
        .slice(0, 3);
      const popular = mostViewed.some((i) => i.viewCount != null) ? mostViewed : latest;
      return { latest, mostViewed: popular };
    }
  } catch {
    // curated fallback
  }

  return curatedBucket();
}
