import {
  BadgeDollarSign,
  CalendarClock,
  FileSearch,
  Gauge,
  HeartHandshake,
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

export default function ComparePage() {
  return (
    <>
      <ComparePageTracker />
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <DisclosureBanner />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Quote options</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">
              Compare pet insurance quote options
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              Review policy features, questions to ask, and third-party provider quote pages. PawPeaceGuide does not sell or bind insurance.
            </p>
          </div>
          <div className="rounded-md border border-line bg-white p-5 shadow-tight">
            <p className="text-sm font-semibold text-ink">What users should compare</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Do not compare on monthly premium alone. Deductibles, reimbursement rates, annual limits,
              waiting periods, exclusions, and claim rules can materially change the real out-of-pocket result.
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

        <div className="mt-8 rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Start with the comparison option
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Primary comparison option</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            For many pet owners, starting with a comparison flow can be simpler than checking one
            insurer at a time. PawPeaceGuide is affiliate-supported and may earn compensation if
            you visit a provider through our links and purchase a policy.
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
