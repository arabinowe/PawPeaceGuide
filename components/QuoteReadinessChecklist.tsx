"use client";

import {
  CheckCircle2,
  ClipboardList,
  FileSearch,
  HeartPulse,
  MapPin,
  ShieldQuestion,
  WalletCards
} from "lucide-react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";
import { getPrimaryProvider, isProviderAffiliateConfigured } from "@/data/providers";

type QuoteReadinessChecklistProps = {
  pageSource: string;
  compact?: boolean;
  className?: string;
};

const readyItems = [
  {
    icon: HeartPulse,
    title: "Pet basics",
    body: "Pet type, age range, breed or mixed/unknown status, and whether you are comparing for a puppy, kitten, adult dog, or adult cat."
  },
  {
    icon: MapPin,
    title: "Location context",
    body: "Most quote pages ask for location because pricing and availability can vary by state, ZIP code, provider, and policy terms."
  },
  {
    icon: WalletCards,
    title: "Budget comfort",
    body: "Know the monthly range, deductible comfort, reimbursement rate, and annual limit tradeoff you want to compare."
  },
  {
    icon: ShieldQuestion,
    title: "Health-rule questions",
    body: "Do not share sensitive details here. Bring questions about pre-existing condition rules, waiting periods, records, and exclusions to the provider."
  }
];

const scanItems = [
  "Monthly premium is only one input; compare deductible, reimbursement rate, and annual benefit together.",
  "Look for waiting periods, exclusions, claim rules, exam fee treatment, and wellness add-on language.",
  "Review policy details directly with the provider before applying or relying on coverage."
];

export function QuoteReadinessChecklist({
  pageSource,
  compact = false,
  className = ""
}: QuoteReadinessChecklistProps) {
  const provider = getPrimaryProvider();
  const affiliateConfigured = isProviderAffiliateConfigured(provider);

  return (
    <section id="quote-ready" className={className}>
      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              High-intent checklist
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Ready to compare quote options?
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Use this quick checkpoint before leaving PawPeaceGuide for The Swiftest. It helps
              shoppers arrive prepared without turning this site into an insurance application.
            </p>
            {!affiliateConfigured ? (
              <p className="mt-4 rounded-md border border-gold/35 bg-[#fff9ea] px-4 py-3 text-sm leading-6 text-muted">
                The Swiftest tracking URL is still pending approval. Until it is configured, the
                primary handoff keeps visitors inside the PawPeaceGuide comparison guide.
              </p>
            ) : null}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <PrimaryOfferButton pageSource={pageSource} showDisclosure={false}>
                Continue to The Swiftest comparison
              </PrimaryOfferButton>
              <Button href="/quiz" variant="secondary">
                Check my profile first
              </Button>
            </div>
            <div className="mt-4">
              <DisclosureBanner compact />
            </div>
          </div>

          <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
            {readyItems.map((item) => (
              <div key={item.title} className="rounded-md border border-line bg-mist p-4">
                <item.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-line pt-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex gap-3">
            <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">What to scan after clickout</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                The Swiftest and provider sites control their own quote flow, rankings, pricing,
                availability, and policy language.
              </p>
            </div>
          </div>
          <ul className="grid gap-3">
            {scanItems.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {!compact ? (
          <div className="mt-6 rounded-md border border-line bg-mist p-4">
            <div className="flex gap-3">
              <FileSearch className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
              <p className="text-sm leading-6 text-muted">
                PawPeaceGuide does not collect a full insurance application, quote exact premiums,
                bind coverage, recommend a policy, or send quiz answers to Meta Pixel or affiliate
                links by default.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
