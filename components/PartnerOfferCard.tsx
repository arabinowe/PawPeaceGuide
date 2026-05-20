"use client";

import { ExternalLink, Leaf } from "lucide-react";
import { UTMLink } from "@/components/UTMLink";
import { isProviderAffiliateConfigured } from "@/data/providers";
import { getAffiliateRedirectHref } from "@/lib/affiliate";
import { trackFunnelEvent } from "@/lib/tracking";
import type { PartnerOffer } from "@/lib/types";

export function PartnerOfferCard({ partner, pageSource }: { partner: PartnerOffer; pageSource: string }) {
  const configured = isProviderAffiliateConfigured(partner);
  const href = configured ? getAffiliateRedirectHref(partner.slug) : "/pet-wellness-extras";

  function handleClick() {
    trackFunnelEvent("affiliate_cta_clicked", {
      providerSlug: partner.slug,
      providerRole: partner.role,
      commissionType: partner.commissionType,
      pageSource
    });
  }

  return (
    <article className="rounded-md border border-line bg-white p-5 shadow-tight">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">Wellness extra</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">{partner.name}</h3>
        </div>
        <Leaf className="h-5 w-5 text-sage" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-semibold text-pine">{partner.bestForLabel}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{partner.shortDescription}</p>
      <div className="mt-4 rounded-md border border-line bg-mist p-4">
        <p className="text-sm font-semibold text-ink">Important distinction</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Pet insurance may help with eligible vet costs. Wellness products may support day-to-day
          comfort, but they are not a substitute for veterinary care or insurance.
        </p>
      </div>
      <div className="mt-5">
        <UTMLink
          href={href}
          onClick={configured ? handleClick : undefined}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b433c]"
        >
          <span>{partner.ctaText}</span>
          {configured ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : null}
        </UTMLink>
      </div>
      <p className="mt-2 text-center text-xs leading-5 text-muted">
        Affiliate-supported wellness link when active. Wellness products are not insurance or a substitute for veterinary care.
      </p>
    </article>
  );
}
