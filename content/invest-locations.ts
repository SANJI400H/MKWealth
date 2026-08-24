export interface InvestLocation {
  id: string;
  name: string;
  slug: "/invest/dubai" | "/invest/abu-dhabi" | "/invest/rak";
  tag: string;
  summary: string;
  /** Concise decision factors — qualitative, not invented statistics */
  factors: string[];
  image: string;
  assetId: string;
}

export const investLocations: InvestLocation[] = [
  {
    id: "dubai",
    name: "Dubai",
    slug: "/invest/dubai",
    tag: "Primary market",
    summary: "Scale, liquidity and breadth of opportunity.",
    factors: [
      "Deepest transaction market in the UAE for many international buyers",
      "Broad project and developer choice across off-plan and secondary",
      "Stronger resale depth in established segments — still unit-level underwriting",
    ],
    image: "/images/project-1.jpg",
    assetId: "market-dubai",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    slug: "/invest/abu-dhabi",
    tag: "Lower-volatility context",
    summary: "Calmer cycle language and longer-hold framing — not a smaller Dubai.",
    factors: [
      "Often framed as lower-volatility relative to Dubai marketing volume",
      "Island and mainland product behave differently — underwrite micro-location",
      "Secondary depth can be thinner in some segments",
    ],
    image: "/images/project-2.jpg",
    assetId: "market-abudhabi",
  },
  {
    id: "rak",
    name: "Ras Al Khaimah",
    slug: "/invest/rak",
    tag: "Lower entry",
    summary: "Lower ticket sizes and a growing tourism narrative — with thinner resale as the trade-off.",
    factors: [
      "Lower entry points than many Dubai waterfront products",
      "Masterplan and delivery timing are first-order risks",
      "Exit may need longer marketing periods — price discipline at entry",
    ],
    image: "/images/project-3.jpg",
    assetId: "market-rak",
  },
];
