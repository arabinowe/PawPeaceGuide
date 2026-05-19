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
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Compare Pet Insurance Quote Options",
  description:
    "Compare pet insurance quote options, provider features, deductibles, reimbursement rates, limits, exclusions, and waiting periods.",
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
    body: "Provider definitions vary. Ask how symptoms and medical records are reviewed before relying on coverage."
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
  return (
    <>
      <ComparePageTracker />
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <DisclosureBanner />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Primary partner path</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">
              Start with The Swiftest comparison flow
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              PawPeaceGuide prepares pet owners to leave for The Swiftest, a third-party
              pet insurance comparison destination. PawPeaceGuide does not sell, solicit,
              bind, underwrite, negotiate, or directly offer insurance.
            </p>
          </div>
          <div className="rounded-md border border-line bg-white p-5 shadow-tight">
            <p className="text-sm font-semibold text-ink">What to review before clicking out</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              The Swiftest may show provider comparison details such as plan cost assumptions,
              reimbursement amount, annual benefit, provider notes, and SwiftScore context. Treat
              those as starting points, then verify policy terms directly.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button href="/quiz" variant="secondary">
                Take quiz
              </Button>
              <Button href="/calculator" variant="secondary">
                Use calculator
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={FileSearch}
            title="Arrive ready to scan"
            body="Use PawPeaceGuide to understand the insurance terms you are likely to see on a comparison page before leaving for The Swiftest."
          />
          <FeatureCard
            icon={Percent}
            title="Compare beyond premium"
            body="Monthly price is only one input. Reimbursement, deductible, annual benefit, waiting periods, and exclusions can change the real tradeoff."
          />
          <FeatureCard
            icon={Gauge}
            title="Verify every detail"
            body="The Swiftest and its provider partners control their quote flow, rankings, eligibility, and policy terms. Review details directly before applying."
          />
        </div>

        <div className="mt-8 rounded-md border border-line bg-mist p-5 md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Animal paths
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Designed for dog and cat shoppers</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            The public Swiftest pet insurance comparison content is built around dog and cat
            insurance. PawPeaceGuide uses puppies and kittens as age-specific dog and cat paths,
            not as separate insurance products. If you are shopping for another animal, verify
            availability directly with providers before relying on any comparison page.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {animalFitCards.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Start with The Swiftest
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Primary pet insurance comparison option</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            For many pet owners, starting with a third-party comparison flow can be simpler than
            checking one insurer at a time. The Swiftest is the intended primary destination for
            this funnel after the education, quiz, or calculator step. PawPeaceGuide is
            affiliate-supported and may earn compensation if you visit a provider through our links
            and purchase a policy.
          </p>
          <div className="mt-6">
            <ProviderComparisonGrid
              role="primary"
              emphasizePrimary
              pageSource="/compare-primary"
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Backup options
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">Secondary provider options</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
              These backup cards preserve flexibility if the primary partner is not approved or if
              direct-provider quote options are worth comparing below the primary comparison path.
              Policy terms vary, so review details directly with each provider.
            </p>
          </div>
          <ProviderComparisonGrid role="backup" pageSource="/compare-backup" />
        </div>
      </section>

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
          primaryLabel="Take the quiz"
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
