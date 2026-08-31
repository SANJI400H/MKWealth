import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import EditorialImagePlaceholder from "@/components/ui/EditorialImagePlaceholder";

type VideoThumbnailCardProps = {
 href: string;
 title: string;
 description: string;
 category: string;
 posterSrc?: string;
 duration?: string;
 assetId?: string;
};

/** Premium video card, no autoplay in rails. */
export default function VideoThumbnailCard({
 href,
 title,
 description,
 category,
 posterSrc,
 duration,
 assetId = "intelligence-market-data",
}: VideoThumbnailCardProps) {
 return (
 <Link href={href} className="group flex h-full flex-col border border-silver bg-paper">
 <div className="relative aspect-video overflow-hidden bg-surface">
 {posterSrc ? (
 <Image
 src={posterSrc}
 alt=""
 fill
 sizes="(min-width: 1024px) 34rem, 88vw"
 className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
 />
 ) : (
 <EditorialImagePlaceholder assetId={assetId} categoryLabel="Video" ratio="16:9" />
 )}
 <span className="absolute inset-0 flex items-center justify-center">
 <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-white transition group-hover:scale-105">
 <Play size={16} fill="currentColor" aria-hidden />
 </span>
 </span>
 {duration ? (
 <span className="absolute bottom-3 right-3 bg-maroon-dark/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
 {duration}
 </span>
 ) : null}
 </div>
 <div className="card-pad flex flex-1 flex-col space-y-3">
 <p className="eyebrow">{category}</p>
 <h3 className="card-title transition group-hover:text-maroon">{title}</h3>
 <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
 </div>
 </Link>
 );
}
