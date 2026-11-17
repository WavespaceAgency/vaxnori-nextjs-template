import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Blog posts and job posts are .mdx files in src/content
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // 75 = default for photos; 90 = crisp UI screenshots (blog cards, articles)
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
