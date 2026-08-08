import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema, type FaqItem } from "@/lib/schema";

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section aria-label="Frequently asked questions" className="mt-16">
      <JsonLd data={faqPageSchema(items)} />
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.question} className="border-b border-ink/10 pb-6">
            <h3 className="font-display text-lg font-bold text-ink">{item.question}</h3>
            <p className="mt-2 text-ink-muted">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
