"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { getPrimaryProvider, isProviderAffiliateConfigured } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { getPrimaryOfferHref } from "@/lib/affiliate";
import { trackFunnelEvent } from "@/lib/tracking";
import type { PetType } from "@/lib/types";

type EndOfPathQuoteNudgeProps = {
  pageSource: string;
  petType?: PetType;
  enabled?: boolean;
  delayMs?: number;
  minScrollDepth?: number;
};

export function EndOfPathQuoteNudge({
  pageSource,
  petType = "unknown",
  enabled = true,
  delayMs = 9000,
  minScrollDepth = 68
}: EndOfPathQuoteNudgeProps) {
  const [timeReady, setTimeReady] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shownRef = useRef(false);
  const provider = useMemo(() => getPrimaryProvider(), []);
  const configured = isProviderAffiliateConfigured(provider);
  const href = getPrimaryOfferHref("/compare");
  const dismissKey = `${siteConfig.engagementSessionStorageKey}_quote_nudge_${pageSource}`;

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(dismissKey) === "true");
    } catch {
      setDismissed(false);
    }

    const timer = window.setTimeout(() => setTimeReady(true), delayMs);

    function measureScroll() {
      const documentElement = document.documentElement;
      const scrollable = documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      if (depth >= minScrollDepth) {
        setScrollReady(true);
      }
    }

    window.addEventListener("scroll", measureScroll, { passive: true });
    measureScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", measureScroll);
    };
  }, [delayMs, dismissKey, minScrollDepth]);

  const visible = enabled && !dismissed && timeReady && scrollReady;

  useEffect(() => {
    if (!visible || shownRef.current) return;
    shownRef.current = true;
    trackFunnelEvent(siteConfig.eventNames.behavioralNudgeShown, {
      pageSource,
      providerSlug: provider.slug,
      providerRole: provider.role,
      linkStatus: configured ? "configured" : "pending"
    });
  }, [configured, pageSource, provider.role, provider.slug, visible]);

  if (!visible) return null;

  function dismiss() {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(dismissKey, "true");
    } catch {
      // Storage should never block the page.
    }
  }

  function onClick() {
    trackFunnelEvent(siteConfig.eventNames.behavioralNudgeClicked, {
      pageSource,
      providerSlug: provider.slug,
      providerRole: provider.role,
      linkStatus: configured ? "configured" : "pending"
    });
    if (configured) {
      trackFunnelEvent(siteConfig.eventNames.primaryOfferClicked, {
        pageSource,
        providerSlug: provider.slug,
        providerRole: provider.role,
        commissionType: provider.commissionType
      });
      trackFunnelEvent(siteConfig.eventNames.affiliateCtaClicked, {
        pageSource,
        providerSlug: provider.slug,
        providerRole: provider.role,
        commissionType: provider.commissionType
      });
    }
  }

  const petQualifier =
    petType === "dog" || petType === "puppy"
      ? "for your dog"
      : petType === "cat" || petType === "kitten"
        ? "for your cat"
        : "for a dog or cat";

  return (
    <aside className="fixed inset-x-4 bottom-20 z-40 rounded-md border border-pine/20 bg-white p-4 shadow-[0_18px_50px_rgba(23,33,43,0.18)] md:inset-x-auto md:bottom-6 md:right-6 md:w-[380px]">
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 rounded-md p-1 text-muted transition hover:bg-mist hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
        aria-label="Dismiss quote prompt"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="pr-7 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
        Ready to request a quote?
      </p>
      <h2 className="mt-2 text-lg font-semibold text-ink">
        Continue only if this fits {petQualifier}.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        You have reached a natural stopping point. If you are ready, review Odie quote options and
        confirm policy terms directly with the provider.
      </p>
      <div className="mt-4">
        <Button href={href} onClick={onClick} className="w-full" variant={configured ? "primary" : "secondary"}>
          {configured ? "Review Odie quote options" : "Compare quote options"}
        </Button>
      </div>
      <div className="mt-3">
        <DisclosureBanner compact />
      </div>
    </aside>
  );
}
