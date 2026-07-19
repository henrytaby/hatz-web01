import { Badge } from "@/shared/ui";
import type { BlogPostEntity } from "@/entities";

export function BlogPostHeader({ post }: { post: BlogPostEntity }) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-muted-foreground text-sm">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {post.readingTime && (
          <span>· {post.readingTime} min de lectura</span>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </header>
  );
}
