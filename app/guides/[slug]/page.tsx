import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getGuide, guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return createMetadata({
      title: "Pet Insurance Guide",
      description: "Plain-English pet insurance education.",
      path: `/guides/${slug}`,
      noIndex: true,
      noFollow: true
    });
  }

  return createMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  return <ArticleLayout guide={guide} />;
}
