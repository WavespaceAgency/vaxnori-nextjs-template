import Link from "next/link";
import { LogoMark, LogoMarkAlt } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Brand mark in a circle, optionally with the site name. Links to the home page. */
export function Logo({
  showName = false,
  size = "md",
  alt = false,
  className,
}: {
  showName?: boolean;
  /** Use the second (diamond) mark, as on mobile in Figma. */
  alt?: boolean;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2 rounded-full", className)}
      aria-label={`${siteConfig.name} – home`}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-brand text-white",
          { xs: "size-6", sm: "size-7", md: "size-8" }[size],
        )}
      >
        {alt ? (
          <LogoMarkAlt className={{ xs: "h-[15px] w-auto", sm: "h-[17.5px] w-auto", md: "h-5 w-auto" }[size]} />
        ) : (
          <LogoMark className={{ xs: "h-auto w-[11.52px]", sm: "h-auto w-[13.44px]", md: "h-auto w-[15.36px]" }[size]} />
        )}
      </span>
      {showName ? <span className={cn("font-semibold text-ink", size === "xs" ? "text-sm leading-5" : "text-base leading-6")}>{siteConfig.name}</span> : null}
    </Link>
  );
}
