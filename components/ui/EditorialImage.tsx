"use client";

import Image from "next/image";
import EditorialImagePlaceholder from "@/components/ui/EditorialImagePlaceholder";
import type { AssetRatio } from "@/content/asset-requirements";

const ratioClass: Record<AssetRatio, string> = {
  "16:9": "aspect-video",
  "16:10": "aspect-[16/10]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "21:9": "aspect-[21/9]",
};

/**
 * Editorial photo when available; branded placeholder otherwise.
 */
export default function EditorialImage({
  src,
  alt,
  categoryLabel,
  ratio = "4:5",
  assetId,
  className = "",
  sizes = "(min-width: 1024px) 34rem, 88vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  categoryLabel: string;
  ratio?: AssetRatio;
  assetId?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <EditorialImagePlaceholder
        assetId={assetId}
        categoryLabel={categoryLabel}
        ratio={ratio}
        className={className}
      />
    );
  }

  const aspect = ratioClass[ratio];

  return (
    <div className={`relative ${aspect} w-full overflow-hidden bg-surface ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
      />
    </div>
  );
}
