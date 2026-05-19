import { CTABlock } from "@/components/CTABlock";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { GuideCtaButtons } from "@/components/GuideCtaButtons";
import { siteConfig } from "@/data/siteConfig";
import type { Guide } from "@/lib/types";

export function ArticleLayout({ guide }: { guide: Guide }) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <div className="rounded-md border border-line bg-white p-5 shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Pet insurance guide</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{guide.intro}</p>
        <div className="mt-6">
          <DisclosureBanner />
        </div>
      </div>

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
                  title="Compare with a checklist, not a hunch."
                  body="Use the quiz or calculator to prepare better questions before visiting third-party provider quote pages."
                  primaryHref="/quiz"
                  primaryLabel="Start the 60-second quiz"
                  secondaryHref="/calculator"
                  secondaryLabel="Use calculator"
                />
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-10">
        <GuideCtaButtons guideSlug={guide.slug} />
      </div>

      <p className="mt-8 rounded-md border border-line bg-mist px-4 py-3 text-sm leading-6 text-muted">
        {siteConfig.legalDisclaimer}
      </p>
    </article>
  );
}
