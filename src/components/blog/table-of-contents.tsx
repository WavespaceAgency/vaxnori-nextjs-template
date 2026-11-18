"use client";

import { m } from "motion/react";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * "On this page" list. Highlights the section you are reading.
 * - Clicking an item makes it active straight away and scrolls there smoothly.
 * - The active bar slides between items.
 * - At the bottom of the page the last item is active (short last sections can't reach the top).
 */
export function TableOfContents({ title, headings, size = "sm", showTitle = true }: { title: string; headings: string[]; size?: "sm" | "lg"; showTitle?: boolean }) {
  const [active, setActive] = useState(headings[0] ? slugify(headings[0]) : "");
  const barId = useId();
  // After a click the clicked item stays active until the reader scrolls on their own
  // (a heading near the end of the page can't reach the top, so the spy would pick the wrong one).
  const locked = useRef(false);

  useEffect(() => {
    const ids = headings.map(slugify);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (locked.current) return;
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        let current = ids[0];
        if (atBottom) {
          current = ids[ids.length - 1];
        } else {
          // Active = the last section whose heading has scrolled past the top third of the screen.
          for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top < window.innerHeight * 0.33) current = id;
          }
        }
        setActive(current);
      });
    };
    // Any scroll the reader starts (wheel, touch, keys, scrollbar) hands control back to the spy.
    const userEvents = ["wheel", "touchmove", "keydown", "mousedown"] as const;
    const unlock = () => {
      if (!locked.current) return;
      locked.current = false;
      update();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    userEvents.forEach((type) => window.addEventListener(type, unlock, { passive: true }));
    return () => {
      window.removeEventListener("scroll", update);
      userEvents.forEach((type) => window.removeEventListener(type, unlock));
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setActive(id);
    locked.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  if (!headings.length) return null;
  return (
    <nav aria-label={title}>
      <p className={showTitle ? "mb-4 text-sm tracking-[0.02em] text-brand-strong uppercase" : "sr-only"}>{title}</p>
      <ul className={cn("flex flex-col border-l border-line", size === "lg" && "gap-5")}>
        {headings.map((heading) => {
          const id = slugify(heading);
          const isActive = active === id;
          return (
            <li key={id} className="relative">
              {isActive ? (
                <m.span
                  layoutId={barId}
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  className={cn("absolute inset-y-0 left-0 bg-brand", size === "lg" ? "-ml-px w-0.5" : "-ml-px w-px")}
                />
              ) : null}
              <a
                href={`#${id}`}
                onClick={(event) => onClick(event, id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block pl-4 transition-colors duration-300",
                  size === "lg" ? "text-xl leading-6 font-medium" : "py-2 text-sm",
                  isActive ? cn("text-ink", size === "sm" && "font-medium") : "text-subtle hover:text-ink",
                )}
              >
                {heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
