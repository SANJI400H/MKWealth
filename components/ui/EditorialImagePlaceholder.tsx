"use client";

import { getAssetRequirement, type AssetRatio } from "@/content/asset-requirements";

const ratioClass: Record<AssetRatio, string> = {
 "16:9": "aspect-video",
 "16:10": "aspect-[16/10]",
 "4:5": "aspect-[4/5]",
 "1:1": "aspect-square",
 "21:9": "aspect-[21/9]",
};

/**
 * Intentional branded placeholder when Morgan photography is not yet available.
 * Dev-only filename hints; production never shows developer instructions.
 */
export default function EditorialImagePlaceholder({
 assetId,
 categoryLabel,
 ratio = "4:5",
 className = "",
}: {
 assetId?: string;
 categoryLabel: string;
 ratio?: AssetRatio;
 className?: string;
}) {
 const asset = assetId ? getAssetRequirement(assetId) : undefined;
 const showDevHint = process.env.NODE_ENV === "development" && asset?.suggestedFilename;
 const aspect = ratioClass[asset?.ratio ?? ratio];

 return (
 <div
 className={`relative flex ${aspect} w-full flex-col items-center justify-center overflow-hidden border border-silver bg-surface ${className}`}
 role="img"
 aria-label={`${categoryLabel}, image required`}
 >
 <p className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-maroon">
 {categoryLabel}
 </p>
 <div className="flex flex-col items-center gap-3 px-6 text-center">
 <span className="flex h-10 w-10 items-center justify-center border border-silver text-[11px] font-bold tracking-wide text-ink-muted">
 MK
 </span>
 <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Image required</p>
 {asset ? (
 <p className="max-w-[14rem] text-xs leading-relaxed text-ink-muted/80">{asset.label}</p>
 ) : null}
 {showDevHint ? (
 <p className="mt-1 max-w-[16rem] font-mono text-[10px] text-ink-muted/60">
 Dev: {asset?.suggestedFilename} · min {asset?.minimumWidth}px · {asset?.ratio}
 </p>
 ) : null}
 </div>
 </div>
 );
}
