import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectListing } from "@/components/invest/CatalogueViews";
import { getCatalogueProject, getShelfProjects } from "@/content/invest-catalogue";
import { pageMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getShelfProjects("offplan").map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getCatalogueProject("offplan", params.slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} | Offplan | Morgan Kaiser`,
    description: `${project.name}. ${project.product}.`,
    path: `/invest/offplan/${project.slug}`,
  });
}

export default function OffplanProjectPage({ params }: { params: Params }) {
  const project = getCatalogueProject("offplan", params.slug);
  if (!project) notFound();
  return <ProjectListing project={project} />;
}
