import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import {
  getGuideCategoryBySlug,
  getGuideCategorySlug,
  getGuidesByCategory,
  guideCategories
} from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

const categoryDescriptions = {
  "Pet Insurance Basics":
    "Foundational pet insurance guides for understanding costs, coverage, timing, quote options, and policy tradeoffs before choosing a provider path.",
  "Dog Insurance Guides":
    "Dog-focused pet insurance guides for puppies, senior dogs, surgery planning, emergency bills, and breed-related comparison questions.",
  "Cat Insurance Guides":
    "Cat-focused pet insurance guides for indoor cats, kittens, senior cats, dental questions, emergency bills, and illness planning.",
  "Vet Bill Planning":
    "Vet bill planning guides for comparing insurance, emergency savings, hypothetical bill math, and calmer financial preparedness.",
  "Policy Fine Print":
    "Plain-English explanations of pet insurance deductibles, reimbursement rates, annual limits, waiting periods, exclusions, and pre-existing condition rules.",
  "Breed-Specific Guides":
    "Breed and life-stage pet insurance guides for owners comparing common questions before reviewing provider quote pages."
} as const;

export function generateStaticParams() {
  return guideCategories.map((category) => ({
    categorySlug: getGuideCategorySlug(category)
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getGuideCategoryBySlug(categorySlug);

  if (!category) {
    return createMetadata({
      title: "Pet Insurance Guide Category",
      description: "Plain-English pet insurance education by topic.",
      path: `/guides/category/${categorySlug}`,
      noIndex: true,
      noFollow: true
    });
  }

  return createMetadata({
    title: `${category} | Pet Insurance Guides`,
    description: categoryDescriptions[category],
    path: `/guides/category/${categorySlug}`
  });
}

export default async function GuideCategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getGuideCategoryBySlug(categorySlug);

  if (!category) notFound();

  const categoryGuides = getGuidesByCategory(category);
  const pageUrl = absoluteUrl(`/guides/category/${categorySlug}`);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} | PawPeaceGuide`,
    url: pageUrl,
    description: categoryDescriptions[category],
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryGuides.map((guide, index) => ({
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
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-clay">
          <Link href="/" className="transition hover:text-pine">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/guides" className="transition hover:text-pine">Guides</Link>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-clay">Guide category</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">{category}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{categoryDescriptions[category]}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
        <div className="mt-10 rounded-md border border-line bg-mist p-5">
          <p className="text-sm font-semibold text-ink">Need the hands-on comparison tool?</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            After reading, use the PawPeaceGuide quote workspace to compare real provider quote
            terms side by side without creating an account.
          </p>
          <Link href="/quote-workspace" className="mt-4 inline-block text-sm font-semibold text-pine">
            Open quote workspace
          </Link>
        </div>
      </section>
    </>
  );
}
