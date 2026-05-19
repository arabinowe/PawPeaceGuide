import { ProviderCard } from "@/components/ProviderCard";
import { isProviderAffiliateConfigured, providers } from "@/data/providers";

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
  const configuredBackupProviders = filteredProviders.filter(isProviderAffiliateConfigured);
  const publicProviders =
    role === "backup"
      ? configuredBackupProviders.length > 0
        ? configuredBackupProviders
        : filteredProviders
      : filteredProviders;
  const visibleProviders =
    typeof limit === "number" ? publicProviders.slice(0, limit) : publicProviders;

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
