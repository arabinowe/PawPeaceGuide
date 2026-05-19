import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { UTMLink } from "@/components/UTMLink";
import { navLinks, siteConfig } from "@/data/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <UTMLink href="/pet-insurance" className="flex items-center gap-2">
          <BrandLogo />
          <span>
            <span className="block text-base font-semibold leading-tight text-ink">
              {siteConfig.brandName}
            </span>
            <span className="hidden text-xs leading-tight text-muted sm:block">
              Plain-English guidance
            </span>
          </span>
        </UTMLink>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <UTMLink
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-mist hover:text-ink"
            >
              {link.label}
            </UTMLink>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Button href="/quiz" className="px-4 py-2" icon={false}>
            Start quiz
          </Button>
        </div>
      </div>
    </header>
  );
}
