import { Calculator } from "@/components/Calculator";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Vet Bill Calculator",
  description:
    "Use example pet insurance premium, deductible, reimbursement, and out-of-pocket tradeoffs for education.",
  path: "/calculator"
});

export default function CalculatorPage() {
  return <Calculator />;
}
