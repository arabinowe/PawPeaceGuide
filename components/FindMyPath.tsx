"use client";

import { CheckCircle2, Compass, HeartHandshake } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { InsuranceDecisionGuide } from "@/components/InsuranceDecisionGuide";
import { MethodologyNote } from "@/components/MethodologyNote";
import { PartnerOfferCard } from "@/components/PartnerOfferCard";
import { ProviderCard } from "@/components/ProviderCard";
import { isProviderAffiliateConfigured } from "@/data/providers";
import { routeIntent } from "@/lib/intentRouting";
import type { PartnerOffer, PetType, Provider, ReadinessLevel, UserIntent } from "@/lib/types";

const petOptions: Array<{ label: string; value: PetType }> = [
  { label: "Dog", value: "dog" },
  { label: "Cat", value: "cat" },
  { label: "Puppy", value: "puppy" },
  { label: "Kitten", value: "kitten" },
  { label: "Senior pet", value: "senior pet" },
  { label: "Other pet", value: "other" }
];

const intentOptions: Array<{ label: string; value: UserIntent }> = [
  { label: "Compare insurance options", value: "compare multiple options" },
  { label: "Review quote options", value: "ready to get a quote" },
  { label: "Understand costs first", value: "understand costs first" },
  { label: "Prepare for emergency bills", value: "emergency vet bill planning" },
  { label: "Learn coverage basics", value: "just researching" },
  { label: "Wellness or comfort extras", value: "wellness or comfort products" }
];

const readinessOptions: Array<{ label: string; value: ReadinessLevel }> = [
  { label: "Just researching", value: "just researching" },
  { label: "Comparing soon", value: "comparing soon" },
  { label: "Ready to review quote options", value: "ready to review quote options" }
];

export function FindMyPath() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [userIntent, setUserIntent] = useState<UserIntent>("just researching");
  const [readinessLevel, setReadinessLevel] = useState<ReadinessLevel>("just researching");

  const result = useMemo(
    () =>
      routeIntent({
        petType,
        userIntent,
        readinessLevel,
        wantsComparison: userIntent === "compare multiple options",
        wantsWellnessExtras: userIntent === "wellness or comfort products"
      }),
    [petType, readinessLevel, userIntent]
  );

  const liveProviders = result.matchingLiveProviders.filter(isProviderAffiliateConfigured);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Find my path</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">
            Tell us what you are trying to solve.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            PawPeaceGuide will help you choose the calm next step: learn, estimate costs, compare
            coverage terms, or continue to a relevant partner when there is a genuine fit.
          </p>
          <p className="mt-5 text-sm leading-6 text-muted">
            Educational and affiliate-supported. Disclosures appear near partner links.
          </p>
        </div>

        <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-6">
          <QuestionGroup
            title="What kind of pet are you planning for?"
            options={petOptions}
            value={petType}
            onChange={setPetType}
          />
          <QuestionGroup
            title="What are you trying to do?"
            options={intentOptions}
            value={userIntent}
            onChange={setUserIntent}
          />
          <QuestionGroup
            title="How ready are you?"
            options={readinessOptions}
            value={readinessLevel}
            onChange={setReadinessLevel}
          />
        </div>
      </section>

      <section className="mt-8 rounded-md border border-line bg-mist p-5 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-pine" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay">Suggested next step</p>
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-ink">{result.primaryNextStep.title}</h2>
            <p className="mt-3 text-base leading-7 text-muted">{result.primaryNextStep.body}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={result.primaryNextStep.href}>
                {result.primaryNextStep.cta}
              </Button>
              <Button href={result.recommendedInternalPage} variant="secondary">
                Keep learning
              </Button>
            </div>
            {result.disclosureNeeded ? (
              <div className="mt-4">
                <DisclosureBanner compact />
              </div>
            ) : null}
          </div>

          <div className="rounded-md border border-line bg-white p-5">
            <div className="flex gap-3">
              <HeartHandshake className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Why this is value-first</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  If a live partner fits, we show it. If no live partner fits, we keep you inside
                  the educational flow and tell you what to verify before leaving PawPeaceGuide.
                </p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2">
              {[
                "No provider is described as best, cheapest, or guaranteed.",
                "Pending partners are shown as educational context, not live CTAs.",
                "Affiliate traffic goes through PawPeaceGuide tracking routes."
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <InsuranceDecisionGuide className="mt-8" />

      {liveProviders.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-ink">Relevant live partner path</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            This appears to fit the goal you selected and currently has an active PawPeaceGuide
            affiliate path. Review all terms directly with the partner before buying.
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {liveProviders.map((partner) =>
              isSupplementalPartner(partner) ? (
                <PartnerOfferCard key={partner.slug} partner={partner} pageSource="/find-my-path" />
              ) : (
                <ProviderCard key={partner.slug} provider={partner} compact pageSource="/find-my-path" emphasized />
              )
            )}
          </div>
        </section>
      ) : null}

      {result.pendingHelpfulProviders.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-ink">Helpful pending paths to know about</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            These partners are modeled because they may become useful lanes after approval. They
            are not presented as live affiliate clickouts yet.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.pendingHelpfulProviders.slice(0, 6).map((provider) => (
              <div key={provider.slug} className="rounded-md border border-line bg-white p-4 shadow-tight">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-clay">Pending</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{provider.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{provider.bestFitUseCases[0]}</p>
                <p className="mt-3 text-xs leading-5 text-muted">
                  Verify: {provider.verificationNeeded.slice(0, 2).join("; ")}.
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <MethodologyNote className="mt-8" />
    </div>
  );
}

function QuestionGroup<T extends string>({
  title,
  options,
  value,
  onChange
}: {
  title: string;
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0">
      <legend className="text-sm font-semibold text-ink">{title}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition ${
              value === option.value
                ? "border-pine bg-sky/45 text-ink"
                : "border-line bg-white text-muted hover:border-pine/40"
            }`}
          >
            <input
              type="radio"
              name={title}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function isSupplementalPartner(partner: Provider | PartnerOffer): partner is PartnerOffer {
  return partner.role === "supplemental";
}
