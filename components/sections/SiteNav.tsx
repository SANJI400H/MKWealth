"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/lib/site-config";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "invest", label: "Invest" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!onHome) {
      setOverDark(false);
      return;
    }

    const onScroll = () => {
      const sections = links
        .map((l) => document.getElementById(l.id))
        .filter(Boolean) as HTMLElement[];
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = section.id;
      }
      setActive(current);
      setOverDark(new Set(["home", "about", "services"]).has(current) && !open);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, onHome]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (!onHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top, behavior: "auto" });
    setActive(id);
  };

  const linkTone = overDark ? "text-white/70 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]";
  const activeTone = overDark ? "text-white" : "text-[#1d1d1f]";
  const capsuleTone = overDark
    ? "border-white/15 bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
    : "border-black/[0.06] bg-white/75 text-[#1d1d1f] shadow-[0_8px_32px_rgba(0,0,0,0.08)]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <div
        className={`nav-glass pointer-events-auto hidden max-w-[calc(100%-2rem)] items-center gap-1 rounded-full border px-3 py-2 lg:flex ${capsuleTone}`}
        data-nav-theme={overDark ? "dark" : "light"}
      >
        <button
          type="button"
          onClick={() => goToSection("home")}
          className="shrink-0 rounded-full px-4 py-2 font-display text-[13px] font-semibold tracking-[-0.02em] text-gold transition-opacity duration-400 hover:opacity-80"
        >
          {siteConfig.name}
        </button>

        <nav className="flex items-center gap-0.5 px-1">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              data-active={active === link.id}
              className={`nav-link rounded-full px-3 py-2 ${active === link.id && onHome ? activeTone : linkTone}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <WhatsAppLink
          message="Hi Morgan, I'd like to book a meeting about UAE off-plan investment."
          className="btn-primary ml-1 !px-5 !py-2.5 text-[12px]"
        >
          Book a Meeting
        </WhatsAppLink>
      </div>

      <div
        className={`nav-glass pointer-events-auto flex w-full max-w-md items-center justify-between rounded-full border px-4 py-2.5 lg:hidden ${capsuleTone}`}
      >
        <button
          type="button"
          onClick={() => goToSection("home")}
          className="font-display text-[13px] font-semibold tracking-[-0.02em] text-gold"
        >
          {siteConfig.name}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className={`rounded-full p-1.5 transition-colors ${overDark && !open ? "text-white" : "text-[#1d1d1f]"}`}
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {open ? (
        <div className="pointer-events-auto absolute left-4 right-4 top-[4.25rem] z-50 overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white/90 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col p-3">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => goToSection(link.id)}
                className={`rounded-full px-4 py-3 text-left text-[15px] font-medium tracking-[-0.01em] transition-colors ${
                  active === link.id && onHome ? "bg-black/[0.04] text-[#1d1d1f]" : "text-[#6e6e73]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <WhatsAppLink
              message="Hi Morgan, I'd like to book a meeting about UAE off-plan investment."
              className="btn-primary mt-2 w-full"
            >
              Book a Meeting
            </WhatsAppLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
