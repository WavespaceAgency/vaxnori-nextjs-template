import type { CSSProperties } from "react";
import { LogoMark } from "@/components/icons";
import { LineIcon } from "@/components/icons/line-icons";
import { Badge } from "@/components/ui/badge";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

type Mockup = HomePage["hero"]["mockup"];

const card = "rounded-card border border-[#efefef] bg-surface shadow-card";
const chip = "rounded-[3px] border border-line bg-[#fcfcfc] px-1.5 py-0.5 text-[10px] leading-[14px] font-semibold tracking-[0.02em] text-subtle";
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const pop = "motion-safe:animate-pop-in delay-var";

/**
 * Animated product preview shown under the hero.
 * Drawn at the exact Figma size (1140×562) and scaled down to fit smaller screens
 * by <ScaleToFit> (as in the Figma mobile frame).
 */
export function HeroMockup({ mockup, backgroundSrc }: { mockup: Mockup; backgroundSrc: string }) {
  const [launchTask, outreachTask] = mockup.tasks;
  return (
    <figure
      aria-label={mockup.label}
      className="relative h-full w-[1140px] overflow-hidden bg-[#fbbf24] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSrc})` }}
    >
      <div className="bg-dots absolute inset-x-20 top-1/2 h-[402px] -translate-y-1/2">
        {/* Connector lines (wide screens only) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 980 402"
          className="pointer-events-none absolute inset-0 size-full text-line-strong"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="1">
            <path d="M258 79H321" />
            <path d="M441 117V146" />
            <path d="M561 79H656" />
            <path d="M561 80H630V162H703" />
            <path d="M584 250H640V213H826V246" />
          </g>
        </svg>

        {/* Row 1 on small screens: client + agent */}
        <div className="contents">
          {/* Client pill */}
          <div
            className={cn(card, pop, "absolute top-[63px] left-[50px] flex w-[207px] items-center gap-1.5 px-3 py-2")}
            style={delay(150)}
          >
            <span className="text-[11px] leading-[14px] text-subtle">{mockup.client.label}</span>
            <span className="flex-1 text-[11px] leading-[14px] font-bold text-ink">{mockup.client.name}</span>
            <span className="text-[10px] leading-[14px] text-subtle">{mockup.client.date}</span>
          </div>

          {/* Agent card */}
          <div
            className={cn(card, pop, "absolute top-10 left-[321px] flex w-60 flex-col gap-2.5 px-2.5 py-2")}
            style={delay(300)}
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <LogoMark className="h-[17px] w-auto" />
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
        </div>

        {/* Launch checklist */}
        <div
          className={cn(card, pop, "absolute top-[146px] left-[50px] flex w-[534px] flex-col gap-4 px-4 py-3.5")}
          style={delay(450)}
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <p className="text-[13px] leading-4 font-bold tracking-[0.02em] text-ink">{mockup.checklist.title}</p>
            <p className="text-[11px] leading-[14px] font-semibold text-subtle">{mockup.checklist.progress}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {mockup.checklist.items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-[11px] leading-[14px] font-medium text-muted">{item.label}</span>
                <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#f3f3f3]">
                  <span
                    className="block h-full origin-left rounded-full bg-brand motion-safe:animate-grow-x delay-var"
                    style={{ width: `${item.value}%`, ...delay(700 + index * 120) }}
                  />
                </span>
                <span className="flex w-[68px] shrink-0 justify-end">
                  <Badge tone={item.tone}>{item.status}</Badge>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Task: launch website */}
        <div
          className={cn(card, pop, "absolute top-10 left-[656px] flex w-60 flex-col gap-2.5 px-2.5 py-2")}
          style={delay(600)}
        >
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
        <span
          className={cn(
            card,
            pop,
            "absolute top-[148px] left-[703px] rounded-full px-2.5 py-1 text-[10px] leading-4 font-semibold text-subtle",
          )}
          style={delay(750)}
        >
          {mockup.detailsLabel}
        </span>

        {/* Outreach task + toast */}
        <div className="absolute top-[246px] left-[723px] flex w-[206px] flex-col items-center gap-2.5">
          <div className={cn(card, pop, "w-full px-2.5 py-2")} style={delay(900)}>
            <p className="text-xs leading-[14px] font-semibold text-ink">{outreachTask.title}</p>
            <p className="text-[11px] leading-4 text-subtle">{outreachTask.subtitle}</p>
          </div>
          <div
            role="status"
            className={cn(pop, "flex w-[168px] items-start gap-2 rounded-card bg-ink px-2.5 py-2 shadow-card")}
            style={delay(1100)}
          >
            <LineIcon name="sparkle" className="mt-px size-3.5 shrink-0 text-brand motion-safe:animate-spin-slow" />
            <div>
              <p className="text-xs leading-[14px] font-semibold text-white motion-safe:animate-pulse-soft">{mockup.toast.title}</p>
              <p className="text-[11px] leading-4 text-white/60">{mockup.toast.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
