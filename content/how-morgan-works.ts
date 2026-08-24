export type HowMorganStage = {
  id: string;
  number: string;
  title: string;
  question: string;
  body: string;
  examines: string[];
  cta: { label: string; href: string };
  assetId: string;
  categoryLabel: string;
};

/** Four-stage engagement sequence — post-cinema only. */
export const howMorganWorksStages: HowMorganStage[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy",
    question: "What is the capital trying to achieve?",
    body: "Clarify objective, horizon, liquidity needs, risk tolerance, and exit logic before any unit shortlist.",
    examines: ["investment objective", "capital available", "hold period", "liquidity constraints", "risk appetite", "exit preferences"],
    cta: { label: "Book Strategy Session", href: "/strategy-session" },
    assetId: "service-strategy",
    categoryLabel: "Strategy",
  },
  {
    id: "underwriting",
    number: "02",
    title: "Underwriting",
    question: "Does the deal survive the numbers?",
    body: "Stress-test the opportunity against the brief — not against the brochure.",
    examines: ["entry cost", "yield", "fees", "payment structure", "leverage", "liquidity", "exit considerations"],
    cta: { label: "Analyse My Investment", href: "/analyse" },
    assetId: "service-underwriting",
    categoryLabel: "Underwriting",
  },
  {
    id: "acquisition",
    number: "03",
    title: "Acquisition",
    question: "Which structure fits the brief?",
    body: "Off-plan or secondary — only when price, timing, and risk profile align with the strategy.",
    examines: ["off-plan vs secondary", "developer / building quality", "SPA terms", "financing alignment", "handover timing"],
    cta: { label: "Work With Morgan", href: "/work-with-morgan" },
    assetId: "service-acquisition",
    categoryLabel: "Acquisition",
  },
  {
    id: "portfolio",
    number: "04",
    title: "Portfolio",
    question: "How does this sit beside what you already own?",
    body: "Allocation, handover clustering, and capital preservation across assets and markets.",
    examines: ["allocation mix", "handover calendar", "income vs growth", "emirate diversification", "refinance / exit options"],
    cta: { label: "Discuss Portfolio Strategy", href: "/work-with-morgan#portfolio" },
    assetId: "service-portfolio",
    categoryLabel: "Portfolio",
  },
];
