import type { CSSProperties } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { GrowBar } from "@/components/motion/grow-bar";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

type Step = HomePage["howItWorks"]["steps"][number];

const card = "rounded-card border border-[#efefef] bg-surface shadow-card";

function Row({ icon, label, meta, className, style }: { icon: Parameters<typeof LineIcon>[0]["name"]; label: string; meta: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn(card, "flex items-center gap-2 px-2.5 py-2", className)} style={style}>
      <LineIcon name={icon} className="size-3.5 text-muted" />
      <span className="flex-1 text-[11px] leading-4 font-medium text-ink">{label}</span>
      <span className="text-[10px] leading-4 text-subtle">{meta}</span>
    </div>
  );
}

function IdeaCard({ card: c }: { card: Extract<Step["card"], { type: "idea" }> }) {
  return (
    <div className="flex w-full max-w-[206px] flex-col gap-1.5">
      <div className={cn(card, "px-3 py-2.5")}>
        <p className="text-[10px] leading-4 tracking-[0.04em] text-subtle uppercase">{c.label}</p>
        <p className="mt-1 text-[11px] leading-4 font-medium text-ink">{c.text}</p>
      </div>
      <p className="flex items-center gap-2 text-[10px] leading-4 font-medium text-brand-strong">
        <span className="h-px flex-1 bg-line-strong" />
        {c.drafted}
        <span className="h-px flex-1 bg-line-strong" />
      </p>
      <Stagger gap={0.18} delay={0.2} amount={0.6} className="flex flex-col gap-1.5">
        {c.tasks.map((task) => (
          <StaggerItem key={task.label}>
            <Row {...task} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function ApproveCard({ card: c }: { card: Extract<Step["card"], { type: "approve" }> }) {
  return (
    <div className="flex w-full max-w-[206px] flex-col items-center">
      <div className={cn(card, "flex w-full items-start justify-between gap-2 px-3 py-2.5")}>
        <p className="text-[11px] leading-[14px] font-semibold text-ink">{c.title}</p>
        <span className="rounded-[3px] bg-status-progress-bg px-1.5 py-0.5 text-[9px] leading-3 font-semibold whitespace-nowrap text-status-progress">
          {c.status}
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
      <div className={cn(card, "flex w-full gap-2 p-2")}>
        <span className="flex-1 rounded-[4px] bg-surface-muted py-1.5 text-center text-[10px] leading-4 font-medium text-ink">{c.hold}</span>
        <span className="relative flex-1 rounded-[4px] bg-brand-strong py-1.5 text-center text-[10px] leading-4 font-medium text-white">
          <span aria-hidden="true" className="absolute inset-0 rounded-[4px] bg-brand motion-safe:animate-ping [animation-duration:2.4s]" />
          <span className="relative">{c.approve}</span>
        </span>
      </div>
    </div>
  );
}

function ActivityCard({ card: c }: { card: Extract<Step["card"], { type: "activity" }> }) {
  return (
    <div className="relative flex w-full max-w-[206px] flex-col gap-1.5 pl-4">
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[3px] w-px bg-line-strong" />
      <div className="flex items-center justify-between rounded-card bg-ink px-3 py-2.5">
        <p className="text-[11px] leading-4 font-semibold text-white">{c.title}</p>
        <span className="rounded-[3px] bg-[#3d3200] px-1.5 py-0.5 text-[9px] leading-3 font-semibold text-[#ffd84d]">{c.status}</span>
      </div>
      <Stagger gap={0.2} delay={0.2} amount={0.6} className="flex flex-col gap-1.5">
        {c.items.map((item) => (
          <StaggerItem key={item.label} className="relative">
            <span aria-hidden="true" className="absolute top-1/2 -left-4 size-[7px] -translate-y-1/2 rounded-full border border-line-strong bg-surface" />
            <Row {...item} />
          </StaggerItem>
        ))}
      </Stagger>
      <div className="relative">
        <span aria-hidden="true" className="absolute top-1/2 -left-4 size-[7px] -translate-y-1/2 rounded-full border border-brand bg-brand-soft motion-safe:animate-pulse-soft" />
        <div className={cn(card, "flex flex-col gap-1.5 px-2.5 py-2")}>
          <div className="flex items-center gap-2">
            <LineIcon name={c.progress.icon} className="size-3.5 text-muted" />
            <span className="flex-1 text-[11px] leading-4 font-medium text-ink">{c.progress.label}</span>
            <span className="text-[10px] leading-4 font-semibold text-brand-strong">{c.progress.value}%</span>
          </div>
          <span className="h-1 overflow-hidden rounded-full bg-[#f3f3f3]">
            <GrowBar value={c.progress.value} delay={0.9} className="h-full rounded-full bg-brand" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function StepCard({ card }: { card: Step["card"] }) {
  if (card.type === "idea") return <IdeaCard card={card} />;
  if (card.type === "approve") return <ApproveCard card={card} />;
  return <ActivityCard card={card} />;
}
