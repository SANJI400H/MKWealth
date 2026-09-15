export type SocialPlatform = "youtube" | "instagram";

export type SocialVideoItem = {
  id: string;
  platform: SocialPlatform;
  title: string;
  url: string;
  thumbnailUrl: string;
  publishedAt?: string;
  /** Internal ranking only — never shown in UI */
  viewCount?: number;
};

export type SocialFeedBucket = {
  latest: SocialVideoItem[];
  mostViewed: SocialVideoItem[];
};

export type SocialFeed = {
  youtube: SocialFeedBucket;
  instagram: SocialFeedBucket;
};
