import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { OutboundRedirect, UnconfiguredPartnerNotice } from "@/components/OutboundRedirect";
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
    <section className="mx-auto max-w-2xl px-5 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Third-party provider</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">
        {isConfigured
          ? "You are being redirected to a third-party provider site."
          : "This partner link has not been configured yet."}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        PawPeaceGuide is not an insurer or broker. Review all policy terms directly with {provider.name}
        {isConfigured ? "." : " once an approved affiliate link is available."}
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
                Back to compare
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="mt-8 text-left">
        <DisclosureBanner compact text={provider.disclosureText} />
      </div>
    </section>
  );
}
