import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { morganProfile } from "@/content/morgan-profile";

/**
 * Proof architecture, verified slots only.
 * Never shows fabricated testimonials.
 */
export default function Proof() {
 const hasCredentials = Boolean(morganProfile.reraOrDldCredential || morganProfile.awards?.length);

 return (
 <section id="proof" className="section-pad bg-paper" aria-label="Proof">
 <div className="section-inner">
 <RevealOnScroll>
 <p className="eyebrow">Proven in practice</p>
 <h2 className="section-title">After the numbers.</h2>
 <p className="section-lead">
 Credentials and methodology appear here only when verified, never as placeholders presented as fact.
 </p>
 </RevealOnScroll>

 <div className="section-body grid gap-8 sm:grid-cols-2 sm:gap-10">
 {[
 {
 title: "Methodology",
 body: "Brief first. Underwrite the deal. Acquire only when the mathematics fit.",
 href: "/about#methodology",
 },
 {
 title: "Credentials",
 body: hasCredentials
 ? `${morganProfile.reraOrDldCredential ?? "Licence on file"}${
 morganProfile.awards.length ? ` · ${morganProfile.awards.join(" · ")}` : ""
 }`
 : "Structure ready, awaiting verified licence and recognition details.",
 href: "/about#credentials",
 },
 ].map((item) => (
 <RevealOnScroll key={item.title}>
 <Link href={item.href} className="group block">
 <h3 className="font-display text-xl font-bold text-ink transition group-hover:text-maroon">
 {item.title}
 </h3>
 <p className="body-copy-sm mt-3 sm:text-base">{item.body}</p>
 </Link>
 </RevealOnScroll>
 ))}
 </div>
 </div>
 </section>
 );
}
