export type GuideCategoryId = "off-plan" | "payments" | "visa" | "dubai";

export interface GuideCategory {
  id: GuideCategoryId;
  label: string;
  description: string;
}

export interface GuideVideo {
  id: string;
  categoryId: GuideCategoryId;
  title: string;
  summary: string;
  poster: string;
  src: string;
  downloadName: string;
  /** False until Morgan uploads a real guide clip (not cinema reuse). */
  ready: boolean;
}

export interface GuideReport {
  id: string;
  categoryId: GuideCategoryId;
  title: string;
  summary: string;
  href: string;
  fileName: string;
  /** False until real PDFs replace ~600B stubs. */
  ready: boolean;
}

export const guideCategories: GuideCategory[] = [
  {
    id: "off-plan",
    label: "Off-plan basics",
    description: "How off-plan works, risk, and what to check before you book.",
  },
  {
    id: "payments",
    label: "Payment plans",
    description: "Construction milestones, cash flow, and handover structures.",
  },
  {
    id: "visa",
    label: "Golden Visa",
    description: "Eligibility thresholds and the path through property investment.",
  },
  {
    id: "dubai",
    label: "Dubai market",
    description: "Where deal flow sits today and how to read a micro-location.",
  },
];

/**
 * Private guide clips. ready:false until dedicated files replace cinema walks.
 * Public Video Guides live on /video-guides (YouTube click-to-play).
 */
export const guideVideos: GuideVideo[] = [
  {
    id: "vid-off-plan-1",
    categoryId: "off-plan",
    title: "Why Dubai off-plan, right now",
    summary: "The case for off-plan versus completed stock for foreign buyers.",
    poster: "/images/morgan-hero.jpg",
    src: "/videos/walk-1.mp4",
    downloadName: "morgan-kaiser-off-plan-basics.mp4",
    ready: false,
  },
  {
    id: "vid-payments-1",
    categoryId: "payments",
    title: "Payment plans and handover risk",
    summary: "How to stress-test a plan against your actual liquidity.",
    poster: "/images/morgan-offer.jpg",
    src: "/videos/walk-2.mp4",
    downloadName: "morgan-kaiser-payment-plans.mp4",
    ready: false,
  },
  {
    id: "vid-visa-1",
    categoryId: "visa",
    title: "Golden Visa eligibility, step by step",
    summary: "What usually qualifies, and what still needs confirmation.",
    poster: "/images/morgan-portrait.jpg",
    src: "/videos/walk-3.mp4",
    downloadName: "morgan-kaiser-golden-visa.mp4",
    ready: false,
  },
  {
    id: "vid-dubai-1",
    categoryId: "dubai",
    title: "Reading Dubai deal flow",
    summary: "How Morgan shortlists units from active market context.",
    poster: "/images/morgan-walk-wave-poster.jpg",
    src: "/videos/morgan-walk-wave.mp4",
    downloadName: "morgan-kaiser-dubai-market.mp4",
    ready: false,
  },
];

export const guideReports: GuideReport[] = [
  {
    id: "pdf-off-plan",
    categoryId: "off-plan",
    title: "Off-plan basics checklist",
    summary: "A one-page checklist before you reserve a unit.",
    href: "/reports/off-plan-basics.pdf",
    fileName: "off-plan-basics.pdf",
    ready: false,
  },
  {
    id: "pdf-payments",
    categoryId: "payments",
    title: "Payment plan briefing",
    summary: "How to compare 60/40 vs 70/30 style structures.",
    href: "/reports/payment-plans.pdf",
    fileName: "payment-plans.pdf",
    ready: false,
  },
  {
    id: "pdf-visa",
    categoryId: "visa",
    title: "Golden Visa notes",
    summary: "Eligibility points to confirm with the Land Department path.",
    href: "/reports/golden-visa.pdf",
    fileName: "golden-visa.pdf",
    ready: false,
  },
  {
    id: "pdf-dubai",
    categoryId: "dubai",
    title: "Dubai market snapshot",
    summary: "A short briefing on where Morgan focuses day to day.",
    href: "/reports/dubai-market.pdf",
    fileName: "dubai-market.pdf",
    ready: false,
  },
];

export function videosForCategories(categoryIds: GuideCategoryId[]) {
  const set = new Set(categoryIds);
  return guideVideos.filter((video) => set.has(video.categoryId));
}

export function reportsForCategories(categoryIds: GuideCategoryId[]) {
  const set = new Set(categoryIds);
  return guideReports.filter((report) => set.has(report.categoryId));
}
