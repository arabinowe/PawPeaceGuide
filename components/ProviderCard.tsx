"use client";

import { CheckCircle2, ClipboardCheck, ExternalLink, Info } from "lucide-react";
import { useEffect } from "react";
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
  const offerLabel =
    provider.role === "primary"
      ? "Current live quote option"
      : affiliateConfigured
        ? "Approved provider option"
        : "Pending helpful option";
  const statusText = affiliateConfigured
    ? "Available option"
    : provider.role === "primary"
      ? "Preparing link"
      : "Comparison guide";
  const ctaHref = affiliateConfigured
    ? getAffiliateRedirectHref(provider.slug)
    : provider.role === "primary"
      ? "/ready-to-compare"
      : "/find-my-path";
  const ctaText = affiliateConfigured
    ? provider.ctaText
    : provider.role === "primary"
      ? "Use quote-ready checklist"
      : "Find your path";

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
    const pendingPayload = {
      providerSlug: provider.slug,
      providerRole: provider.role,
      commissionType: provider.commissionType,
      campaignSource: params.get("utm_source") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
      utm_content: params.get("utm_content") ?? undefined,
      pageSource,
      linkStatus: "pending"
    };

    if (!affiliateConfigured) {
      trackFunnelEvent(siteConfig.eventNames.guideCtaClicked, pendingPayload);
      return;
    }

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
            {offerLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-ink">{provider.name}</h3>
        </div>
        <span
          className={`rounded-md px-3 py-1 text-xs font-semibold ${
            affiliateConfigured ? "bg-pine text-white" : "bg-mist text-pine"
          }`}
        >
          {statusText}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-pine">{provider.bestForLabel}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{provider.shortDescription}</p>
      <div className="mt-4 grid gap-3 rounded-md border border-line bg-mist p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-clay">Good fit for</p>
          <p className="mt-1 text-sm leading-6 text-muted">{provider.bestFitUseCases[0]}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-clay">Pet types</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            {provider.supportedPetTypes
              .map((type) => (type === "unknown" ? "Verify directly" : type))
              .join(", ")}
          </p>
        </div>
        {!affiliateConfigured ? (
          <p className="text-xs leading-5 text-muted">
            This partner is modeled for education and future routing, but its affiliate link is not live yet.
          </p>
        ) : null}
      </div>

      {!compact ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-ink">Why it may fit</p>
            <ul className="mt-2 space-y-2">
              {provider.bestFitUseCases.slice(0, 3).map((pro) => (
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
              {provider.verificationNeeded.slice(0, 3).map((con) => (
                <li key={con} className="flex gap-2 text-sm leading-5 text-muted">
                  <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {compact ? (
        <div className="mt-4 flex gap-2 rounded-md bg-mist px-3 py-2 text-xs leading-5 text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-pine" aria-hidden="true" />
          <span>Verify coverage, exclusions, waiting periods, reimbursement, and state availability directly.</span>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <UTMLink
          href={ctaHref}
          onClick={handleClick}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          ariaLabel={
            affiliateConfigured
              ? `Visit third-party quote page for ${provider.name}`
              : `Continue preparing for ${provider.name}`
          }
        >
          <span>{ctaText}</span>
          {affiliateConfigured ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : null}
        </UTMLink>
        <p className="mt-2 text-center text-xs text-muted">
          {affiliateConfigured
            ? "Affiliate-supported third-party link. You will leave PawPeaceGuide and should review terms directly with the provider."
            : provider.role === "primary"
              ? "The approved partner link is not live yet. Use the quote-ready checklist to prepare before clickout is enabled."
              : "This backup partner link is not live yet. Review the comparison guide first."}
        </p>
      </div>
    </article>
  );
}
