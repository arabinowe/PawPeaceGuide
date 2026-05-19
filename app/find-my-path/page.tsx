import { FindMyPath } from "@/components/FindMyPath";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Find My Pet Coverage Path",
  description:
    "A calm PawPeaceGuide decision assistant for choosing the right pet insurance, cost, comparison, or wellness next step.",
  path: "/find-my-path"
});

export default function FindMyPathPage() {
  return <FindMyPath />;
}
