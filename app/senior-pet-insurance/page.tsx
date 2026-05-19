import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("senior-pet-insurance")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/senior-pet-insurance"
});

export default function SeniorPetInsurancePage() {
  return <LanePage page={page} />;
}
