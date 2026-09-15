import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedAreas } from "@/content/areas";
import { getPublishedDevelopers } from "@/content/developers";

/** Soft launch sitemap: Tier 1 + Tier 2 only. Intelligence hubs re-added when content earns them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/work-with-morgan",
    "/strategy-session",
    "/invest",
    "/invest/dubai",
    "/invest/abu-dhabi",
    "/invest/rak",
    "/areas",
    "/developers",
    "/tools",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  const areaRoutes = getPublishedAreas().map((a) => `/areas/${a.slug}`);
  const developerRoutes = getPublishedDevelopers().map((d) => `/developers/${d.slug}`);

  return [...staticRoutes, ...areaRoutes, ...developerRoutes].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path.startsWith("/invest") || path.startsWith("/areas") || path.startsWith("/developers")
          ? 0.85
          : 0.7,
  }));
}
