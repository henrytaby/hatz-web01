import Link from "next/link";
import { getAllItems } from "@/lib/mdx";
import { ExternalLink, Github, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Work",
  description: "Portafolio y Casos de Estudio de Henry Taby.",
};

export default function WorkPage() {
  const projects = getAllItems("work");

  return (
    <div className="max-w-4xl flex flex-col items-start w-full relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none -z-10" />
      
      <div className="flex flex-col gap-4 mt-8 mb-16 max-w-2xl">
        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Work & <br /> Casos de Estudio
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Una cuidadosa selección de herramientas, plataformas y bibliotecas que he diseñado y construido, mostrando la arquitectura detrás.
        </p>
      </div>
      
      <div className="flex flex-col gap-10 w-full mb-16">
        {projects.map((project, index) => (
          <div key={project.slug} className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-12 rounded-[2rem] border border-border bg-card/40 backdrop-blur-xl hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-primary/5">
            
            <div className="flex-1 flex flex-col">
              {project.frontmatter.tags && (
                <div className="flex gap-2 mb-4">
                  {project.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <Link href={`/work/${project.slug}`} className="flex flex-col flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {project.frontmatter.title}
                </h2>
                <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
                  {project.frontmatter.summary}
                </p>
              </Link>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-border/50 pt-6 mt-8">
                <Link href={`/work/${project.slug}`} className="text-foreground font-bold hover:text-primary transition-colors inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Caso de Estudio Completo
                </Link>
                
                <div className="flex items-center gap-4 text-muted-foreground">
                  {project.frontmatter.githubUrl && (
                    <a href={project.frontmatter.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-sm font-medium" title="Código">
                      <Github className="w-4 h-4" /> Repo
                    </a>
                  )}
                  {project.frontmatter.liveUrl && (
                    <a href={project.frontmatter.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-sm font-medium" title="En Vivo">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
        {projects.length === 0 && <p className="text-muted-foreground">Agrega archivos MDX a la carpeta `/content/work`.</p>}
      </div>
    </div>
  );
}
