/**
 * Local editorial photography paths for markets, areas, developers, and services.
 * Swap for Morgan-owned assets when available, keep filenames stable.
 */

export const marketImages: Record<string, { src: string; alt: string }> = {
 dubai: {
 src: "/images/markets/dubai-skyline.jpg",
 alt: "Dubai skyline with Burj Khalifa at golden hour",
 },
 "abu-dhabi": {
 src: "/images/markets/abu-dhabi-skyline.jpg",
 alt: "Abu Dhabi skyline near Etihad Towers and Qasr Al Watan",
 },
 rak: {
 src: "/images/markets/rak-coast.jpg",
 alt: "Ras Al Khaimah coastal masterplan",
 },
};

export const areaImages: Record<string, { src: string; alt: string }> = {
 "dubai-marina": {
 src: "/images/areas/dubai-marina.jpg",
 alt: "Dubai Marina skyline and marina at night",
 },
 "business-bay": {
 src: "/images/areas/business-bay.jpg",
 alt: "Business Bay and the canal crossing at night, with D1 Tower",
 },
 "downtown-dubai": {
 src: "/images/areas/downtown-dubai.jpg",
 alt: "Downtown Dubai skyline",
 },
 jvc: {
 src: "/images/areas/jvc.jpg",
 alt: "Townhouses in Jumeirah Village Circle",
 },
 "saadiyat-island": {
 src: "/images/areas/saadiyat-island.jpg",
 alt: "The dome of Louvre Abu Dhabi on Saadiyat Island",
 },
 "al-marjan-island": {
 src: "/images/areas/al-marjan-island.jpg",
 alt: "The seafront on Al Marjan Island, Ras Al Khaimah",
 },
 "hudayriyat-island": {
 src: "/images/areas/hudayriyat-island.jpg",
 alt: "Hudayriyat Island waterfront at night, Abu Dhabi",
 },
 "ramhan-island": {
 src: "/images/areas/ramhan-island.jpg",
 alt: "Shoreline masterplan context. Ramhan",
 },
 "yas-island": {
 src: "/images/areas/yas-island.jpg",
 alt: "Yas Bay waterfront and Etihad Arena on Yas Island, Abu Dhabi",
 },
 "al-reem-island": {
 src: "/images/areas/al-reem-island.jpg",
 alt: "Al Reem Island skyline from Al Reem Central Park, Abu Dhabi",
 },
 "maritime-city": {
 src: "/images/areas/maritime-city.jpg",
 alt: "Dubai Maritime City peninsula",
 },
 "palm-jebel-ali": {
 src: "/images/areas/palm-jebel-ali.jpg",
 alt: "Palm Jebel Ali yacht club",
 },
 "dubai-islands": {
 src: "/images/areas/dubai-islands.jpg",
 alt: "Dubai Islands beachfront",
 },
 "dubai-harbour": {
 src: "",
 alt: "Dubai Harbour photograph still needed",
 },
 "emaar-beachfront": {
 src: "/images/areas/emaar-beachfront.jpg",
 alt: "Emaar Beachfront at night",
 },
 dubailand: {
 src: "/images/areas/dubailand.jpg",
 alt: "Legoland Dubai, inside the Dubailand district",
 },
 "dubai-south": {
 src: "/images/areas/dubai-south.jpg",
 alt: "Al Maktoum International Airport in Dubai South",
 },
 jumeirah: {
 src: "/images/areas/jumeirah.jpg",
 alt: "Jumeirah Mosque in the Jumeirah district, Dubai",
 },
 bluewaters: {
 src: "/images/areas/bluewaters.jpg",
 alt: "Ain Dubai on Bluewaters Island",
 },
};

export const developerImages: Record<string, { src: string; alt: string }> = {
 emaar: {
 src: "/images/developers/emaar.jpg",
 alt: "Landmark high-rise development context",
 },
 nakheel: {
 src: "/images/developers/nakheel.jpg",
 alt: "Masterplan residential towers context",
 },
 aldar: {
 src: "/images/developers/aldar.jpg",
 alt: "Contemporary residential architecture context",
 },
 modon: {
 src: "/images/developers/modon.jpg",
 alt: "Modern villa and community architecture context",
 },
 meraas: {
 src: "/images/developers/meraas.jpg",
 alt: "Lifestyle waterfront architecture context",
 },
 sobha: {
 src: "/images/developers/sobha.jpg",
 alt: "Premium residential interior-exterior context",
 },
 ellington: {
 src: "/images/developers/ellington.jpg",
 alt: "Design-led residential architecture context",
 },
 "dar-global": {
 src: "/images/developers/dar-global.jpg",
 alt: "Luxury residential architecture context",
 },
};

/** Official marks taken from each company's own site, or Wikimedia when that file is the company mark. */
export const developerLogos: Record<string, { src: string; onDark?: boolean }> = {
  emaar: { src: "/images/logos/emaar.svg" },
  nakheel: { src: "/images/logos/nakheel.svg", onDark: true },
  aldar: { src: "/images/logos/aldar.png", onDark: true },
  modon: { src: "/images/logos/modon.png" },
  meraas: { src: "/images/logos/meraas.svg" },
  sobha: { src: "/images/logos/sobha.svg", onDark: true },
  ellington: { src: "/images/logos/ellington.png" },
  "dar-global": { src: "/images/logos/dar-global.svg", onDark: true },
  damac: { src: "/images/logos/damac.png" },
  danube: { src: "/images/logos/danube.png", onDark: true },
  alta: { src: "/images/logos/alta.svg", onDark: true },
  beyond: { src: "/images/logos/beyond.webp", onDark: true },
  omniyat: { src: "/images/logos/omniyat.svg", onDark: true },
  "dubai-properties": { src: "/images/logos/dubai-properties.svg", onDark: true },
  "select-group": { src: "/images/logos/select-group.svg" },
};

export const serviceImages: Record<string, { src: string; alt: string }> = {
 "service-strategy": {
 src: "/images/services/strategy.jpg",
 alt: "Strategy briefing and planning context",
 },
 "service-underwriting": {
 src: "/images/services/underwriting.jpg",
 alt: "Financial underwriting and analysis context",
 },
 "service-acquisition": {
 src: "/images/services/acquisition.jpg",
 alt: "Property acquisition and keys context",
 },
 "service-portfolio": {
 src: "/images/services/portfolio.jpg",
 alt: "Portfolio-scale city skyline context",
 },
};
