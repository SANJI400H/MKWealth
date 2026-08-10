// Contact + social links. Prefer `.env.local` overrides (see `.env.example`).

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morgankaiser.ae").replace(/\/$/, "");

export const siteConfig = {
  name: "Morgan Kaiser",
  role: "Off-Plan Real Estate Investment Advisor",
  company: "Huspy",
  siteUrl,
  locale: "en-AE",
  /** Digits only, country code first — used by wa.me links. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585300329",
  /** Calendly (or similar) URL for every Book a Meeting CTA. */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/morgan-kaiser/consultation",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/_morgankaiser_/",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/morgan-kaiser-0701902b7",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://www.tiktok.com/@_morgankaiser_",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://www.youtube.com/@itsmorgankaiser",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/share/18TWwVSoLe/",
  },
  defaultOgImage: "/images/og-default.jpg",
} as const;

export function whatsappLink(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
