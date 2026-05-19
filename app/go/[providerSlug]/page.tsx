import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { OutboundRedirect, UnconfiguredPartnerNotice } from "@/components/OutboundRedirect";
import { PetImagePanel, petImages } from "@/components/PetImage";
import { getProviderBySlug } from "@/data/providers";
import { getProviderDestination } from "@/lib/affiliate";
import { createMetadata } from "@/lib/seo";

type RedirectPageProps = {
  params: Promise<{ providerSlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = createMetadata({
  title: "Leaving PawPeaceGuide",
  description: "You are being redirected to a third-party provider site.",
  path: "/go"
});

export default async function ProviderRedirectPage({ params, searchParams }: RedirectPageProps) {
  const { providerSlug } = await params;
  const query = await searchParams;
  const provider = getProviderBySlug(providerSlug);

  if (!provider) {
    notFound();
  }

  const urlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlParams.set(key, value);
    }
  });

  const destination = getProviderDestination(provider.slug, urlParams);

  if (destination === null) {
    notFound();
  }

  const isConfigured = destination.length > 0;

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-[1fr_0.85fr] md:items-center md:py-20">
      <div className="text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Third-party provider</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">
          {isConfigured
            ? "You are being redirected to a third-party provider site."
            : "This partner link has not been configured yet."}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          {isConfigured
            ? `PawPeaceGuide is not an insurer or broker. Review all policy terms directly with ${provider.name}.`
            : `${provider.name} is the intended third-party comparison destination, but the approved affiliate link is not live yet. PawPeaceGuide is not an insurer or broker.`}
        </p>
        <div className="mt-6">
          {isConfigured ? (
            <>
              <OutboundRedirect
                providerName={provider.name}
                providerSlug={provider.slug}
                providerRole={provider.role}
                commissionType={provider.commissionType}
                destination={destination}
              />
              <noscript>
                <p className="mt-4 text-sm text-muted">JavaScript is disabled. Use the button above to continue.</p>
              </noscript>
            </>
          ) : (
            <>
              <UnconfiguredPartnerNotice
                providerSlug={provider.slug}
                providerRole={provider.role}
                commissionType={provider.commissionType}
              />
              <div className="mt-5">
                <Button href="/compare" variant="secondary">
                  Back to comparison options
                </Button>
              </div>
              <div className="mt-3">
                <Button href="/quiz" variant="ghost">
                  Use the 60-second check
                </Button>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                You can still use the quiz, calculator, and comparison checklist while the partner
                tracking URL is being finalized.
              </p>
            </>
          )}
        </div>
        <div className="mt-8 text-left">
          <DisclosureBanner compact text={provider.disclosureText} />
        </div>
      </div>
      <PetImagePanel image={petImages.dogOwner} label="Third-party quote option handoff" priority />
    </section>
  );
}
