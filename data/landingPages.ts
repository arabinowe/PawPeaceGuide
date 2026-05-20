import type { LandingPageVariant } from "@/lib/types";

const sharedFaq = [
  {
    question: "Does PawPeaceGuide sell pet insurance?",
    answer:
      "No. PawPeaceGuide is an educational, affiliate-supported website. We help you understand features to compare, then link to third-party provider quote pages."
  },
  {
    question: "Can this site tell me the exact premium I will pay?",
    answer:
      "No. Exact pricing, coverage, exclusions, waiting periods, and availability come from licensed providers and can vary by pet, state, age, breed, and policy terms."
  },
  {
    question: "When should I start learning about pet insurance?",
    answer:
      "Many pet owners compare options while things are calm because pre-existing condition rules, waiting periods, and enrollment timing can matter."
  }
];

export const landingPages: LandingPageVariant[] = [
  {
    slug: "pet-insurance",
    title: "Pet Insurance Guide | PawPeaceGuide",
    description:
      "Plain-English pet insurance guidance for coverage features, costs, exclusions, and quote options.",
    eyebrow: "Pet insurance education",
    headline: "Understand pet insurance options at your own pace.",
    subheadline:
      "PawPeaceGuide helps pet owners understand coverage features, costs, exclusions, waiting periods, and quote options before visiting a third-party provider page.",
    primaryCta: "Find my pet insurance path",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for pet owners who want practical context before clicking into a licensed provider quote page.",
    compareReasonTitle: "Why pet owners compare insurance while things are calm",
    compareReasons: [
      "Pet insurance is easier to review when the main policy terms are familiar.",
      "Waiting periods and pre-existing condition rules can make timing important.",
      "Deductibles, reimbursement rates, annual limits, and exclusions can change the real out-of-pocket picture."
    ],
    helpWith: [
      "Unexpected accidents and illnesses, depending on the policy",
      "Diagnostics, surgery, hospitalization, and prescription medication in many accident and illness plans",
      "Optional wellness add-ons from some providers, when purchased separately"
    ],
    usuallyNotCovered: [
      "Pre-existing conditions, unless a provider has a specific exception",
      "Routine care unless a wellness add-on is included",
      "Costs outside the policy terms, annual limits, waiting periods, or exclusions"
    ],
    faq: sharedFaq
  },
  {
    slug: "pet-parent-protection",
    title: "Pet Parent Insurance Comparison Guide | PawPeaceGuide",
    description:
      "A paid-social education page for dog and cat owners preparing to compare pet insurance quote options before visiting a third-party provider.",
    eyebrow: "Dog and cat owner guide",
    headline: "Understand pet insurance options at your own pace.",
    subheadline:
      "PawPeaceGuide helps dog and cat owners learn the features to compare, including deductibles, reimbursement rates, annual limits, waiting periods, exclusions, and provider quote-page details.",
    primaryCta: "Find my pet insurance path",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for broad Facebook traffic from happy dog, cat, puppy, and kitten creative.",
    compareReasonTitle: "Why pet parents compare options while things are calm",
    compareReasons: [
      "Dogs and cats can have different accident, illness, diagnostic, medication, or surgery coverage considerations.",
      "A comparison flow can help you review quote options without opening every provider page first.",
      "Breed, age, location, deductible, reimbursement rate, annual benefit, waiting periods, and exclusions can all change the tradeoff."
    ],
    helpWith: [
      "Future eligible accidents and illnesses, depending on the policy",
      "Diagnostics, surgery, hospitalization, and prescription medication in many accident and illness plans",
      "Optional wellness add-ons from some providers, when purchased separately"
    ],
    usuallyNotCovered: [
      "Pre-existing conditions, unless a provider has a specific exception",
      "Routine care unless a wellness add-on is included",
      "Costs outside the policy terms, annual limits, waiting periods, or exclusions"
    ],
    faq: sharedFaq
  },
  {
    slug: "dog-parent-protection",
    title: "Dog Parent Protection Guide | PawPeaceGuide",
    description:
      "A mobile-first dog insurance education page for Instagram ad traffic and quote option comparison.",
    eyebrow: "Dog owner guide",
    headline: "Understand dog insurance options at your own pace.",
    subheadline:
      "PawPeaceGuide helps dog owners learn the features to compare, including deductibles, reimbursement rates, annual limits, waiting periods, exclusions, and provider quote-page details.",
    primaryCta: "Find my dog insurance path",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for dog owners coming from paid social who want plain-English guidance before visiting third-party quote pages.",
    compareReasonTitle: "Why dog owners compare options while things are calm",
    compareReasons: [
      "Pet insurance is easier to review when the main policy terms are familiar.",
      "A comparison flow can help you review multiple quote options before checking one provider at a time.",
      "Deductibles, reimbursement rates, annual limits, waiting periods, and exclusions can change the real out-of-pocket picture."
    ],
    helpWith: [
      "Unexpected accidents and illnesses, depending on the policy",
      "Diagnostics, surgery, hospitalization, and prescription medication in many accident and illness plans",
      "Optional wellness add-ons from some providers, when purchased separately"
    ],
    usuallyNotCovered: [
      "Pre-existing conditions, unless a provider has a specific exception",
      "Routine care unless a wellness add-on is included",
      "Costs outside the policy terms, annual limits, waiting periods, or exclusions"
    ],
    faq: sharedFaq
  },
  {
    slug: "start-60-second-check",
    title: "Start the 60-Second Pet Insurance Check | PawPeaceGuide",
    description:
      "A paid-social pre-sell page for dog owners ready to start PawPeaceGuide's 60-second pet insurance education check.",
    eyebrow: "60-second pet insurance check",
    headline: "Start the 60-second pet insurance check.",
    subheadline:
      "Understand your options and compare with more confidence. PawPeaceGuide helps dog owners prepare for a third-party provider flow in plain English.",
    primaryCta: "Start the 60-second pet insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for Facebook creative that directly asks dog owners to start the 60-second check.",
    compareReasonTitle: "Why the check starts before the quote page",
    compareReasons: [
      "A little context can help you review quote-page details instead of reacting only to monthly premium.",
      "Deductible, reimbursement rate, annual benefit, waiting periods, and exclusions all shape the real tradeoff.",
      "PawPeaceGuide keeps the education step separate from the third-party provider or comparison site."
    ],
    helpWith: [
      "Future eligible accidents and illnesses, depending on the policy",
      "Diagnostics, surgery, hospitalization, and prescription medication in many accident and illness plans",
      "Optional wellness add-ons from some providers, when purchased separately"
    ],
    usuallyNotCovered: [
      "Pre-existing conditions, unless a provider has a specific exception",
      "Routine care unless a wellness add-on is included",
      "Costs outside the policy terms, annual limits, waiting periods, or exclusions"
    ],
    faq: sharedFaq
  },
  {
    slug: "dog-insurance",
    title: "Dog Insurance Quote Options | PawPeaceGuide",
    description:
      "Learn what dog owners may want to compare before visiting pet insurance provider quote pages.",
    eyebrow: "Dog owner guide",
    headline: "Compare dog insurance quote options with fewer blind spots.",
    subheadline:
      "Use a quick education flow to understand deductibles, reimbursement rates, waiting periods, and exclusions before you visit provider sites.",
    primaryCta: "Start the dog insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Designed for dog owners comparing monthly premiums, deductibles, reimbursement, limits, and policy language.",
    compareReasonTitle: "Why dog owners compare coverage features early",
    compareReasons: [
      "Dogs can face sudden accident, illness, diagnostic, or surgery costs.",
      "Breed, age, location, and policy design can influence available quote options.",
      "A cheaper premium can come with higher deductibles, lower reimbursement, or tighter annual limits."
    ],
    helpWith: [
      "Accidents such as swallowed objects, injuries, or emergency visits",
      "Illness diagnostics and treatment when covered by the policy",
      "Specialist care, hospitalization, or prescription medication in many accident and illness plans"
    ],
    usuallyNotCovered: [
      "Conditions that began before coverage or during waiting periods",
      "Preventive care unless a wellness option is added",
      "Excluded breed-related, elective, or non-covered services"
    ],
    faq: sharedFaq
  },
  {
    slug: "cat-insurance",
    title: "Cat Insurance Quote Options | PawPeaceGuide",
    description:
      "A calm guide to comparing cat insurance quote options, exclusions, deductibles, and reimbursement choices.",
    eyebrow: "Cat owner guide",
    headline: "Make cat insurance comparisons less confusing.",
    subheadline:
      "See which policy features matter before you visit third-party quote pages for your cat.",
    primaryCta: "Start the cat insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for cat owners who want to understand the fine print at a comfortable pace.",
    compareReasonTitle: "Why cat owners compare while things are calm",
    compareReasons: [
      "Indoor cats and outdoor cats can have different risk patterns.",
      "Illness, diagnostics, dental issues, and medication costs can add up quickly.",
      "Waiting periods and exclusions can affect what is eligible for reimbursement."
    ],
    helpWith: [
      "Covered accidents and illnesses after waiting periods",
      "Diagnostics, hospitalization, or prescription medication in many plans",
      "Potential specialist care, depending on the provider and policy"
    ],
    usuallyNotCovered: [
      "Pre-existing conditions under most standard policy language",
      "Routine wellness services unless purchased as an add-on",
      "Services excluded by the policy or outside provider availability"
    ],
    faq: sharedFaq
  },
  {
    slug: "puppy-insurance",
    title: "Puppy Insurance Guide | PawPeaceGuide",
    description:
      "Understand puppy insurance quote options before comparing third-party provider pages.",
    eyebrow: "New puppy guide",
    headline: "New puppy, new coverage questions.",
    subheadline:
      "Compare what deductibles, reimbursement, wellness add-ons, and waiting periods can mean before choosing where to quote.",
    primaryCta: "Start the puppy insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "A quick guide for new puppy owners learning how accidents, illnesses, wellness add-ons, and early-life vet costs may be handled.",
    compareReasonTitle: "Why new puppy owners often compare early",
    compareReasons: [
      "Young pets may be easier to enroll before health history becomes complicated.",
      "Puppies can have accident-prone months while routines are still forming.",
      "Wellness add-ons and accident/illness policies serve different purposes."
    ],
    helpWith: [
      "Covered accidents after waiting periods",
      "Unexpected illness treatment if eligible under the policy",
      "Optional wellness support when a provider offers and you choose an add-on"
    ],
    usuallyNotCovered: [
      "Known conditions before coverage starts",
      "Routine puppy care unless an add-on applies",
      "Training, food, grooming, and elective services in most plans"
    ],
    faq: sharedFaq
  },
  {
    slug: "kitten-insurance",
    title: "Kitten Insurance Guide | PawPeaceGuide",
    description:
      "A plain-English guide for kitten owners comparing quote options, deductibles, and coverage tradeoffs.",
    eyebrow: "New kitten guide",
    headline: "Plan kitten coverage questions at a comfortable pace.",
    subheadline:
      "Learn the features to compare before you visit licensed third-party pet insurance quote pages.",
    primaryCta: "Start the kitten insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "A focused flow for new kitten owners thinking through wellness care, accident coverage, illness coverage, and provider quote details.",
    compareReasonTitle: "Why kitten owners compare while things are calm",
    compareReasons: [
      "Early enrollment can reduce confusion around future health history.",
      "Accidents and illness can happen before a household budget is ready.",
      "Routine care and insurance coverage are often separate decisions."
    ],
    helpWith: [
      "Eligible accidents and illnesses after waiting periods",
      "Diagnostics and treatment under covered policy terms",
      "Specialist or prescription costs in many accident and illness plans"
    ],
    usuallyNotCovered: [
      "Pre-existing conditions",
      "Routine kitten visits unless wellness add-ons are included",
      "Excluded elective or non-medical services"
    ],
    faq: sharedFaq
  },
  {
    slug: "emergency-vet-bills",
    title: "Emergency Vet Bill Planning | PawPeaceGuide",
    description:
      "Understand pet insurance quote options, calculator tradeoffs, and emergency vet bill planning in plain English.",
    eyebrow: "Vet cost planning",
    headline: "Understand emergency vet cost planning options.",
    subheadline:
      "Understand your options while you have room to think. PawPeaceGuide helps pet owners compare policy features, planning tradeoffs, and quote-page details in plain English.",
    primaryCta: "Start the 60-second check",
    secondaryCta: "Use the cost calculator",
    audienceNote:
      "Built for calm education about pet insurance, planning resources, and provider quote-page details.",
    compareReasonTitle: "Why emergency planning matters",
    compareReasons: [
      "Emergency visits can include exam fees, diagnostics, treatment, and hospitalization.",
      "Insurance is generally designed for future eligible events, not bills that have already happened.",
      "Emergency funds and insurance can work together, but they solve different problems."
    ],
    helpWith: [
      "Eligible future accidents and illnesses after waiting periods",
      "A portion of covered costs after deductible and reimbursement rules",
      "Reducing some future out-of-pocket costs when the policy terms apply"
    ],
    usuallyNotCovered: [
      "Bills from before coverage starts",
      "Conditions already present or excluded by the policy",
      "Costs above annual limits or outside the provider's policy terms"
    ],
    faq: sharedFaq
  },
  {
    slug: "vet-bill-help",
    title: "Vet Bill Help Planning | PawPeaceGuide",
    description:
      "Learn how pet insurance quote options and emergency planning can fit together.",
    eyebrow: "Vet bill options guide",
    headline: "Understand vet bill planning options in plain English.",
    subheadline:
      "Use a plain-English guide, quick quiz, and cost calculator to prepare better questions before comparing third-party quote options.",
    primaryCta: "Start the 60-second check",
    secondaryCta: "Use the cost calculator",
    audienceNote:
      "A practical guide for pet owners thinking through premiums, deductibles, reimbursement, and planning resources.",
    compareReasonTitle: "Why planning helps",
    compareReasons: [
      "Pet insurance generally does not erase every cost or cover every situation.",
      "A policy's deductible, reimbursement rate, and limits can change the value of a claim.",
      "Comparing before a problem can give you more time to review exclusions and waiting periods."
    ],
    helpWith: [
      "Eligible future accidents and illnesses",
      "Part of covered vet bills after deductible and reimbursement terms",
      "Planning examples when paired with other household resources"
    ],
    usuallyNotCovered: [
      "Already-known health issues unless a provider states otherwise",
      "Routine wellness unless added separately",
      "Any claim that does not meet the provider's policy terms"
    ],
    faq: sharedFaq
  }
];

export function getLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}
