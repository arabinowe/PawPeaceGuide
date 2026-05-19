"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

type QuizAnswers = {
  petType: string;
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
    options: ["Dog", "Cat"]
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
    question: "Any existing conditions?",
    help: "Do not enter sensitive health details here. Provider rules control what counts as pre-existing.",
    options: ["Yes", "No", "Not sure"]
  },
  {
    key: "budget",
    question: "Monthly budget comfort",
    help: "Think about premium comfort, not exact quote pricing.",
    options: ["Low", "Medium", "High"]
  },
  {
    key: "emergencyFund",
    question: "Emergency fund available for vet bills",
    help: "This can influence deductible comfort and risk tolerance.",
    options: ["Under $500", "$500-$1500", "$1500-$5000", "$5000+"]
  },
  {
    key: "riskTolerance",
    question: "How much vet bill risk are you comfortable keeping?",
    help: "There is no perfect answer. This helps frame features to compare.",
    options: ["Low", "Medium", "High"]
  }
];

const emptyAnswers: QuizAnswers = {
  petType: "",
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

  const step = steps[stepIndex];
  const progress = completed ? 100 : Math.round(((stepIndex + 1) / steps.length) * 100);
  const currentValue = answers[step.key];

  useEffect(() => {
    trackFunnelEvent(siteConfig.eventNames.quizStarted, { page: "/quiz" });
  }, []);

  const shoppingProfile = useMemo(() => {
    const petLabel = answers.petType ? answers.petType.toLowerCase() : "pet";
    const budgetPhrase =
      answers.budget === "Low"
        ? "You may want to pay close attention to deductible and annual limit tradeoffs."
        : answers.budget === "High"
          ? "You may have more room to compare richer feature sets, but policy terms still matter."
          : "You may be balancing monthly premium comfort with emergency bill protection.";

    const conditionPhrase =
      answers.existingConditions === "Yes" || answers.existingConditions === "Not sure"
        ? "Ask providers how they define pre-existing conditions and whether medical records affect eligibility."
        : "Even without known conditions, waiting periods and exclusions are still important to review.";

    return `For your ${petLabel}, ${budgetPhrase} ${conditionPhrase}`;
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
        `Use The Swiftest's dog and cat comparison flow to review quote-page details for a ${petLabel}. ` +
        `Keep ${breedLabel}, age range, deductible comfort, reimbursement rate, annual benefit, waiting periods, and exclusions in view.`
    };
  }, [answers.ageRange, answers.breed, answers.petType]);

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
                <DisclosureBanner />
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
          <h2 className="text-2xl font-semibold text-ink">Ready for The Swiftest comparison flow</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Quote options can vary by pet age, breed, location, deductible, reimbursement rate,
            annual limit, wellness add-ons, underwriting rules, and provider availability. PawPeaceGuide
            does not recommend a specific provider from your answers, and your quiz answers stay in
            this browser session. Use this profile as a checklist when you review The Swiftest or
            any provider quote page.
          </p>
          <div className="mt-5 rounded-md border border-line bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay">
              Your comparison focus
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{handoffFocus.summary}</p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <PrimaryOfferButton pageSource="/quiz-result" showDevelopmentWarning className="w-full sm:w-auto">
              Continue to The Swiftest comparison
            </PrimaryOfferButton>
            <Button href="/calculator" variant="secondary" className="w-full sm:w-auto">
              Use the cost calculator
            </Button>
          </div>
        </div>

        <QuoteReadinessChecklist pageSource="/quiz-result-quote-ready" compact className="mt-8" />

        <div className="mt-8">
          <ProviderComparisonGrid compact role="primary" emphasizePrimary pageSource="/quiz-result-primary" />
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-ink">Backup provider options</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            These secondary options are available below the primary comparison path. Review policy
            details directly with each provider.
          </p>
          <div className="mt-4">
            <ProviderComparisonGrid compact role="backup" pageSource="/quiz-result-backup" />
          </div>
        </div>
        <div className="mt-8">
          <EmailCaptureForm />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
        <div className="mb-6">
          <PetImagePanel
            image={petImages.puppy}
            label="Quick dog and cat shopping profile"
            priority
            unframed
            aspectClass="aspect-[5/2] sm:aspect-[4/3]"
          />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
          60-second pet insurance check
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{step.question}</h1>
        <p className="mt-3 text-base leading-7 text-muted">{step.help}</p>

        <div className="mt-6" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
          <div className="flex items-center justify-between text-xs font-semibold text-muted">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-mist">
            <div className="h-2 rounded-full bg-pine transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-7">
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
