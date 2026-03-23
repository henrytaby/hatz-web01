import type { BlogPostEntity } from "@/entities";
import { BlogCard } from "./blog-card";

interface BlogListProps {
    posts: BlogPostEntity[];
    emptyMessage?: string;
}

export function BlogList({ posts, emptyMessage = "Pronto habrá publicaciones..." }: BlogListProps) {
    if (posts.length === 0) {
        return <p className="text-muted-foreground">{emptyMessage}</p>;
    }

    return (
        <div className="w-full max-w-3xl flex-col flex gap-0">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}
