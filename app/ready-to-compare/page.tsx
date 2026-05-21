import { CheckCircle2, Clock, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { MethodologyNote } from "@/components/MethodologyNote";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { ProviderCard } from "@/components/ProviderCard";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { isProviderAffiliateConfigured } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { routeIntent } from "@/lib/intentRouting";
import { createMetadata } from "@/lib/seo";
import type { Provider } from "@/lib/types";

export const metadata = createMetadata({
  title: "Ready to Compare Pet Insurance Quote Options",
  description:
    "A calm PawPeaceGuide checkpoint before visiting a third-party pet insurance provider or comparison option.",
  path: "/ready-to-compare"
});

const intentSignals = [
  "You are comparing while you have time to review the major terms.",
  "You know the pet type, age range, and general breed context.",
  "You want to compare deductible, reimbursement, annual limit, exclusions, and waiting periods.",
  "You understand PawPeaceGuide is education only and policy details must be reviewed directly."
];

export default function ReadyToComparePage() {
  const directRoute = routeIntent({
    petType: "dog",
    userIntent: "ready to get a quote",
    readinessLevel: "ready to review quote options"
  });
  const comparisonRoute = routeIntent({
    petType: "dog",
    userIntent: "compare multiple options",
    readinessLevel: "ready to review quote options",
    wantsComparison: true
  });
  const liveProviders = directRoute.matchingLiveProviders.filter(
    (partner): partner is Provider => partner.role !== "supplemental" && isProviderAffiliateConfigured(partner)
  );

  return (
    <>
      <PageEventTracker page="/ready-to-compare" eventName={siteConfig.eventNames.readyToCompareViewed} />
      <section className="border-b border-line bg-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Warm traffic path
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-6xl">
              Ready to compare pet insurance quote options?
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              You are ready to compare when you understand the major moving parts: deductible,
              reimbursement rate, annual limit, waiting periods, exclusions, and pre-existing
              condition rules.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={directRoute.primaryNextStep.href}>{directRoute.primaryNextStep.cta}</Button>
              <Button href="/compare" variant="secondary">
                Compare quote options
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{siteConfig.shortDisclosure}</p>
          </div>

          <div className="grid gap-4">
            <PetImagePanel image={petImages.dogSolo} label="Warm comparison path" priority />
            <div className="rounded-md border border-line bg-white p-5 shadow-soft">
              <div className="grid gap-4">
                <div className="flex gap-3 rounded-md bg-mist p-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">For warm visitors</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Use this route when you are close to reviewing quote options and want one
                      final, low-pressure checklist first.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-md bg-mist p-4">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">What happens after clickout</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      PawPeaceGuide shows a leaving-site page, records a generic partner handoff
                      event, then sends ready dog and cat shoppers to the current live provider
                      route. The provider controls its quote flow and terms.
                    </p>
                  </div>
                </div>
                <DisclosureBanner compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Readiness check
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Good-fit visitors for the comparison step
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              This page keeps the next click focused without forcing a partner. If a live partner
              fits, we show it. If the broader comparison path is still pending, we say that.
            </p>
          </div>
          <div className="grid gap-3">
            {intentSignals.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-line bg-white p-4 shadow-tight">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteReadinessChecklist
        pageSource="/ready-to-compare"
        className="mx-auto max-w-6xl px-5 pb-12"
      />

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Fit-based routing</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Choose the handoff that matches your goal.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-line bg-mist p-4">
              <p className="text-sm font-semibold text-ink">I want a live quote option now</p>
              <p className="mt-2 text-sm leading-6 text-muted">{directRoute.primaryNextStep.body}</p>
              <div className="mt-4">
                <Button href={directRoute.primaryNextStep.href}>{directRoute.primaryNextStep.cta}</Button>
              </div>
            </div>
            <div className="rounded-md border border-line bg-mist p-4">
              <p className="text-sm font-semibold text-ink">I want a broader comparison flow</p>
              <p className="mt-2 text-sm leading-6 text-muted">{comparisonRoute.primaryNextStep.body}</p>
              <div className="mt-4">
                <Button href={comparisonRoute.primaryNextStep.href} variant="secondary">
                  {comparisonRoute.primaryNextStep.cta}
                </Button>
              </div>
            </div>
          </div>
          {liveProviders.length > 0 ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {liveProviders.map((provider) => (
                <ProviderCard key={provider.slug} provider={provider} compact emphasized pageSource="/ready-to-compare" />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <MethodologyNote className="mx-auto max-w-6xl px-5 pb-12" />

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-md border border-line bg-mist p-5">
            <FileSearch className="h-5 w-5 text-pine" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-ink">Need one more check?</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Use the quiz if you are unsure which policy features deserve attention. Use the
              calculator if you want rough premium, deductible, and reimbursement math before
              leaving PawPeaceGuide.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/quiz" variant="secondary">
                Start the 60-second check
              </Button>
              <Button href="/calculator" variant="secondary">
                Use calculator
              </Button>
            </div>
          </div>
          <EmailCaptureForm />
        </div>
      </section>
    </>
  );
}
