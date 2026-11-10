import type { Metadata } from "next";
import { ShelfListing } from "@/components/invest/CatalogueViews";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Offplan resale | Morgan Kaiser",
  description: "Part-paid homes in unfinished communities: Palm Jebel Ali, The Hills, Al Naseem and Ramhan Island.",
  path: "/invest/offplan-resale",
});

export default function OffplanResalePage() {
  return <ShelfListing shelfId="offplan-resale" />;
}
