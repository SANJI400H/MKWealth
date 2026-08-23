import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/lib/site-config";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper py-24 sm:py-32" aria-label="Contact">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Work with Morgan</p>
          <h2 className="display mt-5 max-w-2xl text-4xl text-ink sm:text-7xl">Start with the brief.</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Match the next step to your intent — tools, analysis, or a strategy session.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80} className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
            <Link href="/analyse" className="btn-ghost-dark w-full justify-center sm:w-auto">
              {siteConfig.cta.analyse}
            </Link>
            <Link href="/calculators/true-yield" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Use a calculator
            </Link>
            <WhatsAppLink
              message="Hi Morgan, I'd like to discuss UAE property investment strategy."
              className="btn-ghost-dark w-full justify-center sm:w-auto"
            >
              WhatsApp
            </WhatsAppLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
