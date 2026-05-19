"use client";

import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { UTMLink } from "@/components/UTMLink";
import { isProviderAffiliateConfigured } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { getAffiliateRedirectHref } from "@/lib/affiliate";
import { trackFunnelEvent } from "@/lib/tracking";
import type { Provider } from "@/lib/types";

type ProviderCardProps = {
  provider: Provider;
  compact?: boolean;
  emphasized?: boolean;
  pageSource?: string;
};

export function ProviderCard({
  provider,
  compact = false,
  emphasized = false,
  pageSource = "provider_card"
}: ProviderCardProps) {
  const affiliateConfigured = isProviderAffiliateConfigured(provider);

  useEffect(() => {
    trackFunnelEvent(siteConfig.eventNames.providerCardViewed, {
      providerSlug: provider.slug,
      providerRole: provider.role,
      commissionType: provider.commissionType,
      pageSource
    });
    if (provider.role === "primary") {
      trackFunnelEvent(siteConfig.eventNames.primaryOfferViewed, {
        providerSlug: provider.slug,
        providerRole: provider.role,
        commissionType: provider.commissionType,
        pageSource
      });
    }
  }, [pageSource, provider.commissionType, provider.role, provider.slug]);

  function handleClick() {
    const params = new URLSearchParams(window.location.search);
    const offerEvent =
      provider.role === "primary"
        ? siteConfig.eventNames.primaryOfferClicked
        : siteConfig.eventNames.backupOfferClicked;

    trackFunnelEvent(offerEvent, {
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
    <article
      className={`flex h-full flex-col rounded-md bg-white p-5 shadow-tight ${
        emphasized ? "border-2 border-pine" : "border border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
            {provider.role === "primary" ? "Primary comparison option" : "Backup quote option"}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-ink">{provider.name}</h3>
        </div>
        <span className="rounded-md bg-mist px-3 py-1 text-xs font-semibold text-pine">
          Priority {provider.priority}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-pine">{provider.bestForLabel}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{provider.shortDescription}</p>

      {!compact ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-ink">Features to review</p>
            <ul className="mt-2 space-y-2">
              {provider.pros.map((pro) => (
                <li key={pro} className="flex gap-2 text-sm leading-5 text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Confirm directly</p>
            <ul className="mt-2 space-y-2">
              {provider.cons.map((con) => (
                <li key={con} className="flex gap-2 text-sm leading-5 text-muted">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <UTMLink
          href={getAffiliateRedirectHref(provider.slug)}
          onClick={handleClick}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          ariaLabel={`Visit third-party quote page for ${provider.name}`}
        >
          <span>{provider.ctaText}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </UTMLink>
        <p className="mt-2 text-center text-xs text-muted">
          {affiliateConfigured
            ? "You will leave PawPeaceGuide for a third-party provider site."
            : "Partner link placeholder. Add the approved affiliate URL before sending paid traffic."}
        </p>
        <div className="mt-4">
          <DisclosureBanner compact text={provider.disclosureText} />
        </div>
      </div>
    </article>
  );
}
