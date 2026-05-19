export type AffiliateNetwork =
  | "Impact"
  | "Impact Radius"
  | "CJ"
  | "FlexOffers"
  | "Everflow"
  | "Direct"
  | "Petted"
  | "Unknown";

export type ProviderRole = "primary" | "backup";

export type CommissionType =
  | "CPL"
  | "CPA"
  | "CPA / conversion"
  | "Policy Sale"
  | "qualified lead or signup, verify after approval"
  | "qualified lead, verify after approval"
  | "Unknown";

export type ApprovalStatus = "Not applied" | "Pending approval" | "Applied" | "Approved";

export type BrandBiddingAllowed = boolean | "unknown";

export type Provider = {
  name: string;
  slug: string;
  role: ProviderRole;
  priority: number;
  affiliateUrl: string;
  affiliateNetwork: AffiliateNetwork;
  commissionType: CommissionType;
  publicPayoutClaim: string;
  estimatedPayout: string;
  approvalStatus: ApprovalStatus;
  bestForLabel: string;
  shortDescription: string;
  notes: string;
  pros: string[];
  cons: string[];
  trafficRestrictionsNotes: string;
  paidSearchRestrictionsNotes: string;
  brandBiddingAllowed: BrandBiddingAllowed;
  ctaText: string;
  disclosureText: string;
};

export type FunnelEventName =
  | "landing_page_view"
  | "paid_landing_page_view"
  | "session_started"
  | "section_viewed"
  | "scroll_depth_reached"
  | "time_on_page_milestone"
  | "cta_clicked"
  | "mobile_sticky_cta_clicked"
  | "engaged_session"
  | "high_intent_signal"
  | "behavioral_nudge_shown"
  | "behavioral_nudge_clicked"
  | "quiz_started"
  | "quiz_step_completed"
  | "quiz_completed"
  | "calculator_started"
  | "calculator_completed"
  | "compare_page_viewed"
  | "provider_card_viewed"
  | "affiliate_cta_clicked"
  | "email_capture_submitted"
  | "guide_page_viewed"
  | "guide_cta_clicked"
  | "glossary_viewed"
  | "related_guide_clicked"
  | "seo_compare_cta_clicked"
  | "seo_quiz_cta_clicked"
  | "primary_offer_viewed"
  | "primary_offer_clicked"
  | "backup_offer_clicked"
  | "outbound_redirect_started";

export type LandingPageVariant = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  audienceNote: string;
  compareReasonTitle: string;
  compareReasons: string[];
  helpWith: string[];
  usuallyNotCovered: string[];
  faq: Array<{ question: string; answer: string }>;
};

export type GuideCategory =
  | "Pet Insurance Basics"
  | "Dog Insurance Guides"
  | "Cat Insurance Guides"
  | "Vet Bill Planning"
  | "Policy Fine Print"
  | "Breed-Specific Guides";

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideExampleScenario = {
  title: string;
  body: string[];
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: GuideCategory;
  summary: string;
  shortAnswer: string;
  keyTakeaways: string[];
  description: string;
  intro: string;
  sections: Array<{
    id: string;
    heading: string;
    body: string[];
  }>;
  exampleScenario: GuideExampleScenario;
  whatToCompare: string[];
  commonMistakes: string[];
  faqs: GuideFaq[];
  relatedGuideSlugs: string[];
  datePublished: string;
  dateModified: string;
  readingTimeMinutes: number;
  affiliateDisclosureRequired: boolean;
  disclaimerRequired: boolean;
};
