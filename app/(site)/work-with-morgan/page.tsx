import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import WorkWithMorganTabs from "@/components/invest/WorkWithMorganTabs";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work With Morgan | Services & Engagement",
  description:
    "How Morgan Kaiser works with international investors: strategy, acquisition, underwriting, portfolio, financing and purchase coordination.",
  path: "/work-with-morgan",
});

export default function WorkWithMorganPage() {
  return (
    <>
      <main className="page-shell">
        <Breadcrumbs
          visible={false}
          items={[
            { name: "Home", path: "/" },
            { name: "Work With Morgan", path: "/work-with-morgan" },
          ]}
        />
        <WorkWithMorganTabs />
      </main>
      <SiteFooter />
    </>
  );
}
