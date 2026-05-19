export const economicsAssumptions = {
  expectedCpcLow: 0.75,
  expectedCpcBase: 1.25,
  expectedCpcHigh: 2.0,
  primaryOfferPayout: 125,
  backupLeadPayout: 25,
  assumedProviderConversionLow: 0.02,
  assumedProviderConversionBase: 0.05,
  assumedProviderConversionHigh: 0.08,
  assumedProviderClickoutLow: 0.08,
  assumedProviderClickoutBase: 0.12,
  assumedProviderClickoutHigh: 0.18
};

export function expectedValuePerClickout(payout: number, providerConversionRate: number) {
  return payout * providerConversionRate;
}

export function maxAffordableCostPerClickout(payout: number, providerConversionRate: number) {
  return expectedValuePerClickout(payout, providerConversionRate);
}

export function landingVisitorValue(
  providerClickoutRate: number,
  payout: number,
  providerConversionRate: number
) {
  return providerClickoutRate * expectedValuePerClickout(payout, providerConversionRate);
}

export function breakEvenCpc(
  providerClickoutRate: number,
  payout: number,
  providerConversionRate: number
) {
  return landingVisitorValue(providerClickoutRate, payout, providerConversionRate);
}

export function buildEconomicsScenario({
  label,
  payout,
  providerConversionRate,
  providerClickoutRate
}: {
  label: string;
  payout: number;
  providerConversionRate: number;
  providerClickoutRate: number;
}) {
  const clickoutValue = expectedValuePerClickout(payout, providerConversionRate);

  return {
    label,
    payout,
    providerConversionRate,
    providerClickoutRate,
    expectedValuePerClickout: clickoutValue,
    maxAffordableCostPerClickout: clickoutValue,
    landingVisitorValue: landingVisitorValue(providerClickoutRate, payout, providerConversionRate),
    breakEvenCpc: breakEvenCpc(providerClickoutRate, payout, providerConversionRate)
  };
}
