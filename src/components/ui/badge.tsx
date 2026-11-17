import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase label above a section heading, e.g. "—— PRODUCT". */
export function Eyebrow({ children, className, tone = "brand", line = true }: { children: ReactNode; className?: string; tone?: "brand" | "light"; line?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs leading-5 tracking-[0.02em] uppercase lg:text-sm",
        tone === "brand" ? "text-brand-strong" : "text-white/70",
        className,
      )}
    >
      {line ? <span aria-hidden="true" className={cn("h-px w-[26px]", tone === "brand" ? "bg-brand" : "bg-white/50")} /> : null}
      {children}
    </p>
  );
}

const statusTones = {
  progress: "bg-status-progress-bg text-status-progress",
  todo: "bg-status-todo-bg text-status-todo",
  done: "bg-status-done-bg text-status-done",
  queued: "bg-status-queued-bg text-status-queued",
  neutral: "border border-line bg-canvas text-subtle",
} as const;

export type StatusTone = keyof typeof statusTones;

/** Small status chip used in the product mockups ("In progress", "Done", ...). */
export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: StatusTone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] px-1.5 py-0.5 text-[10px] leading-[14px] font-semibold tracking-[0.02em] whitespace-nowrap",
        statusTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
