/**
 * Client-side analytics helpers.
 * Fires GA4 (gtag) when configured, Meta Pixel when configured, and always console in development.
 * Persist UTM/attribution in sessionStorage for funnel continuity.
 */

export type AnalyticsEvent =
  | "view_insight"
  | "watch_video"
  | "calculator_start"
  | "calculator_complete"
  | "guide_lead"
  | "guide_download"
  | "guide_qualify_step"
  | "analyse_start"
  | "analyse_submit"
  | "whatsapp_click"
  | "book_session_click"
  | "session_booked"
  | "case_study_view"
  | "view_area"
  | "view_developer"
  | "newsletter_signup"
  | "lead_score_signal";

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

const ATTR_KEY = "mk_attribution";

export type Attribution = {
  firstSource?: string;
  firstMedium?: string;
  firstCampaign?: string;
  firstContent?: string;
  latestSource?: string;
  latestCampaign?: string;
  landingPage?: string;
  timestamp?: string;
};

function readSearchParams(): URLSearchParams | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search);
}

export function captureAttributionFromUrl() {
  if (typeof window === "undefined") return;
  const params = readSearchParams();
  if (!params) return;

  const utmSource = params.get("utm_source") ?? undefined;
  const utmMedium = params.get("utm_medium") ?? undefined;
  const utmCampaign = params.get("utm_campaign") ?? undefined;
  const utmContent = params.get("utm_content") ?? undefined;

  let existing: Attribution = {};
  try {
    existing = JSON.parse(sessionStorage.getItem(ATTR_KEY) ?? "{}") as Attribution;
  } catch {
    existing = {};
  }

  const next: Attribution = {
    ...existing,
    landingPage: existing.landingPage ?? window.location.pathname,
    timestamp: existing.timestamp ?? new Date().toISOString(),
    latestSource: utmSource ?? existing.latestSource,
    latestCampaign: utmCampaign ?? existing.latestCampaign,
  };

  if (!existing.firstSource && (utmSource || utmMedium || utmCampaign)) {
    next.firstSource = utmSource;
    next.firstMedium = utmMedium;
    next.firstCampaign = utmCampaign;
    next.firstContent = utmContent;
  }

  sessionStorage.setItem(ATTR_KEY, JSON.stringify(next));
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const attribution = getAttribution();
  const payload = {
    ...props,
    ...attribution,
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, payload);
  }

  window.gtag?.("event", event, payload);

  // Map high-value events to Meta when Pixel is present
  if (event === "guide_lead" || event === "analyse_submit" || event === "newsletter_signup") {
    window.fbq?.("track", "Lead", { content_name: event, ...props });
  }
  if (event === "book_session_click" || event === "session_booked") {
    window.fbq?.("track", "Schedule", { content_name: event, ...props });
  }
}
