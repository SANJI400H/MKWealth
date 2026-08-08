export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  whatsappMessage: string;
}

export const services: ServiceItem[] = [
  {
    id: "visa",
    title: "Visa",
    summary: "Golden Visa eligibility through real estate, residency planning, and the paperwork path that actually clears.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Visa options through UAE real estate investment.",
  },
  {
    id: "portfolio",
    title: "Portfolio Management",
    summary: "Build and rebalance a Dubai-first property portfolio around yield, handover timing, and capital preservation.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Portfolio Management for UAE real estate.",
  },
  {
    id: "banking",
    title: "Banking Setup",
    summary: "Local account setup guidance so payments, mortgages, and rental income clear without last-minute friction.",
    whatsappMessage: "Hi Morgan, I'd like help with Banking Setup for a UAE property purchase.",
  },
  {
    id: "corporate",
    title: "Corporate Structuring",
    summary: "When a personal freehold title is not enough — structuring options for holding UAE property through a company.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Corporate Structuring for UAE property.",
  },
  {
    id: "mortgage",
    title: "Mortgage Advisory",
    summary: "Financing options via Huspy — matching lender appetite to your payment plan and off-plan drawdown schedule.",
    whatsappMessage: "Hi Morgan, I'd like Mortgage Advisory for an off-plan purchase in the UAE.",
  },
  {
    id: "cashflow",
    title: "Cash Flow Management",
    summary: "Map deposit, construction milestones, and post-handover costs so the plan fits your actual liquidity.",
    whatsappMessage: "Hi Morgan, I'd like to discuss Cash Flow Management for a UAE investment.",
  },
];
