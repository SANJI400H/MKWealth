import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import MetaPixel from "@/components/ui/MetaPixel";
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
  title: `${siteConfig.name} — Dubai Off-Plan Property Investment Advisor`,
  description:
    "Morgan Kaiser is a Dubai-based off-plan real estate investment advisor and Huspy partner agent helping foreign investors buy off-plan property in Dubai with tax-free returns and Golden Visa eligibility.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-body bg-paper text-ink antialiased">
        <JsonLd data={personSchema()} />
        <JsonLd data={realEstateAgentSchema()} />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
