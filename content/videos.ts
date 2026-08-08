/**
 * Homepage cinema acts — locked mapping:
 *   walk-1 → Hero (muted autoplay once; overlay at textRevealAt)
 *   walk-2 → About (scroll-scrub)
 *   walk-3 → Services (scroll-scrub)
 */
export const videoActs = {
  act1: {
    src: "/videos/walk-1.mp4", // not morgan-walk-wave.mp4
    poster: "/images/morgan-walk-wave-poster.jpg",
    textRevealAt: 0.5,
    heightMultiplier: 3,
    alt: "Morgan Kaiser walking into frame",
  },
  act2: {
    src: "/videos/walk-2.mp4",
    poster: "/images/morgan-portrait.jpg",
    textRevealAt: 0.5,
    heightMultiplier: 3,
    alt: "Morgan Kaiser — about sequence",
  },
  act3: {
    src: "/videos/walk-3.mp4",
    poster: "/images/morgan-offer.jpg",
    textRevealAt: 0.45,
    heightMultiplier: 2.8,
    alt: "Morgan Kaiser presenting services",
  },
} as const;

export type VideoActId = keyof typeof videoActs;
