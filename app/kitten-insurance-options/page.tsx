import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("kitten-insurance-options")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/kitten-insurance-options"
});

export default function KittenInsuranceOptionsPage() {
  return <LanePage page={page} />;
}
