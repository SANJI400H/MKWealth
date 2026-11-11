import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

/** Public stills only. Playback stays behind the /guide gate. */
const guidePreviews = [
  { id: "guide-01", title: "Guide 01", poster: "/images/guide-previews/guide-01.jpg" },
  { id: "guide-02", title: "Guide 02", poster: "/images/guide-previews/guide-02.jpg" },
  { id: "guide-03", title: "Guide 03", poster: "/images/guide-previews/guide-03.jpg" },
  { id: "guide-04", title: "Guide 04", poster: "/images/guide-previews/guide-04.jpg" },
  { id: "guide-06", title: "Guide 06", poster: "/images/guide-previews/guide-06.jpg" },
  { id: "guide-07", title: "Guide 07", poster: "/images/guide-previews/guide-07.jpg" },
  { id: "guide-08", title: "Guide 08", poster: "/images/guide-previews/guide-08.jpg" },
] as const;

function GuidePreview({ title, poster }: { title: string; poster: string }) {
  return (
    <article className="pointer-events-none flex h-full select-none flex-col border border-silver bg-paper">
      <div className="relative aspect-video overflow-hidden bg-ink/5">
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 640px) 50vw, 85vw"
          className="object-cover"
          unoptimized
        />
        <span className="absolute inset-0 flex items-center justify-center bg-ink/25" aria-hidden>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-paper text-maroon shadow-sm">
            <Play size={22} fill="currentColor" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-maroon">Private guide</p>
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      </div>
    </article>
  );
}

/** Homepage stills from the gated series. The only action is Watch Free Guide. */
export default function VideoGuidesPreview() {
  return (
    <section id="video-guides" className="section-pad bg-paper" aria-label="Video Guides">
      <div className="section-inner">
        <RevealOnScroll>
          <p className="eyebrow">Video Guides</p>
          <h2 className="section-title">
            Learn before
            <br />
            you book.
          </h2>
          <p className="section-lead">
            Previews from the private investor series. The films open after you qualify.
          </p>
        </RevealOnScroll>

        <EditorialCarousel
          ariaLabel="Private investor guide previews"
          previousLabel="Previous guide"
          nextLabel="Next guide"
          slideClassName="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)]"
          className="section-body"
        >
          {guidePreviews.map((guide) => (
            <GuidePreview key={guide.id} title={guide.title} poster={guide.poster} />
          ))}
        </EditorialCarousel>

        <RevealOnScroll className="mt-8">
          <Link href="/guide" className="btn-ghost-dark">
            Watch Free Guide →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
