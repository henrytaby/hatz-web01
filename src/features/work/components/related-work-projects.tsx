import Link from "next/link";
import type { ProjectEntity } from "@/entities";

export function RelatedWorkProjects({ projects }: { projects: Pick<ProjectEntity, "slug" | "title" | "summary">[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Proyectos Relacionados</h2>
      <div className="flex flex-col gap-4">
        {projects.map((relatedProject) => (
          <Link
            key={relatedProject.slug}
            href={`/work/${relatedProject.slug}`}
            className="group p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {relatedProject.title}
            </h3>
            {relatedProject.summary && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {relatedProject.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
