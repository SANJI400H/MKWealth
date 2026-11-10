import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectListing } from "@/components/invest/CatalogueViews";
import { getCatalogueProject, getShelfProjects } from "@/content/invest-catalogue";
import { pageMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getShelfProjects("secondary").map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getCatalogueProject("secondary", params.slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} | Secondary | Morgan Kaiser`,
    description: `Ready villas in ${project.name}. Unit and price are not published.`,
    path: `/invest/secondary/${project.slug}`,
  });
}

export default function SecondaryProjectPage({ params }: { params: Params }) {
  const project = getCatalogueProject("secondary", params.slug);
  if (!project) notFound();
  return <ProjectListing project={project} />;
}
