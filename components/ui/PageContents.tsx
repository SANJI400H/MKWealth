import type { SectionNavItem } from "@/components/ui/SectionNavigation";

/** Quiet in-page contents, used on About instead of sticky chrome. */
export default function PageContents({
 items,
 label = "In this page",
}: {
 items: SectionNavItem[];
 label?: string;
}) {
 return (
 <nav aria-label={label} className="mt-10 border-t border-line pt-8">
 <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon">{label}</p>
 <ul className="mt-4 flex flex-col gap-2.5">
 {items.map((item) => (
 <li key={item.id}>
 <a
 href={`#${item.id}`}
 className="text-sm font-medium text-ink-muted transition hover:text-maroon"
 >
 {item.label}
 </a>
 </li>
 ))}
 </ul>
 </nav>
 );
}
