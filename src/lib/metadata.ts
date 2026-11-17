import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title?: string;
  description?: string;
  /** Path of the page, e.g. "/pricing". Used for the canonical URL. */
  path: string;
  type?: "website" | "article";
};

/** Build per-page metadata (title, description, canonical, Open Graph, Twitter). */
export function createMetadata({ title, description, path, type = "website" }: PageMetadataInput): Metadata {
  const pageDescription = description ?? siteConfig.description;
  return {
    title,
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: title ?? siteConfig.name,
      description: pageDescription,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description: pageDescription,
    },
  };
}
