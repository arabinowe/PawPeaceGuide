"use client";

import { useEffect } from "react";
import { trackPageView, trackFunnelEvent } from "@/lib/tracking";
import { captureUtmFromCurrentUrl } from "@/lib/utm";
import { siteConfig } from "@/data/siteConfig";
import type { FunnelEventName } from "@/lib/types";

type PageEventTrackerProps = {
  page: string;
  paid?: boolean;
  eventName?: FunnelEventName;
};

export function PageEventTracker({ page, paid = false, eventName }: PageEventTrackerProps) {
  useEffect(() => {
    captureUtmFromCurrentUrl();
    if (eventName) {
      trackFunnelEvent(eventName, { page });
      return;
    }
    trackPageView(page, paid);
  }, [eventName, page, paid]);

  return null;
}

export function ComparePageTracker() {
  return (
    <PageEventTracker
      page="/compare"
      eventName={siteConfig.eventNames.comparePageViewed}
    />
  );
}
