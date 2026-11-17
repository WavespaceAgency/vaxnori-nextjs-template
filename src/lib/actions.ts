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

export async function sendContactMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    topic: String(formData.get("topic") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please write at least a short sentence (10+ characters).";
  if (Object.keys(errors).length) return { status: "error", errors };

  // TODO: Send `data` to your inbox or helpdesk (Resend, Postmark, HubSpot, a Slack webhook, …).
  console.log("[contact] new message:", data);

  return { status: "success" };
}
