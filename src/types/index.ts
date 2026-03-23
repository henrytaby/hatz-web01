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

// Content item with slug and content
export interface ContentItem<T extends BaseFrontmatter = BaseFrontmatter> {
  slug: string;
  frontmatter: T;
  content: string;
}

// Navigation types
export interface NavItem {
  path: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
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
