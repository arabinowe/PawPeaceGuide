import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("dog-parent-protection")!;

export const metadata = createMetadata({
  title: "Dog Parent Protection Guide",
  description:
    "A mobile-first dog insurance education page for Instagram ad traffic and quote option comparison.",
  path: "/dog-parent-protection"
});

export default function DogParentProtectionPage() {
  return <LandingPageTemplate page={page} />;
}
