import { Fragment } from "react";
import { ArrowRight, BookOpenCheck, Calculator, FileSearch, ShieldCheck } from "lucide-react";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { UTMLink } from "@/components/UTMLink";
import { siteConfig } from "@/data/siteConfig";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pet Insurance Blog",
  description:
    "Guided PawPeaceGuide articles built for organic pet insurance research, comparison checklists, and quote-readiness education.",
  path: "/blog"
});

const posts = [
  {
    href: "/blog/pet-insurance-comparison-checklist",
    title: "The Pet Insurance Comparison Checklist",
    description:
      "A guided, linkable walkthrough for dog and cat owners who want to compare quote options without getting stuck on premium alone.",
    label: "Start here",
    icon: BookOpenCheck
  },
  {
    href: "/guides/how-to-compare-pet-insurance",
    title: "How to Compare Pet Insurance",
    description:
      "A shorter guide to deductibles, reimbursement rates, annual limits, exclusions, and waiting periods.",
    label: "Guide",
    icon: FileSearch
  },
  {
    href: "/calculator",
    title: "Vet Bill Calculator",
    description:
      "Model rough premium, deductible, reimbursement, and out-of-pocket tradeoffs before quote pages.",
    label: "Tool",
    icon: Calculator
  }
];

export default function BlogIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              Organic education funnel
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-ink md:text-6xl">
              Pet insurance research, without the sales fog.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              These articles are built for search, sharing, and careful comparison. Start with
              the guided checklist, then use the quiz or calculator when you are ready to compare
              quote options.
            </p>
            <div className="mt-6">
              <DisclosureBanner compact />
            </div>
          </div>
          <PetImagePanel image={petImages.catHome} label="Organic pet insurance education" priority />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Fragment key={post.href}>
              <UTMLink
                href={post.href}
                className="group rounded-md border border-line bg-white p-5 shadow-tight transition hover:-translate-y-0.5 hover:border-pine/40 hover:shadow-soft"
              >
                <post.icon className="h-5 w-5 text-pine" aria-hidden="true" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                  {post.label}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-ink">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine">
                  Read more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </UTMLink>
              {index === 1 ? (
                <AdSenseUnit
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
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-md border border-line bg-mist p-5 md:p-7">
            <ShieldCheck className="h-5 w-5 text-pine" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-ink">Why this blog exists</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              Paid traffic needs a short path. Organic readers often need a more complete one.
              The blog gives PawPeaceGuide a separate education-first funnel that can earn search
              visibility and natural links while still guiding high-intent readers toward the quiz,
              calculator, comparison page, and eventual third-party clickout.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
