import { LanePage } from "@/components/LanePage";
import { getLanePage } from "@/data/lanePages";
import { createMetadata } from "@/lib/seo";

const page = getLanePage("emergency-vet-bill-planning")!;

export const metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/emergency-vet-bill-planning"
});

export default function EmergencyVetBillPlanningPage() {
  return <LanePage page={page} />;
}
