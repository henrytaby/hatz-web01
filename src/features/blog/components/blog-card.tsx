import Link from "next/link";
import type { BlogPostEntity } from "@/entities";
import { Badge } from "@/shared/ui";

interface BlogCardProps {
    post: BlogPostEntity;
    showTags?: boolean;
}

export function BlogCard({ post, showTags = true }: BlogCardProps) {
    return (
        <article
            className="group py-10 border-t border-border/50 hover:bg-muted/30 transition-colors -mx-6 px-6 rounded-2xl"
            aria-labelledby={`blog-title-${post.slug}`}
        >
            <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
                aria-describedby={`blog-summary-${post.slug}`}
            >
                <div className="w-full flex flex-col md:flex-row justify-between md:items-baseline gap-2">
                    <h2
                        id={`blog-title-${post.slug}`}
                        className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors"
                    >
                        {post.title}
                    </h2>
                    <time
                        dateTime={post.date}
                        className="text-sm font-mono whitespace-nowrap text-muted-foreground shrink-0"
                    >
                        {post.date}
                    </time>
                </div>

                {post.summary && (
                    <p
                        id={`blog-summary-${post.slug}`}
                        className="text-muted-foreground leading-relaxed text-lg max-w-2xl"
                    >
                        {post.summary}
                    </p>
                )}

                {showTags && post.tags && post.tags.length > 0 && (
                    <div
                        className="flex gap-2 flex-wrap mt-2"
                        role="list"
                        aria-label="Etiquetas del artículo"
                    >
                        {post.tags.map((tag) => (
                            <span key={tag} role="listitem">
                                <Badge variant="default">{tag}</Badge>
                            </span>
                        ))}
                    </div>
                )}
            </Link>
        </article>
    );
}
