import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("other-pet-insurance-options")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/other-pet-insurance-options"
});

export default function OtherPetInsuranceOptionsPage() {
  return <LanePage page={page} />;
}
