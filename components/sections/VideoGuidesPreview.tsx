import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import VideoGuideCard from "@/components/video/VideoGuideCard";
import { videoGuides } from "@/content/video-guides";

/** Homepage preview of public Video Guides — mid-funnel education before Contact. */
export default function VideoGuidesPreview() {
  const featured = videoGuides.slice(0, 2);

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
            Short guides on cost, yield, and off-plan — then a clear next step on every video.
          </p>
        </RevealOnScroll>

        <div className="section-body grid gap-5 sm:grid-cols-2">
          {featured.map((guide) => (
            <VideoGuideCard key={guide.id} guide={guide} />
          ))}
        </div>

        <RevealOnScroll className="mt-8">
          <Link href="/video-guides" className="btn-ghost-dark">
            All Video Guides →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
