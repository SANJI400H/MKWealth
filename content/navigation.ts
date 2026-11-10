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
 label: "About",
 href: "/about",
 columns: [
 {
 title: "About",
 links: [
 { label: "Overview", href: "/about", description: "Who Morgan is" },
 { label: "About Huspy", href: "/about-huspy", description: "The partnership behind the advice" },
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
 title: "How you buy",
 links: [
 { label: "Offplan", href: "/invest/offplan", description: "Homes still sold by the developer" },
 { label: "Offplan resale", href: "/invest/offplan-resale", description: "Part-paid homes in unfinished communities" },
 { label: "Commercial", href: "/invest/commercial", description: "Office launches and office resales" },
 { label: "Secondary", href: "/invest/secondary", description: "Ready homes in named communities" },
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
 { label: "True Cost worksheet", href: "/true-cost", description: "Buying costs before you reserve" },
 { label: "Investor Guide", href: "/guide", description: "Private library. Qualify for access" },
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
];

export const footerNav: { title: string; links: NavLink[] }[] = [
 {
 title: "Morgan",
 links: [
 { label: "About", href: "/about" },
 { label: "About Huspy", href: "/about-huspy" },
 { label: "Methodology", href: "/about#methodology" },
 { label: "Credentials", href: "/about#credentials" },
 ],
 },
 {
 title: "Invest",
 links: [
 { label: "Offplan", href: "/invest/offplan" },
 { label: "Offplan resale", href: "/invest/offplan-resale" },
 { label: "Commercial", href: "/invest/commercial" },
 { label: "Secondary", href: "/invest/secondary" },
 { label: "Overview", href: "/invest" },
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

export const cinemaSectionIds = ["home", "about", "services", "philosophy"] as const;

export type SectionNavItem = { id: string; label: string };

export const aboutSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "story", label: "Story" },
 { id: "philosophy", label: "Philosophy" },
 { id: "methodology", label: "Methodology" },
 { id: "credentials", label: "Credentials" },
];

export const deskSectionNav: SectionNavItem[] = [
  { id: "how-to-use", label: "How to use" },
  { id: "market-stance", label: "Market stance" },
  { id: "underwriting", label: "Underwriting" },
  { id: "next-steps", label: "Working together" },
];

export const dubaiSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "compare", label: "Off-plan and ready" },
 { id: "costs-yield", label: "Costs & Yield" },
 { id: "areas", label: "Areas" },
 { id: "developers", label: "Developers" },
 { id: "latest-analysis", label: "Latest Analysis" },
];

export const abuDhabiSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "compare", label: "Off-plan and ready" },
 { id: "costs-yield", label: "Costs and yield" },
 { id: "areas", label: "Areas" },
 { id: "developers", label: "Developers" },
];

export const rakSectionNav: SectionNavItem[] = [
 { id: "overview", label: "Overview" },
 { id: "compare", label: "Off-plan and ready" },
 { id: "costs-yield", label: "Costs and yield" },
 { id: "areas", label: "Areas" },
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
 { id: "underwriting", label: "Underwriting" },
 { id: "acquisition", label: "Acquisition" },
 { id: "portfolio", label: "Portfolio" },
 { id: "financing", label: "Financing" },
 { id: "coordination", label: "Residency" },
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
