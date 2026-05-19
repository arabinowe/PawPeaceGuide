"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";
import { captureUtmFromCurrentUrl } from "@/lib/utm";

const SCROLL_MILESTONES = [25, 50, 75, 90];
const TIME_MILESTONES_SECONDS = [15, 30, 60, 120];

export function EngagementTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtmFromCurrentUrl();

    try {
      const key = `${siteConfig.engagementSessionStorageKey}_started`;
      if (!window.sessionStorage.getItem(key)) {
        trackFunnelEvent(siteConfig.eventNames.sessionStarted, { page: pathname });
        window.sessionStorage.setItem(key, "true");
      }
    } catch {
      trackFunnelEvent(siteConfig.eventNames.sessionStarted, { page: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const fired = new Set<number>();
    let frame = 0;

    function measureScrollDepth() {
      frame = 0;
      const documentElement = document.documentElement;
      const scrollable = documentElement.scrollHeight - window.innerHeight;
      const rawDepth = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      const depth = Math.min(100, Math.max(0, Math.round(rawDepth)));

      SCROLL_MILESTONES.forEach((milestone) => {
        if (depth >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackFunnelEvent(siteConfig.eventNames.scrollDepthReached, {
            page: pathname,
            scrollDepth: milestone
          });
        }
      });
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(measureScrollDepth);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    measureScrollDepth();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const timers = TIME_MILESTONES_SECONDS.map((seconds) =>
      window.setTimeout(() => {
        trackFunnelEvent(siteConfig.eventNames.timeOnPageMilestone, {
          page: pathname,
          seconds
        });
      }, seconds * 1000)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | null = null;
    let cancelled = false;
    const seen = new Set<string>();

    const setupTimer = window.setTimeout(() => {
      if (cancelled) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section, main > article"));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target as HTMLElement;
            const index = sections.indexOf(element);
            const label = getSectionLabel(element, index);
            const key = `${pathname}:${label}`;

            if (seen.has(key)) return;
            seen.add(key);

            trackFunnelEvent(siteConfig.eventNames.sectionViewed, {
              page: pathname,
              section: label
            });
          });
        },
        {
          threshold: 0.45,
          rootMargin: "0px 0px -12% 0px"
        }
      );

      sections.forEach((section) => observer?.observe(section));
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(setupTimer);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>("[data-track-cta], a, button");
      if (!element) return;

      const label = getElementLabel(element);
      const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") ?? undefined : undefined;
      const link = classifyHref(href);

      trackFunnelEvent(siteConfig.eventNames.ctaClicked, {
        page: pathname,
        ctaLabel: label,
        ctaHref: link.value,
        linkType: link.type
      });
    }

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [pathname]);

  return null;
}

function getSectionLabel(element: HTMLElement, index: number) {
  const explicitLabel = element.dataset.trackSection;
  if (explicitLabel) return cleanLabel(explicitLabel);

  if (element.id) return cleanLabel(element.id);

  const heading = element.querySelector("h1, h2, h3");
  if (heading?.textContent) return cleanLabel(heading.textContent);

  return `section-${Math.max(index + 1, 1)}`;
}

function getElementLabel(element: HTMLElement) {
  return cleanLabel(
    element.dataset.trackCta ||
      element.getAttribute("aria-label") ||
      element.textContent ||
      element.getAttribute("title") ||
      element.tagName.toLowerCase()
  );
}

function classifyHref(href: string | undefined) {
  if (!href) {
    return { type: "button", value: undefined };
  }

  if (href.startsWith("#")) {
    return { type: "anchor", value: href.slice(0, 80) };
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin === window.location.origin) {
      return { type: "internal", value: `${url.pathname}${url.search}`.slice(0, 140) };
    }

    return { type: "external", value: url.host.slice(0, 140) };
  } catch {
    return { type: "unknown", value: undefined };
  }
}

function cleanLabel(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 90);
}
