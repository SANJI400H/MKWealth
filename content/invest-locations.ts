export interface InvestLocation {
 id: string;
 name: string;
 slug: "/invest/dubai" | "/invest/abu-dhabi" | "/invest/rak";
 tag: string;
 summary: string;
 /** Concise decision factors, qualitative, not invented statistics */
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
 "Morgan’s primary day-to-day market for international investors",
 "Current acquisition focus is 100% off-plan, still brief-first",
 "Priority communities include Maritime City and Palm Jebel Ali among others",
 ],
 image: "/images/markets/dubai-skyline.jpg",
 assetId: "market-dubai",
 },
 {
 id: "abu-dhabi",
 name: "Abu Dhabi",
 slug: "/invest/abu-dhabi",
 tag: "Lower-volatility context",
 summary: "Part of Morgan’s three-emirate working set, calmer cycle language, not a smaller Dubai.",
 factors: [
 "Morgan reports strong working knowledge across all three emirates",
 "Priority communities include Hudayriyat, Ramhan, Saadiyat, Yas and Al Reem",
 "Active developer set includes Aldar and Modon, still unit-level underwriting",
 ],
 image: "/images/markets/abu-dhabi-skyline.jpg",
 assetId: "market-abudhabi",
 },
 {
 id: "rak",
 name: "Ras Al Khaimah",
 slug: "/invest/rak",
 tag: "Lower entry",
 summary: "Part of Morgan’s three-emirate working set, lower entry with thinner resale as the trade-off.",
 factors: [
 "Morgan reports strong working knowledge across all three emirates",
 "Al Marjan Island is on his priority advisory community list",
 "Masterplan and delivery timing remain first-order risks",
 ],
 image: "/images/markets/rak-coast.jpg",
 assetId: "market-rak",
 },
];
