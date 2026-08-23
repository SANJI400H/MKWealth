"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/** Loads gtag.js when NEXT_PUBLIC_GA_MEASUREMENT_ID is set. */
export default function GoogleAnalytics() {
  const id = siteConfig.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
