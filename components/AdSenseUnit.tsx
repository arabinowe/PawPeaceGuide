"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { siteConfig } from "@/data/siteConfig";

type AdSenseUnitProps = {
  slot?: string;
  format?: "display" | "inArticle" | "inFeed" | "multiplex";
  layoutKey?: string;
  label?: string;
  className?: string;
};

function isConfiguredSlot(value?: string) {
  return Boolean(value && !value.includes("TODO") && !value.includes("PLACEHOLDER"));
}

function getFormatAttributes(format: NonNullable<AdSenseUnitProps["format"]>, layoutKey?: string) {
  if (format === "inArticle") {
    return {
      className: "adsbygoogle block min-h-[180px] overflow-hidden",
      style: { display: "block", textAlign: "center" } satisfies CSSProperties,
      dataAdFormat: "fluid",
      dataAdLayout: "in-article",
      dataAdLayoutKey: undefined,
      fullWidthResponsive: undefined
    };
  }

  if (format === "inFeed") {
    return {
      className: "adsbygoogle block min-h-[180px] overflow-hidden",
      style: { display: "block" } satisfies CSSProperties,
      dataAdFormat: "fluid",
      dataAdLayout: undefined,
      dataAdLayoutKey: layoutKey,
      fullWidthResponsive: undefined
    };
  }

  if (format === "multiplex") {
    return {
      className: "adsbygoogle block min-h-[260px] overflow-hidden",
      style: { display: "block" } satisfies CSSProperties,
      dataAdFormat: "autorelaxed",
      dataAdLayout: undefined,
      dataAdLayoutKey: undefined,
      fullWidthResponsive: undefined
    };
  }

  return {
    className: "adsbygoogle block min-h-[140px] overflow-hidden",
    style: { display: "block" } satisfies CSSProperties,
    dataAdFormat: "auto",
    dataAdLayout: undefined,
    dataAdLayoutKey: undefined,
    fullWidthResponsive: "true"
  };
}

export function AdSenseUnit({
  slot,
  format = "display",
  layoutKey,
  label = "Advertisement",
  className = ""
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const needsLayoutKey = format === "inFeed";
  const slotConfigured = isConfiguredSlot(slot) && (!needsLayoutKey || isConfiguredSlot(layoutKey));
  const formatAttributes = getFormatAttributes(format, layoutKey);

  useEffect(() => {
    if (!siteConfig.googleAdSenseEnabled || !slotConfigured) return;

    try {
      const win = window as Window & { adsbygoogle?: unknown[] };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense approval can prevent fill. The content should still read normally.
    }
  }, [slotConfigured]);

  if (!siteConfig.googleAdSenseEnabled || !slotConfigured) {
    return null;
  }

  return (
    <aside
      className={`my-10 overflow-hidden border-y border-line/70 py-4 ${className}`}
      aria-label={label}
      data-ad-format-name={format}
    >
      <p className="mb-3 text-center text-[0.66rem] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <ins
        ref={adRef}
        className={formatAttributes.className}
        style={formatAttributes.style}
        data-ad-client={siteConfig.googleAdSenseClientId}
        data-ad-slot={slot}
        data-ad-format={formatAttributes.dataAdFormat}
        data-ad-layout={formatAttributes.dataAdLayout}
        data-ad-layout-key={formatAttributes.dataAdLayoutKey}
        data-full-width-responsive={formatAttributes.fullWidthResponsive}
      />
    </aside>
  );
}
