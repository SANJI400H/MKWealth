import type { Metadata } from "next";
import { ShelfListing } from "@/components/invest/CatalogueViews";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Secondary | Morgan Kaiser",
  description: "Ready villas in the communities where secondary stock is being worked. Asking prices are not listed.",
  path: "/invest/secondary",
});

export default function SecondaryPage() {
  return <ShelfListing shelfId="secondary" />;
}
