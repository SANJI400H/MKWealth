import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import AreaDetailTabs from "@/components/invest/AreaDetailTabs";
import { getAreaBySlug, getPublishedAreas } from "@/content/areas";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedAreas().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const area = getAreaBySlug(params.slug);
  if (!area) return {};
  return pageMetadata({
    title: `${area.name} Property Investment | Morgan Kaiser`,
    description: area.tagline,
    path: `/areas/${area.slug}`,
  });
}

export default function AreaPage({ params }: Props) {
  const area = getAreaBySlug(params.slug);
  if (!area) notFound();

  return (
    <>
      <main className="page-shell">
        <Breadcrumbs
          visible={false}
          items={[
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]}
        />
        <AreaDetailTabs area={area} />
      </main>
      <SiteFooter />
    </>
  );
}
