import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

export function absoluteUrl(path = "") {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? base : `${base}${normalizedPath}`;
}

export function createMetadata({ title, description, path, noIndex = false, noFollow = false }: SeoInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    robots: noIndex
      ? {
          index: false,
          follow: !noFollow,
          googleBot: {
            index: false,
            follow: !noFollow
          }
        }
      : undefined,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
