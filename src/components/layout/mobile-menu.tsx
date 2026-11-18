"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseLargeIcon, MenuIcon } from "@/components/icons";
import { EASE } from "@/components/motion/reveal";
import type { NavLink } from "@/config/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  links: readonly NavLink[];
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Menu for small screens.
 * The navbar stays on top and the same button turns from ☰ into ✕ in place,
 * so the logo and the icon never move when the menu opens or closes.
 * The panel fills the screen below the navbar. Closes with Escape, the button or a link click.
 */
export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(45);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (!open) {
      // Start the panel exactly at the bottom edge of the navbar.
      const header = toggleRef.current?.closest("header");
      if (header) setTop(Math.round(header.getBoundingClientRect().bottom));
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    // Keep the page (and the navbar) from shifting sideways when the scrollbar disappears.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
        className="relative -mr-2 flex size-11 items-center justify-center rounded-button text-ink hover:bg-canvas"
      >
        {/* Both icons sit in the same 28px box and cross-fade, so the button never changes size or place. */}
        <MenuIcon
          className={cn(
            "absolute size-7 transition-[opacity,rotate,scale] duration-300 ease-out-expo",
            open ? "scale-75 rotate-90 opacity-0" : "opacity-100",
          )}
        />
        <CloseLargeIcon
          className={cn(
            "absolute size-7 transition-[opacity,rotate,scale] duration-300 ease-out-expo",
            open ? "opacity-100" : "scale-75 -rotate-90 opacity-0",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            key="menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ top }}
            className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-surface"
          >
            <nav aria-label="Mobile">
              <m.ul variants={list} initial="hidden" animate="show" className="flex flex-col py-2">
                {links.map((link) => {
                  const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <m.li key={link.href} variants={item}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-14 items-center px-5 text-base leading-6 font-medium transition-colors hover:bg-canvas sm:px-6",
                          active ? "text-brand-strong" : "text-ink-soft",
                        )}
                      >
                        {link.label}
                      </Link>
                    </m.li>
                  );
                })}
              </m.ul>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
