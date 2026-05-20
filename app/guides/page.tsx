import { Fragment } from "react";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { AdSenseSearchBox } from "@/components/AdSenseSearchBox";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { getGuidesByCategory, guideCategories, guides, plannedGuideTopics } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pet Insurance Guides",
  description:
    "Plain-English pet insurance guides for comparing quote options, deductibles, wellness plans, and coverage terms.",
  path: "/guides"
});

export default function GuidesIndexPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pet Insurance Guides",
    url: absoluteUrl("/guides"),
    description:
      "Plain-English pet insurance guides for dog owners, cat owners, senior pets, policy fine print, and vet bill planning.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: absoluteUrl(`/guides/${guide.slug}`)
        }))
    }
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Guides</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Pet insurance education library</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
              Pet insurance explained before the stressful vet bill moment. Use these guides to prepare better
              questions before comparing third-party provider quote options.
            </p>
          </div>
          <PetImagePanel image={petImages.calmTrust} label="Helpful dog and cat insurance guides" priority />
        </div>
        <AdSenseSearchBox className="mt-8" />
        <div className="mt-10 space-y-10">
        {guideCategories.map((category, index) => {
          const categoryGuides = getGuidesByCategory(category);
          const plannedTopics = plannedGuideTopics[category] || [];

          return (
            <section key={category} aria-labelledby={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}>
              <div className="flex flex-col justify-between gap-3 border-b border-line pb-3 md:flex-row md:items-end">
                <div>
                  <h2 id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`} className="text-2xl font-semibold text-ink">
                    {category}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {categoryGuides.length > 0
                      ? "Published plain-English guides."
                      : "Planned topics. These are not published until they are useful enough to stand alone."}
                  </p>
                </div>
              </div>

              {categoryGuides.length > 0 ? (
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {categoryGuides.map((guide, guideIndex) => (
                    <Fragment key={guide.slug}>
                      <GuideCard guide={guide} />
                      {index === 0 && guideIndex === 2 ? (
                        <AdSenseUnit
                          key="guides-in-feed-ad"
                          slot={siteConfig.googleAdSenseSlots.inFeed}
                          format="inFeed"
                          layoutKey={siteConfig.googleAdSenseSlots.inFeedLayoutKey}
                          label="Advertisement"
                          className="my-0 rounded-md border border-line bg-white px-3 shadow-tight"
                        />
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              ) : null}

              {plannedTopics.length > 0 ? (
                <div className="mt-5 rounded-md border border-dashed border-line bg-white p-5">
                  <p className="text-sm font-semibold text-ink">Publishing queue</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
                    {plannedTopics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {index === 1 ? (
                <AdSenseUnit
                  slot={siteConfig.googleAdSenseSlots.multiplex}
                  format="multiplex"
                  label="Advertisement"
                  className="bg-white/60"
                />
              ) : null}
            </section>
          );
        })}
        </div>
      </section>
    </>
  );
}
