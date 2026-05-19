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
          <div className="mt-4 max-w-2xl rounded-md border border-line bg-mist px-4 py-3">
            <p className="text-sm font-semibold text-ink">How PawPeaceGuide makes money</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              PawPeaceGuide is affiliate-supported. If you visit a provider through a tracked
              PawPeaceGuide link and purchase a policy, we may earn compensation. Our content is
              educational and policy terms should be reviewed directly with the provider.
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-muted">
            {siteConfig.affiliateDisclosure}
          </p>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-muted">{siteConfig.legalDisclaimer}</p>
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
