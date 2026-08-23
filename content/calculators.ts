export type CalculatorMeta = {
  slug: string;
  title: string;
  summary: string;
  status: "live" | "planned";
  href: string;
};

/** Framework registry — add calculators here as they ship. */
export const calculators: CalculatorMeta[] = [
  {
    slug: "true-yield",
    title: "True Yield Calculator",
    summary: "Gross yield, net income, true capital deployed, and net yield with transparent cost assumptions.",
    status: "live",
    href: "/calculators/true-yield",
  },
  {
    slug: "purchase-cost",
    title: "Dubai Purchase Cost Calculator",
    summary: "Acquisition cost stack for a Dubai freehold purchase — DLD, agency, trustee, and extras.",
    status: "live",
    href: "/calculators/purchase-cost",
  },
  {
    slug: "payment-plan",
    title: "Off-Plan Payment Plan Comparison",
    summary: "Stress-test construction-linked schedules against liquidity.",
    status: "live",
    href: "/calculators/payment-plan",
  },
  {
    slug: "cash-on-cash",
    title: "Cash-on-Cash Return Calculator",
    summary: "Return on equity when financing is part of the structure.",
    status: "planned",
    href: "/calculators",
  },
  {
    slug: "mortgage-vs-cash",
    title: "Mortgage vs Cash Comparison",
    summary: "Compare leveraged vs all-cash outcomes under stated assumptions.",
    status: "planned",
    href: "/calculators",
  },
];
