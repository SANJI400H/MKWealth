export type PublishStatus = "published" | "draft";
export type ResourceType = "checklist" | "worksheet" | "guide";

export interface Resource {
  slug: string;
  title: string;
  type: ResourceType;
  gated: boolean;
  status: PublishStatus;
  excerpt: string;
  /** Public body for ungated resources; gated items point visitors to /guide. */
  body?: string[];
  relatedInsightSlug?: string;
  ctaHref: string;
  ctaLabel: string;
}

export const resources: Resource[] = [
  {
    slug: "gross-vs-net-yield-primer",
    title: "Gross vs Net Yield — Public Primer",
    type: "guide",
    gated: false,
    status: "published",
    excerpt: "How to read advertised yield before you trust a brochure number.",
    body: [
      "Start with rent ÷ price — then subtract vacancy, service charges, maintenance, agency, and insurance assumptions.",
      "Acquisition costs change capital deployed; they belong in true yield, not in the marketing headline.",
      "Use the True Yield calculator, then compare to a live unit — not a citywide average.",
    ],
    relatedInsightSlug: "gross-vs-net-yield-dubai-property",
    ctaHref: "/insights/gross-vs-net-yield-dubai-property",
    ctaLabel: "Read the full insight",
  },
  {
    slug: "yield-due-diligence-checklist",
    title: "Property Yield Due-Diligence Checklist",
    type: "checklist",
    gated: true,
    status: "published",
    excerpt: "A structured checklist for stress-testing yield claims on a live opportunity.",
    relatedInsightSlug: "gross-vs-net-yield-dubai-property",
    ctaHref: "/guide",
    ctaLabel: "Unlock via investor guide",
  },
  {
    slug: "off-plan-payment-plan-primer",
    title: "Off-Plan Payment Plans — Public Primer",
    type: "guide",
    gated: false,
    status: "published",
    excerpt: "What construction-linked schedules actually do to your liquidity.",
    body: [
      "Headline structures (e.g. 60/40, 70/30) are marketing shorthand — read the SPA schedule.",
      "Match instalments to cash you can actually deploy without forced sales elsewhere.",
      "Delivery delay and variation clauses change risk; yield stories that ignore timing are incomplete.",
    ],
    relatedInsightSlug: "how-dubai-off-plan-payment-plans-work",
    ctaHref: "/insights/how-dubai-off-plan-payment-plans-work",
    ctaLabel: "Read the full insight",
  },
  {
    slug: "payment-plan-comparison-worksheet",
    title: "Payment Plan Comparison Worksheet",
    type: "worksheet",
    gated: true,
    status: "published",
    excerpt: "Side-by-side worksheet for comparing staged schedules against your cash-flow.",
    relatedInsightSlug: "how-dubai-off-plan-payment-plans-work",
    ctaHref: "/guide",
    ctaLabel: "Unlock via investor guide",
  },
];

export function getPublishedResources() {
  return resources.filter((r) => r.status === "published");
}

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug && r.status === "published");
}
