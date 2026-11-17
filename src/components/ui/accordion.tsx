"use client";

import { m } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: ReactNode };

const variants = {
  /** Dashed rows with large questions (home page FAQ). */
  dashed: {
    root: "",
    item: "border-b border-dashed border-line last:border-b-0",
    button: "px-4 py-6 sm:px-8",
    question: "font-heading-flex text-h4 font-medium text-ink",
    answer: "px-4 pr-14 pb-6 sm:px-8 sm:pr-20",
  },
  /** Simple rows with solid lines. */
  simple: {
    root: "border-y border-line",
    item: "border-b border-line last:border-b-0",
    button: "py-5",
    question: "text-base leading-6 font-medium text-ink",
    answer: "pr-10 pb-5",
  },
} as const;

/**
 * Accessible accordion (one item open at a time).
 * Answers stay in the HTML when closed, so search engines can read them.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  variant = "simple",
  headingLevel = 3,
  className,
}: {
  items: readonly AccordionItem[];
  defaultOpen?: number | null;
  variant?: keyof typeof variants;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const v = variants[variant];
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={cn(v.root, className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className={v.item}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-6 text-left transition-colors hover:bg-canvas focus-visible:-outline-offset-2",
                  v.button,
                )}
              >
                <span className={v.question}>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand text-brand"
                >
                  <span className="absolute h-[1.5px] w-2 bg-current" />
                  <m.span
                    className="absolute h-2 w-[1.5px] bg-current"
                    animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </span>
              </button>
            </Heading>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <m.div
                animate={{ y: isOpen ? 0 : -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn("text-base leading-6 text-muted", v.answer)}
              >
                {item.answer}
              </m.div>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
