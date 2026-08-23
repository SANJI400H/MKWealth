import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedInsights } from "@/content/insights";
import { getPublishedAreas } from "@/content/areas";
import { getPublishedDevelopers } from "@/content/developers";
import { getPublishedReports } from "@/content/reports";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/credentials",
    "/case-studies",
    "/work-with-morgan",
    "/strategy-session",
    "/analyse",
    "/insights",
    "/calculators",
    "/calculators/true-yield",
    "/calculators/purchase-cost",
    "/calculators/payment-plan",
    "/invest",
    "/invest/dubai",
    "/invest/abu-dhabi",
    "/invest/rak",
    "/areas",
    "/developers",
    "/resources",
    "/videos",
    "/reports",
    "/the-real-numbers",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  const insightRoutes = getPublishedInsights().map((a) => `/insights/${a.slug}`);
  const areaRoutes = getPublishedAreas().map((a) => `/areas/${a.slug}`);
  const developerRoutes = getPublishedDevelopers().map((d) => `/developers/${d.slug}`);
  const reportRoutes = getPublishedReports().map((r) => `/reports/${r.slug}`);

  return [...staticRoutes, ...insightRoutes, ...areaRoutes, ...developerRoutes, ...reportRoutes].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/insights" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path.startsWith("/insights") ||
            path.startsWith("/calculators") ||
            path.startsWith("/invest") ||
            path.startsWith("/areas") ||
            path.startsWith("/developers")
          ? 0.85
          : 0.7,
  }));
}
