"use client";

import { useActionState, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { subscribeToNewsletter, type FormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  label: string;
  placeholder: string;
  button: string;
  success: string;
};

const initialState: FormState = { status: "idle" };

export function NewsletterForm({ label, placeholder, button, success }: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);
  const [clientError, setClientError] = useState<string>();
  const error = clientError ?? state.errors?.email;

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(event) => {
        const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
        if (!input.validity.valid || !input.value) {
          event.preventDefault();
          setClientError("Please enter a valid email address.");
          input.focus();
        } else {
          setClientError(undefined);
        }
      }}
      className="relative flex w-full flex-col gap-2"
    >
      <label htmlFor="newsletter-email" className="text-sm leading-5 text-subtle max-md:sr-only">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-field border border-line bg-surface py-1 pr-1 pl-4 transition-colors focus-within:border-ink",
          error && "border-brand-strong",
        )}
      >
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          required
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby="newsletter-status"
          onChange={() => clientError && setClientError(undefined)}
          className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-ink placeholder:text-subtle focus-visible:outline-none"
        />
        <button type="submit" disabled={pending} className={buttonClasses({ className: "min-h-10" })}>
          {pending ? "Sending…" : button}
        </button>
      </div>
      <p
        id="newsletter-status"
        aria-live="polite"
        className={cn("absolute top-full left-0 mt-1 text-xs leading-4", error ? "text-brand-strong" : "text-muted")}
      >
        {error ?? (state.status === "success" ? success : "")}
      </p>
    </form>
  );
}
