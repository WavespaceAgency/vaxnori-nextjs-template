"use client";

import { m } from "motion/react";
import { useRef, type ReactNode } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { EASE_IN_OUT, RollingNumber, SOFT_SPRING, SwapText, TypeText } from "@/components/motion/smooth";
import { useLoop } from "@/components/motion/use-loop";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

/**
 * The three animated step cards (How it works), made to loop like a video:
 * every element keeps its place and only fades/slides, and each loop ends with a soft fade-out
 * before it starts again. Loops run only on screen; reduced motion shows the final state.
 */

type Step = HomePage["howItWorks"]["steps"][number];

const card = "rounded-card border border-[#efefef] bg-surface shadow-card transition-[border-color,box-shadow] duration-700";

/** Fades the whole card out at the end of the loop and back in at the start. */
function LoopFrame({ hidden, children, className }: { hidden: boolean; children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? -4 : 0, filter: hidden ? "blur(2px)" : "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE_IN_OUT }}
    >
      {children}
    </m.div>
  );
}

/** Item that slides in softly when `show` is true (and hides instantly while the card is faded out). */
function Appear({ show, delay = 0, children, className }: { show: boolean; delay?: number; children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
      transition={show ? { ...SOFT_SPRING, delay } : { duration: 0 }}
    >
      {children}
    </m.div>
  );
}

function Row({ icon, label, meta, metaClassName, children }: { icon: Parameters<typeof LineIcon>[0]["name"]; label: ReactNode; meta?: ReactNode; metaClassName?: string; children?: ReactNode }) {
  return (
    <div className={cn(card, "flex flex-col gap-1.5 px-2.5 py-[7px]")}>
      <div className="flex items-center gap-2">
        <LineIcon name={icon} className="size-3.5 text-muted" />
        <span className="flex-1 text-[10px] leading-[14px] font-medium text-ink">{label}</span>
        {meta !== undefined ? <span className={cn("text-[9px] leading-[14px]", metaClassName ?? "text-subtle")}>{meta}</span> : null}
      </div>
      {children}
    </div>
  );
}

/* 1 ─ Describe the idea: typing → "12 tasks drafted" → tasks slide in → hold → fade out */
const IDEA_MS = [2100, 600, 1500, 2800, 700];

function IdeaCard({ card: c }: { card: Extract<Step["card"], { type: "idea" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase, cycle } = useLoop(ref, IDEA_MS, 3);
  return (
    <div ref={ref} className="w-full max-w-[206px]">
      <LoopFrame hidden={phase === 4} className="flex flex-col gap-1.5">
        <div className={cn(card, "min-h-[58px] px-3 py-2.5", phase === 0 && "border-brand shadow-[0_0_0_3px_rgb(255_72_32/0.12)]")}>
          <p className="text-[10px] leading-4 tracking-[0.04em] text-subtle uppercase">{c.label}</p>
          <p className="mt-1 text-[11px] leading-4 font-medium text-ink">
            <TypeText text={c.text} run={cycle} duration={1.7} />
          </p>
        </div>
        <m.p
          className="flex items-center gap-2 text-[10px] leading-4 font-medium text-brand-strong"
          initial={false}
          animate={{ opacity: phase >= 1 && phase < 4 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_IN_OUT }}
        >
          <m.span className="h-px flex-1 origin-right bg-line-strong" initial={false} animate={{ scaleX: phase >= 1 ? 1 : 0 }} transition={{ duration: 0.7, ease: EASE_IN_OUT }} />
          {c.drafted}
          <m.span className="h-px flex-1 origin-left bg-line-strong" initial={false} animate={{ scaleX: phase >= 1 ? 1 : 0 }} transition={{ duration: 0.7, ease: EASE_IN_OUT }} />
        </m.p>
        {c.tasks.map((task, i) => (
          <Appear key={task.label} show={phase >= 2 && phase < 4} delay={i * 0.22}>
            <Row icon={task.icon} label={task.label} meta={task.meta} metaClassName="text-status-done" />
          </Appear>
        ))}
      </LoopFrame>
    </div>
  );
}

/* 2 ─ Approve the plan: cursor glides in → press → Approved → cursor drifts away → fade out */
const APPROVE_MS = [1300, 1100, 450, 2700, 700];

function ApproveCard({ card: c }: { card: Extract<Step["card"], { type: "approve" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase } = useLoop(ref, APPROVE_MS, 3);
  const approved = phase >= 2 && phase < 4;
  const cursor =
    phase === 0 || phase === 4
      ? { x: 30, y: 74, opacity: 0, scale: 1 }
      : phase === 1
        ? { x: 150, y: 18, opacity: 1, scale: 1 }
        : phase === 2
          ? { x: 150, y: 18, opacity: 1, scale: 0.82 }
          : { x: 182, y: 46, opacity: 0, scale: 1 };
  return (
    <div ref={ref} className="w-full max-w-[206px]">
      <LoopFrame hidden={phase === 4} className="relative flex flex-col items-center">
        <div className={cn(card, "flex w-full items-start justify-between gap-2 px-3 py-2.5")}>
          <p className="text-[11px] leading-[14px] font-semibold text-ink">{c.title}</p>
          <span
            className={cn(
              "rounded-[3px] px-1.5 py-0.5 text-[9px] leading-3 font-semibold whitespace-nowrap transition-colors duration-700",
              approved ? "bg-status-done-bg text-status-done" : "bg-status-progress-bg text-status-progress",
            )}
          >
            <SwapText id={approved ? "a" : "n"}>{approved ? c.approvedLabel : c.status}</SwapText>
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
            className="relative flex-1 overflow-hidden rounded-[4px] py-1.5 text-center text-[10px] leading-4 font-medium text-white"
            initial={false}
            animate={{ backgroundColor: approved ? "#15803d" : "#cc340b", scale: phase === 2 ? 0.95 : 1 }}
            transition={{ backgroundColor: { duration: 0.25, ease: "easeOut" }, scale: SOFT_SPRING }}
          >
            {/* click ripple */}
            <m.span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-6 -translate-1/2 rounded-full bg-white"
              initial={false}
              animate={phase === 2 ? { scale: [0, 3.2], opacity: [0.45, 0] } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <SwapText id={approved ? "a" : "n"} className="relative">
              {approved ? c.approvedLabel : c.approve}
            </SwapText>
          </m.span>
          {/* Cursor */}
          <m.svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="pointer-events-none absolute top-0 left-0 size-4 drop-shadow-[0_1px_2px_rgb(0_0_0/0.3)]"
            initial={false}
            animate={cursor}
            transition={{ duration: phase === 1 ? 1 : phase === 2 ? 0.18 : 0.8, ease: EASE_IN_OUT, delay: phase === 3 ? 0.35 : 0 }}
          >
            <path d="M2 1.5 13 7.4 8 8.6 5.6 13.4 2 1.5Z" fill="#000" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
          </m.svg>
        </div>
      </LoopFrame>
    </div>
  );
}

/* 3 ─ Watch it ship: items ship one by one, counter rolls, website goes live → fade out */
const SHIP_MS = [600, 750, 750, 750, 1700, 2700, 700];

function ActivityCard({ card: c }: { card: Extract<Step["card"], { type: "activity" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase } = useLoop(ref, SHIP_MS, 5);
  const shown = Math.min(phase, c.items.length);
  const showProgress = phase >= 4 && phase < 6;
  const live = phase === 5;
  const count = phase === 6 ? c.items.length + 1 : shown + (live ? 1 : 0);
  return (
    <div ref={ref} className="w-full max-w-[206px]">
      <LoopFrame hidden={phase === 6} className="relative flex flex-col gap-1.5 pl-4">
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[3px] w-px bg-line-strong" />
        <div className="flex items-center justify-between rounded-card bg-ink px-3 py-2.5">
          <p className="text-[11px] leading-4 font-semibold text-white">{c.title}</p>
          <span className="rounded-[3px] bg-[#3d3200] px-1.5 py-0.5 text-[9px] leading-3 font-semibold text-[#ffd84d]">
            <RollingNumber value={count} /> {c.shippedLabel}
          </span>
        </div>
        {c.items.map((item, i) => (
          <Appear key={item.label} show={shown > i && phase < 6} className="relative">
            <span aria-hidden="true" className="absolute top-1/2 -left-4 size-[7px] -translate-y-1/2 rounded-full border border-line-strong bg-surface" />
            <Row icon={item.icon} label={item.label} meta={item.meta} />
          </Appear>
        ))}
        <Appear show={showProgress} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -left-4 size-[7px] -translate-y-1/2 rounded-full border transition-colors duration-700",
              live ? "border-status-done bg-status-done-bg" : "border-brand bg-brand-soft motion-safe:animate-pulse-soft",
            )}
          />
          <Row
            icon={c.progress.icon}
            label={<SwapText id={live ? "live" : "progress"}>{live ? c.progress.liveLabel : c.progress.label}</SwapText>}
            meta={<RollingNumber value={phase < 4 ? 0 : live ? 100 : c.progress.value} suffix="%" />}
            metaClassName={cn("font-semibold transition-colors duration-700", live ? "text-status-done" : "text-brand-strong")}
          >
            <span className="h-1 overflow-hidden rounded-full bg-[#f3f3f3]">
              <m.span
                className="relative block h-full overflow-hidden rounded-full bg-brand"
                initial={false}
                animate={{ width: `${phase < 4 ? 0 : live ? 100 : c.progress.value}%` }}
                transition={{ duration: phase < 4 ? 0 : 1.3, ease: EASE_IN_OUT }}
              >
                <m.span
                  className="absolute inset-0 origin-left bg-[#15803d]"
                  initial={false}
                  animate={{ scaleX: live ? 1 : 0 }}
                  transition={live ? { duration: 0.8, ease: EASE_IN_OUT, delay: 0.5 } : { duration: 0 }}
                />
              </m.span>
            </span>
          </Row>
        </Appear>
      </LoopFrame>
    </div>
  );
}

export function StepCard({ card }: { card: Step["card"] }) {
  if (card.type === "idea") return <IdeaCard card={card} />;
  if (card.type === "approve") return <ApproveCard card={card} />;
  return <ActivityCard card={card} />;
}
