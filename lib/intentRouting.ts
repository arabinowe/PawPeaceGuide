import {
  getProviderBySlug,
  isProviderAffiliateConfigured,
  providers,
  supplementalPartners
} from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { getAffiliateRedirectHref } from "@/lib/affiliate";
import type { PartnerOffer, PetType, Provider, ReadinessLevel, UserIntent } from "@/lib/types";

export type IntentRoutingInput = {
  petType?: PetType;
  lifeStage?: "puppy" | "kitten" | "adult" | "senior" | "unknown";
  userIntent?: UserIntent;
  readinessLevel?: ReadinessLevel;
  wantsComparison?: boolean;
  wantsWellnessExtras?: boolean;
};

export type IntentNextStep = {
  title: string;
  body: string;
  href: string;
  cta: string;
  kind: "affiliate" | "internal" | "education";
  partnerSlug?: string;
};

export type IntentRoutingResult = {
  primaryNextStep: IntentNextStep;
  matchingLiveProviders: Array<Provider | PartnerOffer>;
  pendingHelpfulProviders: Provider[];
  educationalFallback: IntentNextStep;
  recommendedInternalPage: string;
  disclosureNeeded: boolean;
  methodologyNote: string;
};

const methodologyNote =
  "PawPeaceGuide is educational and affiliate-supported. We may earn compensation from some partners. We prioritize options based on fit for the pet owner's goal, pet type, partner availability, and whether a partner link is active. Compensation may influence placement when multiple relevant options are available, but we do not claim any provider is best, cheapest, or guaranteed to cover your pet.";

export function routeIntent(input: IntentRoutingInput = {}): IntentRoutingResult {
  const petType = input.petType ?? "unknown";
  const userIntent = input.userIntent ?? "just researching";
  const readinessLevel = input.readinessLevel ?? "just researching";
  const wantsComparison = Boolean(input.wantsComparison || userIntent === "compare multiple options");
  const wantsWellnessExtras = Boolean(input.wantsWellnessExtras || userIntent === "wellness or comfort products");
  const petCategory = normalizePetCategory(petType, input.lifeStage);
  const isDogCatLane = petCategory === "dog" || petCategory === "cat";
  const isReady =
    readinessLevel === "ready to review quote options" || userIntent === "ready to get a quote";

  const odie = getProviderBySlug(siteConfig.providerTrackingSlugs.odie) as Provider | undefined;
  const swiftest = getProviderBySlug(siteConfig.providerTrackingSlugs.theSwiftest) as Provider | undefined;
  const moodifypet = supplementalPartners.find(
    (partner) => partner.slug === siteConfig.supplementalTrackingSlugs.moodifypet
  );

  const matchingLiveProviders: Array<Provider | PartnerOffer> = [];
  const pendingHelpfulProviders = providers
    .filter((provider) => !isProviderAffiliateConfigured(provider))
    .filter((provider) => providerFitsIntent(provider, petCategory, userIntent, wantsComparison));

  const educationalFallback = getEducationalFallback(petType, userIntent);
  const recommendedInternalPage = getRecommendedInternalPage(petType, userIntent, wantsWellnessExtras);

  if (wantsWellnessExtras) {
    if (moodifypet && isProviderAffiliateConfigured(moodifypet)) {
      matchingLiveProviders.push(moodifypet);
      return {
        primaryNextStep: {
          title: "Look at comfort and wellness extras",
          body:
            "Wellness products may support day-to-day comfort, but they are not pet insurance and are not a substitute for veterinary care.",
          href: getAffiliateRedirectHref(moodifypet.slug),
          cta: "View wellness extras",
          kind: "affiliate",
          partnerSlug: moodifypet.slug
        },
        matchingLiveProviders,
        pendingHelpfulProviders,
        educationalFallback,
        recommendedInternalPage,
        disclosureNeeded: true,
        methodologyNote
      };
    }
  }

  if (!isDogCatLane && petType === "other") {
    return {
      primaryNextStep: {
        title: "Start with eligibility questions",
        body:
          "Many pet insurance providers focus on dogs and cats. For another pet type, start by verifying species eligibility, exclusions, and whether a licensed provider offers coverage in your state.",
        href: "/other-pet-insurance-options",
        cta: "Review other-pet checklist",
        kind: "education"
      },
      matchingLiveProviders,
      pendingHelpfulProviders,
      educationalFallback,
      recommendedInternalPage: "/other-pet-insurance-options",
      disclosureNeeded: false,
      methodologyNote
    };
  }

  if (wantsComparison && swiftest && isProviderAffiliateConfigured(swiftest)) {
    matchingLiveProviders.push(swiftest);
    return {
      primaryNextStep: {
        title: "Compare multiple quote options",
        body:
          "A comparison flow can help when you want to review several quote options before deciding which provider details to inspect.",
        href: getAffiliateRedirectHref(swiftest.slug),
        cta: "Compare quote options",
        kind: "affiliate",
        partnerSlug: swiftest.slug
      },
      matchingLiveProviders,
      pendingHelpfulProviders,
      educationalFallback,
      recommendedInternalPage,
      disclosureNeeded: true,
      methodologyNote
    };
  }

  if (odie && isDogCatLane && isProviderAffiliateConfigured(odie) && (isReady || isInsuranceIntent(userIntent))) {
    matchingLiveProviders.push(odie);
    return {
      primaryNextStep: {
        title: "Review a live provider quote option",
        body:
          "Odie is the current live PawPeaceGuide insurance affiliate path for dog and cat shoppers. Confirm coverage, pricing, eligibility, reimbursement, exclusions, and waiting periods directly with Odie.",
        href: getAffiliateRedirectHref(odie.slug),
        cta: "Review Odie quote options",
        kind: "affiliate",
        partnerSlug: odie.slug
      },
      matchingLiveProviders,
      pendingHelpfulProviders,
      educationalFallback,
      recommendedInternalPage,
      disclosureNeeded: true,
      methodologyNote
    };
  }

  if (wantsComparison && odie && isDogCatLane && isProviderAffiliateConfigured(odie)) {
    matchingLiveProviders.push(odie);
    return {
      primaryNextStep: {
        title: "Comparison partners are pending; one live option is available",
        body:
          "Broader comparison partners are still pending. You can use the checklist first, or review Odie as the current live direct-provider option if that fits your dog or cat shopping goal.",
        href: "/ready-to-compare",
        cta: "Use comparison checklist",
        kind: "internal"
      },
      matchingLiveProviders,
      pendingHelpfulProviders,
      educationalFallback,
      recommendedInternalPage: "/ready-to-compare",
      disclosureNeeded: false,
      methodologyNote
    };
  }

  return {
    primaryNextStep: educationalFallback,
    matchingLiveProviders,
    pendingHelpfulProviders,
    educationalFallback,
    recommendedInternalPage,
    disclosureNeeded: false,
    methodologyNote
  };
}

export function normalizePetCategory(
  petType: PetType,
  lifeStage: IntentRoutingInput["lifeStage"] = "unknown"
) {
  if (petType === "puppy" || lifeStage === "puppy") return "dog";
  if (petType === "kitten" || lifeStage === "kitten") return "cat";
  if (petType === "dog" || petType === "cat") return petType;
  return petType;
}

function isInsuranceIntent(intent: UserIntent) {
  return [
    "dog insurance",
    "cat insurance",
    "puppy insurance",
    "kitten insurance",
    "senior pet planning",
    "ready to get a quote",
    "emergency vet bill planning",
    "waiting periods / pre-existing condition concerns",
    "dental coverage questions",
    "direct vet pay interest"
  ].includes(intent);
}

function providerFitsIntent(
  provider: Provider,
  petCategory: ReturnType<typeof normalizePetCategory>,
  intent: UserIntent,
  wantsComparison: boolean
) {
  const petFits =
    petCategory === "senior pet" ||
    petCategory === "unknown" ||
    provider.supportedPetTypes.includes(petCategory) ||
    provider.supportedPetTypes.includes("unknown");

  if (!petFits) return false;
  if (wantsComparison) return provider.partnerType === "comparison";
  if (intent === "direct vet pay interest") return provider.slug === siteConfig.providerTrackingSlugs.trupanion;
  if (intent === "dental coverage questions") return provider.slug === siteConfig.providerTrackingSlugs.fetch;
  return provider.partnerType === "insurance" || provider.partnerType === "comparison";
}

function getRecommendedInternalPage(
  petType: PetType,
  intent: UserIntent,
  wantsWellnessExtras: boolean
) {
  if (wantsWellnessExtras) return "/pet-wellness-extras";
  if (petType === "dog") return "/dog-insurance-options";
  if (petType === "cat") return "/cat-insurance-options";
  if (petType === "puppy") return "/puppy-insurance-options";
  if (petType === "kitten") return "/kitten-insurance-options";
  if (petType === "senior pet" || intent === "senior pet planning") return "/senior-pet-insurance";
  if (petType === "other" || intent === "other pet type") return "/other-pet-insurance-options";
  if (intent === "understand costs first") return "/calculator";
  if (intent === "emergency vet bill planning") return "/emergency-vet-bill-planning";
  return "/find-my-path";
}

function getEducationalFallback(petType: PetType, intent: UserIntent): IntentNextStep {
  if (intent === "understand costs first") {
    return {
      title: "Understand the cost tradeoff first",
      body:
        "Use the calculator to compare premium, deductible, reimbursement rate, annual limit, and a hypothetical vet bill before choosing a provider page.",
      href: "/calculator",
      cta: "Use calculator",
      kind: "internal"
    };
  }

  if (intent === "emergency vet bill planning") {
    return {
      title: "Plan for emergency bills calmly",
      body:
        "Start with the emergency planning guide, then decide whether a quote page, calculator, or checklist is the right next step.",
      href: "/emergency-vet-bill-planning",
      cta: "Review emergency planning",
      kind: "education"
    };
  }

  if (petType === "other" || intent === "other pet type") {
    return {
      title: "Verify eligibility before comparing",
      body:
        "For pets other than dogs or cats, begin with species eligibility questions. PawPeaceGuide will not route you to a dog/cat provider as if it fits.",
      href: "/other-pet-insurance-options",
      cta: "Review other-pet checklist",
      kind: "education"
    };
  }

  return {
    title: "Compare at your own pace",
    body:
      "Use the 60-second check or quote-ready checklist to understand the major policy moving parts before visiting any provider site.",
    href: "/quiz",
    cta: "Start the 60-second check",
    kind: "internal"
  };
}
