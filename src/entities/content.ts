// Base content entity - all content types extend this
export interface ContentEntity {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  published: boolean;
  featured?: boolean;
}

// Blog post entity with specific behavior
export interface BlogPostEntity extends ContentEntity {
  category?: BlogCategory;
  author?: string;
  readingTime?: number;
  content: string;
}

// Project entity with specific behavior
export interface ProjectEntity extends ContentEntity {
  category?: WorkCategory;
  githubUrl?: string;
  liveUrl?: string;
  client?: string;
  duration?: string;
  content: string;
}

// Category types
export type BlogCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "architecture"
  | "photography"
  | "personal";

export type WorkCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "consulting";

// Content repository interface (contract)
export interface IContentRepository<T extends ContentEntity> {
  getAll(): T[];
  getBySlug(slug: string): T | null;
  getRelated(slug: string, limit?: number): T[];
  getCategories(): string[];
  getTags(): string[];
}

// Factory function to create a blog post with behavior
export function createBlogPost(data: Partial<BlogPostEntity>): BlogPostEntity {
  return {
    slug: data.slug || "",
    title: data.title || "",
    date: data.date || new Date().toISOString(),
    summary: data.summary,
    tags: data.tags || [],
    published: data.published ?? true,
    featured: data.featured,
    category: data.category,
    author: data.author,
    readingTime: data.readingTime,
    content: data.content || "",
  };
}

// Factory function to create a project with behavior
export function createProject(data: Partial<ProjectEntity>): ProjectEntity {
  return {
    slug: data.slug || "",
    title: data.title || "",
    date: data.date || new Date().toISOString(),
    summary: data.summary,
    tags: data.tags || [],
    published: data.published ?? true,
    featured: data.featured,
    category: data.category,
    githubUrl: data.githubUrl,
    liveUrl: data.liveUrl,
    client: data.client,
    duration: data.duration,
    content: data.content || "",
  };
}
