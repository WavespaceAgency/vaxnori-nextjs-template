import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title?: string;
  description?: string;
  /** Path of the page, e.g. "/pricing". Used for the canonical URL. */
  path: string;
  type?: "website" | "article";
  /** Share image URL (defaults to the site image). */
  image?: string;
};

/** Build per-page metadata (title, description, canonical, Open Graph, Twitter). */
/** Default share image (src/app/opengraph-image.tsx). Blog posts use their own generated image. */
const defaultTitle = `${siteConfig.name} – From idea to launch, handled for you`;

const defaultImage = { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name };

export function createMetadata({ title, description, path, type = "website", image }: PageMetadataInput): Metadata {
  const pageDescription = description ?? siteConfig.description;
  const shareImage = image ? { ...defaultImage, url: image, alt: title ?? siteConfig.name } : defaultImage;
  return {
    // Leave the title out when not given, so the default from src/app/layout.tsx is used.
    ...(title ? { title } : {}),
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: title ?? defaultTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? defaultTitle,
      description: pageDescription,
      images: [shareImage.url],
    },
  };
}
