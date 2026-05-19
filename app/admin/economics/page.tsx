import { getBackupProviders, getPrimaryProvider } from "@/data/providers";
import {
  buildEconomicsScenario,
  economicsAssumptions
} from "@/lib/economics";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Internal Funnel Economics",
  description: "Internal PawPeaceGuide break-even planning assumptions.",
  path: "/admin/economics"
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1
});

export default function EconomicsPage() {
  const primaryProvider = getPrimaryProvider();
  const backupProviders = getBackupProviders();
  const scenarios = [
    buildEconomicsScenario({
      label: `${primaryProvider.name} primary offer - low case`,
      payout: economicsAssumptions.primaryOfferPayout,
      providerConversionRate: economicsAssumptions.assumedProviderConversionLow,
      providerClickoutRate: economicsAssumptions.assumedProviderClickoutLow
    }),
    buildEconomicsScenario({
      label: `${primaryProvider.name} primary offer - base case`,
      payout: economicsAssumptions.primaryOfferPayout,
      providerConversionRate: economicsAssumptions.assumedProviderConversionBase,
      providerClickoutRate: economicsAssumptions.assumedProviderClickoutBase
    }),
    buildEconomicsScenario({
      label: `${primaryProvider.name} primary offer - high case`,
      payout: economicsAssumptions.primaryOfferPayout,
      providerConversionRate: economicsAssumptions.assumedProviderConversionHigh,
      providerClickoutRate: economicsAssumptions.assumedProviderClickoutHigh
    }),
    buildEconomicsScenario({
      label: "Backup CPL offer - base case",
      payout: economicsAssumptions.backupLeadPayout,
      providerConversionRate: economicsAssumptions.assumedProviderConversionBase,
      providerClickoutRate: economicsAssumptions.assumedProviderClickoutBase
    })
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <div className="rounded-md border border-clay/30 bg-[#fff4ef] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
          Internal planning
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Funnel economics</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          Development-only planning page. This route is not linked in public navigation and should
          not be used as consumer-facing insurance guidance. Assumptions are placeholders until
          affiliate approval, payout rules, and paid social permissions are confirmed.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <MetricCard label="Expected CPC low" value={currencyFormatter.format(economicsAssumptions.expectedCpcLow)} />
        <MetricCard label="Expected CPC base" value={currencyFormatter.format(economicsAssumptions.expectedCpcBase)} />
        <MetricCard label="Expected CPC high" value={currencyFormatter.format(economicsAssumptions.expectedCpcHigh)} />
        <MetricCard
          label="Primary offer payout assumption"
          value={currencyFormatter.format(economicsAssumptions.primaryOfferPayout)}
        />
        <MetricCard
          label="Backup lead payout assumption"
          value={currencyFormatter.format(economicsAssumptions.backupLeadPayout)}
        />
        <MetricCard
          label="Base provider conversion"
          value={percentFormatter.format(economicsAssumptions.assumedProviderConversionBase)}
        />
      </div>

      <div className="mt-8 rounded-md border border-line bg-white p-5 shadow-tight">
        <h2 className="text-2xl font-semibold text-ink">Primary offer</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {primaryProvider.name} is configured as the primary offer. Public payout claim:{" "}
          {primaryProvider.publicPayoutClaim}. {primaryProvider.estimatedPayout}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-line bg-white shadow-tight">
        <div className="border-b border-line p-5">
          <h2 className="text-2xl font-semibold text-ink">Scenario math</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Cost per provider clickout target equals expected value per provider clickout. Break-even
            CPC equals visitor-to-provider-clickout rate multiplied by expected value per provider
            clickout.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Scenario</th>
                <th className="px-4 py-3 font-semibold">Assumed payout</th>
                <th className="px-4 py-3 font-semibold">Provider conversion</th>
                <th className="px-4 py-3 font-semibold">Visitor-to-clickout</th>
                <th className="px-4 py-3 font-semibold">EV per clickout</th>
                <th className="px-4 py-3 font-semibold">Cost per clickout target</th>
                <th className="px-4 py-3 font-semibold">Break-even CPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {scenarios.map((scenario) => (
                <tr key={scenario.label}>
                  <td className="px-4 py-3 font-medium text-ink">{scenario.label}</td>
                  <td className="px-4 py-3 text-muted">{currencyFormatter.format(scenario.payout)}</td>
                  <td className="px-4 py-3 text-muted">
                    {percentFormatter.format(scenario.providerConversionRate)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {percentFormatter.format(scenario.providerClickoutRate)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {currencyFormatter.format(scenario.expectedValuePerClickout)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {currencyFormatter.format(scenario.maxAffordableCostPerClickout)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {currencyFormatter.format(scenario.breakEvenCpc)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-md border border-line bg-white p-5 shadow-tight">
        <h2 className="text-2xl font-semibold text-ink">Backup offers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {backupProviders.map((provider) => (
            <div key={provider.slug} className="rounded-md bg-mist p-4">
              <p className="font-semibold text-ink">{provider.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Network: {provider.affiliateNetwork}. Commission type: {provider.commissionType}.
                Public payout claim: {provider.publicPayoutClaim}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-white p-5 shadow-tight">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-pine">{value}</p>
    </div>
  );
}
