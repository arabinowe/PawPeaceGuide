import { Info } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

type DisclosureBannerProps = {
  compact?: boolean;
  text?: string;
};

export function DisclosureBanner({ compact = false, text = siteConfig.affiliateDisclosure }: DisclosureBannerProps) {
  return (
    <div
      className={`rounded-md border border-gold/35 bg-[#fff9ea] text-ink ${compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"}`}
    >
      <div className="flex gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        <p className="leading-6">{text}</p>
      </div>
    </div>
  );
}
