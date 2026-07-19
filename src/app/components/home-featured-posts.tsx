import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import type { BlogPostEntity } from "@/entities";

interface HomeFeaturedPostsProps {
  recentPosts: BlogPostEntity[];
}

export function HomeFeaturedPosts({ recentPosts }: HomeFeaturedPostsProps) {
  return (
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
            className={`group flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 hover:bg-muted/50 transition-colors gap-4 ${
              index !== recentPosts.length - 1 ? "border-b border-border" : ""
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
  );
}
