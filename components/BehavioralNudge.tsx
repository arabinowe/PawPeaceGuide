"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { getPrimaryProvider, isProviderAffiliateConfigured } from "@/data/providers";
import { siteConfig } from "@/data/siteConfig";
import { getPrimaryOfferHref } from "@/lib/affiliate";
import { getEngagementSnapshot, trackFunnelEvent } from "@/lib/tracking";

const NUDGE_SCORE_THRESHOLD = 14;
const DISMISS_KEY = "pawpeaceguide_behavioral_nudge_dismissed";

export function BehavioralNudge() {
  const pathname = usePathname();
  const [score, setScore] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const shownRef = useRef(false);

  const provider = useMemo(() => getPrimaryProvider(), []);
  const configured = isProviderAffiliateConfigured(provider);
  const href = getPrimaryOfferHref("/compare");
  const shouldSuppress =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/go") ||
    pathname === "/quiz" ||
    pathname === "/calculator" ||
    pathname === "/compare" ||
    pathname === "/ready-to-compare" ||
    pathname.startsWith("/guides") ||
    pathname === "/glossary";

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }

    setScore(getEngagementSnapshot().score);

    function onScore() {
      setScore(getEngagementSnapshot().score);
    }

    window.addEventListener("pawpeaceguide:engagement-score", onScore);
    return () => window.removeEventListener("pawpeaceguide:engagement-score", onScore);
  }, [pathname]);

  const visible = !dismissed && !shouldSuppress && score >= NUDGE_SCORE_THRESHOLD;

  useEffect(() => {
    if (!visible || shownRef.current) return;
    shownRef.current = true;
    trackFunnelEvent(siteConfig.eventNames.behavioralNudgeShown, {
      page: pathname,
      score,
      providerSlug: provider.slug,
      linkStatus: configured ? "configured" : "pending"
    });
  }, [configured, pathname, provider.slug, score, visible]);

  if (!visible) return null;

  function dismiss() {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Ignore storage failures.
    }
  }

  function onClick() {
    trackFunnelEvent(siteConfig.eventNames.behavioralNudgeClicked, {
      page: pathname,
      score,
      providerSlug: provider.slug,
      linkStatus: configured ? "configured" : "pending"
    });
  }

  return (
    <aside className="fixed inset-x-4 bottom-20 z-40 rounded-md border border-pine/20 bg-white p-4 shadow-[0_18px_50px_rgba(23,33,43,0.18)] md:inset-x-auto md:bottom-6 md:right-6 md:w-[360px]">
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 rounded-md p-1 text-muted transition hover:bg-mist hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
        aria-label="Dismiss comparison prompt"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="pr-7 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
        Ready to compare?
      </p>
      <h2 className="mt-2 text-lg font-semibold text-ink">Use the provider path when you are quote-ready.</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        You have reviewed enough of the guide to start checking quote options and policy details directly.
      </p>
      <div className="mt-4">
        <Button href={href} onClick={onClick} className="w-full" variant={configured ? "primary" : "secondary"}>
          {configured ? "Continue to comparison partner" : "Compare quote options"}
        </Button>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted">
        {configured
          ? `Affiliate-supported handoff to ${provider.name}, a third-party provider site. PawPeaceGuide is not an insurer or broker.`
          : "The primary partner link is pending, so this opens the comparison guide."}
      </p>
    </aside>
  );
}
