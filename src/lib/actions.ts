"use server";

/**
 * Form handlers (Server Actions).
 * ------------------------------------------------------------
 * These only validate and log the data so the template works with
 * zero setup. Connect your own provider where you see "TODO".
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", errors: { email: "Please enter a valid email address." } };
  }

  // TODO: Send `email` to your newsletter provider (Resend, ConvertKit, Mailchimp, …).
  console.log("[newsletter] new subscriber:", email);

  return { status: "success" };
}
