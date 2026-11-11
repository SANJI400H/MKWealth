import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

/** Alias: Private Desk → hosted client dashboard. */
export default function DeskPage() {
  redirect(siteConfig.clientPortalUrl);
}
