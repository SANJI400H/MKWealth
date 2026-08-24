import Link from "next/link";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import BrandLogo from "@/components/ui/BrandLogo";
import SocialIcons from "@/components/ui/SocialIcons";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper py-14 sm:py-16">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <BrandLogo size="footer" />
          <p className="mt-3 text-sm font-medium text-ink">{siteConfig.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{siteConfig.role}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {siteConfig.company} {siteConfig.companyRole} · {siteConfig.location}
          </p>
          <div className="mt-6 cta-row">
            <BookMeetingLink href="/strategy-session" className="btn-primary" />
            <WhatsAppLink
              message="Hi Morgan, I found your site and would like to connect."
              className="btn-ghost-dark"
            >
              WhatsApp
            </WhatsAppLink>
          </div>
          <div className="mt-8">
            <p className="eyebrow">Follow</p>
            <SocialIcons className="mt-4" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:grid-cols-5">
          {footerNav.map((column) => (
            <div key={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-4 space-y-2.5 text-ink-muted">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-content space-y-2 px-5 text-xs text-ink-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Services in partnership with {siteConfig.company}.
        </p>
        <p>
          Educational content only. Not legal, tax, or financial advice. See{" "}
          <Link href="/disclaimer" className="underline-offset-2 hover:underline">
            Disclaimer
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
