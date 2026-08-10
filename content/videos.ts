/**
 * Homepage cinema acts — locked mapping:
 *   walk-1 → Hero
 *   walk-2 → About
 *   walk-3 → Services
 *
 * No poster stills: morgan-portrait.jpg / walk-wave-poster are unrelated photos
 * and must not be used as cinema backgrounds.
 */
export const videoActs = {
  act1: {
    src: "/videos/walk-1.mp4",
    textRevealAt: 0.5,
    heightMultiplier: 3,
    alt: "Morgan Kaiser walking into frame",
  },
  act2: {
    src: "/videos/walk-2.mp4",
    textRevealAt: 0.5,
    heightMultiplier: 3,
    alt: "Morgan Kaiser — about sequence",
  },
  act3: {
    src: "/videos/walk-3.mp4",
    textRevealAt: 0.45,
    heightMultiplier: 2.8,
    alt: "Morgan Kaiser presenting services",
  },
} as const;

export type VideoActId = keyof typeof videoActs;
