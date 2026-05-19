import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getGuide } from "@/data/guides";
import { createMetadata } from "@/lib/seo";

const guide = getGuide("pre-existing-conditions-pet-insurance");

export const metadata = createMetadata({
  title: guide?.title ?? "Pet Insurance Guide",
  description: guide?.description ?? "Plain-English pet insurance education.",
  path: "/guides/pre-existing-conditions-pet-insurance"
});

export default function Page() {
  if (!guide) notFound();
  return <ArticleLayout guide={guide} />;
}
