import { getPostSlugs, loadPost } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = await loadPost(slug);
  return ogImage({ eyebrow: meta.category, title: meta.title });
}
