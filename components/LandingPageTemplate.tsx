import {
  Calculator,
  ClipboardCheck,
  FileText,
  HeartPulse,
  ListChecks,
  ShieldAlert,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/Button";
import { CTABlock } from "@/components/CTABlock";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureCard } from "@/components/FeatureCard";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { siteConfig } from "@/data/siteConfig";
import type { LandingPageVariant } from "@/lib/types";

export function LandingPageTemplate({ page }: { page: LandingPageVariant }) {
  const isPrimaryPaidPage = page.slug === "pet-insurance" || page.slug === "dog-parent-protection";

  return (
    <>
      <PageEventTracker page={`/${page.slug}`} paid />
      <section
        className="relative isolate overflow-hidden border-b border-line bg-ink"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(248,250,247,0.98) 0%, rgba(248,250,247,0.94) 43%, rgba(248,250,247,0.64) 66%, rgba(23,33,43,0.12) 100%), url('https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=80')",
          backgroundPosition: "center right",
          backgroundSize: "cover"
        }}
      >
        <div className="mx-auto min-h-[520px] max-w-6xl px-5 py-8 md:flex md:items-center md:py-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">{page.eyebrow}</p>
            {isPrimaryPaidPage ? (
              <h1 className="mt-4 max-w-2xl text-5xl font-black uppercase leading-none text-ink md:text-7xl">
                Know before <span className="block text-[#4d6538]">you need it.</span>
              </h1>
            ) : null}
            {!isPrimaryPaidPage ? (
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-normal text-ink md:text-6xl">
                {page.headline}
              </h1>
            ) : null}
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{page.subheadline}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/quiz">{page.primaryCta}</Button>
              <Button href="/compare" variant="secondary">
                {page.secondaryCta}
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{siteConfig.shortDisclosure}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-5 py-4 md:grid-cols-3">
          {[
            ["Plain-English guidance", "We break down insurance terms so the quote page makes more sense."],
            ["Compare quote options", "See features to review across provider sites."],
            ["Plan ahead", "Be ready before a surprise vet bill becomes a crisis."]
          ].map(([title, body]) => (
            <div key={title} className="flex gap-3 rounded-md bg-mist p-4">
              <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Why compare early</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">{page.compareReasonTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Pet insurance is easiest to evaluate before a stressful diagnosis or emergency invoice is in front of you.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {page.compareReasons.map((reason, index) => (
              <div key={reason} className="rounded-md border border-line bg-white p-5 shadow-tight">
                <p className="text-sm font-semibold text-clay">0{index + 1}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                Primary comparison path
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                One comparison flow can save you time
              </h2>
            </div>
            <div className="rounded-md border border-line bg-mist p-5">
              <p className="text-base leading-7 text-muted">
                Instead of opening a dozen tabs, start with a comparison option and learn what to
                look for: deductibles, reimbursement rates, annual limits, waiting periods,
                exclusions, and pre-existing condition rules.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                PawPeaceGuide does not sell insurance. PawPeaceGuide is an educational,
                affiliate-supported site that links to third-party providers and comparison tools.
              </p>
              <div className="mt-5">
                <PrimaryOfferButton pageSource={`/${page.slug}-comparison-section`}>
                  Compare quote options
                </PrimaryOfferButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={HeartPulse}
              title="What pet insurance may help with"
              body={page.helpWith.join(" ")}
            />
            <FeatureCard
              icon={ShieldAlert}
              title="What pet insurance usually does not cover"
              body={page.usuallyNotCovered.join(" ")}
            />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={Calculator}
              title="Deductibles"
              body="The amount you pay before eligible reimbursement begins. Higher deductibles can change monthly premium and claim math."
            />
            <FeatureCard
              icon={ListChecks}
              title="Reimbursement and limits"
              body="Reimbursement rates and annual limits influence how much of an eligible bill may still be your responsibility."
            />
            <FeatureCard
              icon={FileText}
              title="Waiting periods and exclusions"
              body="Coverage may not apply immediately, and policy wording controls what is eligible. Review details directly with the provider."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">How the funnel works</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Three calm steps before provider quote pages</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Answer a few pet and budget questions",
              "See features to compare",
              "Visit licensed provider quote pages"
            ].map((step, index) => (
              <div key={step} className="rounded-md bg-mist p-5">
                <ClipboardCheck className="h-5 w-5 text-pine" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-ink">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button href="/quiz">Start the 60-second pet insurance check</Button>
          </div>
        </div>
      </section>

      <section className="bg-mist py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Provider preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">Quote options to review</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                These are configurable placeholder cards. Replace them with approved affiliate providers and required disclosures after partner acceptance.
              </p>
            </div>
            <PrimaryOfferButton pageSource={`/${page.slug}-provider-preview`} variant="secondary">
              Compare quote options
            </PrimaryOfferButton>
          </div>
          <div className="mt-6">
            <ProviderComparisonGrid compact role="primary" emphasizePrimary pageSource={`/${page.slug}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[1fr_0.9fr]">
        <CTABlock
          eyebrow="Cost calculator"
          title="Preview how premium, deductible, and reimbursement can change the math."
          body="Use a simplified calculator to compare a hypothetical bill with and without insurance. It is educational only and does not predict claim approval."
          primaryHref="/calculator"
          primaryLabel="Use the cost calculator"
          secondaryHref="/compare"
          secondaryLabel="Compare quote options"
        />
        <EmailCaptureForm />
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Questions before you compare</h2>
          <div className="mt-6">
            <FAQAccordion items={page.faq} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 pb-28 md:pb-12">
        <CTABlock
          eyebrow="Ready when you are"
          title="Start with education, then visit provider quote pages."
          body="PawPeaceGuide helps you prepare better questions before leaving for third-party provider sites."
          primaryHref="/quiz"
          primaryLabel={page.primaryCta}
          secondaryHref="/compare"
          secondaryLabel="Compare quote options"
        />
      </section>
      <StickyMobileCTA href="/quiz" label="Start quiz" />
    </>
  );
}
