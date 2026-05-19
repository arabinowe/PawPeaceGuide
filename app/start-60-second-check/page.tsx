import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { getLandingPage } from "@/data/landingPages";
import { createMetadata } from "@/lib/seo";

const page = getLandingPage("start-60-second-check")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/start-60-second-check"
});

export default function StartSixtySecondCheckPage() {
  return <LandingPageTemplate page={page} />;
}
