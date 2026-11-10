/**
 * Public Invest catalogue. Four purchase-type shelves.
 * Fields are taken from the 10 November 2026 stock list.
 * Empty cells are omitted. Off-market asking prices are not published.
 */

export type ShelfId = "offplan" | "offplan-resale" | "commercial" | "secondary";

export type CatalogueFact = {
  label: string;
  value: string;
  href?: string;
};

export type CatalogueProject = {
  slug: string;
  name: string;
  shelf: ShelfId;
  product: string;
  facts: CatalogueFact[];
};

export type CatalogueShelf = {
  id: ShelfId;
  name: string;
  href: `/invest/${ShelfId}`;
  kicker: string;
  summary: string;
};

export const catalogueShelves: CatalogueShelf[] = [
  {
    id: "offplan",
    name: "Offplan",
    href: "/invest/offplan",
    kicker: "Sold by the developer",
    summary: "Home launches still sold by the developer. Each project below is one launch.",
  },
  {
    id: "offplan-resale",
    name: "Offplan resale",
    href: "/invest/offplan-resale",
    kicker: "Part-paid homes",
    summary: "Homes already bought in communities that have not handed over. One page per community.",
  },
  {
    id: "commercial",
    name: "Commercial",
    href: "/invest/commercial",
    kicker: "Offices",
    summary: "Office projects, whether the launch is still with the developer or the floors are a resale.",
  },
  {
    id: "secondary",
    name: "Secondary",
    href: "/invest/secondary",
    kicker: "Ready homes",
    summary: "Ready villas in the communities where secondary stock is being worked. Unit and price stay off this page.",
  },
];

const dubai = { label: "Emirate", value: "Dubai", href: "/invest/dubai" };
const abuDhabi = { label: "Emirate", value: "Abu Dhabi", href: "/invest/abu-dhabi" };

export const catalogueProjects: CatalogueProject[] = [
  {
    slug: "infinity-ramhan-island",
    name: "Infinity, Ramhan Island",
    shelf: "offplan",
    product: "Beachfront villas, 4–7 bed",
    facts: [
      { label: "Developer", value: "Eagle Hills" },
      abuDhabi,
      { label: "Location", value: "Ramhan outer island", href: "/areas/ramhan-island" },
      { label: "Product", value: "Beachfront villas, 4–7 bed, own pool and beach" },
      { label: "Status", value: "New / launched" },
      { label: "Price from", value: "AED 16,500,000" },
      {
        label: "Price range",
        value:
          "AED 16.5m–49m. Spark 5-bed and Vintage 6-bed from 16.5m (to 18m). Glam 4-bed 23m. Bliss 7-bed 25m (to 28m). Sky 7-bed 46m (to 49m).",
      },
      { label: "Payment plan", value: "50 / 50. 10% on booking, 5% construction instalments, 10% at structure, 50% on handover." },
      { label: "Handover", value: "December 2029" },
      { label: "Note", value: "Open-sea side of Ramhan." },
    ],
  },
  {
    slug: "the-bristol-ramhan-island",
    name: "The Bristol, Ramhan Island",
    shelf: "offplan",
    product: "Branded residences, 1–4 bed",
    facts: [
      { label: "Developer", value: "Eagle Hills" },
      abuDhabi,
      { label: "Location", value: "Ramhan Island marina", href: "/areas/ramhan-island" },
      { label: "Product", value: "Branded residences with The Bristol hotel, 1–4 bed" },
      { label: "Status", value: "EOI open / launched" },
      { label: "Scale", value: "125 residences" },
      { label: "Price from", value: "AED 3,100,000" },
      {
        label: "Price range",
        value:
          "1-bed 3.1m (to about 4.6m). 2-bed 4.4m (to about 6.5m). 3-bed 6m (to about 10.9m). 4-bed 14m (to about 19.6m).",
      },
      { label: "Payment plan", value: "50 / 50, 5% per quarter. 10% plus a 2% fee to book. 45% paid before keys." },
      { label: "Handover", value: "October 2028" },
      { label: "Note", value: "Direct marina access, hotel services." },
    ],
  },
  {
    slug: "talay-marsa-al-saadiyat",
    name: "Talay, Marsa Al Saadiyat",
    shelf: "offplan",
    product: "Standalone villas, 4–6 bed",
    facts: [
      { label: "Developer", value: "Aldar", href: "/developers/aldar" },
      abuDhabi,
      { label: "Location", value: "Saadiyat Island, Marsa Al Saadiyat", href: "/areas/saadiyat-island" },
      { label: "Product", value: "Standalone villas, 4, 5 and 6 bed. Two collections: Talay and Talay Beach." },
      { label: "Status", value: "Launched" },
      { label: "Scale", value: "351 villas. Talay 167. Talay Beach 184." },
      { label: "Price from", value: "AED 13,500,000" },
      {
        label: "Price range",
        value: "From AED 2,498 per sq ft gross. 4-bed 13.5m. 5-bed 15.5m. 6-bed 17.2m.",
      },
      { label: "Payment plan", value: "50 / 50, 5% to book" },
      { label: "Handover", value: "Q4 2029 and Q4 2030" },
      { label: "Note", value: "1.5 km to the Etihad Rail station. First homes at Marsa Al Saadiyat." },
    ],
  },
  {
    slug: "jumeirah-residences",
    name: "Jumeirah Residences",
    shelf: "offplan",
    product: "Branded residences, 1–3 bed",
    facts: [
      { label: "Developer", value: "Emirates Developments" },
      abuDhabi,
      { label: "Location", value: "Al Maryah Island, ADGM", href: "/areas/al-maryah" },
      {
        label: "Product",
        value: "Branded residences managed by Jumeirah, 1–3 bed. 4-bed and penthouses on request.",
      },
      { label: "Status", value: "Launched / available now" },
      { label: "Scale", value: "253 residences. 38 storeys, 184 m." },
      { label: "Price from", value: "AED 5,150,000" },
      { label: "Price range", value: "Up to AED 17.2m for a 3-bed. 4-bed and penthouses on request." },
      { label: "Payment plan", value: "41% paid before handover. A further 5% within 30 days of the SPA." },
      { label: "Handover", value: "Q4 2030 (estimated)" },
      { label: "Note", value: "Waterfront tower. Architect: Killa Design. Managed by Jumeirah." },
    ],
  },
  {
    slug: "wadeem-gardens",
    name: "Wadeem Gardens",
    shelf: "offplan",
    product: "Villas, 4–6 bed",
    facts: [
      { label: "Developer", value: "Modon", href: "/developers/modon" },
      abuDhabi,
      { label: "Location", value: "Hudayriyat Island", href: "/areas/hudayriyat-island" },
      { label: "Product", value: "Villas, 4, 5 and 6 bed, in three gated clusters." },
      { label: "Status", value: "Launched" },
      { label: "Scale", value: "1,094 villas" },
      { label: "Price from", value: "AED 8,700,000" },
      { label: "Price range", value: "4-bed 8.7m. 5-bed 10.2m. 6-bed 11.6m." },
      {
        label: "Payment plan",
        value: "Plan A 45 / 55. Plan B 25 / 75 with ADIB financing: 20% drawn in September 2029, interest-only during construction.",
      },
      { label: "Handover", value: "June 2031 (balance and handover)" },
    ],
  },
  {
    slug: "lunaya",
    name: "Lunaya",
    shelf: "offplan",
    product: "Villas, townhouses and low-rise apartments",
    facts: [
      { label: "Developer", value: "Zaya × FIVE", href: "/developers/zaya" },
      dubai,
      { label: "Location", value: "Jebel Ali, opposite Palm Jebel Ali" },
      {
        label: "Product",
        value: "Villas and townhouses, plus five low-rise Terraces apartment buildings, in a lagoon community.",
      },
      { label: "Status", value: "Launched" },
      { label: "Scale", value: "564 villas and townhouses, plus 5 buildings. 900,000 sq ft of lagoons." },
      { label: "Price from", value: "AED 2,070,000" },
      {
        label: "Price range",
        value: "Villas about AED 1,757–1,859 per sq ft built. Terraces AED 1,802–2,005 per sq ft.",
      },
      { label: "Payment plan", value: "Terraces 25 / 75. Villas 40 / 60." },
      { label: "Handover", value: "2029, by phase. Card date Q2 2029." },
      { label: "Note", value: "Sol and Bloom are sold out. Service charge: villas 6.5, Terraces 21 AED per sq ft." },
    ],
  },
  {
    slug: "palm-jebel-ali",
    name: "Palm Jebel Ali",
    shelf: "offplan-resale",
    product: "Off-plan resale villas, 5–7 bed",
    facts: [
      { label: "Developer", value: "Nakheel", href: "/developers/nakheel" },
      dubai,
      { label: "Location", value: "Palm Jebel Ali", href: "/areas/palm-jebel-ali" },
      { label: "Resale type", value: "Off-plan resale villas, 5–7 bed, Beach and Coral collections." },
      { label: "Units for sale", value: "125. 86 Beach, 5–6 bed. 39 Coral, 7 bed." },
      { label: "Price range", value: "AED 16.5m – 50m" },
      {
        label: "Per sq ft",
        value: "Median ask AED 2,800 per sq ft. Median premium +6% over the original price. 8 of 109 at or below the original.",
      },
      { label: "Handover", value: "First handovers from December 2027, in phases." },
      { label: "Community scale", value: "1,378 plots on 16 fronds. 7 islands." },
    ],
  },
  {
    slug: "the-hills-hudayriyat",
    name: "The Hills, Hudayriyat Island",
    shelf: "offplan-resale",
    product: "Off-plan resale Mansions, Heights and Homes",
    facts: [
      { label: "Developer", value: "Modon", href: "/developers/modon" },
      abuDhabi,
      { label: "Location", value: "Hudayriyat Island, Nawayef West and East", href: "/areas/hudayriyat-island" },
      { label: "Resale type", value: "Off-plan resale Mansions, Heights and Homes." },
      { label: "Units for sale", value: "51" },
      { label: "Price range", value: "AED 9.1m – 100m. Homes 9.1–15m. Heights 23–59.5m. Mansions 50–100m." },
      { label: "Per sq ft", value: "Median resale ask AED 2,364 per sq ft." },
      { label: "Handover", value: "Modon scheduled 31 March 2028 (West) and October–December 2028 (East)." },
      {
        label: "Community scale",
        value:
          "944 homes. West 411 (56 Mansions, 155 Heights, 200 Homes). East 533 (32 Mansions, 56 Heights, 445 Homes).",
      },
    ],
  },
  {
    slug: "al-naseem-hudayriyat",
    name: "Al Naseem, Hudayriyat Island",
    shelf: "offplan-resale",
    product: "Off-plan resale villas, 4–6 bed",
    facts: [
      { label: "Developer", value: "Modon", href: "/developers/modon" },
      abuDhabi,
      { label: "Location", value: "Hudayriyat Island", href: "/areas/hudayriyat-island" },
      { label: "Resale type", value: "Off-plan resale villas, 4–6 bed, two façade styles." },
      { label: "Units for sale", value: "25" },
      { label: "Price range", value: "AED 7.8m – 11.6m. 4-bed 7.8–9m. 5-bed 9.35–10.5m. 6-bed 10.3–11.6m." },
      { label: "Per sq ft", value: "Asks about AED 1,258–1,377 per sq ft on Modon saleable area. Premiums 0–10% over the original." },
      { label: "Handover", value: "Modon scheduled March 2028." },
      { label: "Community scale", value: "984 villas at the foot of Nawayef East." },
    ],
  },
  {
    slug: "ramhan-island",
    name: "Ramhan Island",
    shelf: "offplan-resale",
    product: "Off-plan resale villas, 6–7 bed",
    facts: [
      { label: "Developer", value: "Eagle Hills" },
      abuDhabi,
      { label: "Location", value: "Ramhan Island", href: "/areas/ramhan-island" },
      { label: "Resale type", value: "Off-plan resale villas, 6–7 bed. Vintage and Sky designs, Shores island." },
      { label: "Units for sale", value: "7" },
      { label: "Price range", value: "AED 18m – 37m, plus 1 price on application." },
      { label: "Per sq ft", value: "Median ask AED 4,710 per sq ft. Median premium +81% over the original. 0 of 5 at or below the original." },
      { label: "Handover", value: "Handovers in phases from 2027." },
      { label: "Community scale", value: "400-hectare island chain. ACC is building 500 villas." },
    ],
  },
  {
    slug: "rockefeller-business-tower",
    name: "Christian A. Rockefeller Business Tower",
    shelf: "commercial",
    product: "Grade A offices",
    facts: [
      { label: "Developer", value: "LMD" },
      dubai,
      { label: "Location", value: "Sheikh Zayed Road" },
      { label: "Product", value: "Grade A offices" },
      { label: "Status", value: "Launching now / pre-launch" },
      { label: "Scale", value: "332 offices, 1,077 sq ft to full floors. 87 floors, 372 m." },
      { label: "Price", value: "Prices by invitation. Not published." },
      { label: "Payment plan", value: "50 / 50" },
      { label: "Handover", value: "Q2 2031" },
      {
        label: "Note",
        value: "Offices on levels 15–86, five amenity levels, level 87 observatory and infinity pool. Registered, escrow open.",
      },
    ],
  },
  {
    slug: "berkeley-tower",
    name: "Berkeley Tower",
    shelf: "commercial",
    product: "Grade A offices",
    facts: [
      { label: "Developer", value: "Ellington Properties, with Al Hamra", href: "/developers/ellington" },
      dubai,
      { label: "Location", value: "Business Bay, on the metro", href: "/areas/business-bay" },
      { label: "Product", value: "Grade A offices" },
      { label: "Status", value: "Launching now / allocating this week" },
      { label: "Scale", value: "60 floors plus 6 basements. 109 offices on 53 floors." },
      { label: "Price from", value: "AED 5,400,000" },
      { label: "Price range", value: "AED 4,500–4,800+ per sq ft (indicative)." },
      { label: "Payment plan", value: "70 / 30" },
      { label: "Handover", value: "Q4 2031 (confirmed by Ellington)" },
      { label: "Note", value: "Four amenity floors, robotic parking, double-deck lifts." },
    ],
  },
  {
    slug: "ahs-twin-towers",
    name: "AHS Twin Towers",
    shelf: "commercial",
    product: "Grade A offices",
    facts: [
      { label: "Developer", value: "AHS Properties" },
      dubai,
      { label: "Location", value: "Sheikh Zayed Road (former Shangri-La)" },
      { label: "Product", value: "Grade A offices" },
      { label: "Status", value: "Launching now" },
      { label: "Scale", value: "G+50" },
      { label: "Price from", value: "AED 5,700,000" },
      { label: "Price range", value: "AED 3,850–5,000 per sq ft." },
      { label: "Payment plan", value: "50 / 50, 5% to reserve" },
      { label: "Handover", value: "June 2028 (estimated)" },
      {
        label: "Note",
        value: "Shangri-La bought in June 2026 for AED 1.1 billion. Gensler conversion. AHS's second office tower on the road.",
      },
    ],
  },
  {
    slug: "ahs-tower-high-floors",
    name: "AHS Tower, high floors",
    shelf: "commercial",
    product: "Whole office floors",
    facts: [
      { label: "Developer", value: "AHS Properties" },
      dubai,
      { label: "Location", value: "Sheikh Zayed Road" },
      { label: "Product", value: "Full office floors near the top of the tower." },
      { label: "Status", value: "Resale. Sold out by the developer." },
      { label: "Scale", value: "Several whole floors. 69-floor tower." },
      { label: "Price", value: "AED 32.5 million per floor, about 6,500 sq ft of title, about AED 5,000 per sq ft." },
      { label: "Payment plan", value: "50% already paid to AHS. The buyer takes over the balance." },
      { label: "Handover", value: "Q3 2027" },
      { label: "Note", value: "Designed by Shaun Killa." },
    ],
  },
  {
    slug: "dubai-hills",
    name: "Dubai Hills",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "16" },
    ],
  },
  {
    slug: "jumeirah-golf-estates",
    name: "Jumeirah Golf Estates",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Location", value: "Jumeirah Golf Estates", href: "/areas/jumeirah-golf-estates" },
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "16" },
    ],
  },
  {
    slug: "saadiyat-island",
    name: "Saadiyat Island",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      abuDhabi,
      { label: "Location", value: "Saadiyat Island", href: "/areas/saadiyat-island" },
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "11" },
    ],
  },
  {
    slug: "al-barari",
    name: "Al Barari",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "7" },
    ],
  },
  {
    slug: "emirates-hills",
    name: "Emirates Hills",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Location", value: "Emirates Hills", href: "/areas/emirates-hills" },
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "5" },
    ],
  },
  {
    slug: "al-wasl",
    name: "Al Wasl",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "3" },
    ],
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Location", value: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "3" },
    ],
  },
  {
    slug: "umm-al-sheif",
    name: "Umm Al Sheif",
    shelf: "secondary",
    product: "Ready villas",
    facts: [
      dubai,
      { label: "Stage", value: "Ready" },
      { label: "Product", value: "Villas" },
      { label: "Homes on the list", value: "3" },
    ],
  },
];

export function getShelf(id: ShelfId) {
  const shelf = catalogueShelves.find((item) => item.id === id);
  if (!shelf) throw new Error(`Unknown shelf ${id}`);
  return shelf;
}

export function getShelfProjects(id: ShelfId) {
  return catalogueProjects.filter((project) => project.shelf === id);
}

export function getCatalogueProject(shelf: ShelfId, slug: string) {
  return catalogueProjects.find((project) => project.shelf === shelf && project.slug === slug);
}

export function projectPath(project: CatalogueProject) {
  return `/invest/${project.shelf}/${project.slug}` as const;
}

export type ProjectMedia = {
  image: string;
  gallery: string[];
  credit: string;
};

/** Official developer images. Launches come from the 10 November 2026 project pack. Rockefeller and the secondary communities come from each developer's own site. */
export const projectMedia: Record<string, ProjectMedia> = {
  "infinity-ramhan-island": {
    image: "/images/catalogue/infinity-ramhan-island/hero.jpg",
    gallery: ["/images/catalogue/infinity-ramhan-island/02.jpg"],
    credit: "Render: Eagle Hills, Ramhan Island.",
  },
  "the-bristol-ramhan-island": {
    image: "/images/catalogue/the-bristol-ramhan-island/hero.webp",
    gallery: ["/images/catalogue/the-bristol-ramhan-island/02.webp"],
    credit: "Render: Eagle Hills, The Bristol at Ramhan Island.",
  },
  "ramhan-island": {
    image: "/images/catalogue/ramhan-island/hero.webp",
    gallery: ["/images/catalogue/ramhan-island/02.webp"],
    credit: "Render: Eagle Hills, Ramhan Island.",
  },
  "talay-marsa-al-saadiyat": {
    image: "/images/catalogue/talay-marsa-al-saadiyat/hero.webp",
    gallery: [
      "/images/catalogue/talay-marsa-al-saadiyat/02.webp",
      "/images/catalogue/talay-marsa-al-saadiyat/03.webp",
    ],
    credit: "Render: Aldar, Talay at Marsa Al Saadiyat.",
  },
  lunaya: {
    image: "/images/catalogue/lunaya/hero.webp",
    gallery: ["/images/catalogue/lunaya/02.avif", "/images/catalogue/lunaya/03.webp"],
    credit: "Render: Lunaya.",
  },
  "jumeirah-residences": {
    image: "/images/catalogue/jumeirah-residences/hero.jpg",
    gallery: ["/images/catalogue/jumeirah-residences/02.jpg", "/images/catalogue/jumeirah-residences/03.jpg"],
    credit: "Render: Emirates Developments, Jumeirah Residences.",
  },
  "wadeem-gardens": {
    image: "/images/catalogue/wadeem-gardens/hero.jpg",
    gallery: ["/images/catalogue/wadeem-gardens/02.jpg", "/images/catalogue/wadeem-gardens/03.jpg"],
    credit: "Render: Modon, Wadeem Gardens.",
  },
  "palm-jebel-ali": {
    image: "/images/catalogue/palm-jebel-ali/hero.jpg",
    gallery: ["/images/catalogue/palm-jebel-ali/02.jpg", "/images/catalogue/palm-jebel-ali/03.jpg"],
    credit: "Render: Nakheel, Palm Jebel Ali.",
  },
  "the-hills-hudayriyat": {
    image: "/images/catalogue/the-hills-hudayriyat/hero.png",
    gallery: ["/images/catalogue/the-hills-hudayriyat/02.png"],
    credit: "Render: Modon, Nawayef on Hudayriyat Island.",
  },
  "al-naseem-hudayriyat": {
    image: "/images/catalogue/al-naseem-hudayriyat/hero.png",
    gallery: ["/images/catalogue/al-naseem-hudayriyat/02.png"],
    credit: "Render: Modon, Al Naseem.",
  },
  "berkeley-tower": {
    image: "/images/catalogue/berkeley-tower/hero.jpg",
    gallery: ["/images/catalogue/berkeley-tower/02.jpg", "/images/catalogue/berkeley-tower/03.jpg"],
    credit: "Render: Ellington Properties, Berkeley Tower.",
  },
  "ahs-tower-high-floors": {
    image: "/images/catalogue/ahs-tower-high-floors/hero.webp",
    gallery: [],
    credit: "Render: AHS Properties.",
  },
  "ahs-twin-towers": {
    image: "/images/catalogue/ahs-twin-towers/hero.webp",
    gallery: [],
    credit: "Render: AHS Properties. This is the only image published for the twin towers.",
  },
  "rockefeller-business-tower": {
    image: "/images/catalogue/rockefeller-business-tower/hero.webp",
    gallery: ["/images/catalogue/rockefeller-business-tower/02.webp"],
    credit: "Render: LMD, Christian A. Rockefeller Business Tower.",
  },
  "dubai-hills": {
    image: "/images/catalogue/dubai-hills/hero.jpg",
    gallery: [],
    credit: "Photograph: Emaar, Dubai Hills Estate.",
  },
  "jumeirah-golf-estates": {
    image: "/images/catalogue/jumeirah-golf-estates/hero.webp",
    gallery: [],
    credit: "Photograph: Wasl, Jumeirah Golf Estates.",
  },
  "saadiyat-island": {
    image: "/images/catalogue/saadiyat-island/hero.webp",
    gallery: [],
    credit: "Render: Aldar, Saadiyat Reserve on Saadiyat Island.",
  },
  "al-barari": {
    image: "/images/catalogue/al-barari/hero.jpg",
    gallery: ["/images/catalogue/al-barari/02.jpg"],
    credit: "Photograph: Al Barari.",
  },
  "emirates-hills": {
    image: "/images/catalogue/emirates-hills/hero.jpg",
    gallery: [],
    credit: "Photograph: Emaar, Emirates Living.",
  },
  "palm-jumeirah": {
    image: "/images/catalogue/palm-jumeirah/hero.jpg",
    gallery: ["/images/catalogue/palm-jumeirah/02.jpg"],
    credit: "Photograph: Nakheel, Palm Jumeirah.",
  },
};
