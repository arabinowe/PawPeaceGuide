import { HeartHandshake } from "lucide-react";
import { routeIntent } from "@/lib/intentRouting";

export function MethodologyNote({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="how-we-choose">
      <div className="rounded-md border border-line bg-white p-5 shadow-tight">
        <div className="flex gap-3">
          <HeartHandshake className="mt-1 h-5 w-5 shrink-0 text-pine" aria-hidden="true" />
          <div>
            <h2 id="how-we-choose" className="text-xl font-semibold text-ink">
              How we choose what to show
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{routeIntent().methodologyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
