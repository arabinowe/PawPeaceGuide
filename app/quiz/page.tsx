import { Quiz } from "@/components/Quiz";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "60-Second Pet Insurance Quiz",
  description:
    "Build an educational pet insurance shopping profile and see features to compare before visiting provider quote pages.",
  path: "/quiz"
});

export default function QuizPage() {
  return <Quiz />;
}
