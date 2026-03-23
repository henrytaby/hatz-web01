import { MetadataRoute } from "next";
import { getSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://henrytaby.com";

  // Static routes
  const routes = ["", "/about", "/blog", "/work", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Dynamic Blog posts
  const postSlugs = getSlugs("blog");
  const blogRoutes = postSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Dynamic Project posts (if they had individual pages later)
  const projectSlugs = getSlugs("work");
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes, ...projectRoutes];
}
