import { siteConfig } from "@/data/siteConfig";
import type { FunnelEventName } from "@/lib/types";

export type MicroConversionStage =
  | "visit_quality"
  | "education_intent"
  | "comparison_intent"
  | "quote_intent"
  | "partner_handoff";

export type MicroConversionDefinition = {
  eventName: FunnelEventName;
  name: string;
  stage: MicroConversionStage;
  value: number;
  description: string;
  optimizationUse: "observe" | "optimize_cautiously" | "primary_proxy";
};

export const microConversionDefinitions: MicroConversionDefinition[] = [
  {
    eventName: siteConfig.eventNames.paidLandingPageView,
    name: "paid_landing_view",
    stage: "visit_quality",
    value: 1,
    description: "Paid visitor reached the landing page.",
    optimizationUse: "observe"
  },
  {
    eventName: siteConfig.eventNames.guideCtaClicked,
    name: "guide_cta_click",
    stage: "education_intent",
    value: 4,
    description: "Reader clicked from education content toward a tool or comparison step.",
    optimizationUse: "observe"
  },
  {
    eventName: siteConfig.eventNames.seoQuizCtaClicked,
    name: "seo_quiz_cta_click",
    stage: "education_intent",
    value: 5,
    description: "SEO visitor clicked toward the quiz.",
    optimizationUse: "observe"
  },
  {
    eventName: siteConfig.eventNames.quizStarted,
    name: "quiz_started",
    stage: "education_intent",
    value: 6,
    description: "Visitor began the 60-second insurance check.",
    optimizationUse: "optimize_cautiously"
  },
  {
    eventName: siteConfig.eventNames.quizCompleted,
    name: "quiz_completed",
    stage: "comparison_intent",
    value: 14,
    description: "Visitor completed the quiz and reached an educational shopping profile.",
    optimizationUse: "optimize_cautiously"
  },
  {
    eventName: siteConfig.eventNames.calculatorStarted,
    name: "calculator_started",
    stage: "education_intent",
    value: 6,
    description: "Visitor started the cost calculator.",
    optimizationUse: "optimize_cautiously"
  },
  {
    eventName: siteConfig.eventNames.calculatorCompleted,
    name: "calculator_completed",
    stage: "comparison_intent",
    value: 14,
    description: "Visitor calculated an example vet-bill scenario.",
    optimizationUse: "optimize_cautiously"
  },
  {
    eventName: siteConfig.eventNames.comparePageViewed,
    name: "compare_page_viewed",
    stage: "comparison_intent",
    value: 16,
    description: "Visitor opened the comparison page.",
    optimizationUse: "optimize_cautiously"
  },
  {
    eventName: siteConfig.eventNames.readyToCompareViewed,
    name: "ready_to_compare_viewed",
    stage: "quote_intent",
    value: 22,
    description: "Visitor reached the final ready-to-compare bridge.",
    optimizationUse: "primary_proxy"
  },
  {
    eventName: siteConfig.eventNames.quoteWorkspaceViewed,
    name: "quote_workspace_viewed",
    stage: "comparison_intent",
    value: 16,
    description: "Visitor opened the no-login quote comparison workspace.",
    optimizationUse: "observe"
  },
  {
    eventName: siteConfig.eventNames.quoteWorkspaceStarted,
    name: "quote_workspace_started",
    stage: "comparison_intent",
    value: 18,
    description: "Visitor started entering quote comparison assumptions locally.",
    optimizationUse: "optimize_cautiously"
  },
  {
    eventName: siteConfig.eventNames.quoteWorkspaceCompleted,
    name: "quote_workspace_completed",
    stage: "quote_intent",
    value: 30,
    description: "Visitor compared at least two quote cards locally.",
    optimizationUse: "primary_proxy"
  },
  {
    eventName: siteConfig.eventNames.providerCardViewed,
    name: "provider_card_viewed",
    stage: "quote_intent",
    value: 18,
    description: "Visitor saw a provider card.",
    optimizationUse: "observe"
  },
  {
    eventName: siteConfig.eventNames.primaryOfferClicked,
    name: "primary_offer_clicked",
    stage: "partner_handoff",
    value: 40,
    description: "Visitor clicked the primary live partner CTA.",
    optimizationUse: "primary_proxy"
  },
  {
    eventName: siteConfig.eventNames.affiliateCtaClicked,
    name: "affiliate_cta_clicked",
    stage: "partner_handoff",
    value: 50,
    description: "Visitor clicked an affiliate-supported partner CTA.",
    optimizationUse: "primary_proxy"
  },
  {
    eventName: siteConfig.eventNames.outboundRedirectStarted,
    name: "outbound_redirect_started",
    stage: "partner_handoff",
    value: 60,
    description: "Tracked outbound redirect to a partner started.",
    optimizationUse: "primary_proxy"
  },
  {
    eventName: siteConfig.eventNames.emailCaptureSubmitted,
    name: "email_checklist_reserved",
    stage: "education_intent",
    value: 8,
    description: "Visitor reserved the checklist placeholder.",
    optimizationUse: "observe"
  }
];

const microConversionMap = new Map(
  microConversionDefinitions.map((definition) => [definition.eventName, definition])
);

export function getMicroConversionDefinition(eventName: FunnelEventName) {
  return microConversionMap.get(eventName);
}
