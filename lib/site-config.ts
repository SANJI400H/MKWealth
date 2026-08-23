import { morganProfile } from "@/content/morgan-profile";

// Contact + social links. Prefer `.env.local` overrides (see `.env.example`).

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morgankaiser.com").replace(/\/$/, "");

export const siteConfig = {
  name: morganProfile.name,
  role: morganProfile.title,
  expertiseLine: morganProfile.expertiseLine,
  philosophy: morganProfile.philosophy,
  company: morganProfile.company,
  companyRole: morganProfile.companyRole,
  location: morganProfile.location,
  siteUrl,
  locale: "en-AE",
  /** Digits only, country code first, used by wa.me links. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585300329",
  /**
   * Strategy session booking URL (Google Appointment Schedule).
   * Env name kept for backwards compatibility.
   */
  bookingUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendar.google.com/appointments/schedules/AcZssZ0vtVHhOcyykoym8P1KW-rviUeV_rLkzpQqcYkVSSE_VyYK3Pa1B1i6SeN_dzaFQ4Q8qw0YDInL",
  /** @deprecated Use bookingUrl */
  get calendlyUrl() {
    return this.bookingUrl;
  },
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/_morgankaiser_/",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/morgan-kaiser-0701902b7",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://www.tiktok.com/@_morgankaiser_",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://www.youtube.com/@itsmorgankaiser",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/share/18TWwVSoLe/",
  },
  defaultOgImage: "/images/og-default.jpg",
  cta: {
    strategySession: "Book Strategy Session",
    analyse: "Analyse My Investment",
    analyseSubmit: "Ask Morgan to Analyse This Investment",
    insights: "Explore Intelligence",
    guide: "Investor Resources",
  },
} as const;

export function whatsappLink(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
