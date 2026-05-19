import { Info } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

type DisclosureBannerProps = {
  compact?: boolean;
  text?: string;
};

export function DisclosureBanner({ compact = false, text = siteConfig.affiliateDisclosure }: DisclosureBannerProps) {
  return (
    <div
      className={`rounded-md border border-line bg-white/75 text-muted ${compact ? "px-2.5 py-1.5 text-[0.72rem]" : "px-3 py-2 text-xs md:text-sm"}`}
    >
      <div className="flex gap-2.5">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" aria-hidden="true" />
        <p className={compact ? "leading-5" : "leading-6"}>{text}</p>
      </div>
    </div>
  );
}
