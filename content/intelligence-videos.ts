export type PublishStatus = "published" | "draft";

export interface IntelligenceVideo {
  slug: string;
  title: string;
  status: PublishStatus;
  category: "market" | "mathematics" | "process" | "morgan";
  description: string;
  /** Local public path or empty if YouTube-only later */
  src?: string;
  youtubeId?: string;
  durationHint?: string;
}

/** Watch hub — uses existing site clips; no fake metrics. */
export const intelligenceVideos: IntelligenceVideo[] = [
  {
    slug: "numbers-first-positioning",
    title: "Vision first — how Morgan frames the work",
    status: "published",
    category: "morgan",
    description: "Cinema introduction clip used on the homepage — positioning before inventory.",
    src: "/videos/walk-1.mp4",
  },
  {
    slug: "about-the-advisor",
    title: "About the advisor — context reel",
    status: "published",
    category: "morgan",
    description: "Supporting cinema act from the About sequence.",
    src: "/videos/walk-2.mp4",
  },
  {
    slug: "engagement-orientation",
    title: "How engagement starts — services orientation",
    status: "published",
    category: "process",
    description: "Services cinema act — strategy and underwriting before brochure tours.",
    src: "/videos/walk-3.mp4",
  },
  {
    slug: "guide-library-wave",
    title: "Investor guide — walkthrough clip",
    status: "published",
    category: "process",
    description: "Clip used in the gated investor guide experience.",
    src: "/videos/morgan-walk-wave.mp4",
  },
];

export function getPublishedIntelligenceVideos() {
  return intelligenceVideos.filter((v) => v.status === "published");
}

export function getIntelligenceVideoBySlug(slug: string) {
  return intelligenceVideos.find((v) => v.slug === slug && v.status === "published");
}
