import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// /guide is intentionally excluded, noindex, automation-only traffic.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/invest/dubai", "/invest/abu-dhabi", "/invest/rak"];

  return routes.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/about" ? 0.8 : 0.85,
  }));
}
