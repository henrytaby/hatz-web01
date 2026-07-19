import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostEntity, BlogCategory } from "@/entities";

const contentDirectory = path.join(process.cwd(), "content", "blog");

/**
 * Retrieves all blog posts from the file system.
 * 
 * Scans the content/blog directory for .md and .mdx files, parses their frontmatter,
 * and returns an array of blog post entities sorted by date (newest first).
 * 
 * @returns {BlogPostEntity[]} An array of all blog posts sorted by date descending.
 */
export function getBlogPosts(): BlogPostEntity[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      return getBlogPostBySlug(slug);
    })
    .filter((post): post is BlogPostEntity => post !== null)
    .sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

  return posts;
}

/**
 * Retrieves a specific blog post by its slug.
 * 
 * Reads the corresponding markdown file, parses the frontmatter and content,
 * and constructs a BlogPostEntity.
 * 
 * @param {string} slug - The unique identifier of the blog post (filename without extension).
 * @returns {BlogPostEntity | null} The blog post entity, or null if the file does not exist.
 */
export function getBlogPostBySlug(slug: string): BlogPostEntity | null {
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
      category: data.category as BlogCategory,
      author: data.author,
      readingTime: data.readingTime,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog/${slug}:`, error);
    return null;
  }
}

/**
 * Retrieves an array of all blog post slugs.
 * 
 * Useful for statically generating routes for all blog posts (SSG).
 * 
 * @returns {string[]} An array of blog post slugs.
 */
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Retrieves related blog posts based on shared tags.
 * 
 * Compares the tags of the specified post with all other posts and returns
 * those that have at least one tag in common.
 * 
 * @param {string} slug - The slug of the current blog post to find relatives for.
 * @param {number} limit - The maximum number of related posts to return (default is 3).
 * @returns {BlogPostEntity[]} An array of related blog posts.
 */
export function getRelatedBlogPosts(slug: string, limit = 3): BlogPostEntity[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];

  return getBlogPosts()
    .filter((post) => post.slug !== slug)
    .filter((post) =>
      post.tags?.some((tag) => current.tags?.includes(tag))
    )
    .slice(0, limit);
}

/**
 * Retrieves all unique categories used across all blog posts.
 * 
 * @returns {string[]} An array of unique category strings.
 */
export function getBlogCategories(): string[] {
  const posts = getBlogPosts();
  const categories = new Set(
    posts.map((post) => post.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

/**
 * Retrieves all unique tags used across all blog posts.
 * 
 * @returns {string[]} An array of unique tag strings.
 */
export function getBlogTags(): string[] {
  const posts = getBlogPosts();
  const allTags = posts.flatMap((post) => post.tags || []);
  return [...new Set(allTags)];
}
