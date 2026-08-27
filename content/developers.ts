export type PublishStatus = "published" | "draft";

export type DeveloperSource = { label: string; url?: string; note?: string };

export interface Developer {
  slug: string;
  name: string;
  status: PublishStatus;
  markets: ("dubai" | "abu-dhabi" | "rak")[];
  tagline: string;
  overview: string;
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

const ACTIVE =
  "Morgan listed this developer among those he knows particularly well or actively works with. That is evaluation access — not an endorsement of any project.";

export const developers: Developer[] = [
  {
    slug: "emaar",
    name: "Emaar",
    status: "published",
    markets: ["dubai"],
    tagline: "Large-scale master developer — brand strength is not a substitute for unit underwriting.",
    workingNote: ACTIVE,
    overview:
      "Emaar is among the most visible Dubai developers, associated with landmark communities and high marketing reach. Visibility can support liquidity narratives, but each project still needs price, fees, delivery timing, and exit logic underwritten separately.",
    morganExperience:
      "Included in Morgan’s active developer set for international portfolio work. Treat every launch as a separate underwrite — brand does not waive payment-plan, fee or exit scrutiny.",
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
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "nakheel",
    name: "Nakheel",
    status: "published",
    markets: ["dubai"],
    tagline: "Waterfront and island-scale master planning — delivery and masterplan risk sit beside brand.",
    workingNote: ACTIVE,
    overview:
      "Nakheel is closely associated with large waterfront and island concepts in Dubai. Masterplan ambition can create long-dated optionality — and long-dated uncertainty. Underwrite the phase you can actually buy.",
    morganExperience:
      "Included in Morgan’s active developer set. Palm Jebel Ali and related island product sit in his priority community list — still phase-by-phase underwriting only.",
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
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "aldar",
    name: "Aldar",
    status: "published",
    markets: ["abu-dhabi"],
    tagline: "Major Abu Dhabi developer — evaluate on AD liquidity and cycle, not Dubai comps.",
    workingNote: ACTIVE,
    overview:
      "Aldar is a primary Abu Dhabi development name across residential and mixed-use contexts. Cross-emirate investors should reset liquidity and yield expectations vs Dubai before comparing ticket prices.",
    morganExperience:
      "Included in Morgan’s active developer set for Abu Dhabi work (including island / leisure-adjacent contexts such as Saadiyat and Yas — underwrite the specific project).",
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
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "modon",
    name: "Modon",
    status: "published",
    markets: ["abu-dhabi"],
    tagline: "Abu Dhabi–anchored development context — underwrite on AD terms.",
    workingNote: ACTIVE,
    overview:
      "Modon sits in Morgan’s active Abu Dhabi developer set. Use this page as an evaluation framework for projects linked to Modon — not as a recommendation list.",
    morganExperience:
      "Named by Morgan among developers he knows particularly well or actively works with. Project-level maths still decide.",
    trackRecord: "Assess disclosed delivery and community performance — no invented rankings here.",
    projects: ["Evaluate live launches unit by unit against the investor brief"],
    deliveryNotes: "Confirm construction status, SPA milestones and what is delivered vs marketed for your phase.",
    paymentPlanNotes: "Stress-test schedules against liquidity; do not assume a standard plan.",
    suitability: "Investors allocating to Abu Dhabi with patient capital and clear exit logic.",
    risks: ["Cross-emirate comparison mistakes", "Phase delivery risk", "Liquidity thinner than core Dubai pockets"],
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "meraas",
    name: "Meraas",
    status: "published",
    markets: ["dubai"],
    tagline: "Lifestyle and masterplan-led Dubai product — underwrite the phase you can buy.",
    workingNote: ACTIVE,
    overview:
      "Meraas is associated with distinctive Dubai lifestyle and waterfront concepts. Brand and place-making do not replace payment-plan, fee and exit underwriting.",
    morganExperience:
      "Named by Morgan among developers he knows particularly well or actively works with — not an endorsement of any launch.",
    trackRecord: "Read delivered phases and disclosed histories; do not treat renders as completion evidence.",
    projects: ["Lifestyle / waterfront master communities — phase-specific"],
    deliveryNotes: "Infrastructure and amenity delivery timing can dominate outcomes.",
    paymentPlanNotes: "Construction-linked schedules must match cash-flow reality.",
    suitability: "Investors who accept masterplan sequencing risk when the brief fits.",
    risks: ["Masterplan timing", "Concept premium vs rent", "Liquidity variance by phase"],
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "sobha",
    name: "Sobha",
    status: "published",
    markets: ["dubai"],
    tagline: "Quality and delivery narratives still need unit-level maths.",
    workingNote: ACTIVE,
    overview:
      "Sobha is often discussed in quality and delivery conversations. Treat those narratives as hypotheses — underwrite price, fees, handover and exit for the specific unit.",
    morganExperience:
      "Named by Morgan among developers he knows particularly well or actively works with.",
    trackRecord: "Use disclosed delivery history — this page does not invent rankings.",
    projects: ["Evaluate live and secondary stock against the brief"],
    deliveryNotes: "Confirm construction status and SPA definitions of handover.",
    paymentPlanNotes: "Compare instalment weightings carefully against liquidity.",
    suitability: "Investors who want delivery-sensitive underwriting, not brochure trust.",
    risks: ["Brand premium", "Service-charge outcomes", "Supply clustering nearby"],
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "ellington",
    name: "Ellington",
    status: "published",
    markets: ["dubai"],
    tagline: "Design-led product — still underwrite capital deployed and exit.",
    workingNote: ACTIVE,
    overview:
      "Ellington is frequently associated with design-led residential product. Design does not waive yield, fee or liquidity scrutiny.",
    morganExperience:
      "Named by Morgan among developers he knows particularly well or actively works with.",
    trackRecord: "Assess delivered projects and disclosed histories without inventing rankings.",
    projects: ["Evaluate launches and completed stock unit by unit"],
    deliveryNotes: "Confirm milestones and what is contractually delivered.",
    paymentPlanNotes: "Stress-test the schedule against the investor’s cash-flow.",
    suitability: "Investors comparing design premiums against net return.",
    risks: ["Design premium vs rent", "Building-level variance", "Exit competition"],
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
  {
    slug: "dar-global",
    name: "Dar Global",
    status: "published",
    markets: ["dubai"],
    tagline: "International-facing product — underwrite UAE liquidity on UAE terms.",
    workingNote: ACTIVE,
    overview:
      "Dar Global appears in international-facing UAE conversations. Cross-border marketing does not change local fee stacks, handover risk or exit reality.",
    morganExperience:
      "Named by Morgan among developers he knows particularly well or actively works with.",
    trackRecord: "Use disclosed project histories — no invented delivery statistics here.",
    projects: ["Evaluate specific launches against the investor brief"],
    deliveryNotes: "Confirm construction progress and SPA handover definitions.",
    paymentPlanNotes: "Align financing appetite with drawdown schedules where leverage is used.",
    suitability: "International buyers who still insist on local underwriting discipline.",
    risks: ["Marketing vs local liquidity", "Payment-plan stress", "Exit timing"],
    sources: [{ label: "Morgan discovery questionnaire — active developer list (Aug 2026)" }],
  },
];

export function getPublishedDevelopers() {
  return developers.filter((d) => d.status === "published");
}

export function getDeveloperBySlug(slug: string) {
  return developers.find((d) => d.slug === slug && d.status === "published");
}
