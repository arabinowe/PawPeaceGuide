"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";

type AdSenseUnitProps = {
  slot?: string;
  label?: string;
  className?: string;
};

function isConfiguredSlot(value?: string) {
  return Boolean(value && !value.includes("TODO") && !value.includes("PLACEHOLDER"));
}

export function AdSenseUnit({ slot, label = "Advertisement", className = "" }: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const slotConfigured = isConfiguredSlot(slot);

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
    <aside className={`my-8 rounded-md border border-line bg-white p-3 ${className}`} aria-label={label}>
      <p className="mb-2 text-center text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle block min-h-[120px]"
        style={{ display: "block" }}
        data-ad-client={siteConfig.googleAdSenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
