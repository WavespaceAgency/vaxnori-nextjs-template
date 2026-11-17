import type { ReactNode } from "react";
import { PlusIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: ReactNode };

/**
 * Accessible accordion built on native <details>/<summary>.
 * Works with keyboard and screen readers and needs no JavaScript.
 * Items with the same `name` close each other (one open at a time).
 */
export function Accordion({
  items,
  name = "accordion",
  defaultOpen,
  className,
}: {
  items: AccordionItem[];
  name?: string;
  defaultOpen?: number;
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => (
        <details key={item.question} name={name} open={defaultOpen === index} className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base leading-6 font-medium text-ink transition-colors hover:text-brand-strong [&::-webkit-details-marker]:hidden">
            {item.question}
            <PlusIcon className="size-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <div className="pr-10 pb-5 text-base leading-6 text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
