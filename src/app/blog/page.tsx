import Link from "next/link";
import { getAllItems } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Artículos técnicos sobre desarrollo de software, Jamstack y arquitectura.",
};

export default function BlogPage() {
  const posts = getAllItems("blog");

  return (
    <div className="max-w-3xl flex flex-col items-start w-full relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none -z-10" />

      <div className="flex flex-col gap-4 mt-8 mb-16 max-w-2xl">
        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Blog Técnico
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Pensamientos, tutoriales y apuntes sobre ingeniería de software, enfocados en ecosistemas de alto rendimiento.
        </p>
      </div>
      
      <div className="w-full flex-col flex gap-0">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 py-10 border-t border-border/50 hover:bg-muted/30 transition-colors -mx-6 px-6 rounded-2xl"
          >
            <div className="w-full flex flex-col md:flex-row justify-between md:items-baseline gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {post.frontmatter.title}
              </h2>
              <time
                dateTime={post.frontmatter.date}
                className="text-sm font-mono whitespace-nowrap text-muted-foreground shrink-0"
              >
                {post.frontmatter.date}
              </time>
            </div>
            
            {post.frontmatter.summary && (
              <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                {post.frontmatter.summary}
              </p>
            )}

            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {post.frontmatter.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-md bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground">Pronto habrá publicaciones...</p>}
      </div>
    </div>
  );
}
