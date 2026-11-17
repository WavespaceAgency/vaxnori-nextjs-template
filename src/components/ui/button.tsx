import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "dark-raised";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-button font-semibold whitespace-nowrap transition-[color,background-color,transform] duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand-strong text-white hover:bg-brand-hover",
  secondary: "bg-surface-muted text-ink hover:bg-line",
  outline: "border border-line bg-surface text-ink hover:bg-canvas",
  ghost: "text-ink hover:bg-canvas",
  dark: "bg-ink text-white hover:bg-ink/85",
  "dark-raised": "bg-ink-raised text-white hover:bg-[#444]",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm leading-5 lg:min-h-10",
  lg: "min-h-12 px-5 text-base leading-6",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = StyleProps & { children: ReactNode } & (
    | ({ href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
  );

/** A link styled as a button when `href` is set, otherwise a real <button>. */
export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
