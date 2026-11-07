export interface InvestLocation {
 id: string;
 name: string;
 slug: "/invest/dubai" | "/invest/abu-dhabi" | "/invest/rak";
 tag: string;
 summary: string;
 /** Concise decision factors, qualitative, not invented statistics */
 factors: string[];
 image: string;
 /** Wide cover for the Markets page. Separate from the portrait used on the homepage. */
 cover: string;
 coverAlt: string;
 coverCredit: string;
 coverWidth: number;
 coverHeight: number;
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
 "Off-plan is one structure among others. The brief decides.",
 "Sea-facing homes, villas, commercial assets and luxury branded residences",
 "Priority communities include Maritime City and Palm Jebel Ali among others",
 ],
 image: "/images/markets/dubai-skyline.jpg",
 cover: "/images/markets/dubai-cover.jpg",
 coverAlt: "Dubai skyline with Burj Khalifa",
 coverCredit: "Dubai skyline and Burj Khalifa. Photo by Tim Reckmann, Wikimedia Commons, CC BY-SA 3.0.",
 coverWidth: 2800,
 coverHeight: 1200,
 assetId: "market-dubai",
 },
 {
 id: "abu-dhabi",
 name: "Abu Dhabi",
 slug: "/invest/abu-dhabi",
 tag: "Lower-volatility context",
 summary: "Calmer cycle language, not a smaller Dubai.",
 factors: [
 "Priority communities include Hudayriyat, Ramhan, Saadiyat, Yas and Al Reem",
 "Active developer set includes Aldar and Modon",
 ],
 image: "/images/markets/abu-dhabi-skyline.jpg",
 cover: "/images/markets/abu-dhabi-cover.jpg",
 coverAlt: "Abu Dhabi Corniche and the skyline across the water",
 coverCredit: "Abu Dhabi Corniche skyline. Photo by giggel, Wikimedia Commons, CC BY 3.0.",
 coverWidth: 2800,
 coverHeight: 1209,
 assetId: "market-abudhabi",
 },
 {
 id: "rak",
 name: "Ras Al Khaimah",
 slug: "/invest/rak",
 tag: "Lower entry, highest yielding",
 summary: "Lower entry, highest yielding.",
 factors: [
 "Among the highest rental yields in the UAE",
 "Al Marjan Island is on the priority community list",
 ],
 image: "/images/markets/rak-coast.jpg",
 cover: "/images/markets/rak-cover.jpg",
 coverAlt: "Ras Al Khaimah city with the Hajar mountains behind it",
 coverCredit: "Ras Al Khaimah, December 2015. Photo by Vincent Eisfeld, Wikimedia Commons, CC BY-SA 4.0.",
 coverWidth: 2800,
 coverHeight: 1200,
 assetId: "market-rak",
 },
];
