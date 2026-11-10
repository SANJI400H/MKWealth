import type { Metadata } from "next";
import { ShelfListing } from "@/components/invest/CatalogueViews";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Offplan | Morgan Kaiser",
  description: "Home launches still sold by the developer, with the price, payment plan and handover from the stock list.",
  path: "/invest/offplan",
});

export default function OffplanPage() {
  return <ShelfListing shelfId="offplan" />;
}
