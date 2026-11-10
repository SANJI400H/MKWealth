import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectListing } from "@/components/invest/CatalogueViews";
import { getCatalogueProject, getShelfProjects } from "@/content/invest-catalogue";
import { pageMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getShelfProjects("commercial").map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getCatalogueProject("commercial", params.slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} | Commercial | Morgan Kaiser`,
    description: `${project.name}. ${project.product}.`,
    path: `/invest/commercial/${project.slug}`,
  });
}

export default function CommercialProjectPage({ params }: { params: Params }) {
  const project = getCatalogueProject("commercial", params.slug);
  if (!project) notFound();
  return <ProjectListing project={project} />;
}
