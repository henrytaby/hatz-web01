import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ProjectEntity, IContentRepository } from "@/entities";
import { createProject } from "@/entities";

const contentDirectory = path.join(process.cwd(), "content", "work");

class LocalWorkRepository implements IContentRepository<ProjectEntity> {
  getAll(): ProjectEntity[] {
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => this.getBySlug(file.replace(/\.mdx?$/, "")))
      .filter((project): project is ProjectEntity => project !== null)
      .sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
  }

  getBySlug(slug: string): ProjectEntity | null {
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
      return createProject({
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        tags: data.tags,
        published: data.published,
        featured: data.featured,
        category: data.category,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        client: data.client,
        duration: data.duration,
        content,
      });
    } catch (error) {
      console.error(`Error reading work/${slug}:`, error);
      return null;
    }
  }

  getRelated(slug: string, limit = 3): ProjectEntity[] {
    const current = this.getBySlug(slug);
    if (!current) return [];

    return this.getAll()
      .filter((project) => project.slug !== slug)
      .filter((project) => project.tags?.some((tag) => current.tags?.includes(tag)))
      .slice(0, limit);
  }

  getCategories(): string[] {
    const categories = new Set(this.getAll().map((project) => project.category).filter(Boolean));
    return Array.from(categories) as string[];
  }

  getTags(): string[] {
    const allTags = this.getAll().flatMap((project) => project.tags || []);
    return [...new Set(allTags)];
  }
}

// ============================================================================
// DEPENDENCIA INVERTIDA (DIP)
// ============================================================================
export const workRepository: IContentRepository<ProjectEntity> = new LocalWorkRepository();

// ============================================================================
// FACHADA DE RETROCOMPATIBILIDAD
// ============================================================================
export function getWorkProjects(): ProjectEntity[] {
  return workRepository.getAll();
}

export function getWorkProjectBySlug(slug: string): ProjectEntity | null {
  return workRepository.getBySlug(slug);
}

export function getWorkSlugs(): string[] {
  return workRepository.getAll().map(project => project.slug);
}

export function getRelatedWorkProjects(slug: string, limit = 3): ProjectEntity[] {
  return workRepository.getRelated(slug, limit);
}

export function getWorkCategories(): string[] {
  return workRepository.getCategories();
}

export function getWorkTags(): string[] {
  return workRepository.getTags();
}
