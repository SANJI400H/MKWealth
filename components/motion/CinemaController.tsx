"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Video cinema acts — cue play/final on arrive */
export const CINEMA_IDS = ["home", "about", "services"] as const;
export type CinemaId = (typeof CINEMA_IDS)[number];

/**
 * Full opening snap sequence: cinema film + Philosophy + Approach.
 * One wheel/swipe = one section. After formula, free document scroll resumes.
 */
export const OPENING_SNAP_IDS = ["home", "about", "services", "philosophy", "formula"] as const;
export type OpeningSnapId = (typeof OPENING_SNAP_IDS)[number];

export type CinemaArriveMode = "play" | "final";

type CinemaCue = {
  id: CinemaId;
  mode: CinemaArriveMode;
  token: number;
};

type CinemaContextValue = {
  cue: CinemaCue;
  markPlayed: (id: CinemaId) => void;
};

const CinemaContext = createContext<CinemaContextValue | null>(null);

export function useCinemaCue() {
  return useContext(CinemaContext);
}

const SNAP_DURATION_DESKTOP_MS = 1100;
const SNAP_DURATION_TABLET_MS = 980;
const SNAP_DURATION_PHONE_MS = 820;

function snapDurationMs() {
  if (typeof window === "undefined") return SNAP_DURATION_DESKTOP_MS;
  if (window.matchMedia("(max-width: 767px)").matches) return SNAP_DURATION_PHONE_MS;
  if (window.matchMedia("(max-width: 1023px)").matches) return SNAP_DURATION_TABLET_MS;
  return SNAP_DURATION_DESKTOP_MS;
}

function touchSnapThreshold() {
  if (typeof window === "undefined") return 48;
  return window.matchMedia("(max-width: 767px)").matches ? 52 : 40;
}

function isCinemaId(id: string): id is CinemaId {
  return (CINEMA_IDS as readonly string[]).includes(id);
}

function isOpeningSnapId(id: string): id is OpeningSnapId {
  return (OPENING_SNAP_IDS as readonly string[]).includes(id);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollTopForId(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY;
}

function snapZoneBottom() {
  const el = document.getElementById("formula");
  if (!el) {
    const services = document.getElementById("services");
    return (services?.offsetTop ?? 0) + (services?.offsetHeight ?? window.innerHeight);
  }
  return el.offsetTop + el.offsetHeight;
}

function animateScrollTo(
  top: number,
  onDone?: () => void,
  durationMs = snapDurationMs(),
): () => void {
  const from = window.scrollY;
  const distance = top - from;

  if (Math.abs(distance) < 2 || prefersReducedMotion()) {
    window.scrollTo({ top, behavior: "auto" });
    onDone?.();
    return () => undefined;
  }

  let raf = 0;
  let cancelled = false;
  const start = performance.now();

  const tick = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / durationMs);
    window.scrollTo({ top: from + distance * easeInOutCubic(t), behavior: "auto" });
    if (t < 1) {
      raf = window.requestAnimationFrame(tick);
    } else {
      onDone?.();
    }
  };

  raf = window.requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    window.cancelAnimationFrame(raf);
  };
}

function scrollToId(id: string, onDone?: () => void) {
  const top = scrollTopForId(id);
  if (top == null) {
    onDone?.();
    return () => undefined;
  }
  return animateScrollTo(top, onDone);
}

/**
 * One wheel / swipe = one opening section.
 * Video cues only for home / about / services.
 * Philosophy + Approach snap as full-viewport editorial acts.
 * After formula → normal document scrolling.
 */
export default function CinemaController({ children }: { children: ReactNode }) {
  const indexRef = useRef(0);
  const cooldownRef = useRef(false);
  const playedRef = useRef(new Set<string>());
  const touchYRef = useRef<number | null>(null);
  const tokenRef = useRef(0);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  const [cue, setCue] = useState<CinemaCue>({
    id: "home",
    mode: "play",
    token: 0,
  });

  const markPlayed = useCallback((id: CinemaId) => {
    playedRef.current.add(id);
  }, []);

  const emitCue = useCallback((id: CinemaId, mode: CinemaArriveMode) => {
    tokenRef.current += 1;
    setCue({ id, mode, token: tokenRef.current });
  }, []);

  useEffect(() => {
    indexRef.current = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
    emitCue("home", "play");

    const goSnap = (index: number, prefer: CinemaArriveMode) => {
      if (index < 0 || index >= OPENING_SNAP_IDS.length) return;
      const id = OPENING_SNAP_IDS[index];
      indexRef.current = index;

      cancelScrollRef.current?.();
      cancelScrollRef.current = scrollToId(id, () => {
        if (isCinemaId(id)) {
          const mode: CinemaArriveMode =
            prefer === "final" || playedRef.current.has(id) ? "final" : "play";
          emitCue(id, mode);
        }
        cancelScrollRef.current = null;
      });
    };

    const releaseToBrowse = () => {
      cancelScrollRef.current?.();
      cancelScrollRef.current = scrollToId("investment-profile", () => {
        cancelScrollRef.current = null;
      });
    };

    const snap = (dir: 1 | -1) => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      window.setTimeout(() => {
        cooldownRef.current = false;
      }, snapDurationMs() + 100);

      const zoneBottom = snapZoneBottom();
      const inSnap = window.scrollY < zoneBottom - 24;

      if (!inSnap) {
        if (dir < 0) goSnap(OPENING_SNAP_IDS.length - 1, "final");
        return;
      }

      const next = indexRef.current + dir;

      if (dir > 0 && indexRef.current >= OPENING_SNAP_IDS.length - 1) {
        releaseToBrowse();
        return;
      }
      if (next < 0) return;

      goSnap(next, dir > 0 ? "play" : "final");
    };

    const onWheel = (e: WheelEvent) => {
      const zoneBottom = snapZoneBottom();
      const inSnap = window.scrollY < zoneBottom - 24;
      const pullingBack = !inSnap && e.deltaY < 0 && window.scrollY <= zoneBottom + 120;

      if (!inSnap && !pullingBack) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) < 6) return;
      snap(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      const zoneBottom = snapZoneBottom();
      if (window.scrollY >= zoneBottom - 24) return;

      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        snap(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        snap(-1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const start = touchYRef.current;
      touchYRef.current = null;
      if (start == null) return;

      const zoneBottom = snapZoneBottom();
      const inSnap = window.scrollY < zoneBottom - 24;
      if (!inSnap) return;

      const end = e.changedTouches[0]?.clientY ?? start;
      const dy = start - end;
      if (Math.abs(dy) < touchSnapThreshold()) return;
      snap(dy > 0 ? 1 : -1);
    };

    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id) return;

      if (isOpeningSnapId(id)) {
        const idx = OPENING_SNAP_IDS.indexOf(id);
        goSnap(idx, "final");
        return;
      }

      cancelScrollRef.current?.();
      cancelScrollRef.current = scrollToId(id);
    };

    const onScroll = () => {
      if (cancelScrollRef.current) return;

      let best = indexRef.current;
      let bestDist = Infinity;
      OPENING_SNAP_IDS.forEach((snapId, i) => {
        const el = document.getElementById(snapId);
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      indexRef.current = best;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("cinema:goto", onGoto);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelScrollRef.current?.();
      cancelScrollRef.current = null;
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("cinema:goto", onGoto);
      window.removeEventListener("scroll", onScroll);
    };
  }, [emitCue]);

  const value = useMemo(() => ({ cue, markPlayed }), [cue, markPlayed]);

  return (
    <CinemaContext.Provider value={value}>
      <div id="cinema-root" className="relative">
        {children}
      </div>
    </CinemaContext.Provider>
  );
}
