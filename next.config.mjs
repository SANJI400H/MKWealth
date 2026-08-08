/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
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
      {
        source: "/insights",
        destination: "/#invest",
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
