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
          <div className="flex flex-col items-start gap-4">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto" />
            <p className="text-sm text-ink-muted">
              Prefer chat?{" "}
              <WhatsAppLink
                message="Hi Morgan, I'd like to book a 30-minute property strategy session."
                className="font-semibold text-maroon underline-offset-2 hover:underline"
              >
                WhatsApp Morgan
              </WhatsAppLink>
              {" · "}
              <Link href="/true-cost" className="font-semibold text-maroon underline-offset-2 hover:underline">
                Get the True Cost worksheet
              </Link>
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
