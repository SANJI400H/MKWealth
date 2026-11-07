import SiteNav from "@/components/sections/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import BrandLoader from "@/components/ui/BrandLoader";
import SubpageEnter from "@/components/motion/SubpageEnter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrandLoader />
      <SiteNav />
      <SubpageEnter>{children}</SubpageEnter>
      <SiteFooter />
    </>
  );
}
