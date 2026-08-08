export interface InvestLocation {
  id: string;
  name: string;
  slug: "/invest/dubai" | "/invest/abu-dhabi" | "/invest/rak";
  tag: string;
  summary: string;
  image: string;
}

export const investLocations: InvestLocation[] = [
  {
    id: "dubai",
    name: "Dubai",
    slug: "/invest/dubai",
    tag: "Primary market",
    summary: "Deepest liquidity, widest off-plan inventory, and the market where Morgan places most clients.",
    image: "/images/project-1.jpg",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    slug: "/invest/abu-dhabi",
    tag: "Lower volatility",
    summary: "Government-anchored demand and a calmer secondary market — suited to longer hold periods.",
    image: "/images/project-2.jpg",
  },
  {
    id: "rak",
    name: "Ras Al Khaimah",
    slug: "/invest/rak",
    tag: "Lower entry",
    summary: "Lower ticket sizes and a growing tourism story — with a thinner resale market as the trade-off.",
    image: "/images/project-3.jpg",
  },
];
