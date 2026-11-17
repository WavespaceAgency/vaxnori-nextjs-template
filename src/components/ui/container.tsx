import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & {
  /** Draw the thin vertical guide lines from the design on both sides. */
  bordered?: boolean;
};

/** The 1240px content column used by every section. */
export function Container({ bordered = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-[calc(100%-2rem)] max-w-site",
        bordered && "border-x border-line",
        className,
      )}
      {...props}
    />
  );
}
