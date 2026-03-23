import Link from "next/link";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import type { ProjectEntity } from "@/entities";
import { Badge } from "@/shared/ui";

interface WorkCardProps {
    project: ProjectEntity;
}

export function WorkCard({ project }: WorkCardProps) {
    return (
        <div className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-12 rounded-4xl border border-border bg-card/40 backdrop-blur-xl hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-primary/5">
            <div className="flex-1 flex flex-col">
                {project.tags && (
                    <div className="flex gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="default">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                <Link href={`/work/${project.slug}`} className="flex flex-col flex-1">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
                        {project.summary}
                    </p>
                </Link>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-border/50 pt-6 mt-8">
                    <Link
                        href={`/work/${project.slug}`}
                        className="text-foreground font-bold hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                        <BookOpen className="w-4 h-4" /> Caso de Estudio Completo
                    </Link>

                    <div className="flex items-center gap-4 text-muted-foreground">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                                title="Código"
                            >
                                <Github className="w-4 h-4" /> Repo
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                                title="En Vivo"
                            >
                                <ExternalLink className="w-4 h-4" /> Live
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
