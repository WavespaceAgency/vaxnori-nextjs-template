"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** "On this page" list. Highlights the section you are reading. */
export function TableOfContents({ title, headings, size = "sm", showTitle = true }: { title: string; headings: string[]; size?: "sm" | "lg"; showTitle?: boolean }) {
  const [active, setActive] = useState(headings[0] ? slugify(headings[0]) : "");

  useEffect(() => {
    // Active = the last section whose heading has scrolled past the top third of the screen.
    const ids = headings.map(slugify);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.33) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label={title}>
      <p className={showTitle ? "mb-4 text-sm tracking-[0.02em] text-brand-strong uppercase" : "sr-only"}>{title}</p>
      <ul className={cn("flex flex-col border-l border-line", size === "lg" && "gap-5")}>
        {headings.map((heading) => {
          const id = slugify(heading);
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l pl-4 transition-colors duration-300",
                  size === "lg" ? "text-xl leading-6 font-medium" : "py-2 text-sm",
                  isActive
                    ? cn("text-ink", size === "lg" ? "border-l-2 border-brand-strong" : "border-brand font-medium")
                    : "border-transparent text-subtle hover:text-ink",
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
