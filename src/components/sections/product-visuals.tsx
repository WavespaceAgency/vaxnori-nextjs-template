import Image from "next/image";
import type { CSSProperties } from "react";
import { LogoMark } from "@/components/icons";
import { LineIcon, type LineIconName } from "@/components/icons/line-icons";
import { cn } from "@/lib/utils";

const card = "rounded-card border border-line bg-surface shadow-card";

export function ImageVisual({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1280px) 619px, (min-width: 1024px) 50vw, 100vw"
      className="size-full object-cover object-top"
    />
  );
}

/** Animated workflow: steps light up one after another. */
export function WorkflowVisual({
  title,
  steps,
}: {
  title: string;
  steps: readonly { icon: LineIconName; label: string; meta: string }[];
}) {
  return (
    <div className="bg-dots flex size-full flex-col items-center justify-center gap-0 p-6">
      <p className="mb-4 text-xs leading-4 font-medium tracking-[0.04em] text-subtle uppercase">{title}</p>
      <ol className="relative flex w-full max-w-xs flex-col">
        {steps.map((step, index) => (
          <li key={step.label} className="flex flex-col items-center">
            {index > 0 ? (
              <svg aria-hidden="true" viewBox="0 0 2 24" className="h-6 w-0.5 text-line-strong">
                <path d="M1 0v24" stroke="currentColor" strokeDasharray="3 3" className="motion-safe:animate-dash" />
              </svg>
            ) : null}
            <div
              className={cn(card, "flex w-full items-center gap-3 px-3 py-2.5 motion-safe:animate-step-glow")}
              style={{ animationDelay: `${index * 2}s` } as CSSProperties}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                <LineIcon name={step.icon} className="size-4" />
              </span>
              <span className="flex-1 text-[13px] leading-4 font-medium text-ink">{step.label}</span>
              <span className="rounded-[3px] border border-line bg-canvas px-1.5 py-0.5 text-[10px] leading-[14px] font-semibold text-subtle">
                {step.meta}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Company map: departments placed around the brand, gently floating. */
export function CanvasVisual({
  center,
  nodes,
}: {
  center: string;
  nodes: readonly { icon: LineIconName; label: string }[];
}) {
  const positions = nodes.map((_, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(angle) * 37, y: 50 + Math.sin(angle) * 38 };
  });
  return (
    <div className="bg-dots relative size-full min-h-80 overflow-hidden">
      <svg aria-hidden="true" className="absolute inset-0 size-full text-line-strong" preserveAspectRatio="none" viewBox="0 0 100 100">
        {positions.map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="1 1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 flex -translate-1/2 items-center gap-2 rounded-full border border-line bg-surface py-2 pr-4 pl-2 shadow-[0_0_0_8px_rgb(0_0_0/0.03)]">
        <span className="flex size-8 items-center justify-center rounded-lg bg-ink text-white">
          <LogoMark className="h-[18px] w-auto" />
        </span>
        <span className="font-heading-flex text-base font-semibold text-ink">{center}</span>
      </div>
      <ul>
        {nodes.map((node, i) => (
          <li
            key={node.label}
            className="absolute -translate-1/2"
            style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
          >
            <span
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs leading-4 font-medium text-muted shadow-card motion-safe:animate-float"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <LineIcon name={node.icon} className="size-3.5" />
              {node.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
