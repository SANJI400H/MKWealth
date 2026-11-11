/** @type {import('next').NextConfig} */
const isDevCommand =
  process.argv.includes("dev") || process.env.npm_lifecycle_event === "dev";

/** Temporary client dashboard. Same fallback as lib/site-config.ts. */
const clientPortalUrl = (
  process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || "https://ml-private-wealth.tiiny.site"
).replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  /**
   * Isolate caches so `next build` / `next start` never corrupt `next dev`.
   * Shared .next symptom: CSS/JS 404s → stretched images, missing nav, unstyled HTML.
   */
  distDir: isDevCommand ? ".next-dev" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i1.ytimg.com" },
      { protocol: "https", hostname: "i2.ytimg.com" },
      { protocol: "https", hostname: "i3.ytimg.com" },
      { protocol: "https", hostname: "i4.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "scontent.xx.fbcdn.net" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "morgankaiser.com" }],
        destination: "https://www.morgankaiser.com",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "morgankaiser.com" }],
        destination: "https://www.morgankaiser.com/:path*",
        permanent: true,
      },
      // Legacy market “insights” URLs → invest pillars (avoid duplicate SEO)
      {
        source: "/insights/dubai-off-plan-investment",
        destination: "/invest/dubai",
        permanent: true,
      },
      {
        source: "/insights/abu-dhabi-real-estate-investment",
        destination: "/invest/abu-dhabi",
        permanent: true,
      },
      {
        source: "/insights/ras-al-khaimah-real-estate-investment",
        destination: "/invest/rak",
        permanent: true,
      },
      // Credentials live on About — no separate page
      {
        source: "/credentials",
        destination: "/about#credentials",
        permanent: true,
      },
      // Client Portal and Private Desk open the hosted dashboard for now.
      {
        source: "/portal",
        destination: clientPortalUrl,
        permanent: false,
      },
      {
        source: "/desk",
        destination: clientPortalUrl,
        permanent: false,
      },
      {
        source: "/desk/unlock",
        destination: clientPortalUrl,
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
