import { Calculator } from "@/components/Calculator";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Vet Bill Calculator",
  description:
    "Estimate hypothetical pet insurance premium, deductible, reimbursement, and out-of-pocket tradeoffs.",
  path: "/calculator"
});

export default function CalculatorPage() {
  return <Calculator />;
}
