import { Calculator, ClipboardCheck, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { PrimaryOfferButton } from "@/components/PrimaryOfferButton";

type IntentPathRouterProps = {
  pageSource: string;
  className?: string;
};

const pathCards = [
  {
    icon: Calculator,
    title: "I want to check the math first",
    body: "Use the calculator if you are comparing premium, deductible, reimbursement rate, and a hypothetical bill.",
    href: "/calculator",
    cta: "Use calculator"
  },
  {
    icon: ClipboardCheck,
    title: "I am unsure what to compare",
    body: "Use the quiz if you want a plain-English shopping profile before looking at quote options.",
    href: "/quiz",
    cta: "Take quiz"
  },
  {
    icon: FileSearch,
    title: "I am still researching",
    body: "Use the guided checklist if you want a deeper explanation before leaving PawPeaceGuide.",
    href: "/blog/pet-insurance-comparison-checklist",
    cta: "Read checklist"
  }
];

export function IntentPathRouter({ pageSource, className = "" }: IntentPathRouterProps) {
  return (
    <section className={className}>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Choose your next step
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            Move forward when you feel ready to compare.
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Some visitors are ready for quote options now. Others want to check the math, learn the
            terms, or read one more guide first. Pick the path that makes the decision feel clearer.
          </p>
          <div className="mt-5 rounded-md border border-pine/20 bg-sky/35 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Ready-to-compare signal</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  You know your pet type, age range, general breed context, budget comfort, and
                  the policy features you want to verify directly.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <PrimaryOfferButton pageSource={pageSource} showDisclosure={false} />
            </div>
          </div>
          <div className="mt-4">
            <DisclosureBanner compact />
          </div>
        </div>

        <div className="grid gap-3">
          {pathCards.map((card) => (
            <div key={card.title} className="rounded-md border border-line bg-white p-4 shadow-tight">
              <card.icon className="h-5 w-5 text-pine" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{card.body}</p>
              <div className="mt-4">
                <Button href={card.href} variant="secondary">
                  {card.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
