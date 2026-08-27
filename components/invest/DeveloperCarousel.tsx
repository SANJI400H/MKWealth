"use client";

import Link from "next/link";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import EditorialImage from "@/components/ui/EditorialImage";
import { developerImages } from "@/content/editorial-images";
import { getPublishedDevelopers, type Developer } from "@/content/developers";

function filterByMarket(market?: "dubai" | "abu-dhabi" | "rak") {
  const all = getPublishedDevelopers();
  if (!market) return all;
  return all.filter((d) => d.markets.includes(market));
}

function DeveloperCard({ developer }: { developer: Developer }) {
  const photo = developerImages[developer.slug];

  return (
    <Link
      href={`/developers/${developer.slug}`}
      className="group flex h-full flex-col border border-silver bg-paper"
    >
      <EditorialImage
        src={photo?.src}
        alt={photo?.alt ?? `${developer.name} — developer evaluation context`}
        categoryLabel="Developer framework"
        ratio="16:10"
        className="border-0 border-b border-silver"
      />
      <div className="card-pad flex flex-1 flex-col space-y-3">
        <p className="eyebrow">Developer framework</p>
        <h3 className="card-title transition group-hover:text-maroon">{developer.name}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{developer.tagline}</p>
        <span className="text-link mt-auto pt-2 transition group-hover:translate-x-1">
          Explore Framework →
        </span>
      </div>
    </Link>
  );
}

/** Evaluation frameworks — not endorsements. */
export default function DeveloperCarousel({
  market,
}: {
  market?: "dubai" | "abu-dhabi" | "rak";
}) {
  const developers = filterByMarket(market);
  if (developers.length === 0) return null;

  const useGrid = developers.length <= 2;
  const cards = developers.map((d) => <DeveloperCard key={d.slug} developer={d} />);

  return (
    <section id="developers" className="page-block" aria-label="Developers to understand">
      <p className="eyebrow">Developers to understand</p>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Evaluation frameworks.</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
        Brand strength is not a substitute for unit underwriting. These pages are frameworks — not recommendations.
      </p>

      <div className="mt-8">
        {useGrid ? (
          <div className="grid gap-5 sm:grid-cols-2">{cards}</div>
        ) : (
          <EditorialCarousel
            ariaLabel="Developers to understand"
            previousLabel="Previous developer"
            nextLabel="Next developer"
          >
            {cards}
          </EditorialCarousel>
        )}
      </div>
      <p className="mt-8">
        <Link href="/developers" className="text-link">
          All developer frameworks →
        </Link>
      </p>
    </section>
  );
}
