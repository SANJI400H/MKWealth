import type { ReactNode } from "react";

/** Calculator results stay visible. No name or email gate. */
export function GatedResults({ children, className = "" }: { children: ReactNode; className?: string }) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
