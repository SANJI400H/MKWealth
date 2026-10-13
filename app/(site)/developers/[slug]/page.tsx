import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import DeveloperDetailTabs from "@/components/invest/DeveloperDetailTabs";
import { getDeveloperBySlug, getPublishedDevelopers } from "@/content/developers";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedDevelopers().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const d = getDeveloperBySlug(params.slug);
  if (!d) return {};
  return pageMetadata({
    title: `${d.name} | Developer Analysis Framework | Morgan Kaiser`,
    description: d.tagline,
    path: `/developers/${d.slug}`,
  });
}

export default function DeveloperPage({ params }: Props) {
  const d = getDeveloperBySlug(params.slug);
  if (!d) notFound();

  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Developers", path: "/developers" },
            { name: d.name, path: `/developers/${d.slug}` },
          ]}
        />
        <DeveloperDetailTabs developer={d} />
      </main>
    </>
  );
}
