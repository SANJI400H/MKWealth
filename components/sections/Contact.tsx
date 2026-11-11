"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import Link from "next/link";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-paper" aria-label="Contact">
      <div className="section-inner">
        <RevealOnScroll>
          <h2 className="section-title">
            Your 30-minute
            <br />
            property strategy session.
          </h2>
          <p className="section-lead">
            Before discussing individual properties, Morgan establishes what the investment actually needs to achieve.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80} className="section-body">
          <div className="cta-row w-full">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto" />
            <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Watch Free Guide
            </Link>
            <WhatsAppLink
              message="Hi Morgan, I'd like to book a 30-minute property strategy session."
              className="btn-ghost-dark w-full justify-center sm:w-auto"
            >
              WhatsApp Morgan
            </WhatsAppLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
