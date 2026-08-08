import Link from "next/link";

export default function GuideCallout() {
  return (
    <div className="mt-16 border-t border-line pt-10">
      <p className="eyebrow">Free Resource</p>
      <h2 className="display mt-3 text-2xl text-ink sm:text-3xl">Want the walkthrough on video?</h2>
      <p className="mt-3 max-w-xl text-ink-muted">
        Payment plans, handover risk, and Golden Visa eligibility — unlock Morgan&apos;s short video guide.
      </p>
      <Link href="/guide" className="btn-primary mt-6">
        Unlock the guide
      </Link>
    </div>
  );
}
