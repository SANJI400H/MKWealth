import Link from "next/link";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper py-14 sm:py-16">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-5 sm:px-8 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-gold">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            Off-plan investment advisor · Dubai · Huspy partner agent
          </p>
          <WhatsAppLink
            message="Hi Morgan, I found your site and would like to connect."
            className="btn-primary mt-6"
          >
            WhatsApp
          </WhatsAppLink>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="eyebrow">Site</p>
            <ul className="mt-4 space-y-2.5 text-ink-muted">
              <li>
                <Link href="/#about" className="hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-ink">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#invest" className="hover:text-ink">
                  Invest
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Invest</p>
            <ul className="mt-4 space-y-2.5 text-ink-muted">
              <li>
                <Link href="/invest/dubai" className="hover:text-ink">
                  Dubai
                </Link>
              </li>
              <li>
                <Link href="/invest/abu-dhabi" className="hover:text-ink">
                  Abu Dhabi
                </Link>
              </li>
              <li>
                <Link href="/invest/rak" className="hover:text-ink">
                  Ras Al Khaimah
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Follow</p>
            <ul className="mt-4 space-y-2.5 text-ink-muted">
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-content px-5 text-xs text-ink-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Services in partnership with Huspy.
        </p>
      </div>
    </footer>
  );
}
