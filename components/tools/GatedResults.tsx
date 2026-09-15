"use client";

import type { ReactNode } from "react";
import { useToolsGate } from "@/components/tools/ToolsGateProvider";

/** Blurs calculator outputs until the visitor registers; click opens the gate. */
export function GatedResults({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { unlocked, requireAccess } = useToolsGate();

  if (unlocked) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-paper/55 px-4">
        <button
          type="button"
          className="btn-primary max-w-xs text-center"
          onClick={() => requireAccess()}
        >
          Enter details to see your results
        </button>
      </div>
    </div>
  );
}
