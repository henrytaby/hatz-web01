import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostEntity, IContentRepository } from "@/entities";
import { createBlogPost } from "@/entities";

const contentDirectory = path.join(process.cwd(), "content", "blog");

class LocalBlogRepository implements IContentRepository<BlogPostEntity> {
  getAll(): BlogPostEntity[] {
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => this.getBySlug(file.replace(/\.mdx?$/, "")))
      .filter((post): post is BlogPostEntity => post !== null)
      .sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
  }

  getBySlug(slug: string): BlogPostEntity | null {
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

      // Usamos el Factory de la entidad para garantizar la integridad
      return createBlogPost({
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        tags: data.tags,
        published: data.published,
        featured: data.featured,
        category: data.category,
        author: data.author,
        readingTime: data.readingTime,
        content,
      });
    } catch (error) {
      console.error(`Error reading blog/${slug}:`, error);
      return null;
    }
  }

  getRelated(slug: string, limit = 3): BlogPostEntity[] {
    const current = this.getBySlug(slug);
    if (!current) return [];

    return this.getAll()
      .filter((post) => post.slug !== slug)
      .filter((post) => post.tags?.some((tag) => current.tags?.includes(tag)))
      .slice(0, limit);
  }

  getCategories(): string[] {
    const categories = new Set(this.getAll().map((post) => post.category).filter(Boolean));
    return Array.from(categories) as string[];
  }

  getTags(): string[] {
    const allTags = this.getAll().flatMap((post) => post.tags || []);
    return [...new Set(allTags)];
  }
}

// ============================================================================
// DEPENDENCIA INVERTIDA (DIP)
// El resto de la app interactúa con la interfaz IContentRepository, 
// sin importar si los datos vienen del sistema de archivos, BD o API.
// ============================================================================
export const blogRepository: IContentRepository<BlogPostEntity> = new LocalBlogRepository();

// ============================================================================
// FACHADA DE RETROCOMPATIBILIDAD
// ============================================================================
export function getBlogPosts(): BlogPostEntity[] {
  return blogRepository.getAll();
}

export function getBlogPostBySlug(slug: string): BlogPostEntity | null {
  return blogRepository.getBySlug(slug);
}

export function getBlogSlugs(): string[] {
  return blogRepository.getAll().map(post => post.slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPostEntity[] {
  return blogRepository.getRelated(slug, limit);
}

export function getBlogCategories(): string[] {
  return blogRepository.getCategories();
}

export function getBlogTags(): string[] {
  return blogRepository.getTags();
}
