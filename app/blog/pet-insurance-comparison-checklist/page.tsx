import {
  AlertCircle,
  Calculator,
  ClipboardCheck,
  FileQuestion,
  FileSearch,
  Link2,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { IntentPathRouter } from "@/components/IntentPathRouter";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { UTMLink } from "@/components/UTMLink";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pet Insurance Comparison Checklist",
  description:
    "A guided, organic pet insurance comparison checklist for dog and cat owners comparing quote options, deductibles, reimbursement, exclusions, and waiting periods.",
  path: "/blog/pet-insurance-comparison-checklist"
});

const toc = [
  ["how-to-use", "How to use this checklist"],
  ["comparison-checklist", "The comparison checklist"],
  ["red-flags", "What to slow down and verify"],
  ["quote-ready", "Before you click to a quote page"],
  ["linkable-resources", "Useful PawPeaceGuide resources"]
];

const checklist = [
  {
    title: "Premium",
    body: "The monthly amount matters, but it is only useful when compared with deductible, reimbursement, annual limit, and policy language."
  },
  {
    title: "Deductible",
    body: "Ask whether the deductible is annual or structured another way, when it resets, and how it applies to eligible expenses."
  },
  {
    title: "Reimbursement rate",
    body: "Compare how much of an eligible bill may be reimbursed after deductible, exclusions, limits, and policy rules."
  },
  {
    title: "Annual benefit or limit",
    body: "A lower annual limit can leave more large-bill risk with you, even if the monthly premium looks attractive."
  },
  {
    title: "Waiting periods",
    body: "Coverage may not start immediately. Confirm accident, illness, orthopedic, and any other waiting period directly."
  },
  {
    title: "Exclusions",
    body: "Excluded services, conditions, exam fees, dental rules, and breed-related language can change how useful a policy is."
  },
  {
    title: "Pre-existing condition rules",
    body: "Provider definitions vary. Ask how symptoms, records, curable conditions, and recurrence are reviewed."
  },
  {
    title: "Wellness add-ons",
    body: "Routine care is often separate from accident and illness coverage. Compare add-ons as budgeting tools, not guarantees."
  }
];

const redFlags = [
  "A page focuses only on monthly premium without showing deductible, reimbursement, annual benefit, exclusions, and waiting periods.",
  "You cannot find sample policy language or a clear explanation of claim rules before applying.",
  "You are trying to cover symptoms, injuries, or bills that already happened.",
  "You feel rushed by fake urgency, unsupported savings claims, fake reviews, or countdown timers."
];

const linkableResources = [
  {
    href: "/calculator",
    icon: Calculator,
    title: "Vet bill calculator",
    body: "A simple tool for rough premium, deductible, reimbursement, and out-of-pocket math."
  },
  {
    href: "/quiz",
    icon: ClipboardCheck,
    title: "60-second shopping profile",
    body: "A no-backend quiz that helps readers identify the policy features they should compare."
  },
  {
    href: "/guides/how-pet-insurance-deductibles-work",
    icon: FileSearch,
    title: "Deductible guide",
    body: "Plain-English context for annual deductibles, reimbursement, and claim math."
  }
];

export default function PetInsuranceComparisonChecklistBlogPage() {
  return (
    <>
      <PageEventTracker page="/blog/pet-insurance-comparison-checklist" />
      <article>
        <section className="border-b border-line bg-mist">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
                Guided blog
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-ink md:text-6xl">
                The pet insurance comparison checklist
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">
                A practical, linkable walkthrough for dog and cat owners who want to compare quote
                options without treating the lowest monthly premium as the whole decision.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/blog/pet-insurance-comparison-checklist#comparison-checklist">
                  Read the checklist
                </Button>
                <Button href="/ready-to-compare" variant="secondary">
                  I am ready to compare
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted">{siteConfig.shortDisclosure}</p>
            </div>
            <PetImagePanel image={petImages.puppy} label="Guided comparison checklist" priority />
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Article table of contents" className="rounded-md border border-line bg-white p-5 shadow-tight">
              <p className="text-sm font-semibold text-ink">In this guide</p>
              <ol className="mt-3 space-y-2">
                {toc.map(([href, label]) => (
                  <li key={href}>
                    <a className="text-sm font-medium text-pine" href={`#${href}`}>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-5">
              <DisclosureBanner compact />
            </div>
          </aside>

          <div className="space-y-12">
            <section id="how-to-use" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold text-ink">How to use this checklist</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted">
                <p>
                  Pet insurance comparison gets confusing when every page uses different language.
                  This guide gives you a simple order of operations: understand the policy levers,
                  decide which tradeoffs matter, then verify details directly with the provider.
                </p>
                <p>
                  PawPeaceGuide does not sell insurance, recommend a policy, or decide what a
                  provider will cover. Use this as an education layer before visiting The Swiftest,
                  a provider site, or another third-party comparison page.
                </p>
              </div>
              <div className="mt-6 rounded-md border border-line bg-white p-5 shadow-tight">
                <SearchCheck className="h-5 w-5 text-pine" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-ink">Organic funnel path</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Blog reader to checklist to quiz or calculator to ready-to-compare page to The
                  Swiftest handoff once the approved affiliate link is configured.
                </p>
              </div>
            </section>

            <section id="comparison-checklist" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold text-ink">The comparison checklist</h2>
              <p className="mt-4 text-base leading-8 text-muted">
                Keep these eight items open while you review quote options. A quote that looks
                inexpensive can still leave more risk with you if the policy details are restrictive.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {checklist.map((item, index) => (
                  <div key={item.title} className="rounded-md border border-line bg-white p-5 shadow-tight">
                    <p className="text-sm font-semibold text-clay">0{index + 1}</p>
                    <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="red-flags" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold text-ink">What to slow down and verify</h2>
              <p className="mt-4 text-base leading-8 text-muted">
                High-intent does not mean rushed. Slow down when the policy details are unclear or
                when a page makes claims that sound broader than the written terms.
              </p>
              <div className="mt-6 grid gap-3">
                {redFlags.map((item) => (
                  <div key={item} className="flex gap-3 rounded-md border border-line bg-white p-4 shadow-tight">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                    <p className="text-sm leading-6 text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <QuoteReadinessChecklist pageSource="/blog-comparison-checklist" />

            <IntentPathRouter pageSource="/blog-checklist-intent-router" />

            <section id="linkable-resources" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold text-ink">Useful PawPeaceGuide resources</h2>
              <p className="mt-4 text-base leading-8 text-muted">
                These are the safest internal pages to cite from newsletters, pet-owner groups,
                community roundups, and educational partner pages because they are tools or
                evergreen explanations rather than paid-ad landing pages.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {linkableResources.map((resource) => (
                  <UTMLink
                    key={resource.href}
                    href={resource.href}
                    className="group rounded-md border border-line bg-white p-5 shadow-tight transition hover:-translate-y-0.5 hover:border-pine/40 hover:shadow-soft"
                  >
                    <resource.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-semibold text-ink">{resource.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{resource.body}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pine">
                      Open resource
                      <Link2 className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </UTMLink>
                ))}
              </div>
              <div className="mt-6 rounded-md border border-line bg-mist p-5">
                <ShieldCheck className="h-5 w-5 text-pine" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-ink">Citation-friendly summary</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  PawPeaceGuide is an educational, affiliate-supported pet insurance comparison
                  resource. It helps pet owners understand terms like deductible, reimbursement
                  rate, annual limit, waiting period, exclusion, and pre-existing condition before
                  visiting third-party quote pages.
                </p>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-md border border-line bg-white p-5 shadow-tight">
                <FileQuestion className="h-5 w-5 text-pine" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-semibold text-ink">Still researching?</h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  If you are not ready for a quote page, keep reading the educational guides first.
                  If you are ready, use the comparison path and review policy terms directly.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button href="/guides" variant="secondary">
                    Browse guides
                  </Button>
                  <Button href="/compare">Compare quote options</Button>
                </div>
              </div>
              <EmailCaptureForm />
            </section>

            <p className="rounded-md border border-line bg-mist px-4 py-3 text-sm leading-6 text-muted">
              {siteConfig.legalDisclaimer}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
