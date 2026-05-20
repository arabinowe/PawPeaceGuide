import { siteConfig } from "@/data/siteConfig";
import { getProviderBySlug, isProviderAffiliateConfigured } from "@/data/providers";
import { appendUtmToUrlServer } from "@/lib/utm";

const fallbackAffiliateUrls: Record<string, string> = {
  [siteConfig.providerTrackingSlugs.odie]:
    "https://www.awin1.com/cread.php?awinmid=68990&awinaffid=2902179",
  [siteConfig.supplementalTrackingSlugs.moodifypet]:
    "https://www.awin1.com/cread.php?awinmid=118489&awinaffid=2902179"
};

const envAffiliateUrls: Record<string, string | undefined> = {
  [siteConfig.providerTrackingSlugs.odie]:
    process.env.ODIE_AFFILIATE_URL ||
    process.env.PRIMARY_AFFILIATE_URL ||
    process.env.NEXT_PUBLIC_ODIE_AFFILIATE_URL ||
    process.env.NEXT_PUBLIC_PRIMARY_AFFILIATE_URL,
  [siteConfig.providerTrackingSlugs.theSwiftest]:
    process.env.SWIFTEST_AFFILIATE_URL || process.env.NEXT_PUBLIC_SWIFTEST_AFFILIATE_URL,
  [siteConfig.supplementalTrackingSlugs.moodifypet]:
    process.env.MOODIFYPET_AFFILIATE_URL || process.env.NEXT_PUBLIC_MOODIFYPET_AFFILIATE_URL
};

export function getProviderDestination(providerSlug: string, searchParams: URLSearchParams) {
  const provider = getProviderBySlug(providerSlug);

  if (!provider) {
    return null;
  }

  if (!isProviderAffiliateConfigured(provider)) {
    return "";
  }

  const destination = envAffiliateUrls[providerSlug] || fallbackAffiliateUrls[providerSlug] || "";

  if (!isValidAffiliateUrl(destination)) {
    return "";
  }

  if (!siteConfig.appendUtmToAffiliateLinks) {
    return destination;
  }

  return appendUtmToUrlServer(destination, searchParams);
}

function isValidAffiliateUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}
