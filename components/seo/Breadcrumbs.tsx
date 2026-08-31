import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbListSchema, type BreadcrumbItem } from "@/lib/schema";

/**
 * @param visible, when false, emits BreadcrumbList JSON-LD only (no on-page trail).
 */
export default function Breadcrumbs({
 items,
 visible = true,
}: {
 items: BreadcrumbItem[];
 visible?: boolean;
}) {
 return (
 <>
 <JsonLd data={breadcrumbListSchema(items)} />
 {visible ? (
 <nav aria-label="Breadcrumb" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
 <ol className="flex flex-wrap items-center gap-2">
 {items.map((item, index) => (
 <li key={item.path} className="flex items-center gap-2">
 {index > 0 ? <span aria-hidden="true">/</span> : null}
 {index === items.length - 1 ? (
 <span className="text-ink" aria-current="page">
 {item.name}
 </span>
 ) : (
 <Link href={item.path} className="hover:text-maroon">
 {item.name}
 </Link>
 )}
 </li>
 ))}
 </ol>
 </nav>
 ) : null}
 </>
 );
}
