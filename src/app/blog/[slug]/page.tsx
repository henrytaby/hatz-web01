import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts, BlogPostHeader, RelatedBlogPosts } from "@/features/blog";
import { CustomMDX } from "@/shared/lib";

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
    openGraph: {
      title: post.title,
      description: post.summary || "Publicación del blog",
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || "Publicación del blog",
    },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Henry Taby',
    },
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Blog
      </Link>

      <BlogPostHeader post={post} />
      <CustomMDX source={post.content} />
      <RelatedBlogPosts posts={relatedPosts} />
    </div>
  );
}
