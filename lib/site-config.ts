// PLACEHOLDER — values below fall back to obvious dummies when env vars are unset.
// Fill in real values in `.env.local` before launch (see `.env.example`).

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morgankaiser.ae").replace(/\/$/, "");

export const siteConfig = {
  name: "Morgan Kaiser",
  role: "Off-Plan Real Estate Investment Advisor",
  company: "Huspy",
  siteUrl,
  locale: "en-AE",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/morgan-kaiser/consultation",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/morgankaiser",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/morgankaiser",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://tiktok.com/@morgankaiser",
  },
  defaultOgImage: "/images/og-default.jpg",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
