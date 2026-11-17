/** Blog page text. Posts themselves live in src/content/blog/*.mdx. */
export const blogPage = {
  meta: {
    title: "Blog",
    description: "What we learn running companies on autopilot: approvals, launch playbooks, engineering and founder stories.",
  },
  hero: {
    eyebrow: "Blog",
    title: "What we learn",
    accent: "running companies on autopilot.",
  },
  featuredCta: "Read the piece",
  list: {
    eyebrow: "Product",
    title: "From one sentence to a",
    accent: "running company.",
    allLabel: "All",
    /** Tabs shown above the list (posts are filtered by their `category`). */
    categories: ["Approvals", "Launch playbooks", "Engineering", "Founder stories", "Changelog"],
    readMore: "Read more",
    loadMore: "Load older posts",
    empty: "No posts in this category yet.",
    pageSize: 6,
  },
  post: {
    breadcrumb: "Blog",
    onThisPage: "On this page",
    keepReading: "Keep reading",
    allPosts: "All posts",
    share: "Share",
  },
} as const;
