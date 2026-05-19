import { CheckCircle2, ClipboardCheck, PawPrint } from "lucide-react";
import { Button } from "@/components/Button";
import { MethodologyNote } from "@/components/MethodologyNote";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PartnerOfferCard } from "@/components/PartnerOfferCard";
import { PetImagePanel, getPetImageForPath } from "@/components/PetImage";
import { ProviderCard } from "@/components/ProviderCard";
import { QuoteReadinessChecklist } from "@/components/QuoteReadinessChecklist";
import { routeIntent } from "@/lib/intentRouting";
import type { LanePageConfig } from "@/data/lanePages";

export function LanePage({ page }: { page: LanePageConfig }) {
  const routing = routeIntent({
    petType: page.petType,
    userIntent: page.userIntent,
    readinessLevel:
      page.userIntent === "wellness or comfort products" || page.userIntent === "other pet type"
        ? "just researching"
        : "comparing soon",
    wantsComparison: page.userIntent === "compare multiple options",
    wantsWellnessExtras: page.userIntent === "wellness or comfort products"
  });
  const image = getPetImageForPath(page.slug);
  const liveProviders = routing.matchingLiveProviders;
  const showQuoteReadyChecklist =
    page.userIntent !== "wellness or comfort products" && page.petType !== "other";

  return (
    <>
      <PageEventTracker page={`/${page.slug}`} />
      <section className="border-b border-line bg-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">{page.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">{page.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted">{page.intro}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={routing.primaryNextStep.href}>{routing.primaryNextStep.cta}</Button>
              <Button href={page.primaryInternalHref} variant="secondary">
                {page.primaryInternalLabel}
              </Button>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{page.readinessPrompt}</p>
          </div>
          <div className="grid gap-4">
            <PetImagePanel image={image} label={page.title} priority />
            <div className="rounded-md border border-line bg-white p-5 shadow-tight">
              <div className="flex gap-3">
                <PawPrint className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">Calm promise</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    We will show a live partner only when it fits the goal. If no partner fits, we
                    keep you on an educational path instead of forcing a clickout.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">
                Educational and affiliate-supported. Partner disclosures appear near live partner links.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">What matters first</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">Move at your own pace.</h2>
            <p className="mt-3 text-base leading-7 text-muted">
              A good next step should make the decision feel clearer, not more urgent.
            </p>
          </div>
          <div className="grid gap-3">
            {page.calmPoints.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-line bg-white p-4 shadow-tight">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-md border border-line bg-mist p-5 md:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Suggested next step</p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">{routing.primaryNextStep.title}</h2>
                <p className="mt-3 text-base leading-7 text-muted">{routing.primaryNextStep.body}</p>
                <div className="mt-5">
                  <Button href={routing.primaryNextStep.href}>{routing.primaryNextStep.cta}</Button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.verifyItems.map((item) => (
                  <div key={item} className="rounded-md border border-line bg-white p-4">
                    <ClipboardCheck className="h-5 w-5 text-pine" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {liveProviders.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Relevant live partner</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Available when it fits your goal</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            This partner is live through PawPeaceGuide. Review all details directly before buying
            a policy or product.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {liveProviders.map((partner) =>
              partner.role === "supplemental" ? (
                <PartnerOfferCard key={partner.slug} partner={partner} pageSource={`/${page.slug}`} />
              ) : (
                <ProviderCard key={partner.slug} provider={partner} compact emphasized pageSource={`/${page.slug}`} />
              )
            )}
          </div>
        </section>
      ) : null}

      {routing.pendingHelpfulProviders.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Pending helpful paths</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Modeled for future approval</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            These partners may become relevant after affiliate approval. For now, they are shown as
            context only, not as live clickout options.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routing.pendingHelpfulProviders.slice(0, 6).map((provider) => (
              <div key={provider.slug} className="rounded-md border border-line bg-white p-4 shadow-tight">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-clay">Pending</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{provider.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{provider.bestFitUseCases[0]}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {showQuoteReadyChecklist ? (
        <QuoteReadinessChecklist pageSource={`/${page.slug}-quote-ready`} compact className="mx-auto max-w-6xl px-5 py-12" />
      ) : null}

      <MethodologyNote className="mx-auto max-w-6xl px-5 pb-12" />
    </>
  );
}
