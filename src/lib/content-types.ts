/** Types and helpers for blog/job content that are safe to use in the browser (no file system). */

export type PostMeta = {
  title: string;
  /** Optional split title for the post page: shortTitle (dark) + accent (pixel font). */
  shortTitle?: string;
  accent?: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-09-02" */
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  author: { name: string; avatar: string };
  /** Shown large at the top of the blog page. */
  featured?: boolean;
};

export type JobMeta = {
  title: string;
  summary: string;
  team: string;
  location: string;
  type: string;
  salary: string;
  salaryShort: string;
  equity: string;
  function: string;
  posted: string;
  order: number;
};

export type Post = PostMeta & { slug: string };
export type Job = JobMeta & { slug: string };

/** "2026-09-02" → "Sep 2, 2026" */
export function formatDate(iso: string, month: "short" | "long" = "short") {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" });
}

