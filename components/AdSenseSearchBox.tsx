"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";

function isConfiguredSearchEngine(value?: string) {
  return Boolean(value && !value.includes("TODO") && !value.includes("PLACEHOLDER"));
}

export function AdSenseSearchBox({ className = "" }: { className?: string }) {
  const searchEngineId = siteConfig.googleAdSenseSearchEngineId;
  const configured = siteConfig.googleAdSenseEnabled && isConfiguredSearchEngine(searchEngineId);

  useEffect(() => {
    if (!configured) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-pawpeaceguide-cse="${searchEngineId}"]`
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://cse.google.com/cse.js?cx=${encodeURIComponent(searchEngineId)}`;
    script.dataset.pawpeaceguideCse = searchEngineId;
    document.head.appendChild(script);
  }, [configured, searchEngineId]);

  if (!configured) {
    return null;
  }

  return (
    <aside className={`rounded-md border border-line bg-white p-5 shadow-tight ${className}`}>
      <p className="text-sm font-semibold text-ink">Search PawPeaceGuide</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Search pet insurance terms, guides, and planning pages.
      </p>
      <div className="gcse-search mt-4" />
    </aside>
  );
}
