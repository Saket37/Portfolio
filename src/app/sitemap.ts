import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slugAsParams}`,
    lastModified: post.date,
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    ...posts,
  ];
}
