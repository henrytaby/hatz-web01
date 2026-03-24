import Link from "next/link";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import type { ProjectEntity } from "@/entities";
import { Badge } from "@/shared/ui";

interface WorkCardProps {
    project: ProjectEntity;
}

export function WorkCard({ project }: WorkCardProps) {
    return (
        <article
            className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-12 rounded-4xl border border-border bg-card/40 backdrop-blur-xl hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
            aria-labelledby={`work-title-${project.slug}`}
        >
            <div className="flex-1 flex flex-col">
                {project.tags && project.tags.length > 0 && (
                    <div
                        className="flex gap-2 mb-4"
                        role="list"
                        aria-label="Tecnologías utilizadas"
                    >
                        {project.tags.map((tag) => (
                            <span key={tag} role="listitem">
                                <Badge variant="default">{tag}</Badge>
                            </span>
                        ))}
                    </div>
                )}

                <Link
                    href={`/work/${project.slug}`}
                    className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                    aria-describedby={`work-summary-${project.slug}`}
                >
                    <h2
                        id={`work-title-${project.slug}`}
                        className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors"
                    >
                        {project.title}
                    </h2>
                    <p
                        id={`work-summary-${project.slug}`}
                        className="text-muted-foreground text-lg mt-4 leading-relaxed"
                    >
                        {project.summary}
                    </p>
                </Link>

                <div
                    className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-border/50 pt-6 mt-8"
                    role="navigation"
                    aria-label="Enlaces del proyecto"
                >
                    <Link
                        href={`/work/${project.slug}`}
                        className="text-foreground font-bold hover:text-primary transition-colors inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    >
                        <BookOpen className="w-4 h-4" aria-hidden="true" />
                        <span>Caso de Estudio Completo</span>
                    </Link>

                    <div className="flex items-center gap-4 text-muted-foreground">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                                aria-label={`Ver código fuente de ${project.title} en GitHub (se abre en nueva pestaña)`}
                            >
                                <Github className="w-4 h-4" aria-hidden="true" />
                                <span>Repo</span>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                                aria-label={`Ver demo en vivo de ${project.title} (se abre en nueva pestaña)`}
                            >
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                <span>Live</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
