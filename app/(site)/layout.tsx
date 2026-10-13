import SiteNav from "@/components/sections/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import BrandLoader from "@/components/ui/BrandLoader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrandLoader />
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}
