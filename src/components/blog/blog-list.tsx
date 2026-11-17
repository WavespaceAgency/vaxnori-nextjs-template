"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";
import { EASE } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import { PostCard } from "./post-card";

type Labels = { allLabel: string; categories: readonly string[]; readMore: string; loadMore: string; empty: string; pageSize: number };

/** Category tabs (filter) + card grid + "Load older posts". */
export function BlogList({ posts, labels }: { posts: Post[]; labels: Labels }) {
  const tabs = [labels.allLabel, ...labels.categories];
  const [active, setActive] = useState<string>(labels.allLabel);
  const [visible, setVisible] = useState(labels.pageSize);
  const id = useId();
  const filtered = active === labels.allLabel ? posts : posts.filter((post) => post.category === active);
  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="border-y border-dashed border-line">
        <div role="tablist" aria-label="Filter posts by category" className="flex overflow-x-auto [scrollbar-width:none] sm:gap-4 sm:px-4 lg:pl-[50px]">
          {tabs.map((tab) => {
            const selected = tab === active;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                onClick={() => {
                  setActive(tab);
                  setVisible(labels.pageSize);
                }}
                className={cn(
                  "relative shrink-0 border-b border-transparent px-4 py-4 text-[15px] leading-6 whitespace-nowrap transition-colors duration-300 first:pl-6 sm:first:pl-4 lg:py-5 lg:text-base",
                  selected ? "text-ink" : "text-subtle hover:text-ink",
                )}
              >
                <span className="grid">
                  <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-medium">
                    {tab}
                  </span>
                  <span className={cn("col-start-1 row-start-1 text-center", selected && "font-medium")}>{tab}</span>
                </span>
                {selected ? (
                  <m.span
                    layoutId={`${id}-underline`}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-x-0 bottom-0 h-px bg-ink"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${id}-panel`} role="tabpanel" className="px-6 pt-8 pb-14 sm:px-8 lg:px-[50px] lg:pb-12">
        {shown.length ? (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((post, i) => (
                <m.li
                  key={post.slug}
                  layout
                  initial={{ opacity: 0.001, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: EASE, delay: (i % labels.pageSize) * 0.06 }}
                >
                  <PostCard post={post} readMore={labels.readMore} />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="py-16 text-center text-base text-muted">{labels.empty}</p>
        )}
        {filtered.length > visible ? (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" onClick={() => setVisible((v) => v + labels.pageSize)}>
              {labels.loadMore}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
