import Link from "next/link";
import { ArrowRight, Terminal, Cpu } from "lucide-react";
import type { ProjectEntity } from "@/entities";

interface HomeFeaturedWorkProps {
  recentWork: ProjectEntity[];
}

export function HomeFeaturedWork({ recentWork }: HomeFeaturedWorkProps) {
  return (
    <section className="flex flex-col gap-10 w-full relative z-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" /> Casos de Estudio
        </h2>
        <p className="text-muted-foreground">
          Una mirada profunda a mis mejores trabajos técnicos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {recentWork.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative flex flex-col p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-xl hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
          >
            {/* Background icon */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
              <Terminal className="w-24 h-24" />
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-2">
                  <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {project.tags[0] || "Architecture"}
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
                {project.summary}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between text-sm font-medium text-foreground relative z-10">
              <span>Leer caso completo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}

        {recentWork.length === 0 && (
          <div className="p-8 rounded-3xl border border-dashed border-border flex items-center justify-center text-muted-foreground h-48 col-span-2">
            Pronto habrá estudios técnicos disponibles.
          </div>
        )}
      </div>

      <div className="w-full flex justify-center md:justify-end">
        <Link
          href="/work"
          className="text-sm font-bold text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors group"
        >
          Ver el portafolio entero{" "}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
