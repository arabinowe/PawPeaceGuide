import Link from "next/link";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { CTABlock } from "@/components/CTABlock";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { EndOfPathQuoteNudge } from "@/components/EndOfPathQuoteNudge";
import { GuideCtaButtons } from "@/components/GuideCtaButtons";
import { IntentPathRouter } from "@/components/IntentPathRouter";
import { JsonLd } from "@/components/JsonLd";
import { PageEventTracker } from "@/components/PageEventTracker";
import { PetImagePanel, getPetImageForPath } from "@/components/PetImage";
import { RelatedGuideLink } from "@/components/RelatedGuideLink";
import { getRelatedGuides } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl } from "@/lib/seo";
import type { Guide } from "@/lib/types";

export function ArticleLayout({ guide }: { guide: Guide }) {
  const image = getPetImageForPath(guide.slug);
  const relatedGuides = getRelatedGuides(guide);
  const pagePath = `/guides/${guide.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const inferredPetType = inferGuidePetType(guide.slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/pawpeaceguide-logo.png")
      }
    },
    mainEntityOfPage: pageUrl,
    url: pageUrl
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: absoluteUrl("/guides")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: pageUrl
      }
    ]
  };
  const faqSchema =
    guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          }))
        }
      : null;

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <PageEventTracker page={pagePath} eventName={siteConfig.eventNames.guidePageViewed} />
      <JsonLd data={faqSchema ? [articleSchema, faqSchema, breadcrumbSchema] : [articleSchema, breadcrumbSchema]} />

      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-clay">
              <Link href="/" className="transition hover:text-pine">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/guides" className="transition hover:text-pine">Guides</Link>
            </nav>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">{guide.intro}</p>
            <p className="mt-4 text-sm font-medium text-muted">
              {guide.category} · {guide.readingTimeMinutes} min read · Updated {guide.dateModified}
            </p>
            {guide.affiliateDisclosureRequired ? (
              <div className="mt-6">
                <DisclosureBanner compact />
              </div>
            ) : null}
          </div>
          <PetImagePanel image={image} label="Plain-English pet insurance guide" priority unframed />
        </div>
      </div>

      <section className="mt-8 rounded-md border border-line bg-white p-5 shadow-tight">
        <h2 className="text-2xl font-semibold text-ink">Short answer</h2>
        <p className="mt-3 text-base leading-8 text-muted">{guide.shortAnswer}</p>
      </section>

      <section className="mt-6 rounded-md border border-line bg-mist p-5">
        <h2 className="text-xl font-semibold text-ink">Key takeaways</h2>
        <ul className="mt-4 space-y-3">
          {guide.keyTakeaways.map((takeaway) => (
            <li key={takeaway} className="text-base leading-7 text-muted">
              {takeaway}
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Table of contents" className="mt-8 rounded-md border border-line bg-white p-5">
        <p className="text-sm font-semibold text-ink">In this guide</p>
        <ol className="mt-3 space-y-2">
          {guide.sections.map((section) => (
            <li key={section.id}>
              <a className="text-sm font-medium text-pine" href={`#${section.id}`}>
                {section.heading}
              </a>
            </li>
          ))}
          <li>
            <a className="text-sm font-medium text-pine" href="#example-scenario">
              Example scenario
            </a>
          </li>
          <li>
            <a className="text-sm font-medium text-pine" href="#what-to-compare">
              What to compare
            </a>
          </li>
          <li>
            <a className="text-sm font-medium text-pine" href="#common-mistakes">
              Common mistakes
            </a>
          </li>
          {guide.faqs.length > 0 ? (
            <li>
              <a className="text-sm font-medium text-pine" href="#faqs">
                FAQs
              </a>
            </li>
          ) : null}
        </ol>
      </nav>

      <div className="mt-8 space-y-10">
        {guide.sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            {index === 0 ? (
              <div className="mt-6">
                <CTABlock
                  eyebrow="Next step"
                  title="Want a calmer way to compare?"
                  body="Start the 60-second pet insurance check, then use the calculator or comparison page to prepare better questions before visiting third-party provider quote pages."
                  primaryHref="/quiz"
                  primaryLabel="Start the 60-second check"
                  secondaryHref="/calculator"
                  secondaryLabel="Use calculator"
                />
              </div>
            ) : null}
            {index === 1 ? (
              <AdSenseUnit
                slot={siteConfig.googleAdSenseSlots.inArticle}
                format="inArticle"
                label="Advertisement"
                className="bg-white/60"
              />
            ) : null}
          </section>
        ))}
      </div>

      <section id="example-scenario" className="mt-10 scroll-mt-24 rounded-md border border-line bg-white p-5 shadow-tight">
        <h2 className="text-2xl font-semibold text-ink">{guide.exampleScenario.title}</h2>
        <div className="mt-4 space-y-4">
          {guide.exampleScenario.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section id="what-to-compare" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-ink">What to compare</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {guide.whatToCompare.map((item) => (
            <li key={item} className="rounded-md border border-line bg-white p-4 text-sm leading-6 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="common-mistakes" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-ink">Common mistakes</h2>
        <ul className="mt-4 space-y-3">
          {guide.commonMistakes.map((mistake) => (
            <li key={mistake} className="rounded-md bg-mist p-4 text-sm leading-6 text-muted">
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      {guide.faqs.length > 0 ? (
        <section id="faqs" className="mt-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-ink">Questions pet owners ask</h2>
          <div className="mt-4 space-y-4">
            {guide.faqs.map((faq) => (
              <div key={faq.question} className="rounded-md border border-line bg-white p-5">
                <h3 className="text-lg font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-ink">Related guides</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {relatedGuides.map((relatedGuide) => (
            <RelatedGuideLink key={relatedGuide.slug} fromSlug={guide.slug} toSlug={relatedGuide.slug}>
              <p className="text-sm font-semibold text-ink">{relatedGuide.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{relatedGuide.summary}</p>
            </RelatedGuideLink>
          ))}
        </div>
        <Link href="/guides" className="mt-5 inline-block text-sm font-semibold text-pine">
          Back to all pet insurance guides
        </Link>
      </section>

      <AdSenseUnit
        slot={siteConfig.googleAdSenseSlots.multiplex}
        format="multiplex"
        label="Advertisement"
        className="bg-white/60"
      />

      <div className="mt-10">
        <GuideCtaButtons guideSlug={guide.slug} />
      </div>

      <IntentPathRouter pageSource={`/guides/${guide.slug}-intent-router`} className="mt-8" />

      {guide.disclaimerRequired ? (
        <p className="mt-8 rounded-md border border-line bg-mist px-4 py-3 text-sm leading-6 text-muted">
          {siteConfig.legalDisclaimer}
        </p>
      ) : null}

      <EndOfPathQuoteNudge pageSource={`${pagePath}-end-nudge`} petType={inferredPetType} />
    </article>
  );
}

function inferGuidePetType(slug: string) {
  if (slug.includes("cat") || slug.includes("kitten")) return "cat";
  if (
    slug.includes("dog") ||
    slug.includes("puppy") ||
    slug.includes("labrador") ||
    slug.includes("retriever") ||
    slug.includes("shepherd") ||
    slug.includes("bulldog")
  ) {
    return "dog";
  }

  return "unknown";
}
