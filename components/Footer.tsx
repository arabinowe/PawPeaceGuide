import { BrandLogo } from "@/components/BrandLogo";
import { UTMLink } from "@/components/UTMLink";
import { siteConfig } from "@/data/siteConfig";

const footerLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div>
              <p className="text-lg font-semibold text-ink">{siteConfig.brandName}</p>
              <p className="text-sm leading-6 text-muted">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {siteConfig.affiliateDisclosure}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{siteConfig.legalDisclaimer}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {footerLinks.map((link) => (
            <UTMLink key={link.href} href={link.href} className="text-sm font-medium text-pine">
              {link.label}
            </UTMLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
