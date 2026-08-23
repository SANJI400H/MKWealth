export type PublishStatus = "published" | "draft";

export type DeveloperSource = { label: string; url?: string; note?: string };

export interface Developer {
  slug: string;
  name: string;
  status: PublishStatus;
  markets: ("dubai" | "abu-dhabi" | "rak")[];
  tagline: string;
  overview: string;
  /** Explicit placeholder until Morgan confirms. */
  morganExperience: string;
  trackRecord: string;
  projects: string[];
  deliveryNotes: string;
  paymentPlanNotes: string;
  suitability: string;
  risks: string[];
  relatedInsightSlugs?: string[];
  sources?: DeveloperSource[];
  workingNote?: string;
}

const WORKING =
  "Working developer evaluation framework. Morgan’s personal experience and rankings are placeholders until verified. Not a recommendation to buy any project.";

export const developers: Developer[] = [
  {
    slug: "emaar",
    name: "Emaar",
    status: "published",
    markets: ["dubai"],
    tagline: "Large-scale master developer — brand strength is not a substitute for unit underwriting.",
    workingNote: WORKING,
    overview:
      "Emaar is among the most visible Dubai developers, associated with landmark communities and high marketing reach. Visibility can support liquidity narratives, but each project still needs price, fees, delivery timing, and exit logic underwritten separately.",
    morganExperience:
      "TODO: MORGAN_DISCOVERY — document real transaction experience with Emaar projects (if any), without inventing volume or rankings.",
    trackRecord:
      "Public track record should be read from delivered communities and disclosed project histories — not from brochure claims alone. This page does not publish unverified delivery statistics.",
    projects: [
      "Iconic / Downtown-adjacent communities (evaluate unit by unit)",
      "Master-planned suburban and waterfront extensions (phase-dependent)",
    ],
    deliveryNotes:
      "Large pipelines mean phase timing and competing inventory matter. Confirm construction status, SPA milestones, and handover definitions for the specific unit.",
    paymentPlanNotes:
      "Payment plans vary by launch. Stress-test schedules against your liquidity using the payment-plan calculator — do not assume a ‘standard’ Emaar plan.",
    suitability:
      "Investors who want recognisable stock and clearer secondary comps in some communities — still only when price and net yield survive scrutiny.",
    risks: [
      "Paying a brand premium that rent cannot support",
      "Phase / inventory clustering",
      "Service-charge and association outcomes by community",
      "Assuming past landmark success guarantees future launches",
    ],
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work", "gross-vs-net-yield-dubai-property"],
    sources: [{ label: "Framework page — pending Morgan-verified project notes" }],
  },
  {
    slug: "nakheel",
    name: "Nakheel",
    status: "published",
    markets: ["dubai"],
    tagline: "Waterfront and island-scale master planning — delivery and masterplan risk sit beside brand.",
    workingNote: WORKING,
    overview:
      "Nakheel is closely associated with large waterfront and island concepts in Dubai. Masterplan ambition can create long-dated optionality — and long-dated uncertainty. Underwrite the phase you can actually buy.",
    morganExperience:
      "TODO: MORGAN_DISCOVERY — Morgan’s direct experience with Nakheel stock (if any).",
    trackRecord:
      "Assess delivered phases vs announced masterplan. Do not treat concept renders as completion evidence.",
    projects: [
      "Island and waterfront master communities (phase-specific)",
      "Associated residential product within wider Nakheel plans",
    ],
    deliveryNotes:
      "Infrastructure and island access timing can dominate investor outcomes. Confirm what is delivered for your plot/building vs marketing timelines.",
    paymentPlanNotes:
      "Construction-linked schedules must match cash-flow. Compare early vs late instalment weightings carefully.",
    suitability:
      "Investors with longer horizons and tolerance for masterplan sequencing — not short flip assumptions.",
    risks: [
      "Masterplan and infrastructure delays",
      "Liquidity thinner than core urban towers in some phases",
      "Concept premium vs achievable rent",
      "Cross-cycle hold requirements",
    ],
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
    sources: [{ label: "Framework page — pending Morgan-verified project notes" }],
  },
  {
    slug: "aldar",
    name: "Aldar",
    status: "published",
    markets: ["abu-dhabi"],
    tagline: "Major Abu Dhabi developer — evaluate on AD liquidity and cycle, not Dubai comps.",
    workingNote: WORKING,
    overview:
      "Aldar is a primary Abu Dhabi development name across residential and mixed-use contexts. Cross-emirate investors should reset liquidity and yield expectations vs Dubai before comparing ticket prices.",
    morganExperience:
      "TODO: MORGAN_DISCOVERY — Morgan’s direct experience with Aldar projects (if any).",
    trackRecord:
      "Use disclosed Abu Dhabi delivery history and community performance — this page does not invent rankings.",
    projects: [
      "Abu Dhabi mainland communities",
      "Island / leisure-adjacent product (where applicable) — underwrite phase by phase",
    ],
    deliveryNotes:
      "Confirm construction progress and handover terms in the SPA. Abu Dhabi process and fee stacks can differ from Dubai.",
    paymentPlanNotes:
      "Plan structures vary. Model cash needs through construction; financing eligibility is not guaranteed by brand.",
    suitability:
      "Investors diversifying into Abu Dhabi with patient capital and realistic rent/exit assumptions.",
    risks: [
      "Applying Dubai yield or liquidity assumptions",
      "Phase delivery risk",
      "Thinner secondary markets in some segments",
      "Fee and process differences vs Dubai",
    ],
    relatedInsightSlugs: [],
    sources: [{ label: "Framework page — pending Morgan-verified project notes" }],
  },
];

export function getPublishedDevelopers() {
  return developers.filter((d) => d.status === "published");
}

export function getDeveloperBySlug(slug: string) {
  return developers.find((d) => d.slug === slug && d.status === "published");
}
