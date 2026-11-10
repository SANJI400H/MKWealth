"use client";

import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import { catalogueShelves, getShelfProjects } from "@/content/invest-catalogue";

function ShelfCard({ shelf }: { shelf: (typeof catalogueShelves)[number] }) {
  const projects = getShelfProjects(shelf.id);

  return (
    <Link href={shelf.href} className="card-lift group flex h-full flex-col border border-silver bg-paper">
      <div className="card-pad flex flex-1 flex-col">
        <p className="eyebrow">{shelf.kicker}</p>
        <h3 className="card-title-lg mt-3 transition group-hover:text-maroon">{shelf.name}</h3>
        <p className="body-copy mt-3">{shelf.summary}</p>
        <ul className="mt-4 space-y-2 border-t border-silver pt-4 text-sm text-ink-muted">
          {projects.map((project) => (
            <li key={project.slug} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon" aria-hidden />
              <span>{project.name}</span>
            </li>
          ))}
        </ul>
        <span className="text-link mt-auto pt-4 transition group-hover:translate-x-1">Explore {shelf.name} →</span>
      </div>
    </Link>
  );
}

/** Purchase-type shelves. No autoplay. */
export default function Invest() {
  return (
    <section id="invest" className="section-pad bg-paper" aria-label="Invest">
      <div className="section-inner">
        <RevealOnScroll>
          <p className="eyebrow">Invest</p>
          <h2 className="section-title">
            Four ways
            <br />
            to buy.
          </h2>
          <p className="section-lead">
            Offplan, offplan resale, commercial, and ready homes. The community sits on the project, not in the menu.
          </p>
        </RevealOnScroll>

        <div className="section-body">
          <EditorialCarousel ariaLabel="Explore how to buy" previousLabel="Previous shelf" nextLabel="Next shelf">
            {catalogueShelves.map((shelf) => (
              <ShelfCard key={shelf.id} shelf={shelf} />
            ))}
          </EditorialCarousel>
        </div>

        <RevealOnScroll className="mt-8">
          <Link href="/invest" className="btn-ghost-dark">
            See the full list →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
