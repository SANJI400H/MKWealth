/**
 * Global IA — Morgan · Invest · Intelligence · Work With Morgan
 * Phase 2/3 hubs wired when live.
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
          { label: "Investment Philosophy", href: "/about#philosophy", description: "Numbers first" },
          { label: "Investment Methodology", href: "/about#methodology", description: "How deals are evaluated" },
          { label: "Credentials & Recognition", href: "/about#credentials", description: "Verified proof only" },
          { label: "Media & Appearances", href: "/about#media", description: "When available" },
          { label: "Client Results", href: "/case-studies", description: "Permissioned case studies" },
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
      {
        title: "Strategies",
        links: [
          {
            label: "Off-Plan",
            href: "/invest/dubai#off-plan",
            description: "Construction-linked acquisitions",
          },
          {
            label: "Secondary Market",
            href: "/invest/dubai#secondary",
            description: "Completed and resale stock",
          },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Areas", href: "/areas", description: "Micro-market frameworks" },
          { label: "Developers", href: "/developers", description: "Evaluation frameworks" },
        ],
      },
    ],
    featured: {
      eyebrow: "Latest analysis",
      title: "Gross Yield vs Net Yield in Dubai Property",
      href: "/insights/gross-vs-net-yield-dubai-property",
    },
  },
  {
    id: "intelligence",
    label: "Intelligence",
    href: "/insights",
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Insights", href: "/insights", description: "Investment intelligence hub" },
          {
            label: "Market Intelligence",
            href: "/insights?category=market-intelligence",
            description: "Emirate and micro-market context",
          },
          {
            label: "Investment Mathematics",
            href: "/insights?category=investment-mathematics",
            description: "Yield, costs, capital deployed",
          },
          {
            label: "Deal Analysis",
            href: "/insights?category=deal-analysis",
            description: "Underwriting frameworks",
          },
          {
            label: "Portfolio Strategy",
            href: "/insights?category=portfolio-strategy",
            description: "Allocation and horizon",
          },
        ],
      },
      {
        title: "Use",
        links: [
          { label: "Calculators", href: "/calculators", description: "Underwriting tools" },
          { label: "True Yield", href: "/calculators/true-yield", description: "Beyond advertised yield" },
          { label: "Investor Resources", href: "/resources", description: "Primers and worksheets" },
          { label: "Market Reports", href: "/reports", description: "Working briefs" },
        ],
      },
      {
        title: "Watch",
        links: [
          { label: "Videos", href: "/videos", description: "Orientation clips" },
          { label: "The Real Numbers", href: "/the-real-numbers", description: "Sourced figures" },
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
        title: "Services",
        links: [
          { label: "Investment Strategy", href: "/work-with-morgan#strategy" },
          { label: "Property Acquisition", href: "/work-with-morgan#acquisition" },
          { label: "Deal Underwriting", href: "/work-with-morgan#underwriting" },
          { label: "Property Portfolio Strategy", href: "/work-with-morgan#portfolio" },
          { label: "Financing Coordination", href: "/work-with-morgan#financing" },
          { label: "Residency / Purchase Coordination", href: "/work-with-morgan#coordination" },
        ],
      },
      {
        title: "Take Action",
        links: [
          {
            label: "Analyse My Investment",
            href: "/analyse",
            description: "Medium-intent underwriting request",
          },
          {
            label: "Book Strategy Session",
            href: "/strategy-session",
            description: "High-intent conversation",
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
      { label: "Client Results", href: "/case-studies" },
    ],
  },
  {
    title: "Invest",
    links: [
      { label: "Dubai", href: "/invest/dubai" },
      { label: "Abu Dhabi", href: "/invest/abu-dhabi" },
      { label: "Ras Al Khaimah", href: "/invest/rak" },
      { label: "Areas", href: "/areas" },
      { label: "Developers", href: "/developers" },
      { label: "Markets overview", href: "/invest" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Calculators", href: "/calculators" },
      { label: "Resources", href: "/resources" },
      { label: "Reports", href: "/reports" },
      { label: "Videos", href: "/videos" },
      { label: "The Real Numbers", href: "/the-real-numbers" },
    ],
  },
  {
    title: "Work With Morgan",
    links: [
      { label: "Services", href: "/work-with-morgan" },
      { label: "Analyse Investment", href: "/analyse" },
      { label: "Strategy Session", href: "/strategy-session" },
    ],
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

export const cinemaSectionIds = ["home", "about", "services"] as const;

export type SectionNavItem = { id: string; label: string };

export const aboutSectionNav: SectionNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "story", label: "Story" },
  { id: "philosophy", label: "Philosophy" },
  { id: "methodology", label: "Methodology" },
  { id: "credentials", label: "Credentials" },
  { id: "media", label: "Media" },
  { id: "results", label: "Client Results" },
];

export const dubaiSectionNav: SectionNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "off-plan", label: "Off-Plan" },
  { id: "secondary", label: "Secondary" },
  { id: "costs-yield", label: "Costs & Yield" },
  { id: "latest-analysis", label: "Latest Analysis" },
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
