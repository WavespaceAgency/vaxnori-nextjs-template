"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { NavLink } from "@/config/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  links: readonly NavLink[];
  cta: NavLink;
};

/** Full-screen menu for small screens. Closes with Escape, the close button or a link click. */
export function MobileMenu({ links, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="-mr-2 flex size-11 items-center justify-center rounded-button text-ink hover:bg-canvas"
      >
        <MenuIcon className="size-7" />
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line-soft px-4 py-2.5 sm:px-6">
          <Logo showName size="sm" />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex size-11 items-center justify-center rounded-button"
          >
            <span className="flex size-6 items-center justify-center rounded-[4px] border border-line-soft bg-canvas">
              <CloseIcon className="size-3.5" />
            </span>
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="flex flex-col py-2">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center px-4 text-base leading-6 font-medium transition-colors hover:bg-canvas sm:px-6",
                      active ? "text-brand-strong" : "text-ink-soft",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto border-t border-line-soft p-4 sm:px-6">
          <Button href={cta.href} onClick={() => setOpen(false)} className="w-full" size="lg">
            {cta.label}
          </Button>
        </div>
      </div>
    </>
  );
}
