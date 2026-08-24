import { siteConfig } from "@/lib/site-config";

const icons = [
  {
    id: "instagram",
    label: "Instagram",
    href: siteConfig.social.instagram,
    svg: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    svg: (
      <>
        <path
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: siteConfig.social.tiktok,
    svg: (
      <path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    href: siteConfig.social.youtube,
    svg: (
      <>
        <path
          d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: siteConfig.social.facebook,
    svg: (
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const;

/** Footer-only social icon row. */
export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {icons.map((icon) => (
        <li key={icon.id}>
          <a
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-maroon/40 hover:text-maroon"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              {icon.svg}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
