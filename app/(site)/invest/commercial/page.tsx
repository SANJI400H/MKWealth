import type { Metadata } from "next";
import { ShelfListing } from "@/components/invest/CatalogueViews";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Commercial | Morgan Kaiser",
  description: "Office projects on the stock list, including launches and the AHS Tower floor resale.",
  path: "/invest/commercial",
});

export default function CommercialPage() {
  return <ShelfListing shelfId="commercial" />;
}
