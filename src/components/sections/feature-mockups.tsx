"use client";

import { m } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE_IN_OUT, RollingNumber, SOFT_SPRING, SwapText } from "@/components/motion/smooth";
import { useLoop } from "@/components/motion/use-loop";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

/**
 * Animated mockups for the feature rows (Launch, Grow, Run), drawn at the Figma size (504×400)
 * and looping like the live site. Each loop ends with a soft fade before it restarts.
 */

type Visual = NonNullable<Extract<HomePage["features"][number], { visual: unknown }>["visual"]>;

const card = "absolute rounded-card border border-[#efefef] bg-surface shadow-card";
const label = "text-[10px] leading-4 tracking-[0.04em] text-subtle uppercase";

const tones = {
  todo: "bg-status-todo-bg text-status-todo",
  done: "bg-status-done-bg text-status-done",
  progress: "bg-status-progress-bg text-status-progress",
  queued: "bg-status-queued-bg text-status-queued",
} as const;

function Chip({ tone, children }: { tone: keyof typeof tones; children: ReactNode }) {
  return (
    <span className={cn("rounded-[3px] px-1.5 py-0.5 text-[9px] leading-3 font-semibold whitespace-nowrap transition-colors duration-700", tones[tone])}>
      {children}
    </span>
  );
}

function Frame({ hidden, children }: { hidden: boolean; children: ReactNode }) {
  return (
    <m.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, filter: hidden ? "blur(2px)" : "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE_IN_OUT }}
    >
      {children}
    </m.div>
  );
}

function Appear({ show, delay = 0, children, className, from = 10 }: { show: boolean; delay?: number; children: ReactNode; className?: string; from?: number }) {
  return (
    <m.div
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: from, scale: 0.98 }}
      transition={show ? { ...SOFT_SPRING, delay } : { duration: 0 }}
    >
      {children}
    </m.div>
  );
}

/* 01 — Launch: tasks get their status one by one, then the brand identity fills in */
const LAUNCH_MS = [700, 600, 600, 600, 600, 900, 2800, 700];

function LaunchMockup({ v }: { v: Extract<Visual, { type: "launch" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase } = useLoop(ref, LAUNCH_MS, 6);
  const on = phase < 7;
  return (
    <div ref={ref} className="bg-dots relative h-[400px] w-[504px]">
      <Frame hidden={phase === 7}>
        <div className={cn(card, "top-[55px] left-20 w-[345px] px-4 py-3.5")}>
          <p className={cn(label, "border-b border-line pb-2.5")}>{v.checklistTitle}</p>
          <ul className="mt-3 flex flex-col gap-[9px]">
            {v.tasks.map((task, i) => {
              const done = phase >= 2 + i && on && i < 3;
              return (
                <li key={task.label} className="flex items-center gap-3 text-[11px] leading-[17px]">
                  <span className="w-3.5 text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-medium text-ink">{task.label}</span>
                  <Chip tone={done || i === 3 ? task.tone : "queued"}>
                    <SwapText id={done ? "d" : "q"}>{done || i === 3 ? task.status : v.queuedLabel}</SwapText>
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={cn(card, "top-[224px] left-20 h-[121px] w-[345px] px-4 py-3.5")}>
          <p className={cn(label, "border-b border-line pb-2.5")}>{v.identityTitle}</p>
          <div className="mt-3 flex items-start justify-between">
            <Appear show={phase >= 1 && on} from={6}>
              <p className="font-heading-flex text-lg leading-6 font-semibold tracking-[-0.02em] text-ink">{v.brand}</p>
            </Appear>
            <Appear show={phase >= 6 && on} from={4}>
              <p className="text-right text-[10px] leading-[14px] text-subtle">
                {v.voice.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Appear>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1">
            {v.colors.map((color, i) => (
              <m.span
                key={color}
                className="h-[17px] origin-left"
                style={{ backgroundColor: color }}
                initial={false}
                animate={{ scaleX: phase >= 5 && on ? 1 : 0, opacity: phase >= 5 && on ? 1 : 0 }}
                transition={phase >= 5 ? { duration: 0.7, ease: EASE_IN_OUT, delay: i * 0.12 } : { duration: 0 }}
              />
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* 02 — Grow: funnel numbers count up row by row, the draft appears, Approve → Sent */
const GROW_MS = [500, 750, 750, 750, 750, 1300, 2600, 700];
const ROW_WIDTHS = [373, 336, 298, 261];

function GrowMockup({ v }: { v: Extract<Visual, { type: "grow" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase } = useLoop(ref, GROW_MS, 6);
  const sent = phase === 6;
  return (
    <div ref={ref} className="bg-dots relative h-[400px] w-[504px]">
      <Frame hidden={phase === 7}>
        <div className="absolute top-[34px] left-[66px] flex flex-col gap-[9px]">
          {v.funnel.map((row, i) => {
            const show = phase >= i + 1 && phase < 7;
            return (
              <Appear key={row.label} show={show} from={8}>
                <div className="flex h-[39px] items-center gap-3 rounded-card border border-[#efefef] bg-surface px-3.5 shadow-card" style={{ width: ROW_WIDTHS[i] }}>
                  <span className="text-[13px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[13px] font-medium text-ink">{row.label}</span>
                  <span className="font-heading-italic text-[15px] font-medium text-brand-strong tabular-nums">
                    <RollingNumber value={show ? row.value : 0} duration={show ? 0.9 : 0} />
                  </span>
                </div>
              </Appear>
            );
          })}
        </div>
        <Appear show={phase >= 5 && phase < 7} className="absolute top-[234px] left-[66px] w-[373px]" from={14}>
          <div className="rounded-card bg-ink px-4 py-4 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.5)]">
            <p className="border-b border-white/15 pb-2.5 text-[9px] leading-3 tracking-[0.04em] text-white/55 uppercase">{v.draftLabel}</p>
            <p className="mt-3 text-[13px] leading-[17px] text-white">{v.draft}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <span className="rounded-[4px] bg-[#333] py-1.5 text-center text-[11px] text-white/80">{v.hold}</span>
              <m.span
                className="rounded-[4px] py-1.5 text-center text-[11px] font-medium text-white"
                initial={false}
                animate={{ backgroundColor: sent ? "#15803d" : "#ff4820", scale: sent ? [0.94, 1] : 1 }}
                transition={{ backgroundColor: { duration: 0.25, ease: "easeOut" }, scale: SOFT_SPRING }}
              >
                <SwapText id={sent ? "s" : "a"}>{sent ? v.sent : v.approve}</SwapText>
              </m.span>
            </div>
          </div>
        </Appear>
      </Frame>
    </div>
  );
}

/* 03 — Run: a recurring task is sent, the Monday digest numbers roll up and the chart grows */
const RUN_MS = [700, 2000, 2800, 700];

function RunMockup({ v }: { v: Extract<Visual, { type: "run" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { phase } = useLoop(ref, RUN_MS, 2);
  // Values stay up while the card fades out (phase 3) and reset instantly while hidden.
  const live = phase >= 1;
  return (
    <div ref={ref} className="bg-dots relative h-[400px] w-[504px]">
      <Frame hidden={phase === 3}>
        <div className={cn(card, "top-[46px] left-[91px] w-[322px] px-4 py-3.5")}>
          <div className={cn(label, "flex justify-between border-b border-line pb-2.5")}>
            <span>{v.recurringTitle}</span>
            <span>{v.recurringNote}</span>
          </div>
          <ul className="mt-3 flex flex-col gap-[9px]">
            {v.recurring.map((row) => {
              const done = live && Boolean(row.done);
              return (
                <li key={row.label} className="flex items-center gap-2.5 text-[11px] leading-[17px]">
                  <span className="w-7 text-subtle uppercase">{row.day}</span>
                  <span className="flex-1 font-medium text-ink">{row.label}</span>
                  <Chip tone={done ? "progress" : "queued"}>
                    <SwapText id={done ? "d" : "q"}>{done ? row.done : v.queuedLabel}</SwapText>
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={cn(card, "top-[164px] left-[91px] h-[188px] w-[322px] px-4 py-3.5")}>
          <p className={cn(label, "border-b border-line pb-2.5")}>{v.digestTitle}</p>
          <div className="mt-4 grid grid-cols-3">
            {v.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-heading-flex text-lg leading-5 font-medium text-ink tabular-nums">
                  <RollingNumber value={live ? metric.value : 0} decimals={metric.decimals} suffix={metric.suffix} duration={live ? 1.6 : 0} />
                </p>
                <p className="mt-1 text-[10px] text-subtle">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-4 bottom-[15px] flex h-[66px] items-end justify-between">
            {v.bars.map(([a, b], i) => (
              <div key={i} className="flex h-full items-end gap-[2px]">
                {[a, b].map((h, j) => (
                  <m.span
                    key={j}
                    className={cn("w-4 origin-bottom", j === 0 ? "bg-brand" : "bg-[#ffcf00]")}
                    style={{ height: `${h}%` }}
                    initial={false}
                    animate={{ scaleY: live ? 1 : 0.06 }}
                    transition={live ? { duration: 0.9, ease: EASE_IN_OUT, delay: i * 0.09 + j * 0.04 } : { duration: 0 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
}

export function FeatureMockup({ visual }: { visual: Visual }) {
  if (visual.type === "launch") return <LaunchMockup v={visual} />;
  if (visual.type === "grow") return <GrowMockup v={visual} />;
  return <RunMockup v={visual} />;
}
