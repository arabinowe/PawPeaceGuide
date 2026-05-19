import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export function FeatureCard({ icon: Icon, title, body }: FeatureCardProps) {
  return (
    <div className="rounded-md border border-line bg-white p-5 shadow-tight">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky text-pine">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
