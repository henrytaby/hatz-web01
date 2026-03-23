import { MetadataRoute } from "next";
import { getBlogSlugs, getWorkSlugs } from "@/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://henrytaby.com";

  // Static routes
  const routes = ["", "/about", "/blog", "/work", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Dynamic Blog posts
  const blogSlugs = getBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Dynamic Project posts
  const projectSlugs = getWorkSlugs();
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes, ...projectRoutes];
}
