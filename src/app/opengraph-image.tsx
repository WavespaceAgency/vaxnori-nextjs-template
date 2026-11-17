import { siteConfig } from "@/config/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${siteConfig.name} – From idea to launch, handled for you`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "AI that runs your launch", title: "From idea to launch, handled for you", subtitle: siteConfig.description });
}
