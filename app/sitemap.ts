import type { MetadataRoute } from "next";
import { getGuideCategorySlug, guideCategories, guides } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/pet-insurance",
    "/pet-parent-protection",
    "/dog-parent-protection",
    "/dog-insurance",
    "/cat-insurance",
    "/puppy-insurance",
    "/kitten-insurance",
    "/emergency-vet-bills",
    "/vet-bill-help",
    "/start-60-second-check",
    "/find-my-path",
    "/dog-insurance-options",
    "/cat-insurance-options",
    "/puppy-insurance-options",
    "/kitten-insurance-options",
    "/senior-pet-insurance",
    "/emergency-vet-bill-planning",
    "/pet-wellness-extras",
    "/other-pet-insurance-options",
    "/quiz",
    "/calculator",
    "/quote-workspace",
    "/compare",
    "/ready-to-compare",
    "/guides",
    "/glossary",
    "/blog",
    "/blog/pet-insurance-comparison-checklist",
    "/affiliate-disclosure",
    "/privacy",
    "/terms",
    "/disclaimer"
  ];

  const guideRoutes = guides.map((guide) => `/guides/${guide.slug}`);
  const categoryRoutes = guideCategories.map((category) => `/guides/category/${getGuideCategorySlug(category)}`);

  return [...staticRoutes, ...categoryRoutes, ...guideRoutes].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified:
      route.startsWith("/guides/")
        ? new Date(guides.find((guide) => `/guides/${guide.slug}` === route)?.dateModified || new Date())
        : new Date(),
    changeFrequency:
      route === "" ||
      route === "/pet-insurance" ||
      route === "/pet-parent-protection" ||
      route === "/dog-parent-protection"
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/dog-parent-protection"
          ? 0.98
          : route === "/pet-parent-protection"
            ? 0.97
            : route === "/pet-insurance"
            ? 0.95
            : 0.7
  }));
}
