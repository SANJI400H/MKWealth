/**
 * Curated Instagram Reels used when Graph API env is not set.
 * Add public reel permalinks (https://www.instagram.com/reel/…).
 * Order = most viewed / featured first; latest fallback uses the same list.
 */
export type CuratedInstagramReel = {
  id: string;
  title: string;
  url: string;
  /** Optional; falls back to a branded poster */
  thumbnailUrl?: string;
};

export const curatedInstagramReels: CuratedInstagramReel[] = [
  // Add Morgan’s top Reels here until INSTAGRAM_ACCESS_TOKEN is configured.
];

/** Stable YouTube channel id for @itsmorgankaiser (RSS works without API key). */
export const YOUTUBE_CHANNEL_ID_DEFAULT = "UCzJ8G2TDN5wn5MN7hxsg5hg";
export const YOUTUBE_HANDLE_DEFAULT = "itsmorgankaiser";
