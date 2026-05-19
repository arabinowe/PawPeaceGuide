import { GuideCard } from "@/components/GuideCard";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pet Insurance Guides",
  description:
    "Plain-English pet insurance guides for comparing quote options, deductibles, wellness plans, and coverage terms.",
  path: "/guides"
});

export default function GuidesIndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Guides</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Pet insurance education library</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
        Use these guides to prepare better questions before comparing third-party provider quote options.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </section>
  );
}
