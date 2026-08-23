/** @type {import('next').NextConfig} */
const isDevCommand =
  process.argv.includes("dev") || process.env.npm_lifecycle_event === "dev";

const nextConfig = {
  reactStrictMode: true,
  /**
   * Isolate caches so `next build` / `next start` never corrupt `next dev`.
   * Shared .next symptom: CSS/JS 404s → stretched images, missing nav, unstyled HTML.
   */
  distDir: isDevCommand ? ".next-dev" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
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
