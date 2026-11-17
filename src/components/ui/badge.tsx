import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase label above a section heading, e.g. "— PRODUCT". */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs leading-4 font-medium tracking-[0.04em] text-brand-strong uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-4 bg-brand" />
      {children}
    </p>
  );
}

/** Small pill, e.g. "Most popular" or a status tag. */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs leading-5 font-medium text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
