import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("dog-insurance")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/dog-insurance"
});

export default function DogInsurancePage() {
  return <LandingPageTemplate page={page} />;
}
