import Link from "next/link";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { AdSenseSearchBox } from "@/components/AdSenseSearchBox";
import { JsonLd } from "@/components/JsonLd";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { glossaryTerms } from "@/data/glossary";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pet Insurance Glossary",
  description:
    "Plain-English definitions for pet insurance terms like premium, deductible, reimbursement rate, annual limit, waiting period, and exclusions.",
  path: "/glossary"
});

export default function GlossaryPage() {
  const glossaryUrl = absoluteUrl("/glossary");
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Pet Insurance Glossary",
    url: glossaryUrl,
    description: "Plain-English pet insurance definitions from PawPeaceGuide.",
    hasDefinedTerm: glossaryTerms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.definition,
      url: `${glossaryUrl}#${term.slug}`
    }))
  };

  return (
    <>
      <PageEventTracker page="/glossary" eventName={siteConfig.eventNames.glossaryViewed} />
      <JsonLd data={schema} />
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Glossary</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">
              Pet insurance terms in plain English
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
              Quick definitions for the policy words that matter when you compare quote options.
              Terms vary by provider, so always review details directly with the provider.
            </p>
          </div>
          <PetImagePanel image={petImages.catHome} label="Plain-English pet insurance definitions" priority />
        </div>

        <nav aria-label="Glossary terms" className="mt-8 rounded-md border border-line bg-white p-5">
          <p className="text-sm font-semibold text-ink">Jump to a term</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {glossaryTerms.map((term) => (
              <a
                key={term.slug}
                href={`#${term.slug}`}
                className="rounded-md border border-line px-3 py-2 text-sm font-medium text-pine transition hover:bg-mist"
              >
                {term.term}
              </a>
            ))}
          </div>
        </nav>

        <AdSenseSearchBox className="mt-6" />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {glossaryTerms.map((term) => (
            <section key={term.slug} id={term.slug} className="scroll-mt-24 rounded-md border border-line bg-white p-5 shadow-tight">
              <h2 className="text-xl font-semibold text-ink">{term.term}</h2>
              <p className="mt-3 text-base leading-7 text-muted">{term.definition}</p>
            </section>
          ))}
        </div>

        <AdSenseUnit
          slot={siteConfig.googleAdSenseSlots.display}
          format="display"
          label="Advertisement"
          className="bg-white/60"
        />

        <div className="mt-10 rounded-md border border-line bg-mist p-5">
          <h2 className="text-2xl font-semibold text-ink">Next step</h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Once the terms make sense, use the quiz, calculator, or comparison page to prepare
            better questions before visiting third-party quote pages.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link className="rounded-md bg-pine px-5 py-3 text-center text-sm font-semibold text-white" href="/quiz">
              Start the 60-second check
            </Link>
            <Link className="rounded-md border border-pine/25 bg-white px-5 py-3 text-center text-sm font-semibold text-pine" href="/compare">
              Compare quote options
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
