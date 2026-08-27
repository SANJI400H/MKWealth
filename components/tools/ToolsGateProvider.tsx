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
  /** If locked, opens modal and returns false. If unlocked, runs onAllowed and returns true. */
  requireAccess: (onAllowed?: () => void) => boolean;
  openGate: () => void;
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
  source?: "tools" | "guide";
  title?: string;
  intro?: string;
}) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(initialUnlocked);
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (initialUnlocked) setUnlocked(true);
  }, [initialUnlocked]);

  const openGate = useCallback(() => {
    setOpen(true);
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

  const value = useMemo(
    () => ({ unlocked, requireAccess, openGate }),
    [unlocked, requireAccess, openGate],
  );

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
          <div className="relative w-full max-w-md border border-silver bg-paper p-6 shadow-lg sm:p-8">
            <button
              type="button"
              className="absolute right-3 top-3 rounded p-1 text-ink-muted hover:text-ink"
              aria-label="Close"
              onClick={() => {
                pendingRef.current = null;
                setOpen(false);
              }}
            >
              <X size={18} strokeWidth={1.75} />
            </button>
            <p className="eyebrow">Registration</p>
            <h2 id="tools-gate-title" className="mt-2 font-display text-2xl font-bold text-ink">
              {title}
            </h2>
            <div className="mt-6">
              <LeadForm
                source={source}
                intro={intro}
                phoneLabel="WhatsApp number"
                submitLabel="Unlock access"
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      ) : null}
    </ToolsGateContext.Provider>
  );
}
