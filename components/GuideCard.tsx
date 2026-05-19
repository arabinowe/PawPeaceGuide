import { BookOpen } from "lucide-react";
import { Button } from "@/components/Button";
import type { Guide } from "@/lib/types";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-white p-5 shadow-tight">
      <BookOpen className="h-5 w-5 text-pine" aria-hidden="true" />
      <h3 className="mt-3 text-lg font-semibold text-ink">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{guide.description}</p>
      <div className="mt-4">
        <Button href={`/guides/${guide.slug}`} variant="secondary" className="w-full" icon={false}>
          Read guide
        </Button>
      </div>
    </article>
  );
}
