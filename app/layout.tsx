import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import MetaPixel from "@/components/ui/MetaPixel";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AttributionCapture from "@/components/analytics/AttributionCapture";
import { personSchema, realEstateAgentSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description:
    "Morgan Kaiser — UAE Property Portfolio Strategist. Vision first, strategy second, property third. Numbers-led UAE property guidance for international investors.",
  icons: {
    icon: [{ url: "/images/mk-logo.png", type: "image/png" }],
    apple: [{ url: "/images/mk-logo.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-body bg-paper text-ink antialiased">
        <JsonLd data={personSchema()} />
        <JsonLd data={realEstateAgentSchema()} />
        <GoogleAnalytics />
        <MetaPixel />
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
