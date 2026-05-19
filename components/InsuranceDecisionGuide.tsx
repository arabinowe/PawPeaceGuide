import {
  ClipboardCheck,
  FileSearch,
  HeartHandshake,
  ListChecks,
  PawPrint,
  ShieldQuestion
} from "lucide-react";
import { getPrimaryProvider } from "@/data/providers";

const decisionCards = [
  {
    icon: ClipboardCheck,
    title: "If you want one quote path now",
    body:
      "Start with the live direct-provider path when your pet is a dog or cat and you are ready to review policy details directly."
  },
  {
    icon: ListChecks,
    title: "If you want several options side by side",
    body:
      "Use the comparison checklist first. Broader comparison partners can be added when approved, without changing the learning flow."
  },
  {
    icon: ShieldQuestion,
    title: "If medical history is the concern",
    body:
      "Focus on waiting periods, exclusions, and pre-existing condition definitions. Ask providers how records and symptoms are reviewed."
  },
  {
    icon: HeartHandshake,
    title: "If you want routine care or comfort extras",
    body:
      "Separate insurance from wellness add-ons and comfort products. They can support different needs, but they are not the same thing."
  }
];

const providerStyles = [
  {
    style: "Direct provider",
    helpsWith: "Reviewing one provider's quote flow, policy documents, deductibles, reimbursement, and limits.",
    watchFor: "It is not a full-market comparison. Verify pricing, eligibility, and exclusions directly."
  },
  {
    style: "Comparison partner",
    helpsWith: "Seeing multiple quote options or provider paths before choosing which details to inspect.",
    watchFor: "Comparison partners may rank or filter providers using their own rules. Review policy terms directly."
  },
  {
    style: "Wellness or product partner",
    helpsWith: "Day-to-day comfort, routines, or non-insurance pet care extras.",
    watchFor: "These are not insurance, do not reimburse vet bills, and should not replace veterinary care."
  },
  {
    style: "Other-pet eligibility path",
    helpsWith: "Owners of pets other than dogs or cats who need a careful first step.",
    watchFor: "Many providers focus on dogs and cats. Species eligibility comes before quote comparison."
  }
];

export function InsuranceDecisionGuide({ className = "" }: { className?: string }) {
  const primaryProvider = getPrimaryProvider();

  return (
    <section className={className}>
      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Decision guide
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Choose what to learn before you choose where to click.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              The goal is not to rush you into a provider page. The goal is to help you understand
              what kind of insurance shopping moment you are in, then send you to a relevant next
              step when you are ready.
            </p>
            <div className="mt-5 rounded-md border border-pine/15 bg-sky/35 p-4">
              <FileSearch className="h-5 w-5 text-pine" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-ink">Current live insurance path</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {primaryProvider.name} is available as the current live direct-provider path for
                dog and cat shoppers. That does not mean it is the only option to understand, and
                PawPeaceGuide does not claim it is the right policy for every pet.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {decisionCards.map((card) => (
              <div key={card.title} className="rounded-md border border-line bg-mist p-4">
                <card.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-6">
          <div className="flex gap-3">
            <PawPrint className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold text-ink">Provider styles at a glance</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Use this to understand the lane before judging any provider page.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {providerStyles.map((item) => (
              <div key={item.style} className="rounded-md border border-line bg-white p-4 shadow-tight">
                <p className="text-sm font-semibold text-ink">{item.style}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.helpsWith}</p>
                <p className="mt-3 text-xs leading-5 text-muted">
                  <span className="font-semibold text-clay">Watch for:</span> {item.watchFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
