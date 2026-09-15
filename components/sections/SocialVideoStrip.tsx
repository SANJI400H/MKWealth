import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SocialStripClient from "@/components/social/SocialStripClient";
import { feedHasItems, getSocialFeed } from "@/lib/social/feed";

/**
 * Homepage social strip — Latest / Most viewed from YouTube + Instagram.
 * Hides entirely when both platforms return empty.
 */
export default async function SocialVideoStrip() {
  const feed = await getSocialFeed();
  if (!feedHasItems(feed)) return null;

  return (
    <section id="social" className="section-pad bg-paper" aria-label="Watch on social">
      <div className="section-inner">
        <RevealOnScroll>
          <p className="eyebrow">Watch</p>
          <h2 className="section-title">From the feed.</h2>
          <p className="section-lead">
            Latest uploads and most-watched clips from YouTube and Instagram — numbers first, then
            property.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="section-body">
          <SocialStripClient feed={feed} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
