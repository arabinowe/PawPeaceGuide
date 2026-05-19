import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

type BrandLogoProps = {
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-12 w-12"
};

export function BrandLogo({ size = "sm", className = "" }: BrandLogoProps) {
  return (
    <span
      className={`relative flex shrink-0 overflow-hidden rounded-full border border-line bg-[#fbf7ec] shadow-tight ${sizeClasses[size]} ${className}`}
    >
      <Image
        src="/brand/pawpeaceguide-logo-small.png"
        alt={`${siteConfig.brandName} logo`}
        fill
        sizes={size === "sm" ? "36px" : "48px"}
        className="object-cover"
        priority={size === "sm"}
      />
    </span>
  );
}
