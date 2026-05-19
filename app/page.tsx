import { Calculator, FileQuestion, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { CTABlock } from "@/components/CTABlock";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { GuideCard } from "@/components/GuideCard";
import { IntentPathRouter } from "@/components/IntentPathRouter";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { ProviderComparisonGrid } from "@/components/ProviderComparisonGrid";
import { guides } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: `${siteConfig.brandName} | ${siteConfig.tagline}`,
  description: "Plain-English pet insurance education, calculators, guides, and quote option comparisons.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <PageEventTracker page="/" />
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-18">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              {siteConfig.brandName}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-normal text-ink md:text-6xl">
              {siteConfig.heroLine}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{siteConfig.tagline}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/pet-parent-protection">Start the pet parent guide</Button>
              <Button href="/compare" variant="secondary">
                Compare quote options
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <PetImagePanel image={petImages.dogOwner} label="Plain-English pet insurance guidance" priority />
            <div className="rounded-md border border-line bg-white p-5 shadow-soft">
              <DisclosureBanner />
              <div className="mt-5 grid gap-3">
              {[
                {
                  title: "Quiz",
                  body: "A quick shopping profile without collecting full insurance applications.",
                  Icon: FileQuestion
                },
                {
                  title: "Calculator",
                  body: "A rough estimate for hypothetical vet bill tradeoffs.",
                  Icon: Calculator
                },
                {
                  title: "Compare",
                  body: "Provider cards that can be updated with approved affiliate links.",
                  Icon: ShieldCheck
                }
                ].map(({ title, body, Icon }) => (
                  <div key={title} className="rounded-md bg-mist p-4">
                    <Icon className="h-5 w-5 text-pine" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Money page preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">Compare pet insurance quote options</h2>
            </div>
            <Button href="/compare" variant="secondary">
              View comparison
            </Button>
          </div>
          <div className="mt-6">
            <ProviderComparisonGrid compact limit={2} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <CTABlock
          eyebrow="Paid traffic path"
          title="Main Facebook ad destination"
          body="Send broad happy-pet creative to the dog-and-cat pre-sell page, then guide users into the quiz, calculator, and The Swiftest comparison handoff."
          primaryHref="/pet-parent-protection"
          primaryLabel="Open pet parent page"
          secondaryHref="/quiz"
          secondaryLabel="Start quiz"
        />
      </section>

      <IntentPathRouter pageSource="/home-intent-router" className="mx-auto max-w-6xl px-5 pb-12" />

      <section className="bg-mist py-12">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Guides</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">SEO and retargeting articles</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, 3).map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
