"use client";

import {
  CheckCircle2,
  ClipboardList,
  Eraser,
  FileQuestion,
  Printer,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";
import { getPrimaryProvider } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

type QuoteCard = {
  id: string;
  providerName: string;
  monthlyPremium: string;
  deductible: string;
  reimbursementRate: string;
  annualLimit: string;
  waitingPeriodNotes: string;
  preExistingNotes: string;
  examFees: "Unknown" | "Included" | "Not included" | "Optional";
  wellness: "Unknown" | "Separate add-on" | "Included" | "Not looking for wellness";
  claimPaymentNotes: string;
};

type QuoteField = keyof QuoteCard;

const storageKey = "pawpeaceguide_quote_workspace";

const blankQuote = (id: string, providerName = ""): QuoteCard => ({
  id,
  providerName,
  monthlyPremium: "",
  deductible: "",
  reimbursementRate: "",
  annualLimit: "",
  waitingPeriodNotes: "",
  preExistingNotes: "",
  examFees: "Unknown",
  wellness: "Unknown",
  claimPaymentNotes: ""
});

const startingQuotes: QuoteCard[] = [
  blankQuote("quote-1", "Odie"),
  blankQuote("quote-2", "Provider 2"),
  blankQuote("quote-3", "Provider 3")
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const beforeBuyingQuestions = [
  "What waiting periods apply for accidents, illnesses, orthopedic issues, dental issues, or other categories?",
  "How are pre-existing conditions, prior symptoms, and medical records reviewed?",
  "Are exam fees, diagnostics, prescriptions, specialist care, and follow-up visits eligible?",
  "Does the annual limit reset each policy year, and are there any per-condition or benefit-schedule limits?",
  "How are claims submitted, how long does review usually take, and is direct vet pay available anywhere?",
  "Is wellness routine care separate from accident and illness insurance?"
];

export function QuoteWorkspace() {
  const primaryProvider = getPrimaryProvider();
  const [quotes, setQuotes] = useState<QuoteCard[]>(startingQuotes);
  const [hypotheticalBill, setHypotheticalBill] = useState("3000");
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    trackFunnelEvent(siteConfig.eventNames.quoteWorkspaceViewed, { page: "/quote-workspace" });

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as { quotes?: QuoteCard[]; hypotheticalBill?: string };
        if (Array.isArray(parsed.quotes)) setQuotes(parsed.quotes.slice(0, 3));
        if (parsed.hypotheticalBill) setHypotheticalBill(parsed.hypotheticalBill);
      }
    } catch {
      // Local storage should never block the workspace.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ quotes, hypotheticalBill }));
    } catch {
      // Ignore storage failures.
    }
  }, [hypotheticalBill, quotes]);

  const analyses = useMemo(
    () => quotes.map((quote) => analyzeQuote(quote, Number(hypotheticalBill) || 0)),
    [hypotheticalBill, quotes]
  );
  const filledQuoteCount = analyses.filter((analysis) => analysis.completenessScore >= 4).length;
  const mostComplete = analyses.reduce((best, analysis) =>
    analysis.completenessScore > best.completenessScore ? analysis : best
  );

  useEffect(() => {
    if (filledQuoteCount >= 2 && !completedRef.current) {
      completedRef.current = true;
      trackFunnelEvent(siteConfig.eventNames.quoteWorkspaceCompleted, {
        page: "/quote-workspace",
        quoteCount: filledQuoteCount
      });
    }
  }, [filledQuoteCount]);

  function updateQuote(id: string, field: QuoteField, value: string) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackFunnelEvent(siteConfig.eventNames.quoteWorkspaceStarted, { page: "/quote-workspace" });
    }

    setQuotes((current) =>
      current.map((quote) => (quote.id === id ? { ...quote, [field]: value } : quote))
    );
  }

  function resetWorkspace() {
    setQuotes(startingQuotes);
    setHypotheticalBill("3000");
    completedRef.current = false;
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage failures.
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            PawPeaceGuide workspace
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">
            Compare pet insurance quotes without losing the fine print.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Use this no-login worksheet after you open provider quote pages. Put the main terms side
            by side, spot missing details, and decide which questions to verify before buying.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            The values you type here stay in this browser. PawPeaceGuide does not send quote
            details, pet health details, or personal financial details to analytics or affiliate links.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PrimaryOfferButton pageSource="/quote-workspace-hero" className="w-full sm:w-auto">
              Review {primaryProvider.name} quote options
            </PrimaryOfferButton>
            <Button href="/guides/how-to-compare-pet-insurance" variant="secondary" className="w-full sm:w-auto">
              Read comparison guide
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-line bg-mist p-5 shadow-soft md:p-6">
          <div className="flex gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">What makes this different</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Most comparison pages ask you to trust a ranking. This workspace helps you build
                your own side-by-side policy view, then routes you to live partners only when that
                step fits.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Local only", "No backend account"],
              ["Term gap map", "See what is missing"],
              ["Tracked handoff", "Partner links use /go/"]
            ].map(([title, body]) => (
              <div key={title} className="rounded-md border border-white/80 bg-white p-3">
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <DisclosureBanner compact />
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-md border border-line bg-white p-4 shadow-tight md:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label htmlFor="hypothetical-bill" className="text-sm font-semibold text-ink">
              Hypothetical vet bill to model
            </label>
            <p className="mt-1 text-sm leading-6 text-muted">
              This is only for rough planning. It does not predict claim approval or reimbursement.
            </p>
            <div className="mt-2 flex max-w-xs items-center rounded-md border border-line bg-white focus-within:border-pine focus-within:ring-2 focus-within:ring-sky">
              <span className="pl-4 text-sm font-semibold text-muted">$</span>
              <input
                id="hypothetical-bill"
                type="number"
                min="0"
                value={hypotheticalBill}
                onChange={(event) => setHypotheticalBill(event.target.value)}
                className="min-h-11 w-full rounded-md border-0 bg-transparent px-2 py-3 text-base text-ink outline-none sm:text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-pine/25 bg-white px-4 py-3 text-sm font-semibold text-pine transition hover:border-pine/45 hover:bg-sky/35"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print
            </button>
            <button
              type="button"
              onClick={resetWorkspace}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-muted transition hover:border-clay/40 hover:bg-mist"
            >
              <Eraser className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {quotes.map((quote, index) => (
          <QuoteInputCard
            key={quote.id}
            quote={quote}
            index={index}
            analysis={analyses[index]}
            onChange={updateQuote}
          />
        ))}
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-line bg-mist p-5 md:p-6">
          <WalletCards className="h-5 w-5 text-pine" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-semibold text-ink">Side-by-side planning view</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This table highlights completeness and rough example math. It is not a provider ranking
            and does not decide which policy is right for you.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-clay">
                <tr>
                  <th className="whitespace-nowrap px-3 py-2">Quote</th>
                  <th className="whitespace-nowrap px-3 py-2">Annual premium</th>
                  <th className="whitespace-nowrap px-3 py-2">Rough reimbursement</th>
                  <th className="whitespace-nowrap px-3 py-2">Missing terms</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((analysis) => (
                  <tr key={analysis.id} className="border-t border-line">
                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-ink">{analysis.name}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted">
                      {analysis.annualPremium === null ? "Add premium" : currencyFormatter.format(analysis.annualPremium)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted">
                      {analysis.estimatedReimbursement === null
                        ? "Add deductible + rate"
                        : currencyFormatter.format(analysis.estimatedReimbursement)}
                    </td>
                    <td className="px-3 py-3 text-muted">{analysis.missingItems.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-md border border-line bg-white p-5 shadow-tight md:p-6">
          <ClipboardList className="h-5 w-5 text-pine" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-semibold text-ink">Your term gap map</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            The most complete quote in your workspace is currently{" "}
            <strong>{mostComplete.name}</strong>. That does not mean it is the best policy. It means
            this quote has the fewest blanks in the worksheet.
          </p>
          <div className="mt-5 grid gap-3">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="rounded-md border border-line bg-mist p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">{analysis.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-clay">
                    {analysis.completenessScore}/9 filled
                  </p>
                </div>
                {analysis.missingItems.length > 0 ? (
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Verify: {analysis.missingItems.slice(0, 4).join(", ")}
                    {analysis.missingItems.length > 4 ? "." : "."}
                  </p>
                ) : (
                  <p className="mt-2 flex gap-2 text-xs leading-5 text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                    The core worksheet fields are filled. Review the sample policy directly before buying.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <FileQuestion className="h-5 w-5 text-pine" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-semibold text-ink">Questions to keep open before buying</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              These are the questions that turn a quote into a clearer decision. Bring them to the
              provider page before relying on the monthly price.
            </p>
            <div className="mt-5">
              <PrimaryOfferButton pageSource="/quote-workspace-final" className="w-full sm:w-auto">
                Review {primaryProvider.name} quote options
              </PrimaryOfferButton>
            </div>
          </div>
          <ul className="grid gap-3">
            {beforeBuyingQuestions.map((question) => (
              <li key={question} className="flex gap-3 rounded-md bg-mist p-4 text-sm leading-6 text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

function QuoteInputCard({
  quote,
  index,
  analysis,
  onChange
}: {
  quote: QuoteCard;
  index: number;
  analysis: ReturnType<typeof analyzeQuote>;
  onChange: (id: string, field: QuoteField, value: string) => void;
}) {
  return (
    <div className="rounded-md border border-line bg-white p-4 shadow-tight md:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">Quote {index + 1}</p>
      <div className="mt-4 grid gap-4">
        <TextField
          id={`${quote.id}-provider-name`}
          label="Provider or quote label"
          value={quote.providerName}
          onChange={(value) => onChange(quote.id, "providerName", value)}
          placeholder="Odie, Provider 2..."
        />
        <NumberField
          id={`${quote.id}-monthly-premium`}
          label="Monthly premium"
          value={quote.monthlyPremium}
          onChange={(value) => onChange(quote.id, "monthlyPremium", value)}
          prefix="$"
        />
        <NumberField
          id={`${quote.id}-annual-deductible`}
          label="Annual deductible"
          value={quote.deductible}
          onChange={(value) => onChange(quote.id, "deductible", value)}
          prefix="$"
        />
        <NumberField
          id={`${quote.id}-reimbursement-rate`}
          label="Reimbursement rate"
          value={quote.reimbursementRate}
          onChange={(value) => onChange(quote.id, "reimbursementRate", value)}
          suffix="%"
        />
        <NumberField
          id={`${quote.id}-annual-limit`}
          label="Annual limit"
          value={quote.annualLimit}
          onChange={(value) => onChange(quote.id, "annualLimit", value)}
          prefix="$"
          placeholder="0 if unlimited or unknown"
        />
        <SelectField
          id={`${quote.id}-exam-fees`}
          label="Exam fee treatment"
          value={quote.examFees}
          onChange={(value) => onChange(quote.id, "examFees", value)}
          options={["Unknown", "Included", "Not included", "Optional"]}
        />
        <SelectField
          id={`${quote.id}-wellness`}
          label="Wellness or routine care"
          value={quote.wellness}
          onChange={(value) => onChange(quote.id, "wellness", value)}
          options={["Unknown", "Separate add-on", "Included", "Not looking for wellness"]}
        />
        <TextAreaField
          id={`${quote.id}-waiting-periods`}
          label="Waiting period notes"
          value={quote.waitingPeriodNotes}
          onChange={(value) => onChange(quote.id, "waitingPeriodNotes", value)}
          placeholder="Accident, illness, orthopedic, dental..."
        />
        <TextAreaField
          id={`${quote.id}-pre-existing`}
          label="Pre-existing condition notes"
          value={quote.preExistingNotes}
          onChange={(value) => onChange(quote.id, "preExistingNotes", value)}
          placeholder="Medical record review, curable-condition language..."
        />
        <TextAreaField
          id={`${quote.id}-claim-payment`}
          label="Claim or payment notes"
          value={quote.claimPaymentNotes}
          onChange={(value) => onChange(quote.id, "claimPaymentNotes", value)}
          placeholder="Reimbursement timing, direct pay, documents..."
        />
      </div>
      <div className="mt-5 rounded-md border border-line bg-mist p-4">
        <p className="text-sm font-semibold text-ink">Quick read</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          {analysis.summary}
        </p>
      </div>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-pine focus:ring-2 focus:ring-sky"
      />
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-md border border-line bg-white focus-within:border-pine focus-within:ring-2 focus-within:ring-sky">
        {prefix ? <span className="pl-3 text-sm font-semibold text-muted">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-11 w-full rounded-md border-0 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-muted/70"
        />
        {suffix ? <span className="pr-3 text-sm font-semibold text-muted">{suffix}</span> : null}
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-pine focus:ring-2 focus:ring-sky"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/70 focus:border-pine focus:ring-2 focus:ring-sky"
      />
    </div>
  );
}

function analyzeQuote(quote: QuoteCard, hypotheticalBill: number) {
  const premium = parseNumber(quote.monthlyPremium);
  const deductible = parseNumber(quote.deductible);
  const reimbursementRate = parseNumber(quote.reimbursementRate);
  const annualLimit = parseNumber(quote.annualLimit);
  const annualPremium = premium === null ? null : premium * 12;
  const estimatedReimbursement =
    deductible === null || reimbursementRate === null || hypotheticalBill <= 0
      ? null
      : Math.min(
          Math.max(hypotheticalBill - deductible, 0) * (Math.min(reimbursementRate, 100) / 100),
          annualLimit && annualLimit > 0 ? annualLimit : Number.POSITIVE_INFINITY
        );

  const missingItems = [
    !quote.monthlyPremium.trim() ? "monthly premium" : "",
    !quote.deductible.trim() ? "deductible" : "",
    !quote.reimbursementRate.trim() ? "reimbursement rate" : "",
    !quote.annualLimit.trim() ? "annual limit" : "",
    !quote.waitingPeriodNotes.trim() ? "waiting periods" : "",
    !quote.preExistingNotes.trim() ? "pre-existing condition rules" : "",
    quote.examFees === "Unknown" ? "exam fee treatment" : "",
    quote.wellness === "Unknown" ? "wellness/routine care separation" : "",
    !quote.claimPaymentNotes.trim() ? "claim or payment process" : ""
  ].filter(Boolean);

  const completenessScore = 9 - missingItems.length;
  const name = quote.providerName.trim() || "Unnamed quote";
  const summary =
    estimatedReimbursement === null
      ? "Add deductible, reimbursement rate, and a hypothetical bill to see rough planning math."
      : `Using only the fields above, the rough possible reimbursement on the example bill is ${currencyFormatter.format(
          estimatedReimbursement
        )}. Real claim results depend on provider policy terms.`;

  return {
    id: quote.id,
    name,
    annualPremium,
    estimatedReimbursement,
    missingItems,
    completenessScore,
    summary
  };
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
