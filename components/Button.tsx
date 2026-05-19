"use client";

import { ArrowRight } from "lucide-react";
import { UTMLink } from "@/components/UTMLink";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  className?: string;
  icon?: boolean;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-pine text-white hover:bg-[#1b433c] focus-visible:outline-pine shadow-tight",
  accent:
    "bg-gold text-ink hover:bg-[#d5a64e] focus-visible:outline-gold shadow-tight",
  secondary:
    "border border-pine/25 bg-white text-pine hover:border-pine/45 hover:bg-sky/35 focus-visible:outline-pine",
  ghost: "text-pine hover:bg-sky/35 focus-visible:outline-pine"
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon = true,
  onClick
}: ButtonProps) {
  return (
    <UTMLink
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </UTMLink>
  );
}
