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

export const CINEMA_IDS = ["home", "about", "services"] as const;
export type CinemaId = (typeof CINEMA_IDS)[number];
export type CinemaArriveMode = "play" | "final";

type CinemaCue = {
  id: CinemaId;
  mode: CinemaArriveMode;
  /** Bumps on every navigate so scenes re-run even for the same id/mode. */
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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smooth in, out locomotion for section handoffs. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollTopForId(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY;
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
 * One wheel / swipe = one cinema section with a visible scroll transition.
 * Forward first visit → play after the handoff; scroll-up or nav → final frame + copy.
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

    const goCinema = (index: number, prefer: CinemaArriveMode) => {
      if (index < 0 || index >= CINEMA_IDS.length) return;
      const id = CINEMA_IDS[index];
      indexRef.current = index;

      const mode: CinemaArriveMode =
        prefer === "final" || playedRef.current.has(id) ? "final" : "play";

      cancelScrollRef.current?.();
      // Scroll first so the section handoff is visible; cue video as we settle.
      cancelScrollRef.current = scrollToId(id, () => {
        emitCue(id, mode);
        cancelScrollRef.current = null;
      });
    };

    const afterServicesToGallery = () => {
      cancelScrollRef.current?.();
      cancelScrollRef.current = scrollToId("invest", () => {
        cancelScrollRef.current = null;
      });
    };

    const snap = (dir: 1 | -1) => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      window.setTimeout(() => {
        cooldownRef.current = false;
      }, snapDurationMs() + 100);

      const servicesEl = document.getElementById("services");
      const servicesBottom =
        (servicesEl?.offsetTop ?? 0) + (servicesEl?.offsetHeight ?? window.innerHeight);
      const inCinema = window.scrollY < servicesBottom - 24;

      if (!inCinema) {
        if (dir < 0) goCinema(CINEMA_IDS.length - 1, "final");
        return;
      }

      const next = indexRef.current + dir;

      if (dir > 0 && indexRef.current >= CINEMA_IDS.length - 1) {
        afterServicesToGallery();
        return;
      }
      if (next < 0) return;

      goCinema(next, dir > 0 ? "play" : "final");
    };

    const onWheel = (e: WheelEvent) => {
      const servicesEl = document.getElementById("services");
      const servicesBottom =
        (servicesEl?.offsetTop ?? 0) + (servicesEl?.offsetHeight ?? window.innerHeight);
      const inCinema = window.scrollY < servicesBottom - 24;
      const pullingBackToCinema = !inCinema && e.deltaY < 0 && window.scrollY <= servicesBottom + 120;

      if (!inCinema && !pullingBackToCinema) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) < 6) return;
      snap(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      const servicesEl = document.getElementById("services");
      const servicesBottom =
        (servicesEl?.offsetTop ?? 0) + (servicesEl?.offsetHeight ?? window.innerHeight);
      if (window.scrollY >= servicesBottom - 24) return;

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

      const servicesEl = document.getElementById("services");
      const servicesBottom =
        (servicesEl?.offsetTop ?? 0) + (servicesEl?.offsetHeight ?? window.innerHeight);
      const inCinema = window.scrollY < servicesBottom - 24;
      if (!inCinema) return;

      const end = e.changedTouches[0]?.clientY ?? start;
      const dy = start - end;
      if (Math.abs(dy) < touchSnapThreshold()) return;
      snap(dy > 0 ? 1 : -1);
    };

    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id) return;

      if (isCinemaId(id)) {
        const idx = CINEMA_IDS.indexOf(id);
        goCinema(idx, "final");
        return;
      }

      cancelScrollRef.current?.();
      cancelScrollRef.current = scrollToId(id);
    };

    const onScroll = () => {
      // Don't fight an in-flight section transition.
      if (cancelScrollRef.current) return;

      let best = indexRef.current;
      let bestDist = Infinity;
      CINEMA_IDS.forEach((cinemaId, i) => {
        const el = document.getElementById(cinemaId);
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
