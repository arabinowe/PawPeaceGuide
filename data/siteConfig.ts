import type { FunnelEventName } from "@/lib/types";

export const siteConfig = {
  brandName: "PawPeaceGuide",
  tagline: "Plain-English pet insurance guidance for calmer decisions.",
  heroLine: "Know before you need it.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pawpeaceguide.example",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "TODO_META_PIXEL_ID",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "TODO_GA_MEASUREMENT_ID",
  googleTagManagerId: "TODO_GTM_ID",
  emailCaptureProvider: "TODO_EMAIL_PROVIDER",
  appendUtmToAffiliateLinks: process.env.NEXT_PUBLIC_APPEND_UTM_TO_AFFILIATE_LINKS === "true",
  utmStorageKey: "pawpeaceguide_utm",
  affiliateDisclosure:
    "PawPeaceGuide is an educational, affiliate-supported website. We may earn compensation if you visit a provider through our links and purchase a policy. We are not an insurer, broker, agency, producer, financial advisor, or legal advisor. Review all policy terms directly with the provider.",
  shortDisclosure: "Educational, affiliate-supported guide. Not an insurer or broker.",
  legalDisclaimer:
    "PawPeaceGuide provides general educational information only. PawPeaceGuide is not an insurer, insurance agency, broker, producer, underwriter, financial advisor, or legal advisor. Coverage, pricing, exclusions, waiting periods, reimbursement, approval, availability, and claim payment may vary by provider, state, pet, policy, and underwriting rules. Nothing on this site guarantees coverage, pricing, approval, reimbursement, or claim payment. Review all policy terms directly with each provider.",
  eventNames: {
    landingPageView: "landing_page_view",
    paidLandingPageView: "paid_landing_page_view",
    quizStarted: "quiz_started",
    quizStepCompleted: "quiz_step_completed",
    quizCompleted: "quiz_completed",
    calculatorStarted: "calculator_started",
    calculatorCompleted: "calculator_completed",
    comparePageViewed: "compare_page_viewed",
    providerCardViewed: "provider_card_viewed",
    affiliateCtaClicked: "affiliate_cta_clicked",
    emailCaptureSubmitted: "email_capture_submitted",
    guideCtaClicked: "guide_cta_clicked",
    primaryOfferViewed: "primary_offer_viewed",
    primaryOfferClicked: "primary_offer_clicked",
    backupOfferClicked: "backup_offer_clicked",
    outboundRedirectStarted: "outbound_redirect_started"
  } satisfies Record<string, FunnelEventName>,
  providerAffiliateUrls: {
    theSwiftest:
      process.env.NEXT_PUBLIC_PRIMARY_AFFILIATE_URL || "PLACEHOLDER_PRIMARY_AFFILIATE_URL",
    petsBest: "",
    embrace: ""
  },
  providerTrackingSlugs: {
    theSwiftest: "the-swiftest",
    petsBest: "pets-best",
    embrace: "embrace"
  },
  providerNetwork: {
    theSwiftest: "Everflow",
    petsBest: "Impact Radius",
    embrace: "FlexOffers"
  },
  providerCommissionType: {
    theSwiftest: "CPA / conversion",
    petsBest: "qualified lead or signup, verify after approval",
    embrace: "qualified lead, verify after approval"
  }
} as const;

export const navLinks = [
  { href: "/pet-insurance", label: "Pet Insurance" },
  { href: "/quiz", label: "Quiz" },
  { href: "/calculator", label: "Calculator" },
  { href: "/compare", label: "Compare" },
  { href: "/guides/is-pet-insurance-worth-it", label: "Guides" }
];
