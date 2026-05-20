"use client";

import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { fireGoogleAdsClickoutConversion, trackFunnelEvent } from "@/lib/tracking";

type OutboundRedirectProps = {
  providerName: string;
  providerSlug: string;
  providerRole: string;
  commissionType: string;
  destination: string;
};

export function OutboundRedirect({
  providerName,
  providerSlug,
  providerRole,
  commissionType,
  destination
}: OutboundRedirectProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      providerSlug,
      providerRole,
      commissionType,
      campaignSource: params.get("utm_source") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
      utm_content: params.get("utm_content") ?? undefined,
      pageSource: "/go"
    };

    if (providerRole === "primary") {
      trackFunnelEvent(siteConfig.eventNames.primaryOfferClicked, payload);
    }
    trackFunnelEvent(siteConfig.eventNames.affiliateCtaClicked, payload);
    trackFunnelEvent(siteConfig.eventNames.outboundRedirectStarted, payload);

    let didRedirect = false;
    const redirect = () => {
      if (didRedirect) return;
      didRedirect = true;
      window.location.assign(destination);
    };

    const waitingForGoogleAds = fireGoogleAdsClickoutConversion(payload, redirect);
    const timeout = window.setTimeout(redirect, waitingForGoogleAds ? 1400 : 700);

    return () => window.clearTimeout(timeout);
  }, [commissionType, destination, providerRole, providerSlug]);

  return (
    <a
      href={destination}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c]"
    >
      <span>Continue to {providerName}</span>
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function UnconfiguredPartnerNotice({
  providerSlug,
  providerRole,
  commissionType
}: {
  providerSlug: string;
  providerRole: string;
  commissionType: string;
}) {
  useEffect(() => {
    trackFunnelEvent(siteConfig.eventNames.guideCtaClicked, {
      providerSlug,
      providerRole,
      commissionType,
      pageSource: "/go-unconfigured",
      linkStatus: "pending"
    });
  }, [commissionType, providerRole, providerSlug]);

  return (
    <p className="mt-6 rounded-md border border-clay/25 bg-[#fff4ef] px-4 py-3 text-sm font-semibold text-clay">
      This partner link has not been configured yet.
    </p>
  );
}
