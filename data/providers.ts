import { siteConfig } from "@/data/siteConfig";
import type { Provider } from "@/lib/types";

export const providers = ([
  {
    name: "Odie",
    slug: siteConfig.providerTrackingSlugs.odie,
    role: "primary",
    priority: 1,
    affiliateUrl: siteConfig.providerAffiliateUrls.odie,
    affiliateNetwork: "Awin",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action in Awin.",
    estimatedPayout:
      "Approved affiliate link is configured. Add confirmed payout, cookie window, and qualifying action after reviewing Awin terms.",
    approvalStatus: "Approved",
    bestForLabel: "Review an approved dog and cat provider option",
    shortDescription:
      "Current primary clickout because PawPeaceGuide has an approved Odie affiliate link while broader comparison partners are still pending.",
    notes:
      "Approved Awin affiliate link is live. Treat Odie as the current primary direct-provider option, while keeping comparison partners ready to add after approval.",
    pros: [
      "Approved PawPeaceGuide affiliate clickout is configured through Awin",
      "Useful direct-provider option for dog and cat owners who are ready to review policy details",
      "Can be compared against marketplace or comparison paths after users understand core insurance terms"
    ],
    cons: [
      "Direct-provider flow is not a full-market comparison",
      "Approved payout, cookie window, and paid social permissions should be verified in Awin before scaling campaigns",
      "Users must review policy terms, exclusions, waiting periods, claim rules, and availability directly with Odie"
    ],
    trafficRestrictionsNotes:
      "Approved link is configured. Confirm Facebook/Instagram paid social, pre-sell page, direct-linking, retargeting, and creative restrictions in Awin before scaling.",
    paidSearchRestrictionsNotes:
      "Placeholder. Confirm Awin trademark, competitor, paid search, and brand bidding restrictions before running search campaigns.",
    brandBiddingAllowed: "unknown",
    ctaText: "Continue to comparison partner",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "The Swiftest",
    slug: siteConfig.providerTrackingSlugs.theSwiftest,
    role: "backup",
    priority: 2,
    affiliateUrl: siteConfig.providerAffiliateUrls.theSwiftest,
    affiliateNetwork: "Everflow",
    commissionType: "CPA / conversion",
    publicPayoutClaim:
      "$125 per conversion referenced in public materials; verify final approved terms in affiliate dashboard",
    estimatedPayout:
      "Public payout claim only. Verify approved payout, qualifying action, cookie window, and paid traffic rules after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Start with a pet insurance comparison flow",
    shortDescription:
      "Pending comparison partner. Promote this path after approved affiliate terms and tracking are confirmed.",
    notes:
      "High-priority comparison offer after approval. The Swiftest's public pet insurance page is built around provider comparisons and SwiftScore context; final tracking URL and terms must be verified after approval.",
    pros: [
      "Pet-focused comparison page rather than a single-carrier handoff",
      "Public site presents an explore, compare, then continue-to-provider flow",
      "Comparison context can help users review cost, reimbursement, annual benefit, and provider details"
    ],
    cons: [
      "PawPeaceGuide is not The Swiftest and does not control their rankings, quote pages, eligibility, or policy terms",
      "Approval, payout, cookie window, paid social permissions, and tracking URL still require affiliate dashboard confirmation",
      "Users should review provider details and policy terms directly before applying"
    ],
    trafficRestrictionsNotes:
      "Placeholder. Confirm Meta/Instagram paid social, retargeting, bridge page, and pre-sell page rules after approval.",
    paidSearchRestrictionsNotes:
      "Placeholder. Confirm brand bidding, competitor terms, trademark rules, and paid search restrictions after approval.",
    brandBiddingAllowed: "unknown",
    ctaText: "Compare quote options",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "Petted",
    slug: siteConfig.providerTrackingSlugs.petted,
    role: "backup",
    priority: 3,
    affiliateUrl: siteConfig.providerAffiliateUrls.petted,
    affiliateNetwork: "Petted",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action after acceptance.",
    estimatedPayout:
      "Placeholder only. Add approved payout, cookie window, and qualifying action after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Future marketplace or comparison backup option",
    shortDescription:
      "Pending backup partner slot for a pet insurance marketplace or comparison path after approved terms are confirmed.",
    notes:
      "Application pending. Keep disabled until the approved tracking URL, traffic rules, and disclosures are confirmed.",
    pros: [
      "Potential backup comparison-style partner",
      "Can preserve revenue continuity if primary comparison approval is delayed",
      "May fit education-first traffic after terms are verified"
    ],
    cons: [
      "Affiliate approval and payout terms are not configured yet",
      "Paid social rules must be confirmed before ads use this path",
      "Users must verify quote, provider, and policy details directly"
    ],
    trafficRestrictionsNotes:
      "Pending. Confirm Facebook/Instagram paid social, bridge page, and disclosure rules after approval.",
    paidSearchRestrictionsNotes:
      "Pending. Confirm brand bidding, trademark, and competitor-term rules after approval.",
    brandBiddingAllowed: "unknown",
    ctaText: "Compare quote options",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "Pets Best",
    slug: siteConfig.providerTrackingSlugs.petsBest,
    role: "backup",
    priority: 4,
    affiliateUrl: siteConfig.providerAffiliateUrls.petsBest,
    affiliateNetwork: "Impact Radius",
    commissionType: "qualified lead or signup, verify after approval",
    publicPayoutClaim: "Unknown in official page, verify in Impact",
    estimatedPayout:
      "Placeholder only. Add approved Impact Radius payout and qualifying action after acceptance.",
    approvalStatus: "Not applied",
    bestForLabel: "Review a known pet insurance provider",
    shortDescription:
      "Backup/direct provider option for users who want to review a specific pet insurance provider site.",
    notes:
      "Official affiliate page says approved affiliates receive a unique tracking URL through Impact Radius.",
    pros: [
      "Recognizable direct provider option",
      "Can serve as a backup card below the primary comparison offer",
      "Official affiliate page collects affiliate applications"
    ],
    cons: [
      "Approved payout and qualifying action must be verified in Impact",
      "Direct-provider flow may compare fewer options than a marketplace or comparison page",
      "Partner-specific paid traffic rules need review before ads run"
    ],
    trafficRestrictionsNotes:
      "Placeholder. Confirm whether Instagram/Meta paid traffic, bridge pages, email, and retargeting are allowed.",
    paidSearchRestrictionsNotes:
      "Placeholder. Confirm Impact terms, trademark rules, and brand bidding restrictions.",
    brandBiddingAllowed: "unknown",
    ctaText: "Visit provider site",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "Fetch",
    slug: siteConfig.providerTrackingSlugs.fetch,
    role: "backup",
    priority: 5,
    affiliateUrl: siteConfig.providerAffiliateUrls.fetch,
    affiliateNetwork: "Unknown",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action after acceptance.",
    estimatedPayout:
      "Placeholder only. Add approved payout, cookie window, and qualifying action after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Future direct-provider option",
    shortDescription:
      "Pending backup provider slot. Keep disabled until an approved tracking URL and terms are available.",
    notes:
      "Application pending. Do not imply approval or provider endorsement until affiliate terms are confirmed.",
    pros: [
      "Can become another direct-provider comparison point after approval",
      "Useful for users who want to compare individual provider terms",
      "Provider-specific card can be expanded after approved disclosures are available"
    ],
    cons: [
      "Affiliate link is not configured yet",
      "Payout and qualifying action are unknown",
      "Policy terms and availability must be verified directly with the provider"
    ],
    trafficRestrictionsNotes:
      "Pending. Confirm paid social, pre-sell page, and creative rules after approval.",
    paidSearchRestrictionsNotes:
      "Pending. Confirm trademark and brand bidding restrictions after approval.",
    brandBiddingAllowed: "unknown",
    ctaText: "Visit provider site",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "Trupanion",
    slug: siteConfig.providerTrackingSlugs.trupanion,
    role: "backup",
    priority: 6,
    affiliateUrl: siteConfig.providerAffiliateUrls.trupanion,
    affiliateNetwork: "Unknown",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action after acceptance.",
    estimatedPayout:
      "Placeholder only. Add approved payout, cookie window, and qualifying action after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Future direct-provider option",
    shortDescription:
      "Pending backup provider slot for users who want to review a direct provider after education.",
    notes:
      "Application pending. Keep disabled until approved link, traffic rules, and required disclosures are confirmed.",
    pros: [
      "Can support direct-provider comparison once approved",
      "May be useful for shoppers comparing claim and reimbursement mechanics",
      "Provider card can be expanded after verified partner terms are available"
    ],
    cons: [
      "Affiliate link is not configured yet",
      "Paid traffic permissions are not confirmed in the app",
      "Users must review policy terms directly with the provider"
    ],
    trafficRestrictionsNotes:
      "Pending. Confirm Facebook/Instagram traffic, pre-sell page, and retargeting rules after approval.",
    paidSearchRestrictionsNotes:
      "Pending. Confirm brand bidding, trademark, and competitor-term rules after approval.",
    brandBiddingAllowed: "unknown",
    ctaText: "Visit provider site",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "ASPCA Pet Health Insurance",
    slug: siteConfig.providerTrackingSlugs.aspcaPetHealth,
    role: "backup",
    priority: 7,
    affiliateUrl: siteConfig.providerAffiliateUrls.aspcaPetHealth,
    affiliateNetwork: "Unknown",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action after acceptance.",
    estimatedPayout:
      "Placeholder only. Add approved payout, cookie window, and qualifying action after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Future direct-provider option",
    shortDescription:
      "Pending backup provider slot. Keep disabled until approved affiliate terms and tracking are confirmed.",
    notes:
      "Application pending. Confirm brand, trademark, traffic, and disclosure rules before use in paid campaigns.",
    pros: [
      "Can become another provider-specific option after approval",
      "Useful for readers comparing direct provider policy terms",
      "Maintains funnel flexibility if other partners are delayed"
    ],
    cons: [
      "Affiliate link is not configured yet",
      "Payout, cookie window, and paid social rules are not entered",
      "Users should verify policy details directly with the provider"
    ],
    trafficRestrictionsNotes:
      "Pending. Confirm Facebook/Instagram paid social and pre-sell page rules after approval.",
    paidSearchRestrictionsNotes:
      "Pending. Confirm brand bidding, trademark, and paid search restrictions after approval.",
    brandBiddingAllowed: "unknown",
    ctaText: "Visit provider site",
    disclosureText: siteConfig.affiliateDisclosure
  },
  {
    name: "Embrace",
    slug: siteConfig.providerTrackingSlugs.embrace,
    role: "backup",
    priority: 8,
    affiliateUrl: siteConfig.providerAffiliateUrls.embrace,
    affiliateNetwork: "FlexOffers",
    commissionType: "qualified lead, verify after approval",
    publicPayoutClaim: "Placeholder. Verify approved terms before use.",
    estimatedPayout:
      "Placeholder only. Add approved payout and qualifying action after affiliate acceptance.",
    approvalStatus: "Not applied",
    bestForLabel: "Review pet insurance coverage features",
    shortDescription:
      "Backup offer slot for reviewing coverage features after approved affiliate terms are confirmed.",
    notes: "Backup offer only until approved terms are confirmed.",
    pros: [
      "Useful as a secondary direct-provider option",
      "Can support provider-specific disclosure requirements",
      "Gives the funnel flexibility if the primary partner is not approved"
    ],
    cons: [
      "Approved affiliate terms are not configured yet",
      "Public payout is not entered and should not be invented",
      "Users must verify policy terms directly with the provider"
    ],
    trafficRestrictionsNotes:
      "Placeholder. Confirm Meta/Instagram traffic, pre-sell page requirements, and disclosure requirements after approval.",
    paidSearchRestrictionsNotes:
      "Placeholder. Confirm brand bidding, trademark, competitor, and paid search restrictions.",
    brandBiddingAllowed: "unknown",
    ctaText: "Visit provider site",
    disclosureText: siteConfig.affiliateDisclosure
  }
] satisfies Provider[]).sort((a, b) => a.priority - b.priority);

export function getProviderBySlug(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}

export function getPrimaryProvider() {
  return providers.find((provider) => provider.role === "primary") ?? providers[0];
}

export function getBackupProviders() {
  return providers.filter((provider) => provider.role === "backup");
}

export function getConfiguredBackupProviders() {
  return getBackupProviders().filter(isProviderAffiliateConfigured);
}

export function isProviderAffiliateConfigured(provider: Provider) {
  const value = provider.affiliateUrl.trim();

  if (!value) return false;

  const lowerValue = value.toLowerCase();
  if (
    lowerValue.includes("placeholder") ||
    lowerValue.includes("todo") ||
    lowerValue.includes("example.com")
  ) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
