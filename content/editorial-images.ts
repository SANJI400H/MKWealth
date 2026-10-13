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
 alt: "Ras Al Khaimah coastal resort and beachfront",
 },
};

export const areaImages: Record<string, { src: string; alt: string }> = {
 "dubai-marina": {
 src: "/images/areas/dubai-marina.jpg",
 alt: "Dubai Marina skyline and marina at night",
 },
 "business-bay": {
 src: "/images/areas/business-bay.jpg",
 alt: "Business Bay urban corridor",
 },
 "downtown-dubai": {
 src: "/images/areas/downtown-dubai.jpg",
 alt: "Downtown Dubai skyline",
 },
 jvc: {
 src: "",
 alt: "Jumeirah Village Circle photograph still needed",
 },
 "saadiyat-island": {
 src: "/images/areas/saadiyat-island.jpg",
 alt: "Saadiyat Island cultural and waterfront setting",
 },
 "al-marjan-island": {
 src: "/images/areas/al-marjan-island.jpg",
 alt: "Coastal island setting. Al Marjan context",
 },
 "hudayriyat-island": {
 src: "/images/areas/hudayriyat-island.jpg",
 alt: "Coastal island landscape. Hudayriyat context",
 },
 "ramhan-island": {
 src: "/images/areas/ramhan-island.jpg",
 alt: "Shoreline masterplan context. Ramhan",
 },
 "yas-island": {
 src: "/images/areas/yas-island.jpg",
 alt: "Yas Island leisure and residential setting",
 },
 "al-reem-island": {
 src: "/images/areas/al-reem-island.jpg",
 alt: "Al Reem Island urban waterfront",
 },
 "maritime-city": {
 src: "/images/areas/maritime-city.jpg",
 alt: "Dubai Maritime City from the air during early works in 2008",
 },
 "palm-jebel-ali": {
 src: "/images/areas/palm-jebel-ali.jpg",
 alt: "Palm Jebel Ali fronds during early construction in 2008",
 },
 "dubai-islands": {
 src: "/images/areas/dubai-islands.jpg",
 alt: "Dubai Islands, formerly Palm Deira, during early reclamation",
 },
 "dubai-harbour": {
 src: "",
 alt: "Dubai Harbour photograph still needed",
 },
 "emaar-beachfront": {
 src: "",
 alt: "Emaar Beachfront photograph still needed",
 },
 dubailand: {
 src: "/images/areas/dubailand.jpg",
 alt: "Dubailand entrance in 2006",
 },
 "dubai-south": {
 src: "/images/areas/dubai-south.jpg",
 alt: "Al Maktoum International Airport in Dubai South",
 },
 jumeirah: {
 src: "/images/areas/jumeirah.jpg",
 alt: "Jumeirah beach and beachfront towers",
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
  aldar: { src: "/images/logos/aldar.png" },
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
