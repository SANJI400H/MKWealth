export type InsightCategoryId =
 | "investment-mathematics"
 | "market-intelligence"
 | "deal-analysis"
 | "developer-analysis"
 | "portfolio-strategy"
 | "morgans-view";

export const insightCategories: {
 id: InsightCategoryId;
 label: string;
 description: string;
}[] = [
 {
 id: "investment-mathematics",
 label: "Investment Mathematics",
 description: "Yield, capital deployed, costs, and return definitions that survive underwriting.",
 },
 {
 id: "market-intelligence",
 label: "Market Intelligence",
 description: "Emirate and micro-market context, supply, demand, liquidity, infrastructure.",
 },
 {
 id: "deal-analysis",
 label: "Deal Analysis",
 description: "How to underwrite off-plan and secondary opportunities unit by unit.",
 },
 {
 id: "developer-analysis",
 label: "Developer Analysis",
 description: "Delivery, balance-sheet signals, payment structures, and project positioning.",
 },
 {
 id: "portfolio-strategy",
 label: "Portfolio Strategy",
 description: "Allocation, leverage, holding periods, and entry/exit logic.",
 },
 {
 id: "morgans-view",
 label: "Morgan's View",
 description: "Opinion-led commentary, clearly labelled as analysis, not a forecast.",
 },
];

export type InsightBlock =
 | { type: "paragraph"; text: string }
 | { type: "heading"; text: string }
 | { type: "list"; items: string[] }
 | { type: "table"; caption?: string; headers: string[]; rows: string[][] };

export interface InsightArticle {
 slug: string;
 title: string;
 excerpt: string;
 author: "Morgan Kaiser";
 publishedAt: string;
 reviewedAt: string;
 category: InsightCategoryId;
 tags: string[];
 heroImage?: string;
 youtubeId?: string;
 keyTakeaway: string;
 keyNumbers?: { label: string; value: string }[];
 blocks: InsightBlock[];
 risks?: string[];
 conclusion: string;
 sources?: { label: string; url?: string; note?: string }[];
 relatedSlugs?: string[];
 relatedCalculatorSlug?: string;
 showDisclaimer?: boolean;
 /** Only published articles appear in hub/sitemap. */
 status: "published" | "draft";
}

export const insights: InsightArticle[] = [
 {
 slug: "gross-vs-net-yield-dubai-property",
 title: "Gross Yield vs Net Yield in Dubai Property",
 excerpt:
 "Why advertised yield is not the return that hits your account, and which costs belong in a proper underwrite.",
 author: "Morgan Kaiser",
 publishedAt: "2026-08-20",
 reviewedAt: "2026-08-20",
 category: "investment-mathematics",
 tags: ["yield", "underwriting", "dubai"],
 heroImage: "/images/project-1.jpg",
 keyTakeaway:
 "Gross yield starts the conversation. Net yield, after service charges, vacancy, management, and maintenance, decides whether the investment maths works for your capital.",
 keyNumbers: [
 { label: "Gross yield", value: "Annual rent ÷ purchase price" },
 { label: "Net yield", value: "Net income ÷ true capital deployed" },
 ],
 blocks: [
 {
 type: "heading",
 text: "What gross yield measures",
 },
 {
 type: "paragraph",
 text: "Gross rental yield is usually annual asking or achievable rent divided by purchase price. It is useful for first screening. It ignores acquisition costs, ongoing operating costs, vacancy, and how much cash you actually put to work.",
 },
 {
 type: "heading",
 text: "What net yield should include",
 },
 {
 type: "list",
 items: [
 "Service charges and community fees",
 "Property management (if used)",
 "Vacancy / void assumptions",
 "Maintenance and furniture refresh allowances",
 "Insurance and chiller/cooling where applicable",
 "Acquisition costs when comparing capital efficiency (or report net yield on price and show capital deployed separately)",
 ],
 },
 {
 type: "heading",
 text: "True capital deployed",
 },
 {
 type: "paragraph",
 text: "Purchase price alone understates capital at risk. Transfer fees, agency, trustee/registration, and other acquisition costs raise the denominator. Comparing two deals on price-only yield can reverse the ranking once capital deployed is honest.",
 },
 {
 type: "table",
 caption: "Illustrative framing (not a market forecast)",
 headers: ["Metric", "Question it answers"],
 rows: [
 ["Gross yield", "Is rent interesting relative to price?"],
 ["Net income", "What remains after operating reality?"],
 ["True capital deployed", "How much cash did this deal actually consume?"],
 ["Net yield on capital", "Does the net income justify that capital?"],
 ],
 },
 ],
 risks: [
 "Asking rents are not achieved rents.",
 "Service charges and community fees can move after handover.",
 "Citywide yield bands are not underwriting for a specific unit.",
 ],
 conclusion:
 "Use gross yield to filter. Use net income and true capital deployed to decide. If you want the numbers pressure-tested against a real brochure or listing, use the True Yield calculator or ask Morgan to analyse the investment.",
 sources: [
 {
 label: "Methodology. Morgan Kaiser educational framing",
 note: "Educational definitions; not a quoted market survey.",
 },
 ],
 relatedCalculatorSlug: "true-yield",
 showDisclaimer: true,
 status: "published",
 },
 {
 slug: "how-dubai-off-plan-payment-plans-work",
 title: "How Dubai Off-Plan Payment Plans Work",
 excerpt:
 "Construction-linked payments, post-handover structures, and the cash-flow questions to ask before you reserve a unit.",
 author: "Morgan Kaiser",
 publishedAt: "2026-08-20",
 reviewedAt: "2026-08-20",
 category: "deal-analysis",
 tags: ["off-plan", "payment-plans", "cash-flow"],
 heroImage: "/images/project-2.jpg",
 keyTakeaway:
 "An off-plan price is incomplete without the payment schedule. The same ticket size can be a calm cash-flow fit or a liquidity problem depending on deposit, milestones, and post-handover balance.",
 blocks: [
 {
 type: "heading",
 text: "What a payment plan is doing",
 },
 {
 type: "paragraph",
 text: "Off-plan purchases typically stage payments against construction progress and handover. Marketing often highlights headline splits (for example 60/40 or 70/30 style structures). What matters for you is whether each tranche fits your liquidity and whether the remaining balance is financeable if you need a mortgage.",
 },
 {
 type: "heading",
 text: "Questions before you book",
 },
 {
 type: "list",
 items: [
 "What is due at reservation vs SPA?",
 "Which milestones are construction-linked vs calendar-linked?",
 "What happens if handover slips?",
 "What percentage remains at or after handover?",
 "Does lender appetite match this drawdown schedule?",
 ],
 },
 {
 type: "heading",
 text: "Off-plan vs secondary (cash-flow lens)",
 },
 {
 type: "paragraph",
 text: "Off-plan can reduce day-one capital relative to buying completed stock, in exchange for delivery and timing risk, and delayed rental income. Secondary can offer immediate income and clearer price discovery, in exchange with different capital and financing dynamics. Neither is automatically better; the brief decides.",
 },
 ],
 risks: [
 "Payment-plan marketing can understate total acquisition costs.",
 "Handover timing is not guaranteed by brochure language.",
 "Visa or residency assumptions must be checked against current rules separately.",
 ],
 conclusion:
 "Map the plan against your actual liquidity before you fall in love with the unit. For a specific proposal, use Analyse an Investment or book a strategy session.",
 sources: [
 {
 label: "Educational overview, confirm project SPA terms for any live deal",
 },
 ],
 showDisclaimer: true,
 status: "published",
 },
];

export function getPublishedInsights() {
 return insights
 .filter((a) => a.status === "published")
 .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getInsightBySlug(slug: string) {
 return insights.find((a) => a.slug === slug && a.status === "published");
}

export function getInsightsByCategory(category: InsightCategoryId) {
 return getPublishedInsights().filter((a) => a.category === category);
}

export function getRelatedInsights(article: InsightArticle) {
 const related = (article.relatedSlugs ?? [])
 .map((slug) => getInsightBySlug(slug))
 .filter(Boolean) as InsightArticle[];
 if (related.length) return related;
 return getPublishedInsights()
 .filter((a) => a.slug !== article.slug && a.category === article.category)
 .slice(0, 3);
}
