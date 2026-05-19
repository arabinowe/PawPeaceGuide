import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("dog-insurance-options")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/dog-insurance-options"
});

export default function DogInsuranceOptionsPage() {
  return <LanePage page={page} />;
}
