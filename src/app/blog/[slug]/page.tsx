import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts } from "@/features/blog";
import { CustomMDX } from "@/shared/lib";
import { Badge } from "@/shared/ui";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "No encontrado" };
  }

  return {
    title: post.title,
    description: post.summary || "Publicación del blog",
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(resolvedParams.slug, 2);

  return (
    <div className="max-w-3xl w-full mx-auto">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Blog
      </Link>

      {/* Post Header */}
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

        {/* Tags */}
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

      {/* Post Content */}
      <CustomMDX source={post.content} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-6">Artículos Relacionados</h2>
          <div className="flex flex-col gap-4">
            {relatedPosts.map((relatedPost) => (
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
      )}
    </div>
  );
}
