"use client";

import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { BOOKING_URL } from "@/lib/site-config";

/**
 * Shown after the qualification form. Open slots are optional and never a made-up link.
 */
export default function BookingSchedule() {
  const missing = !BOOKING_URL;

  return (
    <div className="mt-6 w-full text-left">
      {missing ? (
        <div className="rounded-md border border-line bg-surface px-4 py-4">
          {process.env.NODE_ENV === "development" ? (
            <p className="text-sm font-medium text-maroon">
              TODO: set NEXT_PUBLIC_BOOKING_URL. The appointment calendar is empty in this environment.
            </p>
          ) : null}
          <p className="mt-2 text-sm text-ink-muted">
            The live calendar is not configured yet. Request a time and Morgan will reply with options.
          </p>
          <WhatsAppLink
            message="Hi Morgan, I submitted a strategy session request and would like to request a time."
            className="btn-primary mt-4 inline-flex"
          >
            Request a time
          </WhatsAppLink>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-line bg-paper">
          <p className="border-b border-line px-4 py-3 text-sm text-ink-muted">
            Choose a time that suits you. Morgan still reviews the request before the session is confirmed.
          </p>
          <iframe
            title="Book a 30 minute strategy session"
            src={BOOKING_URL}
            className="h-[640px] w-full bg-paper"
            loading="lazy"
          />
          <div className="flex flex-col gap-3 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-maroon hover:underline">
              Open the calendar in a new tab
            </a>
            <WhatsAppLink
              message="Hi Morgan, I submitted a strategy session request and would like to request a time."
              className="text-sm font-semibold text-ink hover:text-maroon"
            >
              Request a time instead
            </WhatsAppLink>
          </div>
        </div>
      )}
    </div>
  );
}
