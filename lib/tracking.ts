import { siteConfig } from "@/data/siteConfig";
import { getMicroConversionDefinition, type MicroConversionStage } from "@/lib/microConversions";
import type { FunnelEventName } from "@/lib/types";
import { getStoredUtmParams } from "@/lib/utm";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type EventPayload = {
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
  section?: string;
  scrollDepth?: number;
  seconds?: number;
  score?: number;
  ctaLabel?: string;
  ctaHref?: string;
  linkType?: string;
  viewport?: string;
  linkStatus?: string;
  [key: string]: string | number | boolean | undefined;
};

export type StoredEngagementEvent = {
  eventId: string;
  eventName: FunnelEventName;
  timestamp: string;
  sessionId: string;
  page: string;
  score: number;
  microConversion?: {
    name: string;
    stage: MicroConversionStage;
    value: number;
    optimizationUse: string;
  };
  payload: EventPayload;
};

type EngagementState = {
  sessionId: string;
  score: number;
  engagedFired: boolean;
  highIntentFired: boolean;
};

const RECENT_EVENT_LIMIT = 80;

export function trackFunnelEvent(eventName: FunnelEventName, payload: EventPayload = {}) {
  const safePayload = sanitizePayload(payload);

  if (typeof window === "undefined") {
    return;
  }

  const state = updateEngagementState(eventName);
  const microConversion = getMicroConversionDefinition(eventName);
  const enrichedEvent: StoredEngagementEvent = {
    eventId: createId("evt"),
    eventName,
    timestamp: new Date().toISOString(),
    sessionId: state.sessionId,
    page: window.location.pathname,
    score: state.score,
    microConversion: microConversion
      ? {
          name: microConversion.name,
          stage: microConversion.stage,
          value: microConversion.value,
          optimizationUse: microConversion.optimizationUse
        }
      : undefined,
    payload: enrichPayload(safePayload)
  };

  storeRecentEvent(enrichedEvent);

  window.dispatchEvent(
    new CustomEvent("pawpeaceguide:event", {
      detail: enrichedEvent
    })
  );
  window.dispatchEvent(
    new CustomEvent("pawpeaceguide:engagement-score", {
      detail: getEngagementSnapshot()
    })
  );

  if (process.env.NODE_ENV !== "production") {
    console.info("[PawPeaceGuide event]", eventName, enrichedEvent.payload);
  }

  sendEngagementEvent(enrichedEvent);
  sendGoogleTagManagerEvent(eventName, enrichedEvent.payload, {
    eventId: enrichedEvent.eventId,
    sessionId: enrichedEvent.sessionId,
    score: enrichedEvent.score
  });
  sendGoogleFunnelEvent(eventName, enrichedEvent.payload);

  maybeFireIntentThresholdEvents(state);

  // TODO Meta Pixel: send generic events only. Do not send quiz answers, pet health details, or email addresses by default.
  // TODO Google Tag Manager: move event routing into GTM if campaign complexity grows.
  // TODO affiliate click tracking: add durable server-side storage or a warehouse if click-level attribution is needed.
  // TODO Conversion API later: only send privacy-reviewed, consent-aware, non-sensitive payloads.
}

export function trackPageView(page: string, paid = false) {
  trackFunnelEvent(siteConfig.eventNames.landingPageView, { page });
  if (paid) {
    trackFunnelEvent(siteConfig.eventNames.paidLandingPageView, { page });
  }
}

export function getEngagementSnapshot() {
  if (typeof window === "undefined") {
    return {
      sessionId: "",
      score: 0,
      events: [] as StoredEngagementEvent[]
    };
  }

  const state = getEngagementState();
  return {
    sessionId: state.sessionId,
    score: state.score,
    events: getRecentEvents()
  };
}

export function sanitizePayload(payload: EventPayload): EventPayload {
  const blockedKeys = new Set([
    "email",
    "petName",
    "petType",
    "ageRange",
    "breed",
    "lifestyle",
    "existingConditions",
    "budget",
    "emergencyFund",
    "riskTolerance",
    "healthDetails",
    "quizAnswers",
    "monthlyPremium",
    "deductible",
    "reimbursementRate",
    "vetBill",
    "annualLimit",
    "financialDetails",
    "providerName",
    "quoteName",
    "quoteNotes",
    "waitingPeriodNotes",
    "preExistingNotes",
    "claimPaymentNotes"
  ]);

  return Object.fromEntries(
    Object.entries(payload)
      .filter(([key, value]) => value !== undefined && !blockedKeys.has(key))
      .map(([key, value]) => [key, sanitizeValue(value)])
  ) as EventPayload;
}

function enrichPayload(payload: EventPayload): EventPayload {
  const utm = getStoredUtmParams();
  const viewport =
    typeof window !== "undefined"
      ? `${window.innerWidth}x${window.innerHeight}`
      : undefined;

  return sanitizePayload({
    ...payload,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: payload.utm_campaign ?? utm.utm_campaign,
    utm_content: payload.utm_content ?? utm.utm_content,
    utm_term: utm.utm_term,
    experimentId: siteConfig.experimentId,
    referrerHost: getReferrerHost(),
    viewport
  });
}

function sendEngagementEvent(event: StoredEngagementEvent) {
  if (!siteConfig.engagementTrackingEnabled) return;
  if (!shouldSample()) return;

  const endpoint = siteConfig.engagementEventEndpoint;
  if (!endpoint) return;

  const body = JSON.stringify(event);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(endpoint, blob)) {
        return;
      }
    }

    void fetch(endpoint, {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json"
      },
      keepalive: true
    });
  } catch {
    // Tracking must never interrupt the funnel.
  }
}

function sendGoogleFunnelEvent(eventName: FunnelEventName, payload: EventPayload) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const safePayload = sanitizePayload(payload);
  const microConversion = getMicroConversionDefinition(eventName);
  const googlePayload = {
    event_category: "pawpeaceguide_funnel",
    event_label:
      safePayload.providerSlug ??
      safePayload.pageSource ??
      safePayload.page ??
      safePayload.ctaLabel ??
      eventName,
    provider_slug: safePayload.providerSlug,
    provider_role: safePayload.providerRole,
    page_source: safePayload.pageSource,
    link_status: safePayload.linkStatus,
    campaign_source: safePayload.campaignSource,
    utm_campaign: safePayload.utm_campaign,
    utm_content: safePayload.utm_content,
    experiment_id: siteConfig.experimentId
  };

  window.gtag("event", eventName, googlePayload);

  if (microConversion) {
    window.gtag("event", "ppg_micro_conversion", {
      ...googlePayload,
      event_label: microConversion.name,
      micro_conversion_name: microConversion.name,
      micro_conversion_stage: microConversion.stage,
      micro_conversion_value: microConversion.value,
      optimization_use: microConversion.optimizationUse
    });
  }

  if (
    microConversion?.optimizationUse === "primary_proxy" &&
    isConfiguredPublicId(siteConfig.googleAdsId) &&
    isConfiguredPublicId(siteConfig.googleAdsMicroConversionLabel)
  ) {
    window.gtag("event", "conversion", {
      send_to: `${siteConfig.googleAdsId}/${siteConfig.googleAdsMicroConversionLabel}`,
      event_category: "pawpeaceguide_micro_conversion",
      event_label: microConversion.name
    });
  }
}

export function fireGoogleAdsClickoutConversion(payload: EventPayload = {}, onComplete?: () => void) {
  const safePayload = sanitizePayload(payload);
  sendGoogleTagManagerEvent("ppg_partner_quote_clickout", safePayload, {
    conversionName: "Partner quote clickout",
    googleAdsId: siteConfig.googleAdsId,
    googleAdsConversionLabel: siteConfig.googleAdsConversionLabel,
    value: siteConfig.googleAdsClickoutConversionValue,
    currency: "USD"
  });

  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function" ||
    !isConfiguredPublicId(siteConfig.googleAdsId) ||
    !isConfiguredPublicId(siteConfig.googleAdsConversionLabel)
  ) {
    return false;
  }

  let completed = false;
  const finish = () => {
    if (completed) return;
    completed = true;
    onComplete?.();
  };

  window.gtag("event", "conversion", {
    send_to: `${siteConfig.googleAdsId}/${siteConfig.googleAdsConversionLabel}`,
    value: Number.isFinite(siteConfig.googleAdsClickoutConversionValue)
      ? siteConfig.googleAdsClickoutConversionValue
      : 1,
    currency: "USD",
    transaction_id: createId("clickout"),
    event_category: "pawpeaceguide_partner_handoff",
    event_label: safePayload.providerSlug ?? "partner_clickout",
    provider_slug: safePayload.providerSlug,
    provider_role: safePayload.providerRole,
    page_source: safePayload.pageSource ?? "/go",
    utm_campaign: safePayload.utm_campaign,
    utm_content: safePayload.utm_content,
    event_callback: finish,
    event_timeout: 1200
  });

  return true;
}

function sendGoogleTagManagerEvent(
  eventName: string,
  payload: EventPayload,
  metadata: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === "undefined") return;

  const safePayload = sanitizePayload(payload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    event_category: "pawpeaceguide_funnel",
    event_label:
      safePayload.providerSlug ??
      safePayload.pageSource ??
      safePayload.page ??
      safePayload.ctaLabel ??
      eventName,
    provider_slug: safePayload.providerSlug,
    provider_role: safePayload.providerRole,
    page_source: safePayload.pageSource,
    link_status: safePayload.linkStatus,
    campaign_source: safePayload.campaignSource,
    utm_campaign: safePayload.utm_campaign,
    utm_content: safePayload.utm_content,
    experiment_id: siteConfig.experimentId,
    ...metadata
  });
}

export function isGoogleAdsClickoutConversionConfigured() {
  return (
    isConfiguredPublicId(siteConfig.googleAdsId) &&
    isConfiguredPublicId(siteConfig.googleAdsConversionLabel)
  );
}

function isConfiguredPublicId(value: string) {
  return Boolean(value && !value.startsWith("TODO_") && !value.includes("PLACEHOLDER"));
}

function shouldSample() {
  const rate = siteConfig.engagementSampleRate;
  if (!Number.isFinite(rate)) return true;
  if (rate >= 1) return true;
  if (rate <= 0) return false;
  return Math.random() <= rate;
}

function updateEngagementState(eventName: FunnelEventName) {
  const state = getEngagementState();
  const nextScore = Math.min(100, state.score + scoreForEvent(eventName));
  const nextState = {
    ...state,
    score: nextScore
  };
  setEngagementState(nextState);
  return nextState;
}

function maybeFireIntentThresholdEvents(state: EngagementState) {
  if (!state.engagedFired && state.score >= 8) {
    const nextState = { ...state, engagedFired: true };
    setEngagementState(nextState);
    trackFunnelEvent(siteConfig.eventNames.engagedSession, { score: state.score });
    return;
  }

  if (!state.highIntentFired && state.score >= 18) {
    const nextState = { ...state, highIntentFired: true };
    setEngagementState(nextState);
    trackFunnelEvent(siteConfig.eventNames.highIntentSignal, { score: state.score });
  }
}

function getEngagementState(): EngagementState {
  const fallback: EngagementState = {
    sessionId: createId("ses"),
    score: 0,
    engagedFired: false,
    highIntentFired: false
  };

  try {
    const value = window.sessionStorage.getItem(siteConfig.engagementSessionStorageKey);
    if (!value) {
      setEngagementState(fallback);
      return fallback;
    }
    return {
      ...fallback,
      ...(JSON.parse(value) as Partial<EngagementState>)
    };
  } catch {
    return fallback;
  }
}

function setEngagementState(state: EngagementState) {
  try {
    window.sessionStorage.setItem(siteConfig.engagementSessionStorageKey, JSON.stringify(state));
    window.sessionStorage.setItem(siteConfig.engagementScoreStorageKey, String(state.score));
  } catch {
    // Ignore storage failures.
  }
}

function storeRecentEvent(event: StoredEngagementEvent) {
  try {
    const events = getRecentEvents();
    events.unshift(event);
    window.sessionStorage.setItem(
      siteConfig.engagementEventsStorageKey,
      JSON.stringify(events.slice(0, RECENT_EVENT_LIMIT))
    );
  } catch {
    // Ignore storage failures.
  }
}

function getRecentEvents() {
  try {
    const value = window.sessionStorage.getItem(siteConfig.engagementEventsStorageKey);
    return value ? (JSON.parse(value) as StoredEngagementEvent[]) : [];
  } catch {
    return [];
  }
}

function scoreForEvent(eventName: FunnelEventName) {
  const weights: Partial<Record<FunnelEventName, number>> = {
    section_viewed: 1,
    scroll_depth_reached: 2,
    time_on_page_milestone: 1,
    cta_clicked: 2,
    mobile_sticky_cta_clicked: 3,
    guide_cta_clicked: 3,
    quiz_started: 4,
    quiz_completed: 8,
    calculator_started: 4,
    calculator_completed: 7,
    compare_page_viewed: 5,
    ready_to_compare_viewed: 7,
    quote_workspace_viewed: 5,
    quote_workspace_started: 6,
    quote_workspace_completed: 10,
    provider_card_viewed: 3,
    guide_page_viewed: 1,
    glossary_viewed: 1,
    related_guide_clicked: 2,
    seo_compare_cta_clicked: 5,
    seo_quiz_cta_clicked: 4,
    primary_offer_viewed: 4,
    primary_offer_clicked: 10,
    backup_offer_clicked: 5,
    affiliate_cta_clicked: 12,
    outbound_redirect_started: 15,
    email_capture_submitted: 5,
    behavioral_nudge_clicked: 4
  };

  return weights[eventName] ?? 0;
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function sanitizeValue(value: string | number | boolean | undefined) {
  if (typeof value !== "string") return value;
  return value.slice(0, 140).replace(/[<>]/g, "");
}

function getReferrerHost() {
  if (typeof document === "undefined" || !document.referrer) return undefined;

  try {
    return new URL(document.referrer).host;
  } catch {
    return undefined;
  }
}
