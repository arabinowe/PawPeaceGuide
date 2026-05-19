"use client";

import { Button } from "@/components/Button";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

type StickyMobileCtaProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "accent";
};

export function StickyMobileCTA({ href, label, variant = "primary" }: StickyMobileCtaProps) {
  function onClick() {
    trackFunnelEvent(siteConfig.eventNames.mobileStickyCtaClicked, {
      ctaLabel: label,
      ctaHref: href,
      linkType: href.startsWith("/") ? "internal" : "external"
    });
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 shadow-[0_-10px_28px_rgba(23,33,43,0.1)] backdrop-blur md:hidden">
      <Button href={href} variant={variant} className="w-full" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}
