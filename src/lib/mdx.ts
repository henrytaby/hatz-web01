import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  BaseFrontmatter,
  BlogFrontmatter,
  WorkFrontmatter,
  ContentItem,
  ContentFilter,
  PaginationOptions,
  PaginatedResult,
} from "@/types";

const contentDirectory = path.join(process.cwd(), "content");

// ============================================
// Core Functions
// ============================================

/**
 * Get all slugs for a given content type
 */
export function getSlugs(dir: "blog" | "work"): string[] {
  const dirPath = path.join(contentDirectory, dir);
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Parse a single file and return its frontmatter and raw content
 */
export function getItemBySlug<T extends BaseFrontmatter>(
  dir: "blog" | "work",
  slug: string
): ContentItem<T> | null {
  try {
    const fullPathMDX = path.join(contentDirectory, dir, `${slug}.mdx`);
    const fullPathMD = path.join(contentDirectory, dir, `${slug}.md`);

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
      frontmatter: data as T,
      content,
    };
  } catch (error) {
    console.error(`Error reading ${dir}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all parsed items for a content type, sorted by latest date
 */
export function getAllItems<T extends BaseFrontmatter>(
  dir: "blog" | "work"
): ContentItem<T>[] {
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

// ============================================
// Blog-specific Functions
// ============================================

/**
 * Get all blog posts with optional filtering
 */
export function getBlogPosts(filters?: ContentFilter): ContentItem<BlogFrontmatter>[] {
  const items = getAllItems<BlogFrontmatter>("blog");
  return applyFilters(items, filters);
}

/**
 * Get paginated blog posts
 */
export function getBlogPostsPaginated(
  options: PaginationOptions,
  filters?: ContentFilter
): PaginatedResult<ContentItem<BlogFrontmatter>> {
  const allItems = getBlogPosts(filters);
  return paginate(allItems, options);
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): ContentItem<BlogFrontmatter> | null {
  return getItemBySlug<BlogFrontmatter>("blog", slug);
}

/**
 * Get related blog posts by tags
 */
export function getRelatedBlogPosts(
  slug: string,
  limit = 3
): ContentItem<BlogFrontmatter>[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];

  return getBlogPosts({ published: true })
    .filter((item) => item.slug !== slug)
    .filter((item) =>
      item.frontmatter.tags?.some((tag) =>
        current.frontmatter.tags?.includes(tag)
      )
    )
    .slice(0, limit);
}

/**
 * Get all unique blog categories
 */
export function getBlogCategories(): string[] {
  const items = getAllItems<BlogFrontmatter>("blog");
  const categories = new Set(
    items.map((item) => item.frontmatter.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

/**
 * Get all unique blog tags
 */
export function getBlogTags(): string[] {
  const items = getAllItems<BlogFrontmatter>("blog");
  const allTags = items.flatMap((item) => item.frontmatter.tags || []);
  return [...new Set(allTags)];
}

// ============================================
// Work-specific Functions
// ============================================

/**
 * Get all work projects with optional filtering
 */
export function getWorkProjects(filters?: ContentFilter): ContentItem<WorkFrontmatter>[] {
  const items = getAllItems<WorkFrontmatter>("work");
  return applyFilters(items, filters);
}

/**
 * Get paginated work projects
 */
export function getWorkProjectsPaginated(
  options: PaginationOptions,
  filters?: ContentFilter
): PaginatedResult<ContentItem<WorkFrontmatter>> {
  const allItems = getWorkProjects(filters);
  return paginate(allItems, options);
}

/**
 * Get work project by slug
 */
export function getWorkProjectBySlug(slug: string): ContentItem<WorkFrontmatter> | null {
  return getItemBySlug<WorkFrontmatter>("work", slug);
}

/**
 * Get related work projects by tags
 */
export function getRelatedWorkProjects(
  slug: string,
  limit = 3
): ContentItem<WorkFrontmatter>[] {
  const current = getWorkProjectBySlug(slug);
  if (!current) return [];

  return getWorkProjects({ published: true })
    .filter((item) => item.slug !== slug)
    .filter((item) =>
      item.frontmatter.tags?.some((tag) =>
        current.frontmatter.tags?.includes(tag)
      )
    )
    .slice(0, limit);
}

/**
 * Get all unique work categories
 */
export function getWorkCategories(): string[] {
  const items = getAllItems<WorkFrontmatter>("work");
  const categories = new Set(
    items.map((item) => item.frontmatter.category).filter(Boolean)
  );
  return Array.from(categories) as string[];
}

/**
 * Get all unique work tags
 */
export function getWorkTags(): string[] {
  const items = getAllItems<WorkFrontmatter>("work");
  const allTags = items.flatMap((item) => item.frontmatter.tags || []);
  return [...new Set(allTags)];
}

// ============================================
// Helper Functions
// ============================================

/**
 * Apply filters to content items
 */
function applyFilters<T extends BaseFrontmatter>(
  items: ContentItem<T>[],
  filters?: ContentFilter
): ContentItem<T>[] {
  if (!filters) return items;

  return items.filter((item) => {
    const fm = item.frontmatter;

    // Filter by category
    if (filters.category && fm.category !== filters.category) {
      return false;
    }

    // Filter by published status
    if (filters.published !== undefined && fm.published !== filters.published) {
      return false;
    }

    // Filter by featured status
    if (filters.featured !== undefined && fm.featured !== filters.featured) {
      return false;
    }

    // Filter by tags (any match)
    if (filters.tags?.length) {
      const hasTag = filters.tags.some((tag) => fm.tags?.includes(tag));
      if (!hasTag) return false;
    }

    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = fm.title.toLowerCase().includes(searchLower);
      const matchesSummary = fm.summary?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesSummary) return false;
    }

    return true;
  });
}

/**
 * Paginate content items
 */
function paginate<T>(
  items: T[],
  options: PaginationOptions
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / options.limit);
  const offset = (options.page - 1) * options.limit;
  const paginatedItems = items.slice(offset, offset + options.limit);

  return {
    items: paginatedItems,
    total,
    page: options.page,
    limit: options.limit,
    totalPages,
    hasNext: options.page < totalPages,
    hasPrev: options.page > 1,
  };
}
