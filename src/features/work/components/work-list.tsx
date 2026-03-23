import type { ProjectEntity } from "@/entities";
import { WorkCard } from "./work-card";

interface WorkListProps {
    projects: ProjectEntity[];
    emptyMessage?: string;
}

export function WorkList({ projects, emptyMessage = "Agrega archivos MDX a la carpeta `/content/work`." }: WorkListProps) {
    if (projects.length === 0) {
        return <p className="text-muted-foreground">{emptyMessage}</p>;
    }

    return (
        <div className="flex flex-col gap-10 w-full mb-16">
            {projects.map((project) => (
                <WorkCard key={project.slug} project={project} />
            ))}
        </div>
    );
}
