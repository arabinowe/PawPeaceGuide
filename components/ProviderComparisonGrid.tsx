import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/data/providers";

type ProviderComparisonGridProps = {
  compact?: boolean;
  limit?: number;
  role?: "primary" | "backup";
  emphasizePrimary?: boolean;
  pageSource?: string;
};

export function ProviderComparisonGrid({
  compact = false,
  limit,
  role,
  emphasizePrimary = false,
  pageSource = "provider_grid"
}: ProviderComparisonGridProps) {
  const filteredProviders = role ? providers.filter((provider) => provider.role === role) : providers;
  const visibleProviders =
    typeof limit === "number" ? filteredProviders.slice(0, limit) : filteredProviders;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {visibleProviders.map((provider) => (
        <ProviderCard
          key={provider.slug}
          provider={provider}
          compact={compact}
          emphasized={emphasizePrimary && provider.role === "primary"}
          pageSource={pageSource}
        />
      ))}
    </div>
  );
}
