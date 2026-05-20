"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { ProviderCard } from "@/components/ProviderCard";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { getPrimaryProvider, isProviderAffiliateConfigured } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { routeIntent } from "@/lib/intentRouting";
import { trackFunnelEvent } from "@/lib/tracking";
import type { PetType, Provider, UserIntent } from "@/lib/types";

type QuizAnswers = {
  petType: string;
  decisionPriority: string;
  ageRange: string;
  breed: string;
  lifestyle: string;
  existingConditions: string;
  budget: string;
  emergencyFund: string;
  riskTolerance: string;
};

type QuizStep = {
  key: keyof QuizAnswers;
  question: string;
  help: string;
  options?: string[];
  placeholder?: string;
};

const steps: QuizStep[] = [
  {
    key: "petType",
    question: "What type of pet are you shopping for?",
    help: "This only shapes the education summary on this page.",
    options: ["Dog", "Cat", "Other pet"]
  },
  {
    key: "decisionPriority",
    question: "What do you most want help deciding?",
    help: "This helps PawPeaceGuide choose the most useful next step without forcing a provider.",
    options: [
      "One quote option to review now",
      "Compare several providers",
      "Understand costs first",
      "Waiting periods or pre-existing condition rules",
      "Dental, exam fee, or direct-pay details",
      "Wellness or comfort support"
    ]
  },
  {
    key: "ageRange",
    question: "How old is your pet?",
    help: "Age can affect available quote options and underwriting rules.",
    options: ["Under 1", "1-3", "4-7", "8+"]
  },
  {
    key: "breed",
    question: "Breed or mixed/unknown",
    help: "Keep this broad. You will verify details directly on provider quote pages.",
    placeholder: "Mixed, unknown, Labrador, domestic shorthair..."
  },
  {
    key: "lifestyle",
    question: "What best describes your pet's lifestyle?",
    help: "Lifestyle can help you think through accident exposure.",
    options: ["Mostly indoor", "Indoor and outdoor", "Mostly outdoor"]
  },
  {
    key: "existingConditions",
    question: "Do you want help understanding pre-existing condition rules?",
    help: "Do not enter health details here. Provider policy wording controls how these rules work.",
    options: ["I want to understand them", "Not a priority yet", "Not sure"]
  },
  {
    key: "budget",
    question: "Which cost setting do you want to compare first?",
    help: "This is educational only. PawPeaceGuide does not ask for income, bank, card, or payment details.",
    options: ["Monthly premium", "Deductible", "Reimbursement and limits"]
  },
  {
    key: "emergencyFund",
    question: "Which planning example would be most useful?",
    help: "Use a general example, not personal financial details.",
    options: ["Hypothetical vet bill math", "Premium vs deductible tradeoff", "Annual limit examples", "Not sure"]
  },
  {
    key: "riskTolerance",
    question: "How detailed should your next step be?",
    help: "This helps shape the education path without collecting sensitive information.",
    options: ["Simple overview", "Balanced comparison", "Detailed checklist"]
  }
];

const emptyAnswers: QuizAnswers = {
  petType: "",
  decisionPriority: "",
  ageRange: "",
  breed: "",
  lifestyle: "",
  existingConditions: "",
  budget: "",
  emergencyFund: "",
  riskTolerance: ""
};

export function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const primaryProvider = getPrimaryProvider();

  const step = steps[stepIndex];
  const progress = completed ? 100 : Math.round(((stepIndex + 1) / steps.length) * 100);
  const currentValue = answers[step.key];

  useEffect(() => {
    trackFunnelEvent(siteConfig.eventNames.quizStarted, { page: "/quiz" });
  }, []);

  const shoppingProfile = useMemo(() => {
    const petLabel = answers.petType ? answers.petType.toLowerCase() : "pet";
    const budgetPhrase =
      answers.budget === "Monthly premium"
        ? "You may want to compare premium alongside deductible, reimbursement, and annual limit."
        : answers.budget === "Deductible"
          ? "You may want to focus on how deductible choices change quote-page math."
          : "You may want to compare reimbursement rates and annual limits carefully.";

    const conditionPhrase =
      answers.existingConditions === "I want to understand them" || answers.existingConditions === "Not sure"
        ? "Ask providers how they define pre-existing conditions and whether medical records affect eligibility."
        : "Even without known conditions, waiting periods and exclusions are still important to review.";

    const priorityPhrase = answers.decisionPriority
      ? `Your main decision lens is: ${answers.decisionPriority.toLowerCase()}.`
      : "Your main decision lens is still open.";

    return `For your ${petLabel}, ${budgetPhrase} ${conditionPhrase} ${priorityPhrase}`;
  }, [answers]);

  const handoffFocus = useMemo(() => {
    const isYoung = answers.ageRange === "Under 1";
    const petLabel =
      answers.petType === "Dog"
        ? isYoung
          ? "puppy"
          : "dog"
        : answers.petType === "Cat"
          ? isYoung
            ? "kitten"
            : "cat"
          : "pet";
    const breedLabel = answers.breed.trim() ? answers.breed.trim() : "mixed or unknown breed";

    return {
      petLabel,
      breedLabel,
      summary:
        answers.petType === "Other pet"
          ? "Start with species eligibility before reviewing any provider quote page. Many pet insurance providers focus on dogs and cats."
          : answers.decisionPriority === "Compare several providers"
            ? "Use the comparison checklist first, then review the live provider path only if a direct-provider quote option fits your goal today."
            : answers.decisionPriority === "Understand costs first"
              ? "Use the calculator before leaving PawPeaceGuide, then review provider quote details with the deductible, reimbursement, and annual limit tradeoffs in view."
              : answers.decisionPriority === "Waiting periods or pre-existing condition rules"
                ? "Bring waiting-period, exclusion, and pre-existing-condition questions to the provider page before relying on any quote."
                : answers.decisionPriority === "Dental, exam fee, or direct-pay details"
                  ? "Use provider pages to verify dental wording, exam fee treatment, claim payment flow, and any direct-pay availability before deciding."
                  : answers.decisionPriority === "Wellness or comfort support"
                    ? "Separate wellness products, routine care add-ons, and accident/illness insurance before deciding what fits the need."
          : `Use ${primaryProvider.name}'s provider page to review quote-page details for a ${petLabel}. ` +
            `Keep ${breedLabel}, age range, deductible comfort, reimbursement rate, annual benefit, waiting periods, and exclusions in view.`
    };
  }, [answers.ageRange, answers.breed, answers.decisionPriority, answers.petType, primaryProvider.name]);

  const routingResult = useMemo(() => {
    const petType = toPetType(answers.petType, answers.ageRange);
    const userIntent = getUserIntentFromAnswers(answers.decisionPriority, petType);
    return routeIntent({
      petType,
      lifeStage: answers.ageRange === "Under 1" ? (answers.petType === "Cat" ? "kitten" : "puppy") : "unknown",
      userIntent,
      readinessLevel:
        answers.decisionPriority === "One quote option to review now"
          ? "ready to review quote options"
          : "comparing soon",
      wantsComparison: answers.decisionPriority === "Compare several providers",
      wantsWellnessExtras: answers.decisionPriority === "Wellness or comfort support"
    });
  }, [answers.ageRange, answers.decisionPriority, answers.petType]);

  const isOtherPet = answers.petType === "Other pet";
  const directInsurancePriorities = [
    "",
    "One quote option to review now",
    "Waiting periods or pre-existing condition rules",
    "Dental, exam fee, or direct-pay details"
  ];
  const showInsuranceHandoff =
    completed && !isOtherPet && directInsurancePriorities.includes(answers.decisionPriority);

  function setAnswer(value: string) {
    setAnswers((current) => ({ ...current, [step.key]: value }));
  }

  function goNext() {
    trackFunnelEvent(siteConfig.eventNames.quizStepCompleted, { step: stepIndex + 1 });
    if (stepIndex === steps.length - 1) {
      setCompleted(true);
      trackFunnelEvent(siteConfig.eventNames.quizCompleted, { page: "/quiz" });
      return;
    }
    setStepIndex((current) => current + 1);
  }

  if (completed) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Quiz result</p>
              <h1 className="mt-3 text-4xl font-semibold text-ink">Your pet insurance shopping profile</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{shoppingProfile}</p>
              <div className="mt-6">
                <DisclosureBanner compact />
              </div>
            </div>
            <PetImagePanel
              image={answers.petType === "Cat" ? petImages.catHome : petImages.dogOwner}
              label={`${handoffFocus.petLabel} comparison prep`}
              aspectClass="aspect-[16/9] lg:aspect-[4/3]"
              unframed
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-md border border-line bg-white p-5 shadow-tight">
            <h2 className="text-2xl font-semibold text-ink">Features to compare</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Annual deductible and whether it resets each policy year",
                "Reimbursement rate and how eligible costs are calculated",
                "Annual coverage limit and any per-condition limits",
                "Waiting periods for accidents, illnesses, orthopedic issues, or other categories",
                "Pre-existing condition rules and medical record review",
                "Wellness add-ons versus accident and illness coverage"
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-line bg-white p-5 shadow-tight">
            <h2 className="text-2xl font-semibold text-ink">Questions to ask providers</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              <li>How does the provider define pre-existing conditions?</li>
              <li>What waiting periods apply before coverage may begin?</li>
              <li>Are exam fees, prescriptions, diagnostics, and specialist care handled separately?</li>
              <li>How are claims submitted, reviewed, reimbursed, and limited?</li>
              <li>Can sample policy terms be reviewed before purchase?</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-md border border-line bg-mist p-5">
          <h2 className="text-2xl font-semibold text-ink">Your next useful step</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {isOtherPet
              ? "Many pet insurance providers focus on dogs and cats. Use this result to verify species eligibility, product type, exclusions, and provider availability before comparing price."
              : "Quote options can vary by pet age, breed, location, deductible, reimbursement rate, annual limit, wellness add-ons, underwriting rules, and provider availability. PawPeaceGuide does not recommend a specific provider from your answers, and your quiz answers stay in this browser session."}
          </p>
          <div className="mt-5 rounded-md border border-line bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay">
              Your comparison focus
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{handoffFocus.summary}</p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href={routingResult.primaryNextStep.href} className="w-full sm:w-auto">
              {routingResult.primaryNextStep.cta}
            </Button>
            <Button href="/calculator" variant="secondary" className="w-full sm:w-auto">
              Use the cost calculator
            </Button>
          </div>
          {routingResult.disclosureNeeded ? (
            <div className="mt-4">
              <DisclosureBanner compact />
            </div>
          ) : null}
        </div>

        {showInsuranceHandoff ? (
          <QuoteReadinessChecklist pageSource="/quiz-result-quote-ready" compact className="mt-8" />
        ) : null}

        {showInsuranceHandoff && routingResult.matchingLiveProviders.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-ink">Matched live path</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              This appears to fit your pet type and shopping goal. Review all details directly with
              the provider before buying.
            </p>
            <div className="mt-4 grid gap-5 lg:grid-cols-2">
              {routingResult.matchingLiveProviders
                .filter((partner): partner is Provider => partner.role !== "supplemental" && isProviderAffiliateConfigured(partner))
                .map((provider) => (
                  <ProviderCard key={provider.slug} provider={provider} compact emphasized pageSource="/quiz-result-primary" />
                ))}
            </div>
          </div>
        ) : null}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-ink">Other helpful options</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {isOtherPet
              ? "For pets other than dogs or cats, start with eligibility and product-type questions before reviewing any provider quote page."
              : "Pending partners and educational tools can still help you compare at your own pace. Pending partner links are not live clickouts yet."}
          </p>
          {isOtherPet ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button href="/other-pet-insurance-options" variant="secondary">
                Review other-pet checklist
              </Button>
              <Button href="/glossary" variant="secondary">
                Learn policy terms
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              <ProviderComparisonGrid compact role="backup" limit={4} pageSource="/quiz-result-backup" />
            </div>
          )}
        </div>
        <div className="mt-8">
          <EmailCaptureForm />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-6 md:px-5 md:py-10">
      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
        <div className="grid gap-4 md:grid-cols-[1fr_170px] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay md:text-sm">
              60-second pet insurance check
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-ink md:mt-3 md:text-4xl">{step.question}</h1>
            <p className="mt-2 text-sm leading-6 text-muted md:text-base md:leading-7">{step.help}</p>

            <div className="mt-4" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
              <div className="flex items-center justify-between text-xs font-semibold text-muted">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-mist">
                <div className="h-2 rounded-full bg-pine transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <PetImagePanel
              image={petImages.puppy}
              label="Quick dog and cat shopping profile"
              priority
              unframed
              aspectClass="aspect-square"
            />
          </div>
        </div>

        <div className="mt-5 md:mt-7">
          {step.options ? (
            <fieldset>
              <legend className="sr-only">{step.question}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {step.options.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-md border p-4 text-sm font-semibold transition ${
                      currentValue === option
                        ? "border-pine bg-sky/45 text-ink"
                        : "border-line bg-white text-muted hover:border-pine/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={step.key}
                      value={option}
                      checked={currentValue === option}
                      onChange={() => setAnswer(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <div>
              <label htmlFor={step.key} className="text-sm font-semibold text-ink">
                {step.question}
              </label>
              <input
                id={step.key}
                value={currentValue}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder={step.placeholder}
                className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-pine focus:ring-2 focus:ring-sky sm:text-sm"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-pine transition hover:bg-sky/35 disabled:cursor-not-allowed disabled:text-muted/50 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
          <button
            type="button"
            disabled={!currentValue.trim()}
            onClick={goNext}
            className="min-h-11 rounded-md bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c] disabled:cursor-not-allowed disabled:bg-muted/35"
          >
            {stepIndex === steps.length - 1 ? "See shopping profile" : "Continue"}
          </button>
        </div>
      </div>
    </section>
  );
}

function toPetType(petType: string, ageRange: string): PetType {
  if (petType === "Other pet") return "other";
  if (petType === "Cat") return ageRange === "Under 1" ? "kitten" : "cat";
  if (petType === "Dog") return ageRange === "Under 1" ? "puppy" : "dog";
  return "unknown";
}

function getUserIntentFromAnswers(decisionPriority: string, petType: PetType): UserIntent {
  if (petType === "other") return "other pet type";

  if (decisionPriority === "Compare several providers") return "compare multiple options";
  if (decisionPriority === "One quote option to review now") return "ready to get a quote";
  if (decisionPriority === "Understand costs first") return "understand costs first";
  if (decisionPriority === "Waiting periods or pre-existing condition rules") {
    return "waiting periods / pre-existing condition concerns";
  }
  if (decisionPriority === "Dental, exam fee, or direct-pay details") return "dental coverage questions";
  if (decisionPriority === "Wellness or comfort support") return "wellness or comfort products";

  if (petType === "cat") return "cat insurance";
  if (petType === "kitten") return "kitten insurance";
  if (petType === "puppy") return "puppy insurance";
  return "dog insurance";
}
