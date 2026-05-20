"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function isConfigured(value: string) {
  return Boolean(value && !value.startsWith("TODO_") && !value.includes("PLACEHOLDER"));
}

export function GoogleRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    if (typeof window.gtag !== "function") return;

    const pagePath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const ids = [siteConfig.googleAnalyticsId, siteConfig.googleAdsId].filter(isConfigured);

    ids.forEach((id) => {
      window.gtag?.("config", id, {
        page_path: pagePath,
        page_location: window.location.href,
        anonymize_ip: true
      });
    });
  }, [pathname, searchParams]);

  return null;
}
