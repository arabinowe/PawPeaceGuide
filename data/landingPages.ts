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
    question: "Should I compare before my pet is sick or injured?",
    answer:
      "Many pet owners prefer to compare while their pet is healthy because pre-existing condition rules, waiting periods, and enrollment timing can matter."
  }
];

export const landingPages: LandingPageVariant[] = [
  {
    slug: "pet-insurance",
    title: "Pet Insurance Guide | PawPeaceGuide",
    description:
      "Know before you need it with plain-English pet insurance guidance for coverage features, costs, exclusions, and quote options.",
    eyebrow: "Pet insurance education",
    headline: "Know before you need it.",
    subheadline:
      "Pet insurance is easier to compare before there is a vet bill in front of you. PawPeaceGuide helps pet owners understand coverage features, costs, exclusions, and quote options before continuing to The Swiftest or another third-party quote option.",
    primaryCta: "Start the 60-second pet insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for pet owners who want practical context before clicking into a licensed provider quote page.",
    compareReasonTitle: "Why pet owners compare insurance before something goes wrong",
    compareReasons: [
      "Emergency care can force fast financial decisions when emotions are already high.",
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
    slug: "dog-parent-protection",
    title: "Dog Parent Protection Guide | PawPeaceGuide",
    description:
      "A mobile-first dog insurance education page for Instagram ad traffic and quote option comparison.",
    eyebrow: "Dog owner guide",
    headline: "Know before you need it.",
    subheadline:
      "Pet insurance is easier to compare before there is a vet bill in front of you. PawPeaceGuide helps dog owners understand coverage features, costs, exclusions, and quote options before continuing to The Swiftest's third-party comparison flow.",
    primaryCta: "Start the 60-second pet insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "Built for dog owners coming from paid social who want plain-English guidance before visiting third-party quote pages.",
    compareReasonTitle: "Why dog owners compare before something goes wrong",
    compareReasons: [
      "Emergency care can force fast financial decisions when emotions are already high.",
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
      "Designed for dog owners weighing monthly premiums against possible emergency vet bills.",
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
      "Built for cat owners who want to understand the fine print before a stressful vet visit.",
    compareReasonTitle: "Why cat owners compare before the surprise bill",
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
    headline: "New puppy, new budget questions.",
    subheadline:
      "Compare what deductibles, reimbursement, wellness add-ons, and waiting periods can mean before choosing where to quote.",
    primaryCta: "Start the puppy insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "A quick guide for new puppy owners planning for accidents, illnesses, and early-life vet costs.",
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
    headline: "Plan for kitten care before the urgent decision.",
    subheadline:
      "Learn the features to compare before you visit licensed third-party pet insurance quote pages.",
    primaryCta: "Start the kitten insurance check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "A focused flow for new kitten owners thinking through emergency funds, wellness care, and illness coverage.",
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
      "Use a simple pet insurance education flow and calculator to think through emergency vet bill risk.",
    eyebrow: "Emergency vet bill planning",
    headline: "A surprise vet bill is easier to face with a plan.",
    subheadline:
      "Use a quick quiz and cost calculator to understand the tradeoffs before you compare third-party quote options.",
    primaryCta: "Start the emergency bill check",
    secondaryCta: "Use the cost calculator",
    audienceNote:
      "For pet owners who want a practical plan before an urgent clinic visit turns into a financial scramble.",
    compareReasonTitle: "Why emergency planning matters",
    compareReasons: [
      "Emergency visits can include exam fees, diagnostics, treatment, and hospitalization.",
      "Insurance is generally designed for future eligible events, not bills that have already happened.",
      "Emergency funds and insurance can work together, but they solve different problems."
    ],
    helpWith: [
      "Eligible future accidents and illnesses after waiting periods",
      "A portion of covered costs after deductible and reimbursement rules",
      "Reducing the size of some future out-of-pocket surprises"
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
      "Learn how pet insurance quote options, savings, and emergency planning can fit together.",
    eyebrow: "Vet bill help guide",
    headline: "Sort your vet bill options before pressure takes over.",
    subheadline:
      "Understand where pet insurance may help with future costs and why direct provider details matter.",
    primaryCta: "Start the vet bill planning check",
    secondaryCta: "Compare quote options",
    audienceNote:
      "A practical guide for pet owners thinking through premiums, deductibles, reimbursement, and emergency savings.",
    compareReasonTitle: "Why planning beats panic",
    compareReasons: [
      "Pet insurance generally does not erase every cost or cover every situation.",
      "A policy's deductible, reimbursement rate, and limits can change the value of a claim.",
      "Comparing before a problem can give you more time to review exclusions and waiting periods."
    ],
    helpWith: [
      "Eligible future accidents and illnesses",
      "Part of covered vet bills after deductible and reimbursement terms",
      "Budget planning when paired with an emergency fund"
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
