"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { appendUtmToHref, captureUtmFromCurrentUrl } from "@/lib/utm";

type UtmlinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export function UTMLink({ href, children, className, ariaLabel, target, rel, onClick }: UtmlinkProps) {
  const [trackedHref, setTrackedHref] = useState(href);
  const isExternal = /^https?:\/\//.test(href);

  useEffect(() => {
    const params = captureUtmFromCurrentUrl();
    setTrackedHref(appendUtmToHref(href, params));
  }, [href]);

  if (isExternal) {
    return (
      <a
        href={trackedHref}
        className={className}
        aria-label={ariaLabel}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer"}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={trackedHref} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  );
}
