import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("pet-insurance")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/pet-insurance"
});

export default function PetInsurancePage() {
  return <LandingPageTemplate page={page} />;
}
