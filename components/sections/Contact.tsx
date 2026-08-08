import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/lib/site-config";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper py-24 sm:py-32" aria-label="Contact">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-5 max-w-2xl text-4xl text-ink sm:text-7xl">
            Start the conversation.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Book a meeting, unlock the guide, or message Morgan on WhatsApp.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80} className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Book a Meeting
            </a>
            <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Download Free Guide
            </Link>
            <WhatsAppLink
              message="Hi Morgan, I'd like to book a meeting about UAE off-plan investment."
              className="btn-ghost-dark w-full justify-center sm:w-auto"
            >
              WhatsApp
            </WhatsAppLink>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium tracking-wide text-ink-muted">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              Instagram
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              LinkedIn
            </a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              TikTok
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
