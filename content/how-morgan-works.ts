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

/** Four-stage engagement sequence, from Morgan’s discovery journey (Aug 2026). */
export const howMorganWorksStages: HowMorganStage[] = [
 {
 id: "strategy",
 number: "01",
 title: "Strategy",
 question: "Where are you, and where should capital go over the next decade?",
 body: "A strategy session first: motivations, horizon and destination before any brochure shortlist. Preferred focus is international investors from AED 2M+, not end-user tickets.",
 examines: [
 "investment motivations",
 "10-year destination",
 "capital available",
 "cash-flow capacity",
 "leverage preferences",
 "exit intent",
 ],
 cta: { label: "Book Strategy Session", href: "/strategy-session" },
 assetId: "service-strategy",
 categoryLabel: "Strategy",
 },
 {
 id: "underwriting",
 number: "02",
 title: "Underwriting",
 question: "Which emirate and area actually fit, and which options survive the numbers?",
 body: "Structured area materials first. Then a slim shortlist aligned to cash-flow and leverage, with exit and financing discussed together.",
 examines: ["emirate fit", "micro-market fit", "entry cost", "payment structure", "leverage", "liquidity", "exit strategy"],
 cta: { label: "Analyse My Investment", href: "/analyse" },
 assetId: "service-underwriting",
 categoryLabel: "Underwriting",
 },
 {
 id: "acquisition",
 number: "03",
 title: "Acquisition",
 question: "Can this off-plan structure clear, cleanly?",
 body: "Current acquisition focus is 100% off-plan. Selection only proceeds when plan, delivery risk and brief align, then fund movement and developer paperwork are coordinated.",
 examines: ["off-plan payment plan", "developer / project quality", "SPA terms", "financing alignment", "handover timing", "fund channels"],
 cta: { label: "Work With Morgan", href: "/work-with-morgan" },
 assetId: "service-acquisition",
 categoryLabel: "Acquisition",
 },
 {
 id: "portfolio",
 number: "04",
 title: "Portfolio",
 question: "What continues after completion?",
 body: "Introductions into Morgan’s private investor channel and network for visa, banking, corporate structure, wills and succession, framed as a multi-generational journey, not a one-off purchase.",
 examines: ["ongoing opportunities", "visa / residency", "banking", "corporate structure", "wills & succession", "portfolio updates"],
 cta: { label: "Discuss Portfolio Strategy", href: "/work-with-morgan#portfolio" },
 assetId: "service-portfolio",
 categoryLabel: "Portfolio",
 },
];
