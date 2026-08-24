import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { morganProfile } from "@/content/morgan-profile";

/**
 * Proof architecture — verified slots only.
 * Never shows fabricated testimonials.
 */
export default function Proof() {
  const hasCredentials = Boolean(morganProfile.reraOrDldCredential || morganProfile.awards?.length);
  const hasMedia = Boolean(morganProfile.mediaAppearances?.length);

  return (
    <section id="proof" className="border-t border-line bg-paper py-24 sm:py-32" aria-label="Proof">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Proven in practice</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">After the numbers.</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Credentials, results, and recognition appear here only when verified and approved — never as
            placeholders presented as fact.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Methodology",
              body: "Brief first. Underwrite the deal. Acquire only when the mathematics fit.",
              href: "/about#methodology",
            },
            {
              title: "Credentials",
              body: hasCredentials
                ? "Verified professional credentials."
                : "Structure ready — awaiting verified licence and recognition details.",
              href: "/about#credentials",
            },
            {
              title: "Client results",
              body: "Case studies publish only with permission. Anonymised examples welcome.",
              href: "/case-studies",
            },
          ].map((item) => (
            <RevealOnScroll key={item.title}>
              <Link href={item.href} className="group block">
                <h3 className="font-display text-xl font-bold text-ink transition group-hover:text-maroon">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{item.body}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {hasMedia ? (
          <RevealOnScroll className="mt-10">
            <Link href="/about#media" className="text-sm font-semibold text-maroon hover:underline">
              Media & appearances →
            </Link>
          </RevealOnScroll>
        ) : null}
      </div>
    </section>
  );
}
