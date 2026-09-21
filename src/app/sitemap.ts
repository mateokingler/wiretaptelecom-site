import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { docArticles } from "@/content/docs";
import { siteUrl } from "@/lib/site";

/**
 * Marketing routes, which have no content date of their own. They all move
 * together when the site is rebuilt, so they share the build date.
 */
const pages: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/sip-trunking", priority: 0.9, changeFrequency: "monthly" },
  { path: "/phone-numbers", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sms-mms", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fax", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions/msps", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/business", priority: 0.8, changeFrequency: "monthly" },
  { path: "/talk-to-sales", priority: 0.8, changeFrequency: "yearly" },
  { path: "/docs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/status", priority: 0.3, changeFrequency: "daily" },
  { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date();

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path === "/" ? "" : path}`,
      lastModified: builtAt,
      changeFrequency,
      priority,
    })),
    ...docArticles.map((article) => ({
      url: `${siteUrl}/docs/${article.slug}`,
      lastModified: new Date(article.updated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
