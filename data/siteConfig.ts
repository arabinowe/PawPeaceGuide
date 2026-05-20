import type { FunnelEventName } from "@/lib/types";

export const siteConfig = {
  brandName: "PawPeaceGuide",
  tagline: "Plain-English pet insurance guidance for calmer decisions.",
  heroLine: "Pet insurance explained before you compare.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pawpeaceguide.com",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "TODO_META_PIXEL_ID",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "TODO_GA_MEASUREMENT_ID",
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18175565397",
  googleAdsConversionLabel:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "TODO_GOOGLE_ADS_CONVERSION_LABEL",
  googleAdsMicroConversionLabel:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_MICRO_CONVERSION_LABEL ||
    "TODO_GOOGLE_ADS_MICRO_CONVERSION_LABEL",
  googleAdSenseEnabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "false",
  googleAdSenseClientId:
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-6197257851905887",
  googleAdSenseSlots: {
    display:
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY ||
      process.env.NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY ||
      "",
    inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || "",
    inFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_FEED || "",
    inFeedLayoutKey: process.env.NEXT_PUBLIC_ADSENSE_IN_FEED_LAYOUT_KEY || "",
    multiplex: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MULTIPLEX || "",
    secondary: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY || ""
  },
  googleAdSenseSearchEngineId: process.env.NEXT_PUBLIC_ADSENSE_SEARCH_ENGINE_ID || "",
  googleTagManagerId: "TODO_GTM_ID",
  experimentId:
    process.env.NEXT_PUBLIC_EXPERIMENT_ID || "2026-05-20-search-conversion-simplification",
  awinPublisherTagEnabled: process.env.NEXT_PUBLIC_AWIN_PUBLISHER_TAG_ENABLED !== "false",
  awinPublisherId: process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID || "2902179",
  emailCaptureProvider: "TODO_EMAIL_PROVIDER",
  appendUtmToAffiliateLinks: process.env.NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS !== "false",
  engagementTrackingEnabled: process.env.NEXT_PUBLIC_ENGAGEMENT_TRACKING_ENABLED !== "false",
  engagementEventEndpoint: process.env.NEXT_PUBLIC_ENGAGEMENT_EVENT_ENDPOINT || "/api/engagement",
  engagementSampleRate: Number(process.env.NEXT_PUBLIC_ENGAGEMENT_SAMPLE_RATE || "1"),
  utmStorageKey: "pawpeaceguide_utm",
  engagementSessionStorageKey: "pawpeaceguide_engagement_session",
  engagementScoreStorageKey: "pawpeaceguide_engagement_score",
  engagementEventsStorageKey: "pawpeaceguide_recent_events",
  affiliateDisclosure:
    "PawPeaceGuide is an educational, affiliate-supported website. We may earn compensation if you visit a provider through our links and purchase a policy. We are not an insurer, broker, agency, producer, financial advisor, or legal advisor. Review all policy terms directly with the provider.",
  shortDisclosure: "Educational, affiliate-supported guide. Not an insurer or broker.",
  legalDisclaimer:
    "PawPeaceGuide provides general educational information only. PawPeaceGuide is not an insurer, insurance agency, broker, producer, underwriter, financial advisor, or legal advisor. Coverage, pricing, exclusions, waiting periods, reimbursement, approval, availability, and claim payment may vary by provider, state, pet, policy, and underwriting rules. Nothing on this site guarantees coverage, pricing, approval, reimbursement, or claim payment. Review all policy terms directly with each provider.",
  eventNames: {
    landingPageView: "landing_page_view",
    paidLandingPageView: "paid_landing_page_view",
    sessionStarted: "session_started",
    sectionViewed: "section_viewed",
    scrollDepthReached: "scroll_depth_reached",
    timeOnPageMilestone: "time_on_page_milestone",
    ctaClicked: "cta_clicked",
    mobileStickyCtaClicked: "mobile_sticky_cta_clicked",
    engagedSession: "engaged_session",
    highIntentSignal: "high_intent_signal",
    behavioralNudgeShown: "behavioral_nudge_shown",
    behavioralNudgeClicked: "behavioral_nudge_clicked",
    quizStarted: "quiz_started",
    quizStepCompleted: "quiz_step_completed",
    quizCompleted: "quiz_completed",
    calculatorStarted: "calculator_started",
    calculatorCompleted: "calculator_completed",
    comparePageViewed: "compare_page_viewed",
    readyToCompareViewed: "ready_to_compare_viewed",
    providerCardViewed: "provider_card_viewed",
    affiliateCtaClicked: "affiliate_cta_clicked",
    emailCaptureSubmitted: "email_capture_submitted",
    guidePageViewed: "guide_page_viewed",
    guideCtaClicked: "guide_cta_clicked",
    glossaryViewed: "glossary_viewed",
    relatedGuideClicked: "related_guide_clicked",
    seoCompareCtaClicked: "seo_compare_cta_clicked",
    seoQuizCtaClicked: "seo_quiz_cta_clicked",
    primaryOfferViewed: "primary_offer_viewed",
    primaryOfferClicked: "primary_offer_clicked",
    backupOfferClicked: "backup_offer_clicked",
    outboundRedirectStarted: "outbound_redirect_started"
  } satisfies Record<string, FunnelEventName>,
  providerAffiliateUrls: {
    theSwiftest: "PLACEHOLDER_SWIFTEST_AFFILIATE_URL",
    odie: "configured://odie",
    petted: "",
    petsBest: "",
    fetch: "",
    trupanion: "",
    aspcaPetHealth: "",
    embrace: "",
    lemonade: ""
  },
  supplementalAffiliateUrls: {
    moodifypet: "configured://moodifypet"
  },
  providerTrackingSlugs: {
    theSwiftest: "the-swiftest",
    odie: "odie",
    petted: "petted",
    petsBest: "pets-best",
    fetch: "fetch",
    trupanion: "trupanion",
    aspcaPetHealth: "aspca-pet-health-insurance",
    embrace: "embrace",
    lemonade: "lemonade-pet-insurance"
  },
  supplementalTrackingSlugs: {
    moodifypet: "moodifypet"
  },
  providerNetwork: {
    theSwiftest: "Everflow",
    odie: "Awin",
    petted: "Petted",
    petsBest: "Impact Radius",
    fetch: "Unknown",
    trupanion: "Unknown",
    aspcaPetHealth: "Unknown",
    embrace: "FlexOffers",
    lemonade: "Unknown"
  },
  providerCommissionType: {
    theSwiftest: "CPA / conversion",
    odie: "Unknown",
    petted: "Unknown",
    petsBest: "qualified lead or signup, verify after approval",
    fetch: "Unknown",
    trupanion: "Unknown",
    aspcaPetHealth: "Unknown",
    embrace: "qualified lead, verify after approval",
    lemonade: "Unknown"
  }
} as const;

export const navLinks = [
  { href: "/find-my-path", label: "Find Path" },
  { href: "/pet-insurance", label: "Pet Insurance" },
  { href: "/quiz", label: "Quiz" },
  { href: "/calculator", label: "Calculator" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" }
];
