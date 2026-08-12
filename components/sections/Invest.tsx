import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { investLocations } from "@/content/invest-locations";

/** Gallery half starts here, hard cut from cinema to stark white. */
export default function Invest() {
  return (
    <section
      id="invest"
      className="border-t border-line bg-paper pb-24 pt-28 sm:pb-32 sm:pt-36"
      aria-label="Invest in the UAE"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Invest in the UAE</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">
            Three markets.
            <br />
            Different rules.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Dubai carries the deal flow. Abu Dhabi and Ras Al Khaimah are regional context: honest, not hyped.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-14 sm:mt-20 md:grid-cols-3 md:gap-8">
          {investLocations.map((location, index) => (
            <RevealOnScroll key={location.id} delayMs={index * 70}>
              <Link href={location.slug} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f7]">
                  <Image
                    src={location.image}
                    alt={`${location.name} real estate investment`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="img-smooth object-cover"
                  />
                </div>
                <p className="eyebrow mt-6">{location.tag}</p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink transition group-hover:text-gold">
                  {location.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{location.summary}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
