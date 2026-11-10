import type { Metadata } from "next";
import { InvestCatalogueHub } from "@/components/invest/CatalogueViews";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Invest | Offplan, resale, commercial and secondary | Morgan Kaiser",
  description:
    "UAE property listed by how you buy: offplan, offplan resale, commercial offices, and ready homes in named communities.",
  path: "/invest",
});

export default function InvestHubPage() {
  return (
    <main>
      <InvestCatalogueHub />
    </main>
  );
}
