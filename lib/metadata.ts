import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function pageMetadata({ title, description, path, ogImage, noIndex }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(ogImage ?? siteConfig.defaultOgImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.role}` }],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
