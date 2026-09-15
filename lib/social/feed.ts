import { unstable_cache } from "next/cache";
import { fetchInstagramFeed } from "@/lib/social/instagram";
import { fetchYouTubeFeed } from "@/lib/social/youtube";
import type { SocialFeed } from "@/lib/social/types";

async function loadSocialFeed(): Promise<SocialFeed> {
  const [youtube, instagram] = await Promise.all([fetchYouTubeFeed(), fetchInstagramFeed()]);
  return { youtube, instagram };
}

/** Cached social strip payload — refresh about hourly. */
export const getSocialFeed = unstable_cache(loadSocialFeed, ["social-video-feed-v1"], {
  revalidate: 3600,
});

export function feedHasItems(feed: SocialFeed): boolean {
  return (
    feed.youtube.latest.length > 0 ||
    feed.youtube.mostViewed.length > 0 ||
    feed.instagram.latest.length > 0 ||
    feed.instagram.mostViewed.length > 0
  );
}
