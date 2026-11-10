import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import PageIntro from "@/components/ui/PageIntro";
import StickySectionNav from "@/components/ui/StickySectionNav";
import GlassProjectCarousel from "@/components/invest/GlassProjectCarousel";
import {
  catalogueShelves,
  getShelf,
  getShelfProjects,
  projectMedia,
  projectPath,
  type CatalogueFact,
  type CatalogueProject,
  type ShelfId,
} from "@/content/invest-catalogue";

const metricLabels = new Set([
  "Developer",
  "Emirate",
  "Location",
  "Status",
  "Stage",
  "Scale",
  "Units for sale",
  "Homes on the list",
  "Price",
  "Price from",
  "Handover",
]);

function isMetric(fact: CatalogueFact) {
  return metricLabels.has(fact.label) && fact.value.length <= 80;
}

function FactValue({ fact, className }: { fact: CatalogueFact; className?: string }) {
  if (!fact.href) return <span className={className}>{fact.value}</span>;
  return (
    <Link href={fact.href} className={`font-semibold text-maroon hover:underline ${className ?? ""}`}>
      {fact.value}
    </Link>
  );
}

function ProjectIndex({ projects }: { projects: CatalogueProject[] }) {
  return (
    <ul className="mt-6 divide-y divide-silver border-y border-silver">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={projectPath(project)} className="group flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-6">
            {projectMedia[project.slug] ? (
              <span className="relative block h-20 w-full shrink-0 overflow-hidden bg-surface sm:h-16 sm:w-28">
                <Image src={projectMedia[project.slug].image} alt="" fill className="object-cover" sizes="112px" />
              </span>
            ) : null}
            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <span className="font-display text-xl font-bold text-ink group-hover:text-maroon">{project.name}</span>
              <span className="text-sm text-ink-muted">{project.product}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function sectionId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const investSections = catalogueShelves.map((shelf) => ({ id: shelf.id, label: shelf.name }));
const investCover = projectMedia["infinity-ramhan-island"];

export function InvestCatalogueHub() {
  return (
    <>
      <section
        className="relative mt-[calc(3.5rem+env(safe-area-inset-top,0px))] w-full overflow-hidden bg-[#100e0c] sm:mt-[calc(4rem+env(safe-area-inset-top,0px))]"
        aria-label="Invest"
      >
        <div className="relative aspect-[2.35/1] min-h-[16rem] w-full sm:min-h-[22rem]">
          {investCover ? (
            <Image
              src={investCover.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 via-[42%] to-transparent to-[78%]" />
          <div className="absolute left-[5%] top-1/2 z-10 -translate-y-1/2 sm:left-[7%]">
            <h1
              className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] text-white"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            >
              Invest
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
              Offplan, offplan resale, commercial, and ready homes.
            </p>
          </div>
        </div>
      </section>

      <Breadcrumbs visible={false} items={[{ name: "Home", path: "/" }, { name: "Invest", path: "/invest" }]} />
      <StickySectionNav
        items={investSections}
        layoutId="invest-section-pill"
        ariaLabel="Invest sections"
        className="mt-8 w-full !mx-0"
      />

      {catalogueShelves.map((shelf) => {
        const projects = getShelfProjects(shelf.id);
        return (
          <section
            key={shelf.id}
            id={shelf.id}
            style={{ scrollMarginTop: "calc(4rem + env(safe-area-inset-top, 0px) + 5.75rem)" }}
            className="pt-5"
          >
            <div className="mx-auto w-full max-w-3xl px-4 sm:px-8">
              <p className="eyebrow">{shelf.kicker}</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink">
                <Link href={shelf.href} className="hover:text-maroon">
                  {shelf.name}
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">{shelf.summary}</p>
            </div>
            <GlassProjectCarousel projects={projects} label={`${shelf.name} projects`} className="mt-4 pb-5" />
          </section>
        );
      })}

      <div className="page-shell !pt-4">
        <section className="max-w-3xl space-y-4 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Ownership</h2>
          <p className="body-copy">
            Foreign nationals have been permitted freehold ownership in designated areas of Dubai since 2002, and in
            designated zones of Abu Dhabi and Ras Al Khaimah as well. Residency is not required to buy. What is required
            is clarity on funding, fees and, if relevant, financing.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Golden Visa</h2>
          <p className="body-copy">
            Property at or above the commonly cited federal threshold may qualify, subject to current rules, including how
            a mortgage and an off-plan payment are treated. Confirm the requirement at the time of application.
          </p>
        </section>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Watch Free Guide
          </Link>
          <Link href="/tools" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Tools
          </Link>
        </div>
      </div>
    </>
  );
}

export function ShelfListing({ shelfId }: { shelfId: ShelfId }) {
  const shelf = getShelf(shelfId);
  const projects = getShelfProjects(shelfId);

  return (
    <main>
      <div className="page-shell !pb-0">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/invest" },
            { name: shelf.name, path: shelf.href },
          ]}
        />
        <p className="eyebrow mt-8">{shelf.kicker}</p>
        <PageIntro title={shelf.name} lead={shelf.summary} />
      </div>
      <GlassProjectCarousel projects={projects} label={`${shelf.name} projects`} />
    </main>
  );
}

export function ProjectListing({ project }: { project: CatalogueProject }) {
  const shelf = getShelf(project.shelf);
  const media = projectMedia[project.slug];
  const metrics = project.facts.filter((fact) => isMetric(fact) && fact.label !== "Product");
  const notes = project.facts.filter((fact) => !isMetric(fact) && fact.label !== "Product");
  const related = getShelfProjects(project.shelf).filter((item) => item.slug !== project.slug);
  const sections = [
    { id: "overview", label: "Overview" },
    ...notes.map((fact) => ({ id: sectionId(fact.label), label: fact.label })),
    ...(media && media.gallery.length > 0 ? [{ id: "images", label: "Images" }] : []),
    ...(related.length > 0 ? [{ id: "more", label: "More" }] : []),
  ];

  return (
    <main>
      <section
        className="relative mt-[calc(3.5rem+env(safe-area-inset-top,0px))] w-full overflow-hidden bg-[#100e0c] sm:mt-[calc(4rem+env(safe-area-inset-top,0px))]"
        aria-label={project.name}
      >
        <div className="relative aspect-[2.35/1] min-h-[16rem] w-full sm:min-h-[22rem]">
          {media ? (
            <Image
              src={media.image}
              alt={`${project.name} render`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 via-[42%] to-transparent to-[78%]" />
          <div className="absolute left-[5%] top-1/2 z-10 w-[min(52%,40rem)] -translate-y-1/2 sm:left-[7%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">{shelf.name}</p>
            <h1
              className="mt-3 font-display text-[clamp(1.75rem,4vw,3.75rem)] font-bold leading-[1.05] text-white"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            >
              {project.name}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">{project.product}</p>
          </div>
          {media ? (
            <p className="absolute bottom-3 left-[5%] z-10 text-[11px] text-white/80 sm:left-[7%]">{media.credit}</p>
          ) : null}
        </div>
      </section>

      <div className="page-shell-wide !pt-8 sm:!pt-10">
        <Breadcrumbs
          visible={false}
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/invest" },
            { name: shelf.name, path: shelf.href },
            { name: project.name, path: projectPath(project) },
          ]}
        />
        <StickySectionNav
          items={sections}
          layoutId={`project-section-${project.slug}`}
          ariaLabel={`${project.name} sections`}
          className="mt-8"
        />

        <section id="overview" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] pt-10 sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)]">
          {metrics.length > 0 ? (
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((fact) => (
                <div key={fact.label} className="border border-silver bg-surface px-4 py-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{fact.label}</dt>
                  <dd className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                    <FactValue fact={fact} />
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>

        {notes.map((fact) => (
          <section
            key={fact.label}
            id={sectionId(fact.label)}
            className="page-block scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)]"
          >
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{fact.label}</h2>
            <p className="body-copy mt-4">
              <FactValue fact={fact} />
            </p>
          </section>
        ))}

        {media && media.gallery.length > 0 ? (
          <section id="images" className="page-block scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)]">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Images</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {media.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image src={src} alt={`${project.name} render`} fill className="object-cover" sizes="(min-width: 640px) 34rem, 100vw" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section id="more" className="page-block scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)]">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Also in {shelf.name}</h2>
            <ProjectIndex projects={related} />
          </section>
        ) : null}

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Watch Free Guide
          </Link>
          <Link href={shelf.href} className="btn-ghost-dark w-full justify-center sm:w-auto">
            All {shelf.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
