import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("pet-parent-protection")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/pet-parent-protection"
});

export default function PetParentProtectionPage() {
  return <LandingPageTemplate page={page} />;
}
