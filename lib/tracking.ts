import { siteConfig } from "@/data/siteConfig";
import type { FunnelEventName } from "@/lib/types";

type EventPayload = {
  page?: string;
  providerSlug?: string;
  providerRole?: string;
  commissionType?: string;
  campaignSource?: string;
  utm_campaign?: string;
  utm_content?: string;
  pageSource?: string;
  step?: number;
  guideSlug?: string;
  source?: string;
  [key: string]: string | number | boolean | undefined;
};

export function trackFunnelEvent(eventName: FunnelEventName, payload: EventPayload = {}) {
  const safePayload = sanitizePayload(payload);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("pawpeaceguide:event", {
        detail: { eventName, payload: safePayload }
      })
    );

    if (process.env.NODE_ENV !== "production") {
      console.info("[PawPeaceGuide event]", eventName, safePayload);
    }
  }

  // TODO Meta Pixel: send generic events only. Do not send quiz answers, pet health details, or email addresses by default.
  // TODO Google Analytics / GTM: map these events to GA4 conversions after measurement ID is configured.
  // TODO affiliate click tracking: add server-side click logging for outbound provider clicks.
  // TODO Conversion API later: only send privacy-reviewed, consent-aware, non-sensitive payloads.
}

export function trackPageView(page: string, paid = false) {
  trackFunnelEvent(siteConfig.eventNames.landingPageView, { page });
  if (paid) {
    trackFunnelEvent(siteConfig.eventNames.paidLandingPageView, { page });
  }
}

function sanitizePayload(payload: EventPayload): EventPayload {
  const blockedKeys = new Set([
    "email",
    "petName",
    "breed",
    "existingConditions",
    "healthDetails",
    "quizAnswers"
  ]);

  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => value !== undefined && !blockedKeys.has(key))
  ) as EventPayload;
}
