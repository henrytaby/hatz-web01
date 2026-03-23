import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { getWorkProjectBySlug, getWorkSlugs, getRelatedWorkProjects } from "@/features/work";
import { CustomMDX } from "@/components/mdx";
import { Badge } from "@/shared/ui";

export async function generateStaticParams() {
  const slugs = getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getWorkProjectBySlug(resolvedParams.slug);

  if (!project) return { title: "No encontrado" };

  return {
    title: `${project.title} | Work`,
    description: project.summary,
  };
}

export default async function WorkProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getWorkProjectBySlug(resolvedParams.slug);

  if (!project) notFound();

  const relatedProjects = getRelatedWorkProjects(resolvedParams.slug, 2);

  return (
    <div className="max-w-3xl w-full mx-auto">
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Portafolio
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          {project.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          {project.summary}
        </p>

        {/* Action Links */}
        <div className="flex gap-4 items-center mb-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 py-2 border border-border bg-background text-foreground hover:bg-muted transition-colors gap-2"
            >
              <Github className="w-4 h-4" /> Repositorio
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Proyecto en vivo
            </a>
          )}
        </div>

        {/* Core meta details */}
        <div className="flex flex-col md:flex-row gap-8 border-y border-border py-6 mb-8 text-sm">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">Tecnologías Base</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">Fecha</span>
            <time
              dateTime={project.date}
              className="text-muted-foreground mt-2 inline-block"
            >
              {project.date}
            </time>
          </div>
          {project.client && (
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-foreground">Cliente</span>
              <span className="text-muted-foreground mt-2">
                {project.client}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Project Content */}
      <CustomMDX source={project.content} />

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-6">Proyectos Relacionados</h2>
          <div className="flex flex-col gap-4">
            {relatedProjects.map((relatedProject) => (
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
      )}
    </div>
  );
}
