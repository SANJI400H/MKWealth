/**
 * Global IA. Morgan · Invest · Tools · Work With Morgan · Portal
 * Soft launch: Intelligence hubs stay in codebase but are not advertised.
 * Investor Guide: unlock via qualification questions (dataroom-style) → cookie.
 * Calculators: soft gate (Name / WhatsApp / email).
 * Portal / Private Desk: current investors → hosted dashboard URL (or /portal teaser).
 */

export type NavLink = {
 label: string;
 href: string;
 description?: string;
};

export type NavColumn = {
 title: string;
 links: NavLink[];
};

export type NavGroup = {
 id: string;
 label: string;
 href: string;
 columns: NavColumn[];
 featured?: { eyebrow: string; title: string; href: string };
};

export const primaryNav: NavGroup[] = [
 {
 id: "morgan",
 label: "Morgan",
 href: "/about",
 columns: [
 {
 title: "Morgan",
 links: [
 { label: "Overview", href: "/about", description: "Who Morgan is" },
 { label: "Story", href: "/about#story", description: "Background and path" },
 { label: "Investment Philosophy", href: "/about#philosophy", description: "Vision · Strategy · Property" },
 { label: "Investment Methodology", href: "/about#methodology", description: "How deals are evaluated" },
 { label: "Credentials & Recognition", href: "/about#credentials", description: "Verified proof only" },
 ],
 },
 ],
 },
 {
 id: "invest",
 label: "Invest",
 href: "/invest",
 columns: [
 {
 title: "Markets",
 links: [
 { label: "Dubai", href: "/invest/dubai", description: "Primary market" },
 { label: "Abu Dhabi", href: "/invest/abu-dhabi", description: "Lower-volatility context" },
 { label: "Ras Al Khaimah", href: "/invest/rak", description: "Lower entry" },
 ],
 },
 ],
 },
 {
 id: "tools",
 label: "Tools",
 href: "/tools",
 columns: [
 {
 title: "Tools",
 links: [
 { label: "Overview", href: "/tools", description: "Calculators for underwriting" },
 { label: "Calculators", href: "/calculators", description: "True yield, costs, mortgage, plans" },
 { label: "Video Guides", href: "/video-guides", description: "Short educational videos" },
 { label: "True Cost worksheet", href: "/true-cost", description: "Buying-cost checklist magnet" },
 { label: "Investor Guide", href: "/guide", description: "Private library — qualify for access" },
 ],
 },
 ],
 },
 {
 id: "work",
 label: "Work With Morgan",
 href: "/work-with-morgan",
 columns: [
 {
 title: "Work With Morgan",
 links: [
 {
 label: "Services",
 href: "/work-with-morgan",
 description: "How engagement works",
 },
 {
 label: "Book Strategy Session",
 href: "/strategy-session",
 description: "30-minute property strategy conversation",
 },
 ],
 },
 ],
 },
 {
 id: "portal",
 label: "Portal",
 href: "/portal",
 columns: [
 {
 title: "Client Portal",
 links: [
 {
 label: "Client Portal",
 href: "/portal",
 description: "Current investors — Private Desk dashboard",
 },
 ],
 },
 ],
 },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
 {
 title: "Morgan",
 links: [
 { label: "About", href: "/about" },
 { label: "Methodology", href: "/about#methodology" },
 { label: "Credentials", href: "/about#credentials" },
 ],
 },
 {
 title: "Invest",
 links: [
 { label: "Dubai", href: "/invest/dubai" },
 { label: "Abu Dhabi", href: "/invest/abu-dhabi" },
 { label: "Ras Al Khaimah", href: "/invest/rak" },
 { label: "Markets overview", href: "/invest" },
 ],
 },
 {
 title: "Tools",
 links: [
 { label: "Overview", href: "/tools" },
 { label: "Calculators", href: "/calculators" },
 { label: "Video Guides", href: "/video-guides" },
 { label: "True Cost worksheet", href: "/true-cost" },
 ],
 },
 {
 title: "Work With Morgan",
 links: [
 { label: "Services", href: "/work-with-morgan" },
 { label: "Strategy Session", href: "/strategy-session" },
 ],
 },
 {
 title: "Clients",
 links: [{ label: "Client Portal", href: "/portal" }],
 },
 {
 title: "Legal",
 links: [
 { label: "Privacy", href: "/privacy" },
 { label: "Terms", href: "/terms" },
 { label: "Disclaimer", href: "/disclaimer" },
 { label: "Contact", href: "/#contact" },
 ],
 },
];

export const cinemaSectionIds = ["home", "about", "services", "philosophy", "formula"] as const;

export type SectionNavItem = { id: string; label: string };

export const aboutSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "story", label: "Story" },
 { id: "philosophy", label: "Philosophy" },
 { id: "methodology", label: "Methodology" },
 { id: "credentials", label: "Credentials" },
];

export const toolsSectionNav: SectionNavItem[] = [
  { id: "calculators", label: "Calculators" },
  { id: "portal", label: "Client Portal" },
];

export const deskSectionNav: SectionNavItem[] = [
  { id: "how-to-use", label: "How to use" },
  { id: "market-stance", label: "Market stance" },
  { id: "underwriting", label: "Underwriting" },
  { id: "next-steps", label: "Working together" },
];

export const dubaiSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "off-plan", label: "Off-Plan" },
 { id: "secondary", label: "Secondary" },
 { id: "costs-yield", label: "Costs & Yield" },
 { id: "areas", label: "Areas" },
 { id: "developers", label: "Developers" },
 { id: "latest-analysis", label: "Latest Analysis" },
];

export const abuDhabiSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "ownership", label: "Ownership" },
 { id: "areas", label: "Areas" },
 { id: "developers", label: "Developers" },
];

export const rakSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "who", label: "Who it suits" },
 { id: "areas", label: "Areas" },
 { id: "developers", label: "Developers" },
];

export const areaDetailNav: SectionNavItem[] = [
 { id: "view", label: "Morgan's view" },
 { id: "profile", label: "Investor profile" },
 { id: "price", label: "Price" },
 { id: "rental", label: "Rental" },
 { id: "supply", label: "Supply" },
 { id: "infra", label: "Infrastructure" },
 { id: "risks", label: "Risks" },
 { id: "exit", label: "Exit" },
];

export const developerDetailNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "experience", label: "Experience" },
 { id: "track-record", label: "Track record" },
 { id: "delivery", label: "Delivery" },
 { id: "payment", label: "Payment plans" },
 { id: "suitability", label: "Suitability" },
 { id: "risks", label: "Risks" },
];

export const workSectionNav: SectionNavItem[] = [
 { id: "strategy", label: "Strategy" },
 { id: "acquisition", label: "Acquisition" },
 { id: "underwriting", label: "Underwriting" },
 { id: "portfolio", label: "Portfolio" },
 { id: "financing", label: "Financing" },
 { id: "coordination", label: "Coordination" },
];

export function pathMatches(pathname: string, href: string): boolean {
 const pathOnly = href.split("#")[0].split("?")[0];
 if (!pathOnly || pathOnly === "/") return pathname === "/";
 if (pathname === pathOnly) return true;
 if (pathOnly === "/invest") return pathname === "/invest";
 return pathname.startsWith(`${pathOnly}/`);
}

export function groupIsActive(pathname: string, group: NavGroup): boolean {
 if (pathMatches(pathname, group.href)) return true;
 return group.columns.some((col) => col.links.some((link) => pathMatches(pathname, link.href)));
}
