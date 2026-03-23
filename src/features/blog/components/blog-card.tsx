import Link from "next/link";
import type { BlogPostEntity } from "@/entities";
import { Badge } from "@/shared/ui";

interface BlogCardProps {
    post: BlogPostEntity;
    showTags?: boolean;
}

export function BlogCard({ post, showTags = true }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 py-10 border-t border-border/50 hover:bg-muted/30 transition-colors -mx-6 px-6 rounded-2xl"
        >
            <div className="w-full flex flex-col md:flex-row justify-between md:items-baseline gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
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
                <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                    {post.summary}
                </p>
            )}

            {showTags && post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}
        </Link>
    );
}
