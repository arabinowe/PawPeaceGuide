import { getPrimaryProvider, isProviderAffiliateConfigured } from "@/data/providers";

export function getAffiliateRedirectHref(providerSlug: string) {
  return `/go/${providerSlug}`;
}

export function getPrimaryOfferHref(fallbackHref = "/compare") {
  const provider = getPrimaryProvider();
  return provider && isProviderAffiliateConfigured(provider)
    ? getAffiliateRedirectHref(provider.slug)
    : fallbackHref;
}
