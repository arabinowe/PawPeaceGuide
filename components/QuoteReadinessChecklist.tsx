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

const beforeCompareItems = [
  "Deductible",
  "Reimbursement rate",
  "Annual limit",
  "Waiting periods",
  "Exclusions",
  "Pre-existing conditions"
];

export function QuoteReadinessChecklist({
  pageSource,
  compact = false,
  className = ""
}: QuoteReadinessChecklistProps) {
  const provider = getPrimaryProvider();
  const affiliateConfigured = isProviderAffiliateConfigured(provider);
  const visibleReadyItems = compact ? readyItems.slice(0, 2) : readyItems;
  const mobileHiddenReadyItems = compact ? readyItems.slice(2) : [];

  return (
    <section id="quote-ready" className={className}>
      <div className="rounded-md border border-line bg-white p-4 shadow-soft md:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Quote-ready checklist
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink md:mt-3 md:text-3xl">
              Ready to compare quote options?
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted md:text-base md:leading-7">
              Use this quick checkpoint before leaving PawPeaceGuide for {provider.name}. It helps
              you arrive prepared without turning this site into an insurance application.
            </p>
            {!affiliateConfigured ? (
              <p className="mt-4 rounded-md border border-gold/35 bg-[#fff9ea] px-3 py-2 text-xs leading-5 text-muted md:px-4 md:py-3 md:text-sm md:leading-6">
                The {provider.name} tracking URL is still pending approval. Until it is configured, the
                primary handoff keeps visitors inside the PawPeaceGuide comparison guide.
              </p>
            ) : null}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <PrimaryOfferButton pageSource={pageSource} showDisclosure={false} className="w-full sm:w-auto">
                {affiliateConfigured ? provider.ctaText : "Compare quote options"}
              </PrimaryOfferButton>
              <Button href="/quiz" variant="secondary" className="w-full sm:w-auto">
                Start the 60-second check
              </Button>
            </div>
            <div className="mt-4">
              <DisclosureBanner compact />
            </div>
          </div>

          <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
            {[...visibleReadyItems, ...mobileHiddenReadyItems].map((item, index) => (
              <div
                key={item.title}
                className={`rounded-md border border-line bg-mist p-4 ${
                  compact && index >= visibleReadyItems.length ? "hidden md:block" : ""
                }`}
              >
                <item.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-md border border-pine/15 bg-sky/35 p-4">
          <div className="flex gap-3">
            <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Before you compare</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Keep these policy terms in view when you continue to the third-party partner page.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {beforeCompareItems.map((item) => (
              <div key={item} className="rounded-md border border-white/80 bg-white px-3 py-2 text-xs font-semibold text-pine">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className={`${compact ? "grid" : "grid"} mt-6 gap-4 border-t border-line pt-6 lg:grid-cols-[0.8fr_1.2fr]`}>
          <div className="flex gap-3">
            <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">What to scan after clickout</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                {provider.name} and other provider sites control their own quote flow, pricing,
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
