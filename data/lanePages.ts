import type { PetType, UserIntent } from "@/lib/types";

export type LanePageConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  petType: PetType;
  userIntent: UserIntent;
  readinessPrompt: string;
  calmPoints: string[];
  verifyItems: string[];
  primaryInternalHref: string;
  primaryInternalLabel: string;
};

export const lanePages: LanePageConfig[] = [
  {
    slug: "dog-insurance-options",
    title: "Dog insurance options without the pressure",
    metaTitle: "Dog Insurance Options",
    metaDescription:
      "A calm guide to dog insurance quote options, what to verify, and when a live provider path may fit.",
    eyebrow: "Dog insurance lane",
    intro:
      "Start with the basics: your dog's age, breed context, deductible comfort, reimbursement rate, annual limit, waiting periods, and exclusions. If you are ready for one live provider quote path, Odie is currently available through PawPeaceGuide.",
    petType: "dog",
    userIntent: "dog insurance",
    readinessPrompt: "Useful for dog owners who want to understand the terms before reviewing quote options.",
    calmPoints: [
      "You do not need to know every policy term before starting.",
      "Compare the few moving parts that drive most of the decision.",
      "Provider pages control pricing and policy terms, so verify directly."
    ],
    verifyItems: [
      "Breed and age eligibility",
      "Accident and illness waiting periods",
      "Deductible and reimbursement settings",
      "Annual limit and excluded charges",
      "Claims process and medical record review"
    ],
    primaryInternalHref: "/quiz",
    primaryInternalLabel: "Start the 60-second check"
  },
  {
    slug: "cat-insurance-options",
    title: "Cat insurance options in plain English",
    metaTitle: "Cat Insurance Options",
    metaDescription:
      "A calm guide to cat insurance quote options, indoor/outdoor lifestyle questions, exclusions, and live provider paths.",
    eyebrow: "Cat insurance lane",
    intro:
      "Cat insurance comparison can be calmer when you know what to scan: indoor/outdoor lifestyle, diagnostics, medication, dental limitations, waiting periods, and pre-existing condition rules.",
    petType: "cat",
    userIntent: "cat insurance",
    readinessPrompt: "Useful for cat owners comparing before an illness, injury, or diagnostic bill is in front of them.",
    calmPoints: [
      "Indoor cats can still face illness, dental, medication, and diagnostic costs.",
      "Outdoor or mixed-lifestyle cats may raise different accident questions.",
      "A live provider path can be useful once you know what to verify."
    ],
    verifyItems: [
      "Illness and accident waiting periods",
      "Dental illness or injury wording",
      "Medication and diagnostic rules",
      "Indoor/outdoor lifestyle assumptions",
      "Pre-existing condition definitions"
    ],
    primaryInternalHref: "/quiz",
    primaryInternalLabel: "Start the cat insurance check"
  },
  {
    slug: "puppy-insurance-options",
    title: "Puppy insurance options before the chaos",
    metaTitle: "Puppy Insurance Options",
    metaDescription:
      "A new-puppy guide to pet insurance options, waiting periods, wellness add-ons, age eligibility, and quote readiness.",
    eyebrow: "Puppy insurance lane",
    intro:
      "Puppies bring new routines and new budget questions. Compare early so waiting periods, wellness add-ons, swallowed-object scenarios, and future health history are easier to understand.",
    petType: "puppy",
    userIntent: "puppy insurance",
    readinessPrompt: "Useful for new dog owners who want to compare before health history gets complicated.",
    calmPoints: [
      "Routine puppy care and accident/illness coverage are different things.",
      "Age eligibility and waiting periods deserve an early look.",
      "You can review a live provider option after you know what questions to ask."
    ],
    verifyItems: [
      "Minimum enrollment age",
      "Accident and illness waiting periods",
      "Wellness add-ons for routine puppy care",
      "Hereditary and congenital condition language",
      "Exam fee and prescription treatment"
    ],
    primaryInternalHref: "/quiz",
    primaryInternalLabel: "Start the puppy check"
  },
  {
    slug: "kitten-insurance-options",
    title: "Kitten insurance options for a calmer start",
    metaTitle: "Kitten Insurance Options",
    metaDescription:
      "A kitten-owner guide to pet insurance options, wellness add-ons, waiting periods, and early quote comparison questions.",
    eyebrow: "Kitten insurance lane",
    intro:
      "Kitten owners can compare early while the questions are still manageable: routine care, accident and illness coverage, dental details, waiting periods, and future eligibility.",
    petType: "kitten",
    userIntent: "kitten insurance",
    readinessPrompt: "Useful for new cat owners preparing while there is room to compare.",
    calmPoints: [
      "Kitten wellness care is usually separate from accident and illness coverage.",
      "Waiting periods can matter before symptoms appear.",
      "Provider terms control what is available and eligible."
    ],
    verifyItems: [
      "Minimum enrollment age",
      "Routine care versus insurance coverage",
      "Dental and medication wording",
      "Illness waiting periods",
      "Pre-existing condition definitions"
    ],
    primaryInternalHref: "/quiz",
    primaryInternalLabel: "Start the kitten check"
  },
  {
    slug: "senior-pet-insurance",
    title: "Senior pet insurance planning without false promises",
    metaTitle: "Senior Pet Insurance Planning",
    metaDescription:
      "A careful guide for senior dog and cat insurance planning, health history, age eligibility, and realistic coverage questions.",
    eyebrow: "Senior pet planning",
    intro:
      "Senior pets deserve careful planning. The goal is to compare realistic future coverage, not assume existing symptoms or past diagnoses will be covered.",
    petType: "senior pet",
    userIntent: "senior pet planning",
    readinessPrompt: "Useful for owners of older dogs or cats who want clear questions before quote review.",
    calmPoints: [
      "Past health history may affect future claim expectations.",
      "Accident coverage may still be worth understanding even when some illness questions are complicated.",
      "Provider age limits and renewal rules should be verified directly."
    ],
    verifyItems: [
      "Enrollment age limits",
      "Medical record review process",
      "Pre-existing and chronic condition wording",
      "Renewal and premium change rules",
      "Accident versus illness tradeoffs"
    ],
    primaryInternalHref: "/quiz",
    primaryInternalLabel: "Start senior pet check"
  },
  {
    slug: "emergency-vet-bill-planning",
    title: "Emergency vet bill planning before decisions feel rushed",
    metaTitle: "Emergency Vet Bill Planning",
    metaDescription:
      "A calm guide to emergency vet bill planning, insurance tradeoffs, emergency funds, and quote-readiness questions.",
    eyebrow: "Emergency bill planning",
    intro:
      "Emergency planning is calmer before the emergency. Use this lane to understand premium, deductible, reimbursement, annual limit, and emergency fund tradeoffs.",
    petType: "unknown",
    userIntent: "emergency vet bill planning",
    readinessPrompt: "Useful for owners who want to reduce confusion before a bill requires a quick decision.",
    calmPoints: [
      "The calculator can help you compare rough scenarios without pressure.",
      "Insurance is not a guarantee, but it can be part of a planning conversation.",
      "A quote page is easier to scan after you know the key terms."
    ],
    verifyItems: [
      "Emergency visit eligibility",
      "Diagnostics, surgery, hospitalization, and medication rules",
      "Deductible and reimbursement math",
      "Annual limit and excluded charges",
      "Waiting periods before coverage may apply"
    ],
    primaryInternalHref: "/calculator",
    primaryInternalLabel: "Use calculator"
  },
  {
    slug: "pet-wellness-extras",
    title: "Pet wellness extras that are not insurance",
    metaTitle: "Pet Wellness Extras",
    metaDescription:
      "A clear guide to pet wellness and comfort products, how they differ from insurance, and where Moodifypet fits.",
    eyebrow: "Wellness extras",
    intro:
      "Wellness products may support day-to-day comfort, but they are not insurance, do not reimburse vet bills, and are not a substitute for veterinary care.",
    petType: "unknown",
    userIntent: "wellness or comfort products",
    readinessPrompt: "Useful for pet owners who want comfort extras after understanding insurance separately.",
    calmPoints: [
      "Keep wellness products separate from coverage decisions.",
      "Ask your veterinarian about health or behavior concerns.",
      "Use product affiliate links only when they fit your actual goal."
    ],
    verifyItems: [
      "Ingredients or product details",
      "Pet type and age suitability",
      "Any veterinarian guidance needed",
      "Return policy and subscription terms",
      "Marketing claims versus medical advice"
    ],
    primaryInternalHref: "/guides/pet-insurance-vs-wellness-plan",
    primaryInternalLabel: "Insurance vs wellness guide"
  },
  {
    slug: "other-pet-insurance-options",
    title: "Insurance options for pets other than dogs or cats",
    metaTitle: "Other Pet Insurance Options",
    metaDescription:
      "A careful guide for other-pet insurance questions, species eligibility, provider verification, and non-affiliate next steps.",
    eyebrow: "Other pet planning",
    intro:
      "Many pet insurance providers focus on dogs and cats. If you are planning for another animal, start by verifying species eligibility directly before comparing price or policy features.",
    petType: "other",
    userIntent: "other pet type",
    readinessPrompt: "Useful for owners who need an honest answer instead of being pushed to a dog/cat affiliate link.",
    calmPoints: [
      "PawPeaceGuide will not pretend dog/cat providers fit other pets.",
      "Eligibility comes before price comparison.",
      "A veterinarian or species-specific provider may be the better first conversation."
    ],
    verifyItems: [
      "Species eligibility",
      "State availability",
      "Whether the product is insurance, wellness, or a discount program",
      "Exclusions and waiting periods",
      "Specialist or exotic-animal care limitations"
    ],
    primaryInternalHref: "/find-my-path",
    primaryInternalLabel: "Find another path"
  }
];

export function getLanePage(slug: string) {
  return lanePages.find((page) => page.slug === slug);
}
