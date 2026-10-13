import Image from "next/image";
import Link from "next/link";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="home"
      className="cinema-section relative overflow-hidden bg-paper"
      aria-label="Introduction"
      data-revealed="true"
    >
      <div className="mx-auto grid min-h-[100dvh] max-w-content grid-cols-[minmax(0,1.15fr)_minmax(6.75rem,0.85fr)] items-center gap-3 px-4 pb-8 pt-20 sm:gap-8 sm:px-8 sm:pt-24">
        <div className="w-full text-left">
          <p className="font-display text-xl font-bold tracking-tight text-maroon sm:text-3xl md:text-4xl">
            {siteConfig.name}
          </p>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted sm:text-xs">
            {siteConfig.role}
          </p>
          <h1 className="display mt-3 max-w-xl text-[1.35rem] leading-[1.12] text-ink sm:mt-4 sm:text-5xl md:text-[3.15rem]">
            Vision First.
            <br />
            Strategy Second.
            <br />
            Property Third.
          </h1>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
            Numbers-led property portfolio strategies that begin with your objectives before any unit.
          </p>
          <div className="cta-row mt-5 w-full md:justify-start">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto" />
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            <Link href="/work-with-morgan" className="font-semibold text-maroon underline-offset-2 hover:underline">
              How engagement works
            </Link>
          </p>
        </div>

        <div className="relative aspect-[1168/1280] w-full self-center overflow-hidden bg-[#a3b1b4] md:aspect-auto md:h-full md:min-h-[70vh]">
          <Image
            src="/images/morgan-hero-white.jpg"
            alt="Morgan Kaiser in a white shirt"
            fill
            priority
            sizes="(min-width: 768px) 42vw, 38vw"
            className="object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}
