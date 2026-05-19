"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { trackFunnelEvent } from "@/lib/tracking";

export function RelatedGuideLink({
  fromSlug,
  toSlug,
  children
}: {
  fromSlug: string;
  toSlug: string;
  children: React.ReactNode;
}) {
  function onClick() {
    trackFunnelEvent(siteConfig.eventNames.relatedGuideClicked, {
      guideSlug: fromSlug,
      relatedGuideSlug: toSlug
    });
  }

  return (
    <Link
      href={`/guides/${toSlug}`}
      onClick={onClick}
      className="block rounded-md border border-line bg-white p-4 transition hover:border-pine/30 hover:bg-mist"
    >
      {children}
    </Link>
  );
}
