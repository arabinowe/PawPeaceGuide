"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

type CalculatorState = {
  monthlyPremium: number;
  deductible: number;
  reimbursementRate: number;
  vetBill: number;
  annualLimit: number;
};

const initialState: CalculatorState = {
  monthlyPremium: 45,
  deductible: 500,
  reimbursementRate: 80,
  vetBill: 2500,
  annualLimit: 10000
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function Calculator() {
  const [values, setValues] = useState(initialState);
  const [showResults, setShowResults] = useState(false);
  const started = useRef(false);

  const result = useMemo(() => {
    const annualPremium = values.monthlyPremium * 12;
    const eligibleAfterDeductible = Math.max(values.vetBill - values.deductible, 0);
    const possibleReimbursement = eligibleAfterDeductible * (values.reimbursementRate / 100);
    const cappedReimbursement =
      values.annualLimit > 0 ? Math.min(possibleReimbursement, values.annualLimit) : possibleReimbursement;
    const outOfPocketClaimPortion = Math.max(values.vetBill - cappedReimbursement, 0);
    const withInsurance = annualPremium + outOfPocketClaimPortion;
    const withoutInsurance = values.vetBill;
    const breakEvenBill =
      values.reimbursementRate > 0
        ? values.deductible + annualPremium / (values.reimbursementRate / 100)
        : Infinity;

    return {
      annualPremium,
      withInsurance,
      withoutInsurance,
      reimbursement: cappedReimbursement,
      breakEvenBill
    };
  }, [values]);

  function updateField(key: keyof CalculatorState, value: number) {
    if (!started.current) {
      started.current = true;
      trackFunnelEvent(siteConfig.eventNames.calculatorStarted, { page: "/calculator" });
    }
    setValues((current) => ({ ...current, [key]: Number.isFinite(value) ? value : 0 }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowResults(true);
    trackFunnelEvent(siteConfig.eventNames.calculatorCompleted, { page: "/calculator" });
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Vet bill calculator</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Estimate pet insurance cost tradeoffs</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Use hypothetical numbers to see how premium, deductible, reimbursement rate, and coverage limits can change the out-of-pocket picture.
        </p>
        <div className="mt-6">
          <DisclosureBanner />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={onSubmit} className="rounded-md border border-line bg-white p-5 shadow-tight">
          <div className="grid gap-4">
            <NumberField
              label="Monthly premium estimate"
              value={values.monthlyPremium}
              min={0}
              onChange={(value) => updateField("monthlyPremium", value)}
            />
            <NumberField
              label="Annual deductible"
              value={values.deductible}
              min={0}
              onChange={(value) => updateField("deductible", value)}
            />
            <NumberField
              label="Reimbursement rate"
              value={values.reimbursementRate}
              min={0}
              max={100}
              suffix="%"
              onChange={(value) => updateField("reimbursementRate", value)}
            />
            <NumberField
              label="Hypothetical vet bill amount"
              value={values.vetBill}
              min={0}
              onChange={(value) => updateField("vetBill", value)}
            />
            <NumberField
              label="Optional annual coverage limit"
              value={values.annualLimit}
              min={0}
              helper="Use 0 if you do not want to model a limit."
              onChange={(value) => updateField("annualLimit", value)}
            />
          </div>
          <button
            type="submit"
            className="mt-6 min-h-11 w-full rounded-md bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          >
            Calculate estimate
          </button>
        </form>

        <div className="rounded-md border border-line bg-mist p-5 shadow-tight">
          <h2 className="text-2xl font-semibold text-ink">Estimated result</h2>
          {showResults ? (
            <div className="mt-5 grid gap-4">
              <ResultRow label="Estimated annual premium cost" value={result.annualPremium} />
              <ResultRow label="Estimated out-of-pocket cost with insurance" value={result.withInsurance} />
              <ResultRow label="Estimated cost without insurance" value={result.withoutInsurance} />
              <ResultRow label="Rough possible reimbursement" value={result.reimbursement} />
              <div className="rounded-md bg-white p-4">
                <p className="text-sm font-semibold text-ink">Simplified break-even explanation</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  With these assumptions, a covered bill may start to look financially useful around{" "}
                  <strong>{currencyFormatter.format(result.breakEvenBill)}</strong>, before considering exclusions,
                  waiting periods, taxes, exam fees, annual limits, and provider-specific claim rules.
                </p>
              </div>
              <p className="text-sm leading-6 text-muted">
                This is only a rough estimate. Real policy terms, reimbursement calculations, annual limits,
                exclusions, waiting periods, and claim decisions vary by provider.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryOfferButton pageSource="/calculator-result" showDevelopmentWarning>
                  Compare quote options
                </PrimaryOfferButton>
                <Button href="/quiz" variant="secondary">
                  Take the 60-second quiz
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-muted">
              Enter your assumptions and calculate to see a simplified educational estimate.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <ProviderComparisonGrid compact role="primary" emphasizePrimary pageSource="/calculator-primary" />
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-ink">Backup provider options</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          These secondary options stay available below the primary comparison path.
        </p>
        <div className="mt-4">
          <ProviderComparisonGrid compact role="backup" pageSource="/calculator-backup" />
        </div>
      </div>
      <div className="mt-8">
        <EmailCaptureForm />
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  helper
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max?: number;
  suffix?: string;
  helper?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-md border border-line bg-white focus-within:border-pine focus-within:ring-2 focus-within:ring-sky">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-h-11 w-full rounded-md border-0 bg-transparent px-4 py-3 text-sm text-ink outline-none"
        />
        {suffix ? <span className="pr-4 text-sm font-semibold text-muted">{suffix}</span> : null}
      </div>
      {helper ? <p className="mt-1 text-xs leading-5 text-muted">{helper}</p> : null}
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-white p-4">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <p className="text-lg font-semibold text-pine">{currencyFormatter.format(value)}</p>
    </div>
  );
}
