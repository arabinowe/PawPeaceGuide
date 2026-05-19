import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { landingPages } from "@/data/landingPages";
import { siteConfig } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/blog/pet-insurance-comparison-checklist",
    "/ready-to-compare",
    "/quiz",
    "/calculator",
    "/compare",
    "/guides",
    "/affiliate-disclosure",
    "/privacy",
    "/terms",
    "/disclaimer"
  ];

  const landingRoutes = landingPages.map((page) => `/${page.slug}`);
  const guideRoutes = guides.map((guide) => `/guides/${guide.slug}`);

  return [...staticRoutes, ...landingRoutes, ...guideRoutes].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" || route === "/pet-insurance" || route === "/pet-parent-protection"
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/pet-parent-protection"
          ? 0.98
          : route === "/pet-insurance"
            ? 0.95
            : 0.7
  }));
}
