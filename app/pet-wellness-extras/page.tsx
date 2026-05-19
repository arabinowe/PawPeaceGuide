import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("pet-wellness-extras")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/pet-wellness-extras"
});

export default function PetWellnessExtrasPage() {
  return <LanePage page={page} />;
}
