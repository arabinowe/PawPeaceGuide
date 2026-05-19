import { siteConfig } from "@/data/siteConfig";
import { getPrimaryProvider, getProviderBySlug, isProviderAffiliateConfigured } from "@/data/providers";
import { appendUtmToUrlServer } from "@/lib/utm";

export function getAffiliateRedirectHref(providerSlug: string) {
  return `/go/${providerSlug}`;
}

export function getPrimaryOfferHref(fallbackHref = "/compare") {
  const provider = getPrimaryProvider();
  return provider && isProviderAffiliateConfigured(provider)
    ? getAffiliateRedirectHref(provider.slug)
    : fallbackHref;
}

export function getProviderDestination(providerSlug: string, searchParams: URLSearchParams) {
  const provider = getProviderBySlug(providerSlug);

  if (!provider) {
    return null;
  }

  if (!isProviderAffiliateConfigured(provider)) {
    return "";
  }

  if (!siteConfig.appendUtmToAffiliateLinks) {
    return provider.affiliateUrl;
  }

  return appendUtmToUrlServer(provider.affiliateUrl, searchParams);
}
