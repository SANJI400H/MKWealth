/** Multi-step qualification before Investor Guide unlock (dataroom-style). */

export type GuideQualifyOption = {
  id: string;
  label: string;
  description?: string;
};

export type GuideQualifyStep = {
  id: string;
  title: string;
  subtitle: string;
  field:
    | "objective"
    | "budgetRange"
    | "market"
    | "timeline"
    | "financing"
    | "contact";
  options?: GuideQualifyOption[];
};

export const guideQualifySteps: GuideQualifyStep[] = [
  {
    id: "objective",
    title: "What are you here for?",
    subtitle: "Morgan works selectively. This helps route the right briefings.",
    field: "objective",
    options: [
      {
        id: "off-plan",
        label: "Off-plan acquisition",
        description: "Secure the right unit in an upcoming or live launch.",
      },
      {
        id: "portfolio",
        label: "Portfolio strategy",
        description: "Structure capital across markets before picking stock.",
      },
      {
        id: "compare",
        label: "Compare markets",
        description: "Dubai vs Abu Dhabi vs Ras Al Khaimah for your brief.",
      },
      {
        id: "learn",
        label: "Learn the process",
        description: "Understand costs, payment plans, and yield properly.",
      },
    ],
  },
  {
    id: "budget",
    title: "Indicative investment capacity",
    subtitle: "A range is enough. Exact figures stay between you and Morgan.",
    field: "budgetRange",
    options: [
      { id: "under-1m", label: "Under AED 1m" },
      { id: "1-2m", label: "AED 1m – 2m" },
      { id: "2-5m", label: "AED 2m – 5m" },
      { id: "5-10m", label: "AED 5m – 10m" },
      { id: "10m-plus", label: "AED 10m+" },
      { id: "undisclosed", label: "Prefer to discuss later" },
    ],
  },
  {
    id: "market",
    title: "Primary market interest",
    subtitle: "You can change this later. Pick the strongest pull today.",
    field: "market",
    options: [
      { id: "dubai", label: "Dubai" },
      { id: "abu-dhabi", label: "Abu Dhabi" },
      { id: "rak", label: "Ras Al Khaimah" },
      { id: "undecided", label: "Not sure yet" },
    ],
  },
  {
    id: "timeline",
    title: "When do you want to move?",
    subtitle: "Timing shapes which launches and payment plans are relevant.",
    field: "timeline",
    options: [
      { id: "0-3m", label: "Within 3 months" },
      { id: "3-6m", label: "3 – 6 months" },
      { id: "6-12m", label: "6 – 12 months" },
      { id: "research", label: "Researching only for now" },
    ],
  },
  {
    id: "financing",
    title: "How do you expect to fund it?",
    subtitle: "Financing coordination runs via Huspy when a mortgage is in play.",
    field: "financing",
    options: [
      { id: "cash", label: "Cash / equity" },
      { id: "mortgage", label: "Mortgage / financing" },
      { id: "mix", label: "Mix of both" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "contact",
    title: "Unlock the Investor Guide",
    subtitle:
      "Serious investors only. Share how Morgan can reach you. This unlocks videos and downloads on this browser.",
    field: "contact",
  },
];
