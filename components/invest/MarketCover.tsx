import Image from "next/image";
import { investLocations } from "@/content/invest-locations";

/** Full-width cover for one emirate page, same treatment as the About photo. */
export default function MarketCover({ id }: { id: "abu-dhabi" | "dubai" | "rak" }) {
  const location = investLocations.find((item) => item.id === id);
  if (!location) return null;

  return (
    <section
      className="relative mt-[calc(3.5rem+env(safe-area-inset-top,0px))] w-full bg-[#100e0c] sm:mt-[calc(4rem+env(safe-area-inset-top,0px))]"
      aria-label={location.name}
    >
      <Image
        src={location.cover}
        alt={location.coverAlt}
        width={location.coverWidth}
        height={location.coverHeight}
        priority
        sizes="100vw"
        className="h-auto w-full object-contain"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
      <div className="absolute left-[5%] top-1/2 z-10 -translate-y-1/2 text-left sm:left-[7%]">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 sm:text-xs">
          {location.tag}
        </p>
        <p
          className="mt-1 font-display text-[clamp(1.75rem,4vw,4.25rem)] font-bold tracking-tight text-white"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.65)" }}
        >
          {location.name}
        </p>
      </div>
      <p
        className="absolute bottom-3 right-4 z-10 max-w-[18rem] text-right text-[10px] leading-snug text-white/80 sm:bottom-4 sm:right-6"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
      >
        {location.coverCredit}
      </p>
    </section>
  );
}
