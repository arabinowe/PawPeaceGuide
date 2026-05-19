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
  | "quiz_started"
  | "quiz_step_completed"
  | "quiz_completed"
  | "calculator_started"
  | "calculator_completed"
  | "compare_page_viewed"
  | "provider_card_viewed"
  | "affiliate_cta_clicked"
  | "email_capture_submitted"
  | "guide_cta_clicked"
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

export type Guide = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: Array<{
    id: string;
    heading: string;
    body: string[];
  }>;
};
