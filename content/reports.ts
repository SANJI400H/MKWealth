export type PublishStatus = "published" | "draft";

export type ReportBlock =
 | { type: "paragraph"; text: string }
 | { type: "heading"; text: string }
 | { type: "list"; items: string[] };

export interface MarketReport {
 slug: string;
 title: string;
 period: string;
 status: PublishStatus;
 summary: string;
 provisional: boolean;
 blocks: ReportBlock[];
 sources: { label: string; note?: string }[];
 relatedHref?: string;
}

export const reports: MarketReport[] = [
 {
 slug: "dubai-off-plan-vs-secondary-working-brief",
 title: "Dubai Off-Plan vs Secondary. Working Brief",
 period: "Working brief · Aug 2026",
 status: "published",
 provisional: true,
 summary:
 "A provisional framing of how to compare off-plan and secondary acquisitions in Dubai without treating either as universally superior.",
 blocks: [
 {
 type: "paragraph",
 text: "This brief is educational orientation for investors, not a market forecast or project recommendation. Figures and rankings will be added only when sourced and Morgan-verified.",
 },
 { type: "heading", text: "Comparison dimensions" },
 {
 type: "list",
 items: [
 "Capital timing, staged vs day-one",
 "Income timing, delayed vs possible immediate rent",
 "Price discovery, list/incentives vs comps",
 "Delivery / physical risk",
 "Financing fit to schedule",
 "Exit liquidity assumptions",
 ],
 },
 {
 type: "heading",
 text: "Working conclusion",
 },
 {
 type: "paragraph",
 text: "Choose the structure that matches liquidity, risk tolerance, and hold period, then underwrite the unit. Citywide narratives are not a substitute for SPA maths.",
 },
 ],
 sources: [{ label: "Internal framework", note: "Pending Morgan discovery enrichment" }],
 relatedHref: "/invest/dubai",
 },
 {
 slug: "abu-dhabi-investor-context-working-brief",
 title: "Abu Dhabi Investor Context. Working Brief",
 period: "Working brief · Aug 2026",
 status: "published",
 provisional: true,
 summary:
 "How to place Abu Dhabi beside Dubai in a portfolio conversation, liquidity, cycle, and expectation setting.",
 blocks: [
 {
 type: "paragraph",
 text: "Abu Dhabi is not a smaller Dubai. Cross-emirate investors should reset yield, turnover, and lifestyle assumptions before comparing ticket prices.",
 },
 { type: "heading", text: "Orientation points" },
 {
 type: "list",
 items: [
 "Often framed as lower-volatility context relative to Dubai’s marketing volume",
 "Island and mainland product behave differently, underwrite micro-location",
 "Secondary depth can be thinner in some segments",
 "Fee and process stacks may differ, verify at transaction time",
 ],
 },
 {
 type: "paragraph",
 text: "Use this brief to ask better questions; replace with sourced period data when available.",
 },
 ],
 sources: [{ label: "Internal framework", note: "Pending Morgan discovery enrichment" }],
 relatedHref: "/invest/abu-dhabi",
 },
];

export function getPublishedReports() {
 return reports.filter((r) => r.status === "published");
}

export function getReportBySlug(slug: string) {
 return reports.find((r) => r.slug === slug && r.status === "published");
}
