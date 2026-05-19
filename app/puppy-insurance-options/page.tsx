import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("puppy-insurance-options")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/puppy-insurance-options"
});

export default function PuppyInsuranceOptionsPage() {
  return <LanePage page={page} />;
}
