import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("puppy-insurance")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/puppy-insurance"
});

export default function PuppyInsurancePage() {
  return <LandingPageTemplate page={page} />;
}
