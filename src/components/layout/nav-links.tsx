"use client";

import { m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavLink } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const spring = { type: "spring", stiffness: 420, damping: 36 } as const;

/** Desktop navbar links: a soft highlight slides to the hovered link, a line marks the current page. */
export function NavLinks({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <ul className="flex h-full" onMouseLeave={() => setHovered(null)}>
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <li key={link.href} className="relative flex h-full border-r border-line">
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHovered(link.href)}
              onFocus={() => setHovered(link.href)}
              onBlur={() => setHovered(null)}
              className="relative flex h-full items-center px-5 text-base leading-6 font-medium text-ink focus-visible:-outline-offset-2"
            >
              {hovered === link.href ? (
                <m.span layoutId="nav-hover" transition={spring} className="absolute inset-1 rounded-[6px] bg-canvas" aria-hidden="true" />
              ) : null}
              {active ? (
                <m.span layoutId="nav-active" transition={spring} className="absolute inset-x-5 bottom-0 h-0.5 bg-brand" aria-hidden="true" />
              ) : null}
              <span className={cn("relative", !active && "text-ink/80 transition-colors hover:text-ink")}>{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
