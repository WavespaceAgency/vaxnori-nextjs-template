/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** True for links that leave the site (http, mailto, tel). */
export function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
