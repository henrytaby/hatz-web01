import { Badge } from "@/shared/ui";
import { ExternalLink, Github } from "lucide-react";
import type { ProjectEntity } from "@/entities";

export function WorkProjectHeader({ project }: { project: ProjectEntity }) {
  return (
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
  );
}
