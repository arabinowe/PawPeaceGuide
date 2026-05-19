import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getGuide } from "@/data/guides";
import { createMetadata } from "@/lib/seo";

const guide = getGuide("pet-insurance-vs-wellness-plan");

export const metadata = createMetadata({
  title: guide?.title ?? "Pet Insurance Guide",
  description: guide?.description ?? "Plain-English pet insurance education.",
  path: "/guides/pet-insurance-vs-wellness-plan"
});

export default function Page() {
  if (!guide) notFound();
  return <ArticleLayout guide={guide} />;
}
