import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ProjectEntity, WorkCategory } from "@/entities";

const contentDirectory = path.join(process.cwd(), "content", "work");

export function getWorkProjects(): ProjectEntity[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const projects = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      return getWorkProjectBySlug(slug);
    })
    .filter((project): project is ProjectEntity => project !== null)
    .sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

  return projects;
}

export function getWorkProjectBySlug(slug: string): ProjectEntity | null {
  try {
    const fullPathMDX = path.join(contentDirectory, `${slug}.mdx`);
    const fullPathMD = path.join(contentDirectory, `${slug}.md`);

    let fullPath = fullPathMDX;
    if (!fs.existsSync(fullPathMDX)) {
      if (fs.existsSync(fullPathMD)) {
        fullPath = fullPathMD;
      } else {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      date: data.date || new Date().toISOString(),
      summary: data.summary,
      tags: data.tags || [],
      published: data.published ?? true,
      featured: data.featured,
      category: data.category as WorkCategory,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      client: data.client,
      duration: data.duration,
      content,
    };
  } catch (error) {
    console.error(`Error reading work/${slug}:`, error);
    return null;
  }
}

export function getWorkSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getRelatedWorkProjects(slug: string, limit = 3): ProjectEntity[] {
  const current = getWorkProjectBySlug(slug);
  if (!current) return [];

  return getWorkProjects()
    .filter((project) => project.slug !== slug)
    .filter((project) =>
      project.tags?.some((tag) => current.tags?.includes(tag))
    )
    .slice(0, limit);
}

export function getWorkCategories(): string[] {
  const projects = getWorkProjects();
  const categories = new Set(
    projects.map((project) => project.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

export function getWorkTags(): string[] {
  const projects = getWorkProjects();
  const allTags = projects.flatMap((project) => project.tags || []);
  return [...new Set(allTags)];
}
