"use client";

import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { getPrimaryProvider, isProviderAffiliateConfigured } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { getAffiliateRedirectHref } from "@/lib/affiliate";
import { trackFunnelEvent } from "@/lib/tracking";

type PrimaryOfferButtonProps = {
  children: React.ReactNode;
  pageSource: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  showDevelopmentWarning?: boolean;
  showDisclosure?: boolean;
};

export function PrimaryOfferButton({
  children,
  pageSource,
  variant = "primary",
  className,
  showDevelopmentWarning = false,
  showDisclosure = true
}: PrimaryOfferButtonProps) {
  const provider = getPrimaryProvider();
  const configured = isProviderAffiliateConfigured(provider);
  const href = configured ? getAffiliateRedirectHref(provider.slug) : "/compare";

  function onClick() {
    const params = new URLSearchParams(window.location.search);
    trackFunnelEvent(siteConfig.eventNames.primaryOfferClicked, {
      providerSlug: provider.slug,
      providerRole: provider.role,
      commissionType: provider.commissionType,
      campaignSource: params.get("utm_source") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
      utm_content: params.get("utm_content") ?? undefined,
      pageSource
    });
    trackFunnelEvent(siteConfig.eventNames.affiliateCtaClicked, {
      providerSlug: provider.slug,
      providerRole: provider.role,
      commissionType: provider.commissionType,
      pageSource
    });
  }

  return (
    <div>
      <Button href={href} variant={variant} className={className} onClick={onClick}>
        {children}
      </Button>
      {showDevelopmentWarning && !configured && process.env.NODE_ENV !== "production" ? (
        <p className="mt-2 text-xs leading-5 text-clay">
          Development placeholder: The Swiftest affiliate URL is not configured, so this CTA routes to /compare.
        </p>
      ) : null}
      {showDisclosure ? (
        <div className="mt-3">
          <DisclosureBanner compact />
        </div>
      ) : null}
    </div>
  );
}
