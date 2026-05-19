import { CheckCircle2, Clock, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ready to Compare Pet Insurance Quote Options",
  description:
    "A high-intent PawPeaceGuide checkpoint before visiting The Swiftest to compare pet insurance quote options.",
  path: "/ready-to-compare"
});

const intentSignals = [
  "You are comparing before an unexpected bill is in front of you.",
  "You know the pet type, age range, and general breed context.",
  "You want to compare deductible, reimbursement, annual limit, exclusions, and waiting periods.",
  "You understand PawPeaceGuide is education only and policy details must be reviewed directly."
];

export default function ReadyToComparePage() {
  return (
    <>
      <PageEventTracker page="/ready-to-compare" paid />
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
              If you already understand the basics, use this checkpoint and continue toward The
              Swiftest comparison flow once the approved partner link is live.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#quote-ready">Use the quote-ready checklist</Button>
              <Button href="/calculator" variant="secondary">
                Check the cost math first
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
                    <p className="text-sm font-semibold text-ink">Best for warm visitors</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Use this route for retargeting, email follow-up, or ad sets aimed at people
                      who are already close to comparing quote options.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-md bg-mist p-4">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Still not an application</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      PawPeaceGuide does not collect sensitive pet health details, quote premiums,
                      sell insurance, bind coverage, or recommend a policy.
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
              Purchase-intent filter
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Good-fit visitors for the comparison step
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              This page is designed for people who are already thinking about a quote, not for
              broad awareness traffic. It keeps the next click focused while preserving clear
              education and affiliate disclosure.
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
                Take quiz
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
