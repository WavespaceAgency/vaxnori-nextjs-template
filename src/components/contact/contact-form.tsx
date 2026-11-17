"use client";

import { AnimatePresence, m } from "motion/react";
import { useActionState, useState, type FormEvent } from "react";
import { EASE } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { fieldClasses } from "@/components/ui/input";
import { sendContactMessage, type FormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

type Labels = {
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    topic: { label: string; options: readonly string[] };
    message: { label: string; placeholder: string };
  };
  submit: string;
  sending: string;
  note: string;
  success: string;
};

const initial: FormState = { status: "idle" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function check(form: HTMLFormElement) {
  const get = (n: string) => String(new FormData(form).get(n) ?? "").trim();
  const errors: Record<string, string> = {};
  if (get("name").length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(get("email"))) errors.email = "Please enter a valid email address.";
  if (get("message").length < 10) errors.message = "Please write at least a short sentence (10+ characters).";
  return errors;
}

/** Contact form: checks fields in the browser, then sends them to a Server Action (see src/lib/actions.ts). */
export function ContactForm({ labels }: { labels: Labels }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initial);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const errors = { ...state.errors, ...clientErrors };
  const f = labels.fields;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const found = check(event.currentTarget);
    setClientErrors(found);
    if (Object.keys(found).length) {
      event.preventDefault();
      const first = event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
    }
  };

  const field = (name: string) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onChange: () =>
      errors[name] &&
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      }),
  });
  const error = (name: string) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="text-sm text-brand-strong">
        {errors[name]}
      </p>
    ) : null;
  const label = "text-sm leading-5 font-medium text-ink";

  if (state.status === "success") {
    return (
      <m.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-start gap-3 rounded-card border border-line bg-canvas p-6"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-status-done-bg text-status-done">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="text-base leading-6 text-ink">{labels.success}</p>
      </m.div>
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className={label}>
          {f.name.label}
        </label>
        <input {...field("name")} type="text" autoComplete="name" placeholder={f.name.placeholder} className={fieldClasses} />
        {error("name")}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className={label}>
          {f.email.label}
        </label>
        <input {...field("email")} type="email" autoComplete="email" inputMode="email" spellCheck={false} placeholder={f.email.placeholder} className={fieldClasses} />
        {error("email")}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-company" className={label}>
            {f.company.label}
          </label>
          <input {...field("company")} type="text" autoComplete="organization" placeholder={f.company.placeholder} className={fieldClasses} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-topic" className={label}>
            {f.topic.label}
          </label>
          <div className="relative">
            <select {...field("topic")} defaultValue={f.topic.options[0]} className={cn(fieldClasses, "appearance-none pr-10")}>
              {f.topic.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={label}>
          {f.message.label}
        </label>
        <textarea {...field("message")} rows={4} placeholder={f.message.placeholder} className={cn(fieldClasses, "min-h-[94px] resize-y")} />
        {error("message")}
      </div>
      <div className="flex flex-col gap-4">
        <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "w-full" })}>
          <AnimatePresence mode="wait" initial={false}>
            <m.span key={pending ? "s" : "i"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              {pending ? labels.sending : labels.submit}
            </m.span>
          </AnimatePresence>
        </button>
        <p className="text-sm leading-5 text-muted">{labels.note}</p>
      </div>
    </form>
  );
}
