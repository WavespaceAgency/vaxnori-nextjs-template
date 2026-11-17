import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Content loader for blog posts and job posts.
 * ------------------------------------------------------------
 * Add a post: create src/content/blog/<slug>.mdx with `export const meta = { … }`.
 * Add a job:  create src/content/careers/<slug>.mdx with `export const meta = { … }`.
 * The file name becomes the URL (/blog/<slug>, /careers/<slug>).
 */

export type { Job, JobMeta, Post, PostMeta } from "./content-types";
export { formatDate } from "./content-types";
import type { Job, JobMeta, Post, PostMeta } from "./content-types";

const ROOT = path.join(process.cwd(), "src", "content");

function slugsIn(folder: "blog" | "careers" | "legal") {
  return fs
    .readdirSync(path.join(ROOT, folder))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

type MdxModule<T> = { default: ComponentType; meta: T };

export async function loadPost(slug: string) {
  return (await import(`@/content/blog/${slug}.mdx`)) as MdxModule<PostMeta>;
}

export async function loadJob(slug: string) {
  return (await import(`@/content/careers/${slug}.mdx`)) as MdxModule<JobMeta>;
}

export async function loadLegal(slug: "privacy" | "terms") {
  return (await import(`@/content/legal/${slug}.mdx`)) as MdxModule<import("@/components/sections/legal-page").LegalMeta>;
}

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(slugsIn("blog").map(async (slug) => ({ slug, ...(await loadPost(slug)).meta })));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** All jobs, in their `order`. */
export async function getJobs(): Promise<Job[]> {
  const jobs = await Promise.all(slugsIn("careers").map(async (slug) => ({ slug, ...(await loadJob(slug)).meta })));
  return jobs.sort((a, b) => a.order - b.order);
}

export function getPostSlugs() {
  return slugsIn("blog");
}

export function getJobSlugs() {
  return slugsIn("careers");
}

/** Heading ids for the "On this page" list. */
export function headingsFromMdx(source: string) {
  return [...source.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

export function readSource(folder: "blog" | "careers" | "legal", slug: string) {
  return fs.readFileSync(path.join(ROOT, folder, `${slug}.mdx`), "utf8");
}
