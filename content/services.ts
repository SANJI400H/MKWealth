export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  group: "strategy" | "analysis" | "acquisition" | "financing" | "portfolio" | "post-purchase";
  whatsappMessage: string;
}

/** Provisional service set — edit after Morgan confirms scope. Prefer "coordination" where licensed specialists deliver. */
export const services: ServiceItem[] = [
  {
    id: "strategy",
    title: "Property Investment Strategy",
    group: "strategy",
    summary: "Clarify objective, capital, horizon, liquidity, risk, and exit before any unit shortlist.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Property Investment Strategy for UAE real estate.",
  },
  {
    id: "underwriting",
    title: "Deal Underwriting",
    group: "analysis",
    summary: "Stress-test price, yield, costs, payment structure, and assumptions against your brief.",
    whatsappMessage: "Hi Morgan, I'd like Deal Underwriting on a UAE property opportunity.",
  },
  {
    id: "off-plan",
    title: "Off-Plan Acquisition",
    group: "acquisition",
    summary: "Select and structure off-plan purchases where the payment plan and delivery risk fit the brief.",
    whatsappMessage: "Hi Morgan, I'd like help with Off-Plan Acquisition in the UAE.",
  },
  {
    id: "secondary",
    title: "Secondary Market Acquisition",
    group: "acquisition",
    summary: "Source and underwrite completed or resale stock when immediate income or price discovery matters.",
    whatsappMessage: "Hi Morgan, I'd like help with Secondary Market Acquisition in the UAE.",
  },
  {
    id: "portfolio",
    title: "Property Portfolio Strategy",
    group: "portfolio",
    summary: "Allocate across assets and markets around yield, handover timing, and capital preservation.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Property Portfolio Strategy.",
  },
  {
    id: "mortgage",
    title: "Mortgage & Financing Coordination",
    group: "financing",
    summary: "Coordinate financing options via Huspy where lender appetite must match payment schedules.",
    whatsappMessage: "Hi Morgan, I'd like Mortgage & Financing Coordination for a UAE purchase.",
  },
  {
    id: "visa",
    title: "Golden Visa & Residency Coordination",
    group: "post-purchase",
    summary: "Coordinate residency pathways tied to qualifying property investment — subject to current rules.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Golden Visa & Residency Coordination.",
  },
  {
    id: "ownership",
    title: "Ownership / Banking Coordination",
    group: "post-purchase",
    summary: "Coordinate local banking and ownership setup so payments, mortgages, and rent can clear cleanly.",
    whatsappMessage: "Hi Morgan, I'd like help with Ownership / Banking Coordination.",
  },
];

/** Cinema carousel — six positioned offerings. */
export const homepageServices = services.filter((s) =>
  ["strategy", "underwriting", "off-plan", "portfolio", "mortgage", "visa"].includes(s.id)
).map((s) => {
  if (s.id === "underwriting") return { ...s, title: "Deal Analysis" };
  if (s.id === "off-plan") return { ...s, title: "Property Acquisition", summary: "Off-plan and secondary acquisition where the brief, capital, and risk profile fit." };
  if (s.id === "mortgage") return { ...s, title: "Financing Coordination" };
  if (s.id === "visa") return { ...s, title: "Purchase / Residency Coordination", summary: "Coordinate ownership setup and residency pathways where property investment is part of the plan." };
  if (s.id === "strategy") return { ...s, title: "Investment Strategy" };
  return s;
});
