import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ProjectEntity, WorkCategory } from "@/entities";

const contentDirectory = path.join(process.cwd(), "content", "work");

/**
 * Retrieves all work projects from the file system.
 * 
 * Scans the content/work directory for .md and .mdx files, parses their frontmatter,
 * and returns an array of project entities sorted by date (newest first).
 * 
 * @returns {ProjectEntity[]} An array of all work projects sorted by date descending.
 */
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

/**
 * Retrieves a specific work project by its slug.
 * 
 * Reads the corresponding markdown file, parses the frontmatter and content,
 * and constructs a ProjectEntity.
 * 
 * @param {string} slug - The unique identifier of the work project (filename without extension).
 * @returns {ProjectEntity | null} The project entity, or null if the file does not exist.
 */
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

/**
 * Retrieves an array of all work project slugs.
 * 
 * Useful for statically generating routes for all projects (SSG).
 * 
 * @returns {string[]} An array of project slugs.
 */
export function getWorkSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Retrieves related work projects based on shared tags.
 * 
 * Compares the tags of the specified project with all other projects and returns
 * those that have at least one tag in common.
 * 
 * @param {string} slug - The slug of the current project to find relatives for.
 * @param {number} limit - The maximum number of related projects to return (default is 3).
 * @returns {ProjectEntity[]} An array of related work projects.
 */
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

/**
 * Retrieves all unique categories used across all work projects.
 * 
 * @returns {string[]} An array of unique category strings.
 */
export function getWorkCategories(): string[] {
  const projects = getWorkProjects();
  const categories = new Set(
    projects.map((project) => project.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

/**
 * Retrieves all unique tags used across all work projects.
 * 
 * @returns {string[]} An array of unique tag strings.
 */
export function getWorkTags(): string[] {
  const projects = getWorkProjects();
  const allTags = projects.flatMap((project) => project.tags || []);
  return [...new Set(allTags)];
}
