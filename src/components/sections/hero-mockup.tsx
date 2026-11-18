"use client";

import { m } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { LogoMark } from "@/components/icons";
import { LineIcon } from "@/components/icons/line-icons";
import { EASE_IN_OUT, RollingNumber, SwapText } from "@/components/motion/smooth";
import { useLoop } from "@/components/motion/use-loop";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

type Mockup = HomePage["hero"]["mockup"];

const card = "rounded-card border bg-surface shadow-card transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.45,0,0.2,1)]";
const chip = "rounded-[3px] border border-line bg-[#fcfcfc] px-1.5 py-0.5 text-[10px] leading-[14px] font-semibold tracking-[0.02em] text-subtle";
const STEP_MS = [3400, 3400, 3400, 4200];

/** Card border: orange glow when the step is working on this card. */
const glow = (on: boolean) =>
  on ? "border-brand shadow-[0_0_0_3px_rgb(255_72_32/0.12),0_8px_24px_-8px_rgb(255_72_32/0.35)]" : "border-[#efefef]";

/**
 * Paths for the travelling dot (Figma coordinates of the 980×402 canvas).
 * Each path starts and ends ~16px INSIDE a card, so the dot slides out from behind one card
 * and disappears behind the next (cards are drawn on top of the dot).
 */
const PATHS = {
  agent: "M242 79H337", // client pill → agent card
  launch: "M545 79H672", // agent card → "Launch website" task
  outreach: "M568 250H640V213H826V262", // checklist → "Outreach" task
  none: "M441 101V162", // agent card → checklist (Live step)
} as const;

function statusOf(value: number) {
  return value >= 100 ? "done" : value > 0 ? "progress" : "todo";
}

const statusTone = {
  todo: "bg-status-todo-bg text-status-todo",
  progress: "bg-status-progress-bg text-status-progress",
  done: "bg-status-done-bg text-status-done",
} as const;

/**
 * Animated product preview under the hero. Plays Kickoff → Build → Outreach → Live in a loop
 * (like the live site). Drawn at the Figma size (1140×562) and scaled by <ScaleToFit>.
 */
export function HeroMockup({ mockup, backgroundSrc }: { mockup: Mockup; backgroundSrc: string }) {
  const ref = useRef<HTMLElement>(null);
  const { phase: index } = useLoop(ref, STEP_MS, 3);
  const step = mockup.steps[index];
  const [launchTask, outreachTask] = mockup.tasks;
  const live = "live" in step && step.live;

  return (
    <figure
      ref={ref}
      aria-label={mockup.label}
      className="relative h-full w-[1140px] overflow-hidden bg-[#fbbf24]"
    >
      {/* Priority image (preloaded) – this is the largest element on the page */}
      <Image src={backgroundSrc} alt="" fill priority fetchPriority="high" sizes="(min-width: 1280px) 1140px, 100vw" className="object-cover" />
      <div className="bg-dots absolute inset-x-20 top-1/2 h-[402px] -translate-y-1/2">
        {/* Connector lines + the red dot that travels to the active card */}
        <svg aria-hidden="true" viewBox="0 0 980 402" className="pointer-events-none absolute inset-0 size-full text-line-strong" fill="none">
          <g stroke="currentColor" strokeWidth="1">
            {/* Lines sit on half pixels (x.5) so 1px strokes are crisp; shared segments use the exact same y */}
            <path d="M258 79.5H321" />
            <path d="M441.5 117V146" />
            <path d="M561 79.5H656" />
            <path d="M630.5 79.5V162.5H703" />
            <path d="M584 250.5H640.5V213.5H826.5V246" />
          </g>
        </svg>
        <span
          key={index}
          aria-hidden="true"
          className="absolute top-0 left-0 size-[7px] rounded-full bg-brand shadow-[0_0_0_3px_rgb(255_72_32/0.2)] motion-safe:[animation:dot-travel_2s_cubic-bezier(0.45,0,0.2,1)_0.15s_both] motion-reduce:hidden"
          style={{ offsetPath: `path("${PATHS[step.highlight]}")`, offsetRotate: "0deg" }}
        />

        {/* Step pill */}
        <div className={cn(card, "absolute top-[14px] left-[50px] flex w-[214px] items-center gap-2 rounded-full border-[#efefef] px-3 py-1.5")}>
          <span className="size-1.5 rounded-full bg-brand" />
          <SwapText id={step.label} className="flex-1 text-[11px] leading-4 font-semibold text-ink">
            Step {index + 1}/{mockup.steps.length} · {step.label}
          </SwapText>
          <span className="flex items-center gap-1" aria-hidden="true">
            {mockup.steps.map((s, i) => (
              <m.span
                key={s.label}
                className="h-1.5 rounded-full"
                animate={{ width: i === index ? 18 : 6, backgroundColor: i <= index ? "#ff4820" : "#ffc7b8" }}
                transition={{ duration: 0.7, ease: EASE_IN_OUT }}
              />
            ))}
          </span>
        </div>

        {/* Client pill */}
        <div className={cn(card, "absolute top-[63px] left-[50px] flex w-[207px] items-center gap-1.5 border-[#efefef] px-3 py-2")}>
          <span className="text-[11px] leading-[14px] text-subtle">{mockup.client.label}</span>
          <span className="flex-1 text-[11px] leading-[14px] font-bold text-ink">{mockup.client.name}</span>
          <span className="text-[10px] leading-[14px] text-subtle">{mockup.client.date}</span>
        </div>

        {/* Agent card */}
        <div className={cn(card, glow(step.highlight === "agent"), "absolute top-10 left-[321px] flex w-60 flex-col gap-2.5 px-2.5 py-2")}>
          <div className="flex items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <LogoMark className="h-auto w-[13.06px]" />
            </span>
            <div className="min-w-0">
              <p className="text-xs leading-[14px] font-semibold text-ink">{mockup.agent.name}</p>
              <p className="text-[11px] leading-4 text-subtle">{mockup.agent.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {mockup.agent.tags.map((tag) => (
              <span key={tag} className={chip}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Launch checklist */}
        <div className={cn(card, "absolute top-[146px] left-[50px] flex w-[534px] flex-col gap-4 border-[#efefef] px-4 py-3.5")}>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <p className="text-[13px] leading-4 font-bold tracking-[0.02em] text-ink">{mockup.checklistTitle}</p>
            <RollingNumber value={step.progress} suffix="%" className="text-[11px] leading-[14px] font-semibold text-subtle tabular-nums" />
          </div>
          <ul className="flex flex-col gap-3">
            {mockup.rows.map((row, i) => {
              const value = step.bars[i];
              const status = statusOf(value);
              return (
                <li key={row} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[11px] leading-[14px] font-medium text-muted">{row}</span>
                  <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#f3f3f3]">
                    <m.span
                      className="relative block h-full overflow-hidden rounded-full bg-brand"
                      initial={false}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1.3, ease: EASE_IN_OUT, delay: i * 0.08 }}
                    >
                      {/* Green sweeps in from the left on "Live" (no muddy colour mix) */}
                      <m.span
                        className="absolute inset-0 origin-left bg-[#15803d]"
                        initial={false}
                        animate={{ scaleX: live ? 1 : 0 }}
                        transition={live ? { duration: 0.8, ease: EASE_IN_OUT, delay: 0.25 + i * 0.1 } : { duration: 0 }}
                      />
                    </m.span>
                  </span>
                  <span className="flex w-[68px] shrink-0 justify-end">
                    <span className={cn("rounded-[3px] px-1.5 py-0.5 text-[10px] leading-[14px] font-semibold whitespace-nowrap transition-colors duration-700", statusTone[status])}>
                      <SwapText id={status}>{mockup.statusLabels[status]}</SwapText>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Task: launch website */}
        <div className={cn(card, glow(step.highlight === "launch"), "absolute top-10 left-[656px] flex w-60 flex-col gap-2.5 px-2.5 py-2")}>
          <div>
            <p className="text-xs leading-[14px] font-semibold text-ink">{launchTask.title}</p>
            <p className="text-[11px] leading-4 text-subtle">{launchTask.subtitle}</p>
          </div>
          {"tags" in launchTask ? (
            <div className="flex gap-1">
              {launchTask.tags.map((tag) => (
                <span key={tag} className={chip}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* "Task details" pill */}
        <span className={cn(card, "absolute top-[148px] left-[703px] rounded-full border-[#efefef] px-2.5 py-1 text-[10px] leading-4 font-semibold text-subtle")}>
          {mockup.detailsLabel}
        </span>

        {/* Outreach task + status toast */}
        <div className="absolute top-[246px] left-[723px] flex w-[206px] flex-col items-center gap-2.5">
          <div className={cn(card, glow(step.highlight === "outreach"), "w-full px-2.5 py-2")}>
            <p className="text-xs leading-[14px] font-semibold text-ink">{outreachTask.title}</p>
            <p className="text-[11px] leading-4 text-subtle">{outreachTask.subtitle}</p>
          </div>
          <div
            role="status"
            className={cn(
              "flex w-[168px] items-start gap-2 rounded-card bg-ink px-2.5 py-2 shadow-card transition-shadow duration-700",
              live && "shadow-[0_0_0_3px_rgb(34_160_97/0.35),0_10px_30px_-8px_rgb(34_160_97/0.6)]",
            )}
          >
            <LineIcon name="sparkle" className="mt-px size-3.5 shrink-0 text-brand motion-safe:animate-spin-slow" />
            <SwapText id={step.toast.title}>
              <span className="block">
                <span className={cn("block text-xs leading-[14px] font-semibold text-white", !live && "motion-safe:animate-pulse-soft")}>{step.toast.title}</span>
                <span className={cn("block text-[11px] leading-4", live ? "text-[#4ade80]" : "text-white/60")}>{step.toast.subtitle}</span>
              </span>
            </SwapText>
          </div>
        </div>
      </div>
    </figure>
  );
}
