import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostEntity, BlogCategory } from "@/entities";

const contentDirectory = path.join(process.cwd(), "content", "blog");

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

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

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

export function getBlogCategories(): string[] {
  const posts = getBlogPosts();
  const categories = new Set(
    posts.map((post) => post.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

export function getBlogTags(): string[] {
  const posts = getBlogPosts();
  const allTags = posts.flatMap((post) => post.tags || []);
  return [...new Set(allTags)];
}
