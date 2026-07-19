import Link from "next/link";
import type { BlogPostEntity } from "@/entities";

export function RelatedBlogPosts({ posts }: { posts: BlogPostEntity[] }) {
  if (!posts || posts.length === 0) return null;
  
  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Artículos Relacionados</h2>
      <div className="flex flex-col gap-4">
        {posts.map((relatedPost) => (
          <Link
            key={relatedPost.slug}
            href={`/blog/${relatedPost.slug}`}
            className="group p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {relatedPost.title}
            </h3>
            {relatedPost.summary && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {relatedPost.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
