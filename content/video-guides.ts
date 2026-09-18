/**
 * Public Video Guides library.
 * Hosting: YouTube embeds with click-to-play (no raw MP4 on site host).
 * IDs from @itsmorgankaiser channel — update titles/categories as new long-form guides publish.
 */

export type VideoGuideCategory = "True Cost" | "Off-Plan" | "Market Data" | "Strategy";

export type VideoGuide = {
  id: string;
  title: string;
  description: string;
  /** ISO 8601 duration e.g. PT8M32S */
  durationIso: string;
  durationLabel: string;
  category: VideoGuideCategory;
  youtubeId: string;
  /** Optional related conversion path */
  nextHref: string;
  nextLabel: string;
};

/** Curated long-form / educational videos (not shorts). */
export const videoGuides: VideoGuide[] = [
  {
    id: "cash-on-cash-rak",
    title: "How One Studio Returned 633% Cash-on-Cash",
    description: "Gross to net to double leverage — real underwriting on a Ras Al Khaimah studio.",
    durationIso: "PT12M",
    durationLabel: "~12 min",
    category: "Market Data",
    youtubeId: "teXzvVeSGEA",
    nextHref: "/true-cost",
    nextLabel: "Get the True Cost worksheet",
  },
  {
    id: "infinite-returns",
    title: "How I Turn Rental Yield Into Infinite Returns",
    description: "Payment-plan leverage, refinance at handover, and engineering cash-on-cash — real Dubai numbers.",
    durationIso: "PT12M",
    durationLabel: "~12 min",
    category: "True Cost",
    youtubeId: "5TSIFYPkpFE",
    nextHref: "/calculators",
    nextLabel: "Open True Yield calculator",
  },
  {
    id: "wynn-short",
    title: "Wynn in 69 seconds",
    description: "Quick market pulse — then dig into the numbers with Morgan.",
    durationIso: "PT1M9S",
    durationLabel: "1 min",
    category: "Strategy",
    youtubeId: "dpGHeHcDRMA",
    nextHref: "/strategy-session",
    nextLabel: "Request a strategy session",
  },
  {
    id: "exit-discipline",
    title: "22 Million in 7 months — the real lesson",
    description: "Why not needing to sell wins negotiations — mindset behind disciplined exits.",
    durationIso: "PT1M",
    durationLabel: "Short",
    category: "Off-Plan",
    youtubeId: "Rx9eFEELAdA",
    nextHref: "/invest/dubai",
    nextLabel: "Read Dubai market view",
  },
];

export function getVideoGuideById(id: string) {
  return videoGuides.find((g) => g.id === id);
}
