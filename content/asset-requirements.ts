/**
 * Photography / imagery requirements for the editorial + carousel system.
 * Development placeholders use these labels; production swaps real assets by id.
 */

export type AssetRatio = "16:9" | "16:10" | "4:5" | "1:1" | "21:9";

export type AssetRequirement = {
  id: string;
  label: string;
  purpose: string;
  ratio: AssetRatio;
  minimumWidth: number;
  altRequirement: string;
  status: "required" | "optional" | "have";
  category: "market" | "morgan" | "service" | "intelligence" | "proof" | "video";
  /** Dev-only suggestion — never shown in production UI */
  suggestedFilename?: string;
};

export const assetRequirements: AssetRequirement[] = [
  {
    id: "home-morgan-hero",
    label: "Morgan hero / cinema",
    purpose: "Cinema act 1",
    ratio: "16:9",
    minimumWidth: 2400,
    altRequirement: "Morgan Kaiser in professional UAE property context",
    status: "have",
    category: "morgan",
  },
  {
    id: "market-dubai",
    label: "Dubai market visual",
    purpose: "Invest carousel + /invest/dubai",
    ratio: "4:5",
    minimumWidth: 1600,
    altRequirement: "Dubai skyline or Morgan on location — not generic luxury stock",
    status: "have",
    category: "market",
    suggestedFilename: "market-dubai-4x5.jpg",
  },
  {
    id: "market-abudhabi",
    label: "Abu Dhabi market visual",
    purpose: "Invest carousel + /invest/abu-dhabi",
    ratio: "4:5",
    minimumWidth: 1600,
    altRequirement: "Abu Dhabi context imagery",
    status: "have",
    category: "market",
    suggestedFilename: "market-abu-dhabi-4x5.jpg",
  },
  {
    id: "market-rak",
    label: "Ras Al Khaimah market visual",
    purpose: "Invest carousel + /invest/rak",
    ratio: "4:5",
    minimumWidth: 1600,
    altRequirement: "RAK waterfront / market context",
    status: "have",
    category: "market",
    suggestedFilename: "market-rak-4x5.jpg",
  },
  {
    id: "service-strategy",
    label: "Strategy stage visual",
    purpose: "How Morgan Works stage 01",
    ratio: "16:10",
    minimumWidth: 1800,
    altRequirement: "Strategy / briefing context",
    status: "required",
    category: "service",
    suggestedFilename: "service-strategy-16x10.jpg",
  },
  {
    id: "service-underwriting",
    label: "Underwriting stage visual",
    purpose: "How Morgan Works stage 02",
    ratio: "16:10",
    minimumWidth: 1800,
    altRequirement: "Underwriting / numbers context",
    status: "required",
    category: "service",
  },
  {
    id: "service-acquisition",
    label: "Acquisition stage visual",
    purpose: "How Morgan Works stage 03",
    ratio: "16:10",
    minimumWidth: 1800,
    altRequirement: "Acquisition context",
    status: "required",
    category: "service",
  },
  {
    id: "service-portfolio",
    label: "Portfolio stage visual",
    purpose: "How Morgan Works stage 04",
    ratio: "16:10",
    minimumWidth: 1800,
    altRequirement: "Portfolio strategy context",
    status: "required",
    category: "service",
  },
  {
    id: "intelligence-yield",
    label: "Yield analysis thumbnail",
    purpose: "Intelligence featured / carousel",
    ratio: "16:10",
    minimumWidth: 1600,
    altRequirement: "Yield / analysis editorial visual",
    status: "required",
    category: "intelligence",
  },
  {
    id: "intelligence-market-data",
    label: "Market data thumbnail",
    purpose: "Real Numbers / data cards",
    ratio: "16:10",
    minimumWidth: 1600,
    altRequirement: "Sourced data briefing visual",
    status: "required",
    category: "intelligence",
  },
];

export function getAssetRequirement(id: string) {
  return assetRequirements.find((a) => a.id === id);
}
