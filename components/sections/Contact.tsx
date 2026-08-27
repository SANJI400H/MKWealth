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
          <p className="eyebrow">Conversion</p>
          <h2 className="section-title">
            Your 30-minute
            <br />
            property strategy session.
          </h2>
          <p className="section-lead">
            Before discussing individual properties, we establish what the investment actually needs to achieve.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80} className="section-body">
          <div className="cta-row">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
            <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Work With Morgan
            </Link>
            <WhatsAppLink
              message="Hi Morgan, I'd like to book a 30-minute property strategy session."
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
