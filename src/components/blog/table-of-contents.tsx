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
export function TableOfContents({ title, headings }: { title: string; headings: string[] }) {
  const [active, setActive] = useState(headings[0] ? slugify(headings[0]) : "");

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(slugify(h))).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label={title}>
      <p className="text-sm tracking-[0.02em] text-brand-strong uppercase">{title}</p>
      <ul className="mt-4 flex flex-col border-l border-line">
        {headings.map((heading) => {
          const id = slugify(heading);
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-2 pl-4 text-sm transition-colors duration-300",
                  isActive ? "border-brand font-medium text-ink" : "border-transparent text-subtle hover:text-ink",
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
