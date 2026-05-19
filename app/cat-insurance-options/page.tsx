import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("cat-insurance-options")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/cat-insurance-options"
});

export default function CatInsuranceOptionsPage() {
  return <LanePage page={page} />;
}
