"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navbar links. Marks the current page with aria-current. */
export function NavLinks({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex h-full">
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <li key={link.href} className="flex h-full border-r border-line">
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-full items-center px-5 text-base leading-6 font-medium text-ink transition-colors hover:bg-canvas focus-visible:-outline-offset-2",
                "after:absolute after:inset-x-5 after:bottom-0 after:h-0.5 after:bg-brand after:opacity-0 after:transition-opacity",
                active && "after:opacity-100",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
