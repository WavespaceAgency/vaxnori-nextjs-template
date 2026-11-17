"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CheckCircle } from "@/components/icons/line-icons";
import { cn } from "@/lib/utils";

export type ProductTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  points: readonly string[];
  visual: ReactNode;
  /** True for code-drawn visuals that need extra height on phones. */
  tallOnMobile?: boolean;
};

/** Accessible tabs (arrow keys, Home/End) for the Product section. */
export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(tabs.length - 1),
    };
    if (keys[event.key]) {
      event.preventDefault();
      keys[event.key]();
    }
  };

  return (
    <div>
      <div className="border-y border-dashed border-line">
        <div
          role="tablist"
          aria-label="Product features"
          onKeyDown={onKeyDown}
          className="flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:gap-4 lg:px-[50px]"
        >
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "relative shrink-0 px-4 py-5 text-base leading-6 whitespace-nowrap transition-colors focus-visible:-outline-offset-4",
                  "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-300",
                  selected ? "font-medium text-ink after:scale-x-100" : "text-subtle after:scale-x-0 hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="grid items-center gap-10 px-4 py-12 focus-visible:-outline-offset-4 sm:px-8 lg:grid-cols-[minmax(0,421px)_minmax(0,619px)] lg:justify-between lg:px-[50px] lg:py-[100px]"
        >
          <div className="flex flex-col gap-5 motion-safe:animate-fade-up">
            <div className="flex flex-col gap-3">
              <h3 className="font-heading-flex text-h4 font-medium text-ink">{tab.title}</h3>
              <p className="text-base leading-6 text-muted">{tab.description}</p>
            </div>
            <ul className="flex flex-col gap-2">
              {tab.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-base leading-6 text-muted">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={cn(
              "aspect-[619/401] w-full overflow-hidden border border-[#e6e6e6] bg-surface shadow-frame motion-safe:animate-pop-in",
              tab.tallOnMobile && "max-sm:aspect-auto max-sm:min-h-80",
            )}
          >
            {tab.visual}
          </div>
        </div>
      ))}
    </div>
  );
}
