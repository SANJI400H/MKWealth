import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbListSchema, type BreadcrumbItem } from "@/lib/schema";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbListSchema(items)} />
      <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === items.length - 1 ? (
                <span className="text-ink" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-gold">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
