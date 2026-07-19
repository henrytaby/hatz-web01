import type { BlogCategory, WorkCategory } from "@/entities";

// Base frontmatter for all content types
export interface BaseFrontmatter {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  category?: string;
}

// Blog-specific frontmatter
export interface BlogFrontmatter extends BaseFrontmatter {
  category?: BlogCategory;
  author?: string;
  readingTime?: number;
}

// Work/Project-specific frontmatter
export interface WorkFrontmatter extends BaseFrontmatter {
  category?: WorkCategory;
  githubUrl?: string;
  liveUrl?: string;
  client?: string;
  duration?: string;
}

// Content item with slug and content
export interface ContentItem<T extends BaseFrontmatter = BaseFrontmatter> {
  slug: string;
  frontmatter: T;
  content: string;
}

// Filter and pagination types
export interface ContentFilter {
  category?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
