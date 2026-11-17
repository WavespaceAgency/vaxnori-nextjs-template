"use client";

import { AnimatePresence, m } from "motion/react";
import { useRef, type ReactNode } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { EASE } from "@/components/motion/reveal";
import { useLoop } from "@/components/motion/use-loop";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

/**
 * The three animated step cards (How it works). Each one plays a short loop like the live site:
 * 1. the idea is typed, then tasks are drafted; 2. a cursor clicks Approve; 3. tasks ship one by one.
 * Loops only run while on screen; with reduced motion the final state is shown.
 */

type Step = HomePage["howItWorks"]["steps"][number];

const card = "rounded-card border border-[#efefef] bg-surface shadow-card transition-[border-color,box-shadow] duration-500";
const pop = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.45, ease: EASE },
} as const;

function Row({ icon, label, meta, metaClassName, children }: { icon: Parameters<typeof LineIcon>[0]["name"]; label: string; meta?: string; metaClassName?: string; children?: ReactNode }) {
  return (
    <div className={cn(card, "flex flex-col gap-1.5 px-2.5 py-[7px]")}>
      <div className="flex items-center gap-2">
        <LineIcon name={icon} className="size-3.5 text-muted" />
        <span className="flex-1 text-[10px] leading-[14px] font-medium text-ink">{label}</span>
        {meta ? <span className={cn("text-[9px] leading-[14px]", metaClassName ?? "text-subtle")}>{meta}</span> : null}
      </div>
      {children}
    </div>
  );
}

/* 1 ─ Describe the idea: typing → "12 tasks drafted" → tasks pop in */
const IDEA_MS = [1800, 500, 1300, 3400];

function IdeaCard({ card: c }: { card: Extract<Step["card"], { type: "idea" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const phase = useLoop(ref, IDEA_MS);
  return (
    <div ref={ref} className="flex w-full max-w-[206px] flex-col gap-1.5">
      <div
        className={cn(
          card,
          "min-h-[58px] px-3 py-2.5",
          phase === 0 && "border-brand shadow-[0_0_0_3px_rgb(255_72_32/0.12)]",
        )}
      >
        <p className="text-[10px] leading-4 tracking-[0.04em] text-subtle uppercase">{c.label}</p>
        <p className="mt-1 text-[11px] leading-4 font-medium text-ink">
          {phase === 0 ? (
            <m.span key="typing" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.032 } } }}>
              {c.text.split("").map((ch, i) => (
                <m.span key={i} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }}>
                  {ch}
                </m.span>
              ))}
            </m.span>
          ) : (
            c.text
          )}
        </p>
      </div>
      <AnimatePresence>
        {phase >= 1 ? (
          <m.p key="drafted" {...pop} className="flex items-center gap-2 text-[10px] leading-4 font-medium text-brand-strong">
            <span className="h-px flex-1 bg-line-strong" />
            {c.drafted}
            <span className="h-px flex-1 bg-line-strong" />
          </m.p>
        ) : null}
      </AnimatePresence>
      <div className="flex min-h-[94px] flex-col gap-1.5">
        <AnimatePresence>
          {phase >= 2
            ? c.tasks.map((task, i) => (
                <m.div key={task.label} {...pop} transition={{ ...pop.transition, delay: i * 0.18 }}>
                  <Row icon={task.icon} label={task.label} meta={task.meta} metaClassName="text-status-done" />
                </m.div>
              ))
            : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* 2 ─ Approve the plan: cursor moves in and clicks Approve */
const APPROVE_MS = [1400, 900, 3200];

function ApproveCard({ card: c }: { card: Extract<Step["card"], { type: "approve" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const phase = useLoop(ref, APPROVE_MS);
  const approved = phase === 2;
  return (
    <div ref={ref} className="relative flex w-full max-w-[206px] flex-col items-center">
      <div className={cn(card, "flex w-full items-start justify-between gap-2 px-3 py-2.5")}>
        <p className="text-[11px] leading-[14px] font-semibold text-ink">{c.title}</p>
        <span
          className={cn(
            "rounded-[3px] px-1.5 py-0.5 text-[9px] leading-3 font-semibold whitespace-nowrap transition-colors duration-500",
            approved ? "bg-status-done-bg text-status-done" : "bg-status-progress-bg text-status-progress",
          )}
        >
          {approved ? c.approvedLabel : c.status}
        </span>
      </div>
      <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
      <dl className={cn(card, "flex w-full flex-col gap-1.5 px-3 py-2.5")}>
        {c.rows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-[10px] leading-4">
            <dt className="text-subtle">{label}</dt>
            <dd className="font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
      <div className={cn(card, "relative flex w-full gap-2 p-2")}>
        <span className="flex-1 rounded-[4px] bg-surface-muted py-1.5 text-center text-[10px] leading-4 font-medium text-ink">{c.hold}</span>
        <m.span
          className="flex-1 rounded-[4px] py-1.5 text-center text-[10px] leading-4 font-medium text-white"
          animate={{ backgroundColor: approved ? "#22a061" : "#d9380e", scale: phase === 1 ? [1, 1, 0.94, 1] : 1 }}
          transition={{ duration: phase === 1 ? 0.9 : 0.4, ease: EASE, times: phase === 1 ? [0, 0.7, 0.85, 1] : undefined }}
        >
          {approved ? c.approvedLabel : c.approve}
        </m.span>
        {/* Cursor */}
        <m.svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-0 left-0 size-4 drop-shadow"
          initial={false}
          animate={
            phase === 0
              ? { x: 40, y: 50, opacity: 0 }
              : phase === 1
                ? { x: 150, y: 20, opacity: 1 }
                : { x: 156, y: 24, opacity: 0 }
          }
          transition={{ duration: phase === 1 ? 0.6 : 0.5, ease: EASE, delay: phase === 2 ? 0.5 : 0 }}
        >
          <path d="M2 1.5 13 7.4 8 8.6 5.6 13.4 2 1.5Z" fill="#000" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
        </m.svg>
      </div>
    </div>
  );
}

/* 3 ─ Watch it ship: items appear, counter climbs, website goes live */
const SHIP_MS = [500, 600, 600, 600, 1500, 3200];

function ActivityCard({ card: c }: { card: Extract<Step["card"], { type: "activity" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const phase = useLoop(ref, SHIP_MS);
  const shown = Math.min(phase, c.items.length);
  const showProgress = phase >= 4;
  const live = phase >= 5;
  const count = shown + (live ? 1 : 0);
  return (
    <div ref={ref} className="relative flex w-full max-w-[206px] flex-col gap-1.5 pl-4">
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[3px] w-px bg-line-strong" />
      <div className="flex items-center justify-between rounded-card bg-ink px-3 py-2.5">
        <p className="text-[11px] leading-4 font-semibold text-white">{c.title}</p>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={count}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-[3px] bg-[#3d3200] px-1.5 py-0.5 text-[9px] leading-3 font-semibold text-[#ffd84d]"
          >
            {count} {c.shippedLabel}
          </m.span>
        </AnimatePresence>
      </div>
      <div className="flex min-h-[132px] flex-col gap-1.5">
        <AnimatePresence>
          {c.items.slice(0, shown).map((item) => (
            <m.div key={item.label} {...pop} className="relative">
              <span aria-hidden="true" className="absolute top-1/2 -left-4 size-[7px] -translate-y-1/2 rounded-full border border-line-strong bg-surface" />
              <Row icon={item.icon} label={item.label} meta={item.meta} />
            </m.div>
          ))}
          {showProgress ? (
            <m.div key="progress" {...pop} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 -left-4 size-[7px] -translate-y-1/2 rounded-full border transition-colors duration-500",
                  live ? "border-status-done bg-status-done-bg" : "border-brand bg-brand-soft motion-safe:animate-pulse-soft",
                )}
              />
              <Row
                icon={c.progress.icon}
                label={live ? c.progress.liveLabel : c.progress.label}
                meta={`${live ? 100 : c.progress.value}%`}
                metaClassName={cn("font-semibold", live ? "text-status-done" : "text-brand-strong")}
              >
                <span className="h-1 overflow-hidden rounded-full bg-[#f3f3f3]">
                  <m.span
                    className="block h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${live ? 100 : c.progress.value}%`, backgroundColor: live ? "#22a061" : "#ff4820" }}
                    transition={{ duration: 1, ease: EASE }}
                  />
                </span>
              </Row>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function StepCard({ card }: { card: Step["card"] }) {
  if (card.type === "idea") return <IdeaCard card={card} />;
  if (card.type === "approve") return <ApproveCard card={card} />;
  return <ActivityCard card={card} />;
}
