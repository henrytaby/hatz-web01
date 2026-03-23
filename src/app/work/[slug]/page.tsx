import { notFound } from "next/navigation";
import { getItemBySlug, getSlugs } from "@/lib/mdx";
import { CustomMDX } from "@/components/mdx";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getSlugs("work");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getItemBySlug("work", resolvedParams.slug);
  
  if (!project) return { title: 'No encontrado' };
  return {
    title: `${project.frontmatter.title} | Work`,
    description: project.frontmatter.summary,
  };
}

export default async function WorkProject({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getItemBySlug("work", resolvedParams.slug);

  if (!project) notFound();

  return (
    <div className="max-w-3xl w-full mx-auto">
      <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver al Portafolio
      </Link>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          {project.frontmatter.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          {project.frontmatter.summary}
        </p>

        {/* Action Links */}
        <div className="flex gap-4 items-center mb-8">
          {project.frontmatter.githubUrl && (
            <a href={project.frontmatter.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 py-2 border border-border bg-background text-foreground hover:bg-muted transition-colors gap-2">
              <Github className="w-4 h-4" /> Repositorio
            </a>
          )}
          {project.frontmatter.liveUrl && (
            <a href={project.frontmatter.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2">
              <ExternalLink className="w-4 h-4" /> Proyecto en vivo
            </a>
          )}
        </div>

        {/* Core meta details */}
        <div className="flex flex-col md:flex-row gap-8 border-y border-border py-6 mb-8 text-sm">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">Tecnologías Base</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.frontmatter.tags?.map((tag: string) => (
                <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">Fecha</span>
            <time dateTime={project.frontmatter.date} className="text-muted-foreground mt-2 inline-block">
              {project.frontmatter.date}
            </time>
          </div>
        </div>
      </div>
      
      {/* Standardized MDX Content (Problem, Solution...) */}
      <CustomMDX source={project.content} />
    </div>
  );
}
