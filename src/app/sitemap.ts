import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getJobs, getPosts } from "@/lib/content";

/** sitemap.xml – static pages + every blog post and job (added automatically). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const pages = ["", "/about", "/how-it-works", "/pricing", "/blog", "/careers", "/contact", "/faq", "/privacy", "/terms"];
  const [posts, jobs] = await Promise.all([getPosts(), getJobs()]);
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.8,
    })),
    ...posts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: post.date, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...jobs.map((job) => ({ url: `${base}/careers/${job.slug}`, lastModified: job.posted, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
