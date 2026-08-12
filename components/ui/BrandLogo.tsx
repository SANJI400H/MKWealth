import { siteConfig } from "@/lib/site-config";

type LogoSize = "nav" | "hero" | "footer" | "loader";

const sizes: Record<LogoSize, string> = {
  nav: "h-8 w-auto sm:h-9",
  hero: "h-12 w-auto sm:h-16 md:h-20",
  footer: "h-10 w-auto",
  loader: "h-16 w-auto sm:h-20",
};

interface BrandLogoProps {
  size?: LogoSize;
  className?: string;
}

/** Plain img avoids Next image optimizer flattening the silver transparent PNG. */
export default function BrandLogo({ size = "nav", className = "" }: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/mk-logo.png"
      alt={siteConfig.name}
      width={140}
      height={103}
      decoding="async"
      className={`object-contain ${sizes[size]} ${className}`.trim()}
    />
  );
}
