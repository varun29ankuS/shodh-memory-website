import { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/page";

// Real last-substantive-update dates. new Date() on every build tells
// crawlers everything changed daily, which muddies freshness signals.
// Bump the relevant date when a page meaningfully changes.
const STATIC_ROUTES: {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "", lastModified: "2026-06-10", changeFrequency: "weekly", priority: 1 },
  { path: "/docs", lastModified: "2026-04-10", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", lastModified: "2026-04-03", changeFrequency: "weekly", priority: 0.8 },
  { path: "/use-cases", lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/llm-free-memory", lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.9 },
  { path: "/research", lastModified: "2026-04-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/enterprise", lastModified: "2026-04-10", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare", lastModified: "2026-04-10", changeFrequency: "monthly", priority: 0.9 },
  { path: "/integrations", lastModified: "2026-04-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", lastModified: "2026-04-10", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", lastModified: "2026-01-15", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", lastModified: "2026-04-10", changeFrequency: "yearly", priority: 0.3 },
  { path: "/security", lastModified: "2026-04-10", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.shodh-memory.com";

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogPosts,
  ];
}
