import Link from "next/link";
import { ArrowRight, Code2, Terminal, Cpu } from "lucide-react";
import { getBlogPosts } from "@/features/blog";
import { getWorkProjects } from "@/features/work";

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3);
  const recentWork = getWorkProjects().slice(0, 2);

  return (
    <div className="flex flex-col gap-24 pb-20 w-full relative">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-8 mt-16 md:mt-24 w-full relative">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border text-sm font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Disponible para nuevos retos
        </div>

        {/* Main headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter max-w-4xl text-foreground !leading-[1.05] drop-shadow-sm">
          Ingeniería Web <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-700 dark:from-neutral-200 dark:to-neutral-500 inline-block">
            Elevada a Arte.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mt-2 font-light">
          Soy Henry Taby. Construyo arquitecturas escalables, interfaces veloces
          y experiencias digitales{" "}
          <strong className="font-semibold text-foreground">premium</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
          <Link
            href="/work"
            className="group flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl text-sm font-bold h-12 px-8 bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-foreground/10"
          >
            Ver Proyectos{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="flex flex-1 sm:flex-none items-center justify-center rounded-xl text-sm font-bold h-12 px-8 border border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted transition-colors active:scale-95"
          >
            Hablemos
          </Link>
        </div>
      </section>

      {/* Featured Work Section */}
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
                {project.tags && (
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

      {/* Featured Posts Section */}
      <section className="flex flex-col gap-10 w-full relative z-10">
        <div className="flex flex-col gap-2 border-t border-border/50 pt-16">
          <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" /> Transmitiendo Conocimiento
          </h2>
          <p className="text-muted-foreground">
            Artículos sobre patrones, Jamstack y escalabilidad.
          </p>
        </div>

        <div className="flex flex-col w-full h-full border border-border rounded-3xl overflow-hidden bg-card/20 backdrop-blur-lg">
          {recentPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 hover:bg-muted/50 transition-colors gap-4 ${index !== recentPosts.length - 1 ? "border-b border-border" : ""
                }`}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.summary && (
                  <p className="text-muted-foreground text-sm line-clamp-1 max-w-xl">
                    {post.summary}
                  </p>
                )}
              </div>
              <time
                dateTime={post.date}
                className="text-sm font-mono text-muted-foreground shrink-0 whitespace-nowrap"
              >
                {post.date}
              </time>
            </Link>
          ))}

          {recentPosts.length === 0 && (
            <div className="p-8 flex items-center justify-center text-muted-foreground h-32">
              Pronto habrá publicaciones en el blog.
            </div>
          )}
        </div>

        <div className="w-full flex justify-center md:justify-end">
          <Link
            href="/blog"
            className="text-sm font-bold text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors group"
          >
            Leer todos los artículos{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
