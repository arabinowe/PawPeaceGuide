import {
  BadgeDollarSign,
  CalendarClock,
  Cat,
  Dog,
  FileSearch,
  Gauge,
  HeartHandshake,
  PawPrint,
  Percent,
  ShieldQuestion
} from "lucide-react";
import { Button } from "@/components/Button";
import { ComparePageTracker } from "@/components/PageEventTracker";
import { CTABlock } from "@/components/CTABlock";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { FeatureCard } from "@/components/FeatureCard";
import { InsuranceDecisionGuide } from "@/components/InsuranceDecisionGuide";
import { IntentPathRouter } from "@/components/IntentPathRouter";
import { MethodologyNote } from "@/components/MethodologyNote";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { getConfiguredBackupProviders, getPrimaryProvider } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Compare Pet Insurance Quote Options",
  description:
    "Compare pet insurance quote options, senior pet planning questions, value-focused provider features, deductibles, reimbursement rates, exclusions, and pre-existing condition rules.",
  path: "/compare"
});

const comparisonFeatures = [
  {
    icon: BadgeDollarSign,
    title: "Deductible",
    body: "The amount you pay before eligible reimbursement begins. Compare annual and per-condition structures directly."
  },
  {
    icon: Percent,
    title: "Reimbursement rate",
    body: "The percentage of eligible costs a policy may reimburse after deductible and policy rules."
  },
  {
    icon: Gauge,
    title: "Annual limit",
    body: "The maximum eligible reimbursement in a policy year. Limits can change the risk you keep."
  },
  {
    icon: FileSearch,
    title: "Exclusions",
    body: "Excluded conditions, services, fees, or treatments can make two similar quotes behave very differently."
  },
  {
    icon: CalendarClock,
    title: "Waiting periods",
    body: "Coverage may not begin immediately. Confirm accident, illness, orthopedic, and other waiting periods."
  },
  {
    icon: ShieldQuestion,
    title: "Pre-existing conditions",
    body: "Provider definitions vary. Ask how symptoms, diagnoses, medical records, curable-condition language, and waiting periods are reviewed before relying on coverage."
  },
  {
    icon: HeartHandshake,
    title: "Wellness add-ons",
    body: "Routine care is often separate from accident and illness coverage. Confirm what is included or optional."
  }
];

const animalFitCards = [
  {
    icon: Dog,
    title: "Dogs",
    body: "Compare breed, age, location, deductible, reimbursement, annual benefit, and accident/illness tradeoffs."
  },
  {
    icon: Cat,
    title: "Cats",
    body: "Review indoor/outdoor lifestyle, illness coverage, diagnostics, dental limitations, and medication rules."
  },
  {
    icon: PawPrint,
    title: "Puppies and kittens",
    body: "Look closely at enrollment age, waiting periods, wellness add-ons, and how future health history may be treated."
  }
];

export default function ComparePage() {
  const primaryProvider = getPrimaryProvider();
  const configuredBackupProvider = getConfiguredBackupProviders()[0];

  return (
    <>
      <ComparePageTracker />
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Provider learning path</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">
              The right next step depends on what you need.
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              PawPeaceGuide helps pet owners decide whether to learn more, estimate costs, compare
              multiple options, or review a live provider quote path. The current live insurance
              affiliate path is {primaryProvider.name}; pending partners are labeled clearly.
            </p>
            <div className="mt-5 max-w-2xl">
              <DisclosureBanner compact />
            </div>
          </div>
          <div className="grid gap-4">
            <PetImagePanel image={petImages.calmTrust} label="Dog and cat quote option prep" priority />
            <div className="rounded-md border border-line bg-white p-5 shadow-tight">
              <p className="text-sm font-semibold text-ink">What to review before clicking out</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {primaryProvider.name} may show plan details such as cost assumptions,
                deductible choices, reimbursement structure, annual benefit options, exclusions, and
                policy documents. Treat those as starting points, then verify policy terms directly.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button href="/quiz" variant="secondary">
                  Start the 60-second check
                </Button>
                <Button href="/calculator" variant="secondary">
                  Use calculator
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={FileSearch}
            title="Arrive ready to scan"
            body={`Use PawPeaceGuide to understand the insurance terms you are likely to see before leaving for ${primaryProvider.name}.`}
          />
          <FeatureCard
            icon={Percent}
            title="Compare beyond premium"
            body="Monthly price is only one input. Reimbursement, deductible, annual benefit, waiting periods, and exclusions can change the real tradeoff."
          />
          <FeatureCard
            icon={Gauge}
            title="Verify every detail"
            body={`${primaryProvider.name} controls its quote flow, eligibility, pricing, and policy terms. Review details directly before applying.`}
          />
        </div>

        <div className="mt-8 rounded-md border border-line bg-mist p-5 md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Value and transparency
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            A useful comparison answers more than the monthly cost question.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            Pet owners are increasingly comparing plans through a practical lens: senior-pet
            eligibility, medical-record review, waiting periods, exclusions, annual limits, and
            whether the deductible and reimbursement structure fit the household budget. That is
            the context PawPeaceGuide gives before any provider clickout.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={HeartHandshake}
              title="Senior pet questions"
              body="Ask about enrollment age, renewal rules, medical history, chronic conditions, and whether any age-specific limitations apply."
            />
            <FeatureCard
              icon={BadgeDollarSign}
              title="Value beyond price"
              body="A cheaper monthly premium can still shift risk through deductible, reimbursement rate, annual limit, exclusions, or claim rules."
            />
            <FeatureCard
              icon={ShieldQuestion}
              title="Pre-existing condition rules"
              body="Use provider pages to confirm definitions, medical-record review, waiting periods, and any exception language directly."
            />
          </div>
        </div>

        <IntentPathRouter pageSource="/compare-intent-router" className="mt-8" />

        <InsuranceDecisionGuide className="mt-8" />

        <div className="mt-8 rounded-md border border-line bg-mist p-5 md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Animal paths
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Designed for dog and cat shoppers</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            PawPeaceGuide uses puppies and kittens as age-specific dog and cat paths, not as
            separate insurance products. If you are shopping for another animal, verify
            availability directly with providers before relying on any quote page.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {animalFitCards.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Start with {primaryProvider.name}
          </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">Current primary pet insurance provider option</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            For dog and cat shoppers who are ready to review a live quote option, {primaryProvider.name}
            is the current approved destination for this funnel after the education, quiz, or
            calculator step. This placement reflects both fit and current link availability, not a
            claim that any provider is best, cheapest, or guaranteed.
          </p>
          <div className="mt-6">
            <ProviderComparisonGrid
              role="primary"
              emphasizePrimary
              pageSource="/compare-primary"
            />
          </div>
        </div>

        <QuoteReadinessChecklist pageSource="/compare-quote-ready" compact className="mt-8" />

        <div className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Backup options
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">Secondary provider options</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
              {configuredBackupProvider
                ? `${configuredBackupProvider.name} is also configured as a live direct-provider option. `
                : "These backup cards preserve flexibility as additional partner approvals arrive. "}
              Direct-provider and comparison options can be useful once approved. Until then, these
              cards are educational context and future routing slots, not live partner clickouts.
              Policy terms vary, so review details directly with each provider.
            </p>
          </div>
          <ProviderComparisonGrid role="backup" pageSource="/compare-backup" />
        </div>
      </section>

      <MethodologyNote className="mx-auto max-w-6xl px-5 pb-12" />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Feature comparison education
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Policy details to verify directly</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {comparisonFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[1fr_0.9fr]">
        <CTABlock
          eyebrow="Still comparing?"
          title="Use the quiz or calculator before leaving for provider sites."
          body="The quiz builds an educational shopping profile. The calculator shows rough claim math. Neither replaces provider policy review."
          primaryHref="/quiz"
          primaryLabel="Start the 60-second check"
          secondaryHref="/calculator"
          secondaryLabel="Use calculator"
        />
        <EmailCaptureForm />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <p className="rounded-md border border-line bg-mist px-4 py-3 text-sm leading-6 text-muted">
          {siteConfig.legalDisclaimer}
        </p>
      </section>
    </>
  );
}
