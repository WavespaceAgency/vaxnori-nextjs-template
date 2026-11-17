import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type FieldProps = ComponentProps<"input"> & {
  label: string;
  /** Hide the label visually but keep it for screen readers. */
  hideLabel?: boolean;
  error?: string;
};

export const fieldClasses =
  "w-full rounded-field border border-line bg-surface px-4 py-3 text-base leading-6 text-ink placeholder:text-subtle transition-colors hover:border-line-strong focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong/30 aria-invalid:border-brand-strong sm:text-sm sm:leading-5";

/** Labelled text input with an optional error message. */
export function Input({ label, hideLabel, error, className, id, ...props }: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className={cn("text-sm leading-5 font-medium text-ink", hideLabel && "sr-only")}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClasses, className)}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm leading-5 text-brand-strong">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextareaProps = ComponentProps<"textarea"> & { label: string; error?: string };

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm leading-5 font-medium text-ink">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClasses, "min-h-32 resize-y", className)}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm leading-5 text-brand-strong">
          {error}
        </p>
      ) : null}
    </div>
  );
}
