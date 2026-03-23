import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type BaseFrontmatter = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  [key: string]: any;
};

export type ContentItem<T extends BaseFrontmatter = BaseFrontmatter> = {
  slug: string;
  frontmatter: T;
  content: string;
};

/**
 * Get all slugs for a given content type (e.g., "blog" or "projects")
 */
export function getSlugs(dir: string): string[] {
  const dirPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Parse a single file and return its frontmatter and raw content
 */
export function getItemBySlug<T extends BaseFrontmatter = BaseFrontmatter>(
  dir: string,
  slug: string
): ContentItem<T> | null {
  try {
    const fullPathMDX = path.join(contentDirectory, dir, `${slug}.mdx`);
    const fullPathMD = path.join(contentDirectory, dir, `${slug}.md`);
    
    let fullPath = fullPathMDX;
    if (!fs.existsSync(fullPathMDX)) {
      if (fs.existsSync(fullPathMD)) fullPath = fullPathMD;
      else return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as T,
      content,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get all parsed items for a content type, sorted by latest date
 */
export function getAllItems<T extends BaseFrontmatter = BaseFrontmatter>(dir: string): ContentItem<T>[] {
  const slugs = getSlugs(dir);
  const items = slugs
    .map((slug) => getItemBySlug<T>(dir, slug))
    .filter((item): item is ContentItem<T> => item !== null)
    .sort((a, b) => {
      // Sort in descending order (newest first)
      if (a.frontmatter.date > b.frontmatter.date) return -1;
      if (a.frontmatter.date < b.frontmatter.date) return 1;
      return 0;
    });
  return items;
}
