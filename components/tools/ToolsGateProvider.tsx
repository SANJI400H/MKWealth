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
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import LeadForm from "@/components/ui/LeadForm";
import { trackEvent } from "@/lib/analytics";

type ToolsGateContextValue = {
  unlocked: boolean;
  requireAccess: (onAllowed?: () => void) => boolean;
  openGate: () => void;
  markUnlocked: () => void;
  /** Attach latest calculator inputs/outputs to the next lead submit. */
  setCalculatorSnapshot: (snapshot: Record<string, unknown> | null) => void;
};

const ToolsGateContext = createContext<ToolsGateContextValue | null>(null);

export function useToolsGate() {
  const ctx = useContext(ToolsGateContext);
  if (!ctx) {
    throw new Error("useToolsGate must be used within ToolsGateProvider");
  }
  return ctx;
}

export function ToolsGateProvider({
  initialUnlocked,
  children,
  source = "tools",
  title = "Unlock to continue",
  intro = "Enter your name, WhatsApp number, and email to download files or run the calculators.",
}: {
  initialUnlocked: boolean;
  children: ReactNode;
  source?: "tools" | "guide" | "calculator";
  title?: string;
  intro?: string;
}) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(initialUnlocked);
  const [open, setOpen] = useState(false);
  const [snapshotVersion, setSnapshotVersion] = useState(0);
  const pendingRef = useRef<(() => void) | null>(null);
  const snapshotRef = useRef<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (initialUnlocked) setUnlocked(true);
  }, [initialUnlocked]);

  const openGate = useCallback(() => {
    setOpen(true);
  }, []);

  const setCalculatorSnapshot = useCallback((snapshot: Record<string, unknown> | null) => {
    snapshotRef.current = snapshot;
    setSnapshotVersion((v) => v + 1);
  }, []);

  const requireAccess = useCallback(
    (onAllowed?: () => void) => {
      if (unlocked) {
        onAllowed?.();
        return true;
      }
      pendingRef.current = onAllowed ?? null;
      setOpen(true);
      return false;
    },
    [unlocked],
  );

  const handleSuccess = useCallback(() => {
    trackEvent("guide_lead", { funnel: source });
    trackEvent("lead_score_signal", { signal: `${source}_lead` });
    setUnlocked(true);
    setOpen(false);
    const pending = pendingRef.current;
    pendingRef.current = null;
    pending?.();
    router.refresh();
  }, [router, source]);

  const markUnlocked = useCallback(() => {
    setUnlocked(true);
    setOpen(false);
    pendingRef.current = null;
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({ unlocked, requireAccess, openGate, markUnlocked, setCalculatorSnapshot }),
    [unlocked, requireAccess, openGate, markUnlocked, setCalculatorSnapshot],
  );

  const extraPayload = useMemo(() => {
    void snapshotVersion;
    if (!snapshotRef.current) return undefined;
    return { calculatorSnapshot: snapshotRef.current };
  }, [snapshotVersion, open]);

  return (
    <ToolsGateContext.Provider value={value}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/45 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tools-gate-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              pendingRef.current = null;
              setOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto border border-silver bg-paper p-6 shadow-lg sm:p-8">
            <button
              type="button"
              className="absolute right-2 top-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded text-ink-muted hover:text-ink"
              aria-label="Close"
              onClick={() => {
                pendingRef.current = null;
                setOpen(false);
              }}
            >
              <X size={20} strokeWidth={1.75} />
            </button>
            <p className="eyebrow">Registration</p>
            <h2 id="tools-gate-title" className="mt-2 font-display text-2xl font-bold text-ink">
              {title}
            </h2>
            <div className="mt-6">
              <LeadForm
                source={source === "guide" ? "guide" : source === "calculator" ? "calculator" : "tools"}
                intro={intro}
                phoneLabel="WhatsApp number"
                submitLabel="Unlock access"
                extraPayload={extraPayload}
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      ) : null}
    </ToolsGateContext.Provider>
  );
}
