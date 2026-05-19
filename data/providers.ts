import { siteConfig } from "@/data/siteConfig";
import type { Provider } from "@/lib/types";

export const providers = ([
  {
    name: "The Swiftest",
    slug: siteConfig.providerTrackingSlugs.theSwiftest,
    role: "primary",
    priority: 1,
    affiliateUrl: siteConfig.providerAffiliateUrls.theSwiftest,
    affiliateNetwork: "Everflow",
    commissionType: "CPA / conversion",
    publicPayoutClaim: "$125 per conversion, verify in affiliate dashboard",
    estimatedPayout:
      "Public payout claim only. Verify approved payout, qualifying action, cookie window, and paid traffic rules after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Compare pet insurance quote options",
    shortDescription:
      "Primary comparison option for PawPeaceGuide once approved affiliate terms and tracking are confirmed.",
    notes:
      "Primary comparison offer. Final tracking URL and terms must be verified after approval.",
    pros: [
      "Comparison flow may be simpler than checking one insurer at a time",
      "Public materials reference an EverFlow affiliate dashboard",
      "Good fit after education, quiz, or calculator pre-sell content"
    ],
    cons: [
      "Affiliate approval is not guaranteed",
      "Public payout claims must be verified inside the approved affiliate dashboard",
      "Paid social permissions and qualifying conversion rules must be confirmed before scaling"
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
    name: "Pets Best",
    slug: siteConfig.providerTrackingSlugs.petsBest,
    role: "backup",
    priority: 2,
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
    name: "Embrace",
    slug: siteConfig.providerTrackingSlugs.embrace,
    role: "backup",
    priority: 3,
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
