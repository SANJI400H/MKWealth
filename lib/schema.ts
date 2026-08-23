import type { InsightArticle } from "@/content/insights";
import { absoluteUrl, siteConfig } from "./site-config";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.siteUrl,
    image: absoluteUrl("/images/morgan-portrait.jpg"),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.tiktok,
      siteConfig.social.youtube,
      siteConfig.social.facebook,
    ],
  };
}

export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    image: absoluteUrl("/images/morgan-portrait.jpg"),
    url: siteConfig.siteUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Dubai, United Arab Emirates" },
      { "@type": "AdministrativeArea", name: "Abu Dhabi, United Arab Emirates" },
      { "@type": "AdministrativeArea", name: "Ras Al Khaimah, United Arab Emirates" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    memberOf: {
      "@type": "Organization",
      name: siteConfig.company,
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(article: InsightArticle) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.reviewedAt,
    author: {
      "@type": "Person",
      name: article.author,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
  };

  if (article.heroImage) {
    data.image = absoluteUrl(article.heroImage);
  }

  if (article.youtubeId) {
    data.video = {
      "@type": "VideoObject",
      name: article.title,
      description: article.excerpt,
      embedUrl: `https://www.youtube.com/embed/${article.youtubeId}`,
      uploadDate: article.publishedAt,
    };
  }

  return data;
}
