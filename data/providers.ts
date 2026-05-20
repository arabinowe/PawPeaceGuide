import { siteConfig } from "@/data/siteConfig";
import type { PartnerOffer, Provider } from "@/lib/types";

export const providers = ([
  {
    name: "Odie",
    slug: siteConfig.providerTrackingSlugs.odie,
    role: "primary",
    priority: 1,
    isLive: true,
    partnerType: "insurance",
    status: "live",
    supportedPetTypes: ["dog", "cat", "puppy", "kitten"],
    bestFitUseCases: [
      "Dog owners ready to review one live provider quote path",
      "Cat owners ready to review one live provider quote path",
      "Puppy and kitten owners who need to verify age eligibility directly",
      "Ready-to-compare users who want an active quote option now"
    ],
    notBestFor: [
      "People who specifically want a many-provider comparison flow",
      "Pet owners shopping for animals other than dogs or cats",
      "Wellness-only shoppers who are not looking for insurance"
    ],
    differentiators: [
      "Current PawPeaceGuide live monetized pet insurance clickout",
      "Direct provider path rather than a multi-provider comparison"
    ],
    verificationNeeded: [
      "Coverage terms, exclusions, waiting periods, reimbursement, and state availability",
      "Age eligibility for puppies, kittens, and senior pets",
      "Paid social rules, payout, cookie window, and qualifying action in Awin",
      "Whether any wellness plan is separate from insurance coverage"
    ],
    monetizationPriority: 100,
    userValuePriority: 85,
    routeWeight: 92,
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
    ctaText: "Review Odie quote options",
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not call Odie best, cheapest, guaranteed, or recommended.",
      "Use Review Odie quote options, Visit provider site, and Confirm terms directly with the provider.",
      "Wellness plan language must stay separate from insurance coverage language."
    ]
  },
  {
    name: "The Swiftest",
    slug: siteConfig.providerTrackingSlugs.theSwiftest,
    role: "backup",
    priority: 2,
    isLive: false,
    partnerType: "comparison",
    status: "pending",
    supportedPetTypes: ["dog", "cat", "unknown"],
    bestFitUseCases: [
      "Users who want to compare multiple pet insurance options",
      "Users unsure which provider to review first",
      "SEO readers coming from comparison-intent content"
    ],
    notBestFor: [
      "Paid users who need a live affiliate route today",
      "Users who want a direct-provider quote now while the link is pending"
    ],
    differentiators: [
      "Pending comparison-flow partner",
      "Public materials describe a pet insurance comparison experience"
    ],
    verificationNeeded: [
      "Approved tracking URL",
      "Supported pet types and quote availability",
      "Final payout, qualifying action, cookie window, and paid social permissions",
      "Required affiliate disclosures"
    ],
    monetizationPriority: 95,
    userValuePriority: 92,
    routeWeight: 88,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not route high-intent paid users to The Swiftest until the affiliate URL is live.",
      "Do not imply PawPeaceGuide controls comparison results or rankings."
    ]
  },
  {
    name: "Petted",
    slug: siteConfig.providerTrackingSlugs.petted,
    role: "backup",
    priority: 3,
    isLive: false,
    partnerType: "comparison",
    status: "pending",
    supportedPetTypes: ["dog", "cat", "unknown"],
    bestFitUseCases: [
      "Future embedded comparison experience",
      "Users who want multiple partner quotes",
      "PawPeaceGuide comparison UX after approval"
    ],
    notBestFor: [
      "Live paid traffic until approval and widget or tracking terms are confirmed",
      "Users who need a direct-provider route today"
    ],
    differentiators: [
      "Future marketplace, widget, or white-label comparison path if approved"
    ],
    verificationNeeded: [
      "Affiliate approval",
      "Tracking URL or widget implementation terms",
      "Supported pet types, traffic rules, and disclosure requirements"
    ],
    monetizationPriority: 80,
    userValuePriority: 86,
    routeWeight: 70,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not imply live availability until approval and implementation details are confirmed."
    ]
  },
  {
    name: "Pets Best",
    slug: siteConfig.providerTrackingSlugs.petsBest,
    role: "backup",
    priority: 4,
    isLive: false,
    partnerType: "insurance",
    status: "pending",
    supportedPetTypes: ["dog", "cat"],
    bestFitUseCases: [
      "Users who want established direct-provider options",
      "Dog and cat plan comparison education",
      "Users asking about routine care add-ons or reimbursement settings"
    ],
    notBestFor: [
      "Live clickout until approved tracking URL is configured",
      "Pet owners shopping for animals other than dogs or cats unless verified"
    ],
    differentiators: [
      "Direct provider pending affiliate approval",
      "Potential education around reimbursement, limits, routine care add-ons, and dental coverage after verification"
    ],
    verificationNeeded: [
      "Approved Impact Radius link",
      "Payout and qualifying action",
      "Whether no annual or lifetime payout limit language applies to the current product and state",
      "Routine care and dental eligibility details"
    ],
    monetizationPriority: 72,
    userValuePriority: 78,
    routeWeight: 58,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Any reimbursement, dental, or limit language must be verified in official terms before being stated as current."
    ]
  },
  {
    name: "Fetch",
    slug: siteConfig.providerTrackingSlugs.fetch,
    role: "backup",
    priority: 5,
    isLive: false,
    partnerType: "insurance",
    status: "pending",
    supportedPetTypes: ["dog", "cat"],
    bestFitUseCases: [
      "Users interested in dental coverage details",
      "Users asking about breed-specific issue coverage",
      "Users who want to understand exam fee treatment"
    ],
    notBestFor: [
      "Live clickout until affiliate approval is configured",
      "Users expecting verified current dental or exam-fee terms from PawPeaceGuide"
    ],
    differentiators: [
      "Potential direct-provider lane for dental, breed-specific, and exam-fee education after verification"
    ],
    verificationNeeded: [
      "Approved affiliate URL",
      "Current dental injury or disease wording",
      "Breed-specific issue coverage language",
      "Exam fee, behavioral, and virtual vet details"
    ],
    monetizationPriority: 68,
    userValuePriority: 80,
    routeWeight: 56,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not present dental, breed-specific, or exam-fee details as verified until official terms are reviewed."
    ]
  },
  {
    name: "Trupanion",
    slug: siteConfig.providerTrackingSlugs.trupanion,
    role: "backup",
    priority: 6,
    isLive: false,
    partnerType: "insurance",
    status: "pending",
    supportedPetTypes: ["dog", "cat"],
    bestFitUseCases: [
      "Users interested in direct vet pay",
      "Users focused on serious medical coverage questions",
      "Users interested in a different deductible structure"
    ],
    notBestFor: [
      "Live clickout until affiliate approval is configured",
      "Users expecting PawPeaceGuide to verify direct-pay availability at their vet"
    ],
    differentiators: [
      "Potential lane for direct vet pay and lifetime per-condition deductible education after verification"
    ],
    verificationNeeded: [
      "Approved affiliate URL",
      "Direct vet pay availability and limitations",
      "Up to 90% eligible treatment language",
      "Lifetime per-condition deductible details"
    ],
    monetizationPriority: 65,
    userValuePriority: 82,
    routeWeight: 55,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not imply direct vet pay is available at every veterinarian or for every claim."
    ]
  },
  {
    name: "ASPCA Pet Health Insurance",
    slug: siteConfig.providerTrackingSlugs.aspcaPetHealth,
    role: "backup",
    priority: 7,
    isLive: false,
    partnerType: "insurance",
    status: "pending",
    supportedPetTypes: ["dog", "cat", "unknown"],
    bestFitUseCases: [
      "Users who respond to animal-welfare trust signals",
      "Accident and illness education",
      "Hereditary, behavioral, exam-fee, diagnostic, and treatment coverage education after verification"
    ],
    notBestFor: [
      "Live clickout until affiliate approval is configured",
      "Other-pet or horse shoppers unless current availability is verified directly"
    ],
    differentiators: [
      "Potential lane for customizable coverage, exam fee, hereditary, and behavioral issue education after verification"
    ],
    verificationNeeded: [
      "Approved affiliate URL",
      "Current supported pet types, including whether any non-dog/cat options are available",
      "Customizable coverage, exam fee, hereditary, and behavioral issue wording",
      "Traffic and trademark rules"
    ],
    monetizationPriority: 64,
    userValuePriority: 80,
    routeWeight: 54,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not imply ASPCA Pet Health Insurance covers other pets unless verified directly from official terms."
    ]
  },
  {
    name: "Lemonade Pet Insurance",
    slug: siteConfig.providerTrackingSlugs.lemonade,
    role: "backup",
    priority: 8,
    isLive: false,
    partnerType: "insurance",
    status: "pending",
    supportedPetTypes: ["dog", "cat"],
    bestFitUseCases: [
      "Dog and cat owners who want another direct-provider option after approval",
      "Value-focused shoppers comparing premium against deductible, reimbursement, annual limit, and exclusions",
      "Senior pet shoppers who need clear age, medical-record, and pre-existing condition questions"
    ],
    notBestFor: [
      "Live clickout until affiliate approval and tracking are configured",
      "Pet owners shopping for animals other than dogs or cats unless eligibility is verified directly",
      "Shoppers expecting PawPeaceGuide to confirm pre-existing condition eligibility"
    ],
    differentiators: [
      "Pending direct-provider lane for dog and cat shoppers",
      "Useful future comparison point for digital-first quote shoppers after approved terms are verified",
      "Good fit for education around value-focused comparison and policy transparency"
    ],
    verificationNeeded: [
      "Approved affiliate URL, payout, cookie window, and qualifying action",
      "Paid search rules, brand bidding restrictions, and landing-page requirements",
      "Current dog and cat eligibility, state availability, and age rules",
      "Waiting periods, exclusions, medical-record review, and pre-existing condition definitions"
    ],
    monetizationPriority: 66,
    userValuePriority: 79,
    routeWeight: 55,
    affiliateUrl: siteConfig.providerAffiliateUrls.lemonade,
    affiliateNetwork: "Unknown",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action after acceptance.",
    estimatedPayout:
      "Placeholder only. Add approved payout, cookie window, and qualifying action after affiliate acceptance.",
    approvalStatus: "Pending approval",
    bestForLabel: "Future dog and cat provider option",
    shortDescription:
      "Pending provider slot for dog and cat shoppers. Keep disabled until an approved Lemonade tracking URL and affiliate terms are confirmed.",
    notes:
      "Application pending. Treat Lemonade as a future direct-provider option and verify final terms, traffic rules, state availability, age rules, and required disclosures after approval.",
    pros: [
      "Potentially useful direct-provider option for dog and cat shoppers after approval",
      "Can support value-focused comparison content once the approved affiliate terms are known",
      "Gives PawPeaceGuide another recognizable provider lane without forcing routing before the link is live"
    ],
    cons: [
      "Affiliate link is not configured yet",
      "Payout, cookie window, and paid search permissions are unknown",
      "Users must review pricing, coverage, exclusions, waiting periods, and eligibility directly with Lemonade"
    ],
    trafficRestrictionsNotes:
      "Pending. Confirm paid social, retargeting, bridge page, creative, and disclosure rules after approval.",
    paidSearchRestrictionsNotes:
      "Pending. Confirm trademark, competitor terms, brand bidding, and display URL rules after approval.",
    brandBiddingAllowed: "unknown",
    ctaText: "Visit provider site",
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Do not route users to Lemonade until the approved affiliate URL is live.",
      "Do not claim pre-existing conditions are covered; tell users to verify definitions, waiting periods, and exclusions directly.",
      "Do not bid on Lemonade brand terms until affiliate paid-search terms explicitly allow it."
    ]
  },
  {
    name: "Embrace",
    slug: siteConfig.providerTrackingSlugs.embrace,
    role: "backup",
    priority: 9,
    isLive: false,
    partnerType: "insurance",
    status: "pending",
    supportedPetTypes: ["dog", "cat"],
    bestFitUseCases: [
      "Future backup direct-provider education",
      "Users comparing provider-specific coverage features after approval"
    ],
    notBestFor: [
      "Live clickout until approved terms are configured",
      "Unsupported pet types unless verified directly"
    ],
    differentiators: [
      "Backup direct-provider lane after approved terms are confirmed"
    ],
    verificationNeeded: [
      "Affiliate approval",
      "Current payout, qualifying action, supported pet types, and paid traffic rules",
      "Required provider disclosures"
    ],
    monetizationPriority: 50,
    userValuePriority: 68,
    routeWeight: 40,
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
    disclosureText: siteConfig.affiliateDisclosure,
    complianceNotes: [
      "Backup offer only until approved terms are confirmed."
    ]
  }
] satisfies Provider[]).sort((a, b) => a.priority - b.priority);

export const supplementalPartners = ([
  {
    name: "Moodifypet",
    slug: siteConfig.supplementalTrackingSlugs.moodifypet,
    role: "supplemental",
    priority: 1,
    isLive: true,
    partnerType: "wellness",
    status: "live",
    category: "pet comfort",
    affiliateUrl: siteConfig.supplementalAffiliateUrls.moodifypet,
    affiliateNetwork: "Awin",
    commissionType: "Unknown",
    publicPayoutClaim: "Unknown. Verify approved payout and qualifying action in Awin.",
    approvalStatus: "Approved",
    bestForLabel: "Optional pet comfort and wellness extras",
    shortDescription:
      "A live secondary affiliate lane for day-to-day pet comfort products. It is not insurance and should not be used as a vet bill or coverage solution.",
    notes:
      "Use after insurance education or on wellness content only. Keep it clearly separate from coverage, claims, reimbursement, and policy language.",
    supportedPetTypes: ["unknown"],
    bestFitUseCases: [
      "Pet wellness extras",
      "Comfort routines",
      "Day-to-day pet care support",
      "Optional blog or sidebar product card after insurance education"
    ],
    notBestFor: [
      "Pet insurance quote intent",
      "Emergency vet bill protection",
      "Claims, reimbursement, coverage, or policy questions",
      "Replacing veterinary care"
    ],
    differentiators: [
      "Live non-insurance pet comfort affiliate",
      "Useful as a secondary optional lane, not the main insurance path"
    ],
    verificationNeeded: [
      "Exact product claims, supported pet types, and required Awin disclosures",
      "Paid social rules and any restricted health or calming claims",
      "Payout, cookie window, and qualifying action"
    ],
    monetizationPriority: 35,
    userValuePriority: 45,
    routeWeight: 25,
    ctaText: "View wellness extras",
    disclosureText:
      "PawPeaceGuide is educational and affiliate-supported. We may earn compensation if you visit Moodifypet through our link and purchase a product. Moodifypet is not pet insurance, and wellness products are not a substitute for veterinary care or insurance.",
    complianceNotes: [
      "Never present Moodifypet as insurance.",
      "Do not imply the product treats, cures, prevents, or covers medical costs.",
      "Use only as a secondary wellness or comfort lane."
    ]
  }
] satisfies PartnerOffer[]).sort((a, b) => a.priority - b.priority);

export function getProviderBySlug(slug: string) {
  return (
    providers.find((provider) => provider.slug === slug) ??
    supplementalPartners.find((partner) => partner.slug === slug)
  );
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

export function isProviderAffiliateConfigured(provider: Provider | PartnerOffer) {
  const value = provider.affiliateUrl.trim();

  if (!value) return false;

  if (value.startsWith("configured://")) {
    return provider.isLive && provider.status === "live";
  }

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

export function getLiveInsuranceProviders() {
  return providers.filter(
    (provider) => provider.partnerType === "insurance" && isProviderAffiliateConfigured(provider)
  );
}

export function getPendingHelpfulProviders() {
  return providers.filter((provider) => !isProviderAffiliateConfigured(provider));
}

export function getSupplementalPartnerBySlug(slug: string) {
  return supplementalPartners.find((partner) => partner.slug === slug);
}
